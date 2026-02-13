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
    "ـ","۝","۞",
];
const DevanagariLetters = [
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
    "्",
    //separator
    "।", "॥",
];
const KhmerLetters = [
    // 33 个辅音 (U+1780 – U+17A2)
    "ក", "ខ", "គ", "ឃ", "ង",
    "ច", "ឆ", "ជ", "ឈ", "ញ",
    "ដ", "ឋ", "ឌ", "ឍ", "ណ",
    "ត", "ថ", "ទ", "ធ", "ន",
    "ប", "ផ", "ព", "ភ", "ម",
    "យ", "រ", "ល", "វ",
    "ស", "ហ", "ឡ", "អ",

    // 17 个独立元音 (U+17A3 – U+17B3)
    "ឣ", "ឤ", "ឥ", "ឦ", "ឧ", "ឨ", "ឩ", "ឪ", "ឫ", "ឬ", "ឭ", "ឮ", "ឯ", "ឰ", "ឱ", "ឲ", "ឳ",

    // 16 个依赖元音 (U+17B6 – U+17C5)
    "ា", "ិ", "ី", "ឹ", "ឺ", "ុ", "ូ", "ួ", "ើ", "ឿ", "ៀ", "េ", "ែ", "ៃ", "ោ", "ៅ",

    // 14 个变音符号及其他拼写符号 (U+17C6 – U+17D3)
    "ំ", "ះ", "ៈ", "៉", "៊", "់", "៌", "៍", "៎", "៏", "័", "៑", "្", "៓",

    // 2 个附加符号 (U+17DC – U+17DD)
    "ៜ", "៝"
];
const SiddhamLetters = [
    // U+11580 – U+115B5 (已定义，共54个)
    "\u{11580}", "\u{11581}", "\u{11582}", "\u{11583}", "\u{11584}", "\u{11585}", "\u{11586}", "\u{11587}",
    "\u{11588}", "\u{11589}", "\u{1158A}", "\u{1158B}", "\u{1158C}", "\u{1158D}", "\u{1158E}", "\u{1158F}",
    "\u{11590}", "\u{11591}", "\u{11592}", "\u{11593}", "\u{11594}", "\u{11595}", "\u{11596}", "\u{11597}",
    "\u{11598}", "\u{11599}", "\u{1159A}", "\u{1159B}", "\u{1159C}", "\u{1159D}", "\u{1159E}", "\u{1159F}",
    "\u{115A0}", "\u{115A1}", "\u{115A2}", "\u{115A3}", "\u{115A4}", "\u{115A5}", "\u{115A6}", "\u{115A7}",
    "\u{115A8}", "\u{115A9}", "\u{115AA}", "\u{115AB}", "\u{115AC}", "\u{115AD}", "\u{115AE}", "\u{115AF}",
    "\u{115B0}", "\u{115B1}", "\u{115B2}", "\u{115B3}", "\u{115B4}", "\u{115B5}",

    // 跳过未定义的 U+115B6 和 U+115B7
    
    "\u{115B8}", "\u{115B9}", "\u{115BA}", "\u{115BB}", "\u{115BC}", "\u{115BD}", "\u{115BE}", "\u{115BF}",
    "\u{115C0}", "\u{115C1}", "\u{115C2}", "\u{115C3}", "\u{115C4}", "\u{115C5}", "\u{115C6}", "\u{115C7}",
    "\u{115C8}", "\u{115C9}", "\u{115CA}", "\u{115CB}", "\u{115CC}", "\u{115CD}", "\u{115CE}", "\u{115CF}",
    "\u{115D0}", "\u{115D1}", "\u{115D2}", "\u{115D3}", "\u{115D4}", "\u{115D5}", "\u{115D6}", "\u{115D7}",
    "\u{115D8}", "\u{115D9}", "\u{115DA}", "\u{115DB}", "\u{115DC}", "\u{115DD}"
];