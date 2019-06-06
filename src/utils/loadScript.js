const loaded = [];

export default function loadScript (src) {
	return new Promise((resolve) => {
		if (loaded.includes(src)) {
			return resolve();
		}
		const script = document.createElement('script');
		script.src = src;
		script.addEventListener('load', () => {
			loaded.push(src);
			resolve();
		});
		document.body.appendChild(script);
	});
};
