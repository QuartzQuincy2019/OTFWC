// display.js
const E_FontSelector = document.getElementById("FontSelector");
const E_Checker = document.getElementById("Checker");
const E_SizeButtons = document.getElementById("SizeButtons");
const E_LetterButtons = document.getElementById("LetterButtons");

var currentFontName = null;

function initializeFontSelector() {
    E_FontSelector.innerHTML = "";
    E_FontSelector.title = lang[LANGUAGE].FontSelector[0];
    for (const fontKey in FONTS) {
        const fontCode = FONTS[fontKey].classification.code;
        const font = FONTS[fontKey];
        const option = document.createElement("option");
        option.value = FONTS[fontKey].name;
        option.title = writeIn(
            lang[LANGUAGE].texts.fontExplanation,
            [font.name, lang[LANGUAGE].languages[fontCode][0]]
        );
        option.textContent = font.name + " (" + lang[LANGUAGE].languages[fontCode] + ")";
        E_FontSelector.appendChild(option);
    }
}
initializeFontSelector();

function updateCheckerFont() {
    currentFontName = E_FontSelector.value;
    E_Checker.style.fontFamily = currentFontName;
    var selectedLanguage = FONTS[currentFontName].classification.code;
    currentLanguageCode = LANGUAGE_CLASSIFICATION[selectedLanguage].code;
    E_Checker.placeholder = FONTS[currentFontName].sampleText;
    if (selectedLanguage === "ar") {
        E_Checker.classList.add("rtl");
    } else {
        E_Checker.classList.remove("rtl");
    }
}

E_FontSelector.addEventListener("change", function () {
    updateCheckerFont();
    toggleLetterButtons();
});

function createSizeButton(size) {
    const button = document.createElement("button");
    button.textContent = size + "px";
    button.addEventListener("click", function () {
        currentFontSize = size;
        E_Checker.style.fontSize = size + "px";
        document.documentElement.style.setProperty("--target-button--font-size", currentFontSize + "px");
    });
    return button;
}
E_SizeButtons.innerHTML = "";
const fontSizes = [16, 24, 32, 48, 64, 80, 96, 128, 192, 256, 384, 512];
var currentFontSize = null;
fontSizes.forEach(size => {
    const button = createSizeButton(size);
    E_SizeButtons.appendChild(button);
});

function createLetterButton(letter) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", function () {
        E_Checker.value += letter;
    });
    return button;
}

function toggleLetterButtons() {
    var targetSet = null;
    switch (currentLanguageCode) {
        case "ar": targetSet = ArabicLetters; break;
        case "sa": targetSet = DevanagariLetters; break;
        case "km": targetSet = KhmerLetters; break;
        case "sid": targetSet = SiddhamLetters; break;
        default: E_LetterButtons.innerHTML = "";
            break;
    }
    E_LetterButtons.innerHTML = "";
    if (FONTS[currentFontName].isColored) {
        E_Checker.classList.add("colored");
    }
    targetSet.forEach(letter => {
        const button = createLetterButton(letter);
        if (FONTS[currentFontName].isColored) {
            button.classList.add("colored");
        }
        button.style.fontFamily = currentFontName;
        E_LetterButtons.appendChild(button);
    });
}