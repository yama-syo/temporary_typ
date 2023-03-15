import {nowChar, nextChar} from "./keyDownInfo";

export const inP = document.getElementById("inP");
const caretEle = document.createElement("div");
inP.before(caretEle);
caretEle.id = "caret";
caretEle.style.display = "none";
const caretIMEWidth = parseFloat(getComputedStyle(caretEle).getPropertyValue("width"));
const caretHidth = parseFloat(getComputedStyle(caretEle).getPropertyValue("height"));
const caretWidth = caretIMEWidth / 2
caretEle.style.width = caretWidth + "px";
// https://qiita.com/kiwaki/items/53bdf11e1a230faa14cc
// let caretOffsetY = parseFloat(getComputedStyle(inP.parentElement).getPropertyValue("top"));//TODO resize時には変更
let caretOffsetY = 16 * parseFloat(getComputedStyle(document.getElementById("typ")).getPropertyValue("line-height")) / 45;
const typp = document.getElementById("typ");
console.debug("fontS:", parseFloat(getComputedStyle(typp).getPropertyValue("font-size"))
,"--lineH:", parseFloat(getComputedStyle(typp).getPropertyValue("line-height"))

);//TODO resize時には変更

export let preimeOn = false;
export let imeOn = false;

let num = 0;

//引数で与えられた要素の先頭にcaretを置く
const caretMove = (se) =>{
	//TODO seもらって、要素がテキスト(foucusOffsetあり)の時分岐
	console.debug("caretMove:", se);
	// // let range = se.getRangeAt(0);
	// if(se.focusNode.nodeType == Node.TEXT_NODE){
	// 	rect = se.focusNode.parentElement.getClientRects()[0];
	// }else{
	// 	rect = se.focusNode.getClientRects()[0];
	// }
	let rect;
	if(se.focusOffset == undefined){
		// console.log("caretMove:se.focusOffset undefined");
		rect = se.getClientRects()[0];
		// caretEle.style.top = rect.y + caretOffsetY + "px";
		caretEle.style.top = caretOffsetY + "px";
	}else if(se.focusOffset == 0){
		// console.log("caretMove:se.focusOffset===0");
		rect = se.focusNode.parentElement.getClientRects()[0];
		caretEle.style.top = caretOffsetY + "px";//20, 20
	}else{
		// console.log("caretMove:se.focusNode == Node.TEXT_NODE");
		rect = se.getRangeAt(0).getClientRects()[0];
		caretEle.style.top = caretOffsetY + "px";//20
	}
	// let rect = target.getClientRects()[0];
	// console.debug("range:", range, "rect:" ,rect);
	// console.debug("rect:", rect);
	// console.debug(getComputedStyle(target).getPropertyValue("font-size"), getComputedStyle(document.getElementById("guide")).getPropertyValue("margin-top"), getComputedStyle(document.querySelector(".Bo")).getPropertyValue("line-height"), getComputedStyle(inP.parentElement).getPropertyValue("top"), getComputedStyle(caretEle).getPropertyValue("top"), caretOffsetY);
	// caretEle.style.left = rect.x + rect.width - inPX + "px";
	// caretEle.style.top = rect.y - inPY + "px";
	caretEle.style.left = rect.x + "px";
	console.debug("caretMove:", rect, caretOffsetY, caretHidth);
}
const sets = (el, str, cla) => {
	console.debug("sets:", str, cla);
	// https://caniuse.com/css-nth-child-of
	// ↑のCSSが使える場合のソース
	// if(str.length > 1){
	// 	//すでにthis(この要素に)class=cがある
	// 	//絵文字対策
	// 	const chars = [...e.data]
	// 	//最後の入力文字を現在フォーカスされてる要素へ
	// 	el.textContent = chars.at(-1);
	// 	// debugger;
	// 	//最後の入力文字をのぞいた文字を文字列先頭から作成された要素に入れ、その現在フォーカスされてる要素の前におく
	// 	for(let i = 0;i < str.length - 1;){
	// 		const in_p = document.createElement("in-p");
	// 		el.before(in_p);
	// 		in_p.textContent = chars[i++];
	// 		in_p.classList.add("c", num++);
	// 	}
	// 	el.removeAttribute("contentEditable");
	// 	// debugger;
	// }
	// else if(str.length > 0){
	// 	el.textContent = str;
	// 	if(cla) el.classList.add("c", cla, num++);
	// 	el.classList.add("c", num++);
	// 	el.removeAttribute("contentEditable");
	// }
	const ms = (c, cla) =>{
		const s = document.createElement("span");
		s.textContent = c;
		if(cla) el.classList.add("c", cla, num++);
		el.classList.add("c", num++);
		el.before(s);
	};
	//IME確定後
	if(str.length > 1){
		//絵文字対策
		const chars = [...str];
		for(let i = 0;i < str.length;){
			console.debug("sets:next");
			ms(chars[i++]);
		}
		el.textContent = "";
	//IMEなし
	} else if(str.length > 0){
		ms(str, cla);
		el.textContent = "";
	}
	//データが0→IME入力中に入力文字が全部消されたとき// IME入力中に入力文字が全部消されたとき
	else{
		// el.textContent = "";
	}
	el.removeAttribute("class");
	console.debug("setsEnd");
};

