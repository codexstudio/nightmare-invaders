//Set FPS
var fps = setInterval(update, 33.34); // 30fps


//Determines the distance between two points
function distance(x1, x2, y1, y2){
	return Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
}


//Creating our grid
var grid = [];

var xyCord = {x:0, y:0};
for (var i = 0; i <=40; i++){
	grid[i] = [];
	for (var j = 0; j <=60; j++){
		var tempObj = {x:xyCord.x, y:xyCord.y};
		grid [i][j] = tempObj;
		xyCord.x += 15;
	}
	xyCord.y += 15;
	xyCord.x = 0;
}


//List of stages
var currentStage = 0;
var stages = [];

stages[0] = "Child's Bedroom";
stages[1] = "";
stages[2] = "";
stages[3] = "";


//List of stage images
var stageImages = [];

stageImages[0] = "Stage1.png";
stageImages[1] = "";
stageImages[2] = "";
stageImages[3] = "";


//List of stage paths (Paths not to be used for enemy path anymore like in prototype. Purpose is now for tower placement checking.)
var pathChildBedroom = [grid[5][60], grid[5][59], grid[5][58], grid[5][57], grid[5][56], grid[5][55], grid[5][54], grid[5][53], 
			grid[5][52], grid[5][51], grid[5][50], grid[5][49], grid[6][49], grid[7][49], grid[8][49], 
			grid[9][49], grid[10][49], grid[11][49], grid[12][49], grid[12][48], grid[12][47], grid[12][46], 
			grid[12][45], grid[12][44], grid[12][43], grid[12][42], grid[12][41], grid[12][40], grid[12][39], 
			grid[12][38], grid[12][37], grid[12][36], grid[12][35], grid[12][34], grid[12][33], grid[12][32], 
			grid[12][31], grid[12][30], grid[12][29], grid[12][28], grid[12][27], grid[12][26], grid[12][25], 
			grid[12][24], grid[13][24], grid[14][24], grid[15][24], grid[16][24], grid[17][24], grid[18][24], 
			grid[19][24], grid[20][24], grid[21][24], grid[22][24], grid[23][24], grid[24][24], grid[25][24], 
			grid[25][25], grid[25][26], grid[25][27], grid[25][28], grid[25][29], grid[25][30], grid[25][31], 
			grid[25][32], grid[25][33], grid[25][34], grid[25][35], grid[25][36], grid[25][37], grid[25][38], 
			grid[25][39], grid[25][40], grid[26][40], grid[27][40], grid[28][40], grid[29][40], grid[30][40], 
			grid[31][40], grid[32][40], grid[33][40], grid[34][40], grid[35][40], grid[35][39], grid[35][38], 
			grid[35][37], grid[35][36], grid[35][35], grid[35][34], grid[35][33], grid[35][32], grid[35][31], 
			grid[35][30], grid[35][29], grid[35][28], grid[35][27], grid[35][26], grid[35][25], grid[35][24], 
			grid[35][23], grid[35][22], grid[35][21], grid[35][20], grid[35][19], grid[35][18], grid[35][17], 
			grid[35][16], grid[35][15], grid[35][14], grid[35][13], grid[35][12], grid[35][11], grid[35][10], 
			grid[35][9], grid[35][8], grid[35][7], grid[35][6], grid[35][5], grid[35][4], grid[35][3], 
			grid[35][2], grid[35][1], grid[35][0]];
			
var stagePaths = [];
stagePaths[0] = pathChildBedroom;
//stagePaths[1] = ;
//stagePaths[2] = ;


//The img elements
var currentStageImage = document.getElementById("currentStageImage");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var clickedTowerImg = new Image();


//Temporary grid toggle
var show = true;
function togGrid(){
	if (show) {
		document.getElementById("grid").style.display = "block";
		show = false;
	} else {
		document.getElementById("grid").style.display = "none";
		show = true;
	}
}

//Enemy related section-----------------------------------------------------------------------------------------------------------
var enemiesOnBoard = [];


