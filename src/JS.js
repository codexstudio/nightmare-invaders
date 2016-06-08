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
				'../images/lamp.png',
				'../images/lampOn.png',
				'../images/ghost.png',
				'../images/blueSkeleton.png',
				'../images/basicSkeleton.png',
				'../images/redSkeleton.png',
				'../images/bigBoss.png'
			)
			
			
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
stages[1] = "Basement";
//stages[2] = "";
//stages[3] = "";


//List of stage images
var stageImages = [];

stageImages[0] = "Stage1.png";
stageImages[1] = "Stage2.png";
//stageImages[2] = "";
//stageImages[3] = "";


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
			
var pathBasement = [grid[5][60], grid[5][59], grid[5][58], grid[5][57], grid[5][56], grid[5][55], grid[5][54], grid[5][53], 
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
stagePaths[1] = pathBasement;
//stagePaths[2] = ;


//UI Elements
var Gold = 100;
var Hp = 100;
var gameMessage = "Welcome to Nightmare Invaders!";
var outputHp = document.querySelector("#outputHp");
var outputGold = document.querySelector("#outputGold");
var outputLevel = document.querySelector("#outputLevel");
var outputGameMessage = document.querySelector("#gameMessage");
var outputStageName = document.querySelector("#stageName");


function menu(){
	window.location="Menu.html";
}

function prevStage(){
	if(currentStage > 0){
		Gold = 100;
		currentStage--;
		currentStageImage.src = "../images/" + stageImages[currentStage];

		while (towersOnBoard.length > 0){
			clearInterval(towersOnBoard[0].attackEnemy);
			towersOnBoard.splice(0, 1);
		}
		while (enemiesOnBoard.length > 0){
			clearInterval(enemiesOnBoard[0].enemyNextMove);
			enemiesOnBoard.splice(0, 1);
		}
		while (towerLocationsByPixelPosition.length > 0){
			towerLocationsByPixelPosition.splice(0, 1);
		}
		numOfTowers = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	else{
		gameMessage = "This is the first stage!";
	}
}

function nextStage(){
	if(currentStage < stages.length-1){
		Gold = 100;
		currentStage++;
		currentStageImage.src = "../images/" + stageImages[currentStage];
		while (towersOnBoard.length > 0){
			clearInterval(towersOnBoard[0].attackEnemy);
			towersOnBoard.splice(0, 1);
		}
		while (enemiesOnBoard.length > 0){
			clearInterval(enemiesOnBoard[0].enemyNextMove);
			enemiesOnBoard.splice(0, 1);
		}
		while (towerLocationsByPixelPosition.length > 0){
			towerLocationsByPixelPosition.splice(0, 1);
		}
		numOfTowers = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	else {
		gameMessage = "This is the last stage!";
	}
}


//The img elements
var currentStageImage = document.getElementById("currentStageImage");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var towerImg = new Image();
var lampOnOff = new Image();
var enemyImgToPrint = new Image();


//Gold Over Time
var awardGoldOverTime;
var goldOverTime = setInterval(function(){
	if (awardGoldOverTime == true){
		Gold++;
	}
}, 500);


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

//Angle variable
var ang = 0;

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
	
	this.enemyNextMove = setInterval(function() {
		//console.log("x: " + (stagePaths[currentStage])[enemyObj.pathPos].x + " <= " + enemyObj.xCoord);
		//console.log("y: " + (stagePaths[currentStage])[enemyObj.pathPos].y + " <= " + enemyObj.yCoord);
		if (((stagePaths[currentStage])[enemyObj.pathPos].x <= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.xCoord--;
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].x >= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.xCoord++;
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y <= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.yCoord--;
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y >= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord+1)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.yCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.yCoord++;
		}
		if (enemyObj.pathPos > (stagePaths[currentStage]).length-1) {
			console.log();
			for (var j = 0; j < enemiesOnBoard.length; j++){
				if (enemiesOnBoard[j].pathPos > (stagePaths[currentStage]).length-1){
					enemiesOnBoard.splice(j,1);
					break;
				}
			}
			Hp -= enemyObj.damage;
			clearInterval(enemyObj.enemyNextMove);
		}
		if (enemyObj instanceof ghost){
			enemyObj.checkGhostVisibility();
		}
	}, this.speed);
}


function basicSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth,health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 200;
	this.health = 200;
	this.damage = 1;
	this.speed = 30;
	this.killReward = 5;
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
	this.speed = 50;
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
	this.killReward = 2;
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

ghost.prototype.checkGhostVisibility = function(){
	
	var seenByLamp = false;
	
	for (var a = 0; a < towersOnBoard.length; a++){
		var i = a;
		if(towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towersOnBoard[i] instanceof lamp){
			var distanceLamp = distance (towersOnBoard[i].xCoord, this.xCoord, towersOnBoard[i].yCoord, this.yCoord);
			
			if (distanceLamp <= towersOnBoard[i].range){
				seenByLamp = true;
			}
		}
	}
	if (seenByLamp){
		this.isVisible = true;
	}
	else if (!seenByLamp){
		this.isVisible = false;
	}
};

function bigBoss(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 20000;
	this.health = 20000;
	this.damage = 100;
	this.speed = 80;
	this.killReward = 0;
}
bigBoss.prototype = Object.create(enemy.prototype);
bigBoss.prototype.constructor = bigBoss;

bigBoss.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};
// End of enemy bluprint section----------------------------------------------------


