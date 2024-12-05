import { useEffect, useState } from "react";
import "./App.scss";
import FancyButton from "./assets/components/FancyButton/FancyButton";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const originalTitle = "HEY, I'M RYAN.";

// TODO: Fill in links.
function App() {
  const [title, setTitle] = useState(originalTitle);

  useEffect(() => {
    hackTitle(); // Run once on startup.
  }, []);

  const hackTitle = () => {
    let text = title;
    let iterations = 0;

    const iterationMultipier = 2.5; // Multiplies the number of times a letter will cycle through random letters. Letter position * multiplier == number of cycles.
    const intervalSpeed = 30; // Determines time between intervals. Higher == slower iterations.

    const interval = setInterval(() => {
      text = text
        .split("")
        .map((letter, index) => {
          if (
            letter === " " ||
            letter === "," ||
            letter === "'" ||
            letter === "."
          )
            return letter;

          if (index < iterations) {
            return originalTitle[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= originalTitle.length) clearInterval(interval);

      iterations += 1 / iterationMultipier;
      setTitle(text);
    }, intervalSpeed);
  };

  return (
    <>
      <div id="main">
        <section className="header">
          <h1 onMouseEnter={hackTitle} className="title">
            {title}
          </h1>
          <div className="subtitle">
            <h2 className="typewriter">I like making stuff.</h2>
          </div>
        </section>
        <section className="buttons">
          <FancyButton
            text="Resume"
            link="/public/shee-ryan_resume.pdf"
            isNewTab={true}
          />
          <FancyButton
            text="GitHub"
            link="https://github.com/LIONisaQT"
            isNewTab={true}
          />
          <FancyButton
            text="LinkedIn"
            link="https://www.linkedin.com/in/ryanzshee/"
            isNewTab={true}
          />
        </section>
      </div>
    </>
  );
}

export default App;
