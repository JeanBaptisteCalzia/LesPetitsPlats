import { recipes } from "../data/recipes.js";
import { displayData } from "../template/recipes.js";
import {
  displayFiltersData,
  getFiltersDOM,
  filterApplianceRecipes,
  filterUstensilsRecipes,
  filterIngredientsRecipes,
} from "../template/filters.js";

export let originalRecipes = [...recipes];
export let recipesToDisplay = [...originalRecipes];

// DOM Elements
const inputSearch = document.getElementById("search-recipes");
const btnSearch = document.querySelector(".btn-search");
const btnClearSearch = document.querySelector(".btn-clear");
const cardsContainer = document.querySelector(".cards");
const ingredientDropdownFilterElements = document.querySelectorAll(
  "#ingredients .dropdown-item"
);
const applianceDropdownFilterElements = document.querySelectorAll(
  "#appliance .dropdown-item"
);
const ustensilDropdownFilterElements = document.querySelectorAll(
  "#ustensils .dropdown-item"
);
const cardsContent = document.querySelector(".cards");

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
  displayData(recipesToDisplay);
  totalRecipes();
  // Display Filters Dropdown
  displayFiltersData("ingredients");
  displayFiltersData("appliance");
  displayFiltersData("ustensils");
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
    recipesToDisplay = [...originalRecipes];
    recipesToDisplay = recipesToDisplay.filter(
      (recipe) =>
        recipe.name.toUpperCase().includes(inputSearchValue) ||
        recipe.description.toUpperCase().includes(inputSearchValue) ||
        recipe.ingredients.some((item) =>
          item.ingredient.toUpperCase().includes(inputSearchValue)
        )
    );

    document.dispatchEvent(refreshEvent);

    if (recipesToDisplay.length === 0) {
      cardsContainer.innerHTML += `Aucune recette ne contient « ${inputSearchValue} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }
  } else {
    recipesToDisplay = [...originalRecipes];
    document.dispatchEvent(refreshEvent);
  }
});

// Launch refreshDisplay function on tagUpdated custom event
// document.addEventListener("tagUpdated", () => {
//   refreshDisplay();
// });

// const refreshTagsEvent = new CustomEvent("tagUpdated");
// document.dispatchEvent(refreshTagsEvent);

// Tags search Ustensils
ustensilDropdownFilterElements.forEach((item) => {
  item.addEventListener("click", () => {
    let tagValue = item.textContent.toUpperCase();

    recipesToDisplay = recipesToDisplay.filter((recipe) =>
      recipe.ustensils.some((item) => item.toUpperCase().includes(tagValue))
    );

    cardsContent.innerHTML = "";
    // document.dispatchEvent(refreshTagsEvent);
  });
});

// Tags search Ingredients
ingredientDropdownFilterElements.forEach((item) => {
  item.addEventListener("click", () => {
    let tagValue = item.textContent.toUpperCase();

    recipesToDisplay = recipesToDisplay.filter((recipe) =>
      recipe.ingredients.some((item) =>
        item.ingredient.toUpperCase().includes(tagValue)
      )
    );

    cardsContent.innerHTML = "";
    // document.dispatchEvent(refreshTagsEvent);
  });
});

// Tags search Appliance
applianceDropdownFilterElements.forEach((item) => {
  item.addEventListener("click", () => {
    let tagValue = item.textContent.toUpperCase();

    recipesToDisplay = recipesToDisplay.filter((recipe) =>
      recipe.appliance.toUpperCase().includes(tagValue)
    );

    cardsContent.innerHTML = "";
    // document.dispatchEvent(refreshTagsEvent);
  });
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

// DOM Elements
const ustensilsDropdown = document.getElementById("ustensils");
const applianceDropdown = document.getElementById("appliance");
const ingredientsDropdown = document.getElementById("ingredients");

// Filtering by ustensils on click event
ustensilsDropdown.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item")) {
    let list = e.target.textContent;
    addRemoveTags(list, filterUstensilsRecipes, "ustensils");
  }
});

// Filtering by ingredients on click event
ingredientsDropdown.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item")) {
    let list = e.target.textContent;
    addRemoveTags(list, filterIngredientsRecipes, "ingredients");
  }
});

// Filtering by appliances on click event
applianceDropdown.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item")) {
    let list = e.target.textContent;
    addRemoveTags(list, filterApplianceRecipes, "appliance");
  }
});

function addRemoveTags(item, filter, id) {
  let i = 0;
  let numberOfLi = filter.length;
  const tags = document.querySelector(".tags ul");
  const btn = document.createElement("button");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const spanIcon = document.createElement("span");
  const icon = document.createElement("i");
  const listDropdown = document.getElementById(id);

  while (i < numberOfLi) {
    if (item == filter[i]) {
      li.setAttribute("class", "list-group-item");
      li.appendChild(btn);
      btn.setAttribute("class", "btn");
      btn.setAttribute("type", "button");
      btn.appendChild(span);
      btn.appendChild(spanIcon);
      span.textContent = item;
      spanIcon.setAttribute("class", "badge");
      spanIcon.appendChild(icon);
      icon.setAttribute("class", "fa-solid fa-xmark");
      tags.appendChild(li);
      // i: The position of the first item to delete; 1: number of items to delete
      filter.splice(i, 1);
      const Currentindex = i;

      let tagValue = item.toUpperCase();

      if (id === "ustensils") {
        recipesToDisplay = recipesToDisplay.filter((recipe) =>
          recipe.ustensils.some((item) => item.toUpperCase().includes(tagValue))
        );
      }
      if (id === "ingredients") {
        recipesToDisplay = recipesToDisplay.filter((recipe) =>
          recipe.ingredients.some((item) =>
            item.ingredient.toUpperCase().includes(tagValue)
          )
        );
      }
      if (id === "appliance") {
        recipesToDisplay = recipesToDisplay.filter((recipe) =>
          recipe.appliance.toUpperCase().includes(tagValue)
        );
      }

      listDropdown.textContent = "";
      refreshDisplay();
      displayFiltersData(id);

      // Remove tags
      li.addEventListener("click", (event) => {
        const listItems = document.querySelectorAll(".tags ul li");

        if (listItems.length == 1 && inputSearch.value == "") {
          event.currentTarget.remove(li);
          filter.splice(Currentindex, 0, item);

          recipesToDisplay = [...originalRecipes];

          listDropdown.innerHTML = "";
          refreshDisplay();
          displayFiltersData(id);
        } else {
          // TO DO
          // function removeItem(array, itemToRemove) {
          //   const index = array.indexOf(itemToRemove);

          //   if (index !== -1) {
          //     array.splice(index, 1);
          //   }
          // }

          // removeItem(recipesToDisplay, Currentindex);

          event.currentTarget.remove(li);
          // Currentindex: The starting position to insert; 0: instructs the splice() method to not delete any array elements; item : element to insert
          filter.splice(Currentindex, 0, item);

          listDropdown.innerHTML = "";
          refreshDisplay();
          displayFiltersData(id);
        }
      });
    }
    i++;
  }
}
