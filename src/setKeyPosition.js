import keyDown from "../img/keyDown.png";import keyNG from "../img/keyNG.png";import keyOK from "../img/keyOK.png";
// import keyDown1 from "../img/keyDown1.png";
// import keyDown2 from "../img/keyDown2.png";
// import keyDown3 from "../img/keyDown3.png";
// import keyDown4 from "../img/keyDown4.png";
import keySuggestion1 from "../img/keySuggestion1.png";import keySuggestion2 from "../img/keySuggestion2.png";import keySuggestion3 from "../img/keySuggestion3.png";import keySuggestion4 from "../img/keySuggestion4.png";

// function code2key(key, key2codeM ,code2keyM) {
//     if(key2codeM.has(key)) for (const v of key2codeM.get(key).values()) code2keyM.set(v, key);
//     else code2keyM.set(key, key);
// }
// function addClassKeyCode(key ,key2codeM, ele) {
//     if(key2codeM.has(key)) for (const v of key2codeM.get(key).values()) ele.classList.add(v);
// }

export function setKeyPosition(ele, keyInfo){
	//キーボードキー配置に画像を置く(OKKeyDown, NGKeyDown, SuggestKeyDown)
    console.log("setKeyPosition:start");
	let keyCheckImg = [keyDown, keyNG, keyOK];
    let keyCheckImgClass = ["KD", "KN", "KS"]
	let keySuggestions = [keySuggestion1, keySuggestion2, keySuggestion3, keySuggestion4];
    const widthRatio = ele.scrollWidth / keyInfo.width;
    const heightRatio = ele.scrollHeight / keyInfo.height;

    console.log("keyV_width:", ele.scrollWidth,"keyV_height:", ele.scrollHeight
    // ,"keyInfo.width:", keyInfo.width ,"keyInfo.height:", keyInfo.height
    ,"keyInfo:", keyInfo
    );
    let keySI = {s: new Map(), t: new Map(), o: new Map()};
    if( Object.hasOwn(keyInfo, "0") ){
        console.log("setKeyPosition:loopstart");
        let fg = document.createDocumentFragment();
        for (const [k, v] of Object.entries(keyInfo)) {
            // console.log("Key:", k,"value:", v ,isNaN(k));
            if(!isNaN(k)){
                //キーボード画像の大きさとキーボード画像の表示領域との縮尺度計算
                const sizeX =  widthRatio * v.view + "px";
                const sizeY =  heightRatio * v.view + "px";
                const startX = widthRatio * v.startX  + "px";
                const startY = heightRatio * v.startY + "px";
                // let found = getKey.t.findIndex(t => {
                //     // console.log(v.keys.key, i, t.some( tt => tt.test(v.keys.key)));
                //     //遅延評価？ return t.some( tt => tt.test(v.keys.key)は失敗する
                //     const r  = t.some( t1 => t1.test(v.keys.key));
                //     return r;
                //     for (const tt of t) {
                //         const ff = tt.test(v.keys.key);console.log(tt, tt.test(v.keys.key));
                //         // if(v.keys.key == "CapsLock") debugger;if(ff) return ff;
                //     }
                // });
                // console.log("v.keys.key", v.keys.key, found);
                if(Object.hasOwn(v.keys, "ti")){
                    //toggleIMEキー
                    console.log("setKeyPosition:ToggleIME:", v.keys.ti);
                    // code2key(v.keys.key, key2codeMap, keySI.ime);
                    const d = document.createElement("div");
                    d.style.width = sizeX;d.style.height = sizeY;
                    d.style.left = startX;d.style.top = startY;
                    d.style.background = `transparent URL("${keySuggestions[v.keys.ti]}") no-repeat center / contain`;
                    d.classList.add("TI");
                    keySI.t.set(v.keys.code, v.keys.key);
                    fg.appendChild(d);
                }
                if(Object.hasOwn(v.keys, "oi")){
                    //onImeキー
                    console.log("setKeyPosition:OnIME", v.keys.oi);
                    // code2key(v.keys.key, key2codeMap, keySI.ime);
                    const d = document.createElement("div");
                    d.style.width = sizeX;d.style.height = sizeY;
                    d.style.left = startX;d.style.top = startY;
                    d.style.background = `transparent URL("${v.keys.oi}") no-repeat center / contain`;
                    d.classList.add("OI");
                    keySI.o.set(v.keys.code, v.keys.key);
                    fg.appendChild(d);
                }
                for(let i = 0; i < keyCheckImg.length; i++){
                    if(v.keys.code){
                        const d = document.createElement("div");
                        d.style.width = sizeX;d.style.height = sizeY;
                        d.style.left = startX;d.style.top = startY;
                        // https://cony-tas.com/css-background-color-image
                        // https://shu-naka-blog.com/css/background/
                        // https://jajaaan.co.jp/css/css-full-screen/
                        d.style.background = `transparent URL("${keyCheckImg[i]}") no-repeat center / contain`;
                        d.classList.add(keyCheckImgClass[i], v.keys.code);
                        if(v.keys.key && v.keys.key != " ") {
                            console.log("v.keys.key", v.keys.key);
                            d.classList.add(v.keys.key);
                            // addClassKeyCode(v.keys.key, key2codeMap, d);
                        }
                        if(v.keys.shift) {
                            d.classList.add(v.keys.shift);
                            // addClassKeyCode(v.keys.shift, key2codeMap, d);
                            keySI.s.set(v.keys.shift, v.keys.code);
                            // code2key(v.keys.shift, key2codeMap, keySI.shift);
                        }
                        fg.appendChild(d);
                    }
                }
            }
        }
        ele.parentElement.appendChild(fg);
        console.log("keySI", keySI);
        return keySI;
    }
}
