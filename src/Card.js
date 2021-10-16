import { useState } from "react";
import { getProjectDetail } from "./Data";

function Card({ id, title, role, tidbit, imageUrl }) {
	const [data, setData] = useState(null);

	const onClick = () => {
		if (!data) {
			getProjectDetail(id)
				.then(res => {
					setData(res);
					if (res.id >= 300) {
						openUrl(res.url);
					}
					console.table(res);
				})
				.catch((err) => console.error(err));
		} else {
			if (data.id >= 300) {
				openUrl(data.url);
			}
		}
	}

	const openUrl = (url) => {
		window.open(url, '_blank');
	}

	return (
		<div className='Card' onClick={onClick}>
			<img src={imageUrl} alt={title} />
			<div className='CardText'>
				<h3 className='CardTitle'>{title}</h3>
				<p className='CardRole'>{role}</p>
				<p><i>{tidbit}</i></p>
			</div>
		</div>
	)
}

export default Card;
