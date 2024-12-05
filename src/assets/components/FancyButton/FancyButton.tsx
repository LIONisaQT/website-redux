import "./FancyButton.scss";

function FancyButton(props: { text: string; link: string }) {
  return (
    <>
      <a className="button" href={props.link}>
        <p className="button-text">{props.text}</p>
      </a>
    </>
  );
}

export default FancyButton;
