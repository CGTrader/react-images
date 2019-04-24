import { StyleSheet as _StyleSheet, css as _css } from 'aphrodite/no-important';

export function css (...args) {
	return typeof window === 'undefined' ? '' : _css.apply(this, args);
};
export var StyleSheet = {
	create: function create (...args) {
		return typeof window === 'undefined' ? {} : _StyleSheet.create.apply(this, args);
	},
};
