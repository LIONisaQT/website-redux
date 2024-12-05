import "./FancyButton.scss";

function FancyButton(props: { text: string; link: string }) {
  return (
    <>
      <a className="button" href={props.link}>
        {props.text}
      </a>
    </>
  );
}

export default FancyButton;
