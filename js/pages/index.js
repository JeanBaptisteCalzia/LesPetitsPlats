import { recipes } from "../data/recipes.js";

// Retrieve Appliance elements
const applianceRecipe = recipes.map((appliance) => appliance.appliance);

// Retrieve Ustencils elements
const ustensilsRecipe = recipes.map((ustensil) => ustensil.ustensils);
const mergeUstensilsRecipe = ustensilsRecipe.flat(1); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

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
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// Remove duplicate elements inside Appliances array
const filterApplianceRecipe = removeDuplicates(filterAppliance);

// Remove duplicate elements inside Ustensils array
const filterUstensilsRecipe = removeDuplicates(filterUstensils);

// Remove duplicate elements inside Ingrédients array
const filterIngredientsRecipe = removeDuplicates(filterIngredients);

// Cards template
function recipeTemplate(data) {
  const { id, image, name, time, description, ingredients } = data;
  const picture = `img/recipes/${image}`;

  // Retrieve Ingredients elements
  const ingredientsRecipe = ingredients.map(
    (ingredient) => ingredient.ingredient
  );

  // Retrieve Quantities elements
  const quantityRecipe = ingredients.map((quantity) => quantity.quantity);

  // Retrieve Units elements
  const unitRecipe = ingredients.map((unit) => unit.unit);

  // Remove Undefined Values from Objects
  function cleanData(data) {
    const cleanData = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return cleanData;
  }

  const displayQuantityRecipe = cleanData(quantityRecipe);
  const displayUnitRecipe = cleanData(unitRecipe);

  function getRecipeCardDOM() {
    // Wrapper
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "col-12 col-md-6 col-lg-4 mb-5");

    //Link
    const link = document.createElement("a");
    link.setAttribute("href", "#");

    // Article
    const article = document.createElement("article");
    article.setAttribute("class", "card");

    // Span
    const span = document.createElement("span");
    span.setAttribute("class", "card-tag");
    span.textContent = `${time}min`;

    // Img
    const imageRecipe = document.createElement("img");
    imageRecipe.setAttribute("class", "card-img-top");
    imageRecipe.setAttribute("src", picture);

    // Card Body
    const divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    // H2
    const cardTitle = document.createElement("h2");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = name;

    // H3 (Recipe)
    const recipeTitle = document.createElement("h3");
    recipeTitle.textContent = `Recette`;

    // Description
    const p = document.createElement("p");
    p.textContent = description;

    // H3 (Ingredient)
    const ingredientTitle = document.createElement("h3");
    ingredientTitle.textContent = `Ingrédients`;

    // Row
    const row = document.createElement("div");
    row.setAttribute("class", "row");

    // Display Ingredient quantity & unit
    let numberOfDiv = ingredientsRecipe.length;

    for (let i = 0; i < numberOfDiv; i++) {
      // P (Ingredient) / Span (quantity & unit)
      const ingredientDesc = document.createElement("p");
      const quantity = document.createElement("span");
      const unit = document.createElement("span");

      // Row inner div
      const rowInnerDiv = document.createElement("div");
      rowInnerDiv.setAttribute("class", "col-6");

      rowInnerDiv.appendChild(ingredientDesc);
      rowInnerDiv.appendChild(quantity);
      rowInnerDiv.appendChild(unit);
      row.appendChild(rowInnerDiv);
      ingredientDesc.textContent = ingredientsRecipe[i];
      quantity.textContent = displayQuantityRecipe[i] ?? "";
      unit.textContent = displayUnitRecipe[i] ?? "";
    }

    // Append elements
    wrapper.appendChild(link);
    link.appendChild(article);
    article.appendChild(span);
    article.appendChild(imageRecipe);
    article.appendChild(divCardBody);
    divCardBody.appendChild(cardTitle);
    divCardBody.appendChild(recipeTitle);
    divCardBody.appendChild(p);
    divCardBody.appendChild(ingredientTitle);
    divCardBody.appendChild(row);
    return wrapper;
  }

  return {
    id,
    image,
    name,
    time,
    description,
    ingredients,
    getRecipeCardDOM,
  };
}

// Filters template
function getFiltersDOM(id) {
  // Wrapper
  const wrapper = document.getElementById(id);

  // Display Appliances
  if (id === "appliance") {
    let numberOfLi = filterApplianceRecipe.length;

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterApplianceRecipe[i];
      list.appendChild(link);
      wrapper.appendChild(list);
    }
  }

  // Display Ustencils
  if (id === "ustensils") {
    let numberOfLi = filterUstensilsRecipe.length;

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterUstensilsRecipe[i];
      list.appendChild(link);
      wrapper.appendChild(list);
    }
  }

  // Display Ingredients
  if (id === "ingredients") {
    let numberOfLi = filterIngredientsRecipe.length;

    for (let i = 0; i < numberOfLi; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("class", "dropdown-item");
      link.textContent = filterIngredientsRecipe[i];
      list.appendChild(link);
      wrapper.appendChild(list);
    }
  }

  return wrapper;
}

// Display Cards template
function displayData(recipes) {
  const cardsSection = document.querySelector(".cards");
  recipes.forEach((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    cardsSection.appendChild(recipeCardDOM);
  });
}

displayData(recipes);

// Display Filters template
function displayFiltersData(id) {
  const filtersSection = document.getElementById(id);
  const filtersCardDOM = getFiltersDOM(id);
  filtersSection.contains(filtersCardDOM);
}

displayFiltersData("ingredients");
displayFiltersData("appliance");
displayFiltersData("ustensils");

// Display numbers total of Recipes
function totalRecipes() {
  const recipesCount = document.querySelector(".number-of-recipes p");
  const initialValue = recipes.length;
  //   const totalRecipes = recipes.reduce(
  //     (accumulator, recipe) => accumulator + recipe.id,
  //     initialValue
  //   );
  recipesCount.textContent = `${initialValue} recettes`;
}

totalRecipes();

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

          // i: The position of the first item to delete; 1: number of items to delete
          filter.splice(i, 1);
          listDropdown.innerHTML = "";
          displayFiltersData(id);

          li.addEventListener("click", (event) => {
            event.currentTarget.remove(li);
            // i: The starting position to insert; 0: instructs the splice() method to not delete any array elements; item.textContent : element to insert
            filter.splice(i, 0, item.textContent);
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
  filterIngredientsRecipe,
  "ingredients"
);
addTags(applianceDropdownFilterElements, filterApplianceRecipe, "appliance");
addTags(ustensilDropdownFilterElements, filterUstensilsRecipe, "ustensils");
