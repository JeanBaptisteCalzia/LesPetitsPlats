import { recipes } from "../data/recipes.js";
import { displayData } from "../template/recipes.js";
import { displayFiltersData, displayTags } from "../template/filters.js";

export let originalRecipes = [...recipes];
export let recipesToDisplay = [...originalRecipes];

let mainSearch = []; // tableau de string
export let filters = []; // tableau d'objets de type => { type: '', name: '' }

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");

export function search() {
  // Vu qu'on est maintenant dans une unique fonction de recherche
  // on peut commencer par réinitialiser la liste des recettes
  recipesToDisplay = [...originalRecipes];

  // Ensuite on filtre cette liste en fonction des termes recherchés
  // dans la recherche principale
  if (mainSearch.length > 0) {
    const mainSearchLength = mainSearch.length;
    for (let i = 0; i < mainSearchLength; i++) {
      const searchTerm = mainSearch[i];
      recipesToDisplay = recipesToDisplay.filter(
        (recipe) =>
          recipe.name.toUpperCase().includes(searchTerm) ||
          recipe.description.toUpperCase().includes(searchTerm) ||
          recipe.ingredients.some((item) =>
            item.ingredient.toUpperCase().includes(searchTerm)
          )
      );
    }
  }

  // Ensuite on filtre cette liste en fonction des termes recherchés
  // dans la recherche avancée (par tags)
  const tagsFiltersLength = filters.length;

  for (let i = 0; i < tagsFiltersLength; i++) {
    const filter = filters[i];
    const tagType = filter.type;
    const searchTags = filter.name;

    recipesToDisplay = recipesToDisplay.filter(
      (recipe) =>
        recipe.appliance.toUpperCase().includes(searchTags) ||
        recipe.ustensils.some((ustensil) =>
          ustensil.toUpperCase().includes(searchTags)
        ) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toUpperCase().includes(searchTags)
        )
    );
  }
  refreshDisplay();
}

// Main search
inputSearch.addEventListener("input", (event) => {
  let inputSearchValue = event.target.value.toUpperCase();
  mainSearch = [];
  if (inputSearchValue.length > 2) {
    const inputSearchValueArray = inputSearchValue.split(",");
    for (let i = 0; i < inputSearchValueArray.length; i++) {
      mainSearch.push(inputSearchValueArray[i].trim());
    }
    btnClearSearch.style.display = "block";
  } else {
    btnClearSearch.style.display = "none";
  }

  search();
});

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
export function refreshDisplay() {
  displayData(recipesToDisplay, mainSearch.toString());
  totalRecipes();
  // Display Filters Dropdown
  displayFiltersData("ingredients");
  displayFiltersData("appliance");
  displayFiltersData("ustensils");
  // Display Tags
  displayTags();
}

// Launch Search once page is loaded
search();

// Search recipes on click
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  refreshDisplay();
});

// Clear input search value on click
btnClearSearch.addEventListener("click", (event) => {
  event.preventDefault();
  inputSearch.value = "";
  btnClearSearch.style.display = "none";
  mainSearch = [];
  search();
});

// Search input dropdown
const inputSearchIngredients = document.getElementById("search-ingredient");
const inputSearchAppliances = document.getElementById("search-appliance");
const inputSearchUstensils = document.getElementById("search-ustensils");

inputSearchIngredients.addEventListener("keyup", () => {
  filterFunction(
    inputSearchIngredients,
    "ingredients",
    "#search-ingredient + .btn-clear"
  );
});

inputSearchAppliances.addEventListener("keyup", () => {
  filterFunction(
    inputSearchAppliances,
    "appliance",
    "#search-appliance + .btn-clear"
  );
});

inputSearchUstensils.addEventListener("keyup", () => {
  filterFunction(
    inputSearchUstensils,
    "ustensils",
    "#search-ustensils + .btn-clear"
  );
});

// Dropdown search icon
const btnSearchDropdown = document.querySelectorAll(".filters .btn-search");
btnSearchDropdown.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Dropdown filters
function filterFunction(dropdownId, dropdownListId, btnClearSearch) {
  let i;
  const input = dropdownId;
  const filter = input.value.toUpperCase();
  const div = document.getElementById(dropdownListId);
  const a = div.getElementsByTagName("a");
  const btnClearSearchDropdown = document.querySelector(btnClearSearch);
  const searchIngredients = dropdownId;

  if (filter.length > 2) {
    btnClearSearchDropdown.style.display = "block";

    // Clear input search value on click
    btnClearSearchDropdown.addEventListener("click", (event) => {
      event.preventDefault();
      searchIngredients.value = "";
      mainSearch = [];
      search();
    });
  } else {
    btnClearSearchDropdown.style.display = "none";
  }

  for (i = 0; i < a.length; i++) {
    const txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].parentElement.style.display = "";
    } else {
      a[i].parentElement.style.display = "none";
    }
  }
}

// DOM Element
let btnGroupBtn = document.querySelectorAll(
  ".filters-content .btn-group button"
);
// Dropdown menu filters tags
btnGroupBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    let dropDownMenu = e.target;
    let dropDownMenuContent = dropDownMenu.nextElementSibling;
    dropDownMenuContent.classList.toggle("show");
    dropDownMenu.classList.toggle("btn-open");
  });
});

// DOM Element
let dropdowns = document.querySelectorAll(".dropdown-menu__container ul");
// Filtering by appliances, ustensils, ingredients on click event
dropdowns.forEach((element) => {
  element.addEventListener("click", (e) => {
    let tagValue = e.target.textContent.toUpperCase();
    let tagType = e.currentTarget.dataset.id;
    filters.push({ type: tagType, name: tagValue });
    search();
  });
});
