// マップタイプ
var maptypelist = [
	{name:"GoogleMap", type:"google"},
	{name:"Yahoo! MAP", type:"yahoo"},
	{name:"地理院地図", type:"gsi"}
];

// セレクトボックスにマップタイプを出力
function createMapTypeOption() {
	var select = document.getElementById("maptype");
	for(var i = 0; i < maptypelist.length; i ++) {
		var option = document.createElement("option");
		option.text = maptypelist[i].name;
		option.value = maptypelist[i].type;
		select.appendChild(option);
	}
}

// 地図を開く
function openMap() {
	// textフィールドからNOTAM PLACEを取得
	var notamplace = document.getElementById("notamplace").value;
	
	// 緯度経度を度に変換
	var match = notamplace.match(/([0-9]{6}[\.0-9]*)N([0-9]{7}[\.0-9]*)E/);
	if (! match || match.length != 3) {
		alert("Invalid NOTAM PLACE: " + notamplace);
		return;
	}
	var lat = dms2deg(match[1]);
	var lon = dms2deg(match[2]);
	
	// マップタイプを取得
	var maptype = document.getElementById("maptype");
	var type = maptype.options[maptype.selectedIndex].value;
	
	// URL生成
	var url = "";
	switch (type) {
		case "google":
			url = getGoogleUrl(lat, lon);
			break;
		case "yahoo":
			url = getYahooUrl(lat, lon);
			break;
		case "gsi":
			url = getGsiUrl(lat, lon);
			break;
		default:
			concole.log("Unsupported Map Type");
	}
	
	// 地図を開く
	window.open(url, "nppmap");
 }

// 度分秒を度に変換
function dms2deg(dms) {
	var degree = Math.floor(parseFloat(dms) / 10000);
	var minute = Math.floor(parseFloat(dms) / 100) % 100;
	var second = parseFloat(dms) - degree * 10000 - minute * 100;
	
	return degree + minute / 60 + second / 3600;
}

// GoogleMAPのURLを生成
function getGoogleUrl(lat, lon) {
	return "https://www.google.co.jp/maps?q=" + lat + "," + lon;
}

// Yahoo! MAPのURLを生成
function getYahooUrl(lat, lon) {
	return "https://map.yahoo.co.jp/maps?lat=" + lat + "&lon=" + lon + "&z=17";
}

// 地理院地図のURLを生成
function getGsiUrl(lat, lon) {
	return "https://maps.gsi.go.jp/#16/" + lat + "/" + lon + "/";
}