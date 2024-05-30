import { recipes } from "../data/recipes.js";
import { displayData } from "../template/recipes.js";
// import { getFiltersDOM, displayFiltersData } from "../template/filters.js";

// Recipes
const originalRecipes = [...recipes];
let recipesToDisplay = [...originalRecipes];

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");
const cardsContainer = document.querySelector(".cards");

// Display numbers total of Recipes
function totalRecipes() {
  const recipesCount = document.querySelector(".number-of-recipes p");
  if (recipesToDisplay.length > 1) {
    recipesCount.textContent = `${recipesToDisplay.length} recettes`;
  } else {
    recipesCount.textContent = `${recipesToDisplay.length} recette`;
  }
}

// Update display on search or by filters
function refreshDisplay() {
  displayData(recipesToDisplay);
  totalRecipes();
  // TODO : refresh filters list
}

// Launch refreshDisplay function on searchUpdated custom event
document.addEventListener("searchUpdated", () => {
  refreshDisplay();
});

const refreshEvent = new CustomEvent("searchUpdated");
document.dispatchEvent(refreshEvent);

// Main search
inputSearch.addEventListener("input", (event) => {
  let inputSearchValue = event.target.value.toUpperCase();

  if (inputSearchValue.length > 2) {
    recipesToDisplay = recipesToDisplay.filter(
      (recipe) =>
        recipe.name.toUpperCase().includes(inputSearchValue) ||
        recipe.description.toUpperCase().includes(inputSearchValue) ||
        recipe.ingredients.some((item) =>
          item.ingredient.toUpperCase().includes(inputSearchValue)
        )
    );

    document.dispatchEvent(refreshEvent);

    console.log(recipesToDisplay);

    if (recipesToDisplay.length === 0) {
      cardsContainer.innerHTML += `Aucune recette ne contient « ${inputSearchValue} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }
  } else {
    recipesToDisplay = [...originalRecipes];
    refreshDisplay();
  }
});

// Search recipes on click
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  document.dispatchEvent(refreshEvent);
});

// Clear input search value on click
btnClearSearch.addEventListener("click", (event) => {
  event.preventDefault();
  inputSearch.value = "";
  recipesToDisplay = [...originalRecipes];
  refreshDisplay();
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
// displayFiltersData("ingredients");
// displayFiltersData("appliance");
// displayFiltersData("ustensils");

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
