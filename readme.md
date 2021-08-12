# Info 

More of a gist then anything else, but :man_shrugging: didn't think about it too much when I was wanting to put this code out there for anyone who might find it useful.

*This is if your self-serving your fonts*

This is just a wrapper around calling the Google Fonts API and tricking it into thinking your browser is Chrome v88. (Which is the version I was using when I wrote this) This prevents the Google Fonts API from thinking that were using a legacy browser.

This in turns gives us a bunch of hashed-named woff2 files and a CSS file referencing them with a bunch of Unicode Ranges.

Unicode ranges are the key here and gives a large reduction to how much data via font file your shipping to the user. 
https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range
https://css-tricks.com/almanac/properties/u/unicode-range/

Disclaimer, IE not supported.

# Example

Clone this repo and install the packages via npm.

Then run `npm run example`.

This will generate the fonts folder with the hashed-named woff2 files for OpenSans and the CSS file. 
Then just open up `test.html` with chrome or firefox!

# To-do
- In general clean up code to be more friendly to other use cases besides the one off case this was developed for. 
- Document parts of the code/functions to make it easier for anyone seeing this readme understand how to use code without having to dig into source