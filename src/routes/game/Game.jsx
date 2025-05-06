import { useState } from "react";
import "./Game.css";
import ResourceBar from "../../components/resource-bar/ResourceBar";
import Button from "../../components/button/Button";
import Ilya from "../../components/ilya/Ilya";
import HandleButton from "../../components/handleButton/HandleButton";
import { useNavigate } from "react-router-dom";

const timeToHappiness = 60000;
const timeToLab = 360000;
const labs = 10;

export default function Game() {
  const [happiness, setHappiness] = useState(
    +localStorage.getItem("happiness")
  );
  const allLabs = localStorage.getItem("allLabs");
  const [madeLabs, setMadeLabs] = useState(localStorage.getItem("madeLabs"));
  const changeTime = +localStorage.getItem("changeTime");
  const [labTime, setLabTime] = useState(localStorage.getItem("labTime"));
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    if (Date.now() - +labTime > timeToLab) {
      setIsActive(true);
      return;
    } else {
      navigate("/happiness")
    }
  }

  const handleShowWarn = () => {
    setIsActive(false)
  }

  if (
    happiness === null ||
    allLabs === null ||
    madeLabs === null ||
    labTime === null
  ) {
    setMadeLabs(0);
    setHappiness(50);
    setLabTime(Date.now());
    localStorage.setItem("happiness", 50);
    localStorage.setItem("madeLabs", 0);
    localStorage.setItem("allLabs", labs);
    localStorage.setItem("changeTime", Date.now());
    localStorage.setItem("labTime", Date.now());
  }

  if (Date.now() - changeTime > timeToHappiness) {
    const happinessDifference = Math.floor(
      (Date.now() - changeTime) / timeToHappiness
    );
    let currentHappiness = happiness - happinessDifference;
    if (currentHappiness < 0) {
      currentHappiness = 0;
    }
    setHappiness(currentHappiness);
    localStorage.setItem("happiness", currentHappiness);
    localStorage.setItem("changeTime", Date.now());
  }

  return (
    <div className="game-container1">
      <div className="game-wrapper">
        <div className="resources">
          <ResourceBar
            value={happiness}
            resourceName="Счастье"
            min={0}
            max={100}
            color={"#6b4526"}
          />
          <ResourceBar
            value={madeLabs}
            resourceName="Сданные лабы"
            min={0}
            max={labs}
            color={"#48c4df"}
          />
        </div>
        <div className="buttons">
          <Button text="Сдать лабы" path="/labs" />
          <HandleButton text="Осчастливить Илью" handle={handleClick}/>
        </div>
      </div>
      <Ilya happiness={happiness}/>
      <div className={`sad-warning ${isActive ? 'abled' : 'disabled'}`}>
        <span className="warn">Вы давно не сдавали лабы, пока что играть нельзя.</span>
        <HandleButton text="Понятно" handle={handleShowWarn}/>
      </div>
    </div>
  );
}
