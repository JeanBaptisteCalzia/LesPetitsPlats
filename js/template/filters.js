import { recipes } from "../data/recipes.js";

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

// Filters template
export function getFiltersDOM(id) {
  // Wrapper
  const wrapper = document.getElementById(id);
  const listDropdown = document.getElementById(id);

  // Display Appliances
  if (id === "appliance") {
    let numberOfLi = filterApplianceRecipes.length;
    listDropdown.textContent = "";

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterApplianceRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);
    }
  }

  // Display Ustencils
  if (id === "ustensils") {
    let numberOfLi = filterUstensilsRecipes.length;
    listDropdown.textContent = "";

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterUstensilsRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);
    }
  }

  // Display Ingredients
  if (id === "ingredients") {
    let numberOfLi = filterIngredientsRecipes.length;
    listDropdown.textContent = "";

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterIngredientsRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);
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
