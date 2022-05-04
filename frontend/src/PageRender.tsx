import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import { IParams } from './utils/TypeScript';
const generatePage = (name: string) => {
	const component = () => require(`./pages/${name}`).default;
	console.log(component);
	try {
		return React.createElement(component());
	} catch (err) {
		return <NotFound />;
	}
};
const PageRender = () => {
	let { page, slug } = useParams();
	if (!page) {
		page = 'index';
	}
	let name: string = '';

	if (page) {
		name = slug ? `${page}/[slug]` : `${page}`;
	}
	return generatePage(name);
};

export default PageRender;
