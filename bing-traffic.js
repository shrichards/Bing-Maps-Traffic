var shr = shr || {};
shr.maps = shr.maps || {};


shr.maps.bingTraffic = function(options){

	this._options = {
		// Key used to sign requests to the bing mapping Api
		'bingApiKey':''
	}

	this._baseUrl = "http://dev.virtualearth.net/REST/v1/Routes";

	this._init(options)
}

shr.maps.bingTraffic.prototype = {

	_init : function(options){
		this._applyOptions(options);
	},

	calculate_driveTime : function(start, end, onSuccess, onError) {	
		var successHandler = onSuccess || function(){};
		var errorHander = onError || function(){};

		var data = {
			'waypoint.0': start,
			'waypoint.1': end,
			'optimize': 'timeWithTraffic',
			'distanceUnit':'mi',
			'key':this._options.bingApiKey,
			'JsonType':'callback',
			'JsonCallback':'?'
		};

		jQuery.ajax(this._baseUrl, {
			type:'GET',
			cache:false,
			dataType:'jsonp',
			jsonp:'jsonp',
			data:data,
			success: function(data, textStats, jqXHR){
				var timeAndDistance = [];
				var resourceSets = data.resourceSets;
				var setCount = resourceSets.length;
				
				var departureTime = Date.today();
				for(var set = 0; set < setCount; set++){
					var resourceCount = resourceSets[set].resources.length;
					for(var res = 0; res < resourceCount; res++){
						var resource = resourceSets[set].resources[res];
						if(resource.travelDistance && resource.travelDistance) {
							timeAndDistance.push({
								distance:resource.travelDistance, 
								time:resource.travelDuration,
								departure:new Date(),
								arrival:new Date().addSeconds(resource.travelDuration)
							});
						}
					}
				}
				
				successHandler(timeAndDistance);
			},
			error: function(jqXHR, textStatus, errorThrown){

			}
		});
	},

	_applyOptions : function(options) {
		for(var prop in options) {
			this._options[prop] = options[prop];
		}
	}
}
