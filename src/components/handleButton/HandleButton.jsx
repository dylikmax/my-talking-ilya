import { NavLink } from "react-router-dom";
import "./HandleButton.css"

export default function HandleButton({ text, handle }) {
  return (
          <button onClick={handle} className="handle-button">
              {text}
          </button>
  );
}