"use strict";

let _fs = require("fs");

let _source = "sources/ttm.txt";

let _points = {
	"_E": 1, "_A": 1, "_I": 1, "_O": 1, "_N": 1, "_R": 1, "_T": 1, "_L": 1, "_S": 1, "_U": 1,
	"_D": 2, "_G": 2,
	"_B": 3, "_C": 3, "_M": 3, "_P": 3,
	"_F": 4, "_H": 4, "_V": 4, "_W": 4, "_Y": 4,
	"_K": 5,
	"_J": 8, "_X": 8,
	"_Q": 10, "_Z": 10
};

/*
	String.Contains (
		STRING text
	): BOOLEAN
*/
String.prototype.Contains = function(text)
{
	return (this.indexOf(text) != -1);
}

/*
	Defined (
		STRING type
	): BOOLEAN
*/
function Defined(type)
{
	return (type != "undefined");
}

/*
	Undefined (
		STRING type
	): BOOLEAN
*/
function Undefined(type)
{
	return !Defined(type);
}

/*
	ReadFile (
		STRING path
	): STRING
*/
function ReadFile(path)
{
	return _fs.readFileSync(path, "utf8").toString();
}

/*
	WriteFile (
		STRING path,
		STRING contents
	): VOID
*/
function WriteFile(path, contents)
{
	_fs.writeFileSync(path, contents, "utf8");
}

/*
	SanitiseSpacing (
		STRING text
	): STRING
*/
function SanitiseSpacing(text)
{
	let sanitised = "";
	let space = true;
	
	for(let i = 0, l = text.length; i < l; i++)
	{
		let c = text.charAt(i);
		
		if("-. \t\r\n".Contains(c))
		{
			if(!space)
			{
				sanitised +=" ";
				space = true;
			}
		}
		else
		{
			sanitised += c;
			
			space = false;
		}
	}
	
	return sanitised.trim();
}

/*
	Score (
		STRING word
	): INTEGER
*/
function Score(word)
{
	word = word.toUpperCase();
	
	let score = 0;
	
	for(let i = 0, l = word.length; i < l; i++)
	{
		score += _points["_"+ word.charAt(i)];
	}
	
	return score;
}

/*
	Words (
		STRING text
	): ARRAY [INTEGER] = OBJECT {
		STRING word,
		INTEGER score
	}
*/
function Words(text)
{
	let words = SanitiseSpacing(text).split(" ").filter(function(word)
		{
			return !/[^a-zA-Z]/.test(word);
		}
	);
	
	for(let i = 0, n = words.length; i < n; i++)
	{
		words[i] = {
			word: words[i],
			score: Score(words[i])
		};
	}
	
	words.sort(function(a, b)
		{
			return b.score - a.score;
		}
	);
	
	return words;
}

/*
	Unique (
		ARRAY words [INTEGER] = OBJECT {
			STRING word,
			INTEGER score
		}
	): ARRAY [INTEGER] = OBJECT {
		STRING word,
		INTEGER score
	}
*/
function Unique(words)
{
	let unique = [];
	let lookup = [];
	
	for(let i = 0, n = words.length; i < n; i++)
	{
		let wordLookup = "_"+ words[i].word.toUpperCase();
		
		if(Undefined(typeof(lookup[wordLookup])))
		{
			lookup[wordLookup] = true;
			
			unique.push(words[i]);
		}
	}
	
	return unique;
}

/*
	Distribution (
		ARRAY words [INTEGER] = OBJECT {
			STRING word,
			INTEGER score
		}
	): ARRAY [INTEGER] = OBJECT {
		INTEGER score,
		INTEGER count
	}
*/
function Distribution(words)
{
	let distribution = [];
	let distributionLookup = [];
	let highest = 0;
	
	for(let i = 0, n = words.length; i < n; i++)
	{
		if(Defined(typeof(distributionLookup["_"+ words[i].score])))
		{
			distribution[distributionLookup["_"+ words[i].score]].count++;
		}
		else
		{
			distributionLookup["_"+ words[i].score] = distribution.length;
			
			distribution.push(
				{
					score: words[i].score,
					count: 1
				}
			);
			
			if(words[i].score > highest)
			{
				highest = words[i].score;
			}
		}
	}
	
	for(let i = 1; i < highest; i++)
	{
		if(Undefined(typeof(distributionLookup["_"+ i])))
		{
			distribution.push(
				{
					score: i,
					count: 0
				}
			);
		}
	}
	
	distribution.sort(function(a, b)
		{
			return a.score - b.score;
		}
	);
	
	return distribution;
}

/*
	PercentageDistribution (
		ARRAY distribution [INTEGER] = OBJECT {
			INTEGER score,
			INTEGER count
		}
	): ARRAY [INTEGER] = OBJECT {
		INTEGER score,
		NUMBER percentage
	}
*/
function PercentageDistribution(distribution)
{
	let percentageDist = [];
	
	let total = 0;
	
	for(let i = 0, n = distribution.length; i < n; i++)
	{
		total += distribution[i].count;
	}
	
	for(let i = 0, n = distribution.length; i < n; i++)
	{
		percentageDist.push(
			{
				score: distribution[i].score,
				percentage: (distribution[i].count / total) * 100
			}
		);
	}
	
	return percentageDist;
}

let words = Words(ReadFile(_source));
let uniqueWords = Unique(words);

// === ORDERED LIST BY BEST ===

let file = "";

for(let i = 0, n = uniqueWords.length; i < n; i++)
{
	file += uniqueWords[i].word +"\t"+ uniqueWords[i].score +"\r\n";
}

let sourceName = "output/"+ (_source.Contains("/") ? _source.split("/").pop() : _source);

WriteFile(sourceName +"_result.txt", file);

// === UNIQUE WORDS PER SCORE DISTRIBUTION ===

file = "";

let udist = Distribution(uniqueWords);

for(let i = 0, n = udist.length; i < n; i++)
{
	file += udist[i].score +"\t"+ ((udist[i].count == 0) ? "" : udist[i].count) +"\r\n";
}

WriteFile(sourceName + "_unique_distribution.txt", file);

// === NON-UNIQUE WORDS PER SCORE DISTRIBUTION ===

file = "";

let dist = Distribution(words);

for(let i = 0, n = dist.length; i < n; i++)
{
	file += dist[i].score +"\t"+ ((dist[i].count == 0) ? "" : dist[i].count) +"\r\n";
}

WriteFile(sourceName +"_non_unique_distribution.txt", file);

// === NON-UNIQUE WORDS PER SCORE PERCENTAGES DISTRIBUTION ===

file = "";

let percentageDist = PercentageDistribution(Distribution(words));

for(let i = 0, n = percentageDist.length; i < n; i++)
{
	file += percentageDist[i].score +"\t"+ ((percentageDist[i].percentage == 0) ? "" : percentageDist[i].percentage) +"\r\n";
}

WriteFile(sourceName +"_non_unique_percentages_distribution.txt", file);

console.log("Done.");
