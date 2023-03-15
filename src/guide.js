import spaceImg from '../img/space_n.png';
import returnImg from '../img/return_n.png';

// import {setCharIndex} from "./keyDownInfo"

let guideCss = document.createElement('style');
guideCss.id = "guideC"
document.head.appendChild(guideCss);
// let styleSheet = addCss.sheet;
export let guideIndex = [];//表示文字数に対応したguide文字数

export function initGuide(w2imeK) {
	// debugger;
	return makeGuide(getTypText(), w2imeK);
}

export function getTypText() {
	let inTypText = `あかちょょちかあ\n‐QＱWＷyｙZＺ@＠BＢCＣEＥAＡBＢCＣDＤEＥQＱWＷyｙZＺ@＠    ⎵⎵    \\    AAAZAAAAAAAAAA\n‐QＱEＥAＡBＢCＣDＤEＥQＱWＷyｙZＺ@＠あちょ`;
	inTypText = inTypText.replaceAll("\r\n", "\n");
	// https://qiita.com/sounisi5011/items/aa2d747322aad4850fe7
	inTypText = [...inTypText];
	return inTypText;
}

export function makeGuide(inTypText, w2imeK) {
	let guide = document.getElementById("guide");

	// let guideStr = [];
	let styleArr = [];

	let fragment = document.createDocumentFragment();
	let divCnt = -1;
	for (let cnt = 0; cnt < inTypText.length;cnt++){
		divCnt++;
		const nowChar = inTypText[cnt];

		console.log("inTypText["+cnt+"]:", nowChar
		,"inTypText.length:", inTypText.length
		, ( 0 < nowChar.codePointAt() && nowChar.codePointAt() < 0x2000)
		);

		const guideEle = document.createElement('div');
		guideEle.className = "Gu";

		const guideTop = document.createElement('div');
		guideTop.className = "To";
		// const guideColor = document.createElement('div');

		guideEle.appendChild(guideTop);
		fragment.appendChild(guideEle);
		// guideBottom.textContent = guideStr[cnt][1];
		// guideTop.textContent = guideStr[cnt][0].charAt(0);

		if(nowChar == " " || nowChar == "\n"){
			// css.insertRule(`#typ>div>div:nth-of-type(${divCnt}){font-feature-settings:"hwid";}`, ruleIndex);
			const img = document.createElement('img');
			if(nowChar == " ") {
				guideTop.textContent = " ";
				img.src = spaceImg;
				// img.dataset.c = " ";
			}
			else {
				guideTop.textContent = " \n";
				img.src = returnImg;
				// img.dataset.c = "Enter";
				fragment.appendChild(document.createElement("br"))
			}
			img.className = "Bo";
			guideEle.appendChild(img);
			guideIndex.push([divCnt]);
			guideTop.classList.add("g"+divCnt);
			continue;
		}

		// const found = w2imeK.findIndex( ele => {
		//     console.log("ele[0]:", ele
		//     , "/ele.length:", ele[0].length
		//     ,"/inTypText.sub:", inTypText.slice(cnt, cnt + ele[0].length).join('')
		// 	,inTypText.slice(cnt, cnt + ele[0].length).join('') === ele[0]
		//     );
		//     return inTypText.slice(cnt, cnt + ele[0].length).join('') === ele[0];
		// });
		let found = -1;
		console.log("w2imeK", w2imeK);
		if(w2imeK.get("arr") != undefined){
			found = w2imeK.get("arr").findIndex( v => inTypText.slice(cnt, cnt + v[0].length).join('') == v[0].join(''));
		}
		// const found = w2imeK.get(inTypText[cnt])
		const guideBottom = document.createElement('div');
		guideBottom.className = "Bo";
		guideEle.appendChild(guideBottom);

		if (found == -1) {
			guideTop.textContent = nowChar;
			guideBottom.textContent = nowChar;
			guideBottom.classList.add("g"+divCnt);
			// guideBottom.dataset.c = nowChar;
			guideIndex.push([divCnt]);
			// https://qiita.com/_sobataro/items/47989ee4b573e0c2adfc
			// https://note.kiriukun.com/entry/20180925-charcodeat-vs-codepointat
			if(0 < nowChar.codePointAt() && nowChar.codePointAt() < 0x2000){
				// css.insertRule(`#typ>div>div:nth-of-type(${divCnt}){font-feature-settings:"hwid";}`, ruleIndex);
			}else{
				guideEle.classList.add("FW");
				// https://caniuse.com/css-nth-child-of
				// ↑のCSSが使える場合のソース
				// styleArr.push(`#inP>in-p:nth-child(${cnt+1} of .c){font-feature-settings:"fwid";}`);
				styleArr.push(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
				// styleSheet.insertRule(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
				// styleSheet.insertRule(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
				// css.insertRule(`#inP>div:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`, ruleIndex);
			}
		}
		else{
			//TODO Now IME使用する文字列のガイド文字列作成および表示位置に対してのガイド文字列の位置
			//TODO 表示されている文字列が改行している時、何文字目か検出、検出した文字数*行数の文字の位置とそのひとつ前の文字の位置が不一致なことを確認。違えば改行までの文字数を一文字減らす。(paddingで右側を縮める)
			console.log(w2imeK.get("arr")[found][0]);

			const ik = w2imeK.get("arr")[found]
			guideTop.classList.add("FW");
			//表示文字が1文字以上ならガイドの最初の文字を右寄せ
			if(ik[0].length > 1) guideBottom.style.textAlign = "right";

			// guideBottom.classList.add("HW");
			let v;
			let gn;
			let n;
			//先頭の表示文字に対するガイドの割り当て文字数
			let sn = Math.trunc(ik[1].length / ik[0].length);
			//ガイドの文字数が表示数の文字数で割り切れない
			if(ik[0].length > 2 && ik[1].length % ik[0].length != 0){
				//  最後の表示文字に対するガイドの仮の割り当て文字数：先頭の表示文字を削った表示文字数を先頭の表示文字に対するガイドの文字数、引いた残りのガイド文字数で割る
				let ln = (ik[1].length - sn) / (ik[0].length - 1);
				// 表示文字数を先頭と最後を削った表示文字数に更新
				v = ik[0].length - 2;
				// ガイド文字数を先頭分と最後の分を削ったガイド文字数に更新
				gn = ik[1].length - sn - ln;
				//先頭と最後を除いた表示文字1文字に対するガイド文字数
				n = gn / v;
			}
			console.debug("guide@StrLen:", ik[1].length, "guide@firstGuideStrLen:", sn, "GuideStrLen:", n);
			guideTop.classList.add("FW");
			styleArr.push(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
			// styleSheet.insertRule(`#inP>span:nth-of-type(${cnt+1}){font-feature-settings:"fwid";}`);
			guideTop.textContent = ik[0][0];

			let g = [];
			let j = 0;
			for(const end = j + sn; j < end; j++){
				console.debug("guide@StrLen:", ik[1].length, "guide@firstGuideStrLen:", sn, "GuideStrLen:", n);
				let s = document.createElement("span");
				s.textContent = ik[1][j];
				g.push(divCnt);
				s.className = "g"+(divCnt++);
				guideBottom.appendChild(s);
			}
			guideIndex.push(g);
			for(let i = 1;i < ik[0].length;i++){
				//表示文字を次の文字へ
				cnt++;
				g = [];
				let el = document.createElement('div');
				el.className = "Gu";
				let elT = document.createElement('div');
				elT.className = "To FW";
				styleArr.push(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
				// styleSheet.insertRule(`#inP>span:nth-of-type(${cnt+1}){font-feature-settings:"fwid";}`);
				elT.textContent = ik[0][i];
				// const guideColor = document.createElement('div');
				el.appendChild(elT);
				let elB = document.createElement('div');
				elB.className = "Bo";
				el.appendChild(elB);
				fragment.appendChild(el);
				//i番目の表示文字に、ガイドの文字を割り当て
				let end = 0;
				//最後の表示文字なら
				if(i+1 == ik[0].length){
					//表示文字を次の文字へ
					// cnt += i;
					elB.style.textAlign = "left";
					//最後の表示文字に対して、残ったガイドの文字を割り当てる
					end = ik[1].length;
				}else{
					//i番目の表示文字に対して、ガイド文字数を前回のガイド文字数から+n数分割り当て
					end = n + j;
				}
				for(; j < end; j++){
					console.debug("guide@StrLen:", ik[1].length, "guide@firstGuideStrLen:", sn, "GuideStrLen:", n);
					let s = document.createElement("span");
					s.textContent = ik[1][j];
					g.push(divCnt);
					s.className = "g"+(divCnt++);
					elB.appendChild(s);
				}
				guideIndex.push(g);
				//ガイドの文字数が残っている表示数の文字数で割り切れない
				if(v % n != 0){
					// 表示文字数を残っている表示文字数に更新
					v = v - 1;
					// ガイド文字数を残っているガイド文字数に更新
					gn = gn - n;
					//次のループで使う、i+1番目の表示文字に割り当てるガイド文字数
					n = v / gn;
				}
			}
			divCnt--;

			// if(ik[1].length > 1){

			// 	for(let i=0; i < ik[1].length; i++){
			// 		let d = document.createElement("span");
			// 		d.textContent = ik[1][i];
			// 		guideBottom.appendChild(d);
			// 		d.className = "g"+divCnt;
			// 		if(i < ik[0].length){
			// 			styleArr.push(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
			// 			// styleSheet.insertRule(`#inP>span:nth-of-type(${cnt+1}){font-feature-settings:"fwid";}`);
			// 			let d = document.createElement("span");
			// 			d.textContent = inTypText[ cnt++ ];
			// 			// d.textContent = inTypText[ cnt + i ];
			// 			guideTop.appendChild(d);
			// 			let a = [];
			// 			// if((i+1) == ik[0].length) a.push(divCnt + 1);
			// 			if((i+1) == ik[0].length){
			// 				for(let j=i; j < ik[1].length; j++){
			// 					a.push(divCnt + j - i);
			// 				}
			// 			}else{
			// 				a.push(divCnt)
			// 			}
			// 			g.push(a);
			// 		}
			// 		divCnt++;
			// 	}
			// 	guideIndex.push(...g);
			// 	cnt--;
			// 	divCnt--;
			// 	// divCnt += ik[1].length - 1;
			// 	// cnt += ik[0].length - 1;
			// }else{
			// 	guideEle.classList.add("FW");
			// 	styleArr.push(`#inP>span:nth-of-type(${cnt + 1}){font-feature-settings:"fwid";}`);
			// 	// styleSheet.insertRule(`#inP>span:nth-of-type(${cnt+1}){font-feature-settings:"fwid";}`);
			// 	guideTop.textContent = ik[0];
			// 	guideBottom.textContent = ik[1];
			// 	guideBottom.classList.add("g"+divCnt);
			// 	guideIndex.push([divCnt]);
			// }
		}
	}
	guide.appendChild(fragment);
	guideCss.textContent = styleArr.join("\n");
	console.debug("guideIndex:", guideIndex);
	// setCharIndex(guideIndex);
}
