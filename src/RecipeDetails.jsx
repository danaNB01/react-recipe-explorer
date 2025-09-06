import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetails({ filteredRecipes }) {
  const { id } = useParams();

  const recipe = filteredRecipes.find((recipe) => recipe.id === Number(id));

  return (
    <>
      {recipe ? (
        <section>
          <h1>{recipe.title}</h1>
          <img
            src={recipe.image}
            alt={`${recipe.title} - ${recipe.description}`}
          />

          <p>{recipe.description}</p>
          <p>Ingredients:</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>

          <p>Instructions:</p>

          <ul>
            {recipe.instructions.map((instruction) => (
              <li>{instruction}</li>
            ))}
          </ul>

          <p>Cuisine: {recipe.cuisine}</p>
          <p>Category: {recipe.category}</p>
          <p>Cooking time: {recipe.cookingTime} min.</p>
        </section>
      ) : (
        <p>Recipe not found</p>
      )}
    </>
  );
}
