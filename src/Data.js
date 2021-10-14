const shroommatesImage = 'https://raw.githubusercontent.com/LIONisaQT/LIONisaQT.github.io/master/static/img/0_shroommates/sm_banner.png';

const gameProjects = [
	{
		'id': '104',
		'name': 'Magic Movers',
		'role': 'Game Engineer',
		'tidbit': 'Global Game Jam 2019 entry',
		'image': shroommatesImage,
	},
	{
		'id': '103',
		'name': 'Shroommates',
		'role': 'Lead Developer',
		'tidbit': '"Housing ain\'t cheap here, mate."',
		'image': shroommatesImage,
	},
	{
		'id': '102',
		'name': 'Battlegrounds',
		'role': 'Systems Designer',
		'tidbit': '"Where are we dropping, boys?" -procrastinating student at 2AM',
		'image': shroommatesImage,
	},
	{
		'id': '101',
		'name': 'World Power',
		'role': 'System Designer',
		'tidbit': '"Wait, this board game is starting to look a little too realistic."',
		'image': shroommatesImage,
	},
	{
		'id': '100',
		'name': 'Snail Assalt',
		'role': 'Game Engineer',
		'tidbit': '"You misspelled assaul- oh I get it haha."',
		'image': shroommatesImage,
	},
]

const engineeringProjects = [
	{
		'id': '205',
		'name': 'Food Now! Web',
		'role': 'Frontend Engineer',
		'tidbit': '"This should\'ve been a web app ages ago."',
		'image': shroommatesImage,
	},
	{
		'id': '204',
		'name': 'Chill Mood Club',
		'role': 'Frontend Engineer',
		'tidbit': 'Lo-fi & Chill',
		'image': shroommatesImage,
	},
	{
		'id': '203',
		'name': 'Food Now!',
		'role': 'Android Engineer',
		'tidbit': '"Ew no I ate there a couple of days ago, choose another place." -person who no longer has friends',
		'image': shroommatesImage,
	},
	{
		'id': '202',
		'name': 'Pick Up Boo',
		'role': 'Android Engineer',
		'tidbit': '"Why? Because Uber and Lyft cost money of course."',
		'image': shroommatesImage,
	},
	{
		'id': '201',
		'name': 'Gotcho Book',
		'role': 'Android Engineer',
		'tidbit': 'Creative Entrepreneurship category, 2nd place',
		'image': shroommatesImage,
	},
	{
		'id': '200',
		'name': 'Gotcho Back',
		'role': 'Android Engineer',
		'tidbit': 'Tech Cares category, 1st place',
		'image': shroommatesImage,
	},
]

const resumes = [
	{
		'id': '301',
		'name': 'Games',
		'role': 'For game recruiters',
		'tidbit': '"Most games are just colliders colliding with other colliders, right?"',
		'image': shroommatesImage,
	},
	{
		'id': '300',
		'name': 'Engineering',
		'role': 'For engineering recruiters',
		'tidbit': '"LeetCode or have no abode."',
		'image': shroommatesImage,
	}
]

export function getData(section) {
	switch (section) {
		case 'games':
			return new Promise((res) => setTimeout(res, 100, gameProjects));
		case 'engineering':
			return new Promise((res) => setTimeout(res, 100, engineeringProjects));
		case 'resume':
			return new Promise((res) => setTimeout(res, 100, resumes));
		default:
			return new Promise((res => setTimeout(res, 0, [])));
	}
}
