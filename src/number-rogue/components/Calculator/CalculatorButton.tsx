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
	const isTouchInput = useRef(false); // Tracks if the current interaction is touch

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

	const handleTouchStart = () => {
		isTouchInput.current = true;
		holdTimer.current = window.setTimeout(() => {
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

	const handleMouseEnter = () => {
		if (isTouchInput.current) return; // Ignore if last interaction was touch
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
