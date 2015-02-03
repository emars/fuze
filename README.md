#Fuze
###Simple DOM Color Tweening

Built using Tween.js 

```
	var el = document.getElementById('my-element');
	var fuze = new Fuze(el, 'background-color');
	
	fuze.to('#00ff00', 500)
		.delay(1000)
		.to('#ff0000', 1000)
		.delay(2000)
		.to('#0000ff')
		.delay(500)
		.run({repeat: true});
```

###Installing

Grab a copy of `Fuze.min.js` and include it.
```
<script src="/path/to/Fuze.min.js"></script>
```
#####Bower
`bower install fuze`

###Usage

###API
#####new Fuze(element, "css-color-style");
Creats a new Fuze object for that element that will tween the selected style

#####.to(hexColor [, duration(ms));
Tweens to the selected color with the input duration

#####.delay(duration(ms))
Waits the given amount of time before executing the next .to statement

#####.run([opts])
Executes the tween with provided options