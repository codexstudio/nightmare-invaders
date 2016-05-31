//Set FPS
var fps = setInterval(update, 33.34); // 30fps

var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
				'../images/rotatedTowerImages/toyCarLauncherNorth.png',
				'../images/rotatedTowerImages/toyCarLauncherNortheast.png',
				'../images/rotatedTowerImages/toyCarLauncherNorthwest.png',
				'../images/rotatedTowerImages/toyCarLauncherEast.png', 
				'../images/rotatedTowerImages/toyCarLauncherSoutheast.png',
				'../images/rotatedTowerImages/toyCarLauncherSouth.png',
				'../images/rotatedTowerImages/toyCarLauncherSouthwest.png', 
				'../images/rotatedTowerImages/toyCarLauncherWest.png',
				'../images/rotatedTowerImages/actionFigureNorth.png',
				'../images/rotatedTowerImages/actionFigureNortheast.png',
				'../images/rotatedTowerImages/actionFigureNorthwest.png',
				'../images/rotatedTowerImages/actionFigureEast.png',
				'../images/rotatedTowerImages/actionFigureSouth.png',
				'../images/rotatedTowerImages/actionFigureSoutheast.png',
				'../images/rotatedTowerImages/actionFigureSouthwest.png',
				'../images/rotatedTowerImages/actionFigureWest.png',
				'../images/rotatedTowerImages/marbleShooterNorth.png',
				'../images/rotatedTowerImages/marbleShooterNortheast.png',
				'../images/rotatedTowerImages/marbleShooterNorthwest.png',
				'../images/rotatedTowerImages/marbleShooterEast.png',
				'../images/rotatedTowerImages/marbleShooterSoutheast.png',
				'../images/rotatedTowerImages/marbleShooterSouth.png',
				'../images/rotatedTowerImages/marbleShooterSouthwest.png',
				'../images/rotatedTowerImages/marbleShooterWest.png',
				'../images/rotatedTowerImages/lampNorth.png',
				'../images/rotatedTowerImages/lampNortheast.png',
				'../images/rotatedTowerImages/lampNorthwest.png',
				'../images/rotatedTowerImages/lampEast.png',
				'../images/rotatedTowerImages/lampSoutheast.png',
				'../images/rotatedTowerImages/lampSouth.png',
				'../images/rotatedTowerImages/lampSouthwest.png',
				'../images/rotatedTowerImages/lampWest.png'
			)
		//--><!]]>

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


//UI Variables
var Gold = 100;
var Hp = 100;
var gameMessage = "Welcome to Nightmare Invaders!";
var outputHp = document.querySelector("#outputHp");
var outputGold = document.querySelector("#outputGold");
var outputGameMessage = document.querySelector("#gameMessage");


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
	} 
	else {
		document.getElementById("grid").style.display = "none";
		show = true;
	}
}

//Enemy related section-----------------------------------------------------------------------------------------------------------
var enemiesOnBoard = [];


