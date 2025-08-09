import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import "./Shop.scss";
import {
	buttonList,
	getKeyByName,
	shopList,
	type CalcButton,
	type CalcButtonDetails,
} from "./Calculator/calculator-config";
import CalculatorButton from "./Calculator/CalculatorButton";
import { getUpdatedUses } from "../util/util-methods";

export type ShopHandle = {
	generateShop: () => void;
};

interface ShopProps {
	canCheat: boolean;
	getRng: (max: number) => number;
	shopSize: number;
	defaults: Record<string, CalcButton>;
	setDefaults: React.Dispatch<React.SetStateAction<Record<string, CalcButton>>>;
	extras: Record<string, CalcButton>;
	setExtras: React.Dispatch<React.SetStateAction<Record<string, CalcButton>>>;
	money: number;
	setMoney: React.Dispatch<React.SetStateAction<number>>;
	onNextRoundClicked: () => void;
}

interface ShopItem extends CalcButtonDetails {
	price: number;
}

const Shop = forwardRef<ShopHandle, ShopProps>(
	(
		{
			canCheat,
			getRng,
			shopSize,
			defaults,
			setDefaults,
			extras,
			setExtras,
			money,
			setMoney,
			onNextRoundClicked,
		},
		ref
	) => {
		const [shopItems, setShopItems] = useState<ShopItem[]>([]);

		const generateShop = useCallback(() => {
			const shopItems = [];
			for (let i = 0; i < shopSize; i++) {
				const keys = Object.keys(shopList);
				const randomKey = keys[getRng(keys.length)];
				const newItem = buttonList[randomKey] as ShopItem;
				newItem.price = getRng(4) + 4;
				shopItems.push(newItem);
			}
			setShopItems(shopItems);
		}, [getRng, shopSize]);

		/**
		 * Used to send generateShop() back to parent so it can call this method
		 * when it needs to generate a new shop.
		 */
		useImperativeHandle(ref, () => ({
			generateShop,
		}));

		const purchaseButton = (button: string, price: number) => {
			if (money < price) return;

			setMoney((money) => money - price);

			if (button in defaults) {
				setDefaults(getUpdatedUses(button, defaults, 2));
			} else if (button in extras) {
				setExtras(getUpdatedUses(button, extras, 2));
			} else {
				const newButton: CalcButton = {
					uses: 2,
					details: buttonList[button],
				};
				const newExtras = { ...extras };
				newExtras[button] = newButton;
				setExtras(newExtras);
			}

			const index = shopItems.findIndex(
				(item) => getKeyByName(item.name) === button
			);
			if (index >= 0) {
				shopItems.splice(index, 1);
				setShopItems(shopItems);
			}
		};

		return (
			<div className="shop-container">
				<h2>Shop</h2>
				<section className="shop-description">
					<p>
						When you purchase an item, you get +2 uses of it.
						<br />
						You can only buy one of each item.
					</p>
				</section>
				{canCheat && (
					<section className="cheats">
						<h2>Cheats</h2>
						<button onClick={() => setMoney((money) => money + 5)}>
							Add $
						</button>
					</section>
				)}
				<section className="shop-items">
					{shopItems.map((details, index) => {
						const listName = getKeyByName(details.name);
						return (
							<div key={`${index}:${listName}`} className="shop-item">
								<CalculatorButton
									button={listName!}
									details={details}
									disabled={money < details.price}
									onClick={() => purchaseButton(listName!, details.price)}
								/>
								<div
									className={`price-tag ${
										money < details.price ? "disabled" : ""
									}`}
								>
									<p>${details.price}</p>
								</div>
							</div>
						);
					})}
				</section>
				<section className="buttons">
					<button
						disabled={money <= 5} // TODO: Magic number
						onClick={() => {
							generateShop();
							setMoney((money) => money - 5); // TODO: Magic number
						}}
					>
						Reroll ($5)
					</button>
					<button onClick={onNextRoundClicked}>Next Round</button>
				</section>
			</div>
		);
	}
);

export default Shop;
