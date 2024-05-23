import { recipes } from "../data/recipes.js";

// Recipes
const originalRecipes = [...recipes];
const recipesToDisplay = [...originalRecipes];

// Main header search bar
const mainSearch = [];

// Filters
const filters = [];

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

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");

// We display Recipes
displayData(originalRecipes);

// Create recipes card list
function generateRecipesList(inputValue) {
  const cards = document.querySelectorAll(".cards > div:not(.error-message)");
  const inputSearchValue = inputSearch.value.toUpperCase();

  if (inputValue.length > 2) {
    for (let i = 0; i < recipesToDisplay.length; i++) {
      const txtValueName = arrayOfRecipesName[i];
      const txtValueDescription = arrayOfRecipesDescription[i];
      const txtValueIngredient = ingredientsRecipeOnly[i];

      // We retrieve Error messages
      const errorMessage = document.querySelectorAll(".error-message");
      // We delete error messages (div)
      for (const [key, message] of Object.entries(errorMessage)) {
        message.remove(errorMessage);
      }

      if (
        txtValueName.toUpperCase().indexOf(inputSearchValue) == -1 &&
        txtValueDescription.toUpperCase().indexOf(inputSearchValue) == -1 &&
        txtValueIngredient.toUpperCase().indexOf(inputSearchValue) == -1
      ) {
        cards[i].style.display = "none";

        for (let index in cards) {
          if (cards[index].style.display !== "none") {
            break;
          } else {
            // We retrieve Error messages
            const errorMessage = document.querySelectorAll(".error-message");
            // We delete error messages (div)
            for (const [key, message] of Object.entries(errorMessage)) {
              message.remove(errorMessage);
            }
            displayErrorMessage(inputSearchValue);
          }
        }
      } else if (
        txtValueName.toUpperCase().indexOf(inputSearchValue) > -1 ||
        txtValueDescription.toUpperCase().indexOf(inputSearchValue) > -1 ||
        txtValueIngredient.toUpperCase().indexOf(inputSearchValue) > -1
      ) {
        cards[i].style.display = "block";
        // mainSearch.push(inputSearchValue);
      }
    }
  } else {
    // We retrieve Error messages
    const errorMessage = document.querySelectorAll(".error-message");
    // We delete error messages (div)
    for (const [key, message] of Object.entries(errorMessage)) {
      message.remove(errorMessage);

      cards.forEach((element) => {
        element.style.display = "block";
      });
    }
  }
}

// Display Error messages
function displayErrorMessage(message) {
  const cardsWrapper = document.querySelector(".cards");
  const div = document.createElement("div");
  div.setAttribute("class", "error-message");
  const p = document.createElement("p");
  cardsWrapper.appendChild(div);
  div.appendChild(p);
  p.textContent = `Aucune recette ne contient ${message} vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
}

// Search recipes on key down
inputSearch.onkeydown = function () {
  var _this = this;

  // log input's value once keydown completes
  setTimeout(function () {
    // console.log(_this.value);
    generateRecipesList(_this.value);
  }, 0);
};

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

// Cards template
function recipeTemplate(data) {
  const { id, image, name, time, description, ingredients } = data;
  const picture = `img/recipes/${image}`;

  // Retrieve Ingredients elements
  const ingredientsRecipe = ingredients.map(
    (ingredient) => ingredient.ingredient
  );

  // Retrieve Quantities elements
  const quantityRecipe = ingredients.map((quantity) => quantity.quantity);

  // Retrieve Units elements
  const unitRecipe = ingredients.map((unit) => unit.unit);

  // Remove Undefined Values from Objects
  function cleanData(data) {
    const cleanData = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return cleanData;
  }

  const displayQuantityRecipe = cleanData(quantityRecipe);
  const displayUnitRecipe = cleanData(unitRecipe);

  function getRecipeCardDOM() {
    // Wrapper
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "col-12 col-md-6 col-lg-4 mb-5");

    // Link
    const link = document.createElement("a");
    link.setAttribute("href", "#");

    // Article
    const article = document.createElement("article");
    article.setAttribute("class", "card");

    // Span
    const span = document.createElement("span");
    span.setAttribute("class", "card-tag");
    span.textContent = `${time}min`;

    // Img
    const imageRecipe = document.createElement("img");
    imageRecipe.setAttribute("class", "card-img-top");
    imageRecipe.setAttribute("src", picture);

    // Card Body
    const divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    // H2
    const cardTitle = document.createElement("h2");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = name;

    // H3 (Recipe)
    const recipeTitle = document.createElement("h3");
    recipeTitle.textContent = "Recette";

    // Description
    const p = document.createElement("p");
    p.textContent = description;

    // H3 (Ingredient)
    const ingredientTitle = document.createElement("h3");
    ingredientTitle.textContent = "Ingrédients";

    // Row
    const row = document.createElement("div");
    row.setAttribute("class", "row");

    // Display Ingredient quantity & unit
    let numberOfDiv = ingredientsRecipe.length;

    for (let i = 0; i < numberOfDiv; i++) {
      // P (Ingredient) / Span (quantity & unit)
      const ingredientDesc = document.createElement("p");
      const quantity = document.createElement("span");
      const unit = document.createElement("span");

      // Row inner div
      const rowInnerDiv = document.createElement("div");
      rowInnerDiv.setAttribute("class", "col-6");

      rowInnerDiv.appendChild(ingredientDesc);
      rowInnerDiv.appendChild(quantity);
      rowInnerDiv.appendChild(unit);
      row.appendChild(rowInnerDiv);
      ingredientDesc.textContent = ingredientsRecipe[i];
      quantity.textContent = displayQuantityRecipe[i] ?? "";
      unit.textContent = displayUnitRecipe[i] ?? "";
    }

    // Append elements
    wrapper.appendChild(link);
    link.appendChild(article);
    article.appendChild(span);
    article.appendChild(imageRecipe);
    article.appendChild(divCardBody);
    divCardBody.appendChild(cardTitle);
    divCardBody.appendChild(recipeTitle);
    divCardBody.appendChild(p);
    divCardBody.appendChild(ingredientTitle);
    divCardBody.appendChild(row);
    return wrapper;
  }

  return {
    id,
    image,
    name,
    time,
    description,
    ingredients,
    getRecipeCardDOM,
  };
}

// Display Cards template
function displayData(recipes) {
  const cardsSection = document.querySelector(".cards");
  recipes.forEach((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    cardsSection.appendChild(recipeCardDOM);
  });
}

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
