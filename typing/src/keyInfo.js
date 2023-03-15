/*<div id="keyboard">
<style></style>
<details open><summary>キーボード画像</summary>
	<div><img src="" id="keyV"></div>
</details>
<details><summary>キーボード設定</summary>
	<label for="keyIF">キー配列画像(PNG/JPG)を選択
		<div><input type="file" id="keyIF" accept="image/jpeg, image/png"></div>
	</label>
	<label for="keyCF">キー配列設定(json)を選択
		<div><input type="file" id="keyCF" accept="application/json"></div>
	</label>
	<input type="button" class="keyI" value="keyInfo">
	<textarea id="keyI"></textarea>
	<input type="button" class="keyIme" value="keyIme">
	<textarea id="keyIme"></textarea>
	<input type="button" value="ForceDetectKey">
</details>
<details><summary>キーボード画像解析</summary>
	<details><summary id="opencv">OpenCV.js is loading...</summary><div id="cvInfo">OpenCV.js buildInfo</div></details>
	<div><canvas id="keyVI"></canvas></div>
	<div><canvas id="edge"></canvas></div>
	<div><canvas id="sEdge"></canvas></div>
	<div><canvas id="getArea"></canvas></div>
	<div><canvas id="key0"></canvas><canvas id="key1"></canvas><canvas id="key2"></canvas><canvas id="key3"></canvas><canvas id="key4"></canvas><canvas id="key5"></canvas></div>
</details>
<div>*/
// import {setKeySI} from "./keyDownInfo";
import {setKeyPosition} from "./setKeyPosition";
import { getImeKey } from "./setKeyStrInfo";

// import styles from "../css/keyInfo.css" assert { type: 'css' };
// const css = document.createElement('style');
// css.innerHTML = styles;
//keydown時変更するCSS
export let kdCss = new CSSStyleSheet();
//keyup時変更するCSS
export let kuCss = new CSSStyleSheet();
// shiftまたはimeを使用する時に扱うキーの情報をセット
export let keySI = {};

export class KeyInfo extends HTMLElement {
	// key情報
	getKI = null;//関数（動的インポートする）
	keyInfo = {};
	historyKey;
	keyV;
	keyI;
	shadow;
	keyIme;
	initF = false;

