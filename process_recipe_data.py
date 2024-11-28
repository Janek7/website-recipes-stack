import os
from typing import Dict, Tuple, List
import unicodedata
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import re
import json

import pandas as pd
import yaml
import instaloader

SOURCE_BOOKS = [
    "Italienische Feierabendküche",
    "Emmi kocht einfach",
    "Emmi kocht einfach: 75 vegetarische Rezepte",
    "Emmi kocht einfach: 85 Rezepte für das ganze Jahr",
    "The Taste of GBS CEE"
]

SOURCE_INTERNET = "Internet"
SOURCE_INSTAGRAM = "Instagram"
SOURCE_COOKBOOK = "Kochbuch"
SOURCE_KPTNCOOK = "KptnCook"
SOURCE_FAMILY = "Familien Rezept"

COOK_BOOK_URL = "https://drive.google.com/file/d/1OTIuJo0opKTimU0gug9hlcpmTNJdstUg/view"

time_icon_element = '''<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="17" height="17" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z"></path>
  <circle cx="12" cy="12" r="9"></circle>
  <polyline points="12 7 12 12 15 15"></polyline>
</svg>'''


def process_recipes(recipes: pd.DataFrame) -> None:
    """
    iterate over df and process single recipes
    outputs recipes into posts and injects into proposal scripts and page
    """
    recipes = recipes[recipes['Recipe'].notnull()]

    # 1) prepare data and generate posts
    recipes_data = []
    for idx, row in recipes.iterrows():
        print(f"{idx + 1}. Process {row['Recipe']}".center(100, '-') + "\n")
        recipe_data, markdown_text = format_recipe_data(row)
        recipes_data.append(recipe_data)
        generate_recipe_post(recipe_data, markdown_text)

    # 2) inject data into into web files
    inject_recipes_into_proposal_js(recipes_data)
    inject_categories_into_search_html(recipes_data)


def format_recipe_data(recipe_row: pd.Series) -> Tuple[Dict, str]:
    """
    prepares recipe data
    """
    # 1) meta data dict for yaml info header
    recipe_dict = {
        'title': recipe_row['Recipe'],
        # 'description': recipe_row['Description'], # sub title
        'slug': clean_name(recipe_row['Recipe']),
        'date': recipe_row['Date'].strftime('%Y-%m-%d %H:%M:%S'),
        # 'image': None
        'categories': [recipe_row['Category']],
        'tags': [recipe_row['Source']] + ["Top"] if pd.notna(recipe_row['Top']) else []
    }

    # 2) text in markdown format

    # 2a) description
    if recipe_row['Description'] is not None:
        desc_formatted = recipe_row['Description'] if pd.notna(recipe_row['Description']) else None

    # 2b) time
    if recipe_row['Time'] is not None:
        time_formatted = f"{time_icon_element} Die Zubereitung dauert ca. {int(recipe_row['Time'])} Minuten." if pd.notna(recipe_row['Time']) else None

    # 2c) source
    source = None
    # - cookbook recipe
    if recipe_row['Source'] in SOURCE_BOOKS:
        source = f"Im Kochbuch '{recipe_row['Source']}' auf Seite {recipe_row['Source Link']}."
    
    # - PDF cookbook recipe
    elif recipe_row['Source'] == SOURCE_COOKBOOK:
        source = f"In unserem [Kochbuch]({COOK_BOOK_URL}) von 2021 auf Seite {recipe_row['Source Link']}."
    
    # - Internet recipe
    elif recipe_row['Source'] == SOURCE_INTERNET:
        if pd.notna(recipe_row['Source Link']):
            page_domain = extract_domain(recipe_row['Source Link'])
            page_title = get_page_title(recipe_row['Source Link'])
            page_text = page_domain + f" > '{page_title}'" if page_title else ''
            source = f"Im Internet unter [{page_text}]({recipe_row['Source Link']})."
        else:
            source = "Im Internet."
    
    # - Instagram recipe
    elif recipe_row['Source'] == SOURCE_INSTAGRAM:
        if pd.notna(recipe_row['Source Link']):
            instagram_user = get_instagram_username(recipe_row['Source Link'])
            source = f"Auf Instagram bei [{instagram_user}]({recipe_row['Source Link']})."
        else: 
            source = "Auf Instagram."

    # - KptnCook
    elif recipe_row['Source'] == SOURCE_KPTNCOOK:
        if pd.notna(recipe_row['Source Link']):
            page_domain = extract_domain(recipe_row['Source Link'])
            page_title = get_page_title(recipe_row['Source Link'])
            page_text = page_domain + f" > '{page_title}'" if page_title else ''
            source = f"In der KptnCook App: [{page_text}]({recipe_row['Source Link']})."
        else:
            source = "In der KptnCook App."
    
    # - Family recipe
    elif recipe_row['Source'] == SOURCE_INSTAGRAM:
        source = "Das ist ein Familienrezept."
    
    else: 
        source = recipe_row['Source']
    soure_formatted = f"> Wo gefunden? {source}"

    # 2d) combined
    text_markdown = ""
    if desc_formatted: text_markdown += "\n" + desc_formatted + "\n"
    if time_formatted: text_markdown += "\n" + time_formatted + "\n"
    if soure_formatted: text_markdown += "\n" + soure_formatted + "\n"
    text_markdown += "\nGuten Appetit! :)"

    return recipe_dict, text_markdown


