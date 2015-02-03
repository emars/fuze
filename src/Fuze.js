(function(Window, TWEEN){
	'use strict';
	var Fuze = function(el, property){
		this._el = el;
		this._running = false;
		this.property = property || 'color';
		this._queue = [];
		this.Easing = TWEEN.Easing;
	};

	Fuze.prototype.run = function(opts){
		if(this._running){
			return;
		}
		opts = opts || {};
		opts.repeat = opts.repeat || false;
		opts.easing = opts.easing || this.Easing.Linear.None;	
		var easing = opts.easing;
		var elColor = Window.getComputedStyle(this._el)[this.property];
		elColor = rgbToHex(elColor);

		var self = this;

		var prevColor = hexToObj(elColor);

		var tweens = this._queue.map(function(tweenReq){
			return new TWEEN.Tween(prevColor)
				.to(tweenReq.color, tweenReq.duration)
				.easing(easing)
				.onUpdate(function(){
					self._el.style[self.property] = toHex(this);
				});	
		});
		
		var prevTween;	
		var firstTween = tweens[0];
		var lastTween = tweens[tweens.length - 1];

		tweens.forEach(function(tween){
			if(prevTween !== undefined){
				prevTween.chain(tween);
			}
			prevTween = tween;
		});
		if(opts.repeat){
			lastTween.chain(firstTween);
		}

		var animate = function(time){
			Window.requestAnimationFrame(animate);
			TWEEN.update(time);
		};

		firstTween.start();
		animate();

		this._running = true;
		this._started = +new Date();
		this._queue = [];
	};

	Fuze.prototype.to = function(color,duration){
		duration = duration || 1000;
		this._queue.push({ color: hexToObj(color), duration: duration});
		return this;
	}; 

	Fuze.prototype.stop = function(){
		if(this._currentTween){
			this._currentTween.pause();
		}
	};
	
	Fuze.prototype.delay = function(duration){
		duration = duration || 1000;
		this._queue.push({ color: 'prev', druation: duration});
		return this;
	};

	var hexToObj = function(hex){
		var obj = {};
		obj.r = parseInt(hex.charAt(1) + hex.charAt(2), 16);
		obj.g = parseInt(hex.charAt(3) + hex.charAt(4), 16);
		obj.b = parseInt(hex.charAt(5) + hex.charAt(6), 16);
		return obj;
	};

	var toHex = function(obj){
		obj.r = Math.round(obj.r);
		obj.g = Math.round(obj.g);
		obj.b = Math.round(obj.b);
		if(obj.r < 0){
			obj.r = 0;
		}
		if(obj.g < 0){
			obj.g = 0;
		}
		if(obj.b < 0){
			obj.b = 0;
		}
		var hexString = '#';
		hexString += formatHexNumber(obj.r);
		hexString += formatHexNumber(obj.g);
		hexString += formatHexNumber(obj.b);
		return hexString;
	};

	var formatHexNumber = function(number){
		var hexNumber = number.toString(16);
		return number < 10  ? '0' + hexNumber : hexNumber;
	};

	var rgbToHex = function(rgb){
	 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	 return (rgb && rgb.length === 4) ? '#' +
		('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
		('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
		('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	};

	Window.Fuze = Fuze;

}(window, window.TWEEN));
