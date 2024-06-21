import React, { useState, useEffect } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import ConfettiExplosion from "react-confetti-explosion";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  let [ms, setMs] = useState(0.0); //intially memory store is 0
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRadians, setIsRadians] = useState(true);
  const [theme, setTheme] = useState("light-mode");

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
    sinh: "Math.sinh",
    tanh: "Math.tanh",
    cosh: "Math.cosh",
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light-mode" ? "dark-mode" : "light-mode");
  };

  function calcResult() {
    if (expression.length !== 0) {
      try {
        if (expression.match(/5/) && expression.match(/6/)) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
        }

        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  }

  function handleButton(value) {
    if (value === "c") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + sciFunc[value]);
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "x^2") {
      setDisplayEXP(displayEXP + "**2");
      setExpression(expression + "**2");
    } else if (value === "EE") {
      setDisplayEXP((prev) => prev + "E");
      setExpression(expression+ "*10" + "**");
    } else if (value === "x^3") {
      setDisplayEXP(displayEXP + "**3");
      setExpression(expression + "**3");
    } else if (value === "x^y") {
      setDisplayEXP(displayEXP + "**");
      setExpression(expression + "**");
    } else if (value === "e^x") {
      setDisplayEXP(displayEXP + "e" + "^");
      setExpression(expression + Math.E + "**");
    } else if (value === "1/x") {
      setDisplayEXP(displayEXP + "1" + "/");
      setExpression(expression + "1" + "/");
    } else if (value === "2√x") {
      setDisplayEXP(displayEXP + "2√");
      setExpression(expression + "**1/2");
    } else if (value === "3√x") {
      setDisplayEXP(displayEXP + "3√");
      setExpression(expression + "**1/3");
    }else if (value === "y√x") {
      setDisplayEXP(displayEXP + "√");
      setExpression(expression + "**1/"); 
     } else if (value === "Rand") {
      const num = Math.random();
      setDisplayEXP(displayEXP + num);
      setExpression(expression + num);
    } 
    else if (value === "mr") {
      setDisplayEXP("" + ms);
      setExpression("" + ms);
    } else if (value === "mc") {
      setMs(0);
    } else if (value === "m+") {
      const intermediate_val = ms + eval(expression);
      setMs(intermediate_val);
    } else if (value === "m-") {
      const intermediate_val = ms - eval(expression);
      setMs(intermediate_val);
    }
     else if (value === "Rad") {
      setIsRadians(!isRadians);
    } else if (value === "+/-") {
        //for change in expression
        let first_occ = -1;
        for (let i = expression.length; i >= 0; i--) {
          if (expression[i] - "0" >= 0 && expression[i] - "0" <= 9) {
            first_occ = i;
            break;
          }
        }
        let j = first_occ;
        if (first_occ !== -1) {
          while (j >= 0) {
            if (expression[j] - "0" >= 0 && expression[j] - "0" <= 9) {
              j--;
            } else {
              break;
            }
          }
          let str = "";
          for (let k = 0; k <= j; k++) {
            str += expression[k];
          }
          str += "-";
          for (let k = j + 1; k < expression.length; k++) {
            str += expression[k];
          }
          setExpression(str);
        }
  
        //for chnage in display expression
        first_occ = -1;
        for (let i = displayEXP.length; i >= 0; i--) {
          if (displayEXP[i] - "0" >= 0 && displayEXP[i] - "0" <= 9) {
            first_occ = i;
            break;
          }
        }
        if (first_occ !== -1) {
          j = first_occ;
          while (j >= 0) {
            if (displayEXP[j] - "0" >= 0 && displayEXP[j] - "0" <= 9) {
              j--;
            } else {
              break;
            }
          }
          let str1 = "";
          for (let k = 0; k <= j; k++) {
            str1 += displayEXP[k];
          }
          str1 += "-";
          for (let k = j + 1; k < displayEXP.length; k++) {
            str1 += displayEXP[k];
          }
          setDisplayEXP(str1);
        }
      
    } else if (value === "=") calcResult();
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="calculator">
      <button onClick={toggleTheme}>
        Toggle to {theme === "light-mode" ? "Dark" : "Light"} Mode
      </button>
      {showConfetti && <ConfettiExplosion />}
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;
