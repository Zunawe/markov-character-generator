function CharacterChain(depth){
	this.depth = depth ? depth : 1;
	this.probabilities = {};

	this.feed = function (input){
		input = input.toString();
		for(var i = depth; i < input.length; ++i){
			var o = this.traverse(input.substr(i - depth, depth));
			if(!o[input[i]]){
				o[input[i]] = {c: 0, p: 0};
			}
			++o[input[i]].c;
		}
		this.calculateProbabilities();
	}

	this.traverse = function (str){
		var o = this.probabilities;
		for(var i = str.length - this.depth; i < str.length; ++i){
			if(!o[str[i]]){
				o[str[i]] = {};
			}
			o = o[str[i]];
		}
		return o;
	}

	this.calculateProbabilities = function (){
		function loop(o){
			var bottomFlag = false;
			for(var e in o){
				if(typeof o[e].c == 'number'){
					bottomFlag = true;
				}
				break;
			}

			if(bottomFlag){
				var sum = 0;
				var keys = Object.keys(o);
				for(var char in o){
					sum += o[char].c;
				}

				for(var char in o){
					o[char].p = o[char].c / sum;
				}
			}
			else{
				for(var next in o){
					loop(o[next]);
				}
			}
		}

		loop(this.probabilities);
	}

	this.nextChar = function (str){
		pv = this.traverse(str);
		var x = Math.random();
		var sum = 0;
		for(var char in pv){
			if(x < sum + pv[char].p){
				return char;
			}

			sum += pv[char].p;
		}
	}
}

function generateChain(str, depth){
	var chain = new CharacterChain(depth);
	chain.feed(str);
	return chain;
}

function generateString(chain, length, initial){
	var str = initial ? initial : randomInitial(chain);
	for(var i = 0; i < length; ++i){
		str += chain.nextChar(str);
	}
	return str;
}

function randomInitial(chain){
	var str = '';
	var o = chain.probabilities;
	for(var i = 0; i < chain.depth; ++i){
		var choices = Object.keys(o);
		var index = Math.floor(Math.random() * choices.length);
		str += choices[index];
		o = o[choices[index]];
	}

	return str;
}
