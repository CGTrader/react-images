// ==============================
// THEME
// ==============================

const theme = {};

theme.spinner = {
	size: 100,
	ripple: '#fff',
};

theme.container = {
	background: 'rgba(0, 0, 0, 0.8)',
	gutter: {
		horizontal: 5,
		vertical: 0,
	},
	zIndex: 2001,
};

theme.header = {
	height: 40,
};

theme.close = {
	fill: 'white',
};

theme.footer = {
	color: 'white',
	count: {
		color: 'rgba(255, 255, 255)',
	},
	height: 40,
	gutter: {
		horizontal: 0,
		vertical: 5,
	},
};

theme.thumbnail = {
	sidePadding: 40,
	activeBorderColor: 'white',
	size: 50,
	gutter: 2,
};

theme.arrow = {
	background: 'none',
	fill: 'white',
	height: 120,
};


export default theme;