//Enemies Bluprint Section----------------------------------------------------------
 var enemy = function(health, damage, income, speed, xCoord, yCoord, pathPos){
	this.health = health;
	this.damage = damage;
	this.income = income;
	this.speed = speed;
	this.xCoord = (stagePaths[currentStage])[0].x;
	this.yCoord = (stagePaths[currentStage])[0].y;
	this.pathPos = 0;
	this.enemyNextMove;
 }

enemy.prototype.enemyMovement = function(enemyObj, enemyType){
	var enemyImgToPrint = new Image();
	enemyImgToPrint.src = '../images/' + enemyType + '.png';
	
	this.enemyNextMove = setInterval(function() {
		//console.log("x: " + (stagePaths[currentStage])[enemyObj.pathPos].x + " <= " + enemyObj.xCoord);
		//console.log("y: " + (stagePaths[currentStage])[enemyObj.pathPos].y + " <= " + enemyObj.yCoord);
		if (((stagePaths[currentStage])[enemyObj.pathPos].x <= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
			enemyObj.xCoord--;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].x >= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
			enemyObj.xCoord++;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y <= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
			enemyObj.yCoord--;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y >= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord+1)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.yCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
			enemyObj.yCoord++;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
		}
		if (enemyObj.pathPos > (stagePaths[currentStage]).length-1) {
				ctx.clearRect(enemyObj.xCoord-13, enemyObj.yCoord-20, 25, 37);
				enemiesOnBoard.splice(enemyObj,1);
				clearInterval(enemyObj.enemyNextMove);
			}
		
	}, this.speed);
}


function basicSkeleton(health, damage, income, speed, xCoord, yCoord, pathPos){
	enemy.call(this, health, damage, income, speed, xCoord, yCoord, pathPos);
	this.health = 200;
	this.damage = 1;
	this.income = 50;
	this.speed = 40;
	this.enemyNextMove;
}
basicSkeleton.prototype = Object.create(enemy.prototype);
basicSkeleton.prototype.constructor = basicSkeleton;

basicSkeleton.prototype.thisChildMetohdNeedsAName = function(){
	console.log("Undefined Child Method");
};

function redSkeleton(health, damage, income, speed, xCoord, yCoord, pathPos){
	enemy.call(this, health, damage, income, speed, xCoord, yCoord, pathPos);
	this.health = 500;
	this.damage = 2;
	this.income = 100;
	this.speed = 80;
}
redSkeleton.prototype = Object.create(enemy.prototype);
redSkeleton.prototype.constructor = redSkeleton;

redSkeleton.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function blueSkeleton(health, damage, income, speed, xCoord, yCoord, pathPos){
	enemy.call(this, health, damage, income, speed, xCoord, yCoord, pathPos)
	this.health = 100;
	this.damage = 1;
	this.income = 75;
	this.speed = 20;
}
blueSkeleton.prototype = Object.create(enemy.prototype);
blueSkeleton.prototype.constructor = blueSkeleton;

blueSkeleton.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method");
};
// End of enemy bluprint section----------------------------------------------------


function spawnEnemy(enemyType){
	var tempEnemyObj = new (eval(enemyType))(null, null, null, null, null, null);
	enemiesOnBoard.push(tempEnemyObj);
	console.log("NEW " + enemyType + " MADE!");
	console.log("Health = " + enemiesOnBoard[enemiesOnBoard.length-1].health);
	console.log("Damage = " + enemiesOnBoard[enemiesOnBoard.length-1].damage);
	console.log("Income = " + enemiesOnBoard[enemiesOnBoard.length-1].income);
	console.log("Speed = " + enemiesOnBoard[enemiesOnBoard.length-1].speed);
	//console.log("x Loc = " + enemiesOnBoard[enemiesOnBoard.length-1].xCoord);
	//console.log("y Loc = " + enemiesOnBoard[enemiesOnBoard.length-1].yCoord);
	enemiesOnBoard[enemiesOnBoard.length-1].enemyMovement(tempEnemyObj, enemyType);
}
//End of enemy related section-------------------------------------------------------------------------------------------------------------


