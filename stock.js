var        sys = require('sys'),
        twitter = require('twitter');
var jf = require('jsonfile')
  , util = require('util');

var        count = 0,
        lastc = 0;

function tweet(data) {
        count++;
        if ( typeof data === 'string' )
                sys.puts(data);
        else if ( data.text && data.user && data.user.screen_name )
                sys.puts('"' + data.text + '" -- ' + data.user.screen_name);
        else if ( data.message )
                sys.puts('ERROR: ' + sys.inspect(data));
        else
                sys.puts(sys.inspect(data));
}

function memrep() {
        var rep = process.memoryUsage();
        rep.tweets = count - lastc;
        lastc = count;
        console.log(JSON.stringify(rep));
        // next report in 60 seconds
        setTimeout(memrep, 60000);
}



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

var catchWord = "android";
var negWords = jf.readFileSync('./negativewords.json');
var posWords = jf.readFileSync('./positivewords.json');
//console.log(posWords[10],negWords[10]);

function trackCreator(catchword, emotionArray){

	var retArr = [];
	for(a in emotionArray){
		retArr.push(catchword+" "+emotionArray[a]);
	}

	return retArr;
}

var posArray = trackCreator(catchWord, posWords);

//console.log(posArray[5]);
// The default access level allows up to 400 track keywords            
twit.stream(
    'statuses/filter',
    {track: posArray, language: 'en'},
    function (stream) {
        stream.on('data', function (data) {
            //console.log(data);
            //console.log(data.text);
            posWord(data.text);
        });
    }
);