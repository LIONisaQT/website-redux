function ImageGallery({ images }) {
	return (
		<div>
			<h1 className='PrimaryText GalleryTitle'>Screenshots</h1>
			<div className='Gallery'>
				{
					images.map(image => <img className='ModalImage' src={image} alt={image}></img>)
				}
			</div>
		</div>
	)
}

export default ImageGallery;
