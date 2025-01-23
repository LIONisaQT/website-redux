import { Hero } from "../../hero-data";

function Card(props: { hero: Hero }) {
  return (
    <div id="card-main">
      <h2>{props.hero.name}</h2>
      <img
        src={new URL(props.hero.portraits.default, import.meta.url).href}
      ></img>
    </div>
  );
}

export default Card;
