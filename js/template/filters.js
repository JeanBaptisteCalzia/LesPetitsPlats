// import { recipes } from "../data/recipes.js";
import { filters, recipesToDisplay, search } from "../pages/index.js";

// Make the first letter of a string uppercase, the rest to lowercase
function capitalizeFirstLetter(filter) {
  const newArray = [];
  for (let i = 0; i < filter.length; i++) {
    const array = filter[i][0].toUpperCase() + filter[i].slice(1).toLowerCase();
    newArray.push(array);
  }
  return newArray;
}

// We initialize dropdowns filters array
export let filterApplianceRecipes = [];
export let filterUstensilsRecipes = [];
export let filterIngredientsRecipes = [];

export function initialiseFilters() {
  // Retrieve Appliance elements
  const applianceRecipe = recipesToDisplay.map(
    (appliance) => appliance.appliance
  );

  // Retrieve Ustencils elements
  const ustensilsRecipe = recipesToDisplay.map(
    (ustensil) => ustensil.ustensils
  );
  const mergeUstensilsRecipe = ustensilsRecipe.flat(1); // The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

  // Retrieve Ingredients elements
  const ingredientsRecipe = recipesToDisplay.map(
    (ingredient) => ingredient.ingredients
  );
  const ingredientsRecipeOnly = ingredientsRecipe
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
    .map((ingredient) => ingredient.ingredient);

  const filterIngredients = capitalizeFirstLetter(ingredientsRecipeOnly);
  const filterAppliance = capitalizeFirstLetter(applianceRecipe);
  const filterUstensils = capitalizeFirstLetter(mergeUstensilsRecipe);

  // Remove duplicate elements inside an array
  filterApplianceRecipes = [...new Set(filterAppliance)];
  filterUstensilsRecipes = [...new Set(filterUstensils)];
  filterIngredientsRecipes = [...new Set(filterIngredients)];
}

// Filters template
export function getFiltersDOM(id, array) {
  const wrapper = document.getElementById(id);
  const listDropdown = document.getElementById(id);
  let numberOfLi = array.length;

  listDropdown.innerHTML = "";

  for (let i = 0; i < numberOfLi; i++) {
    const list = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("class", "dropdown-item");
    link.textContent = array[i];
    list.appendChild(link);
    wrapper.appendChild(list);
  }

  return wrapper;
}

// Display Filters template
export function displayFiltersData(id, array) {
  const filtersSection = document.getElementById(id);
  const filtersCardDOM = getFiltersDOM(id, array);
  filtersSection.contains(filtersCardDOM);
}

// Tags template
function getTagsDOM(id, tagValue, currentIndex) {
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

  // On click we remove tags and insert tagValue to the currentIndex of the list of dropdowns (Ingredients, appliances, ustensils)
  // currentIndex: The starting position to insert;
  // 0: instructs the splice() method to not delete any array elements;
  // capitalizedTagValue : element to insert
  li.addEventListener("click", () => {
    let filterElementRecipes;
    switch (id) {
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
    filterElementRecipes.splice(currentIndex, 0, capitalizedTagValue);

    const filterIndex = filters.findIndex(
      (item) => item.type === id && item.name === tagValue
    );

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
    getTagsDOM(filter.type, filter.name, filter.index);
  });
}
