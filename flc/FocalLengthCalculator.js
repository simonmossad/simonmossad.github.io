// センサーリスト(幅・高さ)
var sensorlist = [
	{name:"35mm fullframe (3:2)", width:36.0, height:24.0},
	{name:"35mm fullframe (16:9)", width:36.0, height:20.25},
	{name:"APS-C (3:2)", width:23.6, height:15.8},
	{name:"APS-C (16:9)", width:23.6, height:13.275},
	{name:"APS-C CANON (3:2)", width:22.3, height:14.9},
	{name:"APS-C CANON (16:9)", width:22.3, height:12.54735},
	{name:"super35mm (16:9)", width:24.0, height:13.5},
	{name:"Four Thirds (4:3)", width:17.3, height:13.0},
	{name:"Four Thirds (16:9)", width:17.3, height:9.73125},
	{name:"1 inch (3:2)", width:13.2, height:8.8},
	{name:"1 inch (16:9)", width:13.2, height:7.425}
];

// 玉リスト(開花半径・開発高度)
var shelllist = [
	{name:"2.5号", radius:25, height:80},
	{name:"3号", radius:30, height:120},
	{name:"4号", radius:60, height:160},
	{name:"5号", radius:80, height:200},
	{name:"6号", radius:100, height:220},
	{name:"7号", radius:110, height:250},
	{name:"8号", radius:130, height:280},
	{name:"10号", radius:150, height:330},
	{name:"15号", radius:200, height:400},
	{name:"20号", radius:240, height:500},
	{name:"30号", radius:300, height:600},
	{name:"40号", radius:375, height:750}
];

// セレクトボックスにセンサーリストを出力
function createSensorSizeOption() {
	var select = document.getElementById("sensorsizelist");
	for(var i = 0; i < sensorlist.length; i ++) {
		var option = document.createElement("option");
		option.value = i;
		option.text = sensorlist[i].name;
		select.appendChild(option);
	}
	setSensorSize();
}

// センサーサイズを出力
function setSensorSize() {
	var select = document.getElementById("sensorsizelist");
	var i = select.options[select.selectedIndex].value;
	document.getElementById("sensorwidth").value = sensorlist[i].width;
	document.getElementById("sensorheight").value = sensorlist[i].height;
}

// 焦点距離を計算＆出力
function calcForcalLength() {
	// textフィールドから値を取得
	var distance = document.getElementById("distance").value;
	var sensorwidth = document.getElementById("sensorwidth").value;
	var sensorheight = document.getElementById("sensorheight").value;
	
	// 入力値チェック
	if (isNaN(distance) || isNaN(sensorwidth) || isNaN(sensorheight) || distance <= 0 || sensorwidth <= 0 || sensorheight <= 0) {
		alert("センサーサイズ又は筒までの距離が不正です!!");
		return false;
	}
	
	// 出力先テーブルを初期化
	var result = document.getElementById("result");
	var rowid = result.rows.length;
	while(rowid > 1) {
		result.deleteRow(-- rowid);
	}
	
	// 玉毎に計算結果を出力
	for(var i = 0; i < shelllist.length; i ++) {
		// 仰角計算
		var angle = calcAngle(distance, shelllist[i].radius, shelllist[i].height);
		
		// 焦点距離計算
		var coefficient = Math.tan(angle / 2) * 2;
		var flh = sensorheight / coefficient;
		var flv = sensorwidth / coefficient;
		
		// テーブルに計算結果を出力
		var row = result.insertRow(rowid ++);
		var cname = row.insertCell(0);
		var cangle = row.insertCell(1);
		var cflh = row.insertCell(2);
		var cflv = row.insertCell(3);
		cname.innerHTML = shelllist[i].name;
		cangle.innerHTML = (angle / Math.PI * 180).toFixed(2);
		cflh.innerHTML = flh.toFixed(2);
		cflv.innerHTML = flv.toFixed(2);
	}
}

// 仰角計算
function calcAngle(distance, radius, height) {
	var hypotenus = Math.sqrt(distance ** 2 + height ** 2);
	var heightangle = Math.atan(height / distance);
	var radiusangle = Math.asin(radius / hypotenus);
	return heightangle + radiusangle;
}
