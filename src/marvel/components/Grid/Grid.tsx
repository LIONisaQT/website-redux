import { heroes } from "../../hero-data";
import Card from "../Card/Card";

function Grid() {
  return (
    <div id="grid-main">
      {heroes.map((hero) => (
        <Card key={hero.name} hero={hero} />
      ))}
    </div>
  );
}

export default Grid;
