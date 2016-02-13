'use strict';
var input = '110';
var string = 'one hundred ten';

function numToWords(input){
	var string = ''; //final string to be returned.
	if(parseInt(input) || input == '0' || input == 0){	//check if the input is an integer
		input = parseInt(input);
		if(input > 1000000){		//case that the input is too big
			return 'Cannot parse.';
		} else {
			if(input == 0){
				return transNum(input);
			} else {
				var i = 1;		//initialize i
				for(; ((i <= 1000000) && (i * 10 <= input)); i *= 10);		//compute for the maximum value of i
				var next = true;	//comfirms the need to include another place value, eg. thousand, hundred, etc
				var reserve, num;
				var str = '';	//holds the place value
				for(; i >= 1; i /= 10){		//start the loop that actually converts the numbers to words
					reserve = parseInt(input *	 10 / i);	//holds the values of special cases. eg. 11, 12, etc
					num = parseInt(input / i);				//holds what to be converted in normal cases
					input %= i;								//remove the number currently being converted
					if(!num == 0){
						next = true;
						if((i == 10 || i == 10000) && (num == 1)){
							string += ' ' + transNum(reserve);
							i /= 10;
							input %= i;
						} else {
							if(i == 10 || i == 10000){
								num *= 10;
								string += ' ' + transNum(num);
								continue;
							} else {
								string += ' ' + transNum(num);
							}
						}
					}
					if(str == ' thousand' && num == 0){
						next = false;
					}
					if(next){
						str = transIndex(i);
						string += str;
						if(num == 0) next = false;
					}
				}
				return string;
			}
		}
	} else return 'Not a number.';
}

function transIndex(i){
	switch(i){
		case 1000000:
			return ' million';
		case 100000:
		case 100:
			return ' hundred';
		case 10000:
		case 1000:
			return ' thousand';
		case 10:
		case 1:
			return '';
	}
}

function transNum(num){
	switch(num){
		case 0: return 'zero';
		case 1: return 'one';
		case 2: return 'two';
		case 3: return 'three';
		case 4: return 'four';
		case 5: return 'five';
		case 6: return 'six';
		case 7: return 'seven';
		case 8: return 'eight';
		case 9: return 'nine';
		case 10: return 'ten';
		case 11: return 'eleven';
		case 12: return 'twelve';
		case 13: return 'thirteen';
		case 14: return 'fourteen';
		case 15: return 'fifteen';
		case 16: return 'sixteen';
		case 17: return 'seventeen';
		case 18: return 'eighteen';
		case 19: return 'ninteen';
		case 20: return 'twenty';
		case 30: return 'thirty';
		case 40: return 'forty';
		case 50: return 'fifty';
		case 60: return 'sixty';
		case 70: return 'seventy';
		case 80: return 'eighty';
		case 90: return 'ninety';
	}
}

function wordsToCurrency(input, currency){
	input = wordsToNum(input);
	if(parseInt(input)){
		if(currency == 'USD' || currency == 'PHP' || currency == 'JPY') return currency + input;
		else return 'Unknown currency.';
	}
}

function wordsToNum(input){
	var str = input.split(' ');
	var res = 0, sub = false, subRes = 0;
	for(var i = 0; i < str.length; i++){
		if(str[i] == '') continue;
		var n = toNum(str[i]);
		if(n != -1){
			if(!sub) res += n;
			else subRes += n;
		} else{
			n = multiplier(str[i]);
			if(!n) return 'Cannot parse';
			if(!sub)res *= n;
			else subRes *= n;
			if(n == 1000) sub = true;
		}
	}
	res += subRes;
	return res;
}

function toNum(num){
	switch(num){
		case 'zero': return 0;
		case 'one': return 1;
		case 'two': return 2;
		case 'three': return 3;
		case 'four': return 4;
		case 'five': return 5;
		case 'six': return 6;
		case 'seven': return 7;
		case 'eight': return 8;
		case 'nine': return 9;
		case 'ten': return 10;
		case 'eleven': return 11;
		case 'twelve': return 12;
		case 'thirteen': return 13;
		case 'fourteen': return 14;
		case 'fifteen': return 15;
		case 'sixteen': return 16;
		case 'seventeen': return 17;
		case 'eighteen': return 18;
		case 'ninteen': return 19;
		case 'twenty': return 20;
		case 'thirty': return 30;
		case 'forty': return 40;
		case 'fifty': return 50;
		case 'sixty': return 60;
		case 'seventy': return 70;
		case 'eighty': return 80;
		case 'ninety': return 90;
		default: return -1;
	}
}

function multiplier(index){
	switch(index){
		case 'million': return 1000000;
		case 'thousand': return 1000;
		case 'hundred': return 100;
		default: return;
	}
}

function numberDelimited(input, delimiter, spaces){
	if(delimiter.length == 1){
		input = input.toString();
		var res = '';
		var counter = 0;
		for(var i = input.length - 1; i >= 0; i--, counter++){
			if(counter % spaces == 0 && counter != 0) res = delimiter + res;
			res = input.charAt(i) + res;
		}
		return res;
	} else{
		return 'Invalid delimiter.';
	}
}