import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage({
  data,
  filteredRecipes,
  setFilteredRecipes,
}) {
  // seach form state
  const [searchForm, setSearchForm] = useState({
    title: "",
  });

  // filter form state
  const [filters, setFilters] = useState({
    cuisine: "",
    cookingTime: "",
    category: "",
  });

  const navigate = useNavigate();

  // --------------------------------
  // SEARCH FUNCTIONALITY
  // --------------------------------
  function handleSearchChange(event) {
    const { name, value } = event.target;
    setSearchForm({ ...searchForm, [name]: value });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    setSearchForm({ title: "" });
    applyFiltersAndSearch(searchForm.title, filters);
  }

  // --------------------------------
  // FILTER FUNCTIONALITY
  // --------------------------------

  function handleFilterChange(event) {
    const { name, value } = event.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFiltersAndSearch(searchForm.title, newFilters);
  }

  function handleResetFilters(e) {
    e.preventDefault();
    const resetFilters = { cuisine: "", cookingTime: "", category: "" };
    setFilters(resetFilters);
    // re-apply search with cleared filters
    applyFiltersAndSearch(searchForm.title, resetFilters);
  }

  // --------------------------------
  // COMBINED FUNCTIONALITY
  // --------------------------------

  function applyFiltersAndSearch(
    searchTerm = searchForm.title,
    activeFilters = filters
  ) {
    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);

    // array that includes the filtered recipes.
    const filtered = data.filter((recipe) => {
      // --- Search logic ---
      const searchMatch = searchWords.every((word) => {
        const titleMatch = recipe.title.toLowerCase().includes(word);
        const ingredientsMatch = recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(word)
        );
        const tagsMatchSearch = recipe.tags.some((tag) =>
          tag.toLowerCase().includes(word)
        );
        return titleMatch || ingredientsMatch || tagsMatchSearch;
      });

      // --- Filter logic ---
      const cuisineMatch = activeFilters.cuisine
        ? recipe.cuisine.toLowerCase() === activeFilters.cuisine.toLowerCase()
        : true;

      let cookingTimeMatch = true;
      if (activeFilters.cookingTime === "<=30") {
        cookingTimeMatch = recipe.cookingTime <= 30;
      } else if (activeFilters.cookingTime === ">30") {
        cookingTimeMatch = recipe.cookingTime > 30;
      }

      const categoryMatch = !activeFilters.category
        ? true
        : recipe.category.toLowerCase() ===
          activeFilters.category.toLowerCase();

      return searchMatch && cuisineMatch && cookingTimeMatch && categoryMatch;
    });

    setFilteredRecipes(filtered);
  }

  return (
    <>
      <button onClick={() => navigate("/add-recipe")}>Suggest a Recipe</button>
      {/* search form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Search recipes..."
          onChange={handleSearchChange}
          value={searchForm.title}
        />
        <button type="submit">Search</button>
      </form>

      {/* filter form */}
      <form onReset={handleResetFilters}>
        {/* cuisine field */}
        <fieldset>
          <legend>Cuisine</legend>
          <label htmlFor="italian">Italian</label>
          <input
            type="radio"
            name="cuisine"
            value="italian"
            checked={filters.cuisine === "italian"}
            onChange={handleFilterChange}
          />

          <label htmlFor="mexican">Mexican</label>
          <input
            type="radio"
            name="cuisine"
            value="mexican"
            checked={filters.cuisine === "mexican"}
            onChange={handleFilterChange}
          />

          <label htmlFor="indian">Indian</label>
          <input
            type="radio"
            name="cuisine"
            value="indian"
            checked={filters.cuisine === "indian"}
            onChange={handleFilterChange}
          />

          <label htmlFor="american">American</label>
          <input
            type="radio"
            name="cuisine"
            value="american"
            checked={filters.cuisine === "american"}
            onChange={handleFilterChange}
          />

          <label htmlFor="asian">Asian</label>
          <input
            type="radio"
            name="cuisine"
            value="asian"
            checked={filters.cuisine === "asian"}
            onChange={handleFilterChange}
          />
        </fieldset>

        {/* cooking time field */}
        <fieldset>
          <legend>Cooking Time</legend>
          <label htmlFor="<=30">{"<="}30</label>
          <input
            type="radio"
            name="cookingTime"
            value="<=30"
            checked={filters.cookingTime === "<=30"}
            onChange={handleFilterChange}
          />
          <label htmlFor=">30">{">"}30</label>
          <input
            type="radio"
            name="cookingTime"
            value=">30"
            checked={filters.cookingTime === ">30"}
            onChange={handleFilterChange}
          />
        </fieldset>

        {/* category field */}

        <fieldset>
          <legend>Category</legend>
          <label htmlFor="breakfast">Breakfast</label>
          <input
            type="radio"
            name="category"
            value="breakfast"
            checked={filters.category === "breakfast"}
            onChange={handleFilterChange}
          />

          <label htmlFor="lunch">Lunch</label>
          <input
            type="radio"
            name="category"
            value="lunch"
            checked={filters.category === "lunch"}
            onChange={handleFilterChange}
          />

          <label htmlFor="dinner">Dinner</label>
          <input
            type="radio"
            name="category"
            value="dinner"
            checked={filters.category === "dinner"}
            onChange={handleFilterChange}
          />

          <label htmlFor="salad">Salad</label>
          <input
            type="radio"
            name="category"
            value="salad"
            checked={filters.category === "salad"}
            onChange={handleFilterChange}
          />

          <label htmlFor="desert">Desert</label>
          <input
            type="radio"
            name="category"
            value="desert"
            checked={filters.category === "desert"}
            onChange={handleFilterChange}
          />
        </fieldset>
        <button type="reset">Remove Filters</button>
      </form>
      <section>
        {filteredRecipes.length > 0 &&
          filteredRecipes.map((recipe) => (
            <article key={recipe.id}>
              <h2>{recipe.title}</h2>
              <p>Category: {recipe.category}</p>
              <p>Ingredients:</p>
              <ul>
                {recipe.ingredients.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>
              <p>Cuisine: {recipe.cuisine}</p>
              <p>Cooking time: {recipe.cookingTime}</p>
              <p>Tags:</p>
              <ul>
                {recipe.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>

              <button onClick={() => navigate(`/recipe/${recipe.id}`)}>
                Learn More
              </button>
            </article>
          ))}
      </section>
    </>
  );
}
