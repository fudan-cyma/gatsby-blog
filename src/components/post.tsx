import React from 'react';
import { Link } from 'gatsby';
import { formatDate, formatDateForPath } from '../utils/date';

interface List {
	list: {
		node: Post.CommonInfo;
	};
	tag?: string;
}

const listItem = (
	list: {
		node: Post.CommonInfo;
	},
	isDetail = false,
	tag = ''
) => {
	const {
		frontmatter: { layout, date, title, description, tags = [] },
		fileAbsolutePath,
		timeToRead,
	} = list.node;

	let Title = (
		<Link
			aria-labelledby="title"
			key="title"
			className="posts-item-title"
			to={`/${layout}/${
				date ? date : formatDateForPath(fileAbsolutePath)
			}/${title}`}>
			<h5>{title}</h5>
		</Link>
	);
	if (isDetail) {
		Title = (
			<h1 aria-labelledby="title" key="title" className="posts-item-title">
				{title}
			</h1>
		);
	}

	return [
		Title,
		<p aria-labelledby="abstract" key="description" className="posts-item-desc">
			{description}
		</p>,
		<div className="posts-item-footer" key="footer">
			<span className="posts-date" aria-labelledby="date">
				{formatDate(date)}
			</span>
			<span aria-hidden="true" className="divider">
				-
			</span>
			<span
				className="posts-read-time"
				aria-labelledby={`${timeToRead} minutes`}>
				{timeToRead} minutes
			</span>
			<span aria-hidden="true" className="divider">
				-
			</span>
			<div aria-labelledby="tags" className="posts-tags">
				{tags.map(t => (
					<Link
						key={t}
						className={t === tag ? 'highlight' : undefined}
						to={`/tags/${t}`}>
						{t.toUpperCase()}
					</Link>
				))}
			</div>
		</div>,
	];
};

const PostLi = ({ list, tag }: List) => {
	const { id } = list.node;
	return (
		<li key={id} className="posts-item">
			{listItem(list, false, tag)}
		</li>
	);
};

export const PostDiv = ({ list }: List) => {
	const { id } = list.node;
	return (
		<div key={id} className="posts-item">
			{listItem(list, true)}
		</div>
	);
};

export default PostLi;
