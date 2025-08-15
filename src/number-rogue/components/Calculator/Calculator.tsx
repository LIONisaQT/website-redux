import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import CalculatorButton from "./CalculatorButton";
import "./Calculator.scss";
import { getUpdatedUses, swapDigits } from "../../util/util-methods";
import { type CalcButton, calcOrder } from "./calculator-config";
import { BossType } from "../boss/modifiers";

export type CalculatorHandle = {
	restart: () => void;
};

interface CalculatorProps {
	initialNum: string;
	defaults: Record<string, CalcButton>;
	setDefaults: React.Dispatch<React.SetStateAction<Record<string, CalcButton>>>;
	extras: Record<string, CalcButton>;
	setExtras: React.Dispatch<React.SetStateAction<Record<string, CalcButton>>>;
	onEval: (result: number) => void;
	refreshKey: React.SetStateAction<number>;
	getRng: (max: number) => number;
	enableButtons: boolean;
	modifyTarget: (type: string) => void;
	money: number;
	setMoney: React.Dispatch<React.SetStateAction<number>>;
	isBossLevel: boolean;
	bossModifier?: BossType;
	bannedNum?: number;
}

const Calculator = forwardRef<CalculatorHandle, CalculatorProps>(
	(
		{
			initialNum,
			defaults,
			setDefaults,
			extras,
			setExtras,
			onEval,
			refreshKey,
			getRng,
			enableButtons,
			modifyTarget,
			money,
			setMoney,
			isBossLevel,
			bossModifier,
			bannedNum,
		},
		ref
	) => {
		// Required to prevent useEffect for prevOp from complaining.
		const defaultsRef = useRef(defaults);
		const extrasRef = useRef(extras);

		const [num1, setNum1] = useState(0);
		const [num2, setNum2] = useState("");
		const [display, setDisplay] = useState("");
		const [currentOp, setCurrentOp] = useState("");
		const [previousOp, setPreviousOp] = useState("");
		const [opOnly, setOpOnly] = useState(true);
		const [prevKey, setPrevKey] = useState("hi");

		const [justIncreased, setJustIncreased] = useState("");

		const restart = useCallback(() => {
			setNum1(Number(initialNum));
			setNum2("");
			setDisplay(initialNum);
			setCurrentOp("");
			setOpOnly(true);
			setPrevKey("hi");
			setJustIncreased("");
		}, [initialNum]);

		useEffect(() => {
			restart();
		}, [initialNum, refreshKey, restart]);

		useImperativeHandle(ref, () => ({
			restart,
		}));

		useEffect(() => {
			defaultsRef.current = defaults;
			extrasRef.current = extras;
		}, [defaults, extras]);

		const onClick = (value: string) => {
			if (value in defaults) {
				defaults = getUpdatedUses(value, defaults, -1);
				setDefaults((prev) => getUpdatedUses(value, prev, -1));
			} else if (value in extras) {
				setExtras(getUpdatedUses(value, extras, -1));
			} else {
				console.error(`Invalid key pressed: ${value}`);
				return;
			}

			if (value !== "battery") {
				setPrevKey(value);
			}

			if (isBossLevel) {
				switch (bossModifier) {
					case BossType.PayPerUse:
						setMoney((money) => money - 1); // TODO: Magic number
						break;
					default:
						break;
				}
			}

			if (isNaN(Number(value))) {
				operationClicked(value);
			} else {
				if (num2 === "0" && Number(value) === 0) return;
				setDisplay((d) => d + value);
				setNum2(num2 + value);
			}
		};

		const operationClicked = (value: string) => {
			switch (value) {
				case "equals":
					if (num2 === "") return;
					evaluate();
					break;
				case "battery": {
					const combined = { ...defaults, ...extras };

					const eligibleKeys = Object.keys(combined).filter((key) => {
						const isExcluded = key === "battery" || key === "equals";
						const hasInfiniteUses = combined[key].uses === Infinity;
						return !isExcluded && !hasInfiniteUses;
					});

					if (eligibleKeys.length === 0) {
						break;
					}

					const randomIndex = Math.floor(getRng(eligibleKeys.length));
					const randomKey = eligibleKeys[randomIndex];

					if (randomKey in defaults) {
						setDefaults((prev) => getUpdatedUses(randomKey, prev, 1));
					} else if (randomKey in extras) {
						setExtras(getUpdatedUses(randomKey, extras, 1));
					}

					setJustIncreased(randomKey);

					break;
				}
				case "swapTarget":
				case "randomTarget":
					modifyTarget(value);
					onEval(num1);
					break;
				case "swapCurrent": {
					const newNum = swapDigits(Number(display));
					setDisplay(newNum.toString());
					setNum1(newNum);
					onEval(newNum);
					break;
				}
				case "randomCurrent": {
					const newNum = getRng(100);
					setDisplay(newNum.toString());
					setNum1(newNum);
					onEval(newNum);
					break;
				}
				case "increment":
					setDisplay((Number(display) + 1).toString());
					setNum1(Number(display) + 1);
					onEval(Number(display) + 1);
					break;
				case "decrement":
					setDisplay((Number(display) - 1).toString());
					setNum1(Number(display) - 1);
					onEval(Number(display) - 1);
					break;
				case "plusMoney":
					setDisplay((Number(display) + money).toString());
					setNum1(Number(display) + money);
					onEval(Number(display) + money);
					break;
				default:
					if (value.startsWith("prepend")) {
						const digit = value.slice("prepend".length);
						if (/^[1-9]$/.test(digit)) {
							setDisplay(digit + display);
							setNum1(Number(digit + display));
							onEval(Number(digit + display));
							break;
						}
					}

					setDisplay(num1 + value);
					setPreviousOp(currentOp);
					setCurrentOp(value);
					setOpOnly(false);
					break;
			}
		};

		useEffect(() => {
			if (previousOp !== "") {
				if (previousOp in defaultsRef.current) {
					setDefaults((prev) => getUpdatedUses(previousOp, prev, 1));
				} else if (previousOp in extrasRef.current) {
					setExtras((prev) => getUpdatedUses(previousOp, prev, 1));
				}
			}
		}, [previousOp, setDefaults, setExtras]);

		const evaluate = () => {
			let result: number;
			const n2 = Number(num2);
			switch (currentOp) {
				case "+":
					result = num1 + n2;
					break;
				case "-":
					result = num1 - n2;
					break;
				case "*":
					result = num1 * n2;
					break;
				case "/":
					if (num2 === "0") {
						alert("Can't divide by 0.");
						return;
					}
					result = Math.floor(num1 / n2);
					break;
				case "%":
					result = num1 % n2;
					break;
				case "power":
					result = Math.pow(num1, n2);
					break;
				case "prepend":
					result = Number(n2.toString() + num1.toString());
					break;
				case "append":
					result = Number(num1.toString() + n2.toString());
					break;
				default:
					alert(`This operation (${currentOp}) hasn't been implemented yet.`);
					result = 0;
					break;
			}

			setNum1(result);
			setNum2("");
			setDisplay(result.toString());
			setPreviousOp("");
			setCurrentOp("");
			setOpOnly(true);
			onEval(result);
		};

		const getIsDisabled = (key: string) => {
			if (enableButtons) return true;
			if (bannedNum?.toString() === key) return true;

			// If last key was a number, disable operators
			if (
				!isNaN(Number(prevKey)) &&
				isNaN(Number(key)) &&
				key !== "equals" &&
				key !== "battery"
			) {
				return true;
			}

			// Enable equals sign if an operator and second number available
			if (key === "equals") {
				return currentOp === "" || num2 === "";
			}

			// Enable only operators
			return !isNaN(Number(key)) && opOnly;
		};

		return (
			<div className="calculator">
				<div className="display">{display}</div>
				<div className="buttons">
					<div className="base-buttons">
						{calcOrder.map((key) => (
							<CalculatorButton
								key={key}
								button={key}
								details={defaults[key].details}
								uses={defaults[key].uses}
								disabled={getIsDisabled(key)}
								onClick={onClick}
								justIncreased={justIncreased === key}
							/>
						))}
					</div>
					{Object.keys(extras).length > 0 && (
						<div className="extra-buttons">
							{Object.entries(extras).length > 0 &&
								Object.entries(extras).map(([key, value]) => (
									<CalculatorButton
										key={key}
										button={key}
										details={extras[key].details}
										uses={value.uses}
										disabled={getIsDisabled(key)}
										onClick={onClick}
										justIncreased={justIncreased === key}
									/>
								))}
						</div>
					)}
				</div>
			</div>
		);
	}
);

export default Calculator;
