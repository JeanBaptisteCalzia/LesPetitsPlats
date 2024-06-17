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
  // Wrapper
  const wrapper = document.getElementById(id);
  const tags = document.querySelector(".tags ul");
  const btn = document.createElement("button");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const capitalizedSpan =
    tagValue.toLowerCase().charAt(0).toUpperCase() +
    tagValue.toLowerCase().slice(1);
  const spanIcon = document.createElement("span");
  const icon = document.createElement("i");

  li.setAttribute("class", "list-group-item");
  li.appendChild(btn);
  btn.setAttribute("class", "btn");
  btn.setAttribute("type", "button");
  btn.appendChild(span);
  btn.appendChild(spanIcon);
  span.textContent = capitalizedSpan;
  spanIcon.setAttribute("class", "badge");
  spanIcon.appendChild(icon);
  icon.setAttribute("class", "fa-solid fa-xmark");
  tags.appendChild(li);

  return wrapper;
}

// Display Tags template
export function displayTags(id, tagValue, array) {
  const tagsSection = document.querySelector(".tags ul");
  const tagsDOM = getTagsDOM(id, tagValue);
  const li = document.querySelectorAll(".list-group-item");
  const listDropdown = document.getElementById(id);
  const index = filters.indexOf(tagValue);

  // const arrayUppercase = array.map((item) => item.toUpperCase());
  // const i = arrayUppercase.indexOf(tagValue);

  // console.log("Tag value from Dropdown list");
  // console.log(i);
  // console.log("-------------------");

  console.log("Tag value from filters");
  console.log(index);
  console.log(filters);
  console.log("-------------------");

  tagsSection.contains(tagsDOM);

  // Remove tags
  li.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.currentTarget.remove(li);

      if (index > -1) {
        // only splice array when item is found
        filters.splice(index, 1); // 2nd parameter means remove one item only
        // listDropdown.innerHTML = "";

        // const cardsSection = document.querySelector(".cards");
        // cardsSection.innerHTML = "";
        // search();

        if (filters.length === 0) {
          console.log("Empty");
        }

        console.log("Remove Tag value");
        console.log(index);
        console.log(filters);
        console.log("-------------------");
      }

      // Insert elements to dropdown (Ingredients, appliances, ustensils)
      // i: The starting position to insert; 0: instructs the splice() method to not delete any array elements; capitalizedTagValue : element to insert
      // const capitalizedTagValue =
      //   tagValue.toLowerCase().charAt(0).toUpperCase() +
      //   tagValue.toLowerCase().slice(1);
      // array.splice(i, 0, capitalizedTagValue);

      // listDropdown.innerHTML = "";
      search();
    });
  });
}
