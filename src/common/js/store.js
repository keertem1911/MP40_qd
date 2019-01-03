export function saveToSession(key, value) {
	let seller = window.sessionStorage.getItem(key);
		seller = {};
	seller = value;
	window.sessionStorage.setItem(key,JSON.stringify(seller)) ;
};

export function loadFromSession( key, def='') {
	let seller = window.sessionStorage.getItem(key);
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller);
	if (!seller) {
		return def;
	}

	return seller || def;
};
