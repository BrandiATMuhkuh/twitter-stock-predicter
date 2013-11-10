var        sys = require('sys'),
        twitter = require('twitter');
var jf = require('jsonfile')
  , util = require('util');
var argv = require('optimist').argv;

var        count = 0,
        lastc = 0;

var twit = new twitter({
consumer_key: '1gUoBjwdye8w12h1hhA',
consumer_secret: 'oJRs4Qo5chuORSq5Y7MjjJ1EgQ0QJOlAY7aIuiCa4',
access_token_key: '17000971-cUmQMwfoeNOtKY9k3fOTT4yRCF1nk4ipticz03Iu9',
access_token_secret: 'SiCCEXLc2bsHg4CWyNrdDpXYt2gNuz2cxpCpzV1kBs'
});


function posWord(data){
	var posWords = ['love', 'great', 'enjoy'];
	//console.log(data);

	for(var i = 0; i<posWords.length; i++){
		//console.log(posWords[i]);

		if(data.indexOf(posWords[i]) != -1){
			console.log(data, "found pos");
			//return;
		}
	}
	//for(a in posWord){
/*
		console.log(posWord[a]);
		if(item.text.indexOf(posWord[a]) != -1){
			console.log("found pos");
			return;
		}
		*/
	//}

}

var stockCompany = "google";
var catchWord = "android";
if (argv.s) {
    stockCompany = argv.s;
}else{
    console.log("missing parameter -s eg. node stock.js -s google");
    return null;
}

if (argv.c) {
    catchWord = argv.c;
}else{
    console.log("missing parameter -c eg. node stock.js -c android");
    return null;
}

var words = null;
var posNeg = null;

if (argv.e) {
    posNeg = argv.e;
    if(argv.e === "pos"){
        var words = jf.readFileSync('./positivewords.json');
    }else if(argv.e === "neg"){
        var words = jf.readFileSync('./negativewords.json');
    }

}else{
    console.log("missing parameter -e eg. node stock.js -e pos");
    return null;
}




function trackCreator(catchword, emotionArray){

	var retArr = [];
	for(a in emotionArray){
		retArr.push(catchword+" "+emotionArray[a]);
	}

	return retArr;
}

var posArray = trackCreator(catchWord, words);

//console.log(posArray[5]);
// The default access level allows up to 400 track keywords            
twit.stream(
    'statuses/filter',
    {track: posArray, language: 'en'},
    function (stream) {
        stream.on('data', function (data) {
            //console.log(data);
            //console.log(data.text);
            //posWord(data.text);
            console.log(posNeg, stockCompany, catchWord, data.text);
        });
    }
);