	setup = async(newKeyInfo) => {
		//HELP 構築終了をクラス外に伝える、カスタムイベントで実装
		if(!this.initF) return;
		//画像があり、引数に設定がないなら画像から設定を作る
		if(this.keyV.src.length == 0 || this.keyV.width == 0) {
			alert("キーボード画像が見つからない");
			// alert("画像がimg要素に読み込まれていない");
			return;
		}
		console.log(this.keyV.width);
		const tt = this.keyV.parentNode;
		// this.keyV(=this.keyV.parentNode.firstChild)を残して要素削除
		// https://freefielder.jp/blog/2015/09/javascript-remove-childnodes.html
		while(tt.firstChild != tt.lastChild){
			tt.removeChild(tt.lastChild);
		}
		// debugger;
		//初回起動終了かつキー設定がないならキー画像からキー設定を作成
		// https://zenn.dev/hakshu/articles/check-js-object-is-empty
		if((newKeyInfo == undefined || (newKeyInfo.constructor === Object && Object.keys(newKeyInfo).length == 0))) {
			//キーボード画像からキー情報などを解析するjsを動的インポートする
			// https://qiita.com/tonkotsuboy_com/items/f672de5fdd402be6f065
			// https://ja.javascript.info/import-export
			if(this.getKI == null) this.getKI = (await import("./keyDetect")).getKeyInfo;
			newKeyInfo = await this.getKI(this.keyV.src, this.canvaArr(), this.keyIme, this.shadow);//要素が持ってる画像URLから新しい設定を作成
		}
		//初回起動終了かつキー設定がないなら
		if(newKeyInfo.constructor === Object && Object.keys(newKeyInfo).length == 0){
			alert("キーボード画像からキーを検出できない");
			return;
		}
		//設定を更新
		this.upC(newKeyInfo);
		console.log(newKeyInfo);
		//キー設定から各キーの位置に画像(キー記号をclassでもっている要素)をセット、セット後、shiftまたはimeを使用する時に扱うキーの情報が出力されるので、その情報を入力キーを扱うところに渡す
		getImeKey(this.keyIme, this.keyInfo);
		//TODO setKeyPositionでリサイズ時キー位置だけ再計算
		keySI = setKeyPosition(this.keyV, this.keyInfo)
		console.log("key[0]_keys:", this.keyInfo[0].keys);
		// https://www.eisbahn.jp/yoichiro/2014/07/dispatch_event_from_web_components.html
		// debugger;
		this.dispatchEvent(new CustomEvent("setEnd"));
	};
	constructor(){
		super();
		//TODO shadowDOMなしにdocumnet.replaceSync()が使えれば、shadowDOMやめる
		// https://web-camp.io/magazine/archives/89515
		// https://zenn.dev/cigar/articles/textarea-variable-size
		// https://qiita.com/tsmd/items/fce7bf1f65f03239eef0
		// シャドウルートを生成
		this.shadow = this.attachShadow({mode: 'open'});
		const styleE = document.createElement('style');
		// *{box-sizing: border-box}
		styleE.textContent=`
		*,*::before,*::after {box-sizing: border-box}
		* {margin:0;padding:0}
		input,button,textarea,details {
			display: block;
			border: inherit;
			position: relative;
			width: 100%;
			font: inherit;
			text-align: center;
		}
		textarea{
			text-align: left;
			height: 40vh;
			resize: vertical;
		}
		/* https://code-kitchen.dev/html/details-summary/ */
		summary {
			display: block;
		}
		details[open]>summary::before{
			content: "▼";
		}
		details>summary::before{
			content: "▶"
		}

		details>div{
			position:relative;
		}
		label{
			/* --fs:0.8rem; */
			--fs:1.0rem;
			/* --fs:1.5rem; */
			/* --fs:2.0rem; */
			--fsB:calc(0.8 * var(--fs));
			display: inline-grid;
			grid-template-rows: 1fr 0.5fr;
			width: 45%;
			height: max-content;
			margin: 5px 0 10px 0;
			background-color: #7f9ccb;
			border-radius: 5px;
			border: 1px ridge black;
			font-size: var(--fs);
			text-align: center;
			place-items: center;
			/* align-items: center;
			justify-content: center; */
		}
		label>div{
			overflow: hidden;
			width: max-content;
		}
		/* https://www.d-grip.com/blog/seisaku/4661 */
		div>input{
			top: -4px;
			/* margin: 0 0 0 calc( -30px - var(--fsB) * 6.2 ); */
			margin: 0 0 0 calc( -25px - var(--fsB) * 6.7 );
			width:max-content;
			font-size: var(--fsB);
		}
		img~div{
			position: absolute;
			display: none;
		}
		div>img{
			width:100%;
		}`;
		// https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_shadow_DOM
		// https://neos21.net/blog/2022/06/26-01.html
		this.shadow.appendChild(styleE);
		// const keyB = document.createElement("div");
		// keyB.id = "keyboard";
		// this.id = "keyboard";
		const keyVD = document.createElement("details");
		keyVD.open = true;
		const keyVS = document.createElement("summary");
		keyVS.textContent = "キーボード画像"

		this.shadow.append(keyVD);
		keyVD.append(keyVS);
		// https://teratail.com/questions/298252

		const dv = document.createElement("div");
		this.keyV = document.createElement("img");
		this.setup.bind(this);
		// this.keyV.id = "keyV"
		//https://log.tkyisgk.com/addeventlistener-this
		//bindされたthis.setup()(このスコープ内で有効なbindされた後のupC())を使うため、無名関数から呼び出す。そのまま(click, this.upC)だとクラスにある純粋なupC()が登録される
		this.keyV.addEventListener("load", () => this.setup());//要素にある画像読み終わったら、画像から設定を作成

		keyVD.append(dv);
		dv.append(this.keyV);

		const keyC = document.createElement("details");
		const keyCS = document.createElement("summary");
		keyCS.textContent = "キーボード設定";
		this.shadow.append(keyC);
		keyC.append(keyCS);
		const keyIL = document.createElement("label");
		keyIL.textContent = "キー配列画像(PNG/JPG)を選択";
		keyIL.for = "keyIF";
		const d1 = document.createElement("div");
		const keyIF = document.createElement("input");
		keyIF.type = "file";
		keyIF.accept = "image/jpeg, image/png";
		keyIF.id = "keyIF";
		console.debug("input_file:", keyIF);
		keyIF.addEventListener("change", () => {
			const file = keyIF.files[0];
			const reader = new FileReader();
			if (file * 1.5 >= 5000008) {alert("fileSizeOver");return false;}
			reader.addEventListener("load", () => {
				let k;
				// FIX ファイルからの画像と現在セットされてる画像が一致したら(一致検出：ハッシュ)スキップする？
				// https://qiita.com/dojyorin/items/2fd99491f4b459f937a4
				// https://scrapbox.io/nwtgck/SHA256%E3%81%AE%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%82%92JavaScript%E3%81%AEWeb%E6%A8%99%E6%BA%96%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%A0%E3%81%91%E3%81%A7%E8%A8%88%E7%AE%97%E3%81%99%E3%82%8B
				for(let i = 0; i < 64; i++){
					k = "key" + i + ".img";
					if(localStorage.getItem(k) == null) {
						this.historyKey = k.slice(0, -4);
						break;
					}
				}
				this.keyV.src = reader.result;//1:ファイルからの新しい画像と画像から作成される設定
				localStorage.setItem("his", this.historyKey);
				localStorage.setItem(k, reader.result);
			});
			if (file) reader.readAsDataURL(file);
		});
		keyC.append(keyIL);
		keyIL.append(d1);
		d1.append(keyIF)

		const keyCL = document.createElement("label");
		keyCL.textContent = "キー配列設定(json)を選択";
		keyCL.for = "keyCF";
		const d2 = document.createElement("div");

		const keyCF = document.createElement("input");
		keyCF.type = "file";
		keyCF.accept = "application/json";
		keyCF.id = "keyCF";
		keyCF.addEventListener("change", () => {
			const file = this.files[0];
			const reader = new FileReader();
			if (file.size * 1.5 >= 5000008) {alert("fileSizeOver");return false;}
			reader.addEventListener("load", () => {
				try {this.setup(JSON.parse(reader.result));//2:ファイルからの新しい設定とすでにセットされた画像
				} catch (err) {alert(err);}
			});
			if (file) reader.readAsText(file);
		});
		keyC.append(keyCL);
		keyCL.append(d2);
		d2.append(keyCF);

		const keyIB = document.createElement("input");
		keyIB.type = "button";
		keyIB.value = "SetKeyInfo"
		//bindされたthisを使う
		this.upC.bind(this);
		keyIB.addEventListener("click", () => this.upC());
		this.keyI = document.createElement("textarea");
		this.keyI.id = "keyI";
		keyC.append(keyIB);
		keyC.append(this.keyI);

		const keyImeB = document.createElement("input");
		keyImeB.type = "button";
		keyImeB.value = "SetKeyIme"
		this.keyIme = document.createElement("textarea");
		this.keyIme.id = "keyIme";
		keyC.append(keyImeB);
		keyC.append(this.keyIme);
		keyImeB.addEventListener("click", () => this.setup(this.keyInfo));

		const keyDB = document.createElement("input");
		keyDB.type = "button";
		keyDB.value = "ForceDetectKey";
		keyDB.addEventListener("click", () => this.setup());
		keyC.append(keyDB);

		const cvE = document.createElement("details");
		let cvES= "<summary>キーボード画像解析</summary><details><summary id='opencv'>OpenCV.js is loading...</summary><div id='cvInfo'>OpenCV.js buildInfo</div></details><div><canvas id='keyVI'></canvas></div><div><canvas id='edge'></canvas></div><div><canvas id='sEdge'></canvas></div><div><canvas id='getArea'></canvas></div>";
		// for (let i = 0; i < 1; i++){
		// 	cvES += "<span><canvas class='key "+ i +"'></canvas></span>";
		// }
		cvE.innerHTML = `${cvES}`;

		this.shadow.append(cvE);

		// const keyA = document.createElement("details");
		// const keyAS = document.createElement("summary");
		// keyAS.textContent = "キーボード画像解析";
		// shadow.append(keyA);
		// keyA.append(keyAS);
		// const opcv = document.createElement("details");
		// const opcvs = document.createElement("summary");
		// opcvs.id = "opencv";
		// opcvs.textContent = "OpenCV.js is loading...";
		// keyA.append(opcv);
		// opcv.append(opcvs);
		// const opp1 = document.createElement("p");
		// opp1.textContent = "OpenCV.js buildInfo";
		// const opp2 = document.createElement("p");
		// opp2.id = "cvInfo";
		// opcv.append(opp1);
		// opcv.append(opp2);
	}

