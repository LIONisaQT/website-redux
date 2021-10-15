const magicMoversImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/magic-movers/mm_title.jpg';
const shroommatesImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/shroommates/sm_banner.png';
const foodNow2Image = 'https://ryanshee.s3.us-west-1.amazonaws.com/food-now-web/foodnow2.png';
const chillMoodClubImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/chill-mood-club/cmc.png';
const foodNow1Image = 'https://ryanshee.s3.us-west-1.amazonaws.com/food-now-android/fn_banner.png';

const gameResumeImage = 'https://media.onlinecoursebay.com/2019/03/25011347/635992_a278_2.jpg';
const sweResumeImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/cs.jpg';
const photo = 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/portrait.JPG';

const gameProjects = [
	{
		'id': '101',
		'name': 'Magic Movers',
		'role': 'Game Engineer',
		'tidbit': 'Global Game Jam 2019 entry',
		'image': magicMoversImage,
	},
	{
		'id': '100',
		'name': 'Shroommates',
		'role': 'Lead Developer',
		'tidbit': '"Housing ain\'t cheap here, mate."',
		'image': shroommatesImage,
	},
]

const engineeringProjects = [
	{
		'id': '202',
		'name': 'Food Now! Web',
		'role': 'Frontend Engineer',
		'tidbit': '"This should\'ve been a web app ages ago."',
		'image': foodNow2Image,
	},
	{
		'id': '201',
		'name': 'Chill Mood Club',
		'role': 'Frontend Engineer',
		'tidbit': 'Lo-fi & Chill',
		'image': chillMoodClubImage,
	},
	{
		'id': '200',
		'name': 'Food Now!',
		'role': 'Android Engineer',
		'tidbit': '"Ew no I ate there a couple of days ago, choose another place."',
		'image': foodNow1Image,
	},
]

const resumes = [
	{
		'id': '301',
		'name': 'Games',
		'role': 'For game recruiters',
		'tidbit': '"Most games are just colliders colliding with other colliders, right?"',
		'image': gameResumeImage,
	},
	{
		'id': '300',
		'name': 'Engineering',
		'role': 'For engineering recruiters',
		'tidbit': '"LeetCode or have no abode."',
		'image': sweResumeImage,
	}
]

export function getData(section) {
	switch (section) {
		case 'games':
			return new Promise((res) => setTimeout(res, 100, gameProjects));
		case 'projects':
			return new Promise((res) => setTimeout(res, 100, engineeringProjects));
		case 'resumes':
			return new Promise((res) => setTimeout(res, 100, resumes));
		default:
			return new Promise((res => setTimeout(res, 0, [])));
	}
}