class CustomInput extends HTMLElement{
	typ = false;
	constructor(){
		super();
	}
	connectedCallback(){
		this.contentEditable = true;
		// this.style.display = "inline-block";
		this.addEventListener("focusout", e =>{
			// e.stopImmediatePropagation();
			console.debug("focusout@in-p", document.activeElement.nodeName);
			//テキストを持たない状態でフォーカスが外れると自身を削除
			if(!this.textContent){
				// this.remove();
			}
		});
		this.addEventListener("focusin", e =>{
			console.debug("focusin@in-p");
			//フォーカスがあたると自身の位置にカーソルを移動
			caretMove(this);
		});
		this.addEventListener("keydown", e =>{
			// e.stopImmediatePropagation();//親へ伝える必要がある(キーダウン時)
			// e.preventDefault();
			//TODO Backspace, Deleteはどうする？
			this.typ = true;
			//IME入力中はこの要素のみで処理
			if(e.isComposing||e.keyCode === 229||e.key == "Process"){
				imeOn = true;
				this.className = "FW";
			}
			else{
				imeOn = false;
				this.removeAttribute("class");
			}
			const se = getSelection();
			console.debug("keydown@in-p_event: ", e
			,"/e.key: ", e.key
			,"/e.key: ", e.code
			,"/isComposing:", e.isComposing
			,"/se.focusNode:", se.focusNode
			,"/se.focusOffset", se.focusOffset
			,"/se.focusNode.className", se.focusNode.className
			// ,"/se.focusNode.innerHTML", se.focusNode.innerHTML
			,"/se.focusNode.contenteditable", se.focusNode.isContentEditable
			,"/se.focusNode.parentNode.className", se.focusNode.parentElement.className
			,"/se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
			// ,"/se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
			// , "/se.focusNode.textContent.length", se.focusNode.textContent.length
			);
		});
		this.addEventListener("compositionstart" , e =>{
			//IME入力中はこの要素のみで処理
			e.stopImmediatePropagation();
		});
		this.addEventListener("compositionend" , e =>{
			//IME入力中はこの要素のみで処理
			e.stopImmediatePropagation();
			console.debug("compositionend@in-p_event");
			sets(this, e.data);
			this.typ = false;
		});
		this.addEventListener("beforeinput", e =>{
			const se = getSelection();
			console.debug("beforeinput@in-p_event: ", e
			,"e.key: ", e.key
			,"e.key: ", e.code
			,"isComposing:", e.isComposing
			,"inP.selectionStart:", inP.selectionStart
			// ,"CaretPos", getCaretPosition()
			,"inP.textContent", inP.textContent
			,"inP.textContent.length", inP.textContent.length
			,"se.focusNode:", se.focusNode
			,"se.focusOffset", se.focusOffset
			,"se.focusNode.className", se.focusNode.className
			// ," / se.focusNode.innerHTML", se.focusNode.innerHTML
			,"se.focusNode.contenteditable", se.focusNode.isContentEditable
			,"se.focusNode.parentNode.className", se.focusNode.parentElement.className
			,"se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
			// ," / se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
			// , " / se.focusNode.textContent.length", se.focusNode.textContent.length
			// ,"typ.firstChild.innerHTML", typ.firstChild.innerHTML
			);
			if(!this.typ){
				console.debug("NoTyp");
				e.preventDefault();
			}
			else if(e.inputType == "insertText"){
				e.preventDefault();
				sets(this, e.data);
				// caretMove(this, caretOffsetY);
			}
			//改行時
			else if(e.inputType == "insertParagraph"){
				e.preventDefault();
				sets(this, "\n", "B");
				// caretMove(this, caretOffsetY);
			}
		});
		this.addEventListener("input", e => {
			// e.stopImmediatePropagation();
			const se = getSelection();
			console.debug("input@in-p_event: ", e
			,"/e.key: ", e.key
			,"/e.key: ", e.code
			,"/isComposing:", e.isComposing
			,"/se.focusNode:", se.focusNode
			,"/se.focusOffset", se.focusOffset
			,"/se.focusNode.className", se.focusNode.className
			// ,"/se.focusNode.innerHTML", se.focusNode.innerHTML
			,"/se.focusNode.contenteditable", se.focusNode.isContentEditable
			,"/se.focusNode.parentNode.className", se.focusNode.parentElement.className
			,"/se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
			// ,"/se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
			// , "/se.focusNode.textContent.length", se.focusNode.textContent.length
			);
			// caretMove(se, -caretOffsetY);
		});
		this.addEventListener("keyup", e =>{
			// e.stopImmediatePropagation();
			// e.preventDefault();
			this.typ = false;
			//IME入力中はこの要素のみで処理
			if(e.isComposing||e.keyCode === 229||e.key == "Process"){
				// e.stopImmediatePropagation();
				if(!imeOn) {
					imeOn = true;
				}
				else imeOn = false;
			}
		});
		// this.focus();
	}
}
// https://ja.javascript.info/custom-elements Custom element(カスタム要素) の名前はハイフン - を含まなければいけません
customElements.define('in-p', CustomInput);

