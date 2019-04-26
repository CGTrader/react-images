export default function loadScript (src) {
	return new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = src;
		script.addEventListener('load', resolve);
		document.body.appendChild(script);
	});
};
