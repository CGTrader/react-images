import React from 'react';
import Icon from './Icon';

import styles from './ToggleFullscreen.css';

const ToggleFullscreen = ({ onClick }) => {
	return (
		<div
			className={styles.icon}
			onClick={onClick}
		>
			<Icon type="fullScreen" />
		</div>
	);
};

export default ToggleFullscreen;