//Tower related section -------------------------------------------------------------------------------------------------------------------
var towersOnBoard = [];
var towerLocationsByPixelPosition = [];
var numOfTowers = 0;
var towerxy = {x:0, y:0};
var objObstruct = false;


//Tower blueprints section--------------------------------------------------------
var tower = function(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, hasTarget){
	this.cost = cost;
	this.damage = damage;
	this.range = range;
	this.attackSpeed = attackSpeed;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.upgraded = false;
	this.hasTarget = false;
};

/*
tower.prototype.getTargets = function(towerObj){
	if (towersOnBoard.length != 0 && enemiesOnBoard.length != 0){
		for(var i = 0; i < enemiesOnBoard.length; i++){
			if (towersOnBoard.length != 0 && enemiesOnBoard.length != 0){
				var distanceObj = distance (enemiesOnBoard[i].xCoord, towerObj.xCoord, enemiesOnBoard[i].yCoord, towerObj.yCoord);
				
				if(distanceObj <= towerObj.range && (towerObj.hasTarget == false)){
					towerObj.hasTarget = true;
					
					var attack = setInterval(function() {
						console.log(enemiesOnBoard[i].health);
						//console.log(i);
						if (enemiesOnBoard[i].health > 0){
							enemiesOnBoard[i].health -= towerObj.damage;
						}
						else if (enemiesOnBoard[i].health <= 0){
							towerObj.hasTarget = false;
							ctx.clearRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, 25, 37);
							clearInterval(enemiesOnBoard[i].enemyNextMove);
							enemiesOnBoard.splice(i,1);
							clearInterval(attack);
						}
					}, towerObj.attackSpeed);
				}
			}	
		}
	}
};
*/

function toyCarLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, hasTarget){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, hasTarget);
	this.cost = 50;
	this.damage = 15;
	this.range = 200;
	this.attackSpeed = 500;
}
toyCarLauncher.prototype = Object.create(tower.prototype);
toyCarLauncher.prototype.constructor = toyCarLauncher;

toyCarLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined toyCarLauncher Method.")
};

function flashlight(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, hasTarget){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, hasTarget);
	this.cost = 30;
	this.damage = 0;
	this.range = 100;
	this.attackSpeed = 100;
}
flashlight.prototype = Object.create(tower.prototype);
flashlight.prototype.constructor = flashlight;

flashlight.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined flashlight method.")
};
//End tower blueprints section----------------------------------------------------


function createTowerObject(towerType, x, y){
	var tempTowerObject = new (eval(towerType))(null, null, null, null, x, y, null);
	towersOnBoard.push(tempTowerObject);
	//Temp console log for debugging, can be removed later.
	console.log("NEW " + towerType + " MADE!");
	console.log("Cost = " + towersOnBoard[towersOnBoard.length-1].cost);
	console.log("Damage = " + towersOnBoard[towersOnBoard.length-1].damage);
	console.log("Range = " + towersOnBoard[towersOnBoard.length-1].range);
	console.log("Attack Speed = " + towersOnBoard[towersOnBoard.length-1].attackSpeed);
	//console.log("x pixel loc = " + towersOnBoard[towersOnBoard.length-1].xCoord);
	//console.log("y pixel loc = " + towersOnBoard[towersOnBoard.length-1].yCoord);
	console.log("Upgraded? = " + towersOnBoard[towersOnBoard.length-1].upgraded);
}

