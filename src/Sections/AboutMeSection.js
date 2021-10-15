function AboutMeSection({ id }) {
	return (
		<section id={id} className='SectionWrapper'>
			<div className='SectionElement'>
				<h1 className='PrimaryText'>Hello!</h1>
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
					In addition to realizing ideas, prototyping things just to see how they are implemented or seeing if I could
					learn to use a certain technology/programming paradigm is fun for me.
				</p>
				<p>
					Other than programming, I also have experience
					<span className='HighlightText'> instructing a class </span>
					on game design and development for high school students with Mission Bit.
					I will destroy almost anyone who challenges me in Smash Bros there.
					I
					<span className='HighlightText'> lead my team </span>
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
					Since I haven't had much time to sweat it out recently, I've recently been sitting back and
					<span className='HighlightText'> immersing myself in more story-based games</span>,
					such as The Witcher, Death Stranding, Danganronpa, Yazuka, and Deus Ex.
					That said, I also
					<span className='HighlightText'> enjoy various other games</span>,
					such as XCOM, The Legend of Zelda, Metroid, and League of Legends.
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
