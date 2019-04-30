import React from 'react';
import PropTypes from 'prop-types';

import styles from './Footer.css';

function Footer ({
	caption,
	countCurrent,
	countSeparator,
	countTotal,
	showCount,
	...props,
}, {
	theme,
}) {
	if (!caption && !showCount) return null;

	const imageCount = showCount ? (
		<div
			className="footerCount"
			style={{
				color: theme.footer.count.color,
				fontSize: theme.footer.count.fontSize,
			}}
		>
			{countCurrent}
			{countSeparator}
			{countTotal}
		</div>)
		: <span />;

	return (
		<div
			className="footer"
			style={{
				color: theme.footer.color,
			}}
			{...props}
		>
			{caption ? (
				<figcaption className={styles.footerCaption}>
					{caption}
				</figcaption>
			) : <span />}
			{imageCount}
		</div>
	);
}

Footer.propTypes = {
	caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	countCurrent: PropTypes.number,
	countSeparator: PropTypes.string,
	countTotal: PropTypes.number,
	showCount: PropTypes.bool,
};

Footer.contextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Footer;
