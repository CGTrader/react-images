import canUseDom from './src/utils/canUseDom';

export default function (css) {
	if (canUseDom) {
		return css;
	}
	return false;
};
