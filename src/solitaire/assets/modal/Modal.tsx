import type React from "react";
import "./Modal.css";

interface ModalProps {
	titleText: string;
	bodyText: string;
	onPrimaryClick: () => void;
	primaryButtonText: string;
	onSecondaryClick?: () => void;
	secondaryButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
	titleText,
	bodyText,
	onPrimaryClick,
	primaryButtonText,
	onSecondaryClick,
	secondaryButtonText,
}) => {
	return (
		<div className="modal-container">
			<div className="modal">
				<div className="modal-text">
					<p className="modal-title">{titleText}</p>
					<p className="modal-body">{bodyText}</p>
				</div>
				<div className="modal-buttons">
					<button className="primary-button" onClick={onPrimaryClick}>
						<p className="primary-button-text">{primaryButtonText}</p>
					</button>
					<button className="secondary-button" onClick={onSecondaryClick}>
						<p className="secondary-button-text">{secondaryButtonText}</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
