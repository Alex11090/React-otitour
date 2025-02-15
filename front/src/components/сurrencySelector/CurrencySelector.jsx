import React from "react";

function CurrencySelector({ onSelectCurrency }) {
  return (
    <div>
      <button onClick={() => onSelectCurrency("EUR")}>€ Euro</button>
      <button onClick={() => onSelectCurrency("USD")}>$ USD</button>
      <button onClick={() => onSelectCurrency("UAH")}>₴ UAH</button>
    </div>
  );
}

export default CurrencySelector;
