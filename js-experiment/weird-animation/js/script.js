//same column lag
//row lag
//yo chai movement ko laagi

function main()
{
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	//property of circle
	var radiusOfOuterCircle = 150;
	
	//this has to be calculated inside for loop
	ctx.fillStyle = '#f8948d';
	var columLag = 0;
	var colLag = Math.PI/36;
	var rowLag= Math.PI/20;
	var loopLag = Math.PI*1.2;
	
	var id = setInterval(framee,55);
	
	function framee()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var loops = 1; loops<=2; loops++)
		{
			for(var j=1; j<=20;j++){
				for(var i=1; i<=10; i++){
					ctx.beginPath();
					var cosOfSize = (((radiusOfOuterCircle+1)+(radiusOfOuterCircle)*Math.cos(columLag-(((i-1)*colLag))-((j-1)*rowLag)-((loops-1)*loopLag)))<(2*radiusOfOuterCircle-9) ? ((radiusOfOuterCircle+1)+(radiusOfOuterCircle)*Math.cos(columLag-(((i-1)*colLag))-((j-1)*rowLag)-((loops-1)*loopLag))) : (2*radiusOfOuterCircle-9));
					ctx.arc(40+j*45, 320+i*35-(radiusOfOuterCircle+radiusOfOuterCircle*Math.sin(columLag-((j-1)*rowLag)-((loops-1)*loopLag))), (582-(2*cosOfSize))/29 , 0, Math.PI * 2, true);
					ctx.fill();
					}
			}
		}
		columLag+=((Math.PI)/36);
	}
}

main();