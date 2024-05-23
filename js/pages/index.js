import { recipes } from "../data/recipes.js";
import { recipeTemplate, displayData } from "../template/recipes.js";
import { getFiltersDOM, displayFiltersData } from "../template/filters.js";

// Recipes
const originalRecipes = [...recipes];
const recipesToDisplay = [...originalRecipes];

// Main header search bar
const mainSearch = [];

// Filters
const filters = [];

// const result = recipesToDisplay.map(({ name, description, ingredients }) => ({
//   name,
//   description,
//   ingredients,
// }));

// Array of Recipes Name, description and ingredients
const arrayOfRecipesName = recipesToDisplay.map((recipes) => recipes.name);
const arrayOfRecipesDescription = recipesToDisplay.map(
  (recipes) => recipes.description
);

const arrayOfRecipeIngredients = recipes.map(
  (ingredient) => ingredient.ingredients
);
const ingredientsRecipeOnly = arrayOfRecipeIngredients
  .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
  .map((ingredient) => ingredient.ingredient);

// Merge Arrays above
const mergeArray = arrayOfRecipesName.concat(
  arrayOfRecipesDescription,
  ingredientsRecipeOnly
);

// To uppercase function
const toUpper = function (e) {
  return e.toUpperCase();
};
const arrayOfRecipesNameAndDescriptionAndIngredients = mergeArray.map(toUpper);

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");
const cardsContainer = document.querySelector(".cards");

// Create recipes card list
const generateRecipesList = () => {
  cardsContainer.innerHTML = "";

  const inputSearchValue = inputSearch.value.toUpperCase();

  if (inputSearchValue.length > 2) {
    for (let word of arrayOfRecipesNameAndDescriptionAndIngredients) {
      const searchWord = word.toUpperCase();

      if (searchWord.indexOf(inputSearchValue) !== -1) {
        displayData(recipesToDisplay);
      } else {
      }
    }

    if (cardsContainer.innerHTML === "") {
      cardsContainer.innerHTML += `Aucune recette ne contient « ${inputSearchValue} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }
  } else {
    displayData(recipesToDisplay);
  }
};

generateRecipesList();
inputSearch.addEventListener("keyup", generateRecipesList);

// Search recipes on click
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  generateRecipesList(inputSearch);
});

// Clear input search value on click
btnClearSearch.addEventListener("click", (event) => {
  event.preventDefault();
  inputSearch.value = "";
  generateRecipesList(inputSearch);
});

displayFiltersData("ingredients");
displayFiltersData("appliance");
displayFiltersData("ustensils");

// Display numbers total of Recipes
function totalRecipes(totalRecipes) {
  const recipesCount = document.querySelector(".number-of-recipes p");
  const initialValue = totalRecipes.length;
  //   const totalRecipes = recipes.reduce(
  //     (accumulator, recipe) => accumulator + recipe.id,
  //     initialValue
  //   );
  recipesCount.textContent = `${initialValue} recettes`;
}

totalRecipes(recipesToDisplay);
