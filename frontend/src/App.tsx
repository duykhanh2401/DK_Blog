import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/Header/SideBar';
import PageRender from './PageRender';
import './styles/index.css';
function App() {
	return (
		<div className="App">
			<Header />
			<SideBar />
			<Router>
				<Routes>
					<Route path="/" element={<PageRender />} />
					<Route path="/:page" element={<PageRender />} />
					<Route path="/:page/:slug" element={<PageRender />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
