import type { CalcButtonDetails } from "../calculator";
import "./CalculatorButton.scss";

interface ButtonProps {
	button: CalcButtonDetails;
	uses?: number;
	disabled?: boolean;
	onClick: (value: string) => void;
}

function CalculatorButton({
	button,
	uses = Infinity,
	disabled,
	onClick,
}: ButtonProps) {
	const buttonClicked = () => {
		if (uses === Infinity) {
			onClick(button.label ?? button.name);
		} else {
			if (uses <= 0) return;
			onClick(button.label ?? button.name);
		}
	};

	return (
		<div className="button-container">
			<button
				className={`calculator-button ${
					!isNaN(Number(button.label ?? button.name)) ? "number" : "operator"
				}`}
				disabled={disabled || uses <= 0}
				onClick={buttonClicked}
			>
				{button.label ?? button.name}
			</button>
			{uses !== Infinity && <p className="uses">{uses}</p>}
		</div>
	);
}

export default CalculatorButton;