function placeTower(towerType){
	document.body.style.cursor = "url('../images/" + towerType + ".png'),auto";
	document.getElementById('canvas').addEventListener ("click", handler); 
	
	function handler(e){
	event = e;
		towerxy.x = event.clientX+5;     // Get the horizontal coordinate, 5 pixel offset as a margin of error for the player
		towerxy.y = event.clientY+5;     // Get the vertical coordinate, 5 pixel offset as a margin of error for the player
		document.body.style.cursor = "auto";
		for (var i = 0; i < 40; i++){
			for (var j = 0; j < 60; j++){
				if ( (grid[i][j].x - towerxy.x > -15) && (grid[i][j].x - towerxy.x < 15) && (grid[i][j].y - towerxy.y > -15) && (grid[i][j].y - towerxy.y < 15) ) {
					if(towerxy.y <= 15){
						towerLocationsByPixelPosition[numOfTowers] = grid[0][j-1];
					}
					else {
						towerLocationsByPixelPosition[numOfTowers] = grid[i-1][j-1];
					}
				}
			}
		}
		for (var i = 0; i < (stagePaths[currentStage]).length; i++){
			if ( ((stagePaths[currentStage])[i].x - towerLocationsByPixelPosition[numOfTowers].x > -30) && ((stagePaths[currentStage])[i].x - towerLocationsByPixelPosition[numOfTowers].x < 60) && ((stagePaths[currentStage])[i].y - towerLocationsByPixelPosition[numOfTowers].y > -15) && ((stagePaths[currentStage])[i].y - towerLocationsByPixelPosition[numOfTowers].y < 60) ){
				objObstruct = true;
			}
			
		}
		if (numOfTowers > 0){
			for (var i = 0; i < towerLocationsByPixelPosition.length-1; i++){
				if ( (towerLocationsByPixelPosition[i].x - towerLocationsByPixelPosition[numOfTowers].x > -45) && (towerLocationsByPixelPosition[i].x - towerLocationsByPixelPosition[numOfTowers].x < 45) && (towerLocationsByPixelPosition[i].y - towerLocationsByPixelPosition[numOfTowers].y > -45) && (towerLocationsByPixelPosition[i].y - towerLocationsByPixelPosition[numOfTowers].y < 45) ){
					objObstruct = true;
				}
			}
		}
		if (!objObstruct && towerxy.x < 870 && towerxy.y < 570){
			clickedTowerImg.src = '../images/' + towerType +'.png';
			ctx.drawImage(clickedTowerImg, towerLocationsByPixelPosition[numOfTowers].x, towerLocationsByPixelPosition[numOfTowers].y, 45, 45);
			createTowerObject(towerType, towerLocationsByPixelPosition[numOfTowers].x, towerLocationsByPixelPosition[numOfTowers].y);
			numOfTowers++;
		}
		objObstruct = false;
		e.target.removeEventListener(e.type, arguments.callee);
	}
	
}


//Towers search for enemies then attack
function getTargets(){
	for(a=0; a < enemiesOnBoard.length; ++a){
		i = a;
		for(b=0; b < towersOnBoard.length; ++b){
			x = b;
			var distanceObj = distance (enemiesOnBoard[a].xCoord, towersOnBoard[b].xCoord, enemiesOnBoard[a].yCoord, towersOnBoard[b].yCoord);
			if(distanceObj <= towersOnBoard[b].range && (towersOnBoard[b].hasTarget == false)){
				towersOnBoard[b].hasTarget = true;
				//setInterval(attack(enemiesOnBoard[a].health, towersOnBoard[b].damage), towersOnBoard[b].attackSpeed);
				//console.log(a,b,enemiesOnBoard[a]);
				//console.log(a);
				var attack = setInterval(function() {
					
					console.log(i,x,enemiesOnBoard[i].health);
					
					if (enemiesOnBoard[i].health > 0){
						enemiesOnBoard[i].health -= towersOnBoard[x].damage;
					}
					else if (enemiesOnBoard[i].health <= 0){
						towersOnBoard[x].hasTarget = false;
						ctx.clearRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, 25, 37);
						clearInterval(enemiesOnBoard[i].enemyNextMove);
						enemiesOnBoard.splice(i,1);
						clearInterval(attack);
					}
				}, towersOnBoard[b].attackSpeed);
			}
		}
	}
}



//End tower section ---------------------------------------------------------------------------------------------------------------------------

//Initialize Game
initGame();
function initGame()
{
	currentStageImage.src = "../images/" + stageImages[currentStage];
}

function update(){
	if (towersOnBoard.length != 0 && enemiesOnBoard.length != 0){
		getTargets();
	}
}