function spawnEnemy(enemyType){
	var tempEnemyObj = new (eval(enemyType))();
	enemiesOnBoard.push(tempEnemyObj);
	//console.log("NEW " + enemyType + " MADE!");
	//console.log("Health = " + enemiesOnBoard[enemiesOnBoard.length-1].health);
	//console.log("Damage = " + enemiesOnBoard[enemiesOnBoard.length-1].damage);
	//console.log("Speed = " + enemiesOnBoard[enemiesOnBoard.length-1].speed);
	//console.log("Kill Reward = " + enemiesOnBoard[enemiesOnBoard.length-1].killReward);
	
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
var tower = function(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice){
	this.cost = cost;
	this.damage = damage;
	this.range = range;
	this.attackSpeed = attackSpeed;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.upgraded = false;
	this.targetIndice = -1;
	this.attackEnemy;
};


tower.prototype.attack = function(towerObj, towerName){
	
	this.attackEnemy = setInterval (function(){
		var max = 0;
		
		if (towersOnBoard.length > 0 && towerName == "lamp"){
			towerObj.lampIO();
		}
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName == "marbleShooter") {
			towerObj.marbleBuffShot();
		}
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName != "lamp"){
			
			for (var a = 0; a < enemiesOnBoard.length; a++){
				var i = a;
				if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0){
					if (enemiesOnBoard[i] instanceof ghost && enemiesOnBoard[i].isVisible == false){
						continue;
					}
					
					var distanceEnemy = distance (enemiesOnBoard[i].xCoord, towerObj.xCoord, enemiesOnBoard[i].yCoord, towerObj.yCoord);
					
					if (distanceEnemy > towerObj.range){
						continue;
					}
				
					if (enemiesOnBoard[i].pathPos > max){
						max = enemiesOnBoard[i].pathPos;
					}
				}
			}
			
			if (max == 0){
				towerObj.targetIndice = -1;
			}
			
			if (max > 0){
				for (var b = 0; b < enemiesOnBoard.length; b++){
					var j = b;
					if (enemiesOnBoard[j].pathPos == max){
						//console.log("Enemy # " + i + " health: " + enemiesOnBoard[i].health);
						towerObj.targetIndice = j;
						enemiesOnBoard[j].health -= towerObj.damage;
						if (towerObj instanceof marbleShooter) {
							this.shotCounter++;
						}
						
						if (enemiesOnBoard[j].health <= 0){
							clearInterval(enemiesOnBoard[j].enemyNextMove);
							Gold += enemiesOnBoard[j].killReward;
							enemiesOnBoard.splice(j,1);
						}
						break;
					}
				}
			}
		}
	}, this.attackSpeed);
};


function toyCarLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice);
	this.cost = 80;
	this.damage = 20;
	this.range = 160;
	this.attackSpeed = 900;
}
toyCarLauncher.prototype = Object.create(tower.prototype);
toyCarLauncher.prototype.constructor = toyCarLauncher;

toyCarLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined toyCarLauncher Method.")
};

function lamp(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, on){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 30;
	this.damage = 0;
	this.range = 180;
	this.attackSpeed = 1;
	this.on = false;
}
lamp.prototype = Object.create(tower.prototype);
lamp.prototype.constructor = lamp;

