// https://dev.to/overrideveloper/a-first-look-at-constructable-stylesheets-3ae
// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replaceSync
// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replace
// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/deleteRule
// https://www.yutaliberty.com/2019/04/10/prog/1534/
// http://csharpvbcomparer.blogspot.com/2015/08/js-queryselector-for-id-starts-with-number.html
// https://www.webopixel.net/html-css/1011.html
// https://developer.mozilla.org/ja/docs/Web/API/Element/replaceWith
// https://developer.mozilla.org/ja/docs/Web/API/Node/cloneNode

import { inP, imeOn } from "./typing";
import { kdCss, kuCss, keySI } from "./keyInfo";
//(guide関数=)guide構築後にわかるguideIndexを使う
import { guideIndex } from "./guide";
let viewKeyDownTime = 0.5;

const keyDownCss = document.createElement('style');
keyDownCss.id = "typKD"
document.head.appendChild(keyDownCss);
const keyDownStyle = keyDownCss.sheet;
const keySuggestionCss = document.createElement('style');
keySuggestionCss.id = "keySu"
document.head.appendChild(keySuggestionCss);
const keySuggestionStyle = keySuggestionCss.sheet;

let imeToggle = false;
let nextC = 0;
let nextI = 0;

//getter:guideIndex@(guide関数=)guide構築後にわかるcharIAの情報を使う
// let charIndexA = [];
// export function setCharIndex(charIA){
// 	charIndexA = charIA;
// 	console.log("setCharIndex@charIndexA:", charIndexA);
// }

//getter:keySI@(setKeyPosition関数=)key位置算出後にわかる、shiftまたはimeを使用する時に扱うキーの情報をセット
// let keySI;
// export function setKeySI(keySIO){
// 	keySI = keySIO;
// 	console.log("setKeySI@keySI:", keySI);
// }

// let keyEle;
// export function setKeyEle(el){
// 	keyEle = el;
// 	console.log("setKeyEle@keyEle:", keyEle);
// }

// let inP;
// export function setInP(el) {
// 	inP = el;
// 	console.log("setInP@inP:", inP);
// }
export function nextChar(){
	//TODO キーアップ時に次の文字と次のキー位置を表示(keyDown時に次の文字とキーの位置を取得)
	if(nextI == -1) {
		keySuggestionStyle.replaceSync("");
	}else{
		const imeT = imeKeys.has(document.getElementById("guide").childNodes[nextI].firstChild.firstChild.textContent);
		if( imtT ^ imeOn ){//( (nextC && !imeOn) || (!nextC && imeOn) )
			imeToggle = true;
			kdCss.replaceSync(".TI{display:block;}");
		}else{
			const c = document.querySelector("." + next).dataset.c;
			if(shiftKeys.get(nextC)){
				kdCss.replaceSync(`.KS.Shift{display:block;} .KS.${c}{display:block;}`);
			}else{
				kdCss.replaceSync(`.KS.${c}{display:block;}`);
			}
		}
	}
}

