import os
from typing import Dict, Tuple
import unicodedata
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import re

import pandas as pd
import yaml
import instaloader

BOOKS = [
    "Italienische Feierabendküche",
    "Emmi kocht einfach",
    "Emmi kocht einfach: 75 vegetarische Rezepte",
    "Emmi kocht einfach: 85 Rezepte für das ganze Jahr",
    "The Taste of GBS CEE"
]

COOK_BOOK_URL = "https://drive.google.com/file/d/1OTIuJo0opKTimU0gug9hlcpmTNJdstUg/view"

time_icon_element = '''<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="17" height="17" viewBox="0 0 22 22" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z"></path>
  <circle cx="12" cy="12" r="9"></circle>
  <polyline points="12 7 12 12 15 15"></polyline>
</svg>'''


def process_recipes(recipes: pd.DataFrame) -> None:
    """
    iterate over df and process single recipes
    """
    recipes = recipes[recipes['Recipe'].notnull()]

    for idx, row in recipes.iterrows():
        print(f"{idx + 1}. Process {row['Recipe']}".center(100, '-'))
        meta_dict, markdown_text = format_recipe_data(row)
        generate_recipe_post(meta_dict, markdown_text)
        # print(meta_dict)
        # print(markdown_text)
        print()


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
    if recipe_row['Source'] in BOOKS:
        source = f"Im Kochbuch '{recipe_row['Source']}' auf Seite {recipe_row['Source Link']}."
    
    # - PDF cookbook recipe
    elif recipe_row['Source'] == 'Kochbuch':
        source = f"In unserem [Kochbuch]({COOK_BOOK_URL}) von 2021 auf Seite {recipe_row['Source Link']}."
    
    # - Internet recipe
    elif recipe_row['Source'] == 'Internet':
        if pd.notna(recipe_row['Source Link']):
            page_domain = extract_domain(recipe_row['Source Link'])
            page_title = get_page_title(recipe_row['Source Link'])
            page_text = page_domain + f" > '{page_title}'" if page_title else ''
            source = f"Im Internet unter [{page_text}]({recipe_row['Source Link']})."
        else:
            source = "Im Internet."
    
    # - Instagram recipe
    elif recipe_row['Source'] == 'Instagram':
        if pd.notna(recipe_row['Source Link']):
            instagram_user = get_instagram_username(recipe_row['Source Link'])
            source = f"Auf Instagram bei [{instagram_user}]({recipe_row['Source Link']})."
        else: 
            source = "Auf Instagram."
    
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
    with open(post_index_file, 'w') as file:
        file.write(file_content)


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
    df = pd.read_excel("Recipes.xlsx")
    process_recipes(recipes=df)
