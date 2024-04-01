import React from "react";
import CurrencyConverter from "./Components/CurrencyConverter";

function App() {

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="container">
        <CurrencyConverter/>
      </div>
    </div>
  );
}

export default App;
