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
				return <GameScene canCheat={canCheat} />;
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
						<button onClick={() => setCheats(!canCheat)}>{`${
							canCheat ? "✅" : "❌"
						}`}</button>
						<button onClick={() => setScene(SceneType.Home)}>🏠</button>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
