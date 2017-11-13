var resume = {
	'Name':{
		'firstname':'Sandeep',
		'lastname':'Dudhraj'
	},
	'Age': 23,
	'Marital Status': 'No',
	'Education': 'BE',
	'Projects':['Pacman', 'Chatbot', 'NEE', 'Alumni database']
};
 var wrapper = document.getElementsByClassName('mainwrapper')[0];
var element = document.createElement('h1');
wrapper.appendChild(element);
element.innerHTML = Object.keys(resume)[0]+":"+ resume.Name.firstname+"  " + resume.Name.lastname;
keys = Object.keys(resume);
for(var i=1;i<keys.length;i++)
{
	var para = document.createElement('p');
	para.innerHTML = keys[i]+":"+resume[keys[i]];
	wrapper.appendChild(para);
}

