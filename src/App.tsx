import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
