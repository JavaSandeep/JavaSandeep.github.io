var container = document.getElementsByClassName('container')[0];
var body = document.getElementsByTagName('body')[0];
var list = document.createElement("ul");
body.appendChild(list);
console.log(container);	

for(var i =0;i<15;i++)
{
	var randomleft = Math.floor(Math.random() * 590) + 1;
	var randomtop = Math.floor(Math.random() * 590) + 1;
	var element= document.createElement("div");
	element.style.position="absolute";
	element.style.top= randomtop+"px";
	element.style.left=randomleft+"px";
	element.style.background="red";
	element.style.width="8px";
	element.style.height="8px";
	container.appendChild(element);

	element.onclick = function(){
		var top = this.style.top;
		var left = this.style.left;
		var l = document.createElement("l");
		li.innerHTML= top +" "+ left;
		list.appendChild(l);
		container.removeChild(this);
	};
	
	
}







