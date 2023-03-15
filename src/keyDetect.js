// https://drivehack.uc.r.appspot.com/drive-api-caution/
// https://qiita.com/minodisk/items/934903a937813fcf1e30
// https://qiita.com/makaishi2/items/b0537413161d57335107
// https://qiita.com/zmel1213/items/ee915556f9c58ab50889
// https://ai-ocr.userlocal.jp/
// https://qiita.com/Sirloin/items/756a23478bef3e634e81#:~:text=javascript%E3%81%A7GoogleDrive%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%99%E3%82%8B%201%20Step1%3A%20Drive%20API%20%E3%82%92%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B%20%EF%BC%91%EF%BC%8E%E4%B8%8B%E8%A8%98URL%E3%81%8B%E3%82%89Google%20Developers,%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E4%BD%9C%E6%88%90%20index.html%E3%81%A8%E3%81%84%E3%81%86%E5%90%8D%E5%89%8D%E3%81%A7%E4%BB%A5%E4%B8%8B%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E3%82%8B%E3%80%82%20...%203%20Step3%3A%20%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB%E3%82%92%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B%20Web%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%81%BE%E3%81%99%E3%80%82%20

// import { cv }from '@techstark/opencv-js';
import {cv} from './OpenCV_BrowserImport/opencv_import';
import {createWorker, PSM, OEM } from 'tesseract.js';
import {getKey} from "./setKeyStrInfo"
import {tesseractOCR} from "./OCR";

// import workerPath from "tesseract.js/dist/worker.min.js?url";
// import corePath from "tesseract.js-core/tesseract-core.wasm.js?url";
// import Tesseract from 'tesseract.js/dist/tesseract.esm.min.js';

//Edge検出方式
let edgeMethed = "sobel";// let edgeMethed = "canny";
//Edge検出の閾値(canny)
let cannyThMin = 700;let cannyThMax = 1000;
//Edge検出後の二値化の閾値(sobel)
let sobelTh = 128.0;
//Edge検出した後の画像のEdgeを強調
//Edgeの強調の係数:大きくするほどエッジを強調
// let strongEdgeCo = 0.001;
//エッジの膨張(強調)回数
let dilateIterations = 1;
///エッジの膨張の度合,膨張の係数:大きくするほどエッジを膨張(強調)、2以上
let dilateKsize = 2;
//エッジの収縮(細くする)回数
// let erodeIterations = 1;
let erodeIterations = 0;
///エッジの収縮の度合,収縮の係数:大きくするほどエッジを収縮(強調)、2以上
let erodeKsize = 2;

// 輪郭線で囲わている図形が何番目かを表示するサイズ係数:値が大きいほど表示される数字が小さくなる
let viewKeyNumSize = 4;

//キーボードのキー画像をズーム係数（文字認識時）、1なら等倍
let keyZoom = 1;
//キーボードのキー画像からキーの文字を切り出すときの上下左右のオフセットpx
let offset = 9;

function initCV(shadow){
    return new Promise( (res) => {
        const f = () => {
            console.log("opencv_setOK");shadow.getElementById("opencv").textContent = "opencv ready";shadow.getElementById("cvInfo").textContent= cv.getBuildInformation();// console.log("opencv_OK");
        };
        // console.log( typeof(cv.getBuildInformation) == "function" );
        if(typeof(cv.getBuildInformation) == "function"){
            window.cv = cv;f();res();
        }else{
            cv.onRuntimeInitialized = () =>{console.log("opencv_setting");window.cv = cv;f();res();};
        }
    });
}

