// A quick hacky script to generate a markdown table from a pre-generated result

"use strict";

let source = "oos.txt";

let table = "|Word|Score|\r\n|---|---|";

let file = require("fs").readFileSync("output/"+ source +"_result.txt", "utf8").toString().split("\r\n");

for(let i = 0; i < file.length && i < 20; i++)
{
	let data = file[i].split("\t");
	
	table +="\r\n|"+ data[0] +"|"+ data[1] +"|";
}

console.log(table);