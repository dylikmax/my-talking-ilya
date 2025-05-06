import Button from "../../components/button/Button";
import "./Root.css";

export default function Root() {
  return (
    <div className="root-container">
      <div className="wrapper">
        <img src="./svg/logo.svg" className="logo" />
        <Button text="Играть" path="/game" />
      </div>
    </div>
  );
}
