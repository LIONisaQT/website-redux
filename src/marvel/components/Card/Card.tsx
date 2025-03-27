import "./Card.scss";
import { Hero } from "../../hero-data";
import { useState } from "react";

function Card(props: { hero: Hero }) {
  const [isHover, setHover] = useState(false);

  return (
    <div className="card-main">
      {/* <h2>{props.hero.name}</h2> */}
      <div
        className="portrait"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          className={isHover ? "prestige" : "default"}
          src={
            new URL(
              isHover
                ? props.hero.portraits.prestige
                : props.hero.portraits.default,
              import.meta.url
            ).href
          }
        ></img>
      </div>
    </div>
  );
}

export default Card;
