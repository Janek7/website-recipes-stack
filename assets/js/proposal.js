// This is only test data
//const exampleRecipesData = [
    // {"slug": "brokoli-suppe", "title": "Brokoli Suppe", "category": "Suppe"},
    // {"slug": "reisauflauf", "title": "Reisauflauf", "category": "Auflauf"},
    // {"slug": "spinatlasagne", "title": "Spinatlasagne", "category": "Auflauf"}
//];

// Real data is injected by python script process_recipe_data.py into recipesData
const recipesData = [
    {
        "slug": "kekse-aus-gebackpresse",
        "title": "Kekse aus Geb\u00e4ckpresse",
        "category": "Weihnachten"
    },
    {
        "slug": "buzzerl",
        "title": "Buzzerl",
        "category": "Weihnachten"
    },
    {
        "slug": "kuhflecken-platzchen",
        "title": "Kuhflecken Pl\u00e4tzchen",
        "category": "Weihnachten"
    },
    {
        "slug": "svickova",
        "title": "Svickova",
        "category": "Sonstiges"
    },
    {
        "slug": "vanocka",
        "title": "Vanocka",
        "category": "Weihnachten"
    },
    {
        "slug": "spritzgebackene",
        "title": "Spritzgebackene",
        "category": "Weihnachten"
    },
    {
        "slug": "bananen-platzchen",
        "title": "Bananen Pl\u00e4tzchen",
        "category": "Weihnachten"
    },
    {
        "slug": "elisenlebkuchen",
        "title": "Elisenlebkuchen",
        "category": "Weihnachten"
    },
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
        "slug": "orzo-mit-tomaten-mozarella-sauce",
        "title": "Orzo mit Tomaten Mozarella Sauce",
        "category": "Pasta"
    },
    {
        "slug": "porridge",
        "title": "Porridge",
        "category": "Fr\u00fchst\u00fcck"
    },
    {
        "slug": "waffeln",
        "title": "Waffeln",
        "category": "Fr\u00fchst\u00fcck"
    },
    {
        "slug": "aubgerine-zucchini-pasta",
        "title": "Aubgerine Zucchini Pasta",
        "category": "Pasta"
    },
    {
        "slug": "udon-sesam-nudeln",
        "title": "Udon Sesam Nudeln",
        "category": "Pasta"
    },
    {
        "slug": "falaffel-salat-mit-gegrilltem-gemuse",
        "title": "Falaffel Salat mit gegrilltem Gem\u00fcse",
        "category": "Sonstiges"
    },
    {
        "slug": "reisauflauf",
        "title": "Reisauflauf",
        "category": "Reis"
    },
    {
        "slug": "karottenkuchen",
        "title": "Karottenkuchen",
        "category": "Backen"
    },
    {
        "slug": "roulladen-mit-spatzlen",
        "title": "Roulladen mit Sp\u00e4tzlen",
        "category": "Weihnachten"
    },
    {
        "slug": "reis-mit-paprika-zucchini-und-feta",
        "title": "Reis mit Paprika, Zucchini und Feta",
        "category": "Reis"
    },
    {
        "slug": "schnitzel-mit-kartoffelsalat",
        "title": "Schnitzel mit Kartoffelsalat",
        "category": "Weihnachten"
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
        "title": "Hefe Br\u00f6tchen",
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
    },
    {
        "slug": "falafel-burger",
        "title": "Falafel Burger",
        "category": "Sonstiges"
    },
    {
        "slug": "erdbeer-quark-knodel",
        "title": "Erdbeer Quark Kn\u00f6del",
        "category": "Sonstiges"
    },
    {
        "slug": "bublani-kuchen-mit-himbeeren",
        "title": "Bublani Kuchen mit Himbeeren",
        "category": "Backen"
    },
    {
        "slug": "tomaten-aubergine-auflauf",
        "title": "Tomaten Aubergine Auflauf",
        "category": "Auflauf"
    },
    {
        "slug": "hackpfanne",
        "title": "Hackpfanne",
        "category": "Pasta"
    },
    {
        "slug": "zucchini-gemuse-schiffchen",
        "title": "Zucchini Gem\u00fcse Schiffchen",
        "category": "Sonstiges"
    },
    {
        "slug": "kasekuchen",
        "title": "K\u00e4sekuchen",
        "category": "Backen"
    },
    {
        "slug": "knusprige-kartoffeln-und-kichererbsen-mit-chili--joghurt",
        "title": "Knusprige Kartoffeln und Kichererbsen mit Chili & Joghurt",
        "category": "Sonstiges"
    },
    {
        "slug": "knusprig-gebratene-gnocchi-mit-knoblauchpilzen",
        "title": "Knusprig gebratene Gnocchi mit Knoblauch-Pilzen",
        "category": "Sonstiges"
    },
    {
        "slug": "gefullte-paprika-im-teigmantel",
        "title": "Gef\u00fcllte Paprika im Teigmantel",
        "category": "Sonstiges"
    },
    {
        "slug": "toast-mit-ei-in-der-pfanne",
        "title": "Toast mit Ei in der Pfanne",
        "category": "Fr\u00fchst\u00fcck"
    },
    {
        "slug": "monte-cristo-toast",
        "title": "Monte Cristo Toast",
        "category": "Fr\u00fchst\u00fcck"
    },
    {
        "slug": "griechischer-joghurt-kuchen-mit-beeren",
        "title": "Griechischer Joghurt Kuchen mit Beeren",
        "category": "Backen"
    },
    {
        "slug": "kalter-hund",
        "title": "Kalter Hund",
        "category": "Backen"
    },
    {
        "slug": "zimt-schoko-porridge",
        "title": "Zimt Schoko Porridge",
        "category": "Fr\u00fchst\u00fcck"
    },
    {
        "slug": "curry-maultaschenpfanne",
        "title": "Curry Maultaschenpfanne",
        "category": "Sonstiges"
    },
    {
        "slug": "maultaschenomelett-mit-feta--paprika",
        "title": "Maultaschenomelett mit Feta & Paprika",
        "category": "Sonstiges"
    },
    {
        "slug": "kaiserschmarrn",
        "title": "Kaiserschmarrn",
        "category": "Sonstiges"
    },
    {
        "slug": "wiener-schnitzel",
        "title": "Wiener Schnitzel",
        "category": "Sonstiges"
    },
    {
        "slug": "kasespatzle",
        "title": "K\u00e4sesp\u00e4tzle",
        "category": "Sonstiges"
    },
    {
        "slug": "fritatensuppe",
        "title": "Fritatensuppe",
        "category": "Suppe"
    },
    {
        "slug": "halloween-madeleines",
        "title": "Halloween Madeleines",
        "category": "Backen"
    },
    {
        "slug": "schnitzel",
        "title": "Schnitzel",
        "category": "Sonstiges"
    },
    {
        "slug": "onepotspatzle-mit-rauchertofu",
        "title": "One-Pot-Sp\u00e4tzle mit R\u00e4uchertofu",
        "category": "Sonstiges"
    },
    {
        "slug": "pilzragout",
        "title": "Pilz-Ragout",
        "category": "Sonstiges"
    },
    {
        "slug": "gemuse-curry-mit-reis",
        "title": "Gem\u00fcse Curry mit Reis",
        "category": "Reis"
    },
    {
        "slug": "kasekuchen-brownies",
        "title": "K\u00e4sekuchen Brownies",
        "category": "Backen"
    },
    {
        "slug": "kokoslimettencurry-mit-garnelen",
        "title": "Kokos-Limetten-Curry mit Garnelen",
        "category": "Reis"
    },
    {
        "slug": "gnocchi-mac--cheesestyle",
        "title": "Gnocchi Mac & Cheese-Style",
        "category": "Sonstiges"
    },
    {
        "slug": "nudelpilzpfanne",
        "title": "Nudel-Pilz-Pfanne",
        "category": "Pasta"
    },
    {
        "slug": "burger",
        "title": "Burger",
        "category": "Sonstiges"
    },
    {
        "slug": "lachs-spinat-quiche",
        "title": "Lachs Spinat Quiche",
        "category": "Sonstiges"
    },
    {
        "slug": "curry-wurst",
        "title": "Curry Wurst",
        "category": "Sonstiges"
    },
    {
        "slug": "asia-nudeln",
        "title": "Asia Nudeln",
        "category": "Sonstiges"
    },
    {
        "slug": "pita-taschen-mit-gemuse",
        "title": "Pita Taschen mit Gem\u00fcse",
        "category": "Sonstiges"
    },
    {
        "slug": "tortelloni-mit-wurziger-tomatenkokossauce",
        "title": "Tortelloni mit w\u00fcrziger Tomaten-Kokos-Sauce",
        "category": "Pasta"
    },
    {
        "slug": "brioche",
        "title": "Brioche",
        "category": "Backen"
    },
    {
        "slug": "waldpilz-risotto",
        "title": "Waldpilz Risotto",
        "category": "Risotto"
    },
    {
        "slug": "champignon-sahne-nudeln",
        "title": "Champignon Sahne Nudeln",
        "category": "Pasta"
    },
    {
        "slug": "pancakes",
        "title": "Pancakes",
        "category": "Fr\u00fchst\u00fcck"
    },
    {
        "slug": "sukartoffel-chips",
        "title": "S\u00fc\u00dfkartoffel Chips",
        "category": "Sonstiges"
    },
    {
        "slug": "sukartoffel-mit-kase",
        "title": "S\u00fc\u00dfkartoffel mit K\u00e4se",
        "category": "Sonstiges"
    },
    {
        "slug": "reisnudel-pfanne",
        "title": "Reisnudel Pfanne",
        "category": "Pasta"
    },
    {
        "slug": "kartoffelgratin",
        "title": "Kartoffelgratin",
        "category": "Sonstiges"
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