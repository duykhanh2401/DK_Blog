import React, { useState } from 'react';
import Search from './Search';

const Header = () => {
	// header-toggle
	const setOpenSideBarMobile = () => {
		const sideBar = document.querySelector('.sidebar');
		sideBar?.classList.toggle('mobile-open');
		document.querySelector('#header-toggle')?.classList.toggle('bx-x');
	};
	const storeTheme = localStorage.getItem('theme') || 'dark';
	const [theme, setTheme] = useState(storeTheme);

	if (theme === 'dark') {
		document.body.className = 'dark';
		localStorage.setItem('theme', 'dark');
	} else {
		document.body.className = '';
		localStorage.setItem('theme', 'light');
	}
	const setOpenSideBar = () => {
		const sideBar = document.querySelector('.sidebar');
		console.log(sideBar);
		sideBar?.classList.toggle('close');
	};
	return (
		<div className="header">
			<div className="header__container">
				<div className="header-right">
					<div className="toggle-nav" onClick={() => setOpenSideBar()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							className="bi bi-justify-left"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</div>
					<div
						className="toggle-nav-mobile"
						onClick={() => setOpenSideBarMobile()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							className="bi bi-justify-left"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</div>
					<a href="/" className="header__logo">
						Lucifer Blog
					</a>
				</div>
				<div className="header__search">
					<Search />
				</div>

				<div className="header__darkMode">
					<span className="darkMode-text">Dark mode</span>

					<div
						className="toggle-switch"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						<span className="switch"></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