lamp.prototype.lampIO = function(){

	var seenGhost = false;
	
	for (var a = 0; a < enemiesOnBoard.length; a++){
		var i = a;
		if(towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && enemiesOnBoard[i] instanceof ghost){
			var distanceLamp = distance (this.xCoord, enemiesOnBoard[i].xCoord, this.yCoord, enemiesOnBoard[i].yCoord);
			
			if (distanceLamp <= this.range){
				seenGhost = true;
			}
		}
	}
	
	if (towersOnBoard.length > 0 && seenGhost){
		this.on = true;
		seenGhost = false;
	}
	else if (towersOnBoard.length > 0 && !seenGhost){
		this.on = false;
		seenGhost = false;
	}
	else if (towersOnBoard.length > 0 && enemiesOnBoard.length == 0){
		this.on = false;
		seenGhost = false;
	}
};

function actionFigure(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice);
	this.cost = 150;
	this.damage = 250;
	this.range = 90;
	this.attackSpeed = 4000;
}
actionFigure.prototype = Object.create(tower.prototype);
actionFigure.prototype.constructor = actionFigure;

actionFigure.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Action Figure Method.")
};

function marbleShooter(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, shotCounter){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, shotCounter);
	this.cost = 50;
	this.damage = 10;
	this.range = 250;
	this.attackSpeed = 700;
	this.shotCounter = 0;
}
marbleShooter.prototype = Object.create(tower.prototype);
marbleShooter.prototype.constructor = marbleShooter;

marbleShooter.prototype.marbleBuffShot = function() {
	if (this.shotCounter % 5 == 4) {
		this.damage = this.damage * 2; 
	}
	else if (this.shotCounter % 5 == 0 && this.shotCounter != 0) {
		this.damage = this.damage / 2;
	}
}
//End tower blueprints section----------------------------------------------------


