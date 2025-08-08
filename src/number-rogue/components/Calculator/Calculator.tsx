import { useEffect, useState } from "react";
import CalculatorButton from "./CalculatorButton";
import "./Calculator.scss";
import {
	getRandomButton,
	getUpdatedUses,
	swapDigits,
} from "../../util/util-methods";
import { type CalcButton, calcOrder } from "./calculator-config";

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
}

function Calculator({
	initialNum,
	defaults,
	setDefaults,
	extras,
	setExtras,
	onEval,
	refreshKey,
	getRng,
	enableButtons,
}: CalculatorProps) {
	const [num1, setNum1] = useState(0);
	const [num2, setNum2] = useState("");
	const [display, setDisplay] = useState("");
	const [currentOp, setCurrentOp] = useState("");
	const [opOnly, setOpOnly] = useState(true);

	useEffect(() => {
		setDisplay(initialNum);
		setNum1(Number(initialNum));
	}, [initialNum, refreshKey]);

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
			case "=":
				if (num2 === "") return;
				evaluate();
				break;
			case "🔋": {
				let randomKey = getRandomButton(getRng, { ...defaults, ...extras });

				// Exclude some buttons from getting battery'd.
				while (randomKey === "=" || randomKey === "🔋") {
					randomKey = getRandomButton(getRng, { ...defaults, ...extras });
				}

				if (randomKey in defaults) {
					setDefaults((prev) => getUpdatedUses(randomKey, prev, 1));
				} else if (randomKey in extras) {
					setExtras(getUpdatedUses(randomKey, extras, 1));
				}

				break;
			}
			case "🔄": {
				const newNum = swapDigits(Number(display));
				setDisplay(newNum.toString());
				setNum1(newNum);
				onEval(newNum);
				break;
			}
			default:
				setDisplay(num1 + value);
				setCurrentOp(value);
				setOpOnly(false);
				break;
		}
	};

	const evaluate = () => {
		let result: number;
		switch (currentOp) {
			case "+":
				result = num1 + Number(num2);
				break;
			case "-":
				result = num1 - Number(num2);
				break;
			case "x":
				result = num1 * Number(num2);
				break;
			case "/":
				if (num2 === "0") {
					alert("Can't divide by 0.");
					return;
				}
				result = Math.floor(num1 / Number(num2));
				break;
			default:
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
							button={defaults[key].details}
							uses={defaults[key].uses}
							disabled={(!isNaN(Number(key)) && opOnly) || enableButtons}
							onClick={onClick}
						/>
					))}
				</div>
				{Object.keys(extras).length > 0 && (
					<div className="extra-buttons">
						{Object.entries(extras).length > 0 &&
							Object.entries(extras).map(([key, value]) => (
								<CalculatorButton
									key={key}
									button={extras[key].details}
									uses={value.uses}
									disabled={(!isNaN(Number(key)) && opOnly) || enableButtons}
									onClick={onClick}
								/>
							))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Calculator;
