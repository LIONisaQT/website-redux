import { useState } from "react";
import ReactModal from "react-modal";
import { getProjectDetail } from "./Data";

function Card({ id, title, role, tidbit, imageUrl }) {
	const [data, setData] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const onClick = () => {
		if (!data) {
			getProjectDetail(id)
				.then(res => {
					setData(res);
					if (res.id >= 300) {
						openUrl(res.url);
					} else {
						openModal(res);
					}
				})
				.catch((err) => console.error(err));
		} else {
			if (data.id >= 300) {
				openUrl(data.url);
			} else {
				openModal(data);
			}
		}
	}

	const openUrl = (url) => {
		window.open(url, '_blank');
	}

	const openModal = (data) => {
		console.log(data);
		setShowModal(true);
	}

	const hideModal = () => {
		setShowModal(false);
	}

	return (
		<div className='Card' onClick={showModal ? () => { } : onClick}>
			<img src={imageUrl} alt={title} />
			<div className='CardText'>
				<h3 className='CardTitle'>{title}</h3>
				<p className='CardRole'>{role}</p>
				<p><i>{tidbit}</i></p>
			</div>
			<ReactModal
				isOpen={showModal}
				appElement={document.getElementById('root') || undefined}
				onRequestClose={hideModal}
				className='Modal'
				overlayClassName='Overlay'>
				<button className='ModalClose' onClick={hideModal}>&times;</button>
				<section>
					{title}
					{role}
					{data ? data.tech : ''}
				</section>
				<section>
					{tidbit}
				</section>
				<section>
					{data ? data.about : ''}
				</section>
				<section>
					{data ? data.repo[1] : ''}
					{data ? data.url[1] : ''}
				</section>
			</ReactModal>
		</div>
	)
}

export default Card;
