import React from "react";

const KeysWindow = ({ handleButton }) => {
  const sciKeys = [
    "(", ")", "mc", "m+", "m-", "mr", "2nd", "x^2", "x^3", "x^y", "e^x", "10^x",
    "1/x", "2√x", "3√x", "y√x", "ln", "log10", "!", "sin", "cos", "tan", "e", "EE", "RAD",
    "sinh", "cosh", "tanh", "π", "Rand"
  ];

  const basicKeys = [
    "c" ,"+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+",
    "0", ".", "DEL","="
  ];

  const isNumber = (item) => item >= "1" && item <= "9";
  const isOperator = (item) => ["+", "-", "*", "/"].includes(item);
  const isEqual = (item) => item === "=" ;
  const isScientific = (item) => sciKeys.includes(item)
  const iszero= (item) => item ==="0";
  const isdot= (item) => item ===".";
  const isdel= (item) => item ==="DEL";

  return (
    <div className="keysWindow">
      <div className="keys_scientific">
        {sciKeys.map((item, index) => (
          <button
            key={index}
            className={`scientific`}
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="line"></div>
      <div className="keys_basic">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            className={`
              ${isNumber(item) ? "number" : ""} 
              ${isOperator(item) ? "operator" : ""} 
              ${isEqual(item) ? "equal" : ""}
              ${iszero(item) ? "zero" : ""}
               ${isdot(item) ? "dot" : ""}
                ${isdel(item) ? "del" : ""}
              ${!isNumber(item) && !isOperator(item) && !isEqual(item) && !iszero(item) && !isdot(item)&&!isdel(item) ? "default" : ""}
            `}
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeysWindow;