const nowGuide = ( () => {
	let preOffset = 0;
	let diffKeyDownCnt = 0;
	let offsetHistory = new Map();
	let move = false;
	console.log("nowGuide");
	return function(i, offset, code) {
		if (code == "Backspace" || code == "Delete" || code == "ArrowLeft" || code == "ArrowRight" || code == "ArrowUp" || code == "ArrowDown"){
			console.debug("moveOn");
			move = true;
			return;
		};
		console.log("index:", i, "Offset", offset, "move", move);
		if(i < guideIndex.length){
			if(offset == 0){//IMEの初回キーダウン時または子要素を持たない場合のキーダウン時(関数開始時のoffsetが0の時)
				preOffset = offset;
				diffKeyDownCnt = 0;
				move = false;
				console.log("guideIndex["+i+"]["+offset+"]", guideIndex[i][offset]);
				return guideIndex[i][offset];
			}
			// console.log(isNaN(i), i);console.log(guideIndex[0]);console.log(guideIndex[i]);
			// if(offset <= preOffset){//IME入力中現在入力オフセットが以前の入力オフセット以下なら場合、オフセット数を減った数+1(キーダウンで増えるはずの1文字を追加)
			// 	// return guideIndex[i+1][0];
			// }
			if(move && offsetHistory.has(offset)){
				preOffset = offset;
				offset = offsetHistory.get(offset);
				move = false;
				console.log("index:", i, "move", move, "Offset", offset, "preOffset", preOffset);
			}else{
				diffKeyDownCnt += preOffset + 1 - offset;//IME入力中、以前の入力オフセット+1(=1回キーダウンしてるので1文字増えると家庭)分と現在入力オフセットが異なる場合、その差分を保存に追加(tyo->ちょでキーダウン数は2->3だが2(preOffset)->2(offset)文字の場合)
				console.debug("preOffset", preOffset, "diffKeyDownCnt", diffKeyDownCnt);
				preOffset = offset;
				offset += diffKeyDownCnt;//本来のオフセットの数はoffset - 1(IME入力時、先頭にゼロ幅スペースがあるため)、そこに差分を追加
				offsetHistory.set(preOffset, offset);
			}
			if(offset < guideIndex[i].length){
				console.log("guideIndex["+i+"]["+offset+"]", guideIndex[i][offset]);
				return guideIndex[i][offset];
			}
			else {
				//打たれた文字の位置がもつクラス名
				for(let sum = i;i < guideIndex.length;){
					//以前の累計
					let presum = sum;
					//配列が持つ個数を累計
					sum += guideIndex[i++].length;
					//個数の累計がオフセット以下なら累計を取った時の配列の中に文字数がある
					if(offset < sum) {
						--i;
						//次の文字
						if(offset + 1 < sum){
							//次の文字
							nextC = i;
							//次のキー
							nextI = guideIndex[i][offset + 1 - presum];
						}else{
							nextC = i + 1;
							nextI = guideIndex[nextC][offset + 1 - sum];
						}
						console.debug("guideIndex[" + i +"][" + (offset - presum) +"]:", guideIndex[i][offset - presum]);
						//今のキー
						return guideIndex[i][offset - presum];
						// return guideIndex[--i][offset - sum];
					}
				}
				// console.log("guideIndex["+(i + offset - 2)+"]", guideIndex[i + offset - 2]);
				// console.log("guideIndex["+(i + offset - 1)+"]", guideIndex[i + offset - 1 ]);
				// console.log("guideIndex["+(i + offset)+"]", guideIndex[i + offset]);
				// // console.log("guideIndex["+(i + offset - 1)+"][last]", guideIndex[i + offset - 1].at(-1));
				// if (i + offset - 1 < guideIndex.length) {
				// 	if(guideIndex[i + offset - 2].length == 2) {
				// 		if(i + offset - 1 == guideIndex[i + offset - 2][1]){
				// 			return guideIndex[i + offset - 2][1];
				// 		}
				// 	}
				// 	return guideIndex[i + offset - 1][0];
				// }
				return -1;
			}
		}
		return -1;
	}
})();

function replaceCss(ruleStr){
	//キーダウン時cssを入れ替えて更新
	// keyDownStyle.replaceSync(`.KD.${key}{display:block;}`);
	console.log("?:",keyDownStyle.cssRules[0]);
	let j = 0;
	ruleStr.split(" ").forEach( ( v, i )=>{
		console.log("sv", v);
		v = v.replace(/\\(\w)/g, "$1");
		// console.log("tv", v);
		//数字なら？(1文字単位0,1,2,3,4,5,6,7,8,9)
		v = v.replace(/\\(\d)/g, "\\00003$1");
		// console.log("ev", v);
		// /(?<=K[DN]\.)([\\\\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~\])])/g

		// v = v.replace(/(?<=K[DN]\.)([\!"#$])/g, "\\$1")
		// v = v.replace(/(?<=K[DN]\.)(.*)/g, "\\\$1");
		// console.log("insertRule:", v);
		// keyDownStyle.insertRule(v);
		j = i;
	})
	//時間で消えるようにする？
	// const id = setTimeout(() =>
	// , 500);
	// console.log("ruleStr:", ruleStr);
	// for (let i = keyDownStyle.cssRules.length - 1; i > j;i--) {
	// 	keyDownStyle.deleteRule(i);
	// 	console.log("deleteCss", keyDownStyle.cssRules[i]);
	// }
	kdCss.replaceSync(ruleStr.replace(/\\(\w)/g, "$1").replace(/(\d)/g, "\\00003$1"), 0);//一回目のreplaceで、数字の場合"\\"が削除されるので2度目のreplaceでつける
}

