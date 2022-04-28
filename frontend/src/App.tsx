import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/Header/SideBar';
import PageRender from './PageRender';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/index.css';
import Alert from './components/alert/Alert';
function App() {
	return (
		<div className="App">
			<Alert />

			<Header />
			<div className="container">
				<SideBar />
				<div className="main">
					<Router>
						<Routes>
							<Route path="/" element={<PageRender />} />
							<Route path="/:page" element={<PageRender />} />
							<Route path="/:page/:slug" element={<PageRender />} />
						</Routes>
					</Router>
				</div>
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
