import PropTypes from 'prop-types';
import React from 'react';
import Thumbnail from './Thumbnail';

import styles from './Thumbnails.css';

function Thumbnails ({ currentImage, images, onClickThumbnail }, { theme }) {
	return (
		<div
			className={styles.thumbnails}
			style={{
				bottom: theme.container.gutter.vertical,
				height: theme.thumbnail.height,
				left: theme.container.gutter.horizontal,
				right: theme.container.gutter.horizontal,
			}}
		>
			{images.map((img, idx) => (
				<Thumbnail
					{...img}
					active={idx === currentImage}
					index={idx}
					key={idx}
					onClick={onClickThumbnail}
				/>
			))}
		</div>
	);
}

Thumbnails.propTypes = {
	currentImage: PropTypes.number,
	images: PropTypes.array,
	onClickThumbnail: PropTypes.func.isRequired,
};

export default Thumbnails;
