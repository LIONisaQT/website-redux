function Card({ title, role, tidbit, imageUrl }) {
	return (
		<div className='Card'>
			<img src={imageUrl} alt={title} />
			<div className='CardText'>
				<p className='CardTitle'>{title}<span className='CardRole'> - {role}</span></p>
				<p><i>{tidbit}</i></p>
			</div>
		</div>
	)
}

export default Card;