	connectedCallback(){
		// 要素接続後
		this.shadow.adoptedStyleSheets = [kdCss, kuCss];
		//設定読み込み開始
		if(localStorage.getItem("his") != null){
			this.historyKey = localStorage.getItem("his");
		}
		const historyKeyI = localStorage.getItem(this.historyKey + ".img");
		const historyKeyC = localStorage.getItem(this.historyKey + ".json");
		console.debug(this.historyKey, historyKeyI, historyKeyC);
		//履歴からキーボードの設定を行う
		if (historyKeyI) {
			if(historyKeyC != null){
				new Promise( res => {
					this.keyV.onload = () => {res();}
					this.keyV.src = historyKeyI;
				}).then( () => {
					this.initF = true;//初回起動終了
					this.setup(JSON.parse(historyKeyC));//3:履歴からの画像と履歴からの設定
				});
			}else{
				this.initF = true;//初回起動終了
				this.keyV.src = historyKeyI;//4:履歴からの画像と画像から作成される設定
			}
		}else{
			this.initF = true;//初回起動終了
			this.historyKey = "key0";
			localStorage.setItem("his", "key0");
		}
	}

	// https://meetup-jp.toast.com/364
	// https://www.webdesignleaves.com/pr/jquery/web-components-basic.html
	replaceCss(cssRuleStr, i){
		console.log("key-info_replaceCss:cssRuleStr", cssRuleStr);
		// https://laboradian.com/constructable-stylesheet-objects/
		// https://neos21.net/blog/2022/06/26-01.html
		if(i == 0){
			kdCss.replaceSync(cssRuleStr);
			// this.shadow.adoptedStyleSheets[i] = this.kdCss;
		}else{
			ksCss.replaceSync(cssRuleStr);
			// this.shadow.adoptedStyleSheets[i] = this.ksCss;
		}
	}