export async function getKeyInfo(src, canArr, imeE, shadow) {
    console.log("getKeyInfo");

    let tmp = initCV(shadow);
    // opencv_動的インポート
    // const module = await import("./opencv_import");
    // window.cv = module.cv;

	// https://zenn.dev/nana/articles/ff5c9db4132e9d	// 画像読み込み
	let keyImg = new Promise( (res) => {
        const keyImg = new Image();
        keyImg.onload = () => {
            // console.log("imgSizeX:", keyImg.naturalWidth, " / sizeY:", keyImg.naturalHeight);
            // this.keyInfo.width = keyImg.naturalWidth;this.keyInfo.height = keyImg.naturalHeight;
            // console.log(this.keyImg.src);
            res(keyImg);
        }
        keyImg.src = src;
    });

    // canvas準備  //getElementById()等でも可。オブジェクトが取れれば良い。
	// const keyVI = document.getElementById("keyVI");
	const keyVI = canArr.get("keyVI");
    // const ctxGA = document.getElementById("getArea").getContext("2d");

    keyImg = await keyImg;
    // debugger;
    console.log("keyImg.naturalWidth:", keyImg.naturalWidth);
    keyVI.width = keyImg.naturalWidth;
    keyVI.height = keyImg.naturalHeight;
    keyVI.getContext("2d").drawImage(keyImg, 0, 0);

    await tmp;
    //元画像
    const matSrc = cv.imread(keyImg);
    //グレー画像→エッジ強調画像
    const edgeMat = cv.imread(keyImg);
    //グレー画像
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_BGR2RGB);
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_RGB2GRAY, 0);
    //エッジ画像
    edge(edgeMat, canArr.get("edge"));
    //エッジ強調後画像
    const sEdgeMat = new cv.Mat();
    strongEdge(edgeMat, sEdgeMat, canArr.get("sEdge"));
    const contours = new cv.MatVector();
    //キーボードのキーの位置の検出後の画像
    findContours(matSrc, sEdgeMat, canArr.get("getArea"), contours);
    const keyInfo = await drawContours(matSrc, contours, canArr.get("getArea").getContext("2d"), canArr.get("key"), getKey(imeE));
    //opencvでの変数のメモリ開放
    matSrc.delete();edgeMat.delete();sEdgeMat.delete();contours.delete();
    // console.log(JSON.stringify(keyInfo, null , "\t"))
    return Object.assign(keyInfo, {width: keyImg.naturalWidth, height: keyImg.naturalHeight});
}

function edge(matSrc, canvas) {
    if (edgeMethed == "sobel") {
        // https://juejin.cn/post/7097835388441460749
        const dx_gray = new cv.Mat();
        const dy_gray = new cv.Mat();
        cv.Sobel(matSrc, dx_gray, cv.CV_8U, 1, 0, 1, 3, 0, cv.BORDER_DEFAULT); //Sobel算子 x方向
        cv.Sobel(matSrc, dy_gray, cv.CV_8U, 0, 1, 1, 3, 0, cv.BORDER_DEFAULT); //Sobel算子 y方向
        cv.addWeighted(dx_gray, 0.5, dy_gray, 0.5, 0, matSrc);//分别给xy方向分配权重比例
        cv.threshold(matSrc, matSrc, sobelTh, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);

        dx_gray.delete();dy_gray.delete();
    }
    else cv.Canny(matSrc, matSrc, cannyThMin, cannyThMax, 3, false);
    cv.imshow(canvas, matSrc);
}

