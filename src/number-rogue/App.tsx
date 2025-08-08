import { useState } from "react";
import "./App.scss";
import GameScene from "./components/Scenes/GameScene";
import { SceneType } from "./util/scene-management";
import HomeScene from "./components/Scenes/HomeScene";

function App() {
	const [canCheat, setCheats] = useState(false);
	const [currentScene, setScene] = useState<SceneType>(SceneType.Home);

	const getScene = () => {
		switch (currentScene) {
			case SceneType.Game:
				return <GameScene canCheat={canCheat} />;
			case SceneType.Home:
			default:
				return <HomeScene setScene={setScene} />;
		}
	};

	return (
		<div className="container">
			<>{getScene()}</>
			<div className="fab">
				<button onClick={() => setCheats(!canCheat)}>{`${
					canCheat ? "✅" : "❌"
				}`}</button>
			</div>
		</div>
	);
}

export default App;
