var H=Object.defineProperty;var U=(o,n,e)=>n in o?H(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e;var w=(o,n,e)=>(U(o,typeof n!="symbol"?n+"":n,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const X="modulepreload",Q=function(o){return"/"+o},V={},Y=function(n,e,t){if(!e||e.length===0)return n();const i=document.getElementsByTagName("link");return Promise.all(e.map(s=>{if(s=Q(s),s in V)return;V[s]=!0;const l=s.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(!!t)for(let d=i.length-1;d>=0;d--){const C=i[d];if(C.href===s&&(!l||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${c}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":X,l||(p.as="script",p.crossOrigin=""),p.href=s,document.head.appendChild(p),l)return new Promise((d,C)=>{p.addEventListener("load",d),p.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>n())},Z="/temporary_typ/assets/keyDown-66552acf.png",ee="/temporary_typ/assets/keyNG-9d7aec5a.png",te="/temporary_typ/assets/keyOK-589909e7.png",oe="/temporary_typ/assets/keySuggestion1-bc6b05e1.png",ne="/temporary_typ/assets/keySuggestion2-72dd69b9.png",se="/temporary_typ/assets/keySuggestion3-78019fab.png",ie="/temporary_typ/assets/keySuggestion4-d7ab1aff.png";function le(o,n){console.log("setKeyPosition:start");let e=[Z,ee,te],t=["KD","KN","KS"],i=[oe,ne,se,ie];const s=o.scrollWidth/n.width,l=o.scrollHeight/n.height;console.log("keyV_width:",o.scrollWidth,"keyV_height:",o.scrollHeight,"keyInfo:",n);let c={s:new Map,t:new Map,o:new Map};if(Object.hasOwn(n,"0")){console.log("setKeyPosition:loopstart");let y=document.createDocumentFragment();for(const[p,d]of Object.entries(n))if(!isNaN(p)){const C=s*d.view+"px",r=l*d.view+"px",N=s*d.startX+"px",b=l*d.startY+"px";if(Object.hasOwn(d.keys,"ti")){console.log("setKeyPosition:ToggleIME:",d.keys.ti);const u=document.createElement("div");u.style.width=C,u.style.height=r,u.style.left=N,u.style.top=b,u.style.background=`transparent URL("${i[d.keys.ti]}") no-repeat center / contain`,u.classList.add("TI"),c.t.set(d.keys.code,d.keys.key),y.appendChild(u)}if(Object.hasOwn(d.keys,"oi")){console.log("setKeyPosition:OnIME",d.keys.oi);const u=document.createElement("div");u.style.width=C,u.style.height=r,u.style.left=N,u.style.top=b,u.style.background=`transparent URL("${d.keys.oi}") no-repeat center / contain`,u.classList.add("OI"),c.o.set(d.keys.code,d.keys.key),y.appendChild(u)}for(let u=0;u<e.length;u++)if(d.keys.code){const g=document.createElement("div");g.style.width=C,g.style.height=r,g.style.left=N,g.style.top=b,g.style.background=`transparent URL("${e[u]}") no-repeat center / contain`,g.classList.add(t[u],d.keys.code),d.keys.key&&d.keys.key!=" "&&(console.log("v.keys.key",d.keys.key),g.classList.add(d.keys.key)),d.keys.shift&&(g.classList.add(d.keys.shift),c.s.set(d.keys.shift,d.keys.code)),y.appendChild(g)}}return o.parentElement.appendChild(y),console.log("keySI",c),c}}function be(){let o={"End/gi":["ArrowRight"],"PgDn/gi":["ArrowDown"],"PgUp/gi":["ArrowUp"],"Home/gi":["ArrowLeft"],Control:{c:["ControlRight","ControlLeft"],s:"Ctrl/gi"},"Ctrl/gi":["ControlRight","ControlLeft"],"Alt/gi":["AltRight","AltLeft"],"^Fn/gi":["Fn"],"Shift/gi":["ShiftRight","ShiftLeft"],"CapsLock/gi":["CapsLock","Alphanumeric"],"Enter/gi":["Enter"],"Tab/gi":["Tab"],"Back/gi":["Backspace"],"Delete/gi":["Delete"],"Insert/gi":["Insert"],"ScrollLock/gi":["ScrollLock"],"PauseBreak/gi":["Pause"],"PrintScreen/gi":["PrintScreen"],"F[\\d|\\w]{1,3}/gi":null,"ESC/gi":["Escape"]},n={ESC:{c:["Escape"],l:0,r:/ESC/gi},Shift:{c:["ShiftRight","ShiftLeft"],l:0,r:/Shif/gi},CapsLock:{c:["CapsLock"],l:0,r:/Caps/gi,ti:2}},e="EsScCF1234567890PprintauUeBkKTeoOolLIDyRqEhfgAHumMd",t={"目/g":["ContextMenu"],"田/g":["MetaLeft","MetaRight"],"カ|タ|カ|ナ|ひらがな/g":["KanaMode"],"無|変|換/g":["Convert","NonConvert"],"半|角|全|角/g":["Backquote"]},i=!1,s=["半角全角カタカナひらがな変換"],l={},c={IntlRo:["\\","_","ろ"],Slash:["/","?","め"],Period:[".",">","る"],Comma:[",","<","ね"],KeyM:["","M","も"],KeyN:["","N","み"],KeyB:["","B","こ"],KeyV:["","V","ひ"],KeyC:["","C","そ"],KeyX:["","X","さ"],KeyZ:["","Z","つ"],Backslash:["]","}","む"],Quote:[":","*","け"],Semicolon:[";","+","れ"],KeyL:["","L","り"],KeyK:["","K","の"],KeyJ:["","J","ま"],KeyH:["","H","く"],KeyG:["","G","き"],KeyF:["","F","は"],KeyD:["","D","し"],KeyS:["","S","と"],KeyA:["","A","ち"],BracketRight:["[","{","゜"],BracketLeft:["@","`","゛"],KeyP:["","P","せ"],KeyO:["","O","ら"],KeyI:["","I","に"],KeyU:["","U","な"],KeyY:["","Y","ん"],KeyT:["","T","か"],KeyR:["","R","す"],KeyE:["","E","い"],KeyW:["","W","て"],KeyQ:["","Q","た"],IntlYen:["\\","|","ー"],Equal:["^","~","へ"],Minus:["-","=","ほ"],Digit0:["0","","わ"],Digit9:["9",")","よ"],Digit8:["8","(","ゆ"],Digit7:["7","'","や"],Digit6:["6","&","お"],Digit5:["5","%","え"],Digit4:["4","$","う"],Digit3:["3","#","あ"],Digit2:["2",'"',"ふ"],Digit1:["1","!","ぬ"]},y={Digit1:{k:"1"}},p={Digit1:{k:"!"}},d={Digit1:{k:"ぬ"}},C=!1,r="!\"#$%&'()=~|QWERRTYUIOP`{ASDFGHJKL+*}ZXCVBNM<>?_",N="1234567890-^Z@[;:],.\\",b="ぬふあうえおやゆよわほへーたていすかんなにらせ゛゜ちとしはきくまのりれけむつさそひこみもねるめろ",u="";for(const[g,h]of Object.entries(o)){let m=g.split("/"),f={};/\||\{/g.test(m[0])?f.r=new RegExp(m[0],m[1]):f.r=new RegExp(m[0].slice(0,4),m[1]),f.l=0;let k=m[0].replace(/\W/g,"");h?f.c=h:f.c=null,n[k]=f,u+=k}e=[...new Set([...u])].join("").toString()+"1234567890",u="";for(const[g,h]of Object.entries(t)){let m=g.split("/"),f={};/\||\{/g.test(m[0])?f.r=new RegExp(m[0],m[1]):f.r=new RegExp(m[0].slice(0,4),m[1]),f.l=0;let k=m[0].replace(/\||\^|\[|\]/g,"");h?f.c=h:f.c=k,l[k]=f,u+=k}s=[...new Set([...u])].join("").toString(),N="",r="",b="";for(const[g,h]of Object.entries(c))h[0]!=""&&(y[g]={k:h[0]},N+=h[0]),h[1]!=""&&(p[g]={k:h[1]},r+=h[1]),h[1]!=""&&(d[g]={k:h[2]},b+=h[2]);return{sPart:C,sLang:i,sysC:e,sys:n,sysLC:s,sysL:l,kC:N,k:y,shiftC:r,shift:p,langC:b,lang:d,allC:[...new Set(...r+N+e)].join("").toString()}}function ae(o,n){let e={toggle:[["半角全角"],["Alt","`"],["CapsLock"]],on:[["カタカナひらがな"]]};if(o.value.length==0){const t=localStorage.getItem("keyIme.json");t==null?o.value=JSON.stringify(e,null,"    "):(o.value=t,e=JSON.parse(t))}else try{localStorage.setItem("keyIme_old.json",o.value),e=JSON.parse(o.value)}catch(t){alert(t)}return e.toggle.forEach((t,i)=>{for(const[s,l]of Object.entries(n))if(!isNaN(s)){for(const c of t.values())if(c==l.keys.key||c==l.keys.shift){console.log("TI",c),l.keys.ti=i;break}}}),e.on.forEach((t,i)=>{for(const[s,l]of Object.entries(n)){let c=!1;if(!isNaN(s)){for(const y of t.values())if(y==l.keys.key||y==l.keys.shift){console.log("OI",y),l.keys.oi=i,c=!0;break}}if(c)break}}),localStorage.setItem("keyIme.json",JSON.stringify(e)),e}let L=new CSSStyleSheet,ce=new CSSStyleSheet,R={};class de extends HTMLElement{constructor(){super();w(this,"getKI",null);w(this,"keyInfo",{});w(this,"historyKey");w(this,"keyV");w(this,"keyI");w(this,"shadow");w(this,"keyIme");w(this,"initF",!1);w(this,"setup",async e=>{if(!this.initF)return;if(this.keyV.src.length==0||this.keyV.width==0){alert("キーボード画像が見つからない");return}console.log(this.keyV.width);const t=this.keyV.parentNode;for(;t.firstChild!=t.lastChild;)t.removeChild(t.lastChild);if((e==null||e.constructor===Object&&Object.keys(e).length==0)&&(this.getKI==null&&(this.getKI=(await Y(()=>import("./keyDetect-494b060b.js"),[])).getKeyInfo),e=await this.getKI(this.keyV.src,this.canvaArr(),this.keyIme,this.shadow)),e.constructor===Object&&Object.keys(e).length==0){alert("キーボード画像からキーを検出できない");return}this.upC(e),console.log(e),ae(this.keyIme,this.keyInfo),R=le(this.keyV,this.keyInfo),console.log("key[0]_keys:",this.keyInfo[0].keys),this.dispatchEvent(new CustomEvent("setEnd"))});this.shadow=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=`
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
		}`,this.shadow.appendChild(e);const t=document.createElement("details");t.open=!0;const i=document.createElement("summary");i.textContent="キーボード画像",this.shadow.append(t),t.append(i);const s=document.createElement("div");this.keyV=document.createElement("img"),this.setup.bind(this),this.keyV.addEventListener("load",()=>this.setup()),t.append(s),s.append(this.keyV);const l=document.createElement("details"),c=document.createElement("summary");c.textContent="キーボード設定",this.shadow.append(l),l.append(c);const y=document.createElement("label");y.textContent="キー配列画像(PNG/JPG)を選択",y.for="keyIF";const p=document.createElement("div"),d=document.createElement("input");d.type="file",d.accept="image/jpeg, image/png",d.id="keyIF",console.debug("input_file:",d),d.addEventListener("change",()=>{const f=d.files[0],k=new FileReader;if(f*1.5>=5000008)return alert("fileSizeOver"),!1;k.addEventListener("load",()=>{let x;for(let I=0;I<64;I++)if(x="key"+I+".img",localStorage.getItem(x)==null){this.historyKey=x.slice(0,-4);break}this.keyV.src=k.result,localStorage.setItem("his",this.historyKey),localStorage.setItem(x,k.result)}),f&&k.readAsDataURL(f)}),l.append(y),y.append(p),p.append(d);const C=document.createElement("label");C.textContent="キー配列設定(json)を選択",C.for="keyCF";const r=document.createElement("div"),N=document.createElement("input");N.type="file",N.accept="application/json",N.id="keyCF",N.addEventListener("change",()=>{const f=this.files[0],k=new FileReader;if(f.size*1.5>=5000008)return alert("fileSizeOver"),!1;k.addEventListener("load",()=>{try{this.setup(JSON.parse(k.result))}catch(x){alert(x)}}),f&&k.readAsText(f)}),l.append(C),C.append(r),r.append(N);const b=document.createElement("input");b.type="button",b.value="SetKeyInfo",this.upC.bind(this),b.addEventListener("click",()=>this.upC()),this.keyI=document.createElement("textarea"),this.keyI.id="keyI",l.append(b),l.append(this.keyI);const u=document.createElement("input");u.type="button",u.value="SetKeyIme",this.keyIme=document.createElement("textarea"),this.keyIme.id="keyIme",l.append(u),l.append(this.keyIme),u.addEventListener("click",()=>this.setup(this.keyInfo));const g=document.createElement("input");g.type="button",g.value="ForceDetectKey",g.addEventListener("click",()=>this.setup()),l.append(g);const h=document.createElement("details");let m="<summary>キーボード画像解析</summary><details><summary id='opencv'>OpenCV.js is loading...</summary><div id='cvInfo'>OpenCV.js buildInfo</div></details><div><canvas id='keyVI'></canvas></div><div><canvas id='edge'></canvas></div><div><canvas id='sEdge'></canvas></div><div><canvas id='getArea'></canvas></div>";h.innerHTML=`${m}`,this.shadow.append(h)}connectedCallback(){this.shadow.adoptedStyleSheets=[L,ce],localStorage.getItem("his")!=null&&(this.historyKey=localStorage.getItem("his"));const e=localStorage.getItem(this.historyKey+".img"),t=localStorage.getItem(this.historyKey+".json");console.debug(this.historyKey,e,t),e?t!=null?new Promise(i=>{this.keyV.onload=()=>{i()},this.keyV.src=e}).then(()=>{this.initF=!0,this.setup(JSON.parse(t))}):(this.initF=!0,this.keyV.src=e):(this.initF=!0,this.historyKey="key0",localStorage.setItem("his","key0"))}replaceCss(e,t){console.log("key-info_replaceCss:cssRuleStr",e),t==0?L.replaceSync(e):ksCss.replaceSync(e)}canvaArr(){this.shadow.querySelectorAll("canvas.key").forEach(i=>{this.shadow.lastChild.removeChild(i.parentNode)});let t=new Map([["key",[]]]);this.shadow.querySelectorAll("canvas").forEach(i=>{console.log(i),t.set(i.id,i)});for(let i=0;i<1;i++){const s=document.createElement("span"),l=document.createElement("canvas");l.classList.add("key",i),this.shadow.lastChild.appendChild(s),s.appendChild(l),t.get("key").push(l)}return t}upC(e){if(e==null){console.log(this.keyI.value);try{if(this.keyI.value.length>8){Object.keys(this.keyInfo).length>0&&localStorage.setItem(this.historyKey+"_old.json",JSON.stringify(this.keyInfo));for(const[t,i]of Object.entries(JSON.parse(this.keyI.value)))Object.hasOwn(this.keyInfo,t)?Object.assign(this.keyInfo[t].keys,i.keys):this.keyInfo[t]=i;localStorage.setItem(this.historyKey+".json",JSON.stringify(this.keyInfo)),this.setup(this.keyInfo)}}catch(t){alert(t)}}else if(e.constructor===Object){Object.keys(this.keyInfo).length>0&&localStorage.setItem(this.historyKey+"_old.json",JSON.stringify(this.keyInfo)),this.keyInfo=e,console.log(JSON.stringify(this.keyInfo,null,"	")),localStorage.setItem(this.historyKey+".json",JSON.stringify(e));let t={};for(const[i,s]of Object.entries(e))isNaN(i)||(t[i]={},t[i].keys=s.keys);this.keyI.value=JSON.stringify(t,null,"    ")}}}const re="/temporary_typ/assets/space_n-2ad13683.png",ue="/temporary_typ/assets/return_n-6857ba17.png";let F=document.createElement("style");F.id="guideC";document.head.appendChild(F);let v=[];function ye(o){return ge(fe(),o)}function fe(){let o=`あかちょょちかあ
‐QＱWＷyｙZＺ@＠BＢCＣEＥAＡBＢCＣDＤEＥQＱWＷyｙZＺ@＠    ⎵⎵    \\    AAAZAAAAAAAAAA
‐QＱEＥAＡBＢCＣDＤEＥQＱWＷyｙZＺ@＠あちょ`;return o=o.replaceAll(`\r
`,`
`),o=[...o],o}function ge(o,n){let e=document.getElementById("guide"),t=[],i=document.createDocumentFragment(),s=-1;for(let l=0;l<o.length;l++){s++;const c=o[l];console.log("inTypText["+l+"]:",c,"inTypText.length:",o.length,0<c.codePointAt()&&c.codePointAt()<8192);const y=document.createElement("div");y.className="Gu";const p=document.createElement("div");if(p.className="To",y.appendChild(p),i.appendChild(y),c==" "||c==`
`){const r=document.createElement("img");c==" "?(p.textContent=" ",r.src=re):(p.textContent=` 
`,r.src=ue,i.appendChild(document.createElement("br"))),r.className="Bo",y.appendChild(r),v.push([s]),p.classList.add("g"+s);continue}let d=-1;console.log("w2imeK",n),n.get("arr")!=null&&(d=n.get("arr").findIndex(r=>o.slice(l,l+r[0].length).join("")==r[0].join("")));const C=document.createElement("div");if(C.className="Bo",y.appendChild(C),d==-1)p.textContent=c,C.textContent=c,C.classList.add("g"+s),v.push([s]),0<c.codePointAt()&&c.codePointAt()<8192||(y.classList.add("FW"),t.push(`#inP>span:nth-of-type(${l+1}){font-feature-settings:"fwid";}`));else{console.log(n.get("arr")[d][0]);const r=n.get("arr")[d];p.classList.add("FW"),r[0].length>1&&(C.style.textAlign="right");let N,b,u,g=Math.trunc(r[1].length/r[0].length);if(r[0].length>2&&r[1].length%r[0].length!=0){let f=(r[1].length-g)/(r[0].length-1);N=r[0].length-2,b=r[1].length-g-f,u=b/N}console.debug("guide@StrLen:",r[1].length,"guide@firstGuideStrLen:",g,"GuideStrLen:",u),p.classList.add("FW"),t.push(`#inP>span:nth-of-type(${l+1}){font-feature-settings:"fwid";}`),p.textContent=r[0][0];let h=[],m=0;for(const f=m+g;m<f;m++){console.debug("guide@StrLen:",r[1].length,"guide@firstGuideStrLen:",g,"GuideStrLen:",u);let k=document.createElement("span");k.textContent=r[1][m],h.push(s),k.className="g"+s++,C.appendChild(k)}v.push(h);for(let f=1;f<r[0].length;f++){l++,h=[];let k=document.createElement("div");k.className="Gu";let x=document.createElement("div");x.className="To FW",t.push(`#inP>span:nth-of-type(${l+1}){font-feature-settings:"fwid";}`),x.textContent=r[0][f],k.appendChild(x);let I=document.createElement("div");I.className="Bo",k.appendChild(I),i.appendChild(k);let P=0;for(f+1==r[0].length?(I.style.textAlign="left",P=r[1].length):P=u+m;m<P;m++){console.debug("guide@StrLen:",r[1].length,"guide@firstGuideStrLen:",g,"GuideStrLen:",u);let A=document.createElement("span");A.textContent=r[1][m],h.push(s),A.className="g"+s++,I.appendChild(A)}v.push(h),N%u!=0&&(N=N-1,b=b-u,u=N/b)}s--}}e.appendChild(i),F.textContent=t.join(`
`),console.debug("guideIndex:",v)}const _=document.createElement("style");_.id="typKD";document.head.appendChild(_);_.sheet;const M=document.createElement("style");M.id="keySu";document.head.appendChild(M);M.sheet;let D=0;const j=(()=>{let o=0,n=0,e=new Map,t=!1;return console.log("nowGuide"),function(i,s,l){if(l=="Backspace"||l=="Delete"||l=="ArrowLeft"||l=="ArrowRight"||l=="ArrowUp"||l=="ArrowDown"){console.debug("moveOn"),t=!0;return}if(console.log("index:",i,"Offset",s,"move",t),i<v.length){if(s==0)return o=s,n=0,t=!1,console.log("guideIndex["+i+"]["+s+"]",v[i][s]),v[i][s];if(t&&e.has(s)?(o=s,s=e.get(s),t=!1,console.log("index:",i,"move",t,"Offset",s,"preOffset",o)):(n+=o+1-s,console.debug("preOffset",o,"diffKeyDownCnt",n),o=s,s+=n,e.set(o,s)),s<v[i].length)return console.log("guideIndex["+i+"]["+s+"]",v[i][s]),v[i][s];for(let c=i;i<v.length;){let y=c;if(c+=v[i++].length,s<c)return--i,s+1<c?(D=i,v[i][s+1-y]):(D=i+1,v[D][s+1-c]),console.debug("guideIndex["+i+"]["+(s-y)+"]:",v[i][s-y]),v[i][s-y]}return-1}return-1}})();function T(o,n,e){return o.shiftKey&&(o.location==1?n+=`.${e}.ShiftLeft{display:block;}`:o.location==2?n+=`.${e}.ShiftRight{display:block;}`:n+=`.${e}.Shift{display:block;}`),o.altKey&&(o.location==1?n+=`.${e}.AltLeft{display:block;}`:o.location==2?n+=`.${e}.AltRight{display:block;}`:n+=`.${e}.Alt{display:block;}`),o.ctrlKey&&(o.location==1?n+=`.${e}.ControlLeft{display:block;}`:o.location==2?n+=`.${e}.ControlRight{display:block;}`:n+=`.${e}.Control{display:block;}`),o.metaKey&&(o.location==1?n+=`.${e}.MetaLeft{display:block;}`:o.location==2?n+=`.${e}.MetaRight{display:block;}`:n+=`.${e}.Meta{display:block;}`),n}function pe(o,n){if(a.firstChild==null)return;console.log("e.key:",o.key,"e.code:",o.code,"e.keyCode:",o.keyCode,"se.focusNode",n.focusNode,"se.focusNode.text",n.focusNode.textContent,"se.focusNode.textLength",n.focusNode.textContent.length,"se.focusOffset",n.focusOffset);let e;if(n.focusNode.nodeType==Node.TEXT_NODE?e=n.focusNode.parentNode:e=n.focusNode,37<=o.keyCode&&o.keyCode<=40||!Object.hasOwn(R,"s")){L.replaceSync(T(o,`.KD.${o.code}{display:block;}`),0);return}else{let t=-1;if(a.lastChild.isEqualNode(e))console.log("keydown:"),t=j(a.children.length-1,n.focusOffset,o.code);else for(let l=0;l<a.children.length;l++)if(a.children[l].isEqualNode(e)){o.isComposing?t=j(l,n.focusNode.offset,o.code):t=j(l+1,0);break}if(t==-1||t==null){console.log("NoGuide:"),L.replaceSync(T(o,`.KD.${o.code}{display:block;}`,"KD"),0);return}console.log(o.key,o.code,o.getModifierState("CapsLock"),".g"+t,"Guide:",document.querySelector(".g"+t));const i=document.querySelector(".g"+t).textContent;let s="KN";(o.key===i||(/Key|Digit/.test(o.code)?o.code.slice(-1).toLowerCase():o.code)==i||R.s.get(i)&&o.shiftKey||i==`
`&&o.code=="Enter"||(o.isComposing||o.key=="Process"||o.keyCode==229)&&(o.code=="Enter"||o.code=="Space")||o.altKey||o.ctrlKey||o.metaKey)&&(s="KD"),L.replaceSync(T(o,`.${s}.${o.code}{display:block;}`,s),0)}}const a=document.getElementById("inP"),E=document.createElement("div");a.before(E);E.id="caret";E.style.display="none";const W=parseFloat(getComputedStyle(E).getPropertyValue("width")),he=parseFloat(getComputedStyle(E).getPropertyValue("height")),J=W/2;E.style.width=J+"px";let O=16*parseFloat(getComputedStyle(document.getElementById("typ")).getPropertyValue("line-height"))/45;const z=document.getElementById("typ");console.debug("fontS:",parseFloat(getComputedStyle(z).getPropertyValue("font-size")),"--lineH:",parseFloat(getComputedStyle(z).getPropertyValue("line-height")));let $=!1,S=!1,q=0;const K=o=>{console.debug("caretMove:",o);let n;o.focusOffset==null?(n=o.getClientRects()[0],E.style.top=O+"px"):o.focusOffset==0?(n=o.focusNode.parentElement.getClientRects()[0],E.style.top=O+"px"):(n=o.getRangeAt(0).getClientRects()[0],E.style.top=O+"px"),E.style.left=n.x+"px",console.debug("caretMove:",n,O,he)},B=(o,n,e)=>{console.debug("sets:",n,e);const t=(i,s)=>{const l=document.createElement("span");l.textContent=i,s&&o.classList.add("c",s,q++),o.classList.add("c",q++),o.before(l)};if(n.length>1){const i=[...n];for(let s=0;s<n.length;)console.debug("sets:next"),t(i[s++]);o.textContent=""}else n.length>0&&(t(n,e),o.textContent="");o.removeAttribute("class"),console.debug("setsEnd")};class me extends HTMLElement{constructor(){super();w(this,"typ",!1)}connectedCallback(){this.contentEditable=!0,this.addEventListener("focusout",e=>{console.debug("focusout@in-p",document.activeElement.nodeName),this.textContent}),this.addEventListener("focusin",e=>{console.debug("focusin@in-p"),K(this)}),this.addEventListener("keydown",e=>{this.typ=!0,e.isComposing||e.keyCode===229||e.key=="Process"?(S=!0,this.className="FW"):(S=!1,this.removeAttribute("class"));const t=getSelection();console.debug("keydown@in-p_event: ",e,"/e.key: ",e.key,"/e.key: ",e.code,"/isComposing:",e.isComposing,"/se.focusNode:",t.focusNode,"/se.focusOffset",t.focusOffset,"/se.focusNode.className",t.focusNode.className,"/se.focusNode.contenteditable",t.focusNode.isContentEditable,"/se.focusNode.parentNode.className",t.focusNode.parentElement.className,"/se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling)}),this.addEventListener("compositionstart",e=>{e.stopImmediatePropagation()}),this.addEventListener("compositionend",e=>{e.stopImmediatePropagation(),console.debug("compositionend@in-p_event"),B(this,e.data),this.typ=!1}),this.addEventListener("beforeinput",e=>{const t=getSelection();console.debug("beforeinput@in-p_event: ",e,"e.key: ",e.key,"e.key: ",e.code,"isComposing:",e.isComposing,"inP.selectionStart:",a.selectionStart,"inP.textContent",a.textContent,"inP.textContent.length",a.textContent.length,"se.focusNode:",t.focusNode,"se.focusOffset",t.focusOffset,"se.focusNode.className",t.focusNode.className,"se.focusNode.contenteditable",t.focusNode.isContentEditable,"se.focusNode.parentNode.className",t.focusNode.parentElement.className,"se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling),this.typ?e.inputType=="insertText"?(e.preventDefault(),B(this,e.data)):e.inputType=="insertParagraph"&&(e.preventDefault(),B(this,`
`,"B")):(console.debug("NoTyp"),e.preventDefault())}),this.addEventListener("input",e=>{const t=getSelection();console.debug("input@in-p_event: ",e,"/e.key: ",e.key,"/e.key: ",e.code,"/isComposing:",e.isComposing,"/se.focusNode:",t.focusNode,"/se.focusOffset",t.focusOffset,"/se.focusNode.className",t.focusNode.className,"/se.focusNode.contenteditable",t.focusNode.isContentEditable,"/se.focusNode.parentNode.className",t.focusNode.parentElement.className,"/se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling)}),this.addEventListener("keyup",e=>{this.typ=!1,(e.isComposing||e.keyCode===229||e.key=="Process")&&(S?S=!1:S=!0)})}}customElements.define("in-p",me);function ke(){let o=!1;const n=e=>{console.debug("makeAfterInp:",e);const t=document.createElement("in-p");e==null?a.prepend(t):e.after(t),a.contentEditable=!1,t.focus()};console.log("InitInPSetEvent"),a.addEventListener("focusout",e=>{setTimeout(()=>{console.debug("event@inPfocusout:",document.activeElement),document.activeElement.id=="inP"||document.activeElement.nodeName=="IN-P"||(a.contentEditable=!0,E.style.display="none")},100)}),a.addEventListener("click",e=>{const t=getSelection();console.debug("event@inPclick:",t.focusNode),t.focusNode.nodeType==Node.TEXT_NODE?n(t.focusNode.parentElement):n(a.lastChild),E.style.display="block"}),a.addEventListener("keydown",e=>{const t=getSelection();console.log("keydown@inp_event: ",e,"e.key: ",e.key,"e.key: ",e.code,"isComposing:",e.isComposing,"inP.firstChild:",a.firstChild,"inP.lastChild:",a.lastChild,"inP.selectionStart:",a.selectionStart,"inP.textContent",a.textContent,"inP.textContent.length",a.textContent.length,"se.focusNode:",t.focusNode,"se.focusOffset",t.focusOffset,"se.focusNode.className",t.focusNode.className,"se.focusNode.contenteditable",t.focusNode.isContentEditable,"se.focusNode.parentNode.className",t.focusNode.parentElement.className,"se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling),37<=e.keyCode&&e.keyCode<=40||!(e.isComposing||e.keyCode===229||e.key=="Process")&&(e.code=="Backspace"||e.code=="Delete")?(E.style.animation="",o||a.firstChild===t.focusNode&&e.keyCode==37||a.lastChild===t.focusNode&&(e.keyCode==39||e.code=="Delete")?(console.debug("inP.contentEditable",a.contentEditable),e.preventDefault()):(o=!0,console.debug("inP.contentEditable",a.contentEditable),a.contentEditable=="false"&&(a.contentEditable=!0,a.focus()),t.focusNode.nodeType===Node.TEXT_NODE&&37<=e.keyCode&&e.keyCode<=40&&e.repeat&&K(t),o=!1)):e.code=="CapsLock"||e.code=="Backquote",pe(e,t)}),a.addEventListener("compositionstart",e=>{const t=getSelection();console.log("compositionstart@event: ",e,"e.key: ",e.key,"e.key: ",e.code,"isComposing:",e.isComposing,"inP.selectionStart:",a.selectionStart,"inP.textContent",a.textContent,"inP.textContent.length",a.textContent.length,"se.focusNode:",t.focusNode,"se.focusOffset",t.focusOffset,"se.focusNode.className",t.focusNode.className,"se.focusNode.contenteditable",t.focusNode.isContentEditable,"se.focusNode.parentNode.className",t.focusNode.parentElement.className,"se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling)}),a.addEventListener("input",e=>{const t=getSelection();console.log("input@inp_event: ",e,"e.key: ",e.key,"e.key: ",e.code,"isComposing:",e.isComposing,"inP.selectionStart:",a.selectionStart,"inP.textContent",a.textContent,"inP.textContent.length",a.textContent.length,"se.focusNode:",t.focusNode,"se.focusOffset",t.focusOffset,"se.focusNode.className",t.focusNode.className,"se.focusNode.contenteditable",t.focusNode.isContentEditable,"se.focusNode.parentNode.className",t.focusNode.parentElement.className,"se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling),(a.firstElementChild==null||a.firstElementChild.tagName=="BR")&&(a.innerHTML=""),e.inputType=="deleteContentForward"?a.firstChild==null&&n(null):e.inputType=="deleteContentBackward"?t.focusNode.nodeType==Node.TEXT_NODE&&n(t.focusNode.parentElement):e.inputType=="insertCompositionText"}),a.addEventListener("compositionend",e=>{console.debug("compositionend@event")}),a.addEventListener("keyup",e=>{const t=getSelection();console.log("keyup@event: ",e,"e.key: ",e.key,"e.key: ",e.code,"isComposing:",e.isComposing,"inP.selectionStart:",a.selectionStart,"inP.textContent",a.textContent,"inP.textContent.length",a.textContent.length,"se.focusNode:",t.focusNode,"se.focusOffset",t.focusOffset,"se.focusNode.className",t.focusNode.className,"se.focusNode.contenteditable",t.focusNode.isContentEditable,"se.focusNode.parentNode.className",t.focusNode.parentElement.className,"se.focusNode.parentNode.nextSibling",t.focusNode.parentNode.nextSibling),E.style.animation="flash 0.8s linear infinite",t.focusNode.nodeType==Node.TEXT_NODE?K(t):K(t.focusNode),e.isComposing||e.keyCode==229||e.key=="Process"?S||(S=!0):(S&&(S=!1),(37<=e.keyCode&&e.keyCode<=40&&!e.shiftKey||e.code=="Backspace"||e.code=="Delete")&&(console.debug("first:",a.firstChild===t.focusNode.parentNode,"last:",a.lastChild===t.focusNode.parentNode),t.focusOffset==0&&a.firstChild===t.focusNode.parentNode||a.firstChild==null?n(null):a.firstChild===t.focusNode||a.lastChild===t.focusNode||(t.focusNode.nodeType==Node.TEXT_NODE?n(t.focusNode.parentElement):n(t.focusNode)))),$!=S&&(console.log("changeCaretWidth",S),$=S,S?E.style.width=W+"px":E.style.width=J+"px")})}customElements.define("key-info",de);async function Ce(){const o=document.getElementById("i2k");document.querySelector(".i2k").addEventListener("click",e=>{G(o)});const n=document.createElement("key-info");n.id="keyboard",ke(),n.replaceCss("",0),ye(G(o)),document.getElementById("app").append(n)}Ce();function G(o){let n=`
っうぁ,wwha
っうぃ,wwi
っうぇ,wwe
っうぉ,wwho
うぁ,wha
うぃ,wi
うぇ,we
うぉ,who
あ,a
い,i
う,u
え,e
お,o

きゃ,kya
きぃ,kyi
きゅ,kyu
きぇ,kye
きょ,kyo
くぁ,qa
くぃ,qi
くぅ,qwu
くぇ,qe
くぉ,qo
くゃ,qya
くゅ,qyu
くょ,qyo
っか,kka
っき,kki
っく,kku
っけ,kke
っこ,kko
っきゃ,kkya
っきぃ,kkyi
っきゅ,kkyu
っきぇ,kkye
っきょ,kkyo
か,ka
き,ki
く,ku
け,ke
こ,ko
ぎゃ,gya
ぎぃ,gyi
ぎゅ,gyu
ぎぇ,gye
ぎょ,gyo
ぐぁ,gwa
ぐぃ,gwi
ぐぅ,gwu
ぐぇ,gwe
ぐぉ,gwo
っが,gga
っぎ,ggi
っぐ,ggu
っげ,gge
っご,ggo
っぐぁ,ggwa
っぐぃ,ggwi
っぐぅ,ggwu
っぐぇ,ggwe
っぐぉ,ggwo
っヵ,llka
っヶ,llke
が,ga
ぎ,gi
ぐ,gu
げ,ge
ご,go
ヵ,lka
ヶ,lke


っしゃ,ssya
っしぃ,ssyi
っしゅ,ssyu
っしぇ,ssye
っしょ,ssyo
っすぁ,sswa
っすぃ,sswi
っすぅ,sswu
っすぇ,sswe
っすぉ,sswo
しゃ,sya
しぃ,syi
しゅ,syu
しぇ,sye
しょ,syo
すぁ,swa
すぃ,swi
すぅ,swu
すぇ,swe
すぉ,swo
っそ,sso
っさ,ssa
っし,ssi
っす,ssu
っせ,sse
っそ,sso
さ,sa
し,si
す,su
せ,se
っじゃ,jja
っじぃ,zzyi
っじゅ,jju
っじぇ,jje
っじょ,jjo
じゃ,ja
じぃ,zyi
じゅ,ju
じぇ,je
じょ,jo
っざ,zza
っじ,zzi
っず,zzu
っぜ,zze
っぞ,zzo
ざ,za
じ,zi
ず,zu
ぜ,ze
ぞ,zo

っちゃ,ttya
っちぃ,ttyi
っちゅ,ttyu
っちぇ,ttye
っちょ,ttyo
っつゃ,ttsa
っつぃ,ttsi
っつぇ,ttse
っつょ,ttso
ってゃ,ttha
ってぃ,tthi
ってゅ,tthu
ってぇ,tthe
ってょ,ttho
っとゃ,ttwa
っとぃ,ttwi
っとゅ,ttwu
っとぇ,ttwe
っとょ,ttwo
ちゃ,tya
ちぃ,tyi
ちゅ,tyu
ちぇ,tye
ちょ,tyo
つゃ,tsa
つぃ,tsi
つぇ,tse
つょ,tso
てゃ,tha
てぃ,thi
てゅ,thu
てぇ,the
てょ,tho
とゃ,twa
とぃ,twi
とゅ,twu
とぇ,twe
とょ,two

った,tta
っち,tti
っつ,ttu
って,tte
っと,tto
た,ta
ち,ti
つ,tu
て,te
と,to

っぢゃ,ddya
っぢぃ,ddyi
っぢゅ,ddyu
っぢぇ,ddye
っぢょ,ddyo
っでゃ,ddha
っでぃ,ddhi
っでゅ,ddhu
っでぇ,ddhe
っでょ,ddho
っどゃ,ddwa
っどぃ,ddwi
っどゅ,ddwu
っどぇ,ddwe
っどょ,ddwo
ぢゃ,dya
ぢぃ,dyi
ぢゅ,dyu
ぢぇ,dye
ぢょ,dyo
でゃ,dha
でぃ,dhi
でゅ,dhu
でぇ,dhe
でょ,dho
どゃ,dwa
どぃ,dwi
どゅ,dwu
どぇ,dwe
どょ,dwo

っだ,dda
っぢ,ddi
っづ,ddu
っで,dde
っど,ddo
だ,da
ぢ,di
づ,du
で,de
ど,do

な,na
に,ni
ぬ,nu
ね,ne
の,no
にゃ,nya
にぃ,nyi
にゅ,nyu
にぇ,nye
にょ,nyo
っな,nna
っに,nni
っぬ,nnu
っね,nne
っの,nno
っにゃ,nnya
っにぃ,nnyi
っにゅ,nnyu
っにぇ,nnye
っにょ,nnyo


っひゃ,hhya
っひぃ,hhyi
っひゅ,hhyu
っひぇ,hhye
っひょ,hhyo
っふぁ,ffwa
っふぃ,ffi
っふぅ,ffwu
っふぇ,ffe
っふぉ,ffo
っふゃ,ffya
っふゅ,ffyu
っふょ,ffyo
ひゃ,hya
ひぃ,hyi
ひゅ,hyu
ひぇ,hye
ひょ,hyo
ふぁ,fwa
ふぃ,fi
ふぅ,fwu
ふぇ,fe
ふぉ,fo
ふゃ,fya
ふゅ,fyu
ふょ,fyo
っは,hha
っひ,hhi
っふ,hhu
っへ,hhe
っほ,hho
は,ha
ひ,hi
ふ,hu
へ,he
ほ,ho

っヴぁ,vva
っヴぃ,vvi
っヴぇ,vve
っヴぉ,vvo
っヴゃ,vvya
っヴゅ,vvyu
っヴょ,vvyo
っヴ,vvu
ヴゃ,vya
ヴゅ,vyu
ヴょ,vyo
ヴぁ,va
ヴぃ,vi
ヴぇ,ve
ヴぉ,vo
ヴ,vu

っびゃ,bbya
っびぃ,bbyi
っびゅ,bbyu
っびぇ,bbye
っびょ,bbyo
びゃ,bya
びぃ,byi
びゅ,byu
びぇ,bye
びょ,byo
っば,bba
っび,bbi
っぶ,bbu
っべ,bbe
っぼ,bbo
ば,ba
び,bi
ぶ,bu
べ,be
ぼ,bo

っぴゃ,ppya
っぴぃ,ppyi
っぴゅ,ppyu
っぴぇ,ppye
っぴょ,ppyo
ぴゃ,pya
ぴぃ,pyi
ぴゅ,pyu
ぴぇ,pye
ぴょ,pyo
っぱ,ppa
っぴ,ppi
っぷ,ppu
っぺ,ppe
っぽ,ppo
ぱ,pa
ぴ,pi
ぷ,pu
ぺ,pe
ぽ,po

っみゃ,mmya
っみぃ,mmyi
っみゅ,mmyu
っみぇ,mmye
っみょ,mmyo
みゃ,mya
みぃ,myi
みゅ,myu
みぇ,mye
みょ,myo
っま,mma
っみ,mmi
っむ,mmu
っめ,mme
っも,mmo
ま,ma
み,mi
む,mu
め,me
も,mo

っゃ,llya
っゅ,llyu
っょ,llyo
っや,yya
っゆ,yyu
っよ,yyo
や,ya
ゆ,yu
よ,yo

っりゃ,rrya
っりぃ,rryi
っりゅ,rryu
っりぇ,rrye
っりょ,rryo
りゃ,rya
りぃ,ryi
りゅ,ryu
りぇ,rye
りょ,ryo
っら,rra
っり,rri
っる,rru
っれ,rre
っろ,rro
ら,ra
り,ri
る,ru
れ,re
ろ,ro

っわ,wwa
っを,wwo
わ,wa
を,wo
ん,nn

ぁ,la
ぃ,li
ぅ,lu
ぇ,le
ぉ,lo
ゃ,lya
ゅ,lyu
ょ,lyo
っ,ltu`,e=new Map;if(o.value.length==0){const c=localStorage.getItem("ime2key.txt");c==null?(o.value=n,localStorage.setItem("ime2key.txt",n)):(n=c,o.value=c)}else localStorage.setItem("ime2key_old.txt",n),n=o.value,localStorage.setItem("ime2key.txt",n);let t=n.replaceAll(`\r
`,`
`);t=t.replaceAll(" ","");let i=t.split(`
`);e.set("arr",[]);let s=!0,l=0;for(;l<i.length;l++){const c=i[l].split(",");if(console.debug("s.length",c.length),c.length==2){const y=Array.from(c[0])[0];e.set(y,0),e.get("arr").push([[...c[0]],[...c[1]]])}else if(c.length!=1){s=!1;break}}if(!s)throw alert("IME有効時、最初に押された時表示される文字の設定ミス:"+i[l]+"/"+(l+1)+"行目"),i[l];return console.log("imeOnkey:",e),e}export{be as g};
