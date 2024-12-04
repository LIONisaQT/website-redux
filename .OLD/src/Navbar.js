function Navbar() {
	return (
		<header className='Navbar'>
			<div className='NavbarContent'>
				<div>
					<h1 className='Logo'>
						RYAN<span className='GrayText'>Z</span><span className='HighlightText'>SHEE</span>
					</h1>
				</div>
				<div className='Navigation'>
					<a href='#games'>Games</a>
					<a href='#projects'>Projects</a>
					<a href='#resumes'>Resumes</a>
					<a href='#about'>About</a>
				</div>
			</div>
		</header>
	)
}

export default Navbar;
