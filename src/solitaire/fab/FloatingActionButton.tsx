import type React from "react";
import "./FloatingActionButton.css";
import { useState } from "react";
import generic from "../assets/sounds/generic1.ogg";
import useSound from "use-sound";

interface FabProps {
	onClickCallback: () => void;
	fullScreenClicked: () => void;
	restartClicked: () => void;
	winClicked: () => void;
	isDevMode: boolean;
}

const FloatingActionButton: React.FC<FabProps> = ({
	onClickCallback,
	fullScreenClicked,
	restartClicked,
	winClicked,
	isDevMode,
}) => {
	const [isOpen, setOpen] = useState(false);
	const [playGeneric] = useSound(generic);

	return (
		<div className="fab">
			<button
				className="fab-button"
				onClick={() => {
					setOpen(!isOpen);
					playGeneric();
					onClickCallback();
				}}
			>
				{isOpen ? "❌" : "➕"}
			</button>
			<ul className={`fab-menu-items ${isOpen ? "visible" : "invisible"}`}>
				<li className="menu-item">
					<button
						className="menu-item-button"
						onClick={() => {
							setOpen(false);
							fullScreenClicked();
							playGeneric();
						}}
					>
						<span>⛶</span>
					</button>
				</li>
				<li className="menu-item">
					<button
						className="menu-item-button"
						onClick={() => {
							setOpen(false);
							restartClicked();
							playGeneric();
						}}
					>
						<span>↻</span>
					</button>
				</li>
				{isDevMode && (
					<li className="menu-item">
						<button
							className="menu-item-button"
							onClick={() => {
								setOpen(false);
								winClicked();
							}}
						>
							<span>💻</span>
						</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default FloatingActionButton;