function strongEdge(matSrc, sEdgeMat, canvas) {
    // console.log("keyInfo.height:", keyInfo.height, "/keyInfo.width:", keyInfo.width);
    // const kksize = Math.max(inImg.height, inImg.width) * strongEdgeCo;
    // https://blog.honjala.net/entry/2019/05/08/234821
    // https://fujiya228.com/opencv-js/
    if(dilateIterations > 0){
        //膨張
        console.log("dilateKsize:", dilateKsize);
        const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(dilateKsize, dilateKsize));
        cv.dilate(matSrc, sEdgeMat, kernel, new cv.Point(-1, 1), dilateIterations);
        kernel.delete();
    }
    if(erodeIterations > 0){
        //収縮
        console.log("erodeKsize:", erodeKsize);
        const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(erodeKsize, erodeKsize));
        cv.erode(matSrc, sEdgeMat, kernel, new cv.Point(-1, 1), erodeIterations);
        kernel.delete();
    }
    // # t = cv2.dilate(img_mat, np.ones((ksize, ksize), dtype='uint8'))
    // # return cv2.erode(t, np.ones((ksize, ksize), dtype='uint8'))
    // # ↑二行は↓一行とほぼ同じ仕組み
    // cv.morphologyEx(matSrc, sEdgeMat, cv.MORPH_CLOSE, kernel, new cv.Point(-1, 1), iterations);
    // https://neko-note.org/react-opencv-opening-closing/868
    // オープニング:収縮 してから 膨張 することで、白色に近いノイズを消すことができます。
    // const kernelSize = cv.Mat.ones(5, 5, cv.CV_8U);
    // cv.morphologyEx(imageMat, imageMat, cv.MORPH_OPEN, kernelSize);
    // クロージング 膨張 してから 収縮 することで、黒色に近いノイズを消すことができます。
    // cv.morphologyEx(imageMat, imageMat, cv.MORPH_CLOSE, kernelSize);
    cv.imshow(canvas, sEdgeMat);//strongEdge
}

