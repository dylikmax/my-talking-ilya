import { NavLink } from "react-router-dom";
import "./Button.css"

export default function Button({ text, path }) {
  return (
      <NavLink to={path} className="button">
          <button>
              {text}
          </button>
      </NavLink>
  );
}