function  multipleKey(e, css, kstatus) {
	if(e.shiftKey){
		if(e.location == 1){
			css += `.${kstatus}.ShiftLeft{display:block;}`;
		}else if(e.location == 2){
			css += `.${kstatus}.ShiftRight{display:block;}`;
		}else{
			css += `.${kstatus}.Shift{display:block;}`;
		}
	}
	if(e.altKey){
		if(e.location == 1){
			css += `.${kstatus}.AltLeft{display:block;}`;
		}else if(e.location == 2){
			css += `.${kstatus}.AltRight{display:block;}`;
		}else{
			css += `.${kstatus}.Alt{display:block;}`;
		}
	}
	if(e.ctrlKey){
		if(e.location == 1){
			css += `.${kstatus}.ControlLeft{display:block;}`;
		}else if(e.location == 2){
			css += `.${kstatus}.ControlRight{display:block;}`;
		}else{
			css += `.${kstatus}.Control{display:block;}`;
		}
	}
	if(e.metaKey){
		if(e.location == 1){
			css += `.${kstatus}.MetaLeft{display:block;}`;
		}else if(e.location == 2){
			css += `.${kstatus}.MetaRight{display:block;}`;
		}else{
			css += `.${kstatus}.Meta{display:block;}`;
		}
	}
	return css;
}
export function nowChar(e, se) {
	if(inP.firstChild == null) return;
	console.log("e.key:",e.key
	,"e.code:", e.code
	,"e.keyCode:", e.keyCode
	,"se.focusNode", se.focusNode
	,"se.focusNode.text", se.focusNode.textContent
	,"se.focusNode.textLength", se.focusNode.textContent.length
	,"se.focusOffset", se.focusOffset
	);
	let target;
	if(se.focusNode.nodeType == Node.TEXT_NODE) target = se.focusNode.parentNode;
	else target = se.focusNode;
	if(37 <= e.keyCode && e.keyCode <= 40 || !Object.hasOwn(keySI, "s")){
		//cssを入れ替えて更新
		kdCss.replaceSync(multipleKey(e, `.KD.${e.code}{display:block;}`), 0);
		return;
	}
	else{
		let now = -1;
		if(imeToggle && Object.hasOwn(keySI, "t")){
			console.log("toggleIme:");
			if(keySI.t.has(e.code)){
				kdCss.replaceSync(multipleKey(e, `.KD.${e.code}{display:block;}`, "KD"), 0);
				imeToggle = false;
				return;
			}else if(e.isComposing){
				kdCss.replaceSync(multipleKey(e, `.KD.${e.code}{display:block;}`, "KD"), 0);
				return;
			}else{
				kdCss.replaceSync(multipleKey(e, `.KN.${e.code}{display:block;}`, "KN"), 0);
			}
		}
		else if(inP.lastChild.isEqualNode(target)){
			console.log("keydown:");
			now = nowGuide(inP.children.length - 1, se.focusOffset, e.code);
		}
		else{
			// console.log("se.focusNode.parentNode:", target
			// ,"inP.children", inP.children
			// );
			for (let i = 0; i < inP.children.length ; i++) {
				//キーダウン時の判定なのでまだ文字がwindow上にない
				if(inP.children[i].isEqualNode(target)){
					// console.log(inP.children[i], "==", target)
					if(e.isComposing){
						//IME中(IME中の二回目のキーダウンから、IMEの入力を受け取る要素のが持つテキスト文字数(オフセット)を数える。
						now = nowGuide(i, se.focusNode.offset, e.code);
						// nextI = nowGuide(i, se.focusOffset+1);
					}
					else{
						//IMEの初回キーダウンとIMEでないキーダウン時
						//打たれる文字位置がもつクラス名
						now = nowGuide(i+1, 0);
						// nextI = nowGuide(i+1, 0);
					}
					break;
				}
			}
		}

		if(now == -1 || now == undefined) {
			console.log("NoGuide:");
			nextI = -1;
			kdCss.replaceSync(multipleKey(e, `.KD.${e.code}{display:block;}`, "KD"), 0);
			return;
		}

		console.log(e.key
		, e.code
		, e.getModifierState('CapsLock')
		,".g"+ now
		,"Guide:", document.querySelector( ".g"+now )
		);

		const char = document.querySelector(".g"+ now).textContent;

		let kstatus = "KN";
		//判定1-3@IMEなし、e.key(=入力された文字)とguide文字が一致:OK、Shiftが必要な文字のとき、shiftが押される:OK、エンターが押された時、guide文字が改行ならOK
		//判定3-4@IME中、keyD([a-z0-9])がguide文字と一致:OK、エンターとスペース:OK
		//判定5-6@どんな時もalt,ctrl,metakeyはOK
		if( e.key === char){
			kstatus = "KD";
		}else{
			const c = /Key|Digit/.test(e.code) ? e.code.slice(-1).toLowerCase() : e.code;
			// debugger;
			if(c == char ||(keySI.s.get(char) && e.shiftKey) || (char == "\n" && e.code == "Enter") || (e.isComposing||e.key=="Process"||e.keyCode == 229) && (e.code == "Enter"||e.code == "Space" ) || e.altKey || e.ctrlKey || e.metaKey){
				kstatus = "KD";
			}
		}
		kdCss.replaceSync(multipleKey(e, `.${kstatus}.${e.code}{display:block;}`, kstatus), 0);
	}
}
