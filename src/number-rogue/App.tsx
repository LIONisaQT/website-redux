import { useMemo, useState } from "react";
import "./App.scss";
import GameScene from "./components/Scenes/GameScene";
import { SceneType } from "./util/scene-management";
import HomeScene from "./components/Scenes/HomeScene";

function App() {
	const [currentScene, setScene] = useState<SceneType>(SceneType.Home);
	const [isFabOpen, setFabOpen] = useState(false);
	const [canCheat, setCheats] = useState(false);

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
					</>
				)}
			</div>
		</div>
	);
}

export default App;
