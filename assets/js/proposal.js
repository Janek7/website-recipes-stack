const recipesData = [
    {"slug": "brokoli-suppe", "title": "Brokoli Suppe", "category": "Suppe"},
    {"slug": "reisauflauf", "title": "Reisauflauf", "category": "Auflauf"},
    {"slug": "spinatlasagne", "title": "Spinatlasagne", "category": "Auflauf"}
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