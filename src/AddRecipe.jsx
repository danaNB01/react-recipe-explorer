import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [isSent, setIsSent] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsSent(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }
  return (
    <>
      {isSent ? (
        <h1>Thanks for your suggestion ;)</h1>
      ) : (
        <>
          <h1>Suggest Your Recipe ;)</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              name="suggestion"
              id="suggestion"
              placeholder="write your recipe name and description..."
            ></textarea>
            <button type="submit">Done</button>
          </form>
        </>
      )}
    </>
  );
}
