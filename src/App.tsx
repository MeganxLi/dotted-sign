import { Route, Routes } from "react-router-dom";
import Head from "./components/Head";
import routes from "./route/router";

function App() {
  return (
    <div className="App ">
      <Head />
      <Routes>
        {routes.map((router, i) => (
          <Route key={i} path={router.path} element={router.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
