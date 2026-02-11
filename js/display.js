// display.js
const E_FontSelector = document.getElementById("FontSelector");
const E_Checker = document.getElementById("Checker");
const E_SizeButtons = document.getElementById("SizeButtons");

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
    var selectedFontKey = E_FontSelector.value;
    E_Checker.style.fontFamily = selectedFontKey;
    var selectedLanguage = FONTS[selectedFontKey].classification.code;
    E_Checker.placeholder = LANGUAGE_CLASSIFICATION[selectedLanguage].placeholder;
}

E_FontSelector.addEventListener("change", function() {
    updateCheckerFont();
});

function createSizeButton(size) {
    const button = document.createElement("button");
    button.textContent = size + "px";
    button.addEventListener("click", function() {
        E_Checker.style.fontSize = size + "px";
    });
    return button;
}
E_SizeButtons.innerHTML = "";
const fontSizes = [16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512];
fontSizes.forEach(size => {
    const button = createSizeButton(size);
    E_SizeButtons.appendChild(button);
});