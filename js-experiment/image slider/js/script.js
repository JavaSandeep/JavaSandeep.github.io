var body = document.getElementsByTagName('body')[0];
var imagewrapper = document.getElementsByClassName('main-wrapper')[0];
imagewrapper.style.width="410px";
imagewrapper.style.height="274px";
imagewrapper.style.overflow = "hidden";
imagewrapper.style.position = "relative";

var previousbutton = document.createElement("button");
var nextbutton = document.createElement("button");
previousbutton.innerHTML="Previous";
nextbutton.innerHTML="Next";


body.appendChild(previousbutton);
body.appendChild(nextbutton);

var imagecollection = document.createElement("div");

imagewrapper.appendChild(imagecollection)
imagecollection.style.position = "absolute";
imagecollection.style.top  = "0px";
imagecollection.style.left = "0px";	
imagecollection.style.right = "0px";
imagecollection.style.width = "1640px";
imagecollection.style.height = "280px";

var image1 = document.createElement("img");
image1.setAttribute("src","images/pic1.jpg");
image1.style.float = "left";
imagecollection.appendChild(image1); 

var image2 = document.createElement("img");
image2.setAttribute("src","images/pic2.jpg");
image2.style.float = "left";
imagecollection.appendChild(image2); 

var image3 = document.createElement("img");
image3.setAttribute("src","images/pic3.jpg");
image3.style.float = "left";
imagecollection.appendChild(image3); 



var image4 = document.createElement("img");
image4.setAttribute("src","images/pic4.jpg");
image4.style.float = "left";
imagecollection.appendChild(image4);

var counter = 0;	

nextbutton.onclick = function()
{
	console.log("I was pressed next");

	var i=0;

	counter++;

	console.log(counter);

	if (counter>=4) {

		imagecollection.style.left= "410px";

		counter=0;
}

	function moveright(){

		
		if(i<41)
{

					imagecollection.style.left= parseInt(imagecollection.style.left)-10+'px';

					i++;

					a =setTimeout(moveright,20);
}

				else{
clearTimeout(a);
}
}

	moveright();

}


previousbutton.onclick = function()
{
	console.log("I was pressed previous");
	var i=0;

	counter--;

	console.log(counter);

	if (counter<=-1) 
{

		imagecollection.style.left=-410*4+"px";

		counter=3;
}

	function moveleft()
{

		if(i<41)
{


			imagecollection.style.left= parseInt(imagecollection.style.left)+10+'px';

			i++;

			a =setTimeout(moveleft,20);
}

		else
		{

			clearTimeout(a);
}
}
moveleft();
}