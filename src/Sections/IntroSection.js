/* eslint-disable react/jsx-no-comment-textnodes */
function IntroSection() {
	const omenImage = 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4e5af408cc7a87b5/5eb7cdc17bedc8627eff8deb/V_AGENTS_587x900_Omen.png';
	const fuseImage = 'https://i1.wp.com/www.gamosaurus.com/wp-content/uploads/AAA/Respawn/Apex-Legends/tier-list-legendes/apex-legends-tier-list-legendes-fuse.png?resize=675%2C675&ssl=1';
	const kyImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F63%2F26%2F91%2F632691ed5c42349a1405317980fd6b75.png&f=1&nofb=1';

	return (
		<section className='SectionWrapper IntroShadow'>
			<div className='SectionElement'>
				<div className='IntroColumn'>
					<div className='Left'>
						<div className='BackgroundText BackgroundImage Fuse'>
							<img src={fuseImage} alt='fuse'></img>
						</div>
						<div className='BackgroundText BackgroundImage Ky'>
							<img src={kyImage} alt='ky'></img>
						</div>
						<div className='BackgroundText BackgroundImage Omen'>
							<img src={omenImage} alt='omen'></img>
						</div>
					</div>
					<div className='Right'>
						<h1 className='PrimaryText'>SOFTWARE ENGINEER</h1>
						<p>
							My name is <span className='HighlightText'>Ryan</span>.
						</p>
						<p>
							I enjoy bringing ideas to life, using either
							<span className='HighlightText'> Unity</span>,
							<span className='HighlightText'> React</span>, or
							<span className='HighlightText'> Unreal</span>.
							You should definitely check out my projects and resumes.
						</p>
						<p>
							Also please hire me.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default IntroSection;
