import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate("/add-recipe");
  }
  return (
    <>
      <h1>Login page.</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
