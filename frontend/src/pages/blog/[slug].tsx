import React from 'react';
import MarkdownIt from 'markdown-it';
import { RootStore } from '../../utils/TypeScript';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(require('markdown-it-ins'));
mdParser.use(require('markdown-it-highlightjs'), { hljs });

const BlogPage = () => {
	const { slug } = useParams();
	const { blog } = useSelector((state: RootStore) => state);
	const blogCurrent = blog.find((el) => el.slug === slug);
	if (!blogCurrent) return <NotFound />;
	console.log(blogCurrent);
	return (
		<main>
			<div className="main-bar">
				<div className="post-content shadow">
					<div className="post-headline custom-html-style">
						<h1 className="post-title">{blogCurrent.title}</h1>
						<div className="img-container">
							{typeof blogCurrent.thumbnail === 'string' && (
								// <NavLink to={`/blog/${blog._id}`}>
								<img src={blogCurrent.thumbnail} alt="" />
							)}
						</div>
						<div
							className="post-body"
							dangerouslySetInnerHTML={{
								__html: mdParser.render(blogCurrent.content),
							}}
						></div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default BlogPage;
