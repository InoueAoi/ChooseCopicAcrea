// CopyRight 2026 井上葵.
'use strict';
// 変数の定義
const
    button = document.getElementById('gacha-button'),
    nav = document.getElementsByClassName('nav'),
    colorTable = document.getElementById('color-table'),
    removedColors =document.getElementsByClassName('removed-color'),
    colors = document.getElementsByClassName('colors'),
    resultBox = document.getElementById('result'),
    resultColors = document.getElementsByClassName('result-color'),
    canvas = document.getElementById('result-graph');

// 関数
async function getJSON() {
    var jsonURL = '';
    const request = new Request(jsonURL);
    const response = await fetch(request);
    const colorInfo = response.json();
}
//関数の実行
/*
getJSON();
console.log(colorInfo[0][0]);
*/