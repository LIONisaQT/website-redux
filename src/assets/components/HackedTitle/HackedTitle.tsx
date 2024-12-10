import "./HackedTitle.scss";
import { useState, useEffect } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ignoredChars = [" ", ",", "'", "."];

function HackedTitle(props: { title: string }) {
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    hackTitle(); // Run once on startup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hackTitle = () => {
    let text = title;
    let iterations = 0;

    const iterationMultipier = 2.5; // Multiplies the number of times a letter will cycle through random letters. Letter position * multiplier == number of cycles.
    const intervalSpeed = 30; // Determines time between intervals. Higher == slower iterations.

    const interval = setInterval(() => {
      text = text
        .split("")
        .map((char, index) => {
          if (ignoredChars.includes(char)) return char;

          if (index < iterations) {
            return props.title[index];
          }

          return alphabet[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= props.title.length) clearInterval(interval);

      iterations += 1 / iterationMultipier;
      setTitle(text);
    }, intervalSpeed);
  };

  return (
    <>
      <h1 onMouseEnter={hackTitle} className="title">
        {title}
      </h1>
    </>
  );
}

export default HackedTitle;
