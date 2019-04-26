// ==============================
// THEME
// ==============================

const theme = {};

// inline container
theme.inline = {
	height: '100%',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	lineHeight: '1',
};

// container
theme.container = {
	background: 'rgba(0, 0, 0, 0.8)',
	gutter: {
		horizontal: 0,
		vertical: 0,
	},
	zIndex: 2001,
};

// header
theme.header = {
	height: 40,
};
theme.close = {
	fill: 'white',
};

// footer
theme.footer = {
	color: 'white',
	count: {
		color: 'rgba(255, 255, 255, 0.75)',
		fontSize: '0.85em',
	},
	height: 40,
	gutter: {
		horizontal: 0,
		vertical: 5,
	},
};

// thumbnails
theme.thumbnail = {
	sidePadding: 40,
	activeBorderColor: 'white',
	size: 50,
	gutter: 2,
};

// arrow
theme.arrow = {
	background: 'none',
	fill: 'white',
	height: 120,
};


export default theme;
