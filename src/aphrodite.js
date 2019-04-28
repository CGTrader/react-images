export var StyleSheet = {
	create: function create (sheetDefinition) {
		const mappedSheetDefinition = {};
		const keys = Object.keys(sheetDefinition);

		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];
			const val = sheetDefinition[key];
			const stringVal = JSON.stringify(val);

			mappedSheetDefinition[key] = {
				_len: stringVal.length,
				_name: key,
				_definition: val,
			};
		}

		return mappedSheetDefinition;
	},
};