function findContours(matSrc, sEdgeMat, getArea, contours) {
    const contours1 = new cv.MatVector();const hierarchy = new cv.Mat();
    cv.findContours(sEdgeMat, contours1, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
    //画像のツリー構造ヒエラルキーをみて、図形の数を絞る
    for (let i = 0; i < contours1.size(); ++i) {
        // if 0 <= hierarchy[0][i][3]:
        // const ht = hierarchy.get(i);
        // https://stackoverflow.com/questions/53102728/opencv-js-iterate-through-contours-hierarchy
        console.log("ht:", hierarchy.intPtr(0, i));//その画素位置が[次の輪郭番号, 前の輪郭番号, 最初子供(内側)の輪郭番号, 親(外側)の輪郭番号]
        console.log("ht:", hierarchy.intPtr(0, i)[3]);//その画素位置が[次の輪郭番号, 前の輪郭番号, 最初子供(内側)の輪郭番号, 親(外側)の輪郭番号]
        console.log("ht:", hierarchy.intAt(0, (i + 1) * 4 - 1));
        // ↑二行は同じコード
        // console.log("get:",contours1.get(i))

        //画像のツリー上で親を持たない図形だけを抽出
        if (-1 == hierarchy.intAt(0, (i + 1) * 4 - 1)) {
            // https://qiita.com/ohisama@github/items/d434a8b80b29aa0476f3
            if (cv.contourArea(contours1.get(i), false) > 3500) {
                //面積が3500以下のものを抽出
                // console.log(cv.contourArea(contours1.get(i), false));
                contours.push_back(contours1.get(i));
            }
        }
    }
    console.log("key_num:", contours.size());
    const red = new cv.Scalar(255, 0, 0);
    const matCounter = matSrc.clone();
    for (let i = 0; i < contours.size(); ++i) {
        cv.drawContours(matCounter, contours, i, red, 1, cv.LINE_AA, hierarchy, 0);
        // cv.drawContours(matSrc, contours, i, red, cv.FILLED, cv.LINE_AA, hierarchy, 0);
        // cv.drawContours(matSrc, contours, i, new cv.Scalar(255, 0, 0), 3, FI);
        // cv.drawContours(matSrc, contours, -1, new cv.Scalar(255, 0, 0), cv.FILLED, cv.LINE_AA, hierarchy);
    }
    cv.imshow(getArea, matCounter);

    contours1.delete();hierarchy.delete();
    matCounter.delete();
    // red.delete();
}

// https://pystyle.info/opencv-structural-analysis-and-shape-descriptors/
async function drawContours(matSrc, contours, ctxGA, keySA, getk) {
    const keyZ = [];
    let keyInfo = {};
    let blobs = {};blobs.a = [];blobs.s = [];blobs.k = [];blobs.i = [];

    //promieseが入る、解決されたら、使用したcanvas配列のindex返す
    let ocrW = [];
    let usingCanvas = [];
    let usedIndex = -1;

    console.log("getKey", getk);
    for (let i = 0; i < keySA.length; i++) {
        // usingCanvas.push(i);
        keyZ.push(new cv.Mat());
        const w1 = await createWorker({
            // workerPath, corePath
            // workerPath: "/dist/worker.dev.js",
            // logger: m => console.log(m)
        });
        //キー画像全体:使用したい言語で検出
        //FIX 日本語、英語以外も対応する？？
        await w1.loadLanguage('jpn');await w1.initialize('jpn');
        await w1.setParameters({
            // tessedit_pageseg_mode: PSM.AUTO,
            tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
            // tessedit_pageseg_mode: PSM.SPARSE_TEXT,
            tessedit_char_whitelist: "",
        });
        //FIX ↑でOCRして文字があるかを確認。OCRエンジンを変更できるように(現在:tesseractOCR, そのうち?:google drive api OCR, winrt OCR)
        //TesseractOCR部分
        //キー画像全体：英語のみで検出
        const w2 = await createWorker();
        let sysKey = getk.sysC;//システムキーのみに使われる文字をWhiteListに
        if(getk.sPart) sysKey = getk.allC;//キー画像を上下左右4分割して見ないならキーボードで使われる文字をWhiteListに
        // await worker.loadLanguage('eng+jpn');await worker.initialize('eng+jpn');
        // await worker.loadLanguage('jpn');await worker.initialize('jpn');
        // await worker.loadLanguage('eng+osd');await worker.initialize('eng+osd');
        await w2.loadLanguage('eng');await w2.initialize('eng');
        // https://github.com/naptha/tesseract.js/blob/master/docs/api.md#workersetparametersparams-jobid-promise
        await w2.setParameters({
            // https://github.com/naptha/tesseract.js/blob/master/src/constants/OEM.js
            // tessedit_ocr_engine_mode: OEM.DEFAULT,
            // https://github.com/naptha/tesseract.js/blob/master/src/constants/PSM.js
            tessedit_pageseg_mode: PSM.AUTO,
            // tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
            // tessedit_pageseg_mode: PSM.SPARSE_TEXT,
            tessedit_char_whitelist: sysKey,
            // tessjs_create_osd: true,
            min_characters_to_try: 10,
            // user_defined_dpi: 96
        });
        if(getk.sPart){
            ocrW.push([w1, w2]);
            continue;
        }
        //四分割したキー画像の左下
        const w3 = await createWorker();
        await w3.loadLanguage('eng');await w3.initialize('eng');
        await w3.setParameters({
            tessedit_pageseg_mode: PSM.SINGLE_CHAR,
            tessedit_char_whitelist: getk.kC,
        });
        //四分割したキー画像の左上
        const w4 = await createWorker();
        await w4.loadLanguage('eng');await w4.initialize('eng');
        await w4.setParameters({
            tessedit_pageseg_mode: PSM.SINGLE_CHAR,
            tessedit_char_whitelist: getk.shiftC
        });
        //四分割したキー画像の右下
        const w5 = await createWorker();
        await w5.loadLanguage('jpn');await w5.initialize('jpn');
        await w5.setParameters({
            tessedit_pageseg_mode: PSM.SINGLE_CHAR,
            tessedit_char_whitelist: getk.langC,
        });
        ocrW.push([w1, w2, w3, w4, w5]);
    }

    for (let i = 0; i < contours.size(); ++i) {
        // 輪郭の点を描画する。
        // ax.plot(cnt[:, 0], cnt[:, 1], "ro", mew=0, ms=4.5)
        // https://docs.opencv.org/4.6.0/dc/dcf/tutorial_js_contour_features.html  Bounding Rectangle
        let rect = cv.boundingRect(contours.get(i));
        // https://docs.opencv.org/4.6.0/dc/dcf/tutorial_js_contour_features.html 1. Moments
        let M = cv.moments(contours.get(i), false);
        console.log("index:", i,"/M.cx:", M.m10 / M.m00, "/M.cy:", M.m01 / M.m00, "/rectWidth:", rect.width,"/recteight:", rect.height);

        keyInfo[i] = {
            //矩形の開始位置
            minX: rect.x, minY: rect.y,
            //矩形の終端位置
            maxX: rect.x + rect.width, maxY: rect.y + rect.height,
            //大きさ
            width: rect.width, height: rect.height,
            //重心位置
            cX: M.m10 / M.m00, cY: M.m01 / M.m00,
            //↓3つは扱うときは[key, shift, ime]にする
            keys: { key: "", shift: "", ime: ""},
        };
        if (rect.height < rect.width + 3) {
            keyInfo[i].shortAxis = "y";keyInfo[i].short = rect.height;
            keyInfo[i].view = rect.height * 0.8;
            // keyInfo[i].radius = rect.height * 0.8;
            keyInfo[i].startX = keyInfo[i].cX - (rect.height * 0.8) / 2;
            keyInfo[i].startY = keyInfo[i].cY - (rect.height * 0.8) / 2;
        } else {
            keyInfo[i].shortAxis = "x";keyInfo[i].short = rect.width;
            keyInfo[i].view = rect.width * 0.8;
            keyInfo[i].startX = keyInfo[i].cX - (rect.width * 0.8) / 2;
            keyInfo[i].startY = keyInfo[i].cY - (rect.width * 0.8) / 2;
        }

        ctxGA.lineWidth = 4;
        ctxGA.fillStyle = "rgba(" + [0, 255, 0, 0.2] + ")";
        ctxGA.strokeStyle = "rgba(" + [0, 255, 0, 0.2] + ")";
        // minXY
        ctxGA.beginPath();
        ctxGA.arc(keyInfo[i].minX, keyInfo[i].minY, 3, 0, 2 * Math.PI);
        ctxGA.fill();
        ctxGA.stroke();
        ctxGA.closePath();
        // maxXY
        ctxGA.fillStyle = "rgba(" + [0, 0, 0, 0.2] + ")";
        ctxGA.strokeStyle = "rgba(" + [0, 0, 0, 0.2] + ")";
        ctxGA.beginPath();
        ctxGA.arc(keyInfo[i].maxX, keyInfo[i].maxY, 2, 0, 2 * Math.PI);
        ctxGA.fill();
        ctxGA.stroke();
        ctxGA.closePath();
        // キーダウン時の印のサイズ
        ctxGA.strokeStyle = "rgba(" + [0, 0, 255, 0.2] + ")";
        ctxGA.beginPath();
        ctxGA.strokeRect(keyInfo[i].startX, keyInfo[i].startY, keyInfo[i].view, keyInfo[i].view);
        ctxGA.closePath();
        // 輪郭(図形)の番号を描画する。
        ctxGA.fillStyle = "rgba(" + [0, 0, 255, 1] + ")";
        ctxGA.beginPath();
        ctxGA.font = (rect.height / viewKeyNumSize).toString() + 'px serif';
        ctxGA.textAlign = "bottom";
        ctxGA.fillText(i.toString(), rect.x + rect.width - (rect.height / viewKeyNumSize) * 1.4, rect.y + rect.height - 6);
        ctxGA.closePath();

        if(usingCanvas.length < keySA.length){
            usedIndex++;
            usingCanvas.push([]);
        }else {
            usedIndex = await Promise.race(usingCanvas);
        }
        //非同期関数が使用してた配列番号を返すので、その配列番号の配列へ非同期関数を入れる(実行結果は使用してる配列番号を返す)
        usingCanvas[usedIndex] = await (async() => {
            // console.log(keySA[usedIndex].id);
            //画像から図形の範囲を切り出す
            // debugger;
            keySA[usedIndex].height = rect.height * keyZoom;keySA[usedIndex].width = rect.width * keyZoom;
            //全体
            let re = new cv.Rect(rect.x + offset, rect.y + offset, rect.width - offset * 2, rect.height - offset * 2);
            if(keyZoom == 1) cv.imshow(keySA[usedIndex], matSrc.roi(re));
            else{
                //拡大、縮小した画像データ作成
                cv.resize(matSrc.roi(re), keyZ[usedIndex], new cv.Size(keySA[usedIndex].width, keySA[usedIndex].height), 0, 0, cv.INTER_CUBIC);
                //canvasに表示
                cv.imshow(keySA[usedIndex], keyZ[usedIndex]);
            }
            // debugger;
            // キー画像全体:使用したい言語で検出、使用言語のsyskeyLang
            // https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md
            let t = (await tesseractOCR(ocrW[usedIndex][0], keySA[usedIndex])).data.text.toString().replaceAll(/[\n ]/g, "");
            let tt = await t;
            // https://qiita.com/fury00812/items/b98a7f9428d1395fc230
            // https://qiita.com/lvn-awano/items/a8b4e594267322e9ada3
            // https://www.gesource.jp/weblog/?p=7635
            tt = tt.normalize("NFKD");
            const lt = tt;
            console.log("sysL:detect@" + i + ":" + tt, tt != "");
            if(tt != "") {
                console.log("sysL:t>1@" + i + ":" + tt);
                for (const [k, v] of Object.entries(getk.sysL)) {
                    if(v.r.test(tt)){
                        console.log("sysL:match" + i + ":" + tt);
                        //検出した文字列をそのままkeyとkeyEvent.codeで使う場合、vがkeyEvent.codeの値を持たない。
                        // 検出した文字がkeyEvent.codeをもっているならキーの名前とコードを入れる。
                        if(v.c != null){
                            keyInfo[i].keys.key = k;
                            //検出回数に合わせてcodeの値を変える(keyEvent.codeがaltleft, altright)みたいなパターン
                            keyInfo[i].keys.code = v.c[v.l];
                        }else{
                            //
                            keyInfo[i].keys.key = tt;
                            keyInfo[i].keys.code = tt;
                        }
                        //検出できたフラグ代わりに
                        keyInfo[i].keys.shift = null;
                        keyInfo[i].keys.ime = null;
                        //検出回数をカウント
                        v.l++;
                        break;
                    }
                }
                for (const [k, v] of Object.entries(getk.sys)) {
                    if(v.r.test(tt)){
                        console.log("sys:match" + i + ":" + tt);
                        if(v.c != null){
                            keyInfo[i].keys.key = k;
                            keyInfo[i].keys.code = v.c[v.l];
                        }else{
                            keyInfo[i].keys.key = tt;
                            keyInfo[i].keys.code = tt;
                        }
                        keyInfo[i].keys.shift = null;
                        keyInfo[i].keys.ime = null;
                        v.l++;
                        break;
                    }
                }
            }else{
                console.log("spaceKey");
                //何も文字が検出できなかった == Spaceキー
                keyInfo[i].keys.key = " ";
                keyInfo[i].keys.code = "Space";
                keyInfo[i].keys.shift = null;
                keyInfo[i].keys.ime = null;
            }

            // debugger;
            // 現在のキー画像から一致する文字を検出できた場合、次のキー画像へ
            if(keyInfo[i].keys.shift == null) return usedIndex;

            const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

            // await sleep(500);
            //キー画像全体：英語のみで検出
            //FIX OCRを変更できるように(現在:tesseractOCR, そのうち?:google drive api OCR, winrt OCR)
            //TesseractOCR部分
            t = (await tesseractOCR(ocrW[usedIndex][1], keySA[usedIndex])).data.text.toString().replaceAll(/[\n ]/g, "");
            tt = await t;
            tt = tt.normalize("NFKD");
            console.log("sys:detect@" + i + ":" + tt, tt.length, tt != "");
            if(tt != "") {
                console.log("sys:t>1@" + i + ":" + tt);
                for (const [k, v] of Object.entries(getk.sys)) {
                    if(v.r.test(tt)){
                        console.log("sys:match" + i + ":" + tt);
                        if(v.c != null){
                            keyInfo[i].keys.key = k;
                            keyInfo[i].keys.code = v.c[v.l];
                        }else{
                            if(tt == "FS") tt = "F5";
                            keyInfo[i].keys.key = tt;
                            keyInfo[i].keys.code = tt;
                        }
                        keyInfo[i].keys.shift = null;
                        keyInfo[i].keys.ime = null;
                        v.l++;
                        break;
                    }
                }
            }
            // debugger;
            //キー画像を上下左右4分割して見ない OR 現在のキー画像から一致する文字を検出できた場合 次のキー画像へ
            if(getk.sPart || keyInfo[i].keys.shift == null) return usedIndex;

            // await sleep(500);
            // 四分割した場合の1マスの大きさ
            let width4 =  re.width / 2; let height4 = re.height / 2;
            // 四分割した場合の1マスの画像の大きさをズームの係数で拡大縮小
            keySA[usedIndex].height = keyZoom * height4; keySA[usedIndex].width = keyZoom * width4;

            //四分割したキー画像の左下//日本語キーボードの場合:キーダウン時の1文字の英数字記号キーの検出
            if(keyZoom == 1) cv.imshow(keySA[usedIndex], matSrc.roi(new cv.Rect(re.x, re.y + height4, width4, height4)));
            else{
                cv.resize(matSrc.roi(new cv.Rect(re.x, re.y + height4, width4, height4)), keyZ[usedIndex], new cv.Size(keySA[usedIndex].width, keySA[usedIndex].height), 0, 0, cv.INTER_CUBIC);
                cv.imshow(keySA[usedIndex], keyZ[usedIndex]);
            }
            // debugger;
            t = (await tesseractOCR(ocrW[usedIndex][2], keySA[usedIndex])).data.text.toString().replaceAll(/[\n ]/g, "");
            tt = await t;
            tt = tt.normalize("NFKD");
            console.log("key:detect@" + i + ":" + tt, tt.length, tt != "");
            if(tt != "" && tt.length == 1) {
                console.log("key:t>1@" + i + ":" + tt);
                for (const [k, v] of Object.entries(getk.k)) {
                    if(v.k == tt){
                        console.log("key:match" + i + ":" + tt);
                        keyInfo[i].keys.key = v.k;
                        keyInfo[i].keys.code = k;
                        if(Object.hasOwn(getk.shift, k)) keyInfo[i].keys.shift = getk.shift[k].k;
                        break;
                    }
                }
            }

            //現在の見ているキー画像から一致する文字を検出できた場合 次のキー画像へ
            // if(keyInfo[i].keys.shift.length > 0) return usedIndex;

            // await sleep(500);
            //四分割したキー画像の左上//日本語キーボードの場合:Shift&キーダウン時の1文字の英数字記号キーの検出
            if(keyZoom == 1) cv.imshow(keySA[usedIndex], matSrc.roi(new cv.Rect(re.x, re.y, width4, height4)));
            else{
                cv.resize(matSrc.roi(new cv.Rect(re.x, re.y, width4, height4)), keyZ[usedIndex], new cv.Size(keySA[usedIndex].width, keySA[usedIndex].height), 0, 0, cv.INTER_CUBIC);
                cv.imshow(keySA[usedIndex], keyZ[usedIndex]);
            }
            // await ocrW[usedIndex].setParameters({
            //     tessedit_pageseg_mode: PSM.SINGLE_CHAR,
            //     tessedit_char_whitelist: k.shiftKeyChar
            // });
            t = (await tesseractOCR(ocrW[usedIndex][3], keySA[usedIndex])).data.text.toString().replaceAll(/[\n| |　]/g, "");
            tt = await t;
            tt = tt.normalize("NFKD");
            console.log("shift:detect@" + i + ":" + tt, tt.length, tt != "");
            if(tt != "" && tt.length == 1) {
                console.log("shift:t>1@" + i + ":" + tt);
                for (const [k, v] of Object.entries(getk.shift)) {
                    if(v.k == tt){
                        console.log("shift:match" + i + ":" + tt);
                        keyInfo[i].keys.shift = v.k;
                        if(Object.hasOwn(v, "oi")){
                            keyInfo[i].keys.oi = v.oi;
                        }else if(Object.hasOwn(v, "ti")){
                            keyInfo[i].keys.ti = v.ti;
                        }
                        console.log("keys.key:" + keyInfo[i].keys.key)
                        if(keyInfo[i].keys.key == "") {
                            keyInfo[i].keys.code = k;
                            if( "A" <= tt && tt < "Z") keyInfo[i].keys.key = tt.toLowerCase();
                            else if(Object.hasOwn(getk.k, k)) keyInfo[i].keys.key = getk.k[k].k;
                        }
                        break;
                    }
                }
            }

            // await sleep(500);
            //四分割したキー画像の右下//日本語キーボードの場合:かな入力でキーダウン時の1文字の日本語の検出
            if(keyZoom == 1) cv.imshow(keySA[usedIndex], matSrc.roi(new cv.Rect(re.x + width4, re.y + height4, width4, height4)));
            else{
                cv.resize(matSrc.roi(new cv.Rect(re.x + width4, re.y + height4, width4, height4)), keyZ[usedIndex], new cv.Size(keySA[usedIndex].width, keySA[usedIndex].height), 0, 0, cv.INTER_CUBIC);
                cv.imshow(keySA[usedIndex], keyZ[usedIndex]);
            }
            t = (await tesseractOCR(ocrW[usedIndex][4], keySA[usedIndex])).data.text.toString().replaceAll(/[\n ]/g, "");
            tt = await t;
            tt = tt.normalize("NFKD");
            console.log("lang:detect@" + i + ":" + tt, tt.length, tt != "");
            if(tt != "" && tt.length == 1) {
                console.log("lang:t>1@" + i + ":" + tt);
                const r = new RegExp(tt).test(lt);
                console.log("lang include skeyLang:", r);
                if(r) {
                    for (const [k, v] of Object.entries(getk.lang)) {
                        if(v.k == tt){
                            console.log("lang:match" + i + ":" + tt);
                            keyInfo[i].keys.ime = v.k;
                            keyInfo[i].keys.code = k;
                            if(Object.hasOwn(v, "oi")){
                                keyInfo[i].keys.oi = v.oi;
                            }else if(Object.hasOwn(v, "ti")){
                                keyInfo[i].keys.ti = v.ti;
                            }
                            // if(keyInfo[i].keys.key.length == 0) {
                                if(Object.hasOwn(getk.shift, k)) keyInfo[i].keys.shift = getk.shift[k].k;

                                if(Object.hasOwn(getk.k, k)) keyInfo[i].keys.key = getk.k[k].k;
                                else if ("A" <= getk.shift[k].k && getk.shift[k].k <= "Z") keyInfo[i].keys.key = getk.shift[k].k.toLowerCase();
                            // }
                            break;
                        }
                    }
                }
            }
            return usedIndex;
        })();
	}
    await Promise.all(usingCanvas);
    keyZ.forEach(v =>{
        v.delete();
    });
    let w = [];
    ocrW.forEach(v => {
        v.forEach( vv => {
            w.push(vv.terminate());
        })
    });
    await Promise.all(w);
    // return {b: blobs,k: keyInfo};
    return keyInfo;
}