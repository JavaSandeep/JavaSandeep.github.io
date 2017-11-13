//BACKGROUND
function getSliderContainer()
{
	var Container = document.createElement('div');
	
	Container.classList.add("content-slider");
	Container.style.width="840px";
	Container.style.height="640px";
	Container.style.backgroundImage="url('images/runroad.png')";
	Container.style.backgroundRepeat="repeat-y";
	Container.style.backgroundPostion="right top 0px";
	Container.style.margin="0px auto";
	Container.style.border="2px solid black";
	
	return Container;
}
function mainSlider(container)
{
	this.element=container;
	this.IsRoll=true;
	var counter=0;
	var incrementor=0.25;
	var that = this;
	
	this.backgroundScroll=function(){
		that.element.style.backgroundPosition = "right top "+counter+"px"; 
		counter+=2;//(2+incrementor);
		//incrementor+=0.25;
	}
}
//CAR
function getCarContainer()
{
	var Container = document.createElement('div');
	
	Container.classList.add("player-car");
	Container.style.width="70px";
	Container.style.height="80px";
	Container.style.position="absolute";
	
	var elem = document.createElement("img");
	elem.setAttribute("src", "images/tanktop.png");
	Container.appendChild(elem);
	
	return Container;
}
function playerCar(carContainer,xPos,yPos)
{
	this.element=carContainer;
	this.x_pos=xPos;
	this.y_pos=yPos;
	this.IsAlive=true;
	
	this.draw = function()
	{
		this.element.style.left=this.x_pos+"px";
		this.element.style.bottom=this.y_pos+"px";
	}
	this.move= function(xPos)
	{
		this.x_pos+=xPos;
	}
	this.testCollision=function(xArray, yArray)
	{
		for(var x in xArray){
			if(xArray[x]<561 && xArray[x]==this.x_pos)
			{
				if(yArray[x]<this.y_pos+80 && yArray[x]+80>this.y_pos+80)
					return true;
			}
		}
	}
}
//ENEMY
function getEnemyContainer()
{
	var Container = document.createElement('div');
	
	Container.classList.add("enemy-car");
	Container.style.width="70px";
	Container.style.height="80px";
	Container.style.position="absolute";
	
	var elem = document.createElement("img");
	elem.setAttribute("src", "images/enemies.png");
	Container.appendChild(elem);
	
	return Container;
}
function enemyCar(container,xPos,yPos)
{
	this.element=container;
	this.perXpos=xPos;
	this.enemyX=this.perXpos+(Math.floor(Math.random() * 2)*10000);
	this.enemyY=yPos;
	
	this.draw=function()
	{
		this.element.style.left=this.enemyX+"px";
		this.element.style.bottom=this.enemyY+"px";
	}
	this.move= function(yPos)
	{
		this.enemyY-=yPos;
	}
	this.enemyTest=function()
	{
		if(this.enemyY < -90)
		{
			this.enemyX=this.perXpos+(Math.floor(Math.random() * 2)*10000);
			this.enemyY= 850;
		}
	}
	this.deleteEnemy=function()
	{
		this.enemyX=10000;
	}
}
function getEnemyArray(y)
{
	var enemyArrayX = new Array();
	for(var x=1; x<4; x++){
		var enemyContainer = getEnemyContainer();
		//x_EnemyPosition= Math.floor(Math.random() * 3) + 1;
		x_EnemyPosition=(x*170)+50;
		y_EnemyPosition = (y*320)+770;
		var enemy = new enemyCar(enemyContainer,x_EnemyPosition,y_EnemyPosition);
		enemyArrayX.push(enemy);
	}
	return enemyArrayX;
}
//BULLET
function getBullet(xPos, yPos)
{
	var bullet = document.createElement('img');
	bullet.src="images/bomb.png";
	bullet.style.position="absolute";
	bullet.style.bottom=yPos+10+"px";
	bullet.style.left=xPos+20+"px";
	
	return bullet;
}
//GAME STARTS HERE
//COLLISION TEST HERE
function testCollision(x_pos,y_pos,xArray,yArray,item)
{
	var bool = 0;
	for(var x in xArray){
		++bool;
		if(xArray[x]<561 && xArray[x]==x_pos)
		{
			if(yArray[x]<y_pos+item && yArray[x]+80>y_pos+item)
				return bool;
		}
	}
}
//COLLISION TEST
function CarGame(firstGameWrap,sSlider,myCar,myEnemy,myEnemy2,myEnemy3)
{
	this.environment = firstGameWrap;
	this.slider = sSlider;
	this.car = myCar;
	this.enemy = myEnemy;
	this.enemy2 = myEnemy2;
	this.enemy3 = myEnemy3;
	this.init = function()
	{
		this.environment.appendChild(this.slider.element);
		this.environment.appendChild(this.car.element);
		for(var y=0; y<3; y++)
		{
			this.environment.appendChild(this.enemy[y].element);
			this.environment.appendChild(this.enemy2[y].element);
			this.environment.appendChild(this.enemy3[y].element);
		}
	}
	this.Update=function(bullet)
	{
		this.environment.appendChild(bullet);
	}
}
//MAIN FUNCTION
function main()
{	
	var firstGameWrap = document.getElementById("first-game-container");
	firstGameWrap.style.overflow="hidden";
	firstGameWrap.style.width="840px";
	firstGameWrap.style.margin="0px auto";
	firstGameWrap.style.position="relative";
	//wrapper aaayo
	var sliderContainer = getSliderContainer();
	var slider = new mainSlider(sliderContainer);
	//car here
	var carContainer = getCarContainer();
	var x_position = 220;
	var y_position = 70;
	var car = new playerCar(carContainer,x_position,y_position);
	car.draw();
	//220px//390px//560px///170px increasing
	//top 60px
	//environment of game
	var enemyArray = getEnemyArray(1);
	var enemyArray2 = getEnemyArray(2);
	var enemyArray3 = getEnemyArray(3);
	
	
	
	var id = setInterval(framer,15);
	function framer()
	{
		var positionXArray = new Array();
		var positionYArray = new Array();
		
		for(var x=0; x<3; x++)
		{
			slider.backgroundScroll();
			enemyArray[x].move(5);
			enemyArray[x].draw();
			enemyArray[x].enemyTest();
			enemyArray2[x].move(5);
			enemyArray2[x].draw();
			enemyArray2[x].enemyTest();
			enemyArray3[x].move(5);
			enemyArray3[x].draw();
			enemyArray3[x].enemyTest();
			positionXArray.push(enemyArray[x].enemyX);
			positionYArray.push(enemyArray[x].enemyY);
			positionXArray.push(enemyArray2[x].enemyX);
			positionYArray.push(enemyArray2[x].enemyY);
			positionXArray.push(enemyArray3[x].enemyX);
			positionYArray.push(enemyArray3[x].enemyY);
		}
		if(testCollision(car.x_pos,car.y_pos,positionXArray,positionYArray,80))
		{clearInterval(id);car.IsAlive=false;}
	}
	
	function bulletSpawn()
	{
		var bullet = getBullet(car.x_pos, car.y_pos);
		x_pos=parseInt(bullet.style.left);
		y_pos=parseInt(bullet.style.right);
		Game.Update(bullet);
		var Bid = setInterval(function(){
			var positionXArray = new Array();
			var positionYArray = new Array();
			if(parseInt(bullet.style.bottom)>850){
				bullet.remove();
				clearInterval(Bid);
			}
			else{
				bullet.style.bottom=parseInt(bullet.style.bottom)+8+'px';
				for(var x=0; x<3; x++)
				{
					positionXArray.push(enemyArray[x].enemyX);
					positionYArray.push(enemyArray[x].enemyY);
					positionXArray.push(enemyArray2[x].enemyX);
					positionYArray.push(enemyArray2[x].enemyY);
					positionXArray.push(enemyArray3[x].enemyX);
					positionYArray.push(enemyArray3[x].enemyY);
				}
				var IsHit=testCollision(parseInt(bullet.style.left)-20,parseInt(bullet.style.bottom),positionXArray,positionYArray,30);
				if(IsHit)
				{
					if(IsHit%3==1)
						enemyArray[Math.floor(IsHit/3)].deleteEnemy();
					else if(IsHit%3==0)
						enemyArray3[Math.floor(IsHit/4)].deleteEnemy();
					else
						enemyArray2[Math.floor(IsHit/3)].deleteEnemy();
					bullet.remove();
					clearInterval(Bid);
				}
			}
		},10);
	}
	//GAME//GAME//GAME//GAME//GAME
	//GAME//GAMEvv//GAME//GAME//GAME
	var Game = new CarGame(firstGameWrap,slider,car,enemyArray,enemyArray2,enemyArray3);
	Game.init();
	//GAME//GAME//GAME//GAME//GAME//GAME
	//GAME//GAME//GAME//GAME//GAME//GAME
	//GAME//GAME//GAME//GAME//GAME//GAME
	
	document.onkeydown = function(event){
	var movementFactor=0;
	if(car.IsAlive && event.keyCode==37 && car.x_pos>220){
		movementFactor=-170;
	}
	else if(car.IsAlive && event.keyCode ==39 && car.x_pos<560){
		movementFactor=170;
	}
	else if(car.IsAlive && event.keyCode == 38)
	{
		bulletSpawn();
	}
	else{
		movementFactor=0;
	}
	car.move(movementFactor);
	car.draw();
}
}

main();