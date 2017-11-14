//same column lag
//row lag
//yo chai movement ko laagi

function main()
{
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');
	//property of circle
	let trajectoryRadius = 150;
	
	//this has to be calculated inside for loop
	ctx.fillStyle = '#f8948d';
	let angleWithX = 0;
	var InColumnLag = Math.PI/36;
	var InRowLag= Math.PI/20;
	var eachLoopLag = Math.PI*1.2;
	
	let numberOfLoops = 2;
	let rowCount = 20;
	let columnCount = 10;
	
	let xMargin = 40;
	let yMargin = 320;
	let columnGap = 45;
	let rowGap = 35;
	
	var id = setInterval(framee,60);
	
	function framee()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var loops = 1; loops<=numberOfLoops; loops++)
		{
			for(var j=1; j<=rowCount;j++){
				for(var i=1; i<=columnCount; i++){
					ctx.beginPath();
					var cosOfAngle = Math.cos(angleWithX-(((i-1)*InColumnLag))-((j-1)*InRowLag)-((loops-1)*eachLoopLag));
					var depthFromScreen = (((trajectoryRadius+1)+(trajectoryRadius)*cosOfAngle)<(2*trajectoryRadius-9) ? ((trajectoryRadius+1)+(trajectoryRadius)*cosOfAngle) : (2*trajectoryRadius-9));
					//depth of screen is between 1 to 290
					var sinOfAngle = Math.sin(angleWithX-((j-1)*InRowLag)-((loops-1)*eachLoopLag))
					var xPosition=xMargin+j*columnGap;
					var yPosition = yMargin+i*rowGap-(trajectoryRadius+trajectoryRadius*sinOfAngle);
					circleRadius = (582-(2*depthFromScreen))/29;
					//circle radius is a linear funtion 
					//if depth=1 from screen ma maximum size of circle i.e 20
					//if depth=((2*radius)-10)+1=291 or above ma minimum size of circle i.e 0
					//construct linear equation using (1,20)=>(x1,y1) and (291,0)=>(x2,y2)
					ctx.arc(xPosition, yPosition, circleRadius, 0, Math.PI * 2, true);
					ctx.fill();
					}
			}
		}
		angleWithX+=((Math.PI)/36);
	}
}

main();