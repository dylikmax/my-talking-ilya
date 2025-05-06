import React, { useState, useEffect } from "react";
import "./Happiness.css";
import Button from "../../components/button/Button";

const Happiness = () => {
  const [fallingItems, setFallingItems] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(200);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setFallingItems((prev) => [
          ...prev,
          { id: Date.now(), x: Math.random() * 400, y: 0 },
        ]);
      }
    }, 2000);
    if (gameOver) {
      setFallingItems([]);
      let newHappiness = +localStorage.getItem("happiness") + score;
      if (newHappiness > 100) {
        newHappiness = 100;
      }

      localStorage.setItem("happiness", newHappiness);
    }

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const timer = setTimeout(() => setGameOver(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleFall = () => {
      setFallingItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 5 }))
          .filter((item) => item.y < 600)
      );

      setFallingItems((prev) => {
        return prev
          .map((item) => {
            if (item.y > 470 && Math.abs(item.x - playerPosition) < 100) {
              setScore(score + 1);
              return null; // Удаляем пойманный объект
            }
            return item;
          })
          .filter(Boolean);
      });
    };

    const interval = setInterval(handleFall, 100);
    return () => clearInterval(interval);
  }, [fallingItems, playerPosition, score]);

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) {
      const newPosition = touch.clientX - 25;
      if (Math.abs(newPosition - playerPosition) > 5) {
        // Ограничение по перемещению
        setPlayerPosition(newPosition);
      }
    }
  };

  return (
    <div className="happiness-wrapper">
      <div className="game-container" onTouchMove={handleTouchMove}>
        <h2>Счастье: {score}</h2>
        <div className="player" style={{ left: playerPosition }}>
          <img src="png/gornak_game.png" className="ilya-game"/>
        </div>
        {fallingItems.map((item) => (
          <div
            key={item.id}
            className="falling-item"
            style={{ left: item.x, top: item.y }}
          />
        ))}
        <div className={`game-over ${gameOver ? "abled" : "disabled"}`}>
          <span className="game-info">Игра окончена! Заработанное счастье: {score}</span>
          <Button text="В камору" path="/game"/>
        </div>
      </div>
    </div>
  );
};

export default Happiness;
