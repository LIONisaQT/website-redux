import { SceneType } from "../../util/scene-management";

interface LevelSceneProps {
	setScene: React.Dispatch<React.SetStateAction<SceneType>>;
}

function LevelSelect({ setScene }: LevelSceneProps) {
	return (
		<div className="level-select">
			<h1>Level Select</h1>
			<button onClick={() => setScene(SceneType.Game)}>Let's go</button>
		</div>
	);
}

export default LevelSelect;