	// https://meetup-jp.toast.com/364
	canvaArr(){
		//FIX 並列数(canvaNum)をinput要素から取得
		const canvaNum = 1;
		this.shadow.querySelectorAll("canvas.key").forEach(el =>{
			this.shadow.lastChild.removeChild(el.parentNode);
		});
		let a = new Map([["key", []]]);
		// console.log(this.shadow.querySelectorAll("canvas"));
		// https://stackoverflow.com/questions/57813144/how-to-select-element-inside-open-shadow-dom-from-document
		this.shadow.querySelectorAll("canvas").forEach(el =>{
			console.log(el);
			a.set(el.id, el);
		});
		for (let i = 0; i < canvaNum; i++){
			const s = document.createElement("span");
			const c = document.createElement("canvas")
			c.classList.add("key", i);
			this.shadow.lastChild.appendChild(s);
			s.appendChild(c);
			a.get("key").push(c);
		}
		return a;
	}

	upC(newKeyInfo){
		//設定を履歴へ保存＋設定の更新＋更新された設定を履歴へ保存＋設定値の出力
		// console.log(this);
		if(newKeyInfo == undefined){
			//引数なしで呼ばれたら(テキストエリアの値があれば、テキストエリアの値と現在の設定をマージした)現在の設定のキー文字情報のみをテキストエリアに
			console.log(this.keyI.value);
			try {
				//キー情報がテキストエリアにあれば、テキストエリアにあるキー情報と現在設定値のキー情報を統合
				if(this.keyI.value.length > 8){
					//現在の設定を過去の履歴として保存
					if(Object.keys(this.keyInfo).length > 0) localStorage.setItem(this.historyKey+"_old.json", JSON.stringify(this.keyInfo));
					// テキストエリアの値と現在のキー情報をマージして現在設定を更新
					for( const [k, v] of Object.entries(JSON.parse(this.keyI.value))){
						if(Object.hasOwn(this.keyInfo, k)) Object.assign(this.keyInfo[k].keys, v.keys);
						else this.keyInfo[k] = v;
					}
					//現在の設定を履歴に保存
					localStorage.setItem(this.historyKey+".json", JSON.stringify(this.keyInfo));
					this.setup(this.keyInfo);
				}
			} catch (err) {
				alert(err);
			}
		}else if(newKeyInfo.constructor === Object){
			//引数に設定があるなら値を、設定を更新して、現在の設定のキー文字情報のみをテキストエリアに
			//現在の設定があれば、過去の履歴として保存
			if(Object.keys(this.keyInfo).length > 0) localStorage.setItem(this.historyKey+"_old.json", JSON.stringify(this.keyInfo));
			//現在の設定を引数の値で更新
			this.keyInfo = newKeyInfo;
			console.log(JSON.stringify(this.keyInfo, null , "\t"));
			//現在の設定を履歴に保存
			localStorage.setItem(this.historyKey+".json", JSON.stringify(newKeyInfo));
			//現在の設定のキー文字情報のみをテキストエリアに
			let o = {}
			for( const [k, v] of Object.entries(newKeyInfo)) {if(!isNaN(k)) {o[k] = {};o[k].keys = v.keys}};
			// for( const [k, v] of Object.entries(newKeyInfo)){console.log("v.keys", v.keys);if(!isNaN(k)) o[k] = {};o[k].keys = v.keys;}
			this.keyI.value = JSON.stringify(o, null, "    ");
		}
	}
}