//Enemies Bluprint Section----------------------------------------------------------
 var enemy = function(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	this.startHealth = startHealth;
	this.health = health;
	this.damage = damage;
	this.speed = speed;
	this.killReward = killReward;
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
			ctx.clearRect(enemyObj.xCoord-15, enemyObj.yCoord-20, 27, 37);
			enemyObj.xCoord--;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-15, 25, 32);
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemyObj.xCoord-13, enemyObj.yCoord-20, (25 * (enemyObj.health / enemyObj.startHealth)), 5);
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].x >= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-15, enemyObj.yCoord-20, 27, 37);
			enemyObj.xCoord++;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-15, 25, 32);
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemyObj.xCoord-13, enemyObj.yCoord-20, (25 * (enemyObj.health / enemyObj.startHealth)), 5);
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y <= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-15, enemyObj.yCoord-20, 27, 37);
			enemyObj.yCoord--;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-15, 25, 32);
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemyObj.xCoord-13, enemyObj.yCoord-20, (25 * (enemyObj.health / enemyObj.startHealth)), 5);
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y >= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord+1)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.yCoord == 0){
				enemyObj.pathPos++;
			}
			ctx.clearRect(enemyObj.xCoord-15, enemyObj.yCoord-20, 27, 37);
			enemyObj.yCoord++;
			ctx.drawImage(enemyImgToPrint, enemyObj.xCoord-13, enemyObj.yCoord-15, 25, 32);
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemyObj.xCoord-13, enemyObj.yCoord-20, (25 * (enemyObj.health / enemyObj.startHealth)), 5);
		}
		if (enemyObj.pathPos > (stagePaths[currentStage]).length-1) {
				ctx.clearRect(enemyObj.xCoord-15, enemyObj.yCoord-20, 27, 37);
				enemiesOnBoard.splice(0,1);
				Hp -= enemyObj.damage;
				clearInterval(enemyObj.enemyNextMove);
		}
		
	}, this.speed);
}


function basicSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth,health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 200;
	this.health = 200;
	this.damage = 1;
	this.speed = 30;
	this.killReward = 10;
}
basicSkeleton.prototype = Object.create(enemy.prototype);
basicSkeleton.prototype.constructor = basicSkeleton;

basicSkeleton.prototype.thisChildMetohdNeedsAName = function(){
	console.log("Undefined Child Method");
};

function redSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 500;
	this.health = 500;
	this.damage = 2;
	this.speed = 60;
	this.killReward = 20;
}
redSkeleton.prototype = Object.create(enemy.prototype);
redSkeleton.prototype.constructor = redSkeleton;

redSkeleton.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function blueSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos)
	this.startHealth = 100;
	this.health = 100;
	this.damage = 1;
	this.speed = 20;
	this.killReward = 15;
}
blueSkeleton.prototype = Object.create(enemy.prototype);
blueSkeleton.prototype.constructor = blueSkeleton;

blueSkeleton.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method");
};
function ghost(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isVisible){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos)
	this.startHealth = 350;
	this.health = 350;
	this.damage = 2;
	this.speed = 50;
	this.killReward = 25;
	this.isVisible = false;
}
ghost.prototype = Object.create(enemy.prototype);
ghost.prototype.constructor = ghost;

ghost.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method");
};

// End of enemy bluprint section----------------------------------------------------


function spawnEnemy(enemyType){
	var tempEnemyObj = new (eval(enemyType))();
	enemiesOnBoard.push(tempEnemyObj);
	console.log("NEW " + enemyType + " MADE!");
	console.log("Health = " + enemiesOnBoard[enemiesOnBoard.length-1].health);
	console.log("Damage = " + enemiesOnBoard[enemiesOnBoard.length-1].damage);
	console.log("Speed = " + enemiesOnBoard[enemiesOnBoard.length-1].speed);
	console.log("Kill Reward = " + enemiesOnBoard[enemiesOnBoard.length-1].killReward);
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
var tower = function(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	this.cost = cost;
	this.damage = damage;
	this.range = range;
	this.attackSpeed = attackSpeed;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.upgraded = false;
};


tower.prototype.attack = function(towerObj, towerName){
	
	for (var a = 0; a < enemiesOnBoard.length; a++){
		var i = a;
		if(towersOnBoard.length > 0 && enemiesOnBoard.length > 0){
			var distanceEnemy = distance (enemiesOnBoard[i].xCoord, towerObj.xCoord, enemiesOnBoard[i].yCoord, towerObj.yCoord);
			
			if(distanceEnemy <= towerObj.range){
				//console.log("Enemy # " + i + " health: " + enemiesOnBoard[i].health);
				var rotatedTowerImg = new Image();
				rotatedTowerImg.src = '../images/rotatedTowerImages/' + towerName + rotateTower(towerObj.xCoord, towerObj.yCoord, enemiesOnBoard[i].xCoord, enemiesOnBoard[i].yCoord) + '.png';
				ctx.clearRect(towerObj.xCoord, towerObj.yCoord, 45, 45);
				ctx.drawImage(rotatedTowerImg, towerObj.xCoord, towerObj.yCoord, 45, 45);
				
				if (enemiesOnBoard[i].health > 0){
					enemiesOnBoard[i].health -= towerObj.damage;
					return;
				}
				else if (enemiesOnBoard[i].health <= 0){
					ctx.clearRect(enemiesOnBoard[i].xCoord-15, enemiesOnBoard[i].yCoord-20, 27, 37);
					clearInterval(enemiesOnBoard[i].enemyNextMove);
					Gold += enemiesOnBoard[i].killReward;
					enemiesOnBoard.splice(i,1);
					
					return;
				}
			}
		}
	}
};


function toyCarLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 50;
	this.damage = 15;
	this.range = 120;
	this.attackSpeed = 500;
}
toyCarLauncher.prototype = Object.create(tower.prototype);
toyCarLauncher.prototype.constructor = toyCarLauncher;

toyCarLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined toyCarLauncher Method.")
};

function lamp(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 30;
	this.damage = 0;
	this.range = 100;
	this.attackSpeed = 1;
}
lamp.prototype = Object.create(tower.prototype);
lamp.prototype.constructor = lamp;

lamp.prototype.lampAbility = function(){
	
};

function actionFigure(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 200;
	this.damage = 250;
	this.range = 80;
	this.attackSpeed = 2000;
}
actionFigure.prototype = Object.create(tower.prototype);
actionFigure.prototype.constructor = actionFigure;

actionFigure.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Action Figure Method.")
};

function marbleShooter(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 75;
	this.damage = 5;
	this.range = 200;
	this.attackSpeed = 400;
}
marbleShooter.prototype = Object.create(tower.prototype);
marbleShooter.prototype.constructor = marbleShooter;

toyCarLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined toyCarLauncher Method.")
};
//End tower blueprints section----------------------------------------------------


function createTowerObject(towerType, x, y){
	var tempTowerObject = new (eval(towerType))(null, null, null, null, x, y, null);
	towersOnBoard.push(tempTowerObject);
	Gold -= tempTowerObject.cost;
	//Temp console log for debugging, can be removed later.
	/*console.log("NEW " + towerType + " MADE!");
	console.log("Cost = " + towersOnBoard[towersOnBoard.length-1].cost);
	console.log("Damage = " + towersOnBoard[towersOnBoard.length-1].damage);
	console.log("Range = " + towersOnBoard[towersOnBoard.length-1].range);
	console.log("Attack Speed = " + towersOnBoard[towersOnBoard.length-1].attackSpeed);
	//console.log("x pixel loc = " + towersOnBoard[towersOnBoard.length-1].xCoord);
	//console.log("y pixel loc = " + towersOnBoard[towersOnBoard.length-1].yCoord);
	console.log("Upgraded? = " + towersOnBoard[towersOnBoard.length-1].upgraded);*/

	var attackTarget = setInterval(function() {
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0){
			tempTowerObject.attack(tempTowerObject, towerType);
		}
	}, tempTowerObject.attackSpeed);
	
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
		var towerObjectHolder = new (eval(towerType))();
		if (!objObstruct && towerxy.x < 870 && towerxy.y < 570){
			if (Gold >= towerObjectHolder.cost){
				clickedTowerImg.src = '../images/' + towerType +'.png';
				ctx.drawImage(clickedTowerImg, towerLocationsByPixelPosition[numOfTowers].x, towerLocationsByPixelPosition[numOfTowers].y, 45, 45);
				createTowerObject(towerType, towerLocationsByPixelPosition[numOfTowers].x, towerLocationsByPixelPosition[numOfTowers].y);
				numOfTowers++;
			}
			else {
				gameMessage = "Not enough funds.";
			}
		}
		objObstruct = false;
		e.target.removeEventListener(e.type, arguments.callee);
	}
	
}

