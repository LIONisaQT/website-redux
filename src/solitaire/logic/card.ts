import SpadeSvg from "../assets/suits/spade.svg";
import HeartSvg from "../assets/suits/heart.svg";
import ClubSvg from "../assets/suits/club.svg";
import DiamondSvg from "../assets/suits/diamond.svg";

export const SuitSVGs = {
	Spade: SpadeSvg,
	Heart: HeartSvg,
	Club: ClubSvg,
	Diamond: DiamondSvg,
};

export class Card {
	public suit: string;
	public rank: string;
	public isFaceDown: boolean | undefined;

	constructor(suit: string, rank: string, startFaceDown: boolean = true) {
		this.suit = suit;
		this.rank = rank;
		this.isFaceDown = startFaceDown;
	}
}

export class Deck {
	private suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
	private ranks = [
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"Jack",
		"Queen",
		"King",
		"Ace",
	];
	private cards: Card[] = [];

	constructor() {
		this.initializeDeck();
	}

	private initializeDeck() {
		for (const suit of this.suits) {
			for (const rank of this.ranks) {
				this.cards.push(new Card(suit, rank, undefined));
			}
		}
	}

	public shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	public drawCard(): Card | undefined {
		return this.cards.pop();
	}

	public getCards(): Card[] {
		return this.cards;
	}

	public restartDeck() {
		this.cards = [];
		this.initializeDeck();
	}
}

export function isSimilarSuit(card1: Card, card2: Card): boolean {
	switch (card1.suit) {
		case "Hearts":
		case "Diamonds":
			return card2.suit === "Hearts" || card2.suit === "Diamonds";
		case "Clubs":
		case "Spades":
			return card2.suit === "Clubs" || card2.suit === "Spades";
		default:
			return false;
	}
}

export function isSequentialRank(baseCard: Card, nextCard: Card): boolean {
	return rankToValue(baseCard.rank) === rankToValue(nextCard.rank) + 1;
}

export function rankToValue(rank: string): number {
	switch (rank) {
		case "Ace":
			return 1;
		case "Jack":
			return 11;
		case "Queen":
			return 12;
		case "King":
			return 13;
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "10":
			return parseInt(rank);
		default:
			throw new Error(`Invalid rank: ${rank}`);
	}
}

export function getRankAsString(rank: string): string {
	switch (rank) {
		case "Ace":
			return "A";
		case "Jack":
			return "J";
		case "Queen":
			return "Q";
		case "King":
			return "K";
		default:
			return rank;
	}
}

export function convertSuitToIndex(card: Card): number {
	switch (card.suit) {
		case "Spades":
			return 0;
		case "Hearts":
			return 1;
		case "Clubs":
			return 2;
		case "Diamonds":
			return 3;
		default:
			throw new Error(`Invalid suit: ${card.suit}`);
	}
}

export function isSameCard(card1: Card, card2: Card): boolean {
	return card1.suit === card2.suit && card1.rank === card2.rank;
}

export function getSuitSvgs(suit: string): string {
	switch (suit) {
		case "Spades":
			return SpadeSvg;
		case "Hearts":
			return HeartSvg;
		case "Clubs":
			return ClubSvg;
		case "Diamonds":
			return DiamondSvg;
		default:
			throw new Error(`Invalid suit: ${suit}`);
	}
}

export function getSuitColor(suit: string): string {
	return suit === "Hearts" || suit === "Diamonds" ? "#F05D5E" : "#272932";
}
