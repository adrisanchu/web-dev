const franc = require('franc');
const langs = require('langs');

// get text from console
const input = process.argv[2];
// if user doesn't pass anything, just pass a default sentence
let textFr = 'Bonjour, je suis un beau garçon, et je veux du chocolat.';
let text = input ? input : textFr;

const langCode = franc(text);

// catch if the language was succesfully identified
if (langCode === 'und'){
    console.log('Language not identified! Try again with more words!');
} else {
    // convert langCode to language
    const language = langs.where("3", langCode);
    
    if (language) {
        // return either the input or the example sentence
        if (input) {
            console.log(`The sentence "${input}" is in ... ${language.name}!`);
        } else {
            console.log(`The sentence "${textFr}" is in ... ${language.name}!`);
        }
    } else {  // there was a problem converting the language code !
        console.log(`The sentence "${input}" has the language code: ${langCode}. No language name found!`);
    }
}