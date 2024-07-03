import { recipes } from "../data/recipes.js";
import { displayData } from "../template/recipes.js";
import {
  displayFiltersData,
  displayTags,
  filterUstensilsRecipes,
  filterIngredientsRecipes,
  filterApplianceRecipes,
  initialiseFilters,
} from "../template/filters.js";

export let originalRecipes = [...recipes];
export let recipesToDisplay = [...originalRecipes];

let mainSearch = []; // Array of strings
export let filters = []; // Array of objects => { type: '', name: '' }

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");

export function search() {
  // We initialized recipes
  recipesToDisplay = [...originalRecipes];

  // We filter recipes according to the searched terms in the main search
  if (mainSearch.length > 0) {
    mainSearch.forEach((element) => {
      const searchTerm = element;
      recipesToDisplay = recipesToDisplay.filter(
        (recipe) =>
          recipe.name.toUpperCase().includes(searchTerm) ||
          recipe.description.toUpperCase().includes(searchTerm) ||
          recipe.ingredients.some((item) =>
            item.ingredient.toUpperCase().includes(searchTerm)
          )
      );
    });
  }

  // We filter recipes according to the searched terms in advanced search (by tags)
  const tagsFiltersLength = filters.length;

  for (let i = 0; i < tagsFiltersLength; i++) {
    const filter = filters[i];
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

  // We retrieve Error messages
  const errorMessage = document.querySelectorAll("span.error-message");
  // We delete error messages (span)
  for (let message of Object.values(errorMessage)) {
    message.remove(errorMessage);
  }

  if (inputSearchValue.length > 2) {
    const inputSearchValueArray = inputSearchValue.split(",");
    for (let i = 0; i < inputSearchValueArray.length; i++) {
      mainSearch.push(inputSearchValueArray[i].trim());
      validateInput(inputSearchValue, "search-recipes");
    }
    btnClearSearch.style.display = "block";
  } else {
    btnClearSearch.style.display = "none";
  }

  search();
});

// Verify if when users search for recipes it's match the RegExp pattern
function validateInput(wordToSearch, inputId) {
  // prettier-ignore
  const inputSearchRegExp = new RegExp(
    /^[a-zA-ZÀ-Ÿ,\s]*$/
  );

  if (!inputSearchRegExp.test(wordToSearch)) {
    const newElement = document.createElement("span");
    const contentSpanEmail =
      "Vous devez entrer une recherche valide : De type groupe de mots. (Les espaces et virgules sont autorisés)";
    newElement.setAttribute("class", "error-message");
    newElement.textContent = contentSpanEmail;

    const inputElement = document.getElementById(inputId);
    inputElement.parentNode.parentNode.appendChild(newElement);
  }
}

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
  initialiseFilters();
  displayFiltersData("ingredients", filterIngredientsRecipes);
  displayFiltersData("appliance", filterApplianceRecipes);
  displayFiltersData("ustensils", filterUstensilsRecipes);
  // Display Tags
  displayTags();
}

// Launch search once page is loaded
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

  // We retrieve Error messages
  const errorMessage = document.querySelectorAll("header span.error-message");
  // We delete error messages (span)
  for (let message of Object.values(errorMessage)) {
    message.remove(errorMessage);
  }
});

// DOM Element
let inputSearchFilters = document.querySelectorAll(
  ".filters-content form input"
);
// Input search dropdown
inputSearchFilters.forEach((element) => {
  element.addEventListener("keyup", (e) => {
    // We retrieve Error messages
    const errorMessage = document.querySelectorAll(
      ".filters span.error-message"
    );
    // We delete error messages (span)
    for (let message of Object.values(errorMessage)) {
      message.remove(errorMessage);
    }

    let inputSearchVal = e.target.value.toUpperCase();
    let inputSearch = e.target;
    let inputSearchId = e.currentTarget.dataset.input;
    const inputSearchBtnclear = inputSearch.nextElementSibling;
    validateInput(inputSearchVal, inputSearchId);
    filterFunction(inputSearch, inputSearchId, inputSearchBtnclear);
  });
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
  const btnClearSearchDropdown = btnClearSearch;
  const searchFilters = dropdownId;

  if (filter.length > 0) {
    btnClearSearchDropdown.style.display = "block";

    // Clear input search value on click
    btnClearSearchDropdown.addEventListener("click", (event) => {
      event.preventDefault();
      searchFilters.value = "";
      div.innerHTML = "";
      search();

      // We retrieve Error messages
      const errorMessage = document.querySelectorAll(
        ".filters span.error-message"
      );
      // We delete error messages (span)
      for (let message of Object.values(errorMessage)) {
        message.remove(errorMessage);
      }
    });
  } else {
    btnClearSearchDropdown.style.display = "none";
    // We retrieve Error messages
    const errorMessage = document.querySelectorAll(
      ".filters span.error-message"
    );
    // We delete error messages (span)
    for (let message of Object.values(errorMessage)) {
      message.remove(errorMessage);
    }
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
  ".filters-content > .btn-group > button"
);
// Dropdown menu filters tags
btnGroupBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    let dropDownMenu = e.target;
    let dropDownMenuContent = dropDownMenu.nextElementSibling;
    let OpenDropdownMenu = !dropDownMenuContent.classList.contains("show");

    // First close all open dropdowns
    closeOpenDropdown();

    if (OpenDropdownMenu) {
      // Open the clicked dropdown
      dropDownMenuContent.classList.add("show");
      dropDownMenu.classList.add("btn-open");
    }
  });
});

function closeOpenDropdown() {
  let openDropdown = document.querySelectorAll(
    ".filters-content > .btn-group > .dropdown-menu"
  );

  openDropdown.forEach((dropdown) => {
    dropdown.classList.remove("show");
    dropdown.previousElementSibling.classList.remove("btn-open");
  });
}

// DOM Element
// We Select dropdowns ul container (Ingrédients, appliances, ustensils)
let dropdowns = document.querySelectorAll(".dropdown-menu__container ul");

// On click event : Filtering by appliances, ustensils, ingredients
dropdowns.forEach((element) => {
  element.addEventListener("click", (e) => {
    let tagValue = e.target.textContent.toUpperCase();
    let tagType = e.currentTarget.dataset.id;

    let filterElementRecipes;
    switch (tagType) {
      case "ingredients":
        filterElementRecipes = filterIngredientsRecipes;
        break;
      case "appliance":
        filterElementRecipes = filterApplianceRecipes;
        break;
      case "ustensils":
        filterElementRecipes = filterUstensilsRecipes;
        break;
    }

    filterElementRecipes.map((item) => item.toUpperCase());

    filters.push({ type: tagType, name: tagValue });
    search();
  });
});