function rotateTower(towerX, towerY, enemyX, enemyY) {
	var direction;
	
	var a = enemyX - (towerX + 22.5) - 1.5;
	var b = enemyY - (towerY + 22.5) - 1.5; 
	
	var c = Math.atan2(b , a) * 180 / Math.PI;
	c+=90;
	
	if (c <= 0){
		c = 360 - Math.abs(c);
	}
	
	if (c >= 337.5 || c < 22.5) { //North
		direction = 'North';
	}
 	else if (c >= 22.5 && c < 67.5) { //Northwest
		direction = 'Northeast';
	} 
	else if (c >= 67.5 && c < 112.5) { //East
		direction = 'East'; 
	}
	else if (c >= 112.5 && c < 157.5) { //West
		direction = 'Southeast';
	}
	else if (c >= 157.5 && c < 202.5) { //South
		direction = 'South'; 
	}
	else if (c >= 202.5 && c < 247.5) { //Southwest
		direction = 'Southwest';
	}
	else if (c >= 247.5 && c < 292.5) { //West
		direction = 'West'; 
	}
	else if (c >= 292.5 && c < 337.5) { //Northwest
		direction = 'Northwest'; 
	}
	return direction;
}

function getStats(turret) {
	var outputCost = document.querySelector("#outputCost" + turret);
	var outputDamage = document.querySelector("#outputDamage" + turret);
	var outputRange = document.querySelector("#outputRange" + turret);
	var outputAspd = document.querySelector("#outputAspd" + turret);
	
	var towerPlaceholder = new (eval(turret))();
	outputCost.innerHTML = "Cost: " + towerPlaceholder.cost;
	outputDamage.innerHTML = "Damage: " + towerPlaceholder.damage;
	outputRange.innerHTML = "Range: " + towerPlaceholder.range;
	outputAspd.innerHTML = "Attack Speed: " + towerPlaceholder.attackSpeed;
}

//End tower section ---------------------------------------------------------------------------------------------------------------------------


//Initialize Game
initGame();
function initGame()
{
	currentStageImage.src = "../images/" + stageImages[currentStage];
	outputHp.innerHTML = "<b>Health: </b>" + Hp;
	outputGold.innerHTML = "<b>Gold: </b>" + Gold;
	outputGameMessage.innerHTML = gameMessage;
}

//Update Game
function update(){
	outputHp.innerHTML = "<b>Health: </b>" + Hp;
	outputGold.innerHTML = "<b>Gold: </b>" + Gold;
	outputGameMessage.innerHTML = gameMessage;
}

//temp function for demonstrative purposes of the First Playable
function sampleWave (){
	var i = 0;
	
	var e1 = setInterval(function() {
		if(i > -1){
			spawnEnemy("blueSkeleton");
			i++;
		}
		if(i > 3){
			clearInterval(e1);
		}
	}, 2000);
	
	var e2 = setInterval(function() {
		if(i > 3){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 7){
			clearInterval(e2);
		}
	}, 3500);
	
	var e3 = setInterval(function() {
		if(i > 7){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 11){
			clearInterval(e3);
		}
	}, 5000);
	
	var e4 = setInterval (function() {
		if(i > 11){
			spawnEnemy("ghost");
			i++;
		}
		if(i > 13){
			gameMessage = "End of sample wave.";
			clearInterval(e4);
		}
	}, 6500);
}

function preloader() {
	if (document.images) {
		var img1 = new Image();
		var img2 = new Image();
		var img3 = new Image();
		var img4 = new Image
		img1.src = '../images/rotatedTowerImages/toyCarLauncherNorth';
		img2.src = '../images/rotatedTowerImages/toyCarLauncherNortheast';
		img3.src = "http://domain.tld/path/to/image-003.gif";
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);