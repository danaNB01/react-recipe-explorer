import "./App.css";
import HomePage from "./HomePage";
import RecipeDetails from "./RecipeDetails";
import { Routes, Route } from "react-router-dom";
import data from "./data.json";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import AddRecipe from "./AddRecipe";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const recipesDataSet = data;
  const [filteredRecipes, setFilteredRecipes] = useState(data);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              data={recipesDataSet}
              filteredRecipes={filteredRecipes}
              setFilteredRecipes={setFilteredRecipes}
            />
          }
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetails filteredRecipes={filteredRecipes} />}
        />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/add-recipe"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <AddRecipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
