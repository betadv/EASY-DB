const del = (object, item) => {
	let currentObject = object;
	const parts = item.split('.');
	const last = parts.pop();
	for (const part of parts) {
		currentObject = currentObject[part];
		if (!currentObject) {
			return;
		}
	}
	delete currentObject[last];
};

const set = (object, item, value) => {
	let currentObject = object;
	const parts = item.split('.');
	const last = parts.pop();
	for (const part of parts) {
		currentObject = currentObject[part];
		if (!currentObject) {
			return;
		}
	}
	currentObject[last] = value;
};

const get = (object, item) => {
	let currentObject = object;
	const parts = item.split('.');
	const last = parts.pop();
	for (const part of parts) {
		currentObject = currentObject[part];
		if (!currentObject) {
			return;
		}
	}

	return currentObject[last];
};

const push = (object, item, value) => {
	let currentObject = object;
	const parts = item.split('.');
	const last = parts.pop();
	for (const part of parts) {
		currentObject = currentObject[part];
		if (!currentObject) {
			return;
		}
	}

	currentObject[last].push(value);
};

const unpush = (object, item, value, count) => {
	let currentObject = object;
	const parts = item.split('.');
	const last = parts.pop();
	for (const part of parts) {
		currentObject = currentObject[part];
		if (!currentObject) {
			return;
		}
	}
	if (count == 'all') {
		currentObject[last] = currentObject[last].filter(e => {
			return e !== value;
		});
	} else {
		let i = 1;
		let val = currentObject[last].indexOf(value);
		while (i <= count) {
		  if(val == -1) return;
		  console.log(val)
			currentObject[last].splice(val, 1);
			val = currentObject[last].indexOf(value);
			i++;
		}
	}
};

module.exports = { set, del, get, push, unpush };
