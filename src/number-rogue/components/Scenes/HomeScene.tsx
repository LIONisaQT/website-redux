import { SceneType } from "../../util/scene-management";

interface HomeSceneProps {
	setScene: React.Dispatch<React.SetStateAction<SceneType>>;
}

function HomeScene({ setScene }: HomeSceneProps) {
	return (
		<div className="home">
			<h1>Calculate It</h1>
			<button onClick={() => setScene(SceneType.Game)}>Go</button>
		</div>
	);
}

export default HomeScene;
