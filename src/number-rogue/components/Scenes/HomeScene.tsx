import React from "react";
import { SceneType } from "../../util/scene-management";
import "./HomeScene.scss";

interface HomeSceneProps {
	setScene: React.Dispatch<React.SetStateAction<SceneType>>;
}

function HomeScene({ setScene }: HomeSceneProps) {
	return (
		<div className="home">
			<h1 className="title">Calculate It</h1>
			<button className="start-button" onClick={() => setScene(SceneType.Game)}>
				Nerd out
			</button>
		</div>
	);
}

export default React.memo(HomeScene);
