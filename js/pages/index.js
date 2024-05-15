import { recipes } from "../data/recipes.js";

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
      const quantityUnit = document.createElement("span");

      // Row inner div
      const rowInnerDiv = document.createElement("div");
      rowInnerDiv.setAttribute("class", "col-6");

      rowInnerDiv.appendChild(ingredientDesc);
      rowInnerDiv.appendChild(quantityUnit);
      row.appendChild(rowInnerDiv);
      ingredientDesc.textContent = ingredientsRecipe[i];
      quantityUnit.textContent = quantityRecipe[i] ?? "" + unitRecipe[i] ?? "";
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

function displayData(recipes) {
  const cardsSection = document.querySelector(".cards");
  recipes.forEach((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    cardsSection.appendChild(recipeCardDOM);
  });
}

displayData(recipes);
