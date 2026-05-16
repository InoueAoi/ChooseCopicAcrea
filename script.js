// CopyRight 2026 井上葵.
'use strict';
// 変数の定義
const
    button = document.getElementById('gacha-button'),
    back = document.getElementById('back'),
    navs = document.getElementsByClassName('nav'),
    removedChecks =document.getElementsByClassName('removed-color'),
    colors = document.getElementById('color-table').getElementsByClassName('colors'),
    resultBox = document.getElementById('result'),
    resultColors = document.getElementsByClassName('result-colors'),
    canvas = document.getElementById('result-graph');

// 関数
//  JSON（色のリスト）の読み込み
async function getJSON() {
    let jsonURL = 'https://raw.githubusercontent.com/InoueAoi/ChooseCopicAcrea/refs/heads/main/acrea.json';
    const request = new Request(jsonURL);
    const response = await fetch(request);
    const JSON = await response.json();
    // console.log(JSON);
    return JSON;
}
//  色リストから3つ選ぶ
async function chooseColors() {
    let choosen = [],
        count = 0;
    let colors = await getJSON();
    //  canvas機能に対応しているか
    if(canvas.getContext) {
       var ctx = canvas.getContext('2d');
    } else {
        window.alert('ブラウザがCanvasに対応していません。\nこのアプリはご利用いただけません。');
    }
    //  JSON（色リスト）からチェックのついたものを除外
    Array.from(removedChecks).forEach((check, i) => {
        if(check.checked) {
            colors[i] = null;
            count++;
        }
    });
    //  チェックボックスが22個以上選択されている=選べる色が3つもない とき、処理を中止
    if(count > 21) {
        window.alert('選べる色が3色以上ありません。');
        return;
    }
    while(choosen.length < 3) {
        let random = Math.floor(Math.random() * colors.length);
        // console.log(random);
        if(!colors[random]) {
            // console.log('除外された色です');
            continue;
        } else {
            choosen.push(colors[random]);
            colors[random] = null;
        }
    }
    //  結果の欄に出力
    choosen.forEach((choice, i) => {
        // console.log(choice);
        let br = document.createElement('br');
        // resultBox > div > div > span を取得
        let span = resultBox.children[1].children[i].children[0];
        // よくわからんが、パラメータを変数として使えるらしいので、カラーコードを書き換える
        span.style.setProperty('--before-bg-color', choice[2]);
        // p要素の中身を組み立てる
        resultColors[i].append(choice[1]);
        resultColors[i].appendChild(br);
        resultColors[i].append(choice[0]);
        //canvasの出力 よくわからないけど動いている。
        ctx.fillStyle = choice[2];
        ctx.fillRect(100 * i, 0, 100, 240);
    });
    //  cssを設定して要素を表示/非表示
    for(let nav of navs) {
        nav.style.display = 'none';
    };
    resultBox.style.display = 'block';
}
// span::before の色を順番に対応したものに変える
async function setSpanColor() {
    let colorset = await getJSON();
    for(let i = 0; colors.length > i; i++){
        let span = colors[i];
        span.style.setProperty('--before-bg-color', colorset[i][2]);
    }
}

// ハンドル
button.onclick = chooseColors;
back.onclick = () => {
    for(let nav of navs) {
        nav.style.display = 'block';
    }
    resultBox.style.display = 'none';
    for(let result of resultColors) {
        result.textContent = null;
    }
}
//関数の実行
setSpanColor();