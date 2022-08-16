var map;


function updateURLParameter(url, param, paramVal) {
	var theAnchor = null;
	var newAdditionalURL = "";
	var tempArray = url.split("?");
	var baseURL = tempArray[0];
	var additionalURL = tempArray[1];
	var temp = "";

	if (additionalURL) {
		var tmpAnchor = additionalURL.split("#");
		var theParams = tmpAnchor[0];
		theAnchor = tmpAnchor[1];
		if (theAnchor) {
			additionalURL = theParams;
		}

		tempArray = additionalURL.split("&");

		for (i = 0; i < tempArray.length; i++) {
			if (tempArray[i].split('=')[0] != param) {
				newAdditionalURL += temp + tempArray[i];
				temp = "&";
			}
		}
	} else {
		var tmpAnchor = baseURL.split("#");
		var theParams = tmpAnchor[0];
		theAnchor = tmpAnchor[1];

		if (theParams) {
			baseURL = theParams;
		}
	}

	if (theAnchor) {
		paramVal += "#" + theAnchor;
	}

	var rows_txt = temp + "" + param + "=" + paramVal;
	return baseURL + "?" + newAdditionalURL + rows_txt;
}


function changeLanguage(pLang) {
	window.location.href = updateURLParameter(window.location.href, 'lang', pLang);
}


function getUrlParameters() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function foundLocation(position) {
	if (typeof map != "undefined") {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		map.setView(new L.LatLng(lat, lon), 11);
	}
}


function myWindroseMarker(data) {
	var content = '<canvas id="id_' + data.id + '" width="50" height="50"></canvas>';
	var icon = L.divIcon({ html: content, iconSize: [50, 50], className: 'owm-div-windrose' });
	return L.marker([data.coord.Lat, data.coord.Lon], { icon: icon, clickable: false });
}


function myWindroseDrawCanvas(data, owm) {

	var canvas = document.getElementById('id_' + data.id);
	canvas.title = data.name;
	var angle = 0;
	var speed = 0;
	var gust = 0;
	if (typeof data.wind != 'undefined') {
		if (typeof data.wind.speed != 'undefined') {
			canvas.title += ', ' + data.wind.speed + ' m/s';
			canvas.title += ', ' + owm._windMsToBft(data.wind.speed) + ' BFT';
			speed = data.wind.speed;
		}
		if (typeof data.wind.deg != 'undefined') {
			//canvas.title += ', ' + data.wind.deg + '°';
			canvas.title += ', ' + owm._directions[(data.wind.deg / 22.5).toFixed(0)];
			angle = data.wind.deg;
		}
		if (typeof data.wind.gust != 'undefined') {
			gust = data.wind.gust;
		}
	}
	if (canvas.getContext && speed > 0) {
		var red = 0;
		var green = 0;
		if (speed <= 10) {
			green = 10 * speed + 155;
			red = 255 * speed / 10.0;
		} else {
			red = 255;
			green = 255 - (255 * (Math.min(speed, 21) - 10) / 11.0);
		}
		var ctx = canvas.getContext('2d');
		ctx.translate(25, 25);
		ctx.rotate(angle * Math.PI / 180);
		ctx.fillStyle = 'rgb(' + Math.floor(red) + ',' + Math.floor(green) + ',' + 0 + ')';
		ctx.beginPath();
		ctx.moveTo(-15, -25);
		ctx.lineTo(0, -10);
		ctx.lineTo(15, -25);
		ctx.lineTo(0, 25);
		ctx.fill();

		// draw inner arrow for gust
		if (gust > 0 && gust != speed) {
			if (gust <= 10) {
				green = 10 * gust + 155;
				red = 255 * gust / 10.0;
			} else {
				red = 255;
				green = 255 - (255 * (Math.min(gust, 21) - 10) / 11.0);
			}
			canvas.title += ', gust ' + data.wind.gust + ' m/s';
			canvas.title += ', ' + owm._windMsToBft(data.wind.gust) + ' BFT';
			ctx.fillStyle = 'rgb(' + Math.floor(red) + ',' + Math.floor(green) + ',' + 0 + ')';
			ctx.beginPath();
			ctx.moveTo(-15, -25);
			ctx.lineTo(0, -10);
			//ctx.lineTo(15, -25);
			ctx.lineTo(0, 25);
			ctx.fill();
		}
	} else {
		canvas.innerHTML = '<div>'
			+ (typeof data.wind != 'undefined' && typeof data.wind.deg != 'undefined' ? data.wind.deg + '°' : '')
			+ '</div>';
	}
}


