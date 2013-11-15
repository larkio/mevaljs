define(['underscore', 'pegjsParser'], function(_, pegjsParser) {

	function parse(mq) {
		var res = pegjsParser.parse(mq);

		return res;
	}

	function getPixels(value) {
		if(!value.unit || value.unit === "px") {
			return value.value;
		}
	}

	function getDpi(value) {
		if(value.unit === "dpcm") {
			return value.value * 2.54;
		}
		else if(value.unit === "dpi") {
			return value.value;
		}
	}

	function checkFeature(featureType, value, env) {
		var featureType = featureType.toLowerCase();

		if("min-height" === featureType) {
			var pixels = getPixels(value);

			if(env.height >= pixels) {
				return true;
			}
		}
		else if("min-width" === featureType) {
			var pixels = getPixels(value);

			if(env.width >= pixels) {
				return true;
			}
		}
		else if("max-height" === featureType) {
			var pixels = getPixels(value);

			if(env.height <= pixels) {
				return true;
			}
		}
		else if("max-width" === featureType) {
			var pixels = getPixels(value);

			if(env.width <= pixels) {
				return true;
			}
		}
		else if("min-resolution" === featureType) {
			var dpi = getDpi(value);

			if(env.resolution >= dpi) {
				return true;
			}
		}
		else if("max-resolution" === featureType) {
			var dpi = getDpi(value);

			if(env.resolution <= dpi) {
				return true;
			}
		}
		else if("orientation" === featureType) {
			if("orientation" === value.type) {
				if(value.value === env.orientation) {
					return true;
				}
			}
		}

		return false;
	}

	function checkMediaType(mediaType, env, not, only) {
		var mediaType = mediaType.toLowerCase();

		if(mediaType === "all") {
			return true;
		}

		if(!not && env.mediaType.toLowerCase() === mediaType) {
			return true;
		}

		if(not && env.mediaType.toLowerCase() !== mediaType) {
			return true;
		}

		return false;
	}

	function eval(ast, env) {
		if(_.isArray(ast)) {
			for(var i = 0, l = ast.length; i < l; i++) {
				if(!eval(ast[i], env)) {
					return false;
				}
			}

			return true;
		}
		else if(_.isObject(ast)) {
			if(ast.type === "feature") {
				return checkFeature(ast.feature, ast.value, env);
			}
			else if(ast.type === "media_type") {
				return checkMediaType(ast.value, env, ast.not, ast.only);
			}
		}
	}

	return {
		parse: parse,
		eval: eval
	};
});
