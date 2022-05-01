import React, { ElementRef, MouseEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import { userInfo } from 'os';

const SideBar = (props: any) => {
	const toggleClass = (e: MouseEvent) => {
		const parent = e.currentTarget.parentElement as HTMLElement;
		parent.parentElement?.classList.toggle('showMenu');
	};
	const { auth, category } = useSelector((state: RootStore) => state);

	const dispatch = useDispatch();

	const linkSidebar = [
		{
			label: 'Trang chủ',
			icon: 'bx bx-home-alt',
			path: '/',
			isAdmin: false,
		},
		{
			label: 'Danh mục',
			icon: 'bx bx-collection',
			path: '/category',
			isAdmin: false,
			submenu: [...category],
		},
		{
			label: 'Quản lý danh mục',
			icon: 'bx bx-category-alt',
			path: '/admin/category',
			isAdmin: true,
		},
		{
			label: 'Quản lý bài viết',
			icon: 'bx bx-file',
			path: '/admin/blog',
			isAdmin: true,
		},
	];

	return (
		<nav className="sidebar">
			<div className="menu-bar">
				<div className="menu">
					<Search />
					<ul className="nav-links">
						{linkSidebar.map((el, index) => {
							if (el.isAdmin === false || (el.isAdmin === true && auth.user))
								return (
									<li key={index}>
										<div className="icon-link">
											<NavLink to={`${el.path}`}>
												<i className={el.icon}></i>
												<span className="link_name">{el.label}</span>
											</NavLink>

											{el.submenu && (
												<i
													className="bx bxs-chevron-down arrow"
													onClick={toggleClass}
												></i>
											)}
										</div>
										<ul className={`sub-menu ${el.submenu || 'blank'}`}>
											<li>
												<NavLink className="link_name" to={el.path}>
													{el.label}
												</NavLink>
											</li>
											{el.submenu &&
												el.submenu.map((subEl) => (
													<li>
														<NavLink to={`/category/${subEl.slug}`}>
															{subEl.name}
														</NavLink>
													</li>
												))}
										</ul>
									</li>
								);
						})}
						{auth.user && (
							<li onClick={() => dispatch(logout())}>
								<div className="icon-link">
									<Link to="#">
										<i className="bx bx-log-out"></i>
										<span className="link_name">Đăng xuất</span>
									</Link>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default SideBar;
