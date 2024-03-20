import { useEffect, useState } from "react";
import "./Machine.css";
import React from "react";

function Machine() {
  const buttons = [
    { key: "q", sound: "Heater 1" },
    { key: "w", sound: "Heater 2" },
    { key: "e", sound: "Heater 3" },
    { key: "a", sound: "Heater 4" },
    { key: "s", sound: "Clap" },
    { key: "d", sound: "Open-HH" },
    { key: "z", sound: "Kick-n'-Hat" },
    { key: "x", sound: "Kick" },
    { key: "c", sound: "Closed-HH" },
  ];
  const [audios, setAudios] = useState({});
  const [sound, setSound] = useState("");

  useEffect(() => {
    for (const button of buttons) {
      setAudios((prev) => ({
        ...prev,
        [button.key]: new Audio(`../public/${button.key}-sound.mp3`),
      }));
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyPressed = event.key.toLowerCase();
      const button = buttons.find((button) => button.key === keyPressed);
      if (button !== undefined && audios[keyPressed]) {
        playAudio(button);
      }
    };
    console.log("subscribed to keydown event");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [audios]);

  const playAudio = (button) => {
    audios[button.key].play();
    setSound(button.key);
  };

  return (
    <div id="drum-machine">
      {buttons.map((button, index) => {
        return (
          <button key={`button_${index}`} onClick={() => playAudio(button)}>
            {button.key}
          </button>
        );
      })}
      <div id="display">{sound}</div>
    </div>
  );
}

export default Machine;