export function InitInPSetEvent() {
	let moveCaret = false;

	// const inPX = inP.getClientRects()[0].x;
	// const inPY = inP.getClientRects()[0].y;
	// console.debug("inPX", inPX, "inPY", inPY, inP.getClientRects()[0]);

	//引数で与えられた要素の次にin-pを作る
	const makeAfterInp = (el) => {
		console.debug("makeAfterInp:", el);
		//要素がないなら、inPの子要素の先頭に作る
		const s = document.createElement("in-p")
		if (el == null){
			inP.prepend(s);
		}else{
			el.after(s);
		}
		inP.contentEditable = false;
		s.focus();
		// if(se.focusNode.nodeType == Node.TEXT_NODE) caretMove(s);
		// else caretMove(s);
	};

	// setInP(inP);
	console.log("InitInPSetEvent");

	inP.addEventListener("focusout", e => {
		setTimeout(() => {
			console.debug("event@inPfocusout:", document.activeElement);
			if(document.activeElement.id == "inP" || document.activeElement.nodeName == "IN-P"){
			}else{
				inP.contentEditable = true;
				caretEle.style.display = "none";
			}
		}, 100);
	});
	inP.addEventListener("click", e => {
		const se = getSelection();
		console.debug("event@inPclick:", se.focusNode);
		// const range = document.createRange();
		// range.setStart(s, 0);
		// range.setEnd(s, 0);
		// se.removeAllRanges();
		// se.addRange(range);
		if(se.focusNode.nodeType == Node.TEXT_NODE){
			makeAfterInp(se.focusNode.parentElement);
		}else{
			makeAfterInp(inP.lastChild);
		}
		// caretEle.style.animation = "flash 0.8s linear infinite";
		caretEle.style.display = "block";
		// debugger;
	});
	// https://www.it-the-best.com/entry/javascript-snippet-outrangeclick
	// https://qiita.com/mabots/items/74c21ebcedf0004f7fb5#fn2
	// 指定要素外のクリックイベント
	// document.addEventListener("click", e => {
	// 	if(e.target.closest("#"+inP.id) == null){
	// 		inP.contentEditable = true;caretEle.style.display = "none";}
	// });
	// https://github.com/RobertWHurst/KeyboardJS
	// https://github.com/RobertWHurst/Keystrokes
	// https://www.google.co.jp/search?q=%22chromium%22+capture+input+method+editor+key&ei=QdnUY8iuDpay2roPsea3-AQ&ved=0ahUKEwiI066A6en8AhUWmVYBHTHzDU8Q4dUDCA8&uact=5&oq=%22chromium%22+capture+input+method+editor+key&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQogQyBQgAEKIEMgoIABDxBBAeEKIEMgUIABCiBDoKCAAQRxDWBBCwA0oECEEYAEoECEYYAFDzC1jOEmDnFGgBcAF4AIABZIgBuwGSAQMxLjGYAQCgAQHIAQrAAQE&sclient=gws-wiz-serp
	// https://developer.chrome.com/docs/extensions/reference/input_ime/
	// https://stackoverflow.com/questions/11392470/detect-if-capslock-is-down
	// https://unixpapa.com/js/key.html
	// https://stackoverflow.com/questions/39016292/keydown-event-is-not-fired-for-capslock-in-mac
	// https://aruhito.net/2021-12-04-note-change-ime-with-only-capslock/
	// https://dulunoj.com/2021/01/02/ime%E3%81%AE%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%AA%E3%83%95%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88%EF%BC%8Bcapslock%EF%BC%8Bus%E9%85%8D%E5%88%97%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E5%95%8F/
	inP.addEventListener('keydown', e => {
		const se = getSelection();

		console.log("keydown@inp_event: ", e
		,"e.key: ", e.key
		,"e.key: ", e.code
		,"isComposing:", e.isComposing
		,"inP.firstChild:", inP.firstChild
		,"inP.lastChild:", inP.lastChild
		,"inP.selectionStart:", inP.selectionStart
		,"inP.textContent", inP.textContent
		,"inP.textContent.length", inP.textContent.length
		,"se.focusNode:", se.focusNode
		,"se.focusOffset", se.focusOffset
		,"se.focusNode.className", se.focusNode.className
		// ," / se.focusNode.innerHTML", se.focusNode.innerHTML
		,"se.focusNode.contenteditable", se.focusNode.isContentEditable
		,"se.focusNode.parentNode.className", se.focusNode.parentElement.className
		,"se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
		// ," / se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
		// , " / se.focusNode.textContent.length", se.focusNode.textContent.length
		);

		// https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
		// https://stackoverflow.com/questions/44617545/moving-an-element-in-js
		// https://www.softel.co.jp/blogs/tech/archives/3049
		// https://qiita.com/18kondo/items/3c101d66f7efc4bbe57b
		// https://lab.syncer.jp/Web/JavaScript/Snippet/16/
		if(37 <= e.keyCode && e.keyCode <= 40 || !(e.isComposing||e.keyCode === 229||e.key == "Process") && (e.code == "Backspace" || e.code == "Delete")){
			caretEle.style.animation = "";
			// 最初の子要素がse.focusNode(=in-pにフォーカス時)一致してる時、さらに左に移動する動き(ArrowLeftとBackspace)を禁止。
			// 最後の子要素がse.focusNode(=in-pにフォーカス時)一致してる時、さらに右に移動する動き(ArrowRightとDelete)を禁止。
			if(moveCaret || (inP.firstChild === se.focusNode && e.keyCode == 37) || (inP.lastChild === se.focusNode && (e.keyCode == 39 || e.code == "Delete") )){
				console.debug("inP.contentEditable", inP.contentEditable);
				e.preventDefault();
				// debugger;
			}else{
				moveCaret = true;
				console.debug("inP.contentEditable", inP.contentEditable);
				if(inP.contentEditable == "false"){
					inP.contentEditable = true;
					inP.focus();
				}
				// console.debug("move or delete");
				// if(se.focusNode.nodeType == Node.TEXT_NODE) caretMove(se.focusNode.parentElement, 0);
				// else caretMove(se.focusNode, caretOffsetY);
				// if(se.focusNode.nodeType == Node.TEXT_NODE) caretMove(se.focusNode.parentElement, -3);
				if(se.focusNode.nodeType === Node.TEXT_NODE && (37 <= e.keyCode && e.keyCode <= 40) && e.repeat) caretMove(se);
				moveCaret = false;
			}
		}else if(e.code == "CapsLock"|| e.code == "Backquote"){
			// inP.contentEditable = false;
			// setTimeout(() =>{
			// 	inP.contentEditable = false;
			// 	console.debug("IMEToggle");
			// }, 1500);
		// } else if(!e.isComposing && e.keyCode != 229 && e.key != "Process"){
		// 	inP.contentEditable = false;
		// 	// let s = document.createElement("in-p");
		// 	// se.focusNode.parentNode.append(s);
		// 	// s.focus();
		}
		else{
			// inP.contentEditable = false;

			// let s = document.createElement("in-p");
			// se.focusNode.parentNode.append(s);
			// s.focus();
		}
		nowChar(e, se);
	});
	inP.addEventListener('compositionstart', e => {
		const se = getSelection();

		console.log("compositionstart@event: ", e
		,"e.key: ", e.key
		,"e.key: ", e.code
		,"isComposing:", e.isComposing
		,"inP.selectionStart:", inP.selectionStart
		,"inP.textContent", inP.textContent
		,"inP.textContent.length", inP.textContent.length
		,"se.focusNode:", se.focusNode
		,"se.focusOffset", se.focusOffset
		,"se.focusNode.className", se.focusNode.className
		// ," / se.focusNode.innerHTML", se.focusNode.innerHTML
		,"se.focusNode.contenteditable", se.focusNode.isContentEditable
		,"se.focusNode.parentNode.className", se.focusNode.parentElement.className
		,"se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
		// ," / se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
		// , " / se.focusNode.textContent.length", se.focusNode.textContent.length
		);

		// inP.contentEditable = false;

		// if(e.key == "Process" || e.keyCode == 229 ){
		// 		if(se.focusNode.nodeType != Node.TEXT_NODE){
		// 			let s = document.createElement("in-p");
		// 			console.log(s);
		// 			inP.appendChild(s);
		// 			s.focus();
		// 		}
		// 	}else{
		// 		if(se.focusNode.nodeType == Node.TEXT_NODE){
		// 			if(se.focusNode.parentNode === inP.lastChild){
		// 				let s = document.createElement("in-p");
		// 				console.log(s);
		// 				inP.appendChild(s);
		// 				s.focus();
		// 			}
		// 		}else{
		// 			if(se.focusNode === inP.lastChild){
		// 				let s = document.createElement("in-p");
		// 				console.log(s);
		// 				inP.appendChild(s);
		// 				// s.focus();
		// 			}
		// 		}
		// 	}
		// }
	});
	inP.addEventListener("input", e => {
		const se = getSelection();

		console.log("input@inp_event: ", e
		,"e.key: ", e.key
		,"e.key: ", e.code
		,"isComposing:", e.isComposing
		,"inP.selectionStart:", inP.selectionStart
		,"inP.textContent", inP.textContent
		,"inP.textContent.length", inP.textContent.length
		,"se.focusNode:", se.focusNode
		,"se.focusOffset", se.focusOffset
		,"se.focusNode.className", se.focusNode.className
		// ," / se.focusNode.innerHTML", se.focusNode.innerHTML
		,"se.focusNode.contenteditable", se.focusNode.isContentEditable
		,"se.focusNode.parentNode.className", se.focusNode.parentElement.className
		,"se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
		// ," / se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
		// , " / se.focusNode.textContent.length", se.focusNode.textContent.length
		);
		// inP.contentEditable = false;
		// https://developer.mozilla.org/ja/docs/Web/API/Element/tagName
		if(inP.firstElementChild == null || inP.firstElementChild.tagName == "BR"){
			//全部削除された後、初期状態へ
			inP.innerHTML = "";
			// inP.innerHTML = "<span>#x200B</span>";
			// const range = document.createRange();
			// range.setStart(s.firstChild, 1);
			// range.setEnd(s.firstChild, 1);
			// const se = getSelection();
			// se.removeAllRanges();
			// se.addRange(range);
		}
		// debugger;
		// keydownで削除を止めたのでfirstChildがなくなる状態は発生しないはず…
		if(e.inputType == "deleteContentForward"){
			//子要素がないなら
			if(inP.firstChild == null) makeAfterInp(null);
		}else if(e.inputType == "deleteContentBackward"){
			//子要素があるかつ現在いる要素でテキストにフォーカスしてる(=現在いる要素がin-pでない)
			if(se.focusNode.nodeType == Node.TEXT_NODE) makeAfterInp(se.focusNode.parentElement);
		}else if(e.inputType == "insertCompositionText"){
		}
	});
	inP.addEventListener("compositionend", e =>{
		console.debug("compositionend@event");
		// inP.contentEditable = false;
	});
	// inP.addEventListener("keypress", e =>{
	// 	console.log("keypress@event: ", e
	// 	,"e.key: ", e.key
	// 	,"e.key: ", e.code
	// 	,"isComposing:", e.isComposing);
	// });
	inP.addEventListener('keyup', e => {
		const se = getSelection();
		console.log("keyup@event: ", e
		,"e.key: ", e.key
		,"e.key: ", e.code
		,"isComposing:", e.isComposing
		,"inP.selectionStart:", inP.selectionStart
		,"inP.textContent", inP.textContent
		,"inP.textContent.length", inP.textContent.length
		,"se.focusNode:", se.focusNode
		,"se.focusOffset", se.focusOffset
		,"se.focusNode.className", se.focusNode.className
		// ," / se.focusNode.innerHTML", se.focusNode.innerHTML
		,"se.focusNode.contenteditable", se.focusNode.isContentEditable
		,"se.focusNode.parentNode.className", se.focusNode.parentElement.className
		,"se.focusNode.parentNode.nextSibling", se.focusNode.parentNode.nextSibling
		// ," / se.focusNode.parentNode.textContent", se.focusNode.parentElement.textContent
		// , " / se.focusNode.textContent.length", se.focusNode.textContent.length
		);
		// debugger;
		// inP.contentEditable = false;
		caretEle.style.animation = "flash 0.8s linear infinite";
		if(se.focusNode.nodeType == Node.TEXT_NODE) caretMove(se);
		else caretMove(se.focusNode);

		if(e.isComposing || e.keyCode == 229 || e.key == "Process"){
			if(!imeOn) imeOn = true;
		}else{
			if(imeOn) imeOn = false;
			//カーソル移動後(シフトキーによる要素選択時はなにもしない)
			if( 37 <= e.keyCode && e.keyCode <= 40 && !e.shiftKey || e.code == "Backspace" ||  e.code == "Delete"){
				console.debug("first:", inP.firstChild === se.focusNode.parentNode, "last:", inP.lastChild === se.focusNode.parentNode)
				//最初の子要素の先頭にいる or 子要素がない
				if(se.focusOffset == 0 && ( inP.firstChild === se.focusNode.parentNode) || inP.firstChild == null) makeAfterInp(null);
				//最後の子要素にいる
				// else if(inP.lastChild === se.focusNode.parentNode) makeAfterInp(inP.lastChild);
				//最後の子要素と最初の子要素にいて、現在いる要素がin-pの時
				else if(inP.firstChild === se.focusNode || inP.lastChild === se.focusNode){
				//それ以外、最初と最後以外の子要素なら
				}else{
					if(se.focusNode.nodeType == Node.TEXT_NODE){
						makeAfterInp(se.focusNode.parentElement);
					}else{
						makeAfterInp(se.focusNode);
					}
				}
			}
		}

		if(preimeOn != imeOn){
			console.log("changeCaretWidth", imeOn);
			preimeOn = imeOn;
			if(imeOn) caretEle.style.width = caretIMEWidth + "px";
			else caretEle.style.width = caretWidth + "px";
		}
	});
}