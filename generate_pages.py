
import os
from datetime import datetime
from typing import List, Dict, Tuple
import unicodedata

import pandas as pd
import yaml


BOOKS = [
    "Italienische Feierabendküche",
    "Emmi kocht einfach",
    "Emmi kocht einfach: 75 vegetarische Rezepte",
    "Emmi kocht einfach: 85 Rezepte für das ganze Jahr",
    "The Taste of GBS CEE",
    "Kochbuch"
]

LINK_SOURCES = [
    "Internet",
    "Instagram"
]

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
        'tags': [recipe_row['Source']] + ["Top"] if recipe_row['Top'] is not None else []
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
    if recipe_row['Source'] in BOOKS:
        source = f" Im Kochbuch '{recipe_row['Source']}' auf Seite {recipe_row['Source Link']}."
    elif recipe_row['Source'] in LINK_SOURCES:
        if recipe_row['Source Link']:
            source = f"[{recipe_row['Source']}]({recipe_row['Source Link']})"
        else: 
            source = recipe_row['Source']
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
    post_folder = f"content\\post\\{clean_name(recipe_data['slug'])}"
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
    removed_special_chars = ''.join([char for char in unicodedata.normalize('NFD', recipe_name) if not unicodedata.combining(char)])
    return removed_special_chars.lower().replace(" ", "-")


if __name__ == '__main__':
    # print(os.path.exists("G:\\Meine Ablage\\Recipes.xlsx"))

    df = pd.read_excel("G:\\Meine Ablage\\Recipes.xlsx")
    process_recipes(recipes=df)
