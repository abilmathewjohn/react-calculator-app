import { useReducer } from "react";
import { FiDelete } from "react-icons/fi";
import "./Cal.css";

const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const CLEAR = "CLEAR";
const EQUAL = "=";
const SEVEN = "7";
const EIGHT = "8";
const NINE = "9";
const FOUR = "4";
const FIVE = "5";
const SIX = "6";
const ONE = "1";
const TWO = "2";
const THREE = "3";
const ZERO = "0";
const ZEROZERO = "00";
const DOT = ".";
const PERCENTAGE = "%";
const DELETE = "DEL";

const Calculator = () => {
  let [state, dispatch] = useReducer(reducer, "");

  function getValue(state) {
    const parts = state.split(/([+\-*/%])/);
    const cleanParts = parts.filter((part) => part !== "");

    if (cleanParts.length < 3) return state;

    for (let i = 1; i < cleanParts.length; i += 2) {
      if (["*", "/", "%"].includes(cleanParts[i])) {
        const left = parseFloat(cleanParts[i - 1]);
        const right = parseFloat(cleanParts[i + 1]);
        let result;

        switch (cleanParts[i]) {
          case "*":
            result = left * right;
            break;
          case "/":
            result = left / right;
            break;
          case "%":
            result = left % right;
            break;
          default:
        }

        cleanParts.splice(i - 1, 3, result.toString());
        i -= 2;
      }
    }

    let result = parseFloat(cleanParts[0]);
    for (let i = 1; i < cleanParts.length; i += 2) {
      const number = parseFloat(cleanParts[i + 1]);

      switch (cleanParts[i]) {
        case "+":
          result += number;
          break;
        case "-":
          result -= number;
          break;
        default:
      }
    }

    return result.toString();
  }

  function reducer(state, action) {
    let newState = state;
    const operators = ["+", "-", "*", "/", "%"];

    switch (action.type) {
      case SEVEN:
      case EIGHT:
      case NINE:
      case FOUR:
      case FIVE:
      case SIX:
      case ONE:
      case TWO:
      case THREE:
      case ZERO:
      case ZEROZERO:
        newState = state + action.type;
        break;
      case CLEAR:
        newState = "";
        break;
      case DELETE:
        newState = state.slice(0, -1);
        break;
      case DIVIDE:
        if (!operators.includes(state.slice(-1))) {
          newState = state + "/";
        }
        break;
      case MULTIPLY:
        if (!operators.includes(state.slice(-1))) {
          newState = state + "*";
        }
        break;
      case ADD:
        if (!operators.includes(state.slice(-1))) {
          newState = state + "+".replace(operators);
        }
        break;
      case SUBTRACT:
        if (!operators.includes(state.slice(-1))) {
          newState = state + "-";
        }
        break;
      case PERCENTAGE:
        if (!operators.includes(state.slice(-1))) {
          newState = state + "%";
        }
        break;
      case DOT:
        if (!state.endsWith(".")) {
          newState = state + ".";
        }
        break;
      case EQUAL:
        newState = getValue(state);
        break;
      default:
        newState = state;
        break;
    }

    return newState;
  }

  return (
    <div className="calculator">
      <div className="screen">
        <input
          type="text"
          value={state || "0"}
          className="screen-input"
          readOnly
        />
      </div>
      <div className="buttons">
        <button onClick={() => dispatch({ type: CLEAR })}>C</button>
        <button onClick={() => dispatch({ type: PERCENTAGE })}>%</button>
        <button onClick={() => dispatch({ type: DELETE })}><FiDelete /></button>
        <button onClick={() => dispatch({ type: DIVIDE })}>/</button>

        <button onClick={() => dispatch({ type: SEVEN })}>7</button>
        <button onClick={() => dispatch({ type: EIGHT })}>8</button>
        <button onClick={() => dispatch({ type: NINE })}>9</button>
        <button onClick={() => dispatch({ type: MULTIPLY })}>*</button>

        <button onClick={() => dispatch({ type: FOUR })}>4</button>
        <button onClick={() => dispatch({ type: FIVE })}>5</button>
        <button onClick={() => dispatch({ type: SIX })}>6</button>
        <button onClick={() => dispatch({ type: SUBTRACT })}>-</button>

        <button onClick={() => dispatch({ type: ONE })}>1</button>
        <button onClick={() => dispatch({ type: TWO })}>2</button>
        <button onClick={() => dispatch({ type: THREE })}>3</button>
        <button onClick={() => dispatch({ type: ADD })}>+</button>

        <button onClick={() => dispatch({ type: ZEROZERO })}>00</button>
        <button onClick={() => dispatch({ type: ZERO })}>0</button>
        <button onClick={() => dispatch({ type: DOT })}>.</button>
        <button
          id="equals"
          className="equals"
          onClick={() => dispatch({ type: EQUAL })}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
