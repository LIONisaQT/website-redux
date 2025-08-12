import { useEffect, useState, useRef } from "react";
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
	const [showInfo, setShowInfo] = useState(false);
	const holdTimer = useRef<number | null>(null);

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

	const handlePressStart = () => {
		holdTimer.current = window.setTimeout(() => {
			setShowInfo(true);
		}, 300);
	};

	const handlePressEnd = () => {
		if (holdTimer.current) {
			clearTimeout(holdTimer.current);
			holdTimer.current = null;
		}
		setShowInfo(false);
	};

	return (
		<div className="button-container">
			<div
				className="button-wrapper"
				onTouchStart={handlePressStart}
				onTouchEnd={handlePressEnd}
				onTouchCancel={handlePressEnd}
				onMouseEnter={handlePressStart}
				onMouseOut={handlePressEnd}
			>
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
			</div>
			{uses !== Infinity && (
				<p
					onAnimationEnd={() => setAnimate(false)}
					className={`uses ${animate ? "just-increased" : ""}`}
				>
					{uses}
				</p>
			)}

			{/* Show pop-up only on long press */}
			{showInfo && (
				<div className="button-info">
					<section className="button-name">{details.name}</section>
					<section className="button-description">
						{details.description}
					</section>
				</div>
			)}
		</div>
	);
}

export default CalculatorButton;
