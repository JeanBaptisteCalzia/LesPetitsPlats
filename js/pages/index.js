import { recipes } from "../data/recipes.js";
import { recipeTemplate, displayData } from "../template/recipes.js";
import { getFiltersDOM, displayFiltersData } from "../template/filters.js";

// Recipes
const originalRecipes = [...recipes];
export const recipesToDisplay = [...originalRecipes];

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

// Merge Arrays above
const mergeArray = arrayOfRecipesName.concat(
  arrayOfRecipesDescription,
  ingredientsRecipeOnly
);

const arrayOfRecipesNameAndDescriptionAndIngredients = mergeArray.map(
  (value) => {
    return value.toUpperCase();
  }
);

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");
const cardsContainer = document.querySelector(".cards");
export let filterRecipes = recipesToDisplay;

// Create recipes card list
const generateRecipesList = () => {
  cardsContainer.innerHTML = "";

  const inputSearchValue = inputSearch.value.toUpperCase();

  if (inputSearchValue.length > 2) {
    for (
      let i = 0;
      i < arrayOfRecipesNameAndDescriptionAndIngredients.length;
      i++
    ) {
      if (
        arrayOfRecipesNameAndDescriptionAndIngredients.indexOf(
          inputSearchValue
        ) > -1
      ) {
        cardsContainer.innerHTML = "";
        filterRecipes = recipesToDisplay.filter(
          (obj) =>
            obj.name.toUpperCase() === inputSearchValue ||
            obj.description.toUpperCase() === inputSearchValue ||
            obj.ingredients.some(
              (item) => item.ingredient.toUpperCase() === inputSearchValue
            )
        );
        displayData(filterRecipes);
        totalRecipes(filterRecipes);
      }

      if (cardsContainer.innerHTML === "") {
        cardsContainer.innerHTML += `Aucune recette ne contient « ${inputSearchValue} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`;

        filterRecipes = recipesToDisplay.filter(
          (obj) =>
            obj.name.toUpperCase() === inputSearchValue ||
            obj.description.toUpperCase() === inputSearchValue ||
            obj.ingredients.some(
              (item) => item.ingredient.toUpperCase() === inputSearchValue
            )
        );
        totalRecipes(filterRecipes);
      }
    }
  } else {
    displayData(recipesToDisplay);
    totalRecipes(recipesToDisplay);
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

// Search input dropdown
const inputSearchIngredients = document.getElementById("search-ingredient");
const inputSearchAppliances = document.getElementById("search-appliance");
const inputSearchUstensils = document.getElementById("search-ustensils");

inputSearchIngredients.addEventListener("keyup", () => {
  filterFunction(inputSearchIngredients, "ingredients");
});

inputSearchAppliances.addEventListener("keyup", () => {
  filterFunction(inputSearchAppliances, "appliance");
});

inputSearchUstensils.addEventListener("keyup", () => {
  filterFunction(inputSearchUstensils, "ustensils");
});

// Dropdown filters
function filterFunction(dropdownId, dropdownListId) {
  let i;
  const input = dropdownId;
  const filter = input.value.toUpperCase();
  const div = document.getElementById(dropdownListId);
  const a = div.getElementsByTagName("a");

  for (i = 0; i < a.length; i++) {
    const txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].parentElement.style.display = "";
    } else {
      a[i].parentElement.style.display = "none";
    }
  }
}

// Display Filters Dropdown
displayFiltersData("ingredients");
displayFiltersData("appliance");
displayFiltersData("ustensils");

// Display numbers total of Recipes
export function totalRecipes(totalRecipes) {
  const recipesCount = document.querySelector(".number-of-recipes p");
  const initialValue = totalRecipes.length;
  //   const totalRecipes = recipes.reduce(
  //     (accumulator, recipe) => accumulator + recipe.id,
  //     initialValue
  //   );
  recipesCount.textContent = `${initialValue} recettes`;
}

totalRecipes(filterRecipes);

// Dropdown menu filters tags
const btnGroupIngredients = document.querySelector("#btnGroupDrop1");
const btnGroupAppliance = document.querySelector("#btnGroupDrop2");
const btnGroupUstensils = document.querySelector("#btnGroupDrop3");
const dropDownMenuIngredients = document.querySelector(
  "#btnGroupDrop1 ~ .dropdown-menu"
);
const dropDownMenuAppliance = document.querySelector(
  "#btnGroupDrop2 ~ .dropdown-menu"
);
const dropDownMenuUstensils = document.querySelector(
  "#btnGroupDrop3 ~ .dropdown-menu"
);

btnGroupIngredients.addEventListener("click", () => {
  dropDownMenuIngredients.classList.toggle("show");
  btnGroupIngredients.classList.toggle("btn-open");
});

btnGroupAppliance.addEventListener("click", () => {
  dropDownMenuAppliance.classList.toggle("show");
  btnGroupAppliance.classList.toggle("btn-open");
});

btnGroupUstensils.addEventListener("click", () => {
  dropDownMenuUstensils.classList.toggle("show");
  btnGroupUstensils.classList.toggle("btn-open");
});
