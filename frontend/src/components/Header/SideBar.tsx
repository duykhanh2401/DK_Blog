import React from 'react';
import Search from './Search';

const SideBar = (props: any) => {
	return (
		<div>
			<nav className="sidebar">
				<div className="menu-bar">
					<div className="menu">
						<Search />

						<ul className="menu-links">
							<li className="nav-link">
								<a href="/">
									<i className="bx bx-home-alt icon"></i>
									<span className="text nav-text">Dashboard</span>
								</a>
							</li>

							<li className="nav-link">
								<a href="/">
									<i className="bx bx-bar-chart-alt-2 icon"></i>
									<span className="text nav-text">Revenue</span>
								</a>
							</li>

							<li className="nav-link">
								<a href="/">
									<i className="bx bx-bell icon"></i>
									<span className="text nav-text">Notifications</span>
								</a>
							</li>

							<li className="nav-link">
								<a href="/">
									<i className="bx bx-pie-chart-alt icon"></i>
									<span className="text nav-text">Analytics</span>
								</a>
							</li>

							<li className="nav-link">
								<a href="/">
									<i className="bx bx-heart icon"></i>
									<span className="text nav-text">Likes</span>
								</a>
							</li>

							<li className="nav-link">
								<a href="/">
									<i className="bx bx-wallet icon"></i>
									<span className="text nav-text">Wallets</span>
								</a>
							</li>
						</ul>
					</div>

					<div className="bottom-content">
						<li className="">
							<a href="/">
								<i className="bx bx-log-out icon"></i>
								<span className="text nav-text">Logout</span>
							</a>
						</li>
					</div>
				</div>
			</nav>
			<section className="home">
				{props.children}
				<div className="main">{props.content}</div>
			</section>
		</div>
	);
};

export default SideBar;
