// This is only test data
//const exampleRecipesData = [
    // {"slug": "brokoli-suppe", "title": "Brokoli Suppe", "category": "Suppe"},
    // {"slug": "reisauflauf", "title": "Reisauflauf", "category": "Auflauf"},
    // {"slug": "spinatlasagne", "title": "Spinatlasagne", "category": "Auflauf"}
//];

// Real data is injected by python script process_recipe_data.py into recipesData
const recipesData = [
    {
        "slug": "pistazienkipferl",
        "title": "Pistazienkipferl",
        "category": "Weihnachten"
    },
    {
        "slug": "vanillekipferl",
        "title": "Vanillekipferl",
        "category": "Weihnachten"
    },
    {
        "slug": "spekulatiuskipferl-mit-mandeln",
        "title": "Spekulatiuskipferl mit Mandeln",
        "category": "Weihnachten"
    },
    {
        "slug": "kokos-barentatzen",
        "title": "Kokos B\u00e4rentatzen",
        "category": "Weihnachten"
    },
    {
        "slug": "gefullte-zucchini-mit-linsenbolognese",
        "title": "Gef\u00fcllte Zucchini mit Linsenbolognese",
        "category": "Auflauf"
    },
    {
        "slug": "kurbis-halusky",
        "title": "K\u00fcrbis Halu\u0161ky",
        "category": "Sonstiges"
    },
    {
        "slug": "tomaten-risotto",
        "title": "Tomaten Risotto",
        "category": "Risotto"
    },
    {
        "slug": "thuna-pasta",
        "title": "Thuna Pasta",
        "category": "Pasta"
    },
    {
        "slug": "ofen-gemuse-pasta",
        "title": "Ofen Gem\u00fcse Pasta",
        "category": "Pasta"
    },
    {
        "slug": "linsencurry",
        "title": "Linsencurry",
        "category": "Reis"
    },
    {
        "slug": "spinatlasagne",
        "title": "Spinatlasagne",
        "category": "Auflauf"
    },
    {
        "slug": "kurbis-puffer",
        "title": "K\u00fcrbis Puffer",
        "category": "Sonstiges"
    },
    {
        "slug": "mac-and-cheese",
        "title": "Mac and Cheese",
        "category": "Pasta"
    },
    {
        "slug": "brokoli-suppe",
        "title": "Brokoli Suppe",
        "category": "Suppe"
    },
    {
        "slug": "tofu-reis",
        "title": "Tofu Reis",
        "category": "Reis"
    },
    {
        "slug": "zucchini-risotto",
        "title": "Zucchini Risotto",
        "category": "Risotto"
    },
    {
        "slug": "spaghetti-kurbis",
        "title": "Spaghetti K\u00fcrbis",
        "category": "Sonstiges"
    },
    {
        "slug": "linsen-bolognese",
        "title": "Linsen Bolognese",
        "category": "Pasta"
    },
    {
        "slug": "reisauflauf",
        "title": "Reisauflauf",
        "category": "Reis"
    },
    {
        "slug": "reis-mit-paprika-zucchini-und-feta",
        "title": "Reis mit Paprika, Zucchini und Feta",
        "category": "Reis"
    },
    {
        "slug": "welcome-meal",
        "title": "Welcome Meal",
        "category": "Pasta"
    },
    {
        "slug": "nussecken",
        "title": "Nussecken",
        "category": "Backen"
    },
    {
        "slug": "ofengnocchi-mit-paprika",
        "title": "Ofen-Gnocchi mit Paprika",
        "category": "Sonstiges"
    },
    {
        "slug": "kinderriegel-muffins",
        "title": "Kinderriegel Muffins",
        "category": "Backen"
    },
    {
        "slug": "kuchen-mit-herzfullung",
        "title": "Kuchen mit Herzf\u00fcllung",
        "category": "Backen"
    },
    {
        "slug": "osterlamm-kuchen",
        "title": "Osterlamm Kuchen",
        "category": "Backen"
    },
    {
        "slug": "pfannenlasagne",
        "title": "Pfannenlasagne",
        "category": "Auflauf"
    },
    {
        "slug": "mohn-quark-kuchen",
        "title": "Mohn Quark Kuchen",
        "category": "Backen"
    },
    {
        "slug": "hermelin-mit-pommes-oder-kartoffeln",
        "title": "Hermelin mit Pommes oder Kartoffeln",
        "category": "Sonstiges"
    },
    {
        "slug": "chilinudeln-mit-gemuse",
        "title": "Chili-Nudeln mit Gem\u00fcse",
        "category": "Pasta"
    },
    {
        "slug": "buchticky-se-sodo",
        "title": "Buchti\u010dky se \u0161od\u00f3",
        "category": "Sonstiges"
    },
    {
        "slug": "reispfanne-mit-paprika-und-ei",
        "title": "Reispfanne mit Paprika und Ei",
        "category": "Reis"
    },
    {
        "slug": "himbeer-wolkchen-torte",
        "title": "Himbeer W\u00f6lkchen Torte",
        "category": "Backen"
    },
    {
        "slug": "nadivka",
        "title": "N\u00e1divka",
        "category": "Sonstiges"
    },
    {
        "slug": "hefe-brotchen",
        "title": "Hefe Brotchen",
        "category": "Backen"
    },
    {
        "slug": "borsc",
        "title": "Bor\u0161\u010d",
        "category": "Suppe"
    },
    {
        "slug": "cookies",
        "title": "Cookies",
        "category": "Backen"
    }
];


function proposeRandomRecipe() {
    /**
     * selects a random recipe based on the category selection and updates the page
     */

    // 1) filter recipe data for selection from drop down
    var filteredRecipesData = filterRecipeData(recipesData);

    // check for empty categories
    if (filteredRecipesData.length == 0) {
        return;
    }

    // 2) select a random ones
    var selectedRecipe = selectRandomRecipe(filteredRecipesData);

    // 3) update search result section according to it
    editSearchResultElement(selectedRecipe);
}


function filterRecipeData(recipesData) {
    /**
     * filters the total recipeData based on the selected categories in the dropdown
     */
    // get selected categories
    var dropdown = document.getElementById('categoryDropdown');
    var selectedCategories = Array.from(dropdown.selectedOptions).map(option => option.value);

    // filter recipeData for this categories
    var filteredRecipeData = recipesData.filter(recipe => 
        selectedCategories.includes(recipe.category)
    );
    console.log("Selected categories: " + selectedCategories + " (" + filteredRecipeData.length + " Recipes)");

    return filteredRecipeData;

}


function selectRandomRecipe(recipesData) {
    /**
     * selects random one recipe from a given recipeData array
     */

    // var recipeTitles = recipeData.map(recipe => recipe.title);
    var selectedRecipe = recipesData[Math.floor(Math.random() * recipesData.length)];
    console.log("Randomly selected recipe: " + selectedRecipe.title);
    return selectedRecipe;

}


function editSearchResultElement(selectedRecipe) {
    /**
     * update the search result element according to the selected recipe
     */
    
    // 1) toggle search result box visibilty
    var resultBox = document.getElementById("proposal-result-box");
    resultBox.style.display = "block"; // Show the element

    // 2) Update header
    var titleHeader = document.getElementById("proposal-title");
    titleHeader.innerText = selectedRecipe.title;

    // 3) Update href to recipe post
    var titleHeader = document.getElementById("proposal-ref");
    titleHeader.setAttribute("href", "../p/" + selectedRecipe.slug);

}