def generate_recipe_post(recipe_data: Dict, markdown_text: str) -> None:
    # 1) prepare file and folder names
    post_folder = f"content\\post\\{recipe_data['slug']}"
    post_index_file = f"{post_folder}\\index.md"

    # 2) prepare string to write
    print(recipe_data)
    print(yaml.dump(recipe_data, indent=4))
    file_content = "---\n" + yaml.dump(recipe_data, indent=4) + "---\n\n" + markdown_text
    # print(file_content)

    # 3) write to file
    os.makedirs(post_folder, exist_ok=True)
    with open(post_index_file, 'w', encoding='utf-8') as file:
        file.write(file_content)

    
def inject_recipes_into_proposal_js(recipes_data: List[Dict]) -> None:
    """
    reads the proposal_template.js script, injects full recipe data and writes back to proposal.js
    """
    # prepare data in correct list/dict format
    recipes_data_js = [{'slug': r['slug'], 'title': r['title'], 'category': r['categories'][0] if pd.notna(r['categories'][0]) else None} for r in recipes_data]
    recipes_data_js_string = json.dumps(recipes_data_js, indent=4)

    # read template (proposal_template.js)
    with open('assets\js\proposal_template.js', 'r') as file:
        proposal_script = file.read()

    # inject data
    proposal_script = proposal_script.replace("const recipesData = [];", f"const recipesData = {recipes_data_js_string};")

    # write to used script (proposal.js)
    with open('assets\js\proposal.js', 'w') as file:
        file.write(proposal_script)


def inject_categories_into_search_html(recipes_data: List[Dict]) -> None:
    """
    reads the search_template.html file, injects full category data and writes back to search.html
    """
    # prepare data in correct list/dict format
    categories = [r['categories'] for r in recipes_data]
    # flatten, unique and sort
    categories = sorted(list(set([item for sublist in categories for item in sublist if pd.notna(item)])))
    # create dropdown options
    category_options = "".join([f'<option value="{category}">{category}</option>\n' for category in categories])

    # read template (search_template.html)
    with open('layouts\page\search_template.html', 'r') as file:
        search_html = file.read()

    # inject data
    search_html = search_html.replace('<option value="Placeholder">Placeholder</option>', category_options)

    # write to used script (search.html)
    with open('layouts\page\search.html', 'w') as file:
        file.write(search_html)


def clean_name(recipe_name: str) -> str:
    # replace characters as š with s
    removed_special_chars = ''.join([char for char in unicodedata.normalize('NFD', recipe_name) if not unicodedata.combining(char)])
    # remove other special characters as ,
    removed_special_chars = re.sub(r'[^A-Za-z0-9\s]', '', removed_special_chars)
    # replace spaces with -
    removed_special_chars = removed_special_chars.lower().replace(" ", "-")

    return removed_special_chars


def get_page_title(url: str) -> str:
    """
    Get the html title of a page
    """
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the title tag and get its content
    title_tag = soup.find('title')
    
    if title_tag:
        return title_tag.get_text()  # Return the page title
    else:
        return None


def extract_domain(url):
    """
    Extract the domain of a given url
    """
    # Parse the URL
    parsed_url = urlparse(url)
    
    # Extract the domain (hostname) from the parsed URL
    domain = parsed_url.netloc
    
    return domain
    

instagram_loader = instaloader.Instaloader()


def get_instagram_username(url: str) -> str:
    """
    get the user name of an instagram account
    """
    # Extract the short code from the reel or post URL
    # The short code is the unique identifier for each post or reel
    short_code = url.split("/")[4]
    
    # Download the post using the short code
    post = instaloader.Post.from_shortcode(instagram_loader.context, short_code)
    
    # Get the username of the user who posted the reel
    username = post.owner_username
    
    return username


if __name__ == '__main__':
    # print(os.path.exists("G:\\Meine Ablage\\Recipes.xlsx"))

    # df = pd.read_excel("G:\\Meine Ablage\\Recipes.xlsx")
    df = pd.read_excel("Recipes.xlsx", engine='openpyxl')
    process_recipes(recipes=df)