function createTowerObject(towerType, x, y){
	var tempTowerObject = new (eval(towerType))(null, null, null, null, x, y, null);
	towersOnBoard.push(tempTowerObject);
	Gold -= tempTowerObject.cost;
	//Temp console log for debugging, can be removed later.
	//console.log("NEW " + towerType + " MADE!");
	//console.log("Cost = " + towersOnBoard[towersOnBoard.length-1].cost);
	//console.log("Damage = " + towersOnBoard[towersOnBoard.length-1].damage);
	//console.log("Range = " + towersOnBoard[towersOnBoard.length-1].range);
	//console.log("Attack Speed = " + towersOnBoard[towersOnBoard.length-1].attackSpeed);
	//console.log("x pixel loc = " + towersOnBoard[towersOnBoard.length-1].xCoord);
	//console.log("y pixel loc = " + towersOnBoard[towersOnBoard.length-1].yCoord);
	//console.log("Upgraded? = " + towersOnBoard[towersOnBoard.length-1].upgraded);

		if (towersOnBoard.length > 0){
			tempTowerObject.attack(tempTowerObject, towerType);
		}
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
				gameMessage = "Failed to place. Too close to the path.";
			}
			
		}
		if (numOfTowers > 0){
			for (var i = 0; i < towerLocationsByPixelPosition.length-1; i++){
				if ( (towerLocationsByPixelPosition[i].x - towerLocationsByPixelPosition[numOfTowers].x > -45) && (towerLocationsByPixelPosition[i].x - towerLocationsByPixelPosition[numOfTowers].x < 45) && (towerLocationsByPixelPosition[i].y - towerLocationsByPixelPosition[numOfTowers].y > -45) && (towerLocationsByPixelPosition[i].y - towerLocationsByPixelPosition[numOfTowers].y < 45) ){
					objObstruct = true;
					gameMessage = "Failed to place. Too close to another tower.";
				}
			}
		}
		var towerObjectHolder = new (eval(towerType))();
		if (!objObstruct && towerxy.x < 870 && towerxy.y < 570){
			if (Gold >= towerObjectHolder.cost){
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
	//var direction;
	
	var a = enemyX - (towerX + 22.5) - 1.5;
	var b = enemyY - (towerY + 22.5) - 1.5; 
	
	var c = Math.atan2(b , a) * 180 / Math.PI;
	c+=90;
	
	//THIS FUNCTION NOW RETURNS THE ANGLE FROM TOWER TO ENEMY
/*	
	if (c <= 0){
		c = 360 - Math.abs(c);
	}
	
	if (c >= 337.5 || c < 22.5) { //North
		direction = "North";
	}
 	else if (c >= 22.5 && c < 67.5) { //Northwest
		direction = "Northeast";
	} 
	else if (c >= 67.5 && c < 112.5) { //East
		direction = "East"; 
	}
	else if (c >= 112.5 && c < 157.5) { //West
		direction = "Southeast";
	}
	else if (c >= 157.5 && c < 202.5) { //South
		direction = "South"; 
	}
	else if (c >= 202.5 && c < 247.5) { //Southwest
		direction = "Southwest";
	}
	else if (c >= 247.5 && c < 292.5) { //West
		direction = "West"; 
	}
	else if (c >= 292.5 && c < 337.5) { //Northwest
		direction = "Northwest"; 
	}
	console.log(direction);*/
	return c;
}

function getStats(turret) {
	var outputCost = document.querySelector("#outputCost-" + turret);
	var outputDamage = document.querySelector("#outputDamage-" + turret);
	var outputRange = document.querySelector("#outputRange-" + turret);
	var outputAspd = document.querySelector("#outputAspd-" + turret);
	
	var towerPlaceholder = new (eval(turret))();
	outputCost.innerHTML = "Cost: " + towerPlaceholder.cost;
	outputDamage.innerHTML = "Damage: " + towerPlaceholder.damage;
	outputRange.innerHTML = "Range: " + towerPlaceholder.range;
	outputAspd.innerHTML = "Attack Speed: " + towerPlaceholder.attackSpeed + " (Reload Time)";
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
	outputStageName.innerHTML = stages[currentStage];	
	outputLevel.innerHTML = "<b>Level: </b>" + (currentStage+1);
	
	if(Hp <= 0){
		gameMessage = "Game Over. You got rekt by your nightmares and peed your pants";
	}
	
	if (enemiesOnBoard.length > 0){
		awardGoldOverTime = true;
	}
	else if (enemiesOnBoard.length == 0){
		awardGoldOverTime = false;
	}
	
	stageWin();
}

render();
function render(){
	requestID = requestAnimationFrame(render);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	//lamp check
	for (var i = 0; i < towersOnBoard.length; i++){
		if (towersOnBoard[i] instanceof lamp){
			if (towersOnBoard[i].on == true){
				lampOnOff.src = '../images/lampOn.png';
			}
			else if (towersOnBoard[i].on == false){
				lampOnOff.src = '../images/lamp.png';
			}
			ctx.drawImage(lampOnOff, towersOnBoard[i].xCoord, towersOnBoard[i].yCoord, 45, 45);
		}
	}
	
	//enemy movement
	for (var i = 0; i < enemiesOnBoard.length; i++){
		//console.log('../images/' + enemiesOnBoard[i].constructor.name + '.png');
		enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
		ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
		ctx.fillStyle = "rgb(0,204,0)";
		ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
	}
	
	//draw towers
	for (var i = 0; i < towersOnBoard.length; i++){
		if (!(towersOnBoard[i] instanceof lamp)){
			towerImg.src = '../images/' + towersOnBoard[i].constructor.name +  '.png';
			
			var cache = towerImg;
			//if rotateTower function returns error then ang = 0
			if (enemiesOnBoard[(towersOnBoard[i].targetIndice)] === undefined) {
				ang = 0;
			} else {
				ang = rotateTower(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].xCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].yCoord);
			}

			if(towersOnBoard[i] instanceof actionFigure){
				ang = 0;
			}
			
			//console.log(ang);

			ctx.save();
			//snapshot of canvas
			ctx.translate(towersOnBoard[i].xCoord,towersOnBoard[i].yCoord);
			//image is originally at (0,0), this translates it to it's proper coordinates
			ctx.translate(towerImg.width/2,towerImg.height/2);
			ctx.rotate(Math.PI / 180 * ang);
			ctx.drawImage(towerImg, -towerImg.width/2, -towerImg.height/2);
			//above rotates and centres the image
			ctx.restore();
			//restores canvas
		}
	}
}



var bossSpawned = false; //Checks to see if boss has spawned 
//Checks if player has beat the current stage
function stageWin() {
	var bActive = false; //If boss is on map, turns to true
	for(var i = 0; i < enemiesOnBoard.length; i++) {
		if (enemiesOnBoard[i] instanceof bigBoss) {
			if (bossSpawned == false){
				gameMessage = "BOSS INCOMING!";
			}
			bActive = true;
			break;
		} 	
	}
	
	if (bActive == true) {
		bossSpawned = true;
	}
	
	if (bActive == false && bossSpawned == true) {
		bossSpawned = false;
		bActive = false;
		nextStage();
	}
}

