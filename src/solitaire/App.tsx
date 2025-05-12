import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./logic/card";
import TableauPile from "./tableau/TableauPile";
import Stock from "./stock/Stock";
import { Solitaire } from "./logic/solitaire";
import Foundations from "./foundations/Foundations";

function App() {
  const [game, setGame] = useState<Solitaire>();
  const [, setTableau] = useState<Card[][]>([]);
  const [, setStock] = useState<Card[]>([]);
  const [, setWaste] = useState<Card[]>([]);
  const [, setFoundations] = useState<Card[][]>([]);

  useEffect(() => {
    setGame(new Solitaire());
  }, []);

  const cardClicked = (card: Card, origin: Card[]) => {
    if (!game) return;

    switch (game.cardClicked(card, origin)) {
      case "tableau":
      case "flip":
        setTableau([...game.tableau]);
        break;
      case "foundation":
        setFoundations([...game.foundations]);
        break;
      default:
        break;
    }
  };

  const stockClicked = () => {
    if (!game) return;

    game.stockClicked();
    setStock([...game.stock]);
  };

  const wasteClicked = (card: Card, origin: Card[]) => {
    if (!game) return;

    game.cardClicked(card, origin);
    setWaste([...game.waste]);
  };

  return (
    <div className="play-area">
      <div className="top-area">
        <div className="foundations">
          <Foundations
            foundations={game?.foundations}
            foundationCardClicked={cardClicked}
          />
        </div>
        <div className="stock">
          <Stock
            game={game}
            stockClicked={stockClicked}
            wasteClicked={wasteClicked}
          />
        </div>
      </div>
      <div className="tableau">
        {game?.tableau.map((pile, index) => (
          <TableauPile
            key={`tableau-${index}`}
            cards={pile}
            onClick={cardClicked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
