import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import GameScene from "./components/Scenes/GameScene";
import { SceneType } from "./util/scene-management";
import HomeScene from "./components/Scenes/HomeScene";
import useSound from "use-sound";
import deepWithin from "./assets/music/deep-within.mp3";
import About from "./components/About/About";

function App() {
	const [currentScene, setScene] = useState<SceneType>(SceneType.Home);
	const [isFabOpen, setFabOpen] = useState(false);
	const [canCheat, setCheats] = useState(false);
	const [isAboutOpen, setAboutOpen] = useState(false);

	const [isPlaying, setIsPlaying] = useState(false);
	const [playBgm, { stop }] = useSound(deepWithin, {
		loop: true,
		onplay: () => setIsPlaying(true),
		onpause: () => setIsPlaying(false),
		onend: () => setIsPlaying(false),
		onstop: () => setIsPlaying(false),
		volume: 0.5,
	});

	useEffect(() => {
		playBgm();

		return () => {
			stop();
			setIsPlaying(false);
		};
	}, [playBgm, stop]);

	const scene = useMemo(() => {
		switch (currentScene) {
			case SceneType.Game:
				return (
					<GameScene
						canCheat={canCheat}
						setScene={setScene}
						rngMax={100}
						startMoney={0}
						winMoney={10}
					/>
				);
			case SceneType.Home:
			default:
				return <HomeScene setScene={setScene} />;
		}
	}, [currentScene, canCheat]);

	return (
		<div className="container">
			<>{scene}</>
			<div className="fab">
				<button onClick={() => setFabOpen(!isFabOpen)}>{`${
					isFabOpen ? "🔽" : "🔼"
				}`}</button>
				{isFabOpen && (
					<>
						<button
							onClick={() => {
								setFabOpen(false);
								setCheats(!canCheat);
							}}
						>{`${canCheat ? "😈" : "😇"}`}</button>
						<button
							onClick={() => {
								setFabOpen(false);
								setScene(SceneType.Home);
							}}
						>
							🏠
						</button>
						<button
							onClick={() => {
								if (isPlaying) {
									stop();
									setIsPlaying(false);
								} else {
									playBgm();
									setIsPlaying(true);
								}
							}}
						>
							{isPlaying ? "⏹️" : "▶️"}
						</button>
						<button
							onClick={() => {
								setFabOpen(false);
								setAboutOpen(!isAboutOpen);
							}}
						>
							?
						</button>
					</>
				)}
			</div>
			<About isOpen={isAboutOpen} closeModal={() => setAboutOpen(false)} />
		</div>
	);
}

export default App;
