function Card({ title, role, tidbit, imageUrl }) {
	return (
		<div className='Card'>
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
