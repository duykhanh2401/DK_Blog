import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
} from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/Header/SideBar';
import PageRender from './PageRender';
import PageRenderAdmin from './PageRenderAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { refreshToken } from './redux/actions/authAction';

import './styles/index.css';
import Alert from './components/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './redux/actions/categoryAction';
import { RootStore } from './utils/TypeScript';
function App() {
	const dispatch = useDispatch();
	const { auth } = useSelector((state: RootStore) => state);
	useEffect(() => {
		dispatch(refreshToken());
		dispatch(getCategories(auth.accessToken));
	}, [auth.accessToken, dispatch]);

	return (
		<div className="App">
			<Alert />

			<div className="container">
				<Router>
					<Header />
					<SideBar />
					<div className="main">
						<Routes>
							<Route path="/" element={<PageRender />} />
							<Route path="/admin/:page" element={<PageRenderAdmin />} />
							<Route path="/admin/:page/:slug" element={<PageRenderAdmin />} />
							<Route path="/:page" element={<PageRender />} />
							<Route path="/:page/:slug" element={<PageRender />} />
							<Route path="/:admin/:page/:slug" element={<PageRender />} />
						</Routes>
					</div>
				</Router>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default App;
