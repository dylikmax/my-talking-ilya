import { useEffect, useRef, useState } from "react";
import Lab from "../../components/lab/Lab";
import "./Labs.css";
import HandleButton from "../../components/handleButton/HandleButton";
import Button from "../../components/button/Button";

export default function Labs() {
  const allLabs = localStorage.getItem("allLabs");
  const [madeLabs, setMadeLabs] = useState(+localStorage.getItem("madeLabs"));
  const [isActive, setIsActive] = useState(false);
  const [activeLab, setActiveLab] = useState(0);
  const [isVideo, setIsVideo] = useState(false);

  const videoRef = useRef(null);

  const handleActiveLab = (number) => () => {
    if (number === activeLab || activeLab === 0) {
      setIsActive(!isActive);
    }
    setActiveLab(number);
  };

  const handleDoneLab = () => {
    if (activeLab !== madeLabs + 1) {
      return;
    }

    setMadeLabs(madeLabs + 1);
    localStorage.setItem("madeLabs", madeLabs + 1);
    localStorage.setItem("labTime", Date.now());
    let happiness = +localStorage.getItem("happiness") + 10;
    if (happiness > 100) {
      happiness = 100;
    }
    localStorage.setItem("happiness", happiness);
    setIsVideo(true);
  };

  const array = Array.from({ length: allLabs }, (_, i) => i + 1);

  return (
    <div className="labs-container">
      <div className="labs-wrapper">
        <h1>Ваши лабы</h1>
        <div className="labs">
          {array.map((number) => (
            <Lab
              number={number}
              isDone={number <= madeLabs}
              handle={handleActiveLab(number)}
            />
          ))}
        </div>
      </div>
      <div className={`dialog ${isActive ? "active" : "non-active"}`}>
        <span className="lab-info">Лаба {activeLab}</span>
        <HandleButton text="Сделать лабу" handle={handleDoneLab} />
      </div>
      <Button text="В камору" path="/game" />
      <div className="video-container">
        {isVideo && (
          <video
            ref={videoRef}
            width="300"
            height="600"
            autoPlay
            onEnded={() => setIsVideo(false)} // Скрываем видео по окончании
          >
            <source
              src={`video/${Math.floor(Math.random() * 3) + 1}.mp4`}
              type="video/mp4"
            />
            Ваш браузер не поддерживает видео.
          </video>
        )}
      </div>
    </div>
  );
}
