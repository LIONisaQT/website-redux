import "./FancyButton.scss";

// TODO: Append new tab icon after button text.
function FancyButton(props: { text: string; link: string; isNewTab: boolean }) {
  return (
    <>
      <a className="button" href={props.link}>
        <p className="button-text">{props.text}</p>
      </a>
    </>
  );
}

export default FancyButton;
