
const map = document.getElementById("map");
const names = document.getElementById("names");
const translations = document.getElementById("translations");

// langauge codes - for countries
const langs = ["FR","ES","SE","DE","FI","NO","PL",
    "IT","RO","EL","BG","IS","PT","HU",
    "CS","IE","LT","LV","HR","BA","SK","EE","NL","CH",
    "BE","MK","SI","CY","FO","AD","MT",
    "LI","GG","SM","GI","MC",
    "TR","RU","UK","GRC","CS","DA","LB","BE","MK","SQ", "SRP", "SR"];
    // https://rapidapi.com/translated/api/mymemory-translation-memory/discussions/35126

let lang_ele = [];

langs.forEach((element, index) => {
    lang_ele[index] = document.getElementById(langs[index]);
});

map.onclick = () => {
    names.style.display = names.style.display === "none" ? "block" : "none";
    translations.style.display = translations.style.display === "block" ? "none" : "block";
}

async function get_translation(translate_string, lang, index) {
    const url = "https://translated-mymemory---translation-memory.p.rapidapi.com/get?" 
            + new URLSearchParams({
        langpair: 'en|' + lang,
        q: translate_string,
    });
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': host
        },
    };

    try {
        if (lang_ele[index]) {
            const response = await fetch(url, options);
            let result = await response.text();
            result = JSON.parse(result);
            console.log(result);
            console.log(lang_ele[index]);
            console.log(index);
            lang_ele[index].textContent = result.responseData.translatedText;
        }
    } catch (error) {
        console.error(error);
    }
}

// translates the word from the textbox when enter is pressed inside it.
const input = document.getElementById("translate");
input.onkeydown = search;
function search(event) {
    if (event.key === 'Enter') {
        langs.forEach((element, index) => {
            get_translation(input.value, element, index);
        });
    }
}



