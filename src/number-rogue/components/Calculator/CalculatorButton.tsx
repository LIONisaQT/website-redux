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
	const isTouchInput = useRef(false);
	const wasHold = useRef(false);

	const buttonClicked = (e: React.MouseEvent | React.TouchEvent) => {
		// Prevent click if it was a long press
		if (wasHold.current) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

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

	// Touch handlers for mobile long press
	const handleTouchStart = () => {
		isTouchInput.current = true;
		wasHold.current = false;

		holdTimer.current = window.setTimeout(() => {
			wasHold.current = true;
			setShowInfo(true);
		}, 300);
	};

	const handleTouchEnd = () => {
		if (holdTimer.current) {
			clearTimeout(holdTimer.current);
			holdTimer.current = null;
		}
		setShowInfo(false);
	};

	// Hover handlers for desktop
	const handleMouseEnter = () => {
		if (isTouchInput.current) return;
		setShowInfo(true);
	};

	const handleMouseLeave = () => {
		if (isTouchInput.current) return;
		setShowInfo(false);
	};

	return (
		<div className="button-container">
			<div
				className="button-wrapper"
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				onTouchCancel={handleTouchEnd}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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
