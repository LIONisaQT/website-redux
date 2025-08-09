import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CalculatorButton from "./CalculatorButton";
import "./Calculator.scss";
import { getUpdatedUses, swapDigits } from "../../util/util-methods";
import { type CalcButton, calcOrder } from "./calculator-config";

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
		},
		ref
	) => {
		const [num1, setNum1] = useState(0);
		const [num2, setNum2] = useState("");
		const [display, setDisplay] = useState("");
		const [currentOp, setCurrentOp] = useState("");
		const [opOnly, setOpOnly] = useState(true);

		const [justIncreased, setJustIncreased] = useState("");

		useEffect(() => {
			restart();
		}, [initialNum, refreshKey]);

		const restart = () => {
			setNum1(Number(initialNum));
			setNum2("");
			setDisplay(initialNum);
			setCurrentOp("");
			setOpOnly(true);
			setJustIncreased("");
		};

		useImperativeHandle(ref, () => ({
			restart,
		}));

		const onClick = (value: string) => {
			if (value in defaults) {
				setDefaults((prev) => getUpdatedUses(value, prev, -1));
			} else if (value in extras) {
				setExtras(getUpdatedUses(value, extras, -1));
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
				case "prepend1":
					setDisplay(1 + display);
					setNum1(Number(1 + display));
					onEval(Number(1 + display));
					break;
				default:
					setDisplay(num1 + value);
					setCurrentOp(value);
					setOpOnly(false);
					break;
			}
		};

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
				case "power":
					result = Math.pow(num1, n2);
					break;
				default:
					alert(`This operation (${currentOp}) hasn't been implemented yet.`);
					result = 0;
					break;
			}

			setNum1(result);
			setNum2("");
			setDisplay(result.toString());
			setOpOnly(true);
			onEval(result);
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
								disabled={(!isNaN(Number(key)) && opOnly) || enableButtons}
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
										disabled={(!isNaN(Number(key)) && opOnly) || enableButtons}
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
