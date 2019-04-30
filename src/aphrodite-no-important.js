import { StyleSheet as _StyleSheet, css as _css } from 'aphrodite/no-important';
import canUseDom from './utils/canUseDom';

export function css (...args) {
	return !canUseDom ? '' : _css.apply(this, args);
};
export var StyleSheet = {
	create: function create (...args) {
		return !canUseDom ? {} : _StyleSheet.create.apply(this, args);
	},
};
