export function findResult(input, dictOne) {
	var input_arr = toArray(input);
  	var sovpadenia = {};

	for (var key in dictOne) {
		sovpadenia[key] = count_coincidence(input_arr, dictOne[key]);		
	}

	return getMaxPropertyName(sovpadenia);
}

export function findMatch(keywords, text) {
	for (var i = 0; i < keywords.length; i++) {
		if (keywords.toLowerCase() === text.toLowerCase()) return true;
	}
	
	return false;
}

export function makeMultiDecObj(data) {
	var multiDecItems = [];

    if (data.length > 2) {
		for (var i = 0; i < data.length; i++ ) {
			if (data[i + 1]) {
				if (data[i + 1].value === data[i].value) {
					data[i].value = data[i].value + ', ' + data[i].data[0].country;
					if (!data[i + 2]) {
						data[i + 1].value = data[i + 1].value + ', ' + data[i + 1].data[0].country;
					}
				}
			}
		}

       for (var i = 0; i < data.length; i++) {
            multiDecItems.push({
                columnId: i + 1,
                columnScore: 0,
                inputTitleValue: data[i].value,
                childRow: [
                {
                	inputValue1: "",
                	rowId: 1,
                    toggled: true
				},
                {
					inputValue2: "",
					rowId: 2,
					toggled: true
                }
			]
		})}
	}

	return multiDecItems;
}

// Собираем объект для лога
export function forLog(keywords, text, domain, params) {
	var sendLog = {
		addquestion: false,
		iskeydefined: false,
		isnameddef: false,
		outtype: false,
		domain: domain,
		params: [],
		input: text
	};

	if (domain == 'dou' || domain == 'topquestion' || domain == 'empty' || domain == 'length') {
		sendLog.outtype = 'paper';
	}

	if (keywords.length > 0) {
		if (keywords.length <= 1 || params) sendLog.addquestion = true;
		if (keywords.length >= 1) sendLog.iskeydefined = true; sendLog.outtype = 'inputs';
		if (keywords.length > 0) sendLog.isnameddef = true
		if (keywords.length > 2) sendLog.outtype = 'pros&cons'
		if (keywords.length == 2) sendLog.outtype = 'sliders'
		sendLog.params = keywords;
	}


	return sendLog;
}

export function toArray(input) {
	if (input.indexOf('new york')) {
		var changedCity = input.replace('new york', 'new-york');
	}
	if (input.indexOf('new jersey')) {
		var changedCity = changedCity.replace('new jersey', 'new-jersey');
	}

	var changedCity = changedCity.split(/[,.!?;():/]| /);

	for (var i = 0; i < changedCity.length; i++) {
		if (changedCity[i] === 'new-york') {
			changedCity[i] = 'new york';
		}
		if (changedCity[i] === 'new-jersey') {
			changedCity[i] = 'new jersey';
		}
	}

	return changedCity;
}

export function findKeywords(input, citys) {
	var text = toArray(input);
	var temp;
	var result = [];

	for (var i = 0; i < text.length; i++) {
		temp = text[i];
		for (var b = 0; b < citys.length; b++) {
			if (citys[b].toLowerCase() === temp && result.indexOf(temp) === -1) {
				result.push(temp);
			}
		}
	}
	
	return result;
}

export function getMax(objcts) {
	var max = 0;
	var winner;

	for (var key in objcts) {
		if (objcts[key].length > max) {
			max = objcts[key].length;
			winner = {[key]: objcts[key]};
		}
	}

	return winner;
}

function getMaxPropertyName(properties_coincidence){
	var max = 0;
	var winners = [];

	for (var key in properties_coincidence) {
		if(properties_coincidence[key] > max){
			max = properties_coincidence[key];
		}
	}

	for (var key in properties_coincidence) {
		if (properties_coincidence[key] == max) {
			winners.push(key)
		}
	}

	if (max == 0) {
		winners = [];
	}

	return winners;
}

function count_coincidence(input_arr, property) {
	var total = 0;

	for (var i = 0; i < property.length; i++) {
		for (var a = 0; a < input_arr.length; a++) {
			if (property[i] === input_arr[a]) {
				total++;
			}
		}
	}	

	return total;
}
