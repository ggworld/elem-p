let myArr = [];
let lastCommand="";
let buffer = [];
let printArray = function(arr) {
    if ( typeof(arr) == "object") {
        for (var i = 0; i < arr.length; i++) {
            printArray(arr[i]);
        }
    }
    else {
        if (arr !=='spc') myArr.push(arr);
//      console.log(myArr);
    }
};

let flaten = function(arr){
        //console.log(arr);
	let t_arr=[];
	if (Array.isArray(arr)){
        arr.forEach(function (arr_child) {
        //console.log(arr_child);
	if (Array.isArray(arr_child)){
        let arr_child1=[];
	arr_child1=arr_child.flat(Infinity);
        let loc_s = arr_child1.indexOf('spc');
        console.log(loc_s);
        if (loc_s>=0) {
                arr_child1.splice(loc_s,1);
                }
	console.log(arr_child.length); 
         t_arr.push(arr_child1.join(' ').replace('spc ',''));}

        });}
	console.log(t_arr);
        return t_arr;

};
const express = require('express');
const app = express();
const port = 53000;
const bodyParser = require('body-parser');
const cors = require('cors');


// Where we will keep books

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('<h1>Welcome to Elementor Command Parser</h1>');
});
app.post('/command', (req, res) => {
    var myd = req.body;
    //console.log(req.body);
const  nearley = require("nearley");
const grammar = require("./simp_c.js");
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
     
	let t_r;
	try{
     //console.log(myd.text.trim());
     parser.feed(myd.text.trim());
     t_r = parser.results.flat(2);
     }
	catch (error){
        t_r = [["need expert on this... go to Elemetor Assitent"]]
	}
    // Output the book to the console for debugging
    myArr=[] ;
    //console.log(myd.text);
    //console.log(parser.results);
    //console.log(parser.results.flat(2));	
    console.log(t_r);
    let mati_result = flaten(t_r);
    console.log(mati_result);
    printArray(parser.results);
    //console.log(myd);
    //books.push(book);

   // console.log(myArr);
    //res.send({"text":myArr.join(' ')} );
   //res.send({"text":parser.resulten(parser.results.flat(2))});
   if (mati_result[0]==="again"){
	   mati_result=lastCommand;
   }
   else {
	   lastCommand=mati_result;
   }
   if (myd.hasOwnProperty('action')){
	if (myd.action==='write'){
   	console.log('adding to buffer');
	buffer.push(mati_result);
	}
	else{
	 mati_result=buffer.shift();
	}
   }

   res.send({"text":mati_result});
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

