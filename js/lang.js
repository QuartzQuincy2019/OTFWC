// lang.js
const $v = (sequence) => {
    return "$v" + sequence;
}
/**
 * 对于需要变量的语言显示，可用此函数按顺序传入变量。
 * @param {string} attribute 读取哪一则文本
 * @param {Array} parameters 传入的参数，可选
 * @returns 要写入的结构
 */
function combineParameters(attribute, parameters = []) {
    var output = "";
    if (parameters.length != 0) {
        var parameterList = new Map(parameters.map((val, idx) => ["$v" + idx, val]));
        for (const section of attribute) {
            if (section[0] != "$") {
                output += section;
                continue;
            } else {
                if (section[1] == "v") {
                    let variable = section;
                    output += parameterList.get(variable);
                    continue;
                }
            }
        }
    } else {
        for (const section of attribute) {
            output += section;
        }
    }
    return output;
}

/**
 * 应用范例：writeIn(lang.zh.texts.fontExplanation, ["Amiri",lang.zh.languages.ar]);
 * @param {string} language 设置中的语言选项，如zh
 * @param {string} id id
 * @param {Array} parameters 参数列表
 */
function writeIn(attribute, parameters = []) {
    var output = combineParameters(attribute, parameters);
    return output;
}


const lang = {
    "en": {
        FontSelector: ["Font Selector"],
        languages: {
            ar: ["Arabic"],
            en: ["English"],
            km: ["Khmer"],
            sa: ["Sanskrit(Devanagari)"],
            sid: ["Sanskrit(Siddham)"],
            zh: ["Chinese"]
        },
        texts: {
            chooseFont: ["Choose a font to display the text in the textarea."],
            fontExplanation: [$v(0)/*Font Name*/, " is a font for ", $v(1)/*Language Name*/, "."]
        }
    },
    "zh": {
        FontSelector: ["字体选择器"],
        languages: {
            ar: ["阿拉伯语"],
            en: ["英语"],
            km: ["柬埔寨语（高棉语）"],
            sa: ["梵语（天城体）"],
            sid: ["梵语（悉昙体）"],
            zh: ["中文"]
        },
        texts: {
            chooseFont: ["选择一个字体来显示文本区域中的文本。"],
            fontExplanation: [$v(0)/*字体名称*/, " 是", $v(1)/*语种名称*/, "的字体。"]
        }
    },
    "jp": {
        FontSelector: ["フォントセレクター"],
        languages: {
            ar: ["アラビア語"],
            en: ["英語"],
            km: ["クメール語"],
            sa: ["梵語（デーヴァナーガリー文字）"],
            sid: ["梵語（悉曇文字）"],
            zh: ["中国語"]
        },
        texts: {
            chooseFont: ["テキストエリアに表示するフォントを選択してください。"],
            fontExplanation: [$v(0)/*フォント名*/, " は", $v(1)/*言語名*/, "のフォントです。"]
        }
    }
}