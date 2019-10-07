import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

const NotFoundPage = () => (
	<Layout className="404" title="404">
		<h2>NOT FOUND</h2>
		<p>Well, nothing here</p>
		<Link to="/">Back</Link>
	</Layout>
);

export default NotFoundPage;