function windroseAdded(e) {
	for (var i in this._markers) {
		var m = this._markers[i];
		var cv = document.getElementById('id_' + m.options.owmId);
		for (var j in this._cache._cachedData.list) {
			var station = this._cache._cachedData.list[j];
			if (station.id == m.options.owmId) {
				myWindroseDrawCanvas(station, this);
			}
		}
	}
}

function myOwmMarker(data) {
	// just a Leaflet default marker
	return L.marker([data.coord.Lat, data.coord.Lon]);
}


function myOwmPopup(data) {
	// just a Leaflet default popup
	return L.popup().setContent(typeof data.name != 'undefined' ? data.name : data.id);
}

function toggleWheel(localLang) {
	if (map.scrollWheelZoom._enabled) {
		map.scrollWheelZoom.disable();
		document.getElementById('wheelimg').src = 'assets/files/ScrollWheelDisabled20.png';
		document.getElementById('wheeltxt').innerHTML = getI18n('scrollwheel', localLang) + ' ' + getI18n('off', localLang);
	} else {
		map.scrollWheelZoom.enable();
		document.getElementById('wheelimg').src = 'assets/files/ScrollWheel20.png';
		document.getElementById('wheeltxt').innerHTML = getI18n('scrollwheel', localLang) + ' ' + getI18n('on', localLang);
	}
}

/**
 * Initialize the map.
 */
