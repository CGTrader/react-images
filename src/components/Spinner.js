import React from 'react';
import PropTypes from 'prop-types';

import styles from './Spinner.css';

const Spinner = ({}, { theme }) => {
	return (
		<div
			className={styles.spinner}
			style={{
				width: theme.spinner.size,
				height: theme.spinner.size,
			}}
		>
			<div
				className={styles.ripple}
				style={{
					borderColor: theme.spinner.ripple,
				}}
			/>
		</div>
	);
};

Spinner.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number,
};

Spinner.contextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Spinner;
