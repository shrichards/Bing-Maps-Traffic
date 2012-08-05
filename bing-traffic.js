shr = shr || {};
shr.maps = shr.maps || {};


shr.maps.bingTraffic = new function(options){

	this._options = {
		// Key used to sign requests to the bing mapping Api
		'bingApiKey':''
	}

	this._init(options)
}

shr.maps.bingTraffic.prototype{

	_init : function(options){
		this._applyOptions(options);
	},

	_applyOptions : function(options) {
		for(var prop in options) {
			this._options[prop] = options[prop];
		}
	}
}
