
const map = document.getElementById("map");
const names = document.getElementById("names");
const translations = document.getElementById("translations");

const langs = ["FR","ES","SE","DE","FI","NO","PL",
    "IT","GB","RO","BY","EL","BG","IS","PT","HU",
    "CS","IE","LT","LV","HR","BA","SK","EE","NL","CH",
    "MD","BE","AL","MK","SI","ME","CY","FO","AD","MT",
    "LI","GG","SM","GI","MC", "TR", "RU"];
    // "AT","CZ","DK","UA","LU","VA" - not working

let lang_ele = [];

langs.forEach((element, index) => {
    lang_ele[index] = document.getElementById(langs[index]);
});

// map.onclick = () => {
//     names.style.display = names.style.display === "none" ? "block" : "none";
//     translations.style.display = translations.style.display === "block" ? "none" : "block";
// }

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



