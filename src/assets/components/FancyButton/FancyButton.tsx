import "./FancyButton.scss";

// TODO: Append new tab icon after button text.
function FancyButton(props: { text: string; link: string; isNewTab: boolean }) {
  return (
    <>
      <a className="button" href={props.link} rel="noreferrer" target="_blank">
        <p className="button-text">
          {props.text}
          {props.isNewTab && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          )}
        </p>
      </a>
    </>
  );
}

export default FancyButton;
