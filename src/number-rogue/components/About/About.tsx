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
						<section>
							<p>
								Thanks for playing my React remake of Calculate It. It's just
								meant for practice, and not much more than that. If you like the
								game, you can get the real deal over{" "}
								<a
									href="https://store.steampowered.com/app/3043740/Calculate_It/"
									target="_"
								>
									at Steam here
								</a>
								.
							</p>
						</section>
						<section className="game-info">
							<h2>Game Info</h2>
							<p>
								You're given a starting number every round, and must hit the
								target number by whatever means necessary.
							</p>
							<p>
								You can hover (desktop) or long press (mobile) buttons to see
								their description.
							</p>
							<ul>
								<li>🔄: Swap</li>
								<li>🎲: Randomize</li>
								<li>_T (e.g. 🔄 T): Affects the target number</li>
								<li>_C (e.g. 🎲 C): Affects the current number</li>
								<li>n_/_n: Appends or prepends next input</li>
								<li>+$: Adds your current money to the current number</li>
								<li>🔋: +1 use to a random button</li>
							</ul>
						</section>
						<section className="tracks">
							<p>The background tracks used are:</p>
							<ul>
								<li>
									<a
										href="https://www.youtube.com/watch?v=l9lnzNSz94M"
										target="_"
									>
										Deep Within by HOYO-MiX
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/watch?v=X_-2qMyfj5A"
										target="_"
									>
										Overtrip by CAPCOM
									</a>
								</li>
							</ul>
						</section>
						<button onClick={closeModal}>Close</button>
					</div>
				</div>
			)}
		</>
	);
}

export default About;
