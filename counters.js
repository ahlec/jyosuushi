(function () {
	/* class Item {
			"setName": "",
			"singular": "",
			"plural": "",
			"min": ##,
			"max": ##,
			"counters": []
		}
	*/
	
	/* class Counter {
			"kanji": "",
			"kana": "",
			"rule": "",
			"irregulars": {} // entries are "##" : "kana"
		}
	*/

	/* class Answer {
			"counterKanji: "",
			"counterKana": "",
			"counterRule": "",
			"isIrregular": (true | false),
			"kana": "", // complete answer in kana
			"kanji": "" // complete answer in kanji
		}
	*/
	
	/* class Question {
			"jlpt": "",
			"amount": ##,
			"conjugatedEnglish": "",	// noun only. ie "person" or "people"
			"answers": [] // array of Answer objects
		}
	*/
	
	var ITEMS = [], // array of Item objects
		COUNTERS = {}, // dictionay where the format is KANJI:Counter object
		DEFAULT_MAX = 100,
		KANA_CHART,
		LOADED_COUNTER_SETS = [],
		DISABLED_COUNTER_SETS = [],
		POSTKANA_MODIFIERS = [ "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "っ" ];
		
	KANA_CHART = [
		"あ", "い", "う", "え", "お",
		"か", "き", "く", "け", "こ",
		"が", "ぎ", "ぐ", "げ", "ご",
		"さ", "し", "す", "せ", "そ",
		"ざ", "じ", "ず", "ぜ", "ぞ",
		"た", "ち", "つ", "て", "と",
		"だ", "ぢ", "づ", "で", "ど",
		"な", "に", "ぬ", "ね", "の",
		"は", "ひ", "ふ", "へ", "ほ",
		"ば", "び", "ぶ", "べ", "ぼ",
		"ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
		"ま", "み", "む", "め", "も",
		"や", "", "ゆ", "", "よ",
		"ら", "り", "る", "れ", "ろ",
		"わ", "", "", "", "を"
	];
	
	// -------------------------------------------- JAPANESE
	window.Japanese = {};
	window.Japanese.getNumber = function (number, includeIchi) { // returns [ KANJI, KANA ]
		var MILLION = Math.pow(10, 6),
			TEN_THOUSAND = 10000,
			THOUSAND = 1000;
		
		if (typeof includeZero === "undefined") {
			includeZero = true;
		}
		if (typeof includeIchi === "undefined") {
			includeIchi = true;
		}
		
		// Base cases
		switch (number) {
			case 1: {
				if (includeIchi) {
					return ["一", "いち"];
				}
				return ["", ""];
			}
			case 2: {
				return ["二", "に"];
			}
			case 3: {
				return ["三", "さん"];
			}
			case 4: {
				return ["四", "よん"];
			}
			case 5: {
				return ["五", "ご"];
			}
			case 6: {
				return ["六", "ろく"];
			}
			case 7: {
				return ["七", "なな"];
			}
			case 8: {
				return ["八", "はち"];
			}
			case 9: {
				return ["九", "きゅう"];
			}
			case 0: {
				return ["", ""];
			}
		}
			
		// 10,000 (man)
		var numberMan = number / 10000;
		if (numberMan >= 1) {
			var beforeMan = Math.floor(numberMan),
				before = Japanese.getNumber(beforeMan, false),
				afterMan = number - (beforeMan * 10000),
				after = Japanese.getNumber(afterMan);
			return [
						before[0] + "万" + after[0],
						before[1] + "まん" + after[1]
					];
		}
		
		// 1,000 (sen)
		var numberSen = number / 1000;
		if (numberSen >= 1) {
			var beforeSen = Math.floor(numberSen),
				before = Japanese.getNumber(beforeSen, false),
				afterSen = number - (beforeSen * 1000),
				after = Japanese.getNumber(afterSen);
			return [
						before[0] + "千" + after[0],
						before[1] + "せん" + after[1]
					];
		}
		
		// 100 (hyaku)
		var numberHyaku = number / 100;
		if (numberHyaku >= 1) {
			var beforeHyaku = Math.floor(numberHyaku),
				before = Japanese.getNumber(beforeHyaku, false),
				afterHyaku = number - (beforeHyaku * 100),
				after = Japanese.getNumber(afterHyaku);
			return [
						before[0] + "百" + after[0],
						before[1] + "ひゃく" + after[1]
					];
		}
		
		// 10 (jyuu)
		var numberJyuu = number / 10;
		if (numberJyuu >= 1) {
			var beforeJyuu = Math.floor(numberJyuu),
				before = Japanese.getNumber(beforeJyuu, false),
				afterJyuu = number - (beforeJyuu * 10),
				after = Japanese.getNumber(afterJyuu);
			return [
						before[0] + "十" + after[0],
						before[1] + "じゅう" + after[1]
					];
		}
		
		return "????";
	}
	window.Japanese.changeFirstKanaSound = function (inputKana, desiredRomajiStart) { // ie Japanese.changeFirstKanaSound("き", "g") => "ぎ"
		var inputKanaIndex = KANA_CHART.indexOf(inputKana);
		
		if (inputKanaIndex >= 0) {
			var columnIndex = inputKanaIndex % 5;
			switch (desiredRomajiStart) {
				case "": return KANA_CHART[columnIndex];
				case "k": return KANA_CHART[columnIndex + 5];
				case "g": return KANA_CHART[columnIndex + 10];
				case "s": return KANA_CHART[columnIndex + 15];
				case "z": return KANA_CHART[columnIndex + 20];
				case "t": return KANA_CHART[columnIndex + 25];
				case "d": return KANA_CHART[columnIndex + 30];
				case "n": return KANA_CHART[columnIndex + 35];
				case "h": return KANA_CHART[columnIndex + 40];
				case "b": return KANA_CHART[columnIndex + 45];
				case "p": return KANA_CHART[columnIndex + 50];
				case "m": return KANA_CHART[columnIndex + 55];
				case "y": return KANA_CHART[columnIndex + 60];
				case "r": return KANA_CHART[columnIndex + 65];
				case "w": return KANA_CHART[columnIndex + 70];
			}
		}
		
		return inputKana + " + " + desiredRomajiStart + " = ???";
	}
	window.Japanese.convertKanaToRoomaji = function (kana) {
		if (kana === undefined || kana === null || kana.length === 0) {
			return "";
		}
		
		if (kana.length === 1) {
			var chartIndex = KANA_CHART.indexOf(kana),
				prefixRoomaji,
				thisRoomaji,
				followingKana,
				followingRoomaji,
				hasLittleTsu;
				
			if (POSTKANA_MODIFIERS.indexOf(kana) >= 0) {
				// We should have never been given this, either by recursion below or by the user putting in string that starts with a postfix modifier
				return "";
			}
				
			if (chartIndex < 0 && kana !== "ん") {
				return "[" + kana + "??]";
			}
			
			// Special characters
			if (kana === "じ") {
				return "ji";
			} else if (kana === "ち") {
				return "chi";
			} else if (kana === "を") {
				return "o";
			} else if (kana === "ん") {
				return "n";
			} else if (kana === "づ") {
				return "zu";
			} else if (kana === "ふ") {
				return "fu";
			}
			
			// Determine prefix character for regulars
			if (chartIndex < 5) {
				prefixRoomaji = "";
			} else if (chartIndex < 10) {
				prefixRoomaji = "k";
			} else if (chartIndex < 15) {
				prefixRoomaji = "g";
			} else if (chartIndex < 20) {
				prefixRoomaji = "s";
			} else if (chartIndex < 25) {
				prefixRoomaji = "z";
			} else if (chartIndex < 30) {
				prefixRoomaji = "t";
			} else if (chartIndex < 35) {
				prefixRoomaji = "d";
			} else if (chartIndex < 40) {
				prefixRoomaji = "n";
			} else if (chartIndex < 45) {
				prefixRoomaji = "h";
			} else if (chartIndex < 50) {
				prefixRoomaji = "b";
			} else if (chartIndex < 55) {
				prefixRoomaji = "p";
			} else if (chartIndex < 60) {
				prefixRoomaji = "m";
			} else if (chartIndex < 65) {
				prefixRoomaji = "y";
			} else if (chartIndex < 70) {
				prefixRoomaji = "r";
			} else if (prefixRoomaji < 75) {
				prefixRoomaji = "w";
			}
			
			switch (chartIndex % 5) {
				case 0: return prefixRoomaji + "a";
				case 1: return prefixRoomaji + "i";
				case 2: return prefixRoomaji + "u";
				case 3: return prefixRoomaji + "e";
				case 4: return prefixRoomaji + "o";
			}
		}
		
		thisRoomaji = Japanese.convertKanaToRoomaji(kana[0]);
		hasLittleTsu = false;
		followingKana = kana.substr(1);
		while (followingKana !== undefined && followingKana !== null && followingKana.length > 0) {
			// Check for special followers (ゃ, ぇ, etc) -- BUT NOT っ (since it requires knowing what comes next
			var followingIndex = POSTKANA_MODIFIERS.indexOf(followingKana[0]);
			if (followingIndex < 0) {
				break;
			}
			
			if (thisRoomaji.length > 1) {
				if (followingKana[0] != "っ") {
					thisRoomaji = thisRoomaji.substr(0, thisRoomaji.length - 1);
					// With っ we don't take off the last character of the preceding roomaji
				}
				switch (followingKana[0]) {
					case "ぁ": {
						thisRoomaji += "a";
						break;
					}
					case "ぃ": {
						thisRoomaji += "i";
						break;
					}
					case "ぅ": {
						thisRoomaji += "u";
						break;
					}
					case "ぇ": {
						thisRoomaji += "e";
						break;
					}
					case "ぉ": {
						thisRoomaji += "o";
						break;
					}
					case "ゃ": {
						thisRoomaji += "ya";
						break;
					}
					case "ゅ": {
						thisRoomaji += "yu";
						break;
					}
					case "ょ": {
						thisRoomaji += "yo";
						break;
					}
					case "っ": {
						hasLittleTsu = true;
						break;
					}
				}
				followingKana = followingKana.substr(1); // Remove the postfix modifier
			}
		}
		followingRoomaji = Japanese.convertKanaToRoomaji(followingKana);
		if (followingRoomaji === undefined || followingRoomaji === null) {
			followingRoomaji = "";
		}
		
		if (hasLittleTsu && followingRoomaji.length > 0) {
			thisRoomaji += followingRoomaji[0];
		}
		return thisRoomaji + followingRoomaji;
	}
	window.Japanese.conjugateKanaForCounter = function (amount, kana) {	// ie Japanese.conjugateKanaForCounter(1, "ほん") => ["いっぽん"]). This returns an array of all possibilities
		// Determine the sound change for the counter
		var counterDefaultRomaji = Japanese.convertKanaToRoomaji(kana),
			lastAmountDigit = amount % 10,
			prefixNumber,
			prefixAmount;
			
		if (amount % 10000 === 0) {
			prefixAmount = Japanese.getNumber(Math.floor(amount / 10000), false);
			switch (counterDefaultRomaji[0]) {
				case "h": {
					return [ prefixAmount[1] + "まん" + Japanese.changeFirstKanaSound(kana[0], "b") + kana.substr(1) ];
				}
				case "f": {
					return [ prefixAmount[1] + "ばん" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "まん" + kana ];
				}
			}
		} else if (amount % 1000 === 0) {
			prefixAmount = Japanese.getNumber(Math.floor(amount / 1000), false);
			switch (counterDefaultRomaji[0]) {
				case "h": {
					return [ prefixAmount[1] + "せん" + Japanese.changeFirstKanaSound(kana[0], "b") + kana.substr(1) ];
				}
				case "f": {
					return [ prefixAmount[1] + "せん" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "せん" + kana ];
				}
			}
		} else if (amount % 100 === 0) {
			prefixAmount = Japanese.getNumber(Math.floor(amount / 100), false);
			switch (counterDefaultRomaji[0]) {
				case "k": {
					return [ prefixAmount[1] + "ひゃっ" + kana ];
				}
				case "h":
				case "f":
				case "p": {
					return [ prefixAmount[1] + "ひゃっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "ひゃく" + kana ];
				}
			}
		} else if (amount % 10 === 0) {
			// we need to transform 1020 into 1002
			var numberTens = Math.floor(amount % 100);
			prefixNumber = amount - (amount % 100); // Get rid of everything less than 1000 (1020 -> 1000)
			prefixNumber += Math.floor(numberTens / 10); // Add a trailing 2 that we get from the 20 part of 1020
			prefixAmount = Japanese.getNumber(prefixNumber, false);
			return [ prefixAmount[1] + "じゅう" + kana ];
		}
			
		if (lastAmountDigit == 1) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 1), false);
			switch (counterDefaultRomaji[0]) {
				case "k":
				case "s":
				case "t":
				case "c": {
					return [ prefixAmount[1] + "いっ" + kana ];
				}
				case "h":
				case "f":
				case "b":
				case "p": {
					return [ prefixAmount[1] + "いっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "いち" + kana ];
				}
			}
		} else if (lastAmountDigit == 2) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 2), false);
			return [ prefixAmount[1] + "に" + kana ];
		} else if (lastAmountDigit == 3) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 3), false);
			switch (counterDefaultRomaji[0]) {
				case "h":
				case "w": {
					return [ prefixAmount[1] + "さん" + Japanese.changeFirstKanaSound(kana[0], "b") + kana.substr(1) ];
				}
				case "f": {
					return [ prefixAmount[1] + "さん" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "さん" + kana ];
				}
			}
		} else if (lastAmountDigit == 4) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 4), false);
			switch (counterDefaultRomaji[0]) {
				case "h":
				case "f": {
					return [ prefixAmount[1] + "よん" + Japanese.changeFirstKanaSound(kana[0], "h") + kana.substr(1) ];
				}
				case "w": {
					return [ "????" ];
				}
				default: {
					return [ prefixAmount[1] + "よん" + kana ];
				}
			}
		} else if (lastAmountDigit == 5) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 5), false);
			return [ prefixAmount[1] + "ご" + kana ];
		} else if (lastAmountDigit == 6) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 6), false);
			switch (counterDefaultRomaji[0]) {
				case "k": {
					return [ prefixAmount[1] + "ろっ" + kana ];
				}
				case "h":
				case "f":
				case "p": {
					return [ prefixAmount[1] + "ろっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "ろく" + kana ];
				}
			}
		} else if (lastAmountDigit == 7) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 7), false);
			return [ prefixAmount[1] + "なな" + kana, prefixAmount[1] + "しち" + kana ];
		} else if (lastAmountDigit == 8) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 8), false);
			switch (counterDefaultRomaji[0]) {
				case "k":
				case "s": {
					return [ prefixAmount[1] + "はっ" + Japanese.changeFirstKanaSound(kana[0], "k") + kana.substr(1) ];
				}
				case "t":
				case "c": {
					return [ prefixAmount[1] + "はっ" + Japanese.changeFirstKanaSound(kana[0], "t") + kana.substr(1) ];
				}
				case "h":
				case "f":
				case "p": {
					return [ prefixAmount[1] + "はっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ];
				}
				default: {
					return [ prefixAmount[1] + "はち" + kana ];
				}
			}
		} else if (lastAmountDigit == 9) {
			prefixAmount = Japanese.getNumber(Math.floor(amount - 9), false);
			return [ prefixAmount[1] + "きゅう" + kana ];
		}
	}
	
	// -------------------------------------------- COUNTERS
	window.Counters = {};
	window.Counters.load = function (set) {
		if (LOADED_COUNTER_SETS.indexOf(set) >= 0) {
			return;
		}
		
		var index = 0;
		
		function getIndexOfItem(singular) {
			for (index = 0; index < ITEMS.length; ++index) {
				if (ITEMS[index]["singular"] == singular) {
					return index;
				}
			}
			return -1;
		}
		
		function getIndexOfCounter(kanji) {
			for (index = 0; index < COUNTERS.length; ++index) {
				if (COUNTERS[index]["kanji"] == kanji) {
					return index;
				}
			}
			return -1;
		}
		
		$.getJSON("sets/" + set + ".json").then(function (data) {
			var itemIndex,
				plural,
				min,
				max,
				counters,
				counterIndex,
				existantIndex,
				inputIndex,
				irregulars;
			
			$.each(data["items"], function (key, value) {
				itemIndex = getIndexOfItem(key);
				
				if (itemIndex >= 0) {
					counters = ($.isArray(value) ? value : value["counters"]);
					for (counterIndex = 0; counterIndex < counters.length; ++counterIndex) {
						existantIndex = ITEMS[itemIndex]["counters"].indexOf(counters[counterIndex]);
						if (existantIndex < 0) {
							ITEMS[itemIndex]["counters"].push(counters[counterIndex]);
						}
					}
				} else {
					if ($.isArray(value)) {
						plural = key + "s";
						min = 0;
						max = DEFAULT_MAX;
						counters = value;
					} else {
						plural = (value["plural"] ? value["plural"] : key + "s");
						min = (value["min"] ? Number.parseInt(value["min"]) : 0);
						max = (value["max"] ? Number.parseInt(value["max"]) : DEFAULT_MAX);
						counters = value["counters"];
						if (min == NaN) {
							min = 0;
						}
						if (max == NaN) {
							max = DEFAULT_MAX;
						}
					}
					
					ITEMS.push({
						"setName": data["setName"],
						"singular": key,
						"plural": plural,
						"min": min,
						"max": max,
						"counters": counters
					});
				}
			});
			
			$.each(data["counters"], function (key, value) {
				counterIndex = getIndexOfCounter(key);
				
				if (counterIndex < 0) {
					COUNTERS[key] = {
						"kanji": key,
						"kana": value["kana"],
						"rule": value["rule"],
						"irregulars": (value["irregulars"] ? value["irregulars"] : {})
					};
				}
			});
			
			LOADED_COUNTER_SETS.push(set);
		});
	};
	window.Counters.getAllItems = function () {
		return ITEMS;
	};
	window.Counters.getAllCounters = function () {
		return COUNTERS;
	};
	
	// -------------------------------------------- QUIZMASTER
	window.QuizMaster = {};
	window.QuizMaster.toggleSet = function (set) {
		Counters.load(set);
		if (LOADED_COUNTER_SETS.indexOf(set) >= 0) {
			var indexOfDisabled = DISABLED_COUNTER_SETS.indexOf(set);
			if (indexOfDisabled < 0) {
				DISABLED_COUNTER_SETS.push(set);
			} else {
				DISABLED_COUNTER_SETS.splice(indexOfDisabled, 1);
			}
		}
	}
	window.QuizMaster.getRandomQuestion = function () {
		var randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)],
			randomAmount = randomItem["min"] + Math.floor(Math.random() * (randomItem["max"] - randomItem["min"])),
			allAnswers = [],
			localAnswers,
			number;
			
		$.each(randomItem["counters"], function (index, counterKanji) {
			if (COUNTERS[counterKanji]) {
				number = Japanese.getNumber(randomAmount, false);
				if (COUNTERS[counterKanji]["irregulars"][randomAmount.toString()]) {
					allAnswers.push({
						"counterKanji": counterKanji,
						"counterKana": COUNTERS[counterKanji]["kana"],
						"counterRule": COUNTERS[counterKanji]["rule"],
						"isIrregular": true,
						"kana": COUNTERS[counterKanji]["irregulars"][randomAmount.toString()],
						"kanji": number[0] + counterKanji
					});
				} else {
					localAnswers = Japanese.conjugateKanaForCounter(randomAmount, COUNTERS[counterKanji]["kana"]);
					$.each(localAnswers, function (index, kanaAnswer) {
						allAnswers.push({
							"counterKanji": counterKanji,
							"counterKana": COUNTERS[counterKanji]["kana"],
							"counterRule": COUNTERS[counterKanji]["rule"],
							"isIrregular": false,
							"kana": kanaAnswer,
							"kanji": number[0] + counterKanji
						});
					});
				}
			}
		});
			
		return {
			"jlpt": randomItem["jlpt"],
			"amount": randomAmount,
			"conjugatedEnglish": (randomAmount == 1 ? randomItem["singular"] : randomItem["plural"]),
			"answers": allAnswers
		};
	};
})();
/*
// ---------------------------- Japanese data

// determineAnswer(counter, amount)
// 		- counter: json object for the desired counter, from COUNTERS
//		- amount: numeric amount to use with the counter
// 	Returns: an array of the format [ kanji, romaji ]
// 	Assumptions: This function only works for nonzero positive numbersr
function determineAnswer(counter, amount) {
	if (amount <= 0) {
		return ["", ""];
	}
	// Does special case exist?
	if (counter["special"] && counter["special"][amount.toString()] !== undefined) {
		return counter["special"][amount.toString()];
	}
	
	function _determineAnswerAsRomaji() {
		// Determine the sound change for the counter
		var counterDefaultRomaji = hiraganaToRomaji(counter["hiragana"]),
			lastAmountDigit = amount % 10,
			prefixNumber,
			prefixAmount;
		if (amount % 10000 === 0) {
			prefixAmount = getNumber(Math.floor(amount / 10000), false);
			switch (counterDefaultRomaji[0]) {
				case "h": {
					return prefixAmount[1] + "manb" + counterDefaultRomaji.substr(1);
				}
				case "f": {
					return prefixAmount[1] + "manp" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "man" + counterDefaultRomaji;
				}
			}
		} else if (amount % 1000 === 0) {
			prefixAmount = getNumber(Math.floor(amount / 1000), false);
			switch (counterDefaultRomaji[0]) {
				case "h": {
					return prefixAmount[1] + "senb" + counterDefaultRomaji.substr(1);
				}
				case "f": {
					return prefixAmount[1] + "senp" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "sen" + counterDefaultRomaji;
				}
			}
		} else if (amount % 100 === 0) {
			prefixAmount = getNumber(Math.floor(amount / 100), false);
			switch (counterDefaultRomaji[0]) {
				case "k": {
					return prefixAmount[1] + "hyak" + counterDefaultRomaji;
				}
				case "h":
				case "f":
				case "p": {
					return prefixAmount[1] + "hyapp" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "hyaku" + counterDefaultRomaji;
				}
			}
		} else if (amount % 10 === 0) {
			// we need to transform 1020 into 1002
			var numberTens = Math.floor(amount % 100);
			prefixNumber = amount - (amount % 100); // Get rid of everything less than 1000 (1020 -> 1000)
			prefixNumber += Math.floor(numberTens / 10); // Add a trailing 2 that we get from the 20 part of 1020
			prefixAmount = getNumber(prefixNumber, false);
			return prefixAmount[1] + "jyuu" + counterDefaultRomaji;
		} else if (lastAmountDigit == 1) {
			prefixAmount = getNumber(Math.floor(amount - 1), false);
			switch (counterDefaultRomaji[0]) {
				case "k":
				case "s":
				case "t":
				case "c": {
					return prefixAmount[1] + "i" + counterDefaultRomaji[0] + counterDefaultRomaji;
				}
				case "h":
				case "f":
				case "b":
				case "p": {
					return prefixAmount[1] + "ipp" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "ichi" + counterDefaultRomaji;
				}
			}
		} else if (lastAmountDigit == 2) {
			prefixAmount = getNumber(Math.floor(amount - 2), false);
			return prefixAmount[1] + "ni" + counterDefaultRomaji;
		} else if (lastAmountDigit == 3) {
			prefixAmount = getNumber(Math.floor(amount - 3), false);
			switch (counterDefaultRomaji[0]) {
				case "h":
				case "w": {
					return prefixAmount[1] + "sanb" + counterDefaultRomaji.substr(1);
				}
				case "f": {
					return prefixAmount[1] + "sanp" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "san" + counterDefaultRomaji;
				}
			}
		} else if (lastAmountDigit == 4) {
			prefixAmount = getNumber(Math.floor(amount - 4), false);
			switch (counterDefaultRomaji[0]) {
				case "h":
				case "f": {
					return prefixAmount[1] + "yonh" + counterDefaultRomaji.substr(1);
				}
				case "w": {
					return "????";
				}
				default: {
					return prefixAmount[1] + "yon" + counterDefaultRomaji;
				}
			}
		} else if (lastAmountDigit == 5) {
			prefixAmount = getNumber(Math.floor(amount - 5), false);
			return prefixAmount[1] + "go" + counterDefaultRomaji;
		} else if (lastAmountDigit == 6) {
			prefixAmount = getNumber(Math.floor(amount - 6), false);
			switch (counterDefaultRomaji[0]) {
				case "k": {
					return prefixAmount[1] + "rokk" + counterDefaultRomaji.substr(1);
				}
				case "h":
				case "f":
				case "p": {
					return prefixAmount[1] + "ropp" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "roku" + counterDefaultRomaji;
				}
			}
		} else if (lastAmountDigit == 7) {
			prefixAmount = getNumber(Math.floor(amount - 7), false);
			return prefixAmount[1] + "nana" + counterDefaultRomaji;
		} else if (lastAmountDigit == 8) {
			prefixAmount = getNumber(Math.floor(amount - 8), false);
			switch (counterDefaultRomaji[0]) {
				case "k":
				case "s": {
					return prefixAmount[1] + "hak" + counterDefaultRomaji;
				}
				case "t":
				case "c": {
					return prefixAmount[1] + "hatt" + counterDefaultRomaji.substr(1);
				}
				case "h":
				case "f":
				case "p": {
					return prefixAmount[1] + "happ" + counterDefaultRomaji.substr(1);
				}
				default: {
					return prefixAmount[1] + "hachi" + counterDefaultRomaji;
				}
			}
		} else if (lastAmountDigit == 9) {
			prefixAmount = getNumber(Math.floor(amount - 9), false);
			return prefixAmount[1] + "kyuu" + counterDefaultRomaji;
		}
	}
	
	return [ getNumber(amount)[0] + counter["kanji"], _determineAnswerAsRomaji() ];
}


// ------------------------------------ Questions/UI
var CORRECT_ANSWERS = 0,
	INCORRECT_ANSWERS = 0,
	TOTAL_ANSWERS = 0;
			
function setupNextQuestion() {
	var randomCounter = COUNTERS[Math.floor(Math.random() * COUNTERS.length)],
		randomObject = randomCounter["objects"][Math.floor(Math.random() * randomCounter["objects"].length)],
		randomAmount,
		counterEnglish;
		
	do {
		randomAmount = Math.floor(Math.random() * 100)
	} while (randomAmount === 0);
		
	if (typeof randomObject === "object") {
		counterEnglish = (randomAmount === 1 ? randomObject[0] : randomObject[1]);
	} else {
		counterEnglish = (randomAmount === 1 ? randomObject : randomObject + "s");
	}
			
	$("#question").html(randomAmount.toString() + " " + counterEnglish);
	$("#answer").val("");
	$("#answer").data("question", {
		amount: randomAmount,
		counter: randomCounter,
		object: counterEnglish
	});
}

function submitAnswer() {
	var question = $("#answer").data("question"),
		answerRaw = $("#answer").val(),
		userInputAnswer,
		userInputRomaji,
		correctAnswer = determineAnswer(question["counter"], question["amount"]);
		
	// Clean up the user's input answer
	userInputAnswer = answerRaw;
	if (typeof userInputAnswer === undefined || userInputAnswer === null) {
		userInputAnswer = "";
	}
	if (userInputAnswer.endsWith("n") || userInputAnswer.endsWith("N")) {
		userInputAnswer = userInputAnswer.substr(0, userInputAnswer.length - 1) + "ん";
		$("#answer").val(userInputAnswer);
	}
	userInputRomaji = hiraganaToRomaji(userInputAnswer);
	
	// Compare
	if (userInputRomaji == correctAnswer[1]) {
		alert("you did it!");
		++CORRECT_ANSWERS;
	} else {
		alert(":(\nThe correct answer was:\n" + correctAnswer[1] + "\n(" + correctAnswer[0] + ")\n\nYou entered:\n" + userInputRomaji);
		++INCORRECT_ANSWERS;
	}
	++TOTAL_ANSWERS;
	
	// Update tally
	$("#tally").html(CORRECT_ANSWERS.toString() + " correct | " + TOTAL_ANSWERS.toString() + " total (" + Math.floor(CORRECT_ANSWERS / TOTAL_ANSWERS * 100) + "%)");
	
	// Add to history
	var historyRow = $(document.createElement('tr'));
	if (userInputRomaji == correctAnswer[1]) {
		historyRow.addClass("correct");
	} else {
		historyRow.addClass("incorrect");
	}
		
	$(document.createElement('td')).addClass('question').html(question["amount"]).appendTo(historyRow);
	$(document.createElement('td')).addClass('question').html(question["object"]).appendTo(historyRow);
	$(document.createElement('td')).addClass('you').html(userInputAnswer).appendTo(historyRow);
	$(document.createElement('td')).addClass('answer').html(correctAnswer[1] + " (" + correctAnswer[0] + ")").appendTo(historyRow);
	$(document.createElement('td')).addClass('answer').html(question["counter"]["hiragana"] + " (" + question["counter"]["kanji"] + ")").appendTo(historyRow);
	$(document.createElement('td')).addClass('answer').html(question["counter"]["rule"]).appendTo(historyRow);
	
	$("#history tr:nth-child(2)").after(historyRow);
	
	// Next question
	setupNextQuestion();
}*/