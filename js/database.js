// database.js
const FONTS_DIRECTORY_PATH = "./fonts/";
class Language {
    constructor(code, name, placeholder) {
        this.code = code;
        this.name = name;
        this.placeholder = placeholder;
    }
}
var currentLanguageCode = null;
const LANGUAGE_CLASSIFICATION = {
    ar: new Language("ar", "Arabic", "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"),
    km: new Language("km", "Khmer", "ក្រុមគ្រួសារ"),
    sa: new Language("sa", "Sanskrit", "तद्यथा। ॐ अनले अनले। विशदे विशदे। वीर वज्रधरे। बन्ध बन्धने। वज्रपाणि फट् हूं फट् स्वाहा।"),
    sid: new Language("sid", "Siddham", "𑖝𑖟𑖿𑖧𑖞𑖯𑗅  𑖌𑖼 𑖀𑖡𑖩𑖸 𑖀𑖡𑖩𑖸𑗅  𑖪𑖰𑖫𑖟𑖸 𑖪𑖰𑖫𑖟𑖸𑗅  𑖪𑖱𑖨 𑖪𑖕𑖿𑖨𑖠𑖨𑖸𑗅  𑖤𑖡𑖿𑖠 𑖤𑖡𑖿𑖠𑖡𑖸𑗅  𑖪𑖕𑖿𑖨𑖢𑖯𑖜𑖰 𑖣𑖘𑖿 𑖮𑖳𑖼 𑖣𑖘𑖿 𑖭𑖿𑖪𑖯𑖮𑖯𑗅"),
    zh: new Language("zh", "Chinese", "天地玄黄 宇宙洪荒 日月盈昃 辰宿列张"),
}
class Font {
    constructor(name, classification, fileName, isColored, sampleText = classification.placeholder) {
        this.name = name;
        this.fileName = fileName;
        this.classification = classification;
        this.path = FONTS_DIRECTORY_PATH + classification.name + "/" + fileName;
        this.isColored = isColored || false;
        this.sampleText = sampleText;
    }
}
const FONTS = {
    Amiri: new Font("Amiri", LANGUAGE_CLASSIFICATION.ar, "Amiri/Amiri-Regular.ttf", false,),
    AmiriQuran: new Font("AmiriQuran", LANGUAGE_CLASSIFICATION.ar, "Amiri/AmiriQuran.ttf", false),
    AmiriQuranColored: new Font("AmiriQuranColored", LANGUAGE_CLASSIFICATION.ar, "Amiri/AmiriQuranColored.ttf", true),
    ArefRuqaa: new Font("ArefRuqaa", LANGUAGE_CLASSIFICATION.ar, "ArefRuqaa/ArefRuqaa-Regular.ttf", false, "اَلْخَطُّ اَلْعَرَبِيُّ فَنٌّ يَجْمَعُ بَيْنَ اَلْأَصَالَةِ وَالْإِبْدَاعِ فِي تَصْمِيمِ اَلْحُرُوفِ"),
    ArefRuqaaInk: new Font("ArefRuqaaInk", LANGUAGE_CLASSIFICATION.ar, "ArefRuqaa/ArefRuqaaInk-Regular.ttf", true, "اَلْخَطُّ اَلْعَرَبِيُّ فَنٌّ يَجْمَعُ بَيْنَ اَلْأَصَالَةِ وَالْإِبْدَاعِ فِي تَصْمِيمِ اَلْحُرُوفِ"),
    NotoSansSiddham: new Font("NotoSansSiddham", LANGUAGE_CLASSIFICATION.sid, "NotoSansSiddham/NotoSansSiddham-Regular.ttf", false),
    Shobhika: new Font("Shobhika", LANGUAGE_CLASSIFICATION.sa, "Shobhika/Shobhika-Regular.otf", false),
    NotoSansDevanagari: new Font("NotoSansDevanagari", LANGUAGE_CLASSIFICATION.sa, "NotoSansDevanagari/NotoSansDevanagari-Regular.ttf", false),
    NotoSansKhmer: new Font("NotoSansKhmer", LANGUAGE_CLASSIFICATION.km, "NotoSansKhmer/NotoSansKhmer-Regular.ttf", false),
    KhmerOS: new Font("KhmerOS", LANGUAGE_CLASSIFICATION.km, "KhmerOS/KhmerOS.ttf", false),
}

for (const fontKey in FONTS) {
    const font = FONTS[fontKey];
    const fontFace = new FontFace(fontKey, `url(${font.path})`);
    fontFace.load().then(function (loadedFont) {
        document.fonts.add(loadedFont);
    }).catch(function (error) {
        console.error(`Failed to load font ${font.name} from path ${font.path}:`, error);
    });
}


const ArabicLetters = [
    "ا", "ب", "ت", "ث", "ج", "ح",
    "خ", "د", "ذ", "ر", "ز", "س",
    "ش", "ص", "ض", "ط", "ظ", "ع",
    "غ", "ف", "ق", "ك", "ل", "م",
    "ن", "ه", "و", "ي",
    //hamzah
    "ء", "أ", "إ",
    "ؤ", "ئ", "ى", "ة",
    //diacritics
    "َ", "ً", "ُ", "ٌ", "ِ", "ٍ", "ْ", "ّ",
    //other marks
    "ٰ", "ۥ", "ۦ", "ۤ", "ۡ",
];
const DevanagariLetters = [
    "्",
    //vowels and consonants
    "अ", "आ", "इ", "ई", "उ", "ऊ",
    "ऋ", "ए", "ऐ", "ओ", "औ",
    "क", "ख", "ग", "घ", "ङ",
    "च", "छ", "ज", "झ", "ञ",
    "ट", "ठ", "ड", "ढ", "ण",
    "त", "थ", "द", "ध", "न",
    "प", "फ", "ब", "भ", "म",
    "य", "र", "ल", "व",
    "श", "ष", "स", "ह", "ॐ",
    //diacritics
    "ा", "ि", "ी", "ु", "ू",
    "ृ", "े", "ै", "ो", "ौ",
    "ं", "ः", "ँ",
    //separator
    "।", "॥",
];
const KhmerLetters = [
    "្",
    "ក", "ខ", "គ", "ឃ", "ង",
    "ច", "ឆ", "ជ", "ឈ", "ញ",
    "ដ", "ឋ", "ឌ", "ឍ", "ណ",
    "ត", "ថ", "ទ", "ធ", "ន",
    "ប", "ផ", "ព", "ភ", "ម",
    "យ", "រ", "ល", "វ",
    "ស", "ហ", "ឡ", "អ",
    //vowels
    "ា", "ិ", "ី", "ុ", "ូ",
    "ួ", "ើ", "ឿ", "ៀ", "េ",
    "ែ", "ៃ", "ោ", "ៅ",
    //diacritics
    "ំ", "ះ", "ៈ",
];