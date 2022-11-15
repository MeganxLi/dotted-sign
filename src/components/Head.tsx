import React from "react";
import routes from "../route/router";

const Head = () => {
  return (
    <header>
      <div className="Logo rounded-large">
        <img src="/images/Logo.png" alt="Logo" />
      </div>
      <nav className="rounded-large">
        <ul>
          {routes.map((page, idx) => {
            return <li key={idx}> {page.name}</li>;
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Head;
