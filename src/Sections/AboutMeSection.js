/* eslint-disable react/jsx-no-comment-textnodes */
function AboutMeSection({ id }) {
	const photo = 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/portrait.JPG';

	return (
		<section id={id} className='SectionWrapper'>
			<div className='SectionElement'>
				<div className='PhotoParent'>
					<img className='AboutPhoto' src={photo} alt='me'></img>
				</div>
				<h1 className='PrimaryText'>HELLO!</h1>
				<p>I am currently a
					<span className='HighlightText'> software engineer </span>
					on
					<span className='HighlightText'> Lumos Labs</span>'
					games team.
				</p>
				<p>
					I enjoy bringing ideas to life, using either
					<span className='HighlightText'> Unity</span>,
					<span className='HighlightText'> React</span>, or
					<span className='HighlightText'> Unreal</span>.
					I also have experience with
					<span className='HighlightText'> Cocos Creator</span>.
					In addition to realizing ideas, I like prototyping things just to see how they are implemented, or challenging myself to use certain technologies/programming paradigms.
					One thing that's always stuck with me is something another engineer told me early in my career:
				</p>
				<section className='Quote'>
					"Instead of just saying 'Wouldn't it be cool if someone made this or that', how about being the person to actually make it?"
				</section>
				<p>
					Other than programming, I also have experience
					<span className='HighlightText'> instructing classes </span>
					on game design and development for high school students with Mission Bit.
					I will destroy almost anyone who challenges me in Smash Bros there.
					I
					<span className='HighlightText'> led my team </span>
					for both Food Now! projects, and was the
					<span className='HighlightText'> lead developer </span>
					on Shroommates—my senior game design studio project—
					so I have plenty of
					<span className='HighlightText'> experience in teams, leadership, and communication</span>.
				</p>
				<p>
					Some
					<span className='HighlightText'> competitive multiplayer games I enjoy playing </span>
					are Valorant, Apex Legends, and Guilty Gear -STRIVE-.
					Since I haven't had much time to sweat it out recently, I've been sitting back and
					<span className='HighlightText'> immersing myself in more story-based games</span>,
					such as The Witcher, Death Stranding, Danganronpa, Yazuka, and Deus Ex.
					That said, I also
					<span className='HighlightText'> enjoy relaxing with various other games</span>,
					such as XCOM, The Legend of Zelda, Metroid, and Animal Crossing.
					Of course, I can also play any
					<span className='HighlightText'> Super Smash Bros </span>
					game competently (1v1 me anytime).
				</p>
				<p>
					Please hire me.
				</p>
				<br />
				<h1 className='PrimaryText'>Contact</h1>
				<p>E-mail: <a className='PrimaryText' href='mailto:ryan@ryanshee.com'>ryan@ryanshee.com</a></p>
				<p>LinkedIn: <a className='PrimaryText' href='https://www.linkedin.com/in/ryanzshee/' target='_blank' rel='noreferrer'>LinkedIn</a></p>
				<p>GitHub: <a className='PrimaryText' href='https://github.com/LIONisaQT' target='_blank' rel='noreferrer'>GitHub</a></p>
			</div>
		</section>
	)
}

export default AboutMeSection;
