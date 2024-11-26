function proposeRandomRecipe() {
    var recipeName = selectRandomRecipe();
    editSearchResultElement(recipeName);
}


function selectRandomRecipe() {

    // 1) select random recipe
    var recipes = [
        "Spaghetti Bolognese",
        "Käsespätzle",
        "Sushi",
        "Pizza Margherita",
        "Gemüse-Curry"
    ];

    let randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    //console.log("selected recipe: " + recipeName)
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