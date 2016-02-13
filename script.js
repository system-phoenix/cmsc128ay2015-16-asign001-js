'use strict';
var input = '110';

function numToWords(input){
	var string = '';
	if(parseInt(input)){
		input = parseInt(input);
		if(input > 1000000){
			return 'Cannot parse.';
		} else {
			var string = '';
			var i = 1;
			for(; ((i <= 1000000) && (i * 10 <= input)); i *= 10);
			var reserve, num;
			for(; i >= 1; i /= 10){
				reserve = parseInt(input * 10 / i);
				num = parseInt(input / i);
				input %= i;

				console.log(num);
				if((i == 10 || i == 10000) && (num == 1)){
					string += transNum(reserve);
					i /= 10;
					input %= i;
				} else {
					if(i == 10 || i == 10000){
						num *= 10;
						string += transNum(num) + '-';
						continue;
					} else {
						string += transNum(num);
					}
				}
				string += transIndex(i);
				if(input == 0) break;
			}
			return string;

		}
	} else return 'Not a number.';
}

function transIndex(i){
	switch(i){
		case 1000000:
			return ' million ';
		case 100000:
		case 100:
			return ' hundred ';
		case 10000:
		case 1000:
			return ' thousand ';
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