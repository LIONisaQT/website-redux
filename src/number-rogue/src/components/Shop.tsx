import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import "./Shop.scss";
import {
	buttonList,
	shopList,
	type CalcButton,
	type CalcButtonDetails,
} from "../calculator";
import CalculatorButton from "./CalculatorButton";
import { getUpdatedUses } from "../util/button-utils";

export type ShopHandle = {
	generateShop: () => void;
};

interface ShopProps {
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

const Shop = forwardRef<ShopHandle, ShopProps>(
	(
		{
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
		const [shopItems, setShopItems] = useState<CalcButtonDetails[]>([]);

		const generateShop = useCallback(() => {
			const shopItems = [];
			for (let i = 0; i < shopSize; i++) {
				const keys = Object.keys(shopList);
				const randomKey = keys[getRng(keys.length)];
				const newItem = buttonList[randomKey];
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

		const purchaseButton = (button: string) => {
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

			const index = shopItems.findIndex((item) =>
				item.label ? item.label === button : item.name === button
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
				<section className="shop-items">
					{shopItems.map((item, index) => {
						const price = getRng(4) + 4; // TODO: Magic number
						return (
							<div
								key={`${index}:${item.name}`}
								className="shop-item"
								onClick={() => purchaseButton(item.label ?? item.name)}
							>
								<CalculatorButton
									button={item}
									disabled={money < price}
									onClick={() => {}}
								/>
								<div className={`price-tag ${money < price ? "disabled" : ""}`}>
									<p>${price}</p>
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
