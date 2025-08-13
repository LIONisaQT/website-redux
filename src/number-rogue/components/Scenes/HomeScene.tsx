import React from "react";
import { SceneType } from "../../util/scene-management";
import "./HomeScene.scss";
import HackedTitle from "../HackedTitle";

interface HomeSceneProps {
	setScene: React.Dispatch<React.SetStateAction<SceneType>>;
}

function HomeScene({ setScene }: HomeSceneProps) {
	return (
		<div onClick={() => setScene(SceneType.Game)} className="home">
			<section className="main">
				<HackedTitle title="NUMB3R R0GU3" />
				<h2 className="subtitle">A Calculate It clone</h2>
			</section>
			<p className="tap">Tap anywhere to start</p>
		</div>
	);
}

export default React.memo(HomeScene);
