import PropTypes from 'prop-types';
import React from 'react';

import styles from './Container.css';

function Container ({ ...props }, { theme }) {
	return (
		<div
			id="lightboxBackdrop"
			className={`react-images react-images__modal ${styles.container}`}
			{...props}
			style={{
				backgroundColor: theme.container.background,
				paddingTop: theme.container.gutter.vertical,
				paddingBottom: theme.container.gutter.vertical,
				paddingLeft: theme.container.gutter.horizontal,
				paddingRight: theme.container.gutter.horizontal,
				zIndex: theme.container.zIndex,
			}}
		/>
	);
}

Container.contextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Container;
