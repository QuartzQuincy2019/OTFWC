// database.js
const FONTS_DIRECTORY_PATH = "./fonts/";
class Language {
    constructor(code, name, placeholder) {
        this.code = code;
        this.name = name;
        this.placeholder = placeholder;
    }
}
const LANGUAGE_CLASSIFICATION = {
    ar: new Language("ar", "Arabic", "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"),
    km: new Language("km", "Khmer", "ក្រុមគ្រួសារ"),
    sa: new Language("sa", "Sanskrit", "तद्यथा। ॐ अनले अनले। विशदे विशदे। वीर वज्रधरे। बन्ध बन्धने। वज्रपाणि फट् हूं फट् स्वाहा।"),
    sid: new Language("sid", "Siddham", "𑖝𑖟𑖿𑖧𑖞𑖯𑗅  𑖌𑖼 𑖀𑖡𑖩𑖸 𑖀𑖡𑖩𑖸𑗅  𑖪𑖰𑖫𑖟𑖸 𑖪𑖰𑖫𑖟𑖸𑗅  𑖪𑖱𑖨 𑖪𑖕𑖿𑖨𑖠𑖨𑖸𑗅  𑖤𑖡𑖿𑖠 𑖤𑖡𑖿𑖠𑖡𑖸𑗅  𑖪𑖕𑖿𑖨𑖢𑖯𑖜𑖰 𑖣𑖘𑖿 𑖮𑖳𑖼 𑖣𑖘𑖿 𑖭𑖿𑖪𑖯𑖮𑖯𑗅"),
    zh: new Language("zh", "Chinese", "天地玄黄 宇宙洪荒 日月盈昃 辰宿列张"),
}
class Font {
    constructor(name, classification, fileName) {
        this.name = name;
        this.fileName = fileName;
        this.classification = classification;
        this.path = FONTS_DIRECTORY_PATH + classification.name + "/" + fileName;
    }
}
const FONTS = {
    Amiri: new Font("Amiri", LANGUAGE_CLASSIFICATION.ar, "Amiri/Amiri-Regular.ttf"),
    AmiriQuran: new Font("AmiriQuran", LANGUAGE_CLASSIFICATION.ar, "Amiri/AmiriQuran.ttf"),
    AmiriQuranColored: new Font("AmiriQuranColored", LANGUAGE_CLASSIFICATION.ar, "Amiri/AmiriQuranColored.ttf"),
    ArefRuqaa: new Font("ArefRuqaa", LANGUAGE_CLASSIFICATION.ar, "ArefRuqaa/ArefRuqaa-Regular.ttf"),
    ArefRuqaaInk: new Font("ArefRuqaaInk", LANGUAGE_CLASSIFICATION.ar, "ArefRuqaa/ArefRuqaaInk-Regular.ttf"),
    NotoSansSiddham: new Font("NotoSansSiddham", LANGUAGE_CLASSIFICATION.sid, "NotoSansSiddham/NotoSansSiddham-Regular.ttf"),
    Shobhika: new Font("Shobhika", LANGUAGE_CLASSIFICATION.sa, "Shobhika/Shobhika-Regular.otf"),
    NotoSansDevanagari: new Font("NotoSansDevanagari", LANGUAGE_CLASSIFICATION.sa, "NotoSansDevanagari/NotoSansDevanagari-Regular.ttf"),
    NotoSansKhmer: new Font("NotoSansKhmer", LANGUAGE_CLASSIFICATION.km, "NotoSansKhmer/NotoSansKhmer-Regular.ttf"),
    KhmerOS: new Font("KhmerOS", LANGUAGE_CLASSIFICATION.km, "KhmerOS/KhmerOS.ttf"),
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
