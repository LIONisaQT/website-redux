import "./App.scss";
import ReactPlayer from "react-player";

function App() {
	return (
		<div className="fire-emblem-container">
			<div className="video-background">
				<ReactPlayer
					src="./assets/fefw-trim-1-compressed.mp4"
					playing
					loop
					controls={false}
					pip={false}
					muted
					width={"100%"}
					height={"100%"}
				/>
			</div>
			<div className="main-body">
				<div className="game-title">
					<h1 className="title">FIRE EMBLEM</h1>
					<h2 className="subtitle">Fortune's Weave</h2>
				</div>
				<div className="release-date">
					<h2 className="date">Expected 2026</h2>
				</div>
				<div className="copyright">
					<p className="copyright-text">© Nintendo / INTELLIGENT SYSTEMS</p>
				</div>
			</div>
		</div>
	);
}

export default App;
