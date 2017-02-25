# What literature has the best Scrabble words?

I started making an interpreter for [Beatnik](https://esolangs.org/wiki/Beatnik) but got sidetracked doing this.

# Scrabble score distribution

![graph](images/multi.png)

I plotted the percentage of words with each scrabble score for the following public domain documents:
* Works of Shakespeare
* King James Bible
* Dickens - A Christmas Carol
* Darwin - Origin of Species
* Grimms' fairy tales

It seems for a sufficiently large/varied text, it will follow quite a similar pattern.

This pattern appears to be tied to frequency of identical words as much as the distribution of scores throughout the English language.
To prove this, below I plot _only_ unique words against words from a dictionary wordlist. The shape is much simpler.

![graph](images/unique_words_dictionary.png)

Additionally, the most common word score is 11 or 12 for unique words only, whereas it is about half that (6) when identical words can be counted multiple times.

# Best Scrabble words

A point before we continue: this is just an exercise in finding interesting words.

* I allow proper nouns
* I allow words which do not appear in a modern dictionary
* I allow words which use more of a certain tile than would be possible using the number supplied in a standard Scrabble set

## King James Bible

|Word|Score|
|---|---|
|Mahershalalhashbaz|43|
|Kirjathhuzoth|42|
|Perezuzzah|42|
|Nebuchadnezzar|40|
|Nebuchadrezzar|40|
|Perezuzza|38|
|Sheshbazzar|37|
|Kirjathjearim|36|
|Hazezontamar|35|
|Belteshazzar|35|
|Bethlehemjudah|35|
|Jehizkiah|35|
|Uzzensherah|35|
|Kibrothhattaavah|34|
|Chushanrishathaim|33|
|Belshazzar|33|
|Selahammahlekoth|33|
|Jehozadak|33|
|Ahuzzath|32|
|Melchizedek|32|

Well these are all a bit wacky so I filtered out the names to see what's left:

|Word|Score|
|---|---|
|fellowcitizens|31|
|handkerchiefs|29|
|gazingstock|28|
|quickeneth|28|
|unquenchable|28|
|acknowledgement|28|
|stumblingblocks|28|
|earthquakes|27|
|stumblingblock|27|
|accomplishment|27|
|acknowledgeth|27|
|earthquake|26|
|fellowworkers|26|
|muzzle|26|
|quickening|26|
|reproachfully|26|
|exceedingly|25|
|whithersoever|25|
|foreknowledge|25|
|threshingplace|25|

## Works of Shakespeare

|Word|Score|
|---|---|
|whizzing|33|
|sympathized|31|
|bedazzled|31|
|halfpennyworth|31|
|exchequers|31|
|exchequer|30|
|unmuzzled|30|
|quicksilverr|30|
|hizzing|29|
|buzzards|29|
|sympathize|29|
|vanquisheth|29|
|handkerchief|28|
|extravagancy|28|
|unmuzzle|28|
|buzzing|28|
|grizzled|28|
|squeezing|28|
|drizzled|28|
|buzzard|28|

## Darwin - Origin of Species

|Word|Score|
|---|---|
|Zanthoxylon|33|
|Hydrophyllaceae|32|
|unequivocally|30|
|exemplifying|30|
|characterized|30|
|exquisitely|30|
|characteristically|30|
|acclimatization|30|
|philosophically|30|
|hypothetically|30|
|Ornithorhynchus|29|
|hybridized|29|
|approximately|29|
|experimentally|28|
|hybridizer|28|
|experimentalists|27|
|gizzard|27|
|Phytophagic|27|
|Esquimaux|27|
|exceptionally|27|

# Acknowledgements
* [bostic](https://svnweb.freebsd.org/csrg/share/dict/)
* [Paolo Bergantino](http://stackoverflow.com/a/772929)
* [Project Gutenberg](http://www.gutenberg.org/)
* [Wikipedia](https://en.wikipedia.org/wiki/Scrabble_letter_distributions#English)







