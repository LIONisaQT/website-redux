const shroommatesImage = 'https://raw.githubusercontent.com/LIONisaQT/LIONisaQT.github.io/master/static/img/0_shroommates/sm_banner.png';

const gameProjects = [
	{
		'id': '1',
		'name': 'Project 1',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '2',
		'name': 'Project 2',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '3',
		'name': 'Project 3',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '4',
		'name': 'Project 4',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
]

const engineeringProjects = [
	{
		'id': '5',
		'name': 'Project 5',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '6',
		'name': 'Project 6',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '7',
		'name': 'Project 7',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '8',
		'name': 'Project 8',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '9',
		'name': 'Project 9',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
	{
		'id': '10',
		'name': 'Project 10',
		'role': 'Role',
		'tidbit': 'This is a tidbit.',
		'image': shroommatesImage,
	},
]

export function getData(section) {
	switch (section) {
		case 'games':
			return new Promise(res => {
				setTimeout(res, 100, gameProjects);
			});
		case 'engineering':
			return new Promise(res => {
				setTimeout(res, 100, engineeringProjects);
			});
		default:
			break;
	}
}
