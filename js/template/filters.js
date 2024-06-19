import { recipes } from "../data/recipes.js";
import { filters, search } from "../pages/index.js";

// Retrieve Appliance elements
const applianceRecipe = recipes.map((appliance) => appliance.appliance);

// Retrieve Ustencils elements
const ustensilsRecipe = recipes.map((ustensil) => ustensil.ustensils);
const mergeUstensilsRecipe = ustensilsRecipe.flat(1); // The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

// Retrieve Ingredients elements
const ingredientsRecipe = recipes.map((ingredient) => ingredient.ingredients);
const ingredientsRecipeOnly = ingredientsRecipe
  .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
  .map((ingredient) => ingredient.ingredient);

// Make the first letter of a string uppercase, the rest to lowercase
function capitalizeFirstLetter(filter) {
  const newArray = [];
  for (let i = 0; i < filter.length; i++) {
    const array = filter[i][0].toUpperCase() + filter[i].slice(1).toLowerCase();
    newArray.push(array);
  }
  return newArray;
}

const filterAppliance = capitalizeFirstLetter(applianceRecipe);
const filterUstensils = capitalizeFirstLetter(mergeUstensilsRecipe);
const filterIngredients = capitalizeFirstLetter(ingredientsRecipeOnly);

// Remove duplicate elements inside an array
export const filterApplianceRecipes = [...new Set(filterAppliance)];
export const filterUstensilsRecipes = [...new Set(filterUstensils)];
export const filterIngredientsRecipes = [...new Set(filterIngredients)];

// Retrieve index of target element inside dropdowns (Ingredients, appliances, ustensils)
let applianceDropdownIndex;
let ustensilsDropdownIndex;
let ingredientsDropdownIndex;

// Filters template
export function getFiltersDOM(id) {
  // Wrapper
  const wrapper = document.getElementById(id);
  const listDropdown = document.getElementById(id);

  // Display Appliances
  if (id === "appliance") {
    let numberOfLi = filterApplianceRecipes.length;
    listDropdown.innerHTML = "";

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterApplianceRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);

      list.addEventListener("click", (e) => {
        let tagValue = e.target.textContent.toUpperCase();

        const filterApplianceRecipesTouppercase = filterApplianceRecipes.map(
          (item) => item.toUpperCase()
        );

        applianceDropdownIndex =
          filterApplianceRecipesTouppercase.indexOf(tagValue);

        console.log(applianceDropdownIndex);

        if (applianceDropdownIndex > -1) {
          filterApplianceRecipes.splice(applianceDropdownIndex, 1);
          listDropdown.innerHTML = "";
        }
      });
    }
  }

  // Display Ustensils
  if (id === "ustensils") {
    let numberOfLi = filterUstensilsRecipes.length;
    listDropdown.innerHTML = "";

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterUstensilsRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);

      list.addEventListener("click", (e) => {
        let tagValue = e.target.textContent.toUpperCase();

        const filterUstensilsRecipesTouppercase = filterUstensilsRecipes.map(
          (item) => item.toUpperCase()
        );

        ustensilsDropdownIndex =
          filterUstensilsRecipesTouppercase.indexOf(tagValue);

        if (ustensilsDropdownIndex > -1) {
          filterUstensilsRecipes.splice(ustensilsDropdownIndex, 1);
          listDropdown.innerHTML = "";
        }
      });
    }
  }

  // Display Ingredients
  if (id === "ingredients") {
    let numberOfLi = filterIngredientsRecipes.length;
    listDropdown.innerHTML = "";

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterIngredientsRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);

      list.addEventListener("click", (e) => {
        let tagValue = e.target.textContent.toUpperCase();

        const filterIngredientsRecipesTouppercase =
          filterIngredientsRecipes.map((item) => item.toUpperCase());

        ingredientsDropdownIndex =
          filterIngredientsRecipesTouppercase.indexOf(tagValue);

        if (ingredientsDropdownIndex > -1) {
          filterIngredientsRecipes.splice(ingredientsDropdownIndex, 1);
          listDropdown.innerHTML = "";
        }
      });
    }
  }

  return wrapper;
}

// Display Filters template
export function displayFiltersData(id) {
  const filtersSection = document.getElementById(id);
  const filtersCardDOM = getFiltersDOM(id);
  filtersSection.contains(filtersCardDOM);
}

// Tags template
function getTagsDOM(id, tagValue) {
  const wrapper = document.getElementById(id);
  const tags = document.querySelector(".tags ul");
  const btn = document.createElement("button");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const spanIcon = document.createElement("span");
  const icon = document.createElement("i");
  const capitalizedTagValue =
    tagValue.toLowerCase().charAt(0).toUpperCase() +
    tagValue.toLowerCase().slice(1);

  li.setAttribute("class", "list-group-item");
  li.setAttribute("type", id);
  li.appendChild(btn);
  btn.setAttribute("class", "btn");
  btn.setAttribute("type", "button");
  btn.appendChild(span);
  btn.appendChild(spanIcon);
  span.textContent = capitalizedTagValue;
  spanIcon.setAttribute("class", "badge");
  spanIcon.appendChild(icon);
  icon.setAttribute("class", "fa-solid fa-xmark");
  tags.appendChild(li);

  li.addEventListener("click", () => {
    const filterIndex = filters.findIndex(
      (item) => item.type === id && item.name === tagValue
    );

    // Insert elements to dropdown (Ingredients, appliances, ustensils)
    // dropdownIndex: The starting position to insert; 0: instructs the splice() method to not delete any array elements; capitalizedTagValue : element to insert
    if (id === "ingredients") {
      filterIngredientsRecipes.splice(
        ingredientsDropdownIndex,
        0,
        capitalizedTagValue
      );
    }

    if (id === "appliance") {
      filterApplianceRecipes.splice(
        applianceDropdownIndex,
        0,
        capitalizedTagValue
      );
    }

    if (id === "ustensils") {
      filterUstensilsRecipes.splice(
        ustensilsDropdownIndex,
        0,
        capitalizedTagValue
      );
    }

    // Delete tags elements
    filters.splice(filterIndex, 1);

    search();
  });

  return wrapper;
}

// Display Tags template
export function displayTags() {
  const tagsSection = document.querySelector(".tags ul");
  tagsSection.innerHTML = "";

  filters.forEach((filter) => {
    getTagsDOM(filter.type, filter.name);
  });
}
