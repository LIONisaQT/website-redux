export const SceneType = {
	Home: "Home",
	LevelSelect: "LevelSelect",
	Game: "Game",
};

export type SceneType = (typeof SceneType)[keyof typeof SceneType];
