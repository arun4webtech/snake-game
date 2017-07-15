var tableSize = 20
var table = document.createElement("table");
function createTbl()
{
	var row="";
	for(var j =0;j< tableSize;j++)
	{
		var clm="";
		for(var i =0;i< tableSize;i++)
			clm+="<td></td>";
		row += "<tr>"+clm+"</tr>";
	}
	return row;
}
table.innerHTML = createTbl();
document.body.innerHTML = "";
document.body.appendChild(table)

var sty = "td {height:25px;width:25px;} "
sty += "table{border: 5px solid red} "
sty += ".active{background-color:black} "
sty += ".food{background-color:#16f55b} "
dsty = document.createElement("style")
dsty.innerHTML = sty;
document.head.appendChild(dsty)

table = document.getElementsByTagName("table")[0]
document.getElementsByTagName("body")[0].setAttribute("onkeyup","keydir(event)")

function keydir(e)
{
	if(e.keyCode == 37)
		direction = "L"
	else if(e.keyCode == 38)
		direction = "T"
	else if(e.keyCode == 39)
		direction = "R"
	else if(e.keyCode == 40)
		direction = "B"
}

var snake = [[0,2],[1,2],[2,2],[3,2]]
var active = [3,2]
var direction = "R"; // L,R,T,B

function rndm()
{
	var a = Math.round(Math.random()*10)
	if(a<=9)
		return a;
	else
		return rndm();
}
function prepareFood()
{
	var row = rndm();
	var clm = rndm();
	try{
		if(table.children[0].children[row].children[clm].getAttribute("class") !== "active")
			return [row,clm];
		else
			return prepareFood();
	}catch(e){return prepareFood()}
}
function setFood()
{
	foodLoc = prepareFood();
	table.children[0].children[foodLoc[0]].children[foodLoc[1]].setAttribute("class","food");
}
setFood()
function moveSnake()
{
	if(direction == "L")
		active[1] -= 1;
	if(direction == "R")
		active[1] += 1;
	if(direction == "T")
		active[0] -= 1;
	if(direction == "B")
		active[0] += 1;
	
	if(JSON.stringify(foodLoc) !== JSON.stringify([active[0],active[1]]))	
	{
		uncolor(snake[0][0],snake[0][1])
		snake.splice(0,1)
	}
	else
		setFood();
		
	colorTbl(active[0],active[1])
	snake.push([active[0],active[1]])
}

snake.forEach((v,i)=>colorTbl(v[0],v[1]))

function colorTbl(...tbl)
{
	try{
		table.children[0].children[tbl[0]].children[tbl[1]].setAttribute("class","active")
	}
	catch(e){clearInterval(si);alert("BOOM")}
}

function uncolor(...tbl)
{
	table.children[0].children[tbl[0]].children[tbl[1]].removeAttribute("class")
}

var si = setInterval(moveSnake,1000);
