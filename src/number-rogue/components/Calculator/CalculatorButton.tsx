import { useEffect, useState } from "react";
import type { CalcButtonDetails } from "./calculator-config";
import "./CalculatorButton.scss";

interface ButtonProps {
	button: string;
	details: CalcButtonDetails;
	uses?: number;
	disabled?: boolean;
	onClick: (value: string) => void;
	justIncreased?: boolean;
}

function CalculatorButton({
	button,
	details,
	uses = Infinity,
	disabled,
	onClick,
	justIncreased,
}: ButtonProps) {
	const [animate, setAnimate] = useState(false);

	const buttonClicked = () => {
		if (uses === Infinity) {
			onClick(button);
		} else {
			if (uses <= 0) return;
			onClick(button);
		}
	};

	useEffect(() => {
		if (!justIncreased) return;
		setAnimate(true);
	}, [justIncreased]);

	return (
		<div className="button-container">
			<button
				className={`calculator-button ${
					!isNaN(Number(button))
						? "number"
						: details.affectsTarget
						? "target-operator"
						: "operator"
				}`}
				disabled={disabled || uses <= 0}
				onClick={buttonClicked}
			>
				{details.label ?? details.name}
			</button>
			{uses !== Infinity && (
				<p
					onAnimationEnd={() => setAnimate(false)}
					className={`uses ${animate ? "just-increased" : ""}`}
				>
					{uses}
				</p>
			)}
		</div>
	);
}

export default CalculatorButton;
