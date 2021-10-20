/* eslint-disable react/jsx-no-comment-textnodes */
function IntroSection() {
	const juicyShmup = 'https://ryanshee.s3.us-west-1.amazonaws.com/misc-images/juicy-shmup.mp4';

	return (
		<section className='SectionWrapper IntroShadow'>
			<div className='SectionElement'>
				<div className='IntroColumn'>
					<div className='Left'>
						<div className='VideoContainer'>
							<video className='Video' autoPlay loop>
								<source src={juicyShmup} type='video/mp4'></source>
							</video>
							<div className='VideoShadow'>
							</div>
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
					</div>
				</div>
			</div>
		</section>
	)
}

export default IntroSection;
