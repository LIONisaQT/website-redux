import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.scss";
import GameScene from "./components/Scenes/GameScene";
import { SceneType } from "./util/scene-management";
import HomeScene from "./components/Scenes/HomeScene";
import useSound from "use-sound";
import deepWithin from "./assets/music/deep-within.mp3";
import overtrip from "./assets/music/overtrip-r1.mp3";
import About from "./components/About/About";

function App() {
	const [currentScene, setScene] = useState<SceneType>(SceneType.Home);
	const [isFabOpen, setFabOpen] = useState(false);
	const [canCheat, setCheats] = useState(false);
	const [isAboutOpen, setAboutOpen] = useState(false);

	const [isPlaying, setIsPlaying] = useState(false);
	const [track, setTrack] = useState(deepWithin);

	const [playBgm, { stop, pause }] = useSound(track, {
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

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				pause();
			} else {
				playBgm();
			}
		};

		const handlePauseAudio = () => {
			pause();
		};

		const handleResumeAudio = () => {
			playBgm();
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("blur", handlePauseAudio);
		window.addEventListener("focus", handleResumeAudio);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("blur", handlePauseAudio);
			window.removeEventListener("focus", handleResumeAudio);
		};
	}, [pause, playBgm]);

	const changeTrack = useCallback((isBoss: boolean) => {
		// sound.fade(0, 0.5, 1000);
		setTrack(isBoss ? overtrip : deepWithin);
	}, []);

	const scene = useMemo(() => {
		switch (currentScene) {
			case SceneType.Game:
				return (
					<GameScene
						setTrack={changeTrack}
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
	}, [currentScene, changeTrack, canCheat]);

	return (
		<div className="container">
			<>{scene}</>
			<div className="fab">
				<button className="fab-main" onClick={() => setFabOpen(!isFabOpen)}>{`${
					isFabOpen ? "🔽" : "🔼"
				}`}</button>
				{isFabOpen && (
					<>
						<button
							onClick={() => {
								setFabOpen(false);
								setScene(SceneType.Home);
							}}
						>
							Back
						</button>
						<button
							onClick={() => {
								setFabOpen(false);
								setAboutOpen(!isAboutOpen);
							}}
						>
							About
						</button>
						<button
							onClick={() => {
								if (isPlaying) {
									pause();
									setIsPlaying(false);
								} else {
									playBgm();
									setIsPlaying(true);
								}
								setFabOpen(false);
							}}
						>
							{`Music: ${isPlaying ? "⏸️" : "▶️"}`}
						</button>
						<button
							onClick={() => {
								setFabOpen(false);
								setCheats(!canCheat);
							}}
						>{`Cheats: ${canCheat ? "ON" : "OFF"}`}</button>
					</>
				)}
			</div>
			<About isOpen={isAboutOpen} closeModal={() => setAboutOpen(false)} />
		</div>
	);
}

export default App;
