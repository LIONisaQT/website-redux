import "./App.css";
import FancyButton from "./assets/components/FancyButton/FancyButton";

// TODO: Fill in links.
function App() {
  return (
    <>
      <div id="main">
        <section className="header">
          <h1 className="title">Hi, I'm Ryan.</h1>
          <h2 className="subtitle">I like making stuff.</h2>
        </section>
        <section className="buttons">
          <FancyButton text="Resume" link="/" isNewTab={true} />
          <FancyButton text="GitHub" link="/" isNewTab={true} />
          <FancyButton text="LinkedIn" link="/" isNewTab={true} />
        </section>
      </div>
    </>
  );
}

export default App;
