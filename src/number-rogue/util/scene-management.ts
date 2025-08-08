export const SceneType = {
	Home: "Home",
	LevelSelect: "LevelSelect",
	DifficultySelect: "DifficultySelect",
	Game: "Game",
};

export type SceneType = (typeof SceneType)[keyof typeof SceneType];
