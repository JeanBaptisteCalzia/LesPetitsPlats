import { recipes } from "../data/recipes.js";
import { displayData } from "../template/recipes.js";

// Retrieve Recipes
const originalRecipes = [...recipes];

// Retrieve Appliance elements
const applianceRecipe = originalRecipes.map((appliance) => appliance.appliance);

// Retrieve Ustencils elements
const ustensilsRecipe = originalRecipes.map((ustensil) => ustensil.ustensils);
const mergeUstensilsRecipe = ustensilsRecipe.flat(1); // The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

// Retrieve Ingredients elements
const ingredientsRecipe = originalRecipes.map(
  (ingredient) => ingredient.ingredients
);
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
const filterApplianceRecipes = [...new Set(filterAppliance)];
const filterUstensilsRecipes = [...new Set(filterUstensils)];
const filterIngredientsRecipes = [...new Set(filterIngredients)];

// Filters template
export function getFiltersDOM(id) {
  // Wrapper
  const wrapper = document.getElementById(id);

  // Display Appliances
  if (id === "appliance") {
    let numberOfLi = filterApplianceRecipes.length;

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

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterIngredientsRecipes[i];
      list.appendChild(link);
      wrapper.appendChild(list);
    }
  }

  // Tags
  const ingredientDropdownFilterElements = document.querySelectorAll(
    "#ingredients .dropdown-item"
  );

  const applianceDropdownFilterElements = document.querySelectorAll(
    "#appliance .dropdown-item"
  );

  const ustensilDropdownFilterElements = document.querySelectorAll(
    "#ustensils .dropdown-item"
  );

  // Add Tags
  function addTags(dropDown, filter, id) {
    dropDown.forEach((item) => {
      item.addEventListener("click", () => {
        let i = 0;
        let numberOfLi = filter.length;

        const tags = document.querySelector(".tags ul");
        const btn = document.createElement("button");
        const li = document.createElement("li");
        const span = document.createElement("span");
        const spanIcon = document.createElement("span");
        const icon = document.createElement("i");
        const listDropdown = document.getElementById(id);
        const cardsContent = document.querySelector(".cards");

        while (i < numberOfLi) {
          if (item.textContent == filter[i]) {
            li.setAttribute("class", "list-group-item");
            li.appendChild(btn);
            btn.setAttribute("class", "btn");
            btn.setAttribute("type", "button");
            btn.appendChild(span);
            btn.appendChild(spanIcon);
            span.textContent = item.textContent;
            spanIcon.setAttribute("class", "badge");
            spanIcon.appendChild(icon);
            icon.setAttribute("class", "fa-solid fa-xmark");
            tags.appendChild(li);

            // Display Appliances
            if (id === "appliance") {
              cardsContent.innerHTML = "";
              const appliance = recipes.filter(
                (appliances) => appliances.appliance == item.textContent
              );
              displayData(appliance);
            }

            // i: The position of the first item to delete; 1: number of items to delete
            filter.splice(i, 1);
            const Currentindex = i;
            listDropdown.textContent = "";
            displayFiltersData(id);

            // Remove tags
            li.addEventListener("click", (event) => {
              event.currentTarget.remove(li);
              // i: The starting position to insert; 0: instructs the splice() method to not delete any array elements; item.textContent : element to insert
              filter.splice(Currentindex, 0, item.textContent);
              listDropdown.innerHTML = "";
              displayFiltersData(id);
            });
          }

          i++;
        }
      });
    });
  }

  addTags(
    ingredientDropdownFilterElements,
    filterIngredientsRecipes,
    "ingredients"
  );
  addTags(applianceDropdownFilterElements, filterApplianceRecipes, "appliance");
  addTags(ustensilDropdownFilterElements, filterUstensilsRecipes, "ustensils");

  return wrapper;
}

// Display Filters template
export function displayFiltersData(id) {
  const filtersSection = document.getElementById(id);
  const filtersCardDOM = getFiltersDOM(id);
  filtersSection.contains(filtersCardDOM);
}
