import { useEffect, useState } from "react";
import "./App.scss";
import FancyButton from "./assets/components/FancyButton/FancyButton";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const originalTitle = "HEY, I'M RYAN.";
const subtitle = "I like making stuff.";
const ignoredChars = [" ", ",", "'", "."];

type buttonData = {
  text: string;
  link: string;
  isNewTab: boolean;
};

const buttons: buttonData[] = [
  {
    text: "Resume",
    link: "https://ryanshee.s3.us-west-1.amazonaws.com/resumes/shee-ryan_resume.pdf",
    isNewTab: true,
  },
  {
    text: "GitHub",
    link: "https://github.com/LIONisaQT",
    isNewTab: true,
  },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/ryanzshee/",
    isNewTab: true,
  },
];

function App() {
  const [title, setTitle] = useState(originalTitle);

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
            return originalTitle[index];
          }

          return alphabet[Math.floor(Math.random() * 26)];
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
            <h2 className="typewriter">{subtitle}</h2>
          </div>
        </section>
        <section className="buttons">
          {buttons.map((button) => (
            <FancyButton
              key={button.text}
              text={button.text}
              link={button.link}
              isNewTab={button.isNewTab}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
