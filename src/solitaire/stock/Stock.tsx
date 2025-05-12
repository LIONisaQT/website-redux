import type { Card } from "../logic/card";
import PlayingCard from "../card/PlayingCard";
import type { Solitaire } from "../logic/solitaire";
import "./Stock.css";

interface StockProps {
  game: Solitaire | undefined;
  stockClicked: () => void;
  wasteClicked: (card: Card, origin: Card[]) => void;
}

const Stock: React.FC<StockProps> = ({ game, stockClicked, wasteClicked }) => {
  return (
    <div className="stock-container">
      {game && (
        <div className="stock-pile">
          <PlayingCard
            card={{ rank: "Ace", suit: "Spades", isFaceDown: true }}
            origin={game.stock}
            onClick={stockClicked}
          />
          {game.waste.length > 0 && (
            <PlayingCard
              card={game.waste[game.waste.length - 1]}
              origin={game.waste}
              onClick={wasteClicked}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Stock;
