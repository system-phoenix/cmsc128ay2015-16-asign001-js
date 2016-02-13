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
				return transNum(input);	//a very special case where only the value 0 is entered
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
					if(!num == 0){							//if the next number to converted is not 0
						next = true;						//enable the checker for its place value
						if((i == 10 || i == 10000) && (num == 1)){		//also, find the appropriate equivalent string for the number
							string += ' ' + transNum(reserve);
							i /= 10;			//special case of 10 to 19
							input %= i;
						} else {
							if(i == 10 || i == 10000){
								num *= 10;
								string += ' ' + transNum(num);		//special case of 20, 30, ..., 90
								continue;
							} else {
								string += ' ' + transNum(num);		//normal cases
							}
						}
					}
					if(str == ' thousand' && num == 0){
						next = false; //if the past place holder is of thousand, disable the next boolean to prevent adding unnecessary 'hundred'
					}
					if(next){
						str = transIndex(i);		//check for the place holder
						string += str;				//add it to the string
						if(num == 0) next = false;	//for cases of hundred thousand
					}
				}
				return string;
			}
		}
	} else return 'Not a number.';
}

function transIndex(i){ //gives the placed holder of the values
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

function transNum(num){	//gives the word conversion of values, all cases
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
	input = wordsToNum(input); //convert the input to number first
	if(parseInt(input)){		//if it is an actual number
		if(currency == 'USD' || currency == 'PHP' || currency == 'JPY') return currency + input;	//add the stated currency
		else return 'Unknown currency.';	//if the currency is not in the option
	} else return 'Not a number.';
}

function wordsToNum(input){
	var str = input.split(' ');				//split the input through the spaces
	var res = 0, sub = false, subRes = 0;	//res is returned, sub is a checker for thousand values, and subRes is for after the thousand value
	for(var i = 0; i < str.length; i++){	//traverse throught the array
		if(str[i] == '') continue;			//if it is a blank character, skip it
		var n = toNum(str[i]);				//convert the word to a number
		if(n != -1){						//if the word is a number in the list
			if(!sub) res += n;				//add it to the result
			else subRes += n;
		} else{								//if the word is not a number in the list
			n = multiplier(str[i]);			//maybe it is a multiplier to find the correct place value of the number
			if(!n) return 'Cannot parse';	//if still not, return an error
			if(!sub)res *= n;				//multiply the result with it
			else subRes *= n;
			if(n == 1000) sub = true;		//if the thousand multiplier is found, activate the subRes
		}
	}
	res += subRes;				//add the final values
	return res;
}

function toNum(num){		//gives the actual value of the word numbers, returns -1 if the word is not found
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

function multiplier(index){			//gives the possible multipliers, returns undefined if not on the list
	switch(index){
		case 'million': return 1000000;
		case 'thousand': return 1000;
		case 'hundred': return 100;
		default: return;
	}
}

function numberDelimited(input, delimiter, spaces){
	if(delimiter.length == 1){			//check for the character
		if(input <= 1000000){			//check if the value is within the range
			input = input.toString();		//turn the input into a string for faster parsing
			var res = '';					//to be returned
			var counter = 0;				//counts the indeces to decide when to place the delimiter
			for(var i = input.length - 1; i >= 0; i--, counter++){
				if(counter % spaces == 0 && counter != 0) res = delimiter + res;		//reform the input to inlude the delimiters
				res = input.charAt(i) + res;
			}
			return res;						//return the new version of the input, with delimiters
		} else return 'Cannot parse.';
	} else{
		return 'Invalid delimiter.';	//if it is not a character, return an error
	}
}