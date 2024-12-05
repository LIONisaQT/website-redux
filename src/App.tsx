import "./App.css";
import FancyButton from "./assets/components/FancyButton/FancyButton";

function App() {
  return (
    <>
      <div id="main">
        <section className="header">
          <h1 className="title">Hi, I'm Ryan.</h1>
          <h2 className="subtitle">I like making stuff.</h2>
        </section>
        <section className="buttons">
          <FancyButton text="Resume" link="/" />
        </section>
      </div>
    </>
  );
}

export default App;