//temp function for demonstrative purposes of the First Playable/Alpha
function sampleWave (){
	var i = 0;
	
	var e1 = setInterval(function() {
		if(i > -1){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 5){
			clearInterval(e1);
		}
	}, 4000);
	
	var e2 = setInterval(function() {
		if(i > 5){
			spawnEnemy("ghost");
			i++;
		}
		if(i > 8){
			clearInterval(e2);
		}
	}, 4000);
	
	var e3 = setInterval(function() {
		if(i > 8){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 10){
			clearInterval(e3);
		}
	}, 4000);
	
	var e4 = setInterval(function() {
		if(i > 10){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 13){
			clearInterval(e4);
		}
	}, 4000);
	
	var e5 = setInterval(function() {
		if(i > 8){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 9){
			clearInterval(e5);
		}
	}, 4000);
	
	var e6= setInterval(function() {
		if(i > 9){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 10){
			clearInterval(e6);
		}
	}, 9500);
	
	var e7 = setInterval(function() {
		if(i > 10){
			spawnEnemy("blueSkeleton");
			i++;
		}
		if(i > 11){
			clearInterval(e7);
		}
	}, 10000);
	
	var e8 = setInterval(function() {
		if(i > 11){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 12){
			clearInterval(e8);
		}
	}, 10500);
	
	var e9 = setInterval(function() {
		if(i > 12){
			spawnEnemy("blueSkeleton");
			i++;
		}
		if(i > 21){
			clearInterval(e9);
		}
	}, 3000);

	var e10 = setInterval(function() {
		if(i > 21){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 26){
			clearInterval(e10);
		}
	}, 7000);
	
	var e11 = setInterval(function() {
		if(i > 26){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 32){
			clearInterval(e11);
		}
	}, 2000);
	
	var e12 = setInterval(function() {
		if(i > 32){
			spawnEnemy("ghost");
			i++;
		}
		if(i > 33){
			clearInterval(e12);
		}
	}, 3000);
	
	var e13 = setInterval(function() {
		if(i > 33){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 35){
			clearInterval(e13);
		}
	}, 1000);
	
	var e14 = setInterval(function() {
		if(i > 35){
			spawnEnemy("blueSkeleton");
			i++;
		}
		if(i > 38){
			clearInterval(e14);
		}
	}, 1000);
	
	var e15 = setInterval (function() {
		if(i > 38){
			spawnEnemy("ghost");
			i++;
		}
		if(i > 40){
			clearInterval(e15);
		}
	}, 2000);
	
	var e16 = setInterval(function() {
		if(i > 40){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 50){
			clearInterval(e16);
		}
	}, 1500);
	
	var e17 = setInterval(function() {
		if(i > 50){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 55){
			clearInterval(e17);
		}
	}, 2000);
	
	var e18 = setInterval (function() {
		if(i > 55){
			spawnEnemy("blueSkeleton");
			i++;
		}
		if(i > 60){
			clearInterval(e18);
		}
	}, 1000);
	
	var e19 = setInterval (function() {
		if(i > 60){
			spawnEnemy("ghost");
			i++;
		}
		if(i > 65){
			clearInterval(e19);
		}
	}, 5000);
	
	var e20 = setInterval (function() {
		if(i > 65){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 75){
			clearInterval(e20);
		}
	}, 1500);

	var e21 = setInterval (function() {
		if(i > 75){
			spawnEnemy("ghost");
			i++;
		}
		if(i > 76){
			clearInterval(e21);
		}
	}, 2000);
	
	var e22 = setInterval (function() {
		if(i > 76){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 78){
			clearInterval(e22);
		}
	}, 1500);
	
	var e23 = setInterval (function() {
		if(i > 78){
			spawnEnemy("blueSkeleton");
			i++;
		}
		if(i > 83){
			clearInterval(e23);
		}
	}, 1000);
	
	var e24 = setInterval (function() {
		if(i > 83){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 88){
			clearInterval(e24);
		}
	}, 1500);
	
	var e25 = setInterval (function() {
		if(i > 88){
			spawnEnemy("redSkeleton");
			i++;
		}
		if(i > 100){
			clearInterval(e25);
		}
	}, 2000);
	
	var e26 = setInterval (function() {
		if(i > 100){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 101){
			clearInterval(e26);
		}
	}, 5000);
	
	var e27 = setInterval (function() {
		if(i > 101){
			spawnEnemy("basicSkeleton");
			i++;
		}
		if(i > 140){
			clearInterval(e27);
		}
	}, 1000);
	
	var e28 = setInterval (function() {
		if(i > 140){
			spawnEnemy("bigBoss");
			i++;
		}	
		if(i > 141){
			gameMessage = "End of sample wave.";
			clearInterval(e28);
		}
	}, 20000);	
}
	
