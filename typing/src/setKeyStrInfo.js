export function getKey() {
	// https://www.toptal.com/developers/keycode/for/c
	//"検出したいキーボード上のキー文字列の正規表現(ORがないなら先頭4文字まで)":JSON配列(キー文字が持つkeyEvent.codeの文字列)
	let detectSysKey = {//ユーザ入力キーボードのキー右下から左へ見ていく、左にキーがないなら上段へ上がる
		"End/gi":["ArrowRight"],
		"PgDn/gi":["ArrowDown"],
		"PgUp/gi":["ArrowUp"],
		"Home/gi":["ArrowLeft"],
		"Control":{
			c: ["ControlRight", "ControlLeft"],
			s: "Ctrl/gi"
		},
		"Ctrl/gi":["ControlRight", "ControlLeft"],
		"Alt/gi":["AltRight", "AltLeft"],
		"^Fn/gi":["Fn"],
		"Shift/gi":["ShiftRight", "ShiftLeft"],
		"CapsLock/gi":["CapsLock", "Alphanumeric"],
		"Enter/gi": ["Enter"],
		"Tab/gi": ["Tab"],
		"Back/gi":["Backspace"],
		"Delete/gi":["Delete"],
		"Insert/gi":["Insert"],
		"ScrollLock/gi":["ScrollLock"],
		"PauseBreak/gi":["Pause"],
		"PrintScreen/gi":["PrintScreen"],
		"F[\\d|\\w]{1,3}/gi":null,//空文字 or nullなら検出した文字そのまま、keyEvent.codeに使う,
		"ESC/gi":["Escape"]
	}

	// .test("a");
	//↑のオブジェクトから生成
	let sKey = {
		"ESC": {//ユーザ入力
			c:["Escape"],//ユーザ入力
			l: 0,//キー位置算出時に使用(↑の配列をこの数値で参照)
			r: /ESC/gi,//キー画像からキー文字を検出する時生成
		},
		// "Fd12":{
		// 	r: /^F.{1,3}/gi,
		// 	c: null //検出した文字をそのままkeyEvent.codeで使う
		// },
		"Shift":{
			c:["ShiftRight", "ShiftLeft"],
			l: 0,
			r: /Shif/gi,
		},
		"CapsLock":{
			c:["CapsLock"],
			l: 0,
			r: /Caps/gi,
			ti: 2
		}
	}
	//キー画像全体:検出したい文字群///検出したい文字列の簡易正規表現から生成する
	let skeyChar = "EsScCF1234567890PprintauUeBkKTeoOolLIDyRqEhfgAHumMd";

	// let skey = ["^ESC/gi", "PrintScreen/gi", "PauseBreak/gi", "ScrollLock/gi", "Insert/gi", "Delete/gi", "BackSpace/gi", "Tab/gi", "Enter/gi", "CapsLock/gi", "Shift/gi", "^Fn/gi", "^Ctrl/gi", "^Alt/gi", "^Home/gi", "^End/gi", "pg/gi/detectedWordKeep", "F\\d{1,2}/gi/"];
	//検出したい文字列の簡易正規表現から生成された正規表現(5文字までを使う)
	// let skeyReg = [/^ESC/gi, /^print/ig, /^pause/ig, /^scroll/ig, /^insert/ig, /^delete/ig, /^back/ig,
	// /tab/ig, /enter/ig, /^caps/ig, /shift/ig, /^fn/ig, /^ctrl/ig, /^alt/ig,
	// /^home/ig, /^end/ig, /pg/ig];
	// ↑の検出したい文字列の正規表現と正しい文字列の修正の配列群を↓の一まとめにした配列へ変更
	// let skeyIndex = [[/^ESC/gi, "ESC"], [/prin/ig, "PrintScreen"],[/paus/ig, "PauseBreak"], ...[], [/pg/ig], [/F\d{1,3}/g], [/F\w{1,3}/g]];

	//キー全体画像：言語(日本語)でキーボードのキーを全体で見たとき検出したい文字(Systemキー)+keyEvent.code
	let detectSysKeyLang = {
		"目/g":["ContextMenu"],
		"田/g":["MetaLeft", "MetaRight"],
		"カ|タ|カ|ナ|ひらがな/g":["KanaMode"],
		"無|変|換/g":["Convert","NonConvert"],
		"半|角|全|角/g":["Backquote"]
	}
	let skipLang = false;//キー全体画像:言語で文字探索をやらないならtrue
	// let skeyLang = ["半|角|全|角/g", "カ|タ|カ|ナ|ひらがな/g", "変|換/g/detectedWordKeep"];
	// let skeyLangReg = [/半|角|全|角/g, /カ|タ|カ|ナ|ひらがな/g, /変|換/g];
	// let skeyLangIndex = ["半角全角", "カタカナひらがな"];
	let skeyLangChar = ["半角全角カタカナひらがな変換"];
	let sKeyLang = {}

	//通常キー
	let detectKeys = {
		//keyEvent.Code: [keyEvent.key(+キーボード画像にある), Shift + keyEvent.key(+キーボード画像にある), KeyOnIme(+キーボード画像にある)]
		//JIS
		"IntlRo": [ "\\", "_", "ろ"],
		"Slash": [ "/", "?", "め"],
		"Period": [ ".", ">", "る"],
		"Comma": [ ",", "<", "ね"],
		"KeyM": [ "", "M", "も"],
		"KeyN": [ "", "N", "み"],
		"KeyB": [ "", "B", "こ"],
		"KeyV": [ "", "V", "ひ"],
		"KeyC": [ "", "C", "そ"],
		"KeyX": [ "", "X", "さ"],
		"KeyZ": [ "", "Z", "つ"],

		"Backslash": [ "]", "}", "む"],
		"Quote": [ ":", "*", "け"],
		"Semicolon": [ ";", "+", "れ"],
		"KeyL": [ "", "L", "り"],
		"KeyK": [ "", "K", "の"],
		"KeyJ": [ "", "J", "ま"],
		"KeyH": [ "", "H", "く"],
		"KeyG": [ "", "G", "き"],
		"KeyF": [ "", "F", "は"],
		"KeyD": [ "", "D", "し"],
		"KeyS": [ "", "S", "と"],
		"KeyA": [ "", "A", "ち"],

		"BracketRight": [ "[", "{", "゜"],
		"BracketLeft": [ "@", "`", "゛"],
		"KeyP": [ "", "P", "せ"],
		"KeyO": [ "", "O", "ら"],
		"KeyI": [ "", "I", "に"],
		"KeyU": [ "", "U", "な"],
		"KeyY": [ "", "Y", "ん"],
		"KeyT": [ "", "T", "か"],
		"KeyR": [ "", "R", "す"],
		"KeyE": [ "", "E", "い"],
		"KeyW": [ "", "W", "て"],
		"KeyQ": [ "", "Q", "た"],

		"IntlYen": [ "\\", "|", "ー"],
		"Equal": [ "^", "~", "へ"],
		"Minus": [ "-", "=", "ほ"],
		"Digit0": ["0", "", "わ"],
		"Digit9": [ "9", ")", "よ"],
		"Digit8": [ "8", "(", "ゆ"],
		"Digit7": [ "7", "'", "や"],
		"Digit6": [ "6", "&", "お"],
		"Digit5": [ "5", "%", "え"],
		"Digit4": [ "4", "$", "う"],
		"Digit3": [ "3", "#", "あ"],
		"Digit2": [ "2", "\"", "ふ"],
		"Digit1": [ "1", "!", "ぬ"],
	}
	let detectKey = {
		"Digit1":{
			k:"1"
		}
	}
	let detectShiftKey = {
		"Digit1":{
			k:"!"
		}
	}
	let detectKeyLang = {
		"Digit1":{
			k:"ぬ"
		}
	}
	let skipKeyPart = false;//キー部分を分割して文字探索しないならtrue
	//キー左上画像:検出したい文字群
	let shiftKeyChar = "!\"#$%&'()=~|QWERRTYUIOP`{ASDFGHJKL+*}ZXCVBNM<>?_";
	//キー左下画像:検出したい文字群
	let keyChar = "1234567890-^" + "\u005A" + "@[;:],.\\";
	//キー右下画像:検出したい文字群
	let keyLangChar = "ぬふあうえおやゆよわほへーたていすかんなにらせ゛゜ちとしはきくまのりれけむつさそひこみもねるめろ";

	let tmpS = "";
	for (const [k, v] of  Object.entries(detectSysKey)) {
		let s = k.split("/");
		let o = {}
		if(/\||\{/g.test(s[0])) o.r = new RegExp( s[0], s[1] );
		else o.r = new RegExp( s[0].slice(0,4), s[1] );
		o.l = 0;
		let t = s[0].replace(/\W/g, "");
		if(v) o.c = v
		else o.c = null
		sKey[t] = o;
		tmpS += t;
		// debugger;
	}
	// https://qiita.com/netebakari/items/7c1db0b0cea14a3d4419
	// https://stackoverflow.com/questions/50881453/how-to-add-an-array-of-values-to-a-set
	//セットで文字の重複をなくすため文字列からセットを使う
	//tmpにある文字列をスプレッドで一文字ずつ配列へ展開、その配列をsetに与えて、重複を削除、そのsetをjoinでつないで再度、文字列化
	skeyChar = [...new Set([...tmpS])].join("").toString() + "1234567890";

	tmpS = "";
	for (const [k, v] of Object.entries(detectSysKeyLang)) {
		let s = k.split("/");
		let o = {}
		if(/\||\{/g.test(s[0])) o.r = new RegExp( s[0], s[1] )
		else o.r = new RegExp( s[0].slice(0,4), s[1] );
		o.l = 0;
		let t = s[0].replace(/\||\^|\[|\]/g, "");
		if(v) o.c = v
		else o.c = t
		sKeyLang[t] = o;
		tmpS += t;
	}
	skeyLangChar = [...new Set([...tmpS])].join("").toString();
	keyChar = "";
	shiftKeyChar = "";
	keyLangChar = "";
	for (const [k, v] of Object.entries(detectKeys)) {
		if(v[0] != ""){
			//key
			detectKey[k] =  {"k": v[0]};
			keyChar += v[0];
		}
		if(v[1] != ""){
			//key+shift
			detectShiftKey[k] = {"k": v[1]};
			shiftKeyChar += v[1];
		}
		if(v[1] != ""){
			//keyLang
			detectKeyLang[k] = {"k": v[2]};
			keyLangChar += v[2];
		}
	}
	return {
		"sPart": skipKeyPart,
		"sLang": skipLang,
		"sysC": skeyChar,
		"sys": sKey,
		"sysLC": skeyLangChar,
		"sysL": sKeyLang,
		"kC": keyChar,
		"k": detectKey,
		"shiftC": shiftKeyChar,
		"shift": detectShiftKey,
		"langC": keyLangChar,
		"lang": detectKeyLang,
		"allC": [...new Set(...(shiftKeyChar + keyChar + skeyChar))].join("").toString(),
	};
}

export function getImeKey(imeE, keyInfo){
	let keyIme = {
		// "ti": [[/角/gi], [/CapsLock/gi], [/alt/gi, /@/gi]],
		// "oi": [[/カタ/gi]],
		"toggle": [["半角全角"], ["Alt", "`"], ["CapsLock"]],
		"on": [["カタカナひらがな"]]
	};
		//テキストエリアが空か上書きならでkeyInfoのキー情報を入れる
	if(imeE.value.length == 0) {
		const t = localStorage.getItem("keyIme.json");
		if(t == null){
			//設定値がテキストエリアにない、過去の設定値もないならデフォルト値
			imeE.value = JSON.stringify(keyIme, null, "    ");
		}else{
			//設定値がテキストエリアにない、過去の設定値がある
			imeE.value = t;
			keyIme = JSON.parse(t);
		}
	}else{
		//設定値がテキストエリアにある
		try {
			//設定値がテキストエリアにある
			localStorage.setItem("keyIme_old.json", imeE.value);
			//設定値を更新
			keyIme = JSON.parse(imeE.value);
		} catch (err) {
			alert(err);
		}
	}
	keyIme.toggle.forEach( (a, i) => {
		for (const [k, v] of  Object.entries(keyInfo)) {
			let end = false;
			if(!isNaN(k)){
				for (const a1 of a.values()) {
					// console.log("a1", a1);
					if(a1 == v.keys.key || a1 == v.keys.shift){
						//このキーはIMEをtoggleする
						console.log("TI", a1);
						v.keys.ti = i;
						break;
					}
				}
			}
		}
	});
	keyIme.on.forEach( (a, i) => {
		for (const [k, v] of  Object.entries(keyInfo)) {
			let end = false;
			if(!isNaN(k)){
				for (const a1 of a.values()) {
					if(a1 == v.keys.key || a1 == v.keys.shift){
                        //このキーはIMEをOnする
						console.log("OI", a1);
						v.keys.oi = i;
						end = true;
						break;
					}
				}
			}
			if(end) break;
		}
	});

	localStorage.setItem("keyIme.json", JSON.stringify(keyIme));
	// console.log("keyIme.Toggle[0][0]", keyIme.Toggle[0][0].constructor);
	return keyIme;
}