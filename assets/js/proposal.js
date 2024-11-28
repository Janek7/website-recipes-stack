const recipeData = [
    {"slug": "brokoli-suppe", "title": "Brokoli Suppe", "category": "Suppe"},
    {"slug": "reisauflauf", "title": "Reisauflauf", "category": "Auflauf"},
    {"slug": "spinatlasagne", "title": "Spinatlasagne", "category": "Auflauf"}
];


function proposeRandomRecipe() {

    // get selected categories
    const dropdown = document.getElementById('categoryDropdown');
    const selectedOptions = Array.from(dropdown.selectedOptions).map(option => option.value)
    console.log(selectedOptions);

    var recipeName = selectRandomRecipe();
    editSearchResultElement(recipeName);
}


function selectRandomRecipe() {

    var recipeTitles = recipeData.map(recipe => recipe.title);
    let randomRecipe = recipeTitles[Math.floor(Math.random() * recipeTitles.length)];
    console.log("Randomly selected recipe: " + randomRecipe);
    return randomRecipe;

}


function editSearchResultElement(recipeName) {
    
    // 1) toggle search result box visibilty
    var resultBox = document.getElementById("proposal-result-box")
    resultBox.style.display = "block"; // Show the element

    // 2) Edit header
    var titleHeader = document.getElementById("proposal-title")
    titleHeader.innerText = recipeName;

}