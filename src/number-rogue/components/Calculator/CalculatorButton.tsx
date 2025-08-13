import { useEffect, useState, useRef } from "react";
import type { CalcButtonDetails } from "./calculator-config";
import "./CalculatorButton.scss";
import useSound from "use-sound";
import clickSound from "../../assets/sounds/generic1.ogg";

const HOLD_DURATION = 300;
const HOVER_DURATION = 500;

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

	const [click] = useSound(clickSound);

	const buttonClicked = (e: React.MouseEvent | React.TouchEvent) => {
		// Prevent click if it was a long press
		if (wasHold.current && isTouchInput.current) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (uses === Infinity) {
			click();
			onClick(button);
		} else {
			if (uses <= 0) return;
			click();
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
		}, HOLD_DURATION);
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

		wasHold.current = false;
		holdTimer.current = window.setTimeout(() => {
			wasHold.current = true;
			setShowInfo(true);
		}, HOVER_DURATION);
	};

	const handleMouseLeave = () => {
		if (isTouchInput.current) return;

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
