import "./About.scss";

interface AboutProps {
	isOpen: boolean;
	closeModal: () => void;
}

function About({ isOpen, closeModal }: AboutProps) {
	return (
		<>
			{isOpen && (
				<div className="about">
					<div onClick={closeModal} className="background"></div>
					<div className="about-body">
						<h1>About</h1>
						<p>
							Thanks for playing my React remake of Calculate It. It's just
							meant for practice, and not much more than that.
						</p>
						<p>
							If you like the game, you can get the real deal over{" "}
							<a
								href="https://store.steampowered.com/app/3043740/Calculate_It/"
								target="_"
							>
								at Steam here
							</a>
							.
						</p>
						<p>
							The background track is{" "}
							<a href="https://www.youtube.com/watch?v=l9lnzNSz94M" target="_">
								Deep Within by HOYO-MiX
							</a>
							.
						</p>
						<button onClick={closeModal}>Close</button>
					</div>
				</div>
			)}
		</>
	);
}

export default About;
