import ReactModal from "react-modal";
import ImageGallery from "./ImageGallery";

function Modal(props) {
	const { title, role, tidbit } = props.simpleData;
	const { tech, about, repo, url, images } = props.projectData;

	return (
		<div onClick={props.handleClick}>
			<ReactModal
				isOpen={props.isOpen}
				appElement={document.getElementById('root') || undefined}
				onRequestClose={props.onHideModal}
				className='Modal'
				overlayClassName='Overlay'>
				<button className='ModalClose' onClick={props.onHideModal}>&times;</button>
				<section className='DetailHeader'>
					<h1 className='DetailTitle PrimaryText'>{title}</h1>
					<span className=''>
						{role} ({tech ?? ''})
					</span>
				</section>
				<section className='DetailTidbit'>
					<p>{tidbit}</p>
				</section>
				<section>
					<p>{about ?? ''}</p>
				</section>
				<section>
					<p>View details on its <a className='PrimaryText Link' href={repo[1]} rel='noreferrer' target='_blank'>{repo[0]}</a> page.</p>
				</section>
				<section>
					<p>Check out the project with <a className='PrimaryText Link' href={url[1]} rel='noreferrer' target='_blank'>{url[0]}</a>.</p>
				</section>
				<section>
					{images.length > 0 ? <ImageGallery images={images}/> : ''}
				</section>
			</ReactModal>
		</div>
	)
}

export default Modal;
