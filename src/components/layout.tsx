import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from './header';
import SEO from './seo';
import '../scss/index.scss';

const Layout = (
	props: Head.Layout & {
		data: {
			dataYaml: {
				name: string;
			};
		};
	}
) => (
	<div className={props.className ? props.className : undefined} id="app">
		<SEO
			title={props.title}
			meta={props.meta}
			description={props.description}
		/>
		<Header />
		<main id="container">{props.children}</main>
		<footer>
			<span className="info">
				© {new Date().getFullYear()} {props.data.dataYaml.name} -{' '}
			</span>
			<Link style={{ float: 'right' }} to="/about" title="About">
				About
			</Link>
		</footer>
	</div>
);

const Container = (props: Head.Layout) => (
	<StaticQuery
		query={graphql`
			query {
				dataYaml {
					name
				}
			}
		`}
		render={data => <Layout data={data} {...props} />}
	/>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
};

export default Container;
