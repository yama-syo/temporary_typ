import {setKeyPosition} from "./setKeyPosition";
import {setKeys} from "./keyDownInfo";

export class keyboard_info {
	// key情報
	getKeyInfo = null;//関数（動的インポートする）
	keyInfo = {};

    keyImgEleSet = (src) => {
        // console.log(src);
        return new Promise((res, rej) => {
			let el = document.getElementById("keyV");
			if(src == undefined){
				res(el);
			}else{
				el.onload = () => {
					// https://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-event-listeners-of-a-dom-object
					//イベントリスナー全削除(無名関数を消すため)
					// ele.replaceWith(ele.cloneNode(true));
					el.replaceWith(el.cloneNode(false));
					res(document.getElementById(el.id));
				}
				el.onerror = (error) => {
					rej(error);
				}
				el.src = src;
			}
        });
    };

	keyImgEle =  document.getElementById("keyV");
	keyE = document.getElementById("keyV");

	//構築終了をクラス外に伝える
	settingsFin;
	// settingsFin =  ( () => {return new Promise((res) => {
	// 	setTimeout(() => res("1500"), 1500);
	// 	});
	// })();

	historyKey = "key0";
	constructor(){
		this.keyE.addEventListener("load", e => {
			this.settings();
			//customeven発行
		});

		this.settingsFin = (async() => {
			document.getElementById("keyC").addEventListener("change", e => {
				const file = keyI.files[0];
				const reader = new FileReader();
				if (file.size * 1.5 >= 5000008) {alert("fileSizeOver");return false;}
				reader.addEventListener("load", () => {
					try {this.settings(JSON.parse(reader.result));//1:ファイルからの新しい設定とすでにセットされた画像
					} catch (err) {alert(err);}
				});
				if (file) reader.readAsText(file);
			});

			document.getElementById("keyI").addEventListener("change", e => {
				const file = keyI.files[0];
				const reader = new FileReader();
				if (file * 1.5 >= 5000008) {alert("fileSizeOver");return false;}
				reader.addEventListener("load", () => {
					this.historyKey = "key" + (Number(historyKey.slice(3)) + 1);
					this.keyE.src = reader.result;//2:ファイルからの新しい画像と画像から作成される設定
					localStorage.setItem(this.historyKey + ".img", reader.result);
				});
				if (file) reader.readAsDataURL(file);
			});

			document.querySelector(".keyInfo").addEventListener("click", ()=>{
				console.log(".keyInfo:click");
				this.upDateKeyInfo();
			});

			if(localStorage.getItem("history") != null){
				this.historyKey = localStorage.getItem("history");
			}
			historyKeyI = localStorage.getItem(this.historyKey + ".img");
			historyKeyC = localStorage.getItem(this.historyKey + ".json");
			//履歴からキーボードの設定を行う
			if (historyKeyI) {
				// const keyboardImg = localStorage.getItem(historyKeyI);
				try {
					this.settings(JSON.parse(historyKeyC));//4:履歴からの画像と履歴からの設定
				} catch (err) {// alert(err);
					this.keyE.src = historyKeyI;//3:履歴からの画像と画像から作成される設定
				}
			}else{
				this.historyKey = "key0"
			}
		})();
	}

	getSettingFin(){
		return this.settingsFin;
	}
	settings(newKeyInfo){
		(async() => {
			//画像があり、引数に設定がないなら画像から設定を作る
			// https://zenn.dev/hakshu/articles/check-js-object-is-empty
			if(this.keyImgEle.src.length > 0 && (newKeyInfo == undefined || (Object.keys(newKeyInfo).length == 0 && newKeyInfo.constructor === Object))) {
				//キーボード画像からキー情報などを解析するjsを動的インポートする
				// https://qiita.com/tonkotsuboy_com/items/f672de5fdd402be6f065
				// https://ja.javascript.info/import-export
				if(this.getKeyInfo == null) this.getKeyInfo = (await import("./keyboard_detect")).getKeyInfo;
				newKeyInfo = await this.getKeyInfo(src);
			}
			this.upDateKeyInfo(newKeyInfo);
			setKeys(setKeyPosition(this.keyImgEle, this.keyInfo));
			console.log("key[0]_keys:", this.keyInfo[0].keys);

			if(src === null ||(src == undefined && this.keyImgEle.src == "")) {
				alert("画像がセットされていない");
				return;
			}else if(src !== undefined ){
				// 2,3,4:eleLoad
				// 2:overWrite
				// 3,4:empty
				// https://zenn.dev/hakshu/articles/check-js-object-is-empty
				if((Object.keys(this.keyInfo).length > 0 && this.keyInfo.constructor === Object)) {
					debugger;
					localStorage.setItem("key_old.json", JSON.stringify(this.keyInfo));
				}
				if(this.getKeyInfo == null){
					//キーボード画像からキー情報などを解析するjsを動的インポートする
					// https://qiita.com/tonkotsuboy_com/items/f672de5fdd402be6f065
					// https://ja.javascript.info/import-export
					this.getKeyInfo = (await import("./keyboard_detect")).getKeyInfo;
				}
				this.keyImgEle = await this.keyImgEleSet(src);
				this.keyInfo = await this.getKeyInfo(src);
				this.upDateKeyInfo(await this.getKeyInfo(src));
			}
			//1,2,3,4
			setKeys(setKeyPosition(this.keyImgEle, this.keyInfo));
			this.upDateKeyInfo(this.keyInfo);
			console.log("4_keys_shift_nul:", this.keyInfo[0].keys.shift === null);
		})();
	}
}
