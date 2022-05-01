import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import { RootStore } from './utils/TypeScript';
const generatePage = (name: string) => {
	const component = () => require(`./pages/admin/${name}`).default;
	try {
		return React.createElement(component());
	} catch (err) {
		return <NotFound />;
	}
};
const PageRender = () => {
	const { page, slug } = useParams();
	const { auth } = useSelector((state: RootStore) => state);
	if (!auth.user) {
		return <NotFound />;
	}
	let name: string = '';

	if (page) {
		name = slug ? `${page}/[slug]` : `${page}`;
	}
	return generatePage(name);
};

export default PageRender;