function initMap() {

	var cba = L.marker([-31.38, -64.18]).bindPopup('Córdoba.'),
		cuarto = L.marker([-33.1, -64.34]).bindPopup('Río Cuarto.'),
		juarez = L.marker([-32.7, -62.10]).bindPopup('Marco Juarez.'),
		tercero = L.marker([-32.18, -64.10]).bindPopup('Río Tercero.');
	cdu = L.marker([-32.48, -58.23]).bindPopup('Concepción del Uruguay.');
	gchu = L.marker([-33.00, -58.30]).bindPopup('Gualeguaychu.');
	pna = L.marker([-31.73, -60.53]).bindPopup('Paraná.');
	villaguay = L.marker([-31.86, -59.01]).bindPopup('Villaguay.');
	bahia = L.marker([-38.42, -62.16]).bindPopup('Bahía Blanca.');
	arroyos = L.marker([-38.37, -60.27]).bindPopup('Tres Arroyos.');
	baradero = L.marker([-33.80, -59.50]).bindPopup('Baradero.');
	areco = L.marker([-34.38, -59.82]).bindPopup('Carmen de Areco.');


	var cordoba = L.layerGroup([cba, cuarto, juarez, tercero]);
	var erios = L.layerGroup([cdu, gchu, pna, villaguay]);
	var bsas = L.layerGroup([bahia, arroyos, baradero, areco]);

	var centro = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		minZoom: 3,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> ',

	});



	var OWM_API_KEY = '4f15e9a093d5c0e59e9f98d6b7e8ec5a';

	var clouds = L.OWM.clouds({ opacity: 0.8, legendImagePath: 'assets/files/nubosidad.png', appId: OWM_API_KEY });
	var precipitation = L.OWM.precipitation({ opacity: 0.5, appId: OWM_API_KEY });
	var rain = L.OWM.rain({ opacity: 0.5, appId: OWM_API_KEY });
	var snow = L.OWM.snow({ opacity: 0.5, legendImagePath: 'assets/files/nieve.png' , appId: OWM_API_KEY });
	var pressure = L.OWM.pressure({ opacity: 0.4, legendImagePath: 'assets/files/presion.png', appId: OWM_API_KEY });
	var pressurecntr = L.OWM.pressureContour({ opacity: 0.5, appId: OWM_API_KEY });
	var temp = L.OWM.temperature({ opacity: 0.5, legendImagePath: 'assets/files/temperatura.png', appId: OWM_API_KEY });
	var wind = L.OWM.wind({ opacity: 0.5, legendImagePath: 'assets/files/viento.png', appId: OWM_API_KEY });

	var localLang = getLocalLanguage();

	var city = L.OWM.current({
		intervall: 15, imageLoadingUrl: 'assets/leaflet/owmloading.gif', lang: localLang, minZoom: 5,
		appId: OWM_API_KEY
	});
	var windrose = L.OWM.current({
		intervall: 15, imageLoadingUrl: 'assets/leaflet/owmloading.gif', lang: localLang, minZoom: 4,
		appId: OWM_API_KEY, markerFunction: myWindroseMarker, popup: false, clusterSize: 50,
		imageLoadingBgUrl: 'https://openweathermap.org/img/w0/iwind.png'
	});
	windrose.on('owmlayeradd', windroseAdded, windrose); // Add an event listener to get informed when windrose layer is ready

	var useGeolocation = true;
	var zoom = 5;
	var lat = -33.13;
	var lon = -64.35;
	var urlParams = getUrlParameters();
	if (typeof urlParams.zoom != "undefined" && typeof urlParams.lat != "undefined" && typeof urlParams.lon != "undefined") {
		zoom = urlParams.zoom;
		lat = urlParams.lat;
		lon = urlParams.lon;
		useGeolocation = false;
	}




	map = L.map('map', {
		center: new L.LatLng(lat, lon), zoom: zoom,
		layers: [centro]
	});
	map.attributionControl.setPrefix("");

	map.addControl(L.languageSelector({
		languages: new Array(
			L.langObject('en', 'English', 'assets/mapicons/en.png')
			, L.langObject('es', 'Español', 'assets/mapicons/es.png')

		),
		callback: changeLanguage,
		initialLanguage: localLang,
		hideSelected: false,
		vertical: false
	}));

	var baseMaps = {

		"Córdoba": cordoba,
		"Buenos Aires": bsas,
		"Entre Ríos": erios

	};

	var geocoder = L.Control.geocoder({
		defaultMarkGeocode: false,
		position: 'topleft',
		placeholder: 'Buscar',
		errorMessage: 'No se encontró nada',
		iconLabel: 'Iniciando nueva busqueda',
		queryMinLength: 1,
		suggestMinLength: 3,
		suggestTimeout: 250

	})
		.on('markgeocode', function (e) {
			var bbox = e.geocode.bbox;

			map.fitBounds(bbox);
		});






	var overlayMaps = {};
	overlayMaps[getI18n('clouds', localLang)] = clouds;
	overlayMaps[getI18n('precipitation', localLang)] = precipitation;
	overlayMaps[getI18n('rain', localLang)] = rain;
	overlayMaps[getI18n('snow', localLang)] = snow;
	overlayMaps[getI18n('temp', localLang)] = temp;
	overlayMaps[getI18n('windspeed', localLang)] = wind;
	overlayMaps[getI18n('pressure', localLang)] = pressure;
	overlayMaps[getI18n('presscont', localLang)] = pressurecntr;
	overlayMaps[getI18n('city', localLang) + " (min Zoom 5)"] = city;
	overlayMaps[getI18n('windrose', localLang)] = windrose;


	var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: true }).addTo(map);
	map.addControl(new L.Control.Permalink({ layers: layerControl, useAnchor: false, position: 'bottomright' })); geocoder.addTo(map);;

	// patch layerControl to add some titles
	var patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = getI18n('layers', localLang); // 'TileLayers';
	layerControl._form.children[2].parentNode.insertBefore(patch, layerControl._form.children[2]);
	patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
	layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length - 2]);
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');
	patch.innerHTML = getI18n('current', localLang); // 'Current Weather';
	layerControl._form.children[3].children[0].parentNode.insertBefore(patch, layerControl._form.children[3].children[layerControl._form.children[3].children.length - 2]);
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');

	patch = L.DomUtil.create('div', 'leaflet-control-layers-separator');
	layerControl._form.children[0].parentNode.insertBefore(patch, null);
	patch = L.DomUtil.create('div', 'owm-layercontrol-header');

}
