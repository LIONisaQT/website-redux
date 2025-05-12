import {
	Card,
	convertSuitToIndex,
	Deck,
	isSameCard,
	isSequentialRank,
	isSimilarSuit,
} from "./card";

export class Solitaire {
	public deck: Deck;
	public tableau: Card[][] = [];
	readonly NUM_PILES = 7;

	public stock: Card[] = [];
	public waste: Card[] = [];

	// Spades, Hearts, Diamonds, Clubs
	public foundations: Card[][] = [[], [], [], []];

	constructor() {
		this.deck = new Deck();
		this.initializeGame();
	}

	private initializeGame() {
		this.deck.shuffle();

		this.tableau = [];
		this.stock = [];
		this.waste = [];
		this.foundations = [[], [], [], []];

		this.initializeTableau();
		this.initializeStock();
	}

	public restartGame() {
		this.deck.restartDeck();
		this.initializeGame();
	}

	private initializeTableau() {
		for (let i = 1; i < this.NUM_PILES + 1; i++) {
			const pile: Card[] = [];
			for (let j = 0; j < i; j++) {
				const card = this.deck.drawCard();
				if (card) {
					card.isFaceDown = j < i - 1; // Only the last card is face up
					pile.push(card);
				} else console.error(`No more cards in deck!`);
			}
			this.tableau.push(pile);
		}
	}

	private initializeStock() {
		this.stock = this.deck.getCards();
	}

	public cardClicked(card: Card, origin: Card[]): string {
		if (card.isFaceDown && isSameCard(card, origin[origin.length - 1])) {
			this.flipTableauCard(card);
			return "flip";
		}

		if (this.doBestFoundationMove(card, origin)) {
			return "foundation";
		}

		if (this.doBestTableauMove(card, origin)) {
			return "tableau";
		}

		console.error(`No valid move for ${card.rank} of ${card.suit}`);
		return "nomove";
	}

	/*
    Have to do this because game tracks tableaus, not individial cards.
    That means only a tableau change will trigger a re-render.
  */
	private flipTableauCard(card: Card) {
		const tableauIndex = this.tableau.findIndex((pile) =>
			pile.some((c) => isSameCard(c, card))
		);
		const tableau = this.tableau[tableauIndex];
		tableau.pop();
		const newCard: Card = { ...card, isFaceDown: false };
		tableau.push(newCard);
	}

	private doBestFoundationMove(card: Card, origin: Card[]): boolean {
		const foundationIndex = convertSuitToIndex(card);
		const foundation = this.foundations[foundationIndex];
		const topFoundationCard = foundation[foundation.length - 1];

		if (!topFoundationCard) {
			if (card.rank === "Ace") {
				foundation.push(origin.pop()!);
				return true;
			}
		} else {
			if (isSequentialRank(card, topFoundationCard)) {
				foundation.push(origin.pop()!);
				return true;
			}
		}

		return false;
	}

	private doBestTableauMove(card: Card, origin: Card[]): boolean {
		let bestTableauIndex = -1;

		switch (card.rank) {
			case "King":
				bestTableauIndex = this.getBestEmptyTableau();
				break;
			default:
				bestTableauIndex = this.getBestTableauWithCards(card);
				break;
		}

		if (bestTableauIndex !== -1) {
			const cardIndex = origin.findIndex((c) => isSameCard(c, card));
			this.tableau[bestTableauIndex] = this.tableau[bestTableauIndex].concat(
				origin.splice(cardIndex)
			);
			return true;
		}

		return false;
	}

	private getBestTableauWithCards(card: Card): number {
		let bestTableauIndex = -1;

		this.tableau.forEach((pile, index) => {
			const topCard = pile[pile.length - 1];
			if (
				topCard &&
				!isSimilarSuit(card, topCard) &&
				isSequentialRank(topCard, card)
			) {
				bestTableauIndex = index;
			}
		});

		return bestTableauIndex;
	}

	private getBestEmptyTableau(): number {
		return this.tableau.findIndex((pile) => pile.length === 0);
	}

	public stockClicked() {
		if (this.stock.length === 0 && this.waste.length === 0) {
			console.error(`No more cards in stock or waste!`);
			return;
		}

		if (this.stock.length === 0 && this.waste.length > 0) {
			this.stock = this.waste.reverse();
			this.waste = [];
			return;
		}

		const drawnCard = this.stock.pop();
		drawnCard!.isFaceDown = false;
		this.waste.push(drawnCard!);
	}
}
