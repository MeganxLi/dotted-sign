import React from "react";
import routes from "../route/router";

const Head = () => {
  return (
    <header className="
      absolute w-full px-5 py-4 
      grid justify-between grid-cols-[max-content_minmax(465px,_max-content)]
    ">
      <div className="Logo bg-white shadow-base rounded-large px-8 py-4 ">
        <img src="/images/Logo.png" alt="Logo" />
      </div>
      <nav className="rounded-large bg-white shadow-base flex items-center justify-between pr-2 pl-12">
        <ul className="grid grid-cols-3 gap-12 ">
          {routes.map((page, idx) => {
            return <li key={idx} className="flex gap-2"> {page.name}</li>;
          })}
        </ul>
        <div className="p-1 outline outline-1 outline-black/20 rounded-full

"><img src="images/user.png" /></div>
      </nav>
    </header>
  );
};

export default Head;
