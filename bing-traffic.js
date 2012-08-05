var bingTraffic = new function(options){
	this._options = {
		'bingApiKey':''
	}

	this._init(options)
}

bingTraffic.prototype{

	_init : function(options){
		this._applyOptions(options);
	},

	_applyOptions : function(options) {
		for(var prop in options) {
			this._options[prop] = options[prop];
		}
	}
}
