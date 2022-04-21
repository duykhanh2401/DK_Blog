import React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const AddBlog = () => {
	const [value, setValue] = React.useState('');
	const mdParser = new MarkdownIt(/* Markdown-it options */);
	mdParser.use(require('markdown-it-ins'));
	const handleEditorChange = (data: { text: string; html: string }) => {
		setValue(data.text);
	};
	const handleClick = () => {
		alert(value);
	};
	return (
		<>
			<button onClick={handleClick}>Get value</button>
			<MdEditor
				style={{ height: '500px' }}
				renderHTML={(text) => mdParser.render(text)}
				onChange={handleEditorChange}
				value={value}
			/>
		</>
	);
};

export default AddBlog;
