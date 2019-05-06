import PropTypes from 'prop-types';
import React from 'react';

import defaults from '../theme';
import Icon from './Icon';

import styles from './Header.css';

function Header ({
	customControls,
	onClose,
	showCloseButton,
	closeButtonTitle,
	...props,
}, {
	theme,
}) {
	return (
		<div
			className={styles.header}
			style={{
				height: defaults.header.height,
			}}
			{...props}
		>
			{customControls ? customControls : <span />}
			{!!showCloseButton && (
				<button
					title={closeButtonTitle}
					className={`close ${styles.close}`}
					onClick={onClose}
				>
					<Icon fill={!!theme.close && theme.close.fill || defaults.close.fill} type="close" />
				</button>
			)}
		</div>
	);
}

Header.propTypes = {
	customControls: PropTypes.array,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool,
};
Header.contextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Header;
