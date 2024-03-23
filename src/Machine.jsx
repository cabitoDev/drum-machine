import { useEffect, useState } from "react";
import "./Machine.css";
import React from "react";
import assets from "../public";

function Machine() {
  const buttons = [
    { key: "Q", sound: "Heater 1" },
    { key: "W", sound: "Heater 2" },
    { key: "E", sound: "Heater 3" },
    { key: "A", sound: "Heater 4" },
    { key: "S", sound: "Clap" },
    { key: "D", sound: "Open-HH" },
    { key: "Z", sound: "Kick-n'-Hat" },
    { key: "X", sound: "Kick" },
    { key: "C", sound: "Closed-HH" },
  ];

  const [buttonPressed, setButtonPressed] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyPressed = event.key;
      const button = buttons.find(
        (button) => button.key === keyPressed.toUpperCase()
      );
      if (button !== undefined) {
        playAudio(button);
      }
    };
    console.log("subscribed to keydown event");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const playAudio = (button) => {
    setButtonPressed(button);
    document.getElementById(button.key).play();
  };

  return (
    <div id="drum-machine">
      <div className="buttons">
        {buttons.map((button, index) => {
          return (
            <button
              className={
                button.key === buttonPressed.key
                  ? "drum-pad drum-pad-selected"
                  : "drum-pad drum-pad-not-selected"
              }
              id={button.sound}
              key={`button_${index}`}
              onClick={() => playAudio(button)}
            >
              {button.key}
              <audio
                className="clip"
                id={button.key}
                src={assets[`${button.key.toLowerCase()}Src`]}
              ></audio>
            </button>
          );
        })}
      </div>
      <div id="display">{buttonPressed.sound}</div>
    </div>
  );
}

export default Machine;
