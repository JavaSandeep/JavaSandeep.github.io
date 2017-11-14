function getContainer(clasName,width,height,src)
{
	//GETTING CONTAINER FOR OBJECTS
	let container = document.createElement('div');
	
	container.classList.add(""+clasName);
	container.style.width=width+"px";
	container.style.height=height+"px";
	
	let elem = document.createElement("img");
	elem.setAttribute("src", "images/"+src);
	container.appendChild(elem);
	
	return container;
}

class Pipe{
	constructor(pipeContainer, xPosition, yPosition)
	{
		this.element=pipeContainer;
		this.xPos=xPosition;
		this.yVar=yPosition;
		this.yPos=this.yVar - Math.floor(Math.random() * 160);
		//STORING RESET VARIABLES
		this.xPosReset=xPosition;
		this.yVarReset=yPosition;
	}
	pipeReset()
	{
		//reset variables of pipe
		this.xPos=this.xPosReset;
		this.yVar=this.yVarReset;
		this.yPos=this.yVar - Math.floor(Math.random() * 160);
	}
	movePipe(){
		this.xPos-=10;//moving pipe by 10 pixel left
	}
	testPipe(){
		//TESTING IF PIPE GOES BEYOND LEFT SCREEN AND GIVING PLAYER ONE POINT IF S/HE DOESN'T COLLIDE WITH THIS.PIPE
		let gameScoreIncrementor = 0;
		if(this.xPos<=-130)
		{
			this.yPos=this.yVar - Math.floor(Math.random() * 160);
			this.xPos=1120;
			gameScoreIncrementor = 1;
		//move pipe
		}
		return gameScoreIncrementor;
	}
}

function getPipeArray(clasName,width,height,img)
{
	let pipeArray = new Array();
	for(var x = 0; x < 4; x++)
	{
		var pipeContainer=getContainer(clasName,width,height,img);
		var pipe = new Pipe(pipeContainer,1120+(x*300),-70);
		pipeArray.push(pipe);
	}
	return pipeArray;
}

class Frog{
	constructor(frogContainer, xPosition, yPosition, fVelocity, iVelocity){
		this.element=frogContainer;
		this.xPos=xPosition;
		this.yPos=yPosition;
		this.yVelIntial=iVelocity;
		this.yVelFinal=fVelocity;
		this.isAlive=true;
		//STORING RESET VARIABLES OF FROG
		this.xPosReset=xPosition;
		this.yPosReset=yPosition;
		this.yVelIntialReset=iVelocity;
		this.yVelFinalReset=fVelocity;
	}
	frogReset()
	{
		//reseting frog
		this.xPos=this.xPosReset;
		this.yPos=this.yPosReset;
		this.yVelIntial=this.yVelIntialReset;
		this.yVelFinal=this.yVelFinalReset;
		this.isAlive=true;
	}
	frogMove(){
		//calculating velocity v = u + at
		this.yPos-=this.yVelFinal;
		//negative gravity here
		this.yVelFinal = this.yVelIntial - 1;
		//final velocity is now initial velocity
		this.yVelIntial = this.yVelFinal;
		
	}
	frogJump(JumpForce){
		this.yVelIntial=JumpForce//some displacement value;
	}
	testCollision(arrayBoundary)
	{
		if(this.yPos>510){return true;}
		for(let b=0; b<arrayBoundary.length;b+=3)
		{
			if((this.xPos+50 > arrayBoundary[b]) && ((this.yPos-10 < arrayBoundary[b+1]) || (this.yPos+50 > arrayBoundary[b+2])))
			{return true;}
		}
	}
}
class GameWorld{
	constructor(frogObject, aOPipe)
	{
		this.frog = frogObject;
		this.pipeArray = aOPipe;
		this.score = 0;
		this.gameId = 0;
	}
	main()
	{
		//GAME RUN
		let GameScore = this.score;
		//CANVAS START HERE
		let	canvas = document.getElementById('myCanvas');
		let ctx = canvas.getContext('2d');
		ctx.font = "72px Arial";
		
		//BACKGROUND
		let backgroundImage = new Image();
		backgroundImage.src = 'images/background_scroll.jpg';
		let offset = 0;
		
		let frogImage = new Image();
		frogImage.src = (this.frog.element.getElementsByTagName('img')[0].getAttribute('src'));
		
		let pipeImage = new Image();
		pipeImage.src = (this.pipeArray[0].element.getElementsByTagName('img')[0].getAttribute('src'));
		
		
		this.gameId = setInterval(framme, 50,this.frog,this.pipeArray);
		function framme(myFrog,arrayOfPipe)
		{
			if(!myFrog.isAlive){clearInterval(this.gameId);ctx.fillText("GAME OVER",canvas.width*0.3,canvas.height/2);}
			else
			{
				//grouping functions and canvas operations together
				//functions
				if(offset>=1100){offset=0;}
				myFrog.frogMove();
				var boundaryArray= new Array();
				//CANVAS OPERATIONS
				ctx.clearRect(0,0,canvas.width,canvas.height);
				for(var i = 0; i < 2; i++)
				{
					ctx.drawImage(backgroundImage,i*canvas.width-offset,0)
				}
				for(var p in arrayOfPipe)
				{
					ctx.drawImage(pipeImage,arrayOfPipe[p].xPos,arrayOfPipe[p].yPos);
					arrayOfPipe[p].movePipe();
					GameScore+=arrayOfPipe[p].testPipe();
					if(arrayOfPipe[p].xPos<500 && arrayOfPipe[p].xPos>20)
					{
						boundaryArray.push(arrayOfPipe[p].xPos);
						boundaryArray.push(arrayOfPipe[p].yPos+320);
						boundaryArray.push(arrayOfPipe[p].yPos+560);
					}
				}
				myFrog.isAlive=!myFrog.testCollision(boundaryArray);
				
				ctx.drawImage(frogImage,myFrog.xPos,myFrog.yPos);
				ctx.fillText(GameScore,canvas.width*0.9,canvas.height*0.1);
				offset+=10;
			}
			
		}
	}
	resetWorld()
	{
		this.frog.frogReset();
		for(var pipes in this.pipeArray){
			this.pipeArray[pipes].pipeReset();
		}
		this.score = 0;
		clearInterval(this.gameId);
	}
}
//OUTSIDE OF INSTANCE
let frogContainer = getContainer('frog-class',80,80,'smallfrog.png');
let frogObject = new Frog(frogContainer,100,300,0,0);

pipeArray = getPipeArray('pipe-class',125,940,'pipe_image.png');

let gameWorld = new GameWorld(frogObject,pipeArray);
gameWorld.main();

let replayButton = document.getElementsByTagName("button")[0];

replayButton.onmousedown = function()
{
	gameWorld.resetWorld();
	gameWorld.main();
}

document.onkeydown = function(event){
	if(gameWorld.frog.isAlive && event.keyCode==32)
	{	
		gameWorld.frog.frogJump(15);
	}
}
