import "./App.scss";
import FancyButton from "./assets/components/FancyButton/FancyButton";
import HackedTitle from "./assets/components/HackedTitle/HackedTitle";

const subtitle = "I like making stuff.";

type buttonData = {
  text: string;
  link: string;
  isNewTab: boolean;
};

const buttons: buttonData[] = [
  {
    text: "Resume",
    link: "/shee-ryan_resume.pdf",
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
  return (
    <>
      <div id="main">
        <section className="header">
          <HackedTitle title="Hey, I'm Ryan." />
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
        <section>
          <a className="blurb" href="/startpage/" target="_">
            Check out my startpage!
          </a>
        </section>
      </div>
    </>
  );
}

export default App;
