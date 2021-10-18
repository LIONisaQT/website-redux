import { useEffect, useState } from "react";
import { getProjectDetail } from "./Data";
import Modal from "./Modal";

function Card({ id, title, role, tidbit, imageUrl }) {
	const [data, setData] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		async function fetchDetails() {
			if (!data) {
				const details = await getProjectDetail(id);
				setData(details);
			}
		}

		fetchDetails();
	}, [id, data])

	const onClick = () => {
		if (data.id >= 300) {
			openUrl(data.url);
		} else {
			openModal(data);
		}
	}

	const openUrl = (url) => {
		window.open(url, '_blank');
	}

	const openModal = (data) => {
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
			{
				data && <Modal isOpen={showModal} simpleData={{ title, role, tidbit }} projectData={data} onHideModal={hideModal} />
			}
		</div>
	)
}

export default Card;
