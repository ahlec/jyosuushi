(function () {
    /* class Item {
            "setName": "",
            "set": "",
            "singular": "",
            "plural": "",
            "min": ##,
            "max": ##,
            "counters": []
        }
    */

    /* class Counter {
            "setName": "",
            "set": "",
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
            "setName": "",
            "isIrregular": (true | false),
            "kana": "", // complete answer in kana
            "kanji": "" // complete answer in kanji
        }
    */

    /* class Question {
            "amount": ##,
            "conjugatedEnglish": "",    // noun only. ie "person" or "people"
            "answers": [], // array of Answer objects
            "encouragement": ""
        }
    */

    var ITEMS = [], // array of Item objects
        COUNTERS = {}, // dictionay where the format is KANJI:Counter object
        DEFAULT_MAX = 100,
        KANA_CHART,
        LOADED_COUNTER_SETS = {}, // dictionary where format is SET:Set name (ie, "counters_n5":"JLPT n5")
        ENABLED_COUNTER_SETS = [], // array of SETS (ie, [ "counters_n5" ])
        POSTKANA_MODIFIERS = [ "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "っ" ],
        ENCOURAGEMENTS;

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

    ENCOURAGEMENTS = [
        "Come on! I know you've got this!",
        "I'm sure you gonna get this, first try!",
        "This is a piece of cake for you, isn't it?",
        "Oh man, knock this one out easy!",
        "Don't overthink it! You're smart; your first guess was probably right!",
        "Believe in the me that believes in you!",
        "This is hard stuff, but man are you aceing this!",
        "Ah crud, you're putting me to shame! I'll have to try harder!",
        "You don't even need my encouragement, do you?",
        "Dang you're smart!!"
    ];

    // -------------------------------------------- JAPANESE
    window.Japanese = {};
    window.Japanese.getNumber = function (number, includeIchi) { // returns [ [ KANJI, KANA ] ]
        var MILLION = Math.pow(10, 6),
            TEN_THOUSAND = 10000,
            THOUSAND = 1000;

        if (typeof includeZero === "undefined") {
            includeZero = true;
        }
        if (typeof includeIchi === "undefined") {
            includeIchi = true;
        }

        function permutateArray(prefixArray, suffixArray, subindex) {
            var results = [],
                prefixIndex,
                suffixIndex;
            for (prefixIndex = 0; prefixIndex < prefixArray.length; ++prefixIndex) {
                for (suffixIndex = 0; suffixIndex < suffixArray.length; ++suffixIndex) {
                    results.push(prefixArray[prefixIndex][subindex] + suffixArray[suffixIndex][subindex]);
                }
            }
            return results;
        }

        function invertArray(array1, array2) { // [ [ "hi", "1"] ] + [ [ "yo", "2" ] ] = [ ["hi", "yo"], ["1", "2" ] ]
            var results = [],
                index,
                array1Index,
                array2Index;
            //for (index = 0; index < array1[0].length; ++index) {
                for (array1Index = 0; array1Index < array1.length; ++array1Index) {
                    for (array2Index = 0; array2Index < array2.length; ++array2Index) {
                        results.push([ array1[array1Index], array2[array2Index] ]);
                    }
                }
            //}

            return results;
        }

        function stripKanaDuplicates(array1) {
            var encountered = [],
                index,
                results = [];

            for (index = 0; index < array1.length; ++index) {
                if (encountered.indexOf(array1[index][1]) < 0) {
                    results.push(array1[index]);
                    encountered.push(array1[index][1]);
                }
            }
            return results;
        }

        function conjoinThreeNumberArrays(prefixArray, thisArray, suffixArray) {
            var afterKanji = permutateArray(thisArray, suffixArray, 0),
                afterKana = permutateArray(thisArray, suffixArray, 1),
                after = stripKanaDuplicates(invertArray(afterKanji, afterKana)),
                totalKanji = permutateArray(prefixArray, after, 0),
                totalKana = permutateArray(prefixArray, after, 1),
                total = stripKanaDuplicates(invertArray(totalKanji, totalKana));
            return total;
        }

        // Base cases
        switch (number) {
            case 1: {
                if (includeIchi) {
                    return [ ["一", "いち"] ];
                }
                return [ ["", ""] ];
            }
            case 2: {
                return [ ["二", "に"] ];
            }
            case 3: {
                return [ ["三", "さん"] ];
            }
            case 4: {
                return [ ["四", "よん"], ["四", "し"] ];
            }
            case 5: {
                return [ ["五", "ご"] ];
            }
            case 6: {
                return [ ["六", "ろく"] ];
            }
            case 7: {
                return [ ["七", "なな"], ["七", "しち"] ];
            }
            case 8: {
                return [ ["八", "はち"] ];
            }
            case 9: {
                return [ ["九", "きゅう"] ];
            }
            case 0: {
                return [ ["", ""] ];
            }
        }

        // 10,000 (man)
        var numberMan = number / 10000;
        if (numberMan >= 1) {
            var beforeMan = Math.floor(numberMan),
                before = Japanese.getNumber(beforeMan, false),
                afterMan = number - (beforeMan * 10000),
                after = Japanese.getNumber(afterMan);
            return conjoinThreeNumberArrays(before, [ [ "万", "まん" ] ], after);
        }

        // 1,000 (sen)
        var numberSen = number / 1000;
        if (numberSen >= 1) {
            var beforeSen = Math.floor(numberSen),
                before = Japanese.getNumber(beforeSen, false),
                afterSen = number - (beforeSen * 1000),
                after = Japanese.getNumber(afterSen);
            return conjoinThreeNumberArrays(before, [ [ "千", "せん" ] ], after);
        }

        // 100 (hyaku)
        var numberHyaku = number / 100;
        if (numberHyaku >= 1) {
            var beforeHyaku = Math.floor(numberHyaku),
                before = Japanese.getNumber(beforeHyaku, false),
                afterHyaku = number - (beforeHyaku * 100),
                after = Japanese.getNumber(afterHyaku);
            return conjoinThreeNumberArrays(before, [ [ "百", "ひゃく" ] ], after);
        }

        // 10 (jyuu)
        var numberJyuu = number / 10;
        if (numberJyuu >= 1) {
            var beforeJyuu = Math.floor(numberJyuu),
                before = Japanese.getNumber(beforeJyuu, false),
                afterJyuu = number - (beforeJyuu * 10),
                after = Japanese.getNumber(afterJyuu);
            return conjoinThreeNumberArrays(before, [ [ "十", "じゅう" ] ], after);
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
    window.Japanese.conjugateKanaForCounter = function (amount, kana) {    // ie Japanese.conjugateKanaForCounter(1, "ほん") => ["いっぽん"]). This returns an array of all possibilities
        // Determine the sound change for the counter
        var counterDefaultRomaji = Japanese.convertKanaToRoomaji(kana),
            lastAmountDigit = amount % 10,
            prefixNumber,
            prefixAmount;

        function appendToNumberArray(kanjiKanaArray, suffix) {
            var results = [],
                kkaIndex,
                sIndex;
            for (kkaIndex = 0; kkaIndex < kanjiKanaArray.length; ++kkaIndex) {
                for (sIndex = 0; sIndex < suffix.length; ++sIndex) {
                    results.push(kanjiKanaArray[kkaIndex][1] + suffix[sIndex]);
                }
            }
            return results;
        }

        if (amount % 10000 === 0) {
            prefixAmount = Japanese.getNumber(Math.floor(amount / 10000), false);
            switch (counterDefaultRomaji[0]) {
                case "h": {
                    return appendToNumberArray( prefixAmount, [ "まん" + Japanese.changeFirstKanaSound(kana[0], "b") + kana.substr(1) ] );
                }
                case "f": {
                    return appendToNumberArray( prefixAmount, [ "ばん" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "まん" + kana ] );
                }
            }
        } else if (amount % 1000 === 0) {
            prefixAmount = Japanese.getNumber(Math.floor(amount / 1000), false);
            switch (counterDefaultRomaji[0]) {
                case "h": {
                    return appendToNumberArray( prefixAmount, [ "せん" + Japanese.changeFirstKanaSound(kana[0], "b") + kana.substr(1) ] );
                }
                case "f": {
                    return appendToNumberArray( prefixAmount, [ "せん" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "せん" + kana ] );
                }
            }
        } else if (amount % 100 === 0) {
            prefixAmount = Japanese.getNumber(Math.floor(amount / 100), false);
            switch (counterDefaultRomaji[0]) {
                case "k": {
                    return appendToNumberArray( prefixAmount, [ "ひゃっ" + kana ] );
                }
                case "h":
                case "f":
                case "p": {
                    return appendToNumberArray( prefixAmount, [ "ひゃっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "ひゃく" + kana ] );
                }
            }
        } else if (amount % 10 === 0) {
            // we need to transform 1020 into 1002
            var numberTens = Math.floor(amount % 100);
            prefixNumber = amount - (amount % 100); // Get rid of everything less than 1000 (1020 -> 1000)
            prefixNumber += Math.floor(numberTens / 10); // Add a trailing 2 that we get from the 20 part of 1020
            prefixAmount = Japanese.getNumber(prefixNumber, false);
            return appendToNumberArray( prefixAmount, [ "じゅう" + kana ] );
        }

        if (lastAmountDigit == 1) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 1), false);
            switch (counterDefaultRomaji[0]) {
                case "k":
                case "s":
                case "t":
                case "c": {
                    return appendToNumberArray( prefixAmount, [ "いっ" + kana ] );
                }
                case "h":
                case "f":
                case "b":
                case "p": {
                    return appendToNumberArray( prefixAmount, [ "いっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "いち" + kana ] );
                }
            }
        } else if (lastAmountDigit == 2) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 2), false);
            return appendToNumberArray( prefixAmount, [ "に" + kana ] );
        } else if (lastAmountDigit == 3) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 3), false);
            switch (counterDefaultRomaji[0]) {
                case "h":
                case "w": {
                    return appendToNumberArray( prefixAmount, [ "さん" + Japanese.changeFirstKanaSound(kana[0], "b") + kana.substr(1) ] );
                }
                case "f": {
                    return appendToNumberArray( prefixAmount, [ "さん" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "さん" + kana ] );
                }
            }
        } else if (lastAmountDigit == 4) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 4), false);
            switch (counterDefaultRomaji[0]) {
                case "h":
                case "f": {
                    return appendToNumberArray( prefixAmount, [ "よん" + Japanese.changeFirstKanaSound(kana[0], "h") + kana.substr(1) ] );
                }
                case "w": {
                    return [ "????" ];
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "よん" + kana ] );
                }
            }
        } else if (lastAmountDigit == 5) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 5), false);
            return appendToNumberArray( prefixAmount, [ "ご" + kana ] );
        } else if (lastAmountDigit == 6) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 6), false);
            switch (counterDefaultRomaji[0]) {
                case "k": {
                    return appendToNumberArray( prefixAmount,  [ "ろっ" + kana ] );
                }
                case "h":
                case "f":
                case "p": {
                    return appendToNumberArray( prefixAmount, [ "ろっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "ろく" + kana ] );
                }
            }
        } else if (lastAmountDigit == 7) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 7), false);
            return appendToNumberArray( prefixAmount, [ "なな" + kana, "しち" + kana ] );
        } else if (lastAmountDigit == 8) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 8), false);
            switch (counterDefaultRomaji[0]) {
                case "k":
                case "s": {
                    return appendToNumberArray( prefixAmount, [ "はっ" + Japanese.changeFirstKanaSound(kana[0], "k") + kana.substr(1) ] );
                }
                case "t":
                case "c": {
                    return appendToNumberArray( prefixAmount, [ "はっ" + Japanese.changeFirstKanaSound(kana[0], "t") + kana.substr(1) ] );
                }
                case "h":
                case "f":
                case "b":
                case "p": {
                    return appendToNumberArray( prefixAmount, [ "はっ" + Japanese.changeFirstKanaSound(kana[0], "p") + kana.substr(1) ] );
                }
                default: {
                    return appendToNumberArray( prefixAmount, [ "はち" + kana ] );
                }
            }
        } else if (lastAmountDigit == 9) {
            prefixAmount = Japanese.getNumber(Math.floor(amount - 9), false);
            return appendToNumberArray( prefixAmount, [ "きゅう" + kana ] );
        }
    }

    // -------------------------------------------- COUNTERS
    window.Counters = {};
    window.Counters.load = function (set, callback) {
        if (LOADED_COUNTER_SETS[set]) {
            if (typeof callback === "function") {
                callback(false); // wasn't loaded
            }
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
                            min = 1;
                        }
                        if (max == NaN) {
                            max = DEFAULT_MAX;
                        }
                    }

                    ITEMS.push({
                        "setName": data["setName"],
                        "set": set,
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
                        "set": set,
                        "setName": data["setName"],
                        "kanji": key,
                        "kana": value["kana"],
                        "rule": value["rule"],
                        "irregulars": (value["irregulars"] ? value["irregulars"] : {})
                    };
                }
            });

            LOADED_COUNTER_SETS[set] = data["setName"];
            if (typeof callback === "function") {
                callback(true); // wasloaded
            }
        });
    };
    window.Counters.loadAll = function (listOfSetNames, callback) {
        var setsLoaded = 0;

        function setLoadedCallback() {
            ++setsLoaded;
            if (setsLoaded === listOfSetNames.length && typeof callback === "function") {
                callback();
            }
        }

        $.each(listOfSetNames, function (index, setName) {
            Counters.load(setName, setLoadedCallback);
        });
    };
    window.Counters.getAllItems = function () {
        return ITEMS;
    };
    window.Counters.getAllCounters = function () {
        return COUNTERS;
    };
    window.Counters.getAllSets = function () {
        return LOADED_COUNTER_SETS;
    };
    window.Counters.getNumberSetCounters = function (set) {
        return Counters.getSet(set).length;
    };
    window.Counters.getSet = function (set) {
        var counters = [],
            index;
        $.each(COUNTERS, function (counterKanji, counter) {
            if (counter.set === set) {
                counters.push(counter);
            }
        });
        return counters;
    };

    // -------------------------------------------- QUIZMASTER
    function createQuestion (item, amount) {
        var allAnswers = [],
            localAnswers,
            number;

        $.each(item["counters"], function (index, counterKanji) {
            if (COUNTERS[counterKanji] && ENABLED_COUNTER_SETS.indexOf(COUNTERS[counterKanji]["set"]) >= 0) {
                number = Japanese.getNumber(amount, false);
                if (COUNTERS[counterKanji]["irregulars"][amount.toString()]) {
                    allAnswers.push({
                        "counterKanji": counterKanji,
                        "counterKana": COUNTERS[counterKanji]["kana"],
                        "counterRule": COUNTERS[counterKanji]["rule"],
                        "setName": item["setName"],
                        "isIrregular": true,
                        "kana": COUNTERS[counterKanji]["irregulars"][amount.toString()],
                        "kanji": number[0] + counterKanji
                    });
                } else {
                    localAnswers = Japanese.conjugateKanaForCounter(amount, COUNTERS[counterKanji]["kana"]);
                    $.each(localAnswers, function (index, kanaAnswer) {
                        allAnswers.push({
                            "counterKanji": counterKanji,
                            "counterKana": COUNTERS[counterKanji]["kana"],
                            "counterRule": COUNTERS[counterKanji]["rule"],
                            "setName": item["setName"],
                            "isIrregular": false,
                            "kana": kanaAnswer,
                            "kanji": number[0][0] + counterKanji
                        });
                    });
                }
            }
        });

        if (allAnswers.length === 0) {
            return undefined;
        }

        return {
            "amount": amount,
            "conjugatedEnglish": (amount == 1 ? item["singular"] : item["plural"]),
            "answers": allAnswers,
            "encouragement": ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
        };
    }
    function getRandomItem() {
        if (!QuizMaster.hasEnabledSets()) {
            return undefined;
        }
        return ITEMS[Math.floor(Math.random() * ITEMS.length)];
    }
    function getRandomAmountForItem(item) {
        if (ENABLED_COUNTER_SETS.indexOf(item["set"]) < 0) {
            return undefined;
        }
        return item["min"] + Math.floor(Math.random() * (item["max"] - item["min"]));
    }

    window.QuizMaster = {};
    window.QuizMaster.toggleSet = function (set, callback) {
        Counters.load(set, function (wasAlreadyLoaded) {
            if (LOADED_COUNTER_SETS[set]) {
                var indexOfEnabled = ENABLED_COUNTER_SETS.indexOf(set);
                if (indexOfEnabled < 0) {
                    ENABLED_COUNTER_SETS.push(set);
                } else {
                    ENABLED_COUNTER_SETS.splice(indexOfEnabled, 1);
                }
            }

            if (typeof callback === "function") {
                callback();
            }
        });
    }
    window.QuizMaster.hasEnabledSets = function () {
        return (ENABLED_COUNTER_SETS.length !== 0);
    }

    window.QuizMaster.getRandomQuestionForAmount = function (amount) {
        var randomItem;

        if (!QuizMaster.hasEnabledSets()) {
            return undefined;
        }

        if (amount > DEFAULT_MAX) {
            console.error("You cannot ask for an amount greater than " + amount.toString() + "! Returning totally random question.");
            return QuizMaster.getRandomQuestion();
        }

        do {
            randomItem = getRandomItem();
        } while (randomItem && randomItem.max < amount);

        return createQuestion(randomItem, amount);
    }

    window.QuizMaster.getRandomQuestion = function () {
        if (!QuizMaster.hasEnabledSets()) {
            return undefined;
        }

        var randomItem = getRandomItem(),
            randomAmount = getRandomAmountForItem(randomItem);
        return createQuestion(randomItem, randomAmount);
    };
})();
