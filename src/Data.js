const magicMoversImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/magic-movers/mm_title.jpg';
const shroommatesImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/shroommates/sm_banner.png';
const foodNow2Image = 'https://ryanshee.s3.us-west-1.amazonaws.com/food-now-web/foodnow2.png';
const chillMoodClubImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/chill-mood-club/cmc.png';
const foodNow1Image = 'https://ryanshee.s3.us-west-1.amazonaws.com/food-now-android/fn_banner.png';

const gameResumeImage = 'https://media.onlinecoursebay.com/2019/03/25011347/635992_a278_2.jpg';
const sweResumeImage = 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/cs.jpg';

const gameProjects = [
	{
		'id': 101,
		'name': 'Magic Movers',
		'role': 'Game Engineer',
		'tidbit': 'Global Game Jam 2019 entry',
		'image': magicMoversImage,
	},
	{
		'id': 100,
		'name': 'Shroommates',
		'role': 'Lead Developer',
		'tidbit': '"Housing ain\'t cheap here, mate."',
		'image': shroommatesImage,
	},
]

const gameProjectDetails = [
	{
		'id': 101,
		'tech': 'Unity',
		'about': 'Magic Movers is a game where you team up with a friend and play as wizards trying to tidy up and furnish a new apartment. The game runs on AirConsole, so you\'ll need a buddy and a phone for each of you. This game was made during Global Game Jam 2019.',
		'repo': [
			'globalgamejam.org',
			'https://v3.globalgamejam.org/2019/games/magic-movers',
		],
		'url': [
			'AirConsole',
			'https://www.airconsole.com/#https://storage.googleapis.com/com.steve.magicmovers.cdn.airconsole.com/2019-01-27-23-23-06/s'
		],
		'images': [
			'https://ryanshee.s3.us-west-1.amazonaws.com/magic-movers/mm_gameplay1.jpg',
			'https://ryanshee.s3.us-west-1.amazonaws.com/magic-movers/mm_gameplay2.jpg',
			'https://ryanshee.s3.us-west-1.amazonaws.com/magic-movers/mm_rekt.jpg',
		],
	},
	{
		'id': 100,
		'tech': 'Unreal Engine',
		'about': 'Shroommates is a third-person stealth game where users play as a sentient mushroom trying to grow in secret in a UCSC student\'s apartment. The mushroom can grow by consuming food and staying out of direct sunlight. Players must adapt to different sizes, as size dynamically alters speed, hiding ability, and reachable spaces. Complete objectives while trying to keep out of sight of your roommate!',
		'repo': [
			'GitHub',
			'https://github.com/LIONisaQT/Shroommates',
		],
		'url': [
			'itch.io',
			'https://banana-shrooms.itch.io/shroommates'
		],
		'images': [
			'https://ryanshee.s3.us-west-1.amazonaws.com/shroommates/sm_bathroom.png',
			'https://ryanshee.s3.us-west-1.amazonaws.com/shroommates/sm_living_couch-desk.png',
			'https://ryanshee.s3.us-west-1.amazonaws.com/shroommates/sm_living.png',
		],
	}
]

const engineeringProjects = [
	{
		'id': 202,
		'name': 'Food Now! Web',
		'role': 'Frontend Engineer',
		'tidbit': '"This should\'ve been a web app ages ago."',
		'image': foodNow2Image,
	},
	{
		'id': 201,
		'name': 'Chill Mood Club',
		'role': 'Frontend Engineer',
		'tidbit': 'Lo-fi & Chill',
		'image': chillMoodClubImage,
	},
	{
		'id': 200,
		'name': 'Food Now!',
		'role': 'Android Engineer',
		'tidbit': '"Ew no I ate there a couple of days ago, pick another."',
		'image': foodNow1Image,
	},
]

const engineeringProjectDetails = [
	{
		'id': 202,
		'tech': 'React',
		'about': 'I wanted to convert Food Now! to a web app, since most people would rather not have to download another app. Plus, they can use it on desktop as well! Functionality is the same as its Android iteration, but with a fresh, updated design.',
		'repo': [
			'GitHub',
			'https://github.com/LIONisaQT/food-now-2',
		],
		'url': [
			'this link (still under active development)',
			'https://get-food-now.web.app/'
		],
		'images': [],
	},
	{
		'id': 201,
		'tech': 'React',
		'about': 'Chill Mood Club is a music hub that combines music with soothing sounds for work, study, or rest. Choose from our selection of YouTube playlists, or play your own favorite tunes. For a more immersive experience, there are various optional background sounds to play alongside your music.',
		'repo': [
			'GitHub',
			'https://github.com/LIONisaQT/chill-mood-club',
		],
		'url': [
			'this link',
			'https://chill-mood-club.web.app/'
		],
		'images': [],
	},
	{
		'id': 200,
		'tech': 'Android',
		'about': 'Food Now! is an Android app that aims to solve the problem of indecisive friends choosing a place to eat by being the final say in picking restaurants. The app takes everyone\'s food preferences, a distance and price maximum, and then returns a random restaurants that respects the distance and price limits while best fulfilling at least one of your preferences. Created in Android Studio with the Yelp Fusion API.',
		'repo': [
			'GitHub',
			'https://github.com/LIONisaQT/food-now-android',
		],
		'url': [
			'Google Play',
			'https://play.google.com/store/apps/details?id=io.github.lionisaqt.foodnow'
		],
		'images': [],
	}
]

const resumes = [
	{
		'id': 301,
		'name': 'Games',
		'role': 'For game recruiters',
		'tidbit': '"What we\'re really here for."',
		'image': gameResumeImage,
		'url': 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/shee-ryan_resume_g.pdf',
		'repo': [],
		'images': [],
	},
	{
		'id': 300,
		'name': 'Engineering',
		'role': 'For engineering recruiters',
		'tidbit': '"LeetCode or have no abode."',
		'image': sweResumeImage,
		'url': 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/shee-ryan_resume_w.pdf',
		'repo': [],
		'images': [],
	}
]

const allItems = gameProjectDetails.concat(engineeringProjectDetails).concat(resumes);

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

export function getProjectDetail(id) {
	return new Promise((res) => {
		const detail = allItems.find(d => d.id === id);
		return setTimeout(res, 100, detail);
	})
}
