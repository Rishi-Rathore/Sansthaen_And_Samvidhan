function App() {
  let element = null;
  let isLoggedIn = false;
  if (isLoggedIn) {
    element = <h2>Welcome Admin</h2>;
  } else {
    element = <h2>Please Login</h2>;
  }
  return <>{element}</>;
}
export default App;
