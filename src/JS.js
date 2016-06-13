//Set FPS
const fps = setInterval(update, 33.34); // 30fps

var images = new Array();
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image();
					images[i].src = preload.arguments[i];
				}
			}
			preload(
				'../images/lamp.png',
				'../images/lampOn.png',
				'../images/ghost.png',
				'../images/blueSkeleton.png',
				'../images/basicSkeleton.png',
				'../images/redSkeleton.png',
				'../images/bigBoss.png',
				'../images/bat.png',
				'../images/vampire.png',
				'../images/clown.png',
				'../images/bigBlob.png',
				'../images/blob.png',
				'../images/miniBlob.png',
				'../images/grizzlyBear.png',
				'../images/witch.png',
				'../images/blueDemon.png',
				'../images/redDemon.png',
				'../images/zombieDad.png',
				'../images/zombieMom.png',
				'../images/grimReaper.png'
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
stages[2] = "Kitchen";
stages[3] = "Parent's Bedroom";


//List of stage images
var stageImages = [];

stageImages[0] = "Stage1.png";
stageImages[1] = "Stage2.png";
stageImages[2] = "Stage3.png";
stageImages[3] = "Stage4.png";


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
			
var pathBasement = [grid[20][60], grid[20][59], grid[20][58], grid[20][57], grid[20][56], grid[20][55], grid[20][54], grid[20][53], 
			grid[21][53], grid[22][53], grid[23][53], grid[24][53], grid[25][53], grid[26][53], grid[27][53], 
			grid[28][53], grid[29][53], grid[30][53], grid[31][53], grid[32][53], grid[33][53], grid[34][53], 
			grid[35][53], grid[35][52], grid[35][51], grid[35][50], grid[35][49], grid[35][48], grid[35][47], 
			grid[35][46], grid[35][45], grid[35][44], grid[35][43], grid[35][42], grid[35][41], grid[35][40], 
			grid[35][39], grid[35][38], grid[35][37], grid[34][37], grid[33][37], grid[32][37], grid[31][37], 
			grid[30][37], grid[29][37], grid[28][37], grid[27][37], grid[26][37], grid[25][37], grid[24][37], 
			grid[23][37], grid[22][37], grid[21][37], grid[20][37], grid[19][37], grid[18][37], grid[17][37], 
			grid[16][37], grid[15][37], grid[14][37], grid[13][37], grid[12][37], grid[11][37], grid[10][37], 
			grid[10][36], grid[10][35], grid[10][34], grid[10][33], grid[10][32], 
			grid[10][31], grid[10][30], grid[10][29], grid[10][28], grid[10][27], grid[10][26], grid[10][25], 
			grid[10][24], grid[10][23], grid[10][22], grid[11][22], grid[12][22], grid[13][22], grid[14][22], 
			grid[15][22], grid[16][22], grid[17][22], grid[18][22], grid[19][22], grid[20][22], grid[21][22], 
			grid[22][22], grid[23][22], grid[24][22], grid[25][22], grid[25][21], grid[25][20], grid[25][19], 
			grid[25][18], grid[25][17], grid[25][16], grid[25][15], grid[25][14], grid[25][13], grid[25][12], 
			grid[25][11], grid[25][10], grid[24][10], grid[23][10], grid[22][10], grid[21][10], grid[20][10], 
			grid[20][9], grid[20][8], grid[20][7], grid[20][6], grid[20][5], grid[20][4], grid[20][3], grid[20][2], 
			grid[20][1], grid[20][0]];
			
var pathKitchen = [grid[25][60], grid[25][59], grid[25][58], grid[25][57], grid[25][56], grid[25][55], grid[25][54], grid[25][53], 
			grid[25][52], grid[25][51], grid[25][50], grid[25][49], grid[25][48], grid[25][47], grid[25][46], 
			grid[25][45], grid[26][45], grid[27][45], grid[28][45], grid[29][45], grid[30][45], grid[31][45], 
			grid[32][45], grid[33][45], grid[34][45], grid[35][45], grid[35][44], grid[35][43], grid[35][42], 
			grid[35][31], grid[35][30], grid[35][29], grid[35][28], grid[35][27], grid[35][26], grid[35][25], 
			grid[35][24], grid[35][23], grid[34][23], grid[33][23], grid[32][23], grid[31][23], grid[30][23], 
			grid[29][23], grid[28][23], grid[27][23], grid[26][23], grid[25][23], grid[24][23], grid[23][23], 
			grid[22][23], grid[21][23], grid[20][23], grid[19][23], grid[18][23], grid[17][23], grid[16][23], 
			grid[15][23], grid[15][24], grid[15][25], grid[15][26], grid[15][27], grid[15][28], grid[15][29], 
			grid[15][30], grid[15][31], grid[15][32], grid[15][33], grid[15][34], grid[15][35], grid[15][36], 
			grid[15][37], grid[14][37], grid[13][37], grid[12][37], grid[11][37], grid[10][37], grid[10][36], 
			grid[10][35], grid[10][34], grid[10][33], grid[10][32], grid[10][31], grid[10][30], grid[10][29], 
			grid[10][28], grid[10][27], grid[10][26], grid[10][25], grid[10][24], grid[10][23], grid[10][22], 
			grid[10][21], grid[10][20], grid[10][19], grid[10][18], grid[10][17], grid[10][16], grid[10][15], 
			grid[11][15], grid[12][15], grid[13][15], grid[14][15], grid[15][15], grid[15][14], grid[15][13], 
			grid[15][12], grid[15][11], grid[15][10], grid[15][9], grid[15][8], grid[15][7], grid[15][6], 
			grid[15][5], grid[15][4], grid[15][3], grid[15][2], grid[15][1], grid[15][0]];
			
var pathParentBedroom = [grid[35][60], grid[35][59], grid[35][58], grid[35][57], grid[35][56], grid[35][55], grid[35][54], grid[35][53], 
			grid[35][52], grid[34][52], grid[33][52], grid[32][52], grid[31][52], grid[30][52], grid[29][52], 
			grid[28][52], grid[27][52], grid[26][52], grid[25][52], grid[25][51], grid[25][50], grid[25][49], 
			grid[25][48], grid[25][47], grid[25][46], grid[25][45], grid[24][45], grid[23][45], grid[22][45], 
			grid[21][45], grid[20][45], grid[20][44], grid[20][43], grid[20][42], grid[20][41], grid[20][40], 
			grid[20][39], grid[20][38], grid[20][37], grid[19][37], grid[18][37], grid[17][37], grid[16][37], 
			grid[15][37], grid[14][37], grid[13][37], grid[12][37], grid[11][37], grid[10][37], grid[10][36], 
			grid[10][35], grid[10][34], grid[10][33], grid[10][32], grid[9][32], grid[8][32], grid[7][32], 
			grid[6][32], grid[5][32], grid[5][31], grid[5][30], grid[5][29], grid[5][28], grid[6][28], 
			grid[7][28], grid[8][28], grid[9][28], grid[10][28], grid[10][27], grid[10][26], grid[10][25], 
			grid[10][24], grid[10][23], grid[11][23], grid[12][23], grid[13][23], grid[14][23], grid[15][23], 
			grid[16][23], grid[17][23], grid[18][23], grid[19][23], grid[20][23], grid[20][22], grid[20][21], 
			grid[20][20], grid[20][19], grid[20][18], grid[20][17], grid[20][16], grid[20][15], grid[21][15], 
			grid[22][15], grid[23][15], grid[24][15], grid[25][15], grid[25][14], grid[25][13], grid[25][12], 
			grid[25][11], grid[25][10], grid[25][9], grid[25][8], grid[26][8], grid[27][8], grid[28][8], 
			grid[29][8], grid[30][8], grid[31][8], grid[32][8], grid[33][8], grid[34][8], grid[35][8], 
			grid[35][7], grid[35][6], grid[35][5], grid[35][4], grid[35][3], grid[35][2], grid[35][1], 
			grid[35][0]];
			
var stagePaths = [];
stagePaths[0] = pathChildBedroom;
stagePaths[1] = pathBasement;
stagePaths[2] = pathKitchen;
stagePaths[3] = pathParentBedroom;


//UI Elements
var Gold = 100; 
var Hp = 100;
var currentWave = 0;
var pause = false;
var gameMessage = "Welcome to Nightmare Invaders!";
var outputTowerStats = document.getElementById("outputTowerStats");
var outputPlayerStats = document.getElementById("outputPlayerStats");
var outputGameMessage = document.getElementById("gameMessage");
var outputStageName = document.getElementById("stageName");
var disabledTowers = document.getElementsByClassName("disabledTower");
var allSelected = document.getElementsByClassName("enabledTower");
var HTMLID_toyCarLauncher = document.getElementById("toyCarLauncher");
var HTMLID_actionFigure = document.getElementById("actionFigure");
var HTMLID_marbleShooter = document.getElementById("marbleShooter");
var HTMLID_lamp = document.getElementById("lamp");
var HTMLID_calculator = document.getElementById("calculator");
var HTMLID_nutsAndBolts = document.getElementById("nutsAndBolts");
var HTMLID_blenderDefender = document.getElementById("blenderDefender");
var HTMLID_mouseTrap = document.getElementById("mouseTrap");
var HTMLID_waterGun = document.getElementById("waterGun");
var HTMLID_airplaneLauncher = document.getElementById("airplaneLauncher");
var HTMLID_trophy = document.getElementById("trophy");
var HTMLID_vanquishEvil = document.getElementById("vanquishEvil");


//global variables
var ang = 0;
var oldAng = 0;
const TRAJ_SPEED = 10;

function menu(){
	window.location="Menu.html";
}

function gameOver(){
	window.location = "Game_Over.html";
}

function gameWin() {
	ctx.drawImage(gameCleared, 0, 0);
}

function prevStage(){
	if(currentStage > 0){
		Gold = 100;
		currentStage--;
		currentWave = 0;
		waveCounter = 0;
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
		currentWave = 0;
		waveCounter = 0;
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

		towerAvailable();
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
var showGrid = true;
function togGrid(){
	if (showGrid) {
		document.getElementById("grid").style.display = "block";
		showGrid = false;
	} 
	else {
		document.getElementById("grid").style.display = "none";
		showGrid = true;
	}
}

//Enemy related section-----------------------------------------------------------------------------------------------------------
var enemiesOnBoard = [];

//Enemies Bluprint Section----------------------------------------------------------
 var enemy = function(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	this.startHealth = startHealth;
	this.health = health;
	this.damage = damage;
	this.speed = speed;
	this.killReward = killReward;
	this.xCoord = (stagePaths[currentStage])[0].x;
	this.yCoord = (stagePaths[currentStage])[0].y;
	this.pathPos = 0;
	this.direction;
	this.enemyNextMove;
 }
enemy.prototype.enemyMovement = function(enemyObj){
	
	this.enemyNextMove = setInterval(function() {
		//console.log("x: " + (stagePaths[currentStage])[enemyObj.pathPos].x + " <= " + enemyObj.xCoord);
		//console.log("y: " + (stagePaths[currentStage])[enemyObj.pathPos].y + " <= " + enemyObj.yCoord);
		if (((stagePaths[currentStage])[enemyObj.pathPos].x <= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.direction = "west";
			enemyObj.xCoord--;
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].x >= enemyObj.xCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].y == enemyObj.yCoord)){
			if((stagePaths[currentStage])[enemyObj.pathPos].x % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.direction = "east";
			enemyObj.xCoord++;
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y <= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord+1)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.xCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.direction = "north";
			enemyObj.yCoord--;
		}
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y >= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord+1)){
			if((stagePaths[currentStage])[enemyObj.pathPos].y % enemyObj.yCoord == 0){
				enemyObj.pathPos++;
			}
			enemyObj.direction = "south";
			enemyObj.yCoord++;
		}
		if (enemyObj.pathPos > (stagePaths[currentStage]).length-1) {
			console.log();
			for (var j = 0; j < enemiesOnBoard.length; j++){
				if (enemiesOnBoard[j].pathPos > (stagePaths[currentStage]).length-1){
					enemiesOnBoard.splice(j,1);
					if (enemiesOnBoard[j] instanceof blueDemon) {
						enemyObj.blueDemonExit;
					}
					if (enemiesOnBoard[j] instanceof redDemon) {
						enemyObj.redDemonExit;
					}
					break;
				}
			}
			Hp -= enemyObj.damage;
			clearInterval(enemyObj.enemyNextMove);
		}
		if (enemyObj instanceof ghost){
			enemyObj.checkGhostVisibility();
		}
		if (enemyObj instanceof bat){
			enemyObj.checkBatVisibility();
		}
		if (enemyObj instanceof grimReaper) { 
			if (enemyObj.phaseOneComplete == false){
				enemyObj.spawnMomDad();
			}
			//else if () {
			//	enemyObj.removeRandomTowers();
			//}
			//else if () {
			//	enemyObj.becomeTowerOffense();
			//}
		}
	}, this.speed);
}


function basicSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth,health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
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

function redSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
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

function blueSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction)
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
function ghost(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isVisible, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction)
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

function bigBoss(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 200;
	this.health = 200;
	this.damage = 100;
	this.speed = 80;
	this.killReward = 0;
}
bigBoss.prototype = Object.create(enemy.prototype);
bigBoss.prototype.constructor = bigBoss;

bigBoss.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function blob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 400;
	this.health = 400;
	this.damage = 20;
	this.speed = 90;
	this.killReward = 0;
}
blob.prototype = Object.create(enemy.prototype);
blob.prototype.constructor = blob;

blob.prototype.blobSplit = function(){
	if (this.health <= 0) {
		var tempObj = new miniBlob;//make first miniblob object
		tempObj.pathPos = this.pathPos;//make its path position the same as when the blob dies
		tempObj.xCoord = this.xCoord;//make its x coordinate the same as when the blob dies
		tempObj.yCoord = this.yCoord;//make its y coordinate the same as when the blob dies
		enemiesOnBoard.push(tempObj);//add the set up object to the array of enemies on board
		tempObj.enemyMovement(tempObj);//initialize the object's movement
		
		//for blob that spawns ahead
		var tempObj1 = new miniBlob;
		tempObj1.pathPos = this.pathPos+1;
		switch(this.direction){
			case "north":
				tempObj1.xCoord = this.xCoord;
				tempObj1.yCoord = this.yCoord-15;
				break;
			case "east":
				tempObj1.xCoord = this.xCoord+15;
				tempObj1.yCoord = this.yCoord;
				break;
			case "south":
				tempObj1.xCoord = this.xCoord;
				tempObj1.yCoord = this.yCoord+15;
				break;
			case "west":
				tempObj1.xCoord = this.xCoord-15;
				tempObj1.yCoord = this.yCoord;
				break;
			default:
		}
		enemiesOnBoard.push(tempObj1);
		tempObj1.enemyMovement(tempObj1);
		
		//for blob that spawn behind
		var tempObj2 = new miniBlob;
		tempObj2.pathPos = this.pathPos-1;
		switch(this.direction){
			case "north":
				tempObj2.xCoord = this.xCoord;
				tempObj2.yCoord = this.yCoord+15;
				break;
			case "east":
				tempObj2.xCoord = this.xCoord-15;
				tempObj2.yCoord = this.yCoord;
				break;
			case "south":
				tempObj2.xCoord = this.xCoord;
				tempObj2.yCoord = this.yCoord-15;
				break;
			case "west":
				tempObj2.xCoord = this.xCoord+15;
				tempObj2.yCoord = this.yCoord;
				break;
			default:
		}
		enemiesOnBoard.push(tempObj2);
		tempObj2.enemyMovement(tempObj2);
		
	}
};

function miniBlob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 150;
	this.health = 150;
	console.log(this.health);
	this.damage = 5;
	this.speed = 60;
	this.killReward = 5;
}
miniBlob.prototype = Object.create(enemy.prototype);
miniBlob.prototype.constructor = miniBlob;

miniBlob.prototype.miniBlob = function(){
};

function clown(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, goldTaken, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, goldTaken, direction);
	this.startHealth = 10;
	this.health = 10;
	this.damage = 5;
	this.speed = 10;
	this.killReward = 0;
	this.goldTaken;
}
clown.prototype = Object.create(enemy.prototype);
clown.prototype.constructor = clown;

clown.prototype.stealGold = function(){
	var percentageGold	= Math.random() * 100;
	
	if (percentageGold >= 0 && percentageGold < 33) { //Three quarters gold stolen.
		this.goldTaken = (25 / 100) * Gold;
		Gold -= Math.round(this.goldTaken);
	}	
	else if (percentageGold >= 33 && percentageGold < 66) { //Half your gold stolen.
		this.goldTaken = (50 / 100) * Gold;
		Gold -= Math.round(this.goldTaken);
	}
	else if (percentageGold >= 66 && percentageGold < 100) { // Quarter of gold stolen.
		this.goldTaken = (75 / 100) * Gold;
		Gold -= Math.round(this.goldTaken);
	} 
	gameMessage = "A clown has stolen " + Math.round(this.goldTaken) + " gold from you! Kill it to get it back!";
};

function bigBlob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 1000;
	this.health = 1000;
	this.damage = 100;
	this.speed = 150;
	this.killReward = 0;
}
bigBlob.prototype = Object.create(enemy.prototype);
bigBlob.prototype.constructor = bigBlob;

bigBlob.prototype.bigBlobSplit = function(){
	if (this.health <= 0) {
		var tempObj = new blob;//make first miniblob object
		tempObj.pathPos = this.pathPos;//make its path position the same as when the blob dies
		tempObj.xCoord = this.xCoord;//make its x coordinate the same as when the blob dies
		tempObj.yCoord = this.yCoord;//make its y coordinate the same as when the blob dies
		enemiesOnBoard.push(tempObj);//add the set up object to the array of enemies on board
		tempObj.enemyMovement(tempObj);//initialize the object's movement
		
		//for blob that spawns ahead
		var tempObj1 = new blob;
		tempObj1.pathPos = this.pathPos+2;
		switch(this.direction){
			case "north":
				tempObj1.xCoord = this.xCoord;
				tempObj1.yCoord = this.yCoord-30;
				break;
			case "east":
				tempObj1.xCoord = this.xCoord+30;
				tempObj1.yCoord = this.yCoord;
				break;
			case "south":
				tempObj1.xCoord = this.xCoord;
				tempObj1.yCoord = this.yCoord+30;
				break;
			case "west":
				tempObj1.xCoord = this.xCoord-30;
				tempObj1.yCoord = this.yCoord;
				break;
			default:
		}
		enemiesOnBoard.push(tempObj1);
		tempObj1.enemyMovement(tempObj1);
		
		//for blob that spawn behind
		var tempObj2 = new blob;
		tempObj2.pathPos = this.pathPos-2;
		switch(this.direction){
			case "north":
				tempObj2.xCoord = this.xCoord;
				tempObj2.yCoord = this.yCoord+30;
				break;
			case "east":
				tempObj2.xCoord = this.xCoord-30;
				tempObj2.yCoord = this.yCoord;
				break;
			case "south":
				tempObj2.xCoord = this.xCoord;
				tempObj2.yCoord = this.yCoord-30;
				break;
			case "west":
				tempObj2.xCoord = this.xCoord+30;
				tempObj2.yCoord = this.yCoord;
				break;
			default:
		}
		enemiesOnBoard.push(tempObj2);
		tempObj2.enemyMovement(tempObj2);
		
	}
};

function bat(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 300;
	this.health = 300;
	this.damage = 15;
	this.speed = 20;
	this.killReward = 10;
	this.isVisible = false;
}
bat.prototype = Object.create(enemy.prototype);
bat.prototype.constructor = bat;

bat.prototype.checkBatVisibility = function(){
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
		if (this.isVisible == false){
			clearInterval(this.enemyNextMove);
			this.speed = this.speed * 4;
			this.enemyMovement(this);
		}
		this.isVisible = true;
	}
	else if (!seenByLamp){
		if (this.isVisible == true){
			clearInterval(this.enemyNextMove);
			this.speed = this.speed / 4;
			this.enemyMovement(this);
		}
		this.isVisible = false;
	}
};

function grizzlyBear(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 1000;
	this.health = 1000;
	this.damage = 10;
	this.speed = 70;
	this.killReward = 20;
}
grizzlyBear.prototype = Object.create(enemy.prototype);
grizzlyBear.prototype.constructor = grizzlyBear;

grizzlyBear.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function witch(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, towerStolen, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 300;
	this.health = 300;
	this.damage = 1;
	this.speed = 80;
	this.killReward = 0;
	this.towerStolen = 0;
}
witch.prototype = Object.create(enemy.prototype);
witch.prototype.constructor = witch;

witch.prototype.stealTower = function(){
	var rand = Math.random() * 120;
	if (rand > 0 && rand <= 10) {
		this.towerStolen = 1;
	}
	if (rand > 10 && rand <= 20) {
		this.towerStolen = 2;
	}
	if (rand > 20 && rand <= 30) {
		this.towerStolen = 3;
	}
	if (rand > 30 && rand <= 40) {
		this.towerStolen = 4;
	}
	if (rand > 40 && rand <= 50) {
		this.towerStolen = 5;
	}
	if (rand > 50 && rand <= 60) {
		this.towerStolen = 6;
	}
	if (rand > 60 && rand <= 70) {
		this.towerStolen = 7;
	}
	if (rand > 70 && rand <= 80) {
		this.towerStolen = 8;
	}
	if (rand > 80 && rand <= 90) {
		this.towerStolen = 9;
	}
	if (rand > 90 && rand <= 100) {
		this.towerStolen = 10;
	}
	if (rand > 100 && rand <= 110) {
		this.towerStolen = 11;
	}
	if (rand > 110 && rand <= 120) {
		this.towerStolen = 12;
	}
	gameMessage = "A witch has stolen a tower from the store!";
};

function blueDemon(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 500;
	this.health = 500;
	this.damage = 0; 
	this.speed = 20;
	this.killReward = 40;
}
blueDemon.prototype = Object.create(enemy.prototype);
blueDemon.prototype.constructor = blueDemon;

blueDemon.prototype.blueDemonExit = function(){
	Hp = 1; 
};

function redDemon(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 10000;
	this.health = 10000;
	this.damage = 0;
	this.speed = 1000;
	this.killReward = 0;
}
redDemon.prototype = Object.create(enemy.prototype);
redDemon.prototype.constructor = redDemon;

redDemon.prototype.redDemonExit = function(){
	Hp = 1; 
};

function zombieMom(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 1000;
	this.health = 1000;
	this.damage = 10;
	this.speed = 80;
	this.killReward = 20;
}
zombieMom.prototype = Object.create(enemy.prototype);
zombieMom.prototype.constructor = zombieMom;

zombieMom.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function zombieDad(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 1000;
	this.health = 1000;
	this.damage = 10;
	this.speed = 80;
	this.killReward = 20;
}
zombieDad.prototype = Object.create(enemy.prototype);
zombieDad.prototype.constructor = zombieDad;

zombieDad.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function grimReaper(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, phaseOne, direction, isVisible, hasPhaseOned, phaseOneComplete, hasPhaseTwoed, hasPhaseThreed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction);
	this.startHealth = 1000;
	this.health = 1000;
	this.damage = 100;
	this.speed = 100;
	this.killReward = 0;
	this.phaseOne = this.startHealth * 0.75; //initiates boss phase one
	this.phaseTwo = this.startHealth * 0.5; //initates boss phase two
	this.phaseThree =  this.startHealth * 0.25; //initiates boss phase three 
	this.hasPhaseOned = false;
	this.phaseOneComplete = false;
	this.hasPhaseTwoed = false;
	this.hasPhaseThreed = false;
	this.isVisible = true;
}
grimReaper.prototype = Object.create(enemy.prototype);
grimReaper.prototype.constructor = grimReaper;

grimReaper.prototype.spawnMomDad = function(){
	if (this.health < this.phaseOne && this.hasPhaseOned == false) {
		this.hasPhaseOned = true;
		this.isVisible = false; 
		
		//for dad that spawns ahead
		var tempObj1 = new zombieDad;
		tempObj1.pathPos = this.pathPos+2;
		switch(this.direction){
			case "north":
				tempObj1.xCoord = this.xCoord;
				tempObj1.yCoord = this.yCoord-30;
				break;
			case "east":
				tempObj1.xCoord = this.xCoord+30;
				tempObj1.yCoord = this.yCoord;
				break;
			case "south":
				tempObj1.xCoord = this.xCoord;
				tempObj1.yCoord = this.yCoord+30;
				break;
			case "west":
				tempObj1.xCoord = this.xCoord-30;
				tempObj1.yCoord = this.yCoord;
				break;
			default:
		}
		enemiesOnBoard.push(tempObj1);
		tempObj1.enemyMovement(tempObj1);
		
		//for mom that spawn behind
		var tempObj2 = new zombieMom;
		tempObj2.pathPos = this.pathPos-2;
		switch(this.direction){
			case "north":
				tempObj2.xCoord = this.xCoord;
				tempObj2.yCoord = this.yCoord+30;
				break;
			case "east":
				tempObj2.xCoord = this.xCoord-30;
				tempObj2.yCoord = this.yCoord;
				break;
			case "south":
				tempObj2.xCoord = this.xCoord;
				tempObj2.yCoord = this.yCoord-30;
				break;
			case "west":
				tempObj2.xCoord = this.xCoord+30;
				tempObj2.yCoord = this.yCoord;
				break;
			default:
		}
		enemiesOnBoard.push(tempObj2);
		tempObj2.enemyMovement(tempObj2);
		
		clearInterval(this.enemyNextMove);
		this.speed *= 10;
		this.enemyMovement(this);
	}
	if (this.health < this.phaseOne){
		var momDadActive = false;
		for (var i = 0; i < enemiesOnBoard.length; i++){
			if(enemiesOnBoard[i] instanceof zombieDad || enemiesOnBoard[i] instanceof zombieMom){
				momDadActive = true;
			}
		}
		if (!momDadActive){
			this.isVisible = true;
			this.phaseOneComplete = true;
			clearInterval(this.enemyNextMove);
			this.speed /= 10;
			this.enemyMovement(this);
		}
	}
};
	
grimReaper.prototype.removeRandomTowers = function(){ //MAYBE LOL!
	console.log("Undefined Child Method.");
};
	
grimReaper.prototype.becomeTowerOffense = function(){ //MAYBE LOL!
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
	
	if (tempEnemyObj instanceof clown) {
		enemiesOnBoard[enemiesOnBoard.length-1].stealGold();
	}
	if (tempEnemyObj instanceof witch) {
		enemiesOnBoard[enemiesOnBoard.length-1].stealTower();
	}
	enemiesOnBoard[enemiesOnBoard.length-1].enemyMovement(tempEnemyObj);
}
//End of enemy related section-------------------------------------------------------------------------------------------------------------


//Tower related section -------------------------------------------------------------------------------------------------------------------
var towersOnBoard = [];
var towerLocationsByPixelPosition = [];
var numOfTowers = 0;
var towerxy = {x:0, y:0};
var objObstruct = false;

//Tower blueprints section--------------------------------------------------------
var tower = function(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, info){
	this.cost = cost;
	this.damage = damage;
	this.range = range;
	this.attackSpeed = attackSpeed;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.upgraded = false;
	this.targetIndice = -1;
	this.isShooting = 0;
	this.bulletArr = [];
	this.info = info;
	this.attackEnemy;
};

tower.prototype.bullet = function() {
	this.bulletArr.push( {
		trajectory: 0,
		distance: 0
	});
};

tower.prototype.attack = function(towerObj, towerName){
	
	this.attackEnemy = setInterval (function(){
		var max = 0;
		towerObj.isShooting = 0;
		
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName == "calculator"){
			towerObj.goldBuff(); 
		}
		if (towersOnBoard.length > 0 && towerName == "lamp"){
			towerObj.lampIO();
		}
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName == "marbleShooter") {
			towerObj.marbleBuffShot();	
		}
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName == "nutsAndBolts") {
			towerObj.critChance(); 
		}
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName != "lamp" && towerName != "calculator" && towerName != "trophy" && towerName != "mouseTrap"){
			
			for (var a = 0; a < enemiesOnBoard.length; a++){
				var i = a;
				if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0){
					if (enemiesOnBoard[i] instanceof ghost && enemiesOnBoard[i].isVisible == false){
						continue;
					}
					if (enemiesOnBoard[i] instanceof grimReaper && enemiesOnBoard[i].isVisible == false){
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
						if(!(towersOnBoard[j] instanceof actionFigure || towersOnBoard[j] instanceof mouseTrap || towersOnBoard[j] instanceof blenderDefender || towersOnBoard[j] instanceof trophy || towersOnBoard[j] instanceof calculator)) {
							towerObj.isShooting = 1;
						}
						towerObj.targetIndice = j;
						
						enemiesOnBoard[j].health -= towerObj.damage;
						if (towerObj instanceof marbleShooter) {
							this.shotCounter++;
						}
						
						if (enemiesOnBoard[j].health <= 0){
							clearInterval(enemiesOnBoard[j].enemyNextMove);
							Gold += enemiesOnBoard[j].killReward;
							if (enemiesOnBoard[j] instanceof clown){
								Math.round(enemiesOnBoard[j].goldTaken);
								Gold += enemiesOnBoard[j].goldTaken;
								gameMessage = "You have killed a clown and stolen back " + Math.round(enemiesOnBoard[j].goldTaken) +" gold!";
							}
							if (enemiesOnBoard[j] instanceof blob) {
								enemiesOnBoard[j].blobSplit();
							}
							if (enemiesOnBoard[j] instanceof bigBlob) {
								enemiesOnBoard[j].bigBlobSplit();
							}
							
							enemiesOnBoard.splice(j,1);
						}
						break;
					}
				}
			}
		}
		if (towersOnBoard.length > 0 && towerName == "nutsAndBolts") {
			towerObj.damage = towerObj.baseDamage;
		} 
	}, this.attackSpeed);
};


function toyCarLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr);
	this.cost = 50;
	this.damage = 10;
	this.range = 160;
	this.attackSpeed = 900;
	this.info = "This shoots the dinkie cars at the scary monsters. Not sure what that will do, but use it anyways!";
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
	this.info = "Spots ghosts and changes those pesky bats. You may want to wipe off the dust...";
}
lamp.prototype = Object.create(tower.prototype);
lamp.prototype.constructor = lamp;

lamp.prototype.lampIO = function(){

	var seenEnemy = false;
	
	for (var a = 0; a < enemiesOnBoard.length; a++){
		var i = a;
		if(towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && (enemiesOnBoard[i] instanceof ghost || enemiesOnBoard[i] instanceof bat)){
			var distanceLamp = distance (this.xCoord, enemiesOnBoard[i].xCoord, this.yCoord, enemiesOnBoard[i].yCoord);
			
			if (distanceLamp <= this.range){
				seenEnemy = true;
			}
		}
	}
	if (towersOnBoard.length > 0 && seenEnemy){
		this.on = true;
		seenEnemy = false;
	}
	else if (towersOnBoard.length > 0 && !seenEnemy){
		this.on = false;
		seenEnemy = false;
	}
	else if (towersOnBoard.length > 0 && enemiesOnBoard.length == 0){
		this.on = false;
		seenEnemy = false;
	}
};

function actionFigure(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice);
	this.cost = 150;
	this.damage = 250;
	this.range = 90;
	this.attackSpeed = 4000;
	this.info = "You think this is Superman? It's actually the action figure Dad steps on every night, and it really hurts!";
}
actionFigure.prototype = Object.create(tower.prototype);
actionFigure.prototype.constructor = actionFigure;

actionFigure.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Action Figure Method.")
};

function marbleShooter(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, shotCounter, isShooting, bulletArr){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, shotCounter, isShooting, bulletArr);
	this.cost = 75;
	this.damage = 10;
	this.range = 250;
	this.attackSpeed = 700;
	this.shotCounter = 0;
	this.info = "Shoots marbles at the speed of sound! Every fifth marble may pack a punch!";
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

function calculator(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 1;
	this.damage = 0;
	this.range = 1;
	this.attackSpeed = 5000;
	this.info = "Allows for more spending which means more video games, tamagothchis, and pokemon cards.";
}
calculator.prototype = Object.create(tower.prototype);
calculator.prototype.constructor = calculator;

calculator.prototype.goldBuff = function(){
	Gold += 5;
};

function nutsAndBolts(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, baseDamage){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr);
	this.cost = 90;
	this.damage = 15;
	this.range = 135;
	this.attackSpeed = 800;
	this.baseDamage = 15;
	this.info = "Nuts do basic damage and if this tower shoots a bolt, expect lots of damage.";
}
nutsAndBolts.prototype = Object.create(tower.prototype);
nutsAndBolts.prototype.constructor = nutsAndBolts;

nutsAndBolts.prototype.critChance = function() {
	crit = Math.random() * 100;
		if (crit <= 20) {
			this.damage = this.damage * 4;
		}
};

function mouseTrap(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 80;
	this.damage = 75;
	this.range = 135;
	this.attackSpeed = 2000;
}
mouseTrap.prototype = Object.create(tower.prototype);
mouseTrap.prototype.constructor = mouseTrap;

mouseTrap.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined mouseTrap Method.")
};

function blenderDefender(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting);
	this.cost = 50;
	this.damage = 0.5;
	this.range = 80;
	this.attackSpeed = 50;
	this.info = "May blend enemies into a delicious smoothie.";
}
blenderDefender.prototype = Object.create(tower.prototype);
blenderDefender.prototype.constructor = blenderDefender;

blenderDefender.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined blenderDefender Method.")
};

function waterGun(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr);
	this.cost = 50;
	this.damage = 2;
	this.range = 150;
	this.attackSpeed = 200;
	this.info = "Enough force to slow enemies as they approach.";
}
waterGun.prototype = Object.create(tower.prototype);
waterGun.prototype.constructor = waterGun;

waterGun.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined waterGun Method.")
};

function airplaneLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr);
	this.cost = 50;
	this.damage = 200;
	this.range = 500;
	this.attackSpeed = 2000;
	this.info = "Shoots paper airplanes the kid made. How did they find the time to make all of these?";
}
airplaneLauncher.prototype = Object.create(tower.prototype);
airplaneLauncher.prototype.constructor = airplaneLauncher;

airplaneLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined airplaneLauncher Method.")
};

function trophy(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 300;
	this.damage = 0;
	this.range = 200;
	this.attackSpeed = 1000;
	this.info = "Remember when the child won the spelling bee? I certainly don't. This buffs other towers.";
}
trophy.prototype = Object.create(tower.prototype);
trophy.prototype.constructor = trophy;

trophy.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined trophy Method.")
};

function vanquishEvil(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr);
	this.cost = 0;
	this.damage = 500;
	this.range = 500000;
	this.attackSpeed = 6000; 
	this.info = "Caution! Three per customer as per the nightmare safety regulations.";
}
vanquishEvil.prototype = Object.create(tower.prototype);
vanquishEvil.prototype.constructor = vanquishEvil;

vanquishEvil.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined vanquishEvil Method.")
};
//End tower blueprints section----------------------------------------------------


function createTowerObject(towerType, x, y){
	var tempTowerObject = new (eval(towerType))(null, null, null, null, x, y, null);
	towersOnBoard.push(tempTowerObject);
	
	Gold -= tempTowerObject.cost;
	
	if (showGrid == false){
		togGrid();
	}
	if (circleCheck == true){
		circleCheck = false;
	}
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

var tempRange;

function placeTower(towerType){
	document.body.style.cursor = "url('../images/" + towerType + ".png'),auto";
	document.getElementById('canvas').addEventListener ("click", handler); 
	if (circleCheck == false){
		circleCheck = true;
	}
	if (showGrid == true){
		togGrid();
	}
	var towerPlaceholder = new (eval(towerType))();
	tempRange = towerPlaceholder.range;
	
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
				if (showGrid == false){
					togGrid();
				}
				if ( circleCheck == true ) {
					circleCheck = false;
				}	
			}
		}
		if (numOfTowers > 0){
			for (var i = 0; i < towerLocationsByPixelPosition.length-1; i++){
				if ( (towerLocationsByPixelPosition[i].x - towerLocationsByPixelPosition[numOfTowers].x > -45) && (towerLocationsByPixelPosition[i].x - towerLocationsByPixelPosition[numOfTowers].x < 45) && (towerLocationsByPixelPosition[i].y - towerLocationsByPixelPosition[numOfTowers].y > -45) && (towerLocationsByPixelPosition[i].y - towerLocationsByPixelPosition[numOfTowers].y < 45) ){
					objObstruct = true;
					gameMessage = "Failed to place. Too close to another tower.";
					togGrid();
					circleCheck = false;
				}
			}
		}
		var vanquishEvilCount = 0;
		for (var i = 0; i < towersOnBoard.length; i++) {
			if (towersOnBoard[i] instanceof vanquishEvil) {
				vanquishEvilCount++;
			}
		}
		if (vanquishEvilCount >= 3) {
			objObstruct = true;
			gameMessage = "You can have only 3 Vanquish The Evil Towers!";
			togGrid();
			circleCheck = false;
			if (towerType instanceof vanquishEvil) {
				objObstruct = true;
				gameMessage = "You can have only 3 Vanquish The Evil Towers!";
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
				togGrid();
				circleCheck = false;
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
	
	return c;
}

function clearTowerStats () {
	outputTowerStats.innerHTML = "";
}

HTMLID_toyCarLauncher.addEventListener( "mouseout", clearTowerStats ); 
HTMLID_actionFigure.addEventListener( "mouseout", clearTowerStats );
HTMLID_marbleShooter.addEventListener( "mouseout", clearTowerStats );
HTMLID_lamp.addEventListener( "mouseout", clearTowerStats );
HTMLID_calculator.addEventListener( "mouseout", clearTowerStats );
HTMLID_nutsAndBolts.addEventListener( "mouseout", clearTowerStats );
HTMLID_blenderDefender.addEventListener( "mouseout", clearTowerStats );
HTMLID_mouseTrap.addEventListener( "mouseout", clearTowerStats );
HTMLID_waterGun.addEventListener( "mouseout", clearTowerStats );
HTMLID_airplaneLauncher.addEventListener( "mouseout", clearTowerStats );
HTMLID_trophy.addEventListener( "mouseout", clearTowerStats );
HTMLID_vanquishEvil.addEventListener( "mouseout", clearTowerStats );

HTMLID_toyCarLauncher.addEventListener( "mouseover", function() { getStats('toyCarLauncher'); });
HTMLID_actionFigure.addEventListener( "mouseover", function() { getStats('actionFigure'); });
HTMLID_marbleShooter.addEventListener( "mouseover", function() { getStats('marbleShooter'); });
HTMLID_lamp.addEventListener( "mouseover", function() { getStats('lamp'); });
HTMLID_calculator.addEventListener( "mouseover", function() { getStats('calculator'); });
HTMLID_nutsAndBolts.addEventListener( "mouseover", function() { getStats('nutsAndBolts'); });
HTMLID_blenderDefender.addEventListener( "mouseover", function() { getStats('blenderDefender'); });
HTMLID_mouseTrap.addEventListener( "mouseover", function() { getStats('mouseTrap'); });
HTMLID_waterGun.addEventListener( "mouseover", function() { getStats('waterGun'); });
HTMLID_airplaneLauncher.addEventListener( "mouseover", function() { getStats('airplaneLauncher'); });
HTMLID_trophy.addEventListener( "mouseover", function() { getStats('trophy'); });
HTMLID_vanquishEvil.addEventListener( "mouseover", function() { getStats('vanquishEvil'); });

HTMLID_toyCarLauncher.addEventListener( "click", function() { placeTower('toyCarLauncher'); });
HTMLID_actionFigure.addEventListener( "click", function() { placeTower('actionFigure'); });
HTMLID_marbleShooter.addEventListener( "click", function() { placeTower('marbleShooter'); });
HTMLID_lamp.addEventListener( "click", function() { placeTower('lamp'); });
HTMLID_calculator.addEventListener( "click", function() { placeTower('calculator'); });
HTMLID_nutsAndBolts.addEventListener( "click", function() { placeTower('nutsAndBolts'); });
HTMLID_blenderDefender.addEventListener( "click", function() { placeTower('blenderDefender'); });
HTMLID_mouseTrap.addEventListener( "click", function() { placeTower('mouseTrap'); });
HTMLID_waterGun.addEventListener( "click", function() { placeTower('waterGun'); });
HTMLID_airplaneLauncher.addEventListener( "click", function() { placeTower('airplaneLauncher'); });
HTMLID_trophy.addEventListener( "click", function() { placeTower('trophy'); });
HTMLID_vanquishEvil.addEventListener( "click", function() { placeTower('vanquishEvil'); });

canvas.addEventListener( "mousemove", function(e) { cursorX = e.clientX; cursorY = e.clientY; });

function getStats(turret) {
	
	var towerPlaceholder = new (eval(turret))();

	/*outputCost.innerHTML = "Cost: " + towerPlaceholder.cost;
	outputDamage.innerHTML = "Damage: " + towerPlaceholder.damage;
	outputRange.innerHTML = "Range: " + towerPlaceholder.range;
	outputAspd.innerHTML = "Attack Speed: " + towerPlaceholder.attackSpeed + " (Reload Time)";*/

	switch (towerPlaceholder.constructor.name) {
		case "toyCarLauncher":
			outputTowerStats.innerHTML = "Toy Car Launcher"; break;
		case "actionFigure":
			outputTowerStats.innerHTML = "Action Figure"; break;
		case "marbleShooter":
			outputTowerStats.innerHTML = "Marble Shooter"; break;
		case "lamp":
			outputTowerStats.innerHTML = "Lava Lamp"; break;
		case "calculator":
			outputTowerStats.innerHTML = "Calculator"; break;
		case "nutsAndBolts":
			outputTowerStats.innerHTML = "Nuts and Bolts Shooter"; break;
		case "blenderDefender":
			outputTowerStats.innerHTML = "Blender Defender"; break;
		case "mouseTrap":
			outputTowerStats.innerHTML = "Mouse Trap"; break;
		case "waterGun":
			outputTowerStats.innerHTML = "Water Gun"; break;
		case "airPlaneLauncher":
			outputTowerStats.innerHTML = "Air Plane Launcher"; break;
		case "trophy":
			outputTowerStats.innerHTML = "Trophy"; break;
		case "vanquishEvil":
			outputTowerStats.innerHTML = "Vanquish Evil"; break;
	
	}
	outputTowerStats.innerHTML += "<br>Cost: " + towerPlaceholder.cost;
	outputTowerStats.innerHTML += "<br>Damage: " + towerPlaceholder.damage;
	outputTowerStats.innerHTML += "<br>Range: " + towerPlaceholder.range;
	outputTowerStats.innerHTML += "<br>Attack Speed: " + towerPlaceholder.attackSpeed + " (Reload Time)";
	outputTowerStats.innerHTML += "<br>" + towerPlaceholder.info; 
	//console.log(outputTowerStats);
}

var cursorX;
var cursorY;
var circleCheck = false;


function hoverCheck(){
	if (towersOnBoard.length > 0)
	{
		for (var i = 0; i <= (towersOnBoard.length-1); i++){
			if (((cursorX >= towersOnBoard[i].xCoord) && (cursorX <= (towersOnBoard[i].xCoord+45))) && ((cursorY >= towersOnBoard[i].yCoord) && (cursorY <= (towersOnBoard[i].yCoord+45)))){
				ctx.beginPath();
				ctx.arc(towersOnBoard[i].xCoord+22.5, towersOnBoard[i].yCoord+22.5, towersOnBoard[i].range, 0, 2 * Math.PI);
				ctx.stroke();
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
	towerAvailable();
	render();
}

//Update Game
function update(){

	outputPlayerStats.innerHTML = "<b>Health: </b>" + Hp;
	outputPlayerStats.innerHTML += "<br><b>Gold: </b>" + Gold;
	outputPlayerStats.innerHTML += "<br><b>Level: </b>" + (currentStage + 1);
	outputPlayerStats.innerHTML += "<br><b>Wave: </b>" + (waveCounter + 1);

	outputGameMessage.innerHTML = gameMessage;
	outputStageName.innerHTML = stages[currentStage];

	if(Hp <= 0){
		gameMessage = "Game Over. You got rekt by your nightmares and peed your pants.";
		gameOver();
	}
	
	if (enemiesOnBoard.length > 0 && !pause){
		awardGoldOverTime = true;
	}
	else if (enemiesOnBoard.length == 0){
		awardGoldOverTime = false;
	}
	
}


function render(){
	requestID = requestAnimationFrame(render);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	renderLampCheck();
	renderEnemyMovement();	
	renderTowerAndBullet();
	drawRange();
	hoverCheck();
	stageWin();
}

// functions for render to call --------------------------------------------------------------------------------------------

function renderLampCheck() {
	for (var i = 0; i < towersOnBoard.length; i++) {
		//if tower is lamp, check if ghost is near, change img to "lampOn" if so
		if (towersOnBoard[i] instanceof lamp) {
			if (towersOnBoard[i].on == true) {
				lampOnOff.src = '../images/lampOn.png';
			} else if (towersOnBoard[i].on == false) {
				lampOnOff.src = '../images/lamp.png';
			}
			ctx.drawImage(lampOnOff, towersOnBoard[i].xCoord, towersOnBoard[i].yCoord, 45, 45);
		}
	}
}

function renderEnemyMovement() {
	
	//color health bar
	ctx.fillStyle = "rgba(0,204,0, 0.9)";

	for (var i = 0; i < enemiesOnBoard.length; i++) {
		//draw enemies
		
		if (enemiesOnBoard[i] instanceof bigBoss || enemiesOnBoard[i] instanceof bigBlob || enemiesOnBoard[i] instanceof redDemon || enemiesOnBoard[i] instanceof blueDemon || enemiesOnBoard[i] instanceof grizzlyBear) {
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-30, 55, 60);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-35, (55 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else if (enemiesOnBoard[i] instanceof grimReaper) {
			enemyImgToPrint.src = '../images/grimReaper.png';
			if (enemiesOnBoard[i].isVisible == false) {
				ctx.save();
				ctx.globalAlpha = '0.3';
				ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-30, 55, 60);
				ctx.restore();
				ctx.fillRect(enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-35, (55 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
			}
			else{
				ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-30, 55, 60);
				//draw health bar
				ctx.fillRect(enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-35, (55 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
			}
		}
		else if (enemiesOnBoard[i] instanceof miniBlob){
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-9, enemiesOnBoard[i].yCoord-9, 18, 18);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-9, enemiesOnBoard[i].yCoord-14, (18 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else if (enemiesOnBoard[i] instanceof bat) {
			if (enemiesOnBoard[i].isVisible == true){
				enemyImgToPrint.src = '../images/vampire.png';
			}
			else{
				enemyImgToPrint.src = '../images/bat.png';
			}
		
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else{
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
	}
}

function renderTowerAndBullet() {
	//iterate through towers
	for (var i = 0; i < towersOnBoard.length; i++){
		if ( ang != 720 ) {
			oldAng = ang;
		}
		if (!(towersOnBoard[i] instanceof lamp)) {
			towerImg.src = '../images/' + towersOnBoard[i].constructor.name + '.png';
			//when there are no enemies on board, undefined parameters will be passed in to rotateTower. this if is to check and prevent it from passing through
			if (!(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === undefined) && !(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === -1)) {
				ang = rotateTower(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].xCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].yCoord);
			} else {
				ang = 720;
			}	

			if(towersOnBoard[i] instanceof actionFigure || towersOnBoard[i] instanceof mouseTrap || towersOnBoard[i] instanceof blenderDefender || towersOnBoard[i] instanceof trophy || towersOnBoard[i] instanceof calculator){
				ang = 720;
			}
			//if tower is shooting then push new bullet to towersOnBoard.bulletArr[]
			if (towersOnBoard[i].isShooting === 1) {
				towersOnBoard[i].isShooting++;
				towersOnBoard[i].bullet();
			}
			
			//iterate through bullets
			for (var b = 0; b < towersOnBoard[i].bulletArr.length; b++) {
				//same check as above approx 20 lines up, but also checks if it's an action figure
				if (!(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === undefined) && !(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === -1) && !(towersOnBoard[i] instanceof actionFigure)) {
					towersOnBoard[i].bulletArr[b].distance = distance(towersOnBoard[i].xCoord + towerImg.width/2, enemiesOnBoard[(towersOnBoard[i].targetIndice)].xCoord, towersOnBoard[i].yCoord + towerImg.height/2, enemiesOnBoard[(towersOnBoard[i].targetIndice)].yCoord);
				}
				//save canvas state
				ctx.save();
				//origin to centre of tower
				ctx.translate(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord);
				ctx.translate(towerImg.width/2, towerImg.height/2);
				//angle bullet to target
				if ( ang != 720 ) {
					ctx.rotate(Math.PI / 180 * ang);
					//draw bullet with respect to trajectory parameter
					ctx.fillRect(0, -(towersOnBoard[i].bulletArr[b].trajectory), 5, 5);
				}
				//restore canvas state
				ctx.restore();
				//increment trajectory
				towersOnBoard[i].bulletArr[b].trajectory = towersOnBoard[i].bulletArr[b].trajectory + TRAJ_SPEED;
				//if bullet goes off map, delete bullet
				if (towersOnBoard[i].bulletArr[b].trajectory > 1000) { towersOnBoard[i].bulletArr.splice(b,1); }
				if (!(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === undefined && (!(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === -1)))) {
					if (towersOnBoard[i].bulletArr[b].trajectory > towersOnBoard[i].bulletArr[b].distance) {
						//if target hit, delete bullet
						towersOnBoard[i].bulletArr.splice(b,1);
					}
				}
			}
			ctx.save();
			ctx.translate(towersOnBoard[i].xCoord,towersOnBoard[i].yCoord);
			ctx.translate(towerImg.width/2,towerImg.height/2);
			if ( ang != 720 ) {
				ctx.rotate(Math.PI / 180 * ang);
			} else if ( ang == 720 ) {
				ctx.rotate( Math.PI / 180 * oldAng );
			}
			ctx.drawImage(towerImg, -towerImg.width/2, -towerImg.height/2);
			ctx.restore();
		}
	}
}

function drawRange(){
	if (circleCheck === true) {
		ctx.beginPath();
		ctx.arc(cursorX+22.5, cursorY+22.5, tempRange, 0, 2 * Math.PI);
		ctx.stroke();
	}
}
// end of render section -------------------------------------------------------------------------------

var bossSpawned = false; //Checks to see if boss has spawned 

//Checks if player has beat the current stage
function stageWin() {
	var bActive = false; //If boss is on map, turns to true
	for(var i = 0; i < enemiesOnBoard.length; i++) {
		if (enemiesOnBoard[i] instanceof bigBoss || enemiesOnBoard[i] instanceof bigBlob || enemiesOnBoard[i] instanceof grimReaper) {
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
	
	if (bActive == false && bossSpawned == true && Hp > 0 && enemiesOnBoard.length == 0 && currentStage == 3) {
		gameMessage = "STAGE COMPLETE!";
		cancelAnimationFrame(requestID);
		requestID = undefined;
		ctx.drawImage(stageTransition, 0, 0);
		setTimeout(function(){ 
			gameWin();
		}, 4000);
	}
	else if (bActive == false && bossSpawned == true && Hp > 0 && enemiesOnBoard.length == 0) {
		gameMessage = "STAGE COMPLETE!";
		cancelAnimationFrame(requestID);
		requestID = undefined;
		ctx.drawImage(stageTransition, 0, 0);
		setTimeout(function(){ 
			bossSpawned = false;
			bActive = false;
			nextStage();
			render();
		}, 4000);
	}
}


var stageWave = [[],[],[],[]];
//Stage 1

stageWave[0][0] = ["blueSkeleton", "basicSkeleton", "clown", "redSkeleton", "bat", "blueSkeleton", "bigBoss"];
stageWave[0][1] = ["blueSkeleton", "basicSkeleton", "blueSkeleton"];
stageWave[0][2] = ["blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[0][3] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[0][4] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton"];
stageWave[0][5] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[0][6] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[0][7] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[0][8] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[0][9] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "bigBoss"];
//Stage 2
stageWave[1][0] = ["blueSkeleton", "basicSkeleton", "clown", "redSkeleton", "bat", "blueSkeleton", "bigBlob"];
stageWave[1][1] = ["blueSkeleton", "basicSkeleton"];
stageWave[1][2] = ["blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[1][3] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[1][4] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton"];
stageWave[1][5] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[1][6] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[1][7] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[1][8] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[1][9] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "bigBlob"];
//Stage 3
stageWave[2][0] = ["blueSkeleton", "grizzlyBear", "grizzlyBear"];
stageWave[2][1] = ["blueSkeleton", "basicSkeleton"];
stageWave[2][2] = ["blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[2][3] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[2][4] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton"];
stageWave[2][5] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[2][6] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[2][7] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[2][8] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[2][9] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "bigBoss"];
//Stage 4
stageWave[3][0] = ["grimReaper", "blueDemon"];
stageWave[3][1] = ["blueSkeleton", "basicSkeleton"];
stageWave[3][2] = ["blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[3][3] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[3][4] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton"];
stageWave[3][5] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[3][6] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[3][7] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[3][8] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[3][9] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "bigBoss"];

var inAWave = false;
var waveCounter = 0;
function nextWave (){
	if (!inAWave && enemiesOnBoard.length == 0){
		inAWave = true;
		var temp = 0;
		var i = 0;
		var wave = setInterval(function(){
			spawnEnemy(stageWave[currentStage][currentWave][i]);
			i++;
			if (temp < currentWave) {
				waveCounter++;
			}
			temp = currentWave;
			if (!(i < stageWave[currentStage][currentWave].length)){
				inAWave = false;
				if(currentWave < 9){
					currentWave++;
				}
				else{
					currentWave = 0;
				}
				clearInterval(wave); 
			}
		}, 2000);
	}
}


function pauseGame(){
	if(!pause){
		for (var i = 0; i < towersOnBoard.length; i++){
			clearInterval(towersOnBoard[i].attackEnemy);
		}
		for (var i = 0; i < enemiesOnBoard.length; i++){
			clearInterval(enemiesOnBoard[i].enemyNextMove);
		}
		awardGoldOverTime = false;
		cancelAnimationFrame(requestID);
		requestID = undefined;
		pause = true;
	}
	else{
		for (var i = 0; i < towersOnBoard.length; i++){
			towersOnBoard[i].attack(towersOnBoard[i], towersOnBoard[i].constructor.name);
		}
		for (var i = 0; i < enemiesOnBoard.length; i++){
			enemiesOnBoard[i].enemyMovement(enemiesOnBoard[i], enemiesOnBoard[i].constructor.name);
		}
		awardGoldOverTime = true;
		pause = false;
		render();

	}
}

function towerAvailable () {
	//disable towers according to stage
	if (currentStage == 0) {
		HTMLID_toyCarLauncher.className = "enabledTower";
		HTMLID_actionFigure.className = "enabledTower";
		HTMLID_marbleShooter.className = "enabledTower";
		HTMLID_lamp.className = "disabledTower";
		HTMLID_calculator.className = "disabledTower";
		HTMLID_nutsAndBolts.className = "disabledTower";
		HTMLID_blenderDefender.className = "disabledTower";
		HTMLID_mouseTrap.className = "disabledTower";
		HTMLID_waterGun.className = "disabledTower";
		HTMLID_airplaneLauncher.className = "disabledTower";
		HTMLID_trophy.className = "disabledTower";
		HTMLID_vanquishEvil.className = "disabledTower";
		
		enableTowers();

	} if (currentStage == 1) {
		HTMLID_lamp.className = "enabledTower";
		HTMLID_calculator.className = "enabledTower";
		HTMLID_nutsAndBolts.className = "enabledTower";
		
		enableTowers();

	} if (currentStage == 2) {
		HTMLID_blenderDefender.className = "enabledTower";
		HTMLID_mouseTrap.className = "enabledTower";
		HTMLID_waterGun.className = "enabledTower";
		
		enableTowers();

	} if (currentStage == 3) {
		HTMLID_toyCarLauncher.className = "enabledTower";
		HTMLID_actionFigure.className = "enabledTower";
		HTMLID_marbleShooter.className = "enabledTower";
		HTMLID_lamp.className = "enabledTower";
		HTMLID_calculator.className = "enabledTower";
		HTMLID_nutsAndBolts.className = "enabledTower";
		HTMLID_blenderDefender.className = "enabledTower";
		HTMLID_mouseTrap.className = "enabledTower";
		HTMLID_waterGun.className = "enabledTower";
		HTMLID_airplaneLauncher.className = "enabledTower";
		HTMLID_trophy.className = "enabledTower";
		HTMLID_vanquishEvil.className = "enabledTower";
		
		//selects which tower to disable from witch
		if (enemiesOnBoard.length > 0) {
			for (var i = 0; i < enemiesOnBoard.length; i++) {
				if (enemiesOnBoard[i] instanceof witch) {
					switch (enemiesOnBoard[i].towerStolen){
						case 1:
							HTMLID_toyCarLauncher.className = "disabledTower";
							break;
						case 2:
							HTMLID_actionFigure.className = "disabledTower";
							break;
						case 3:
							HTMLID_marbleShooter.className = "disabledTower";
							break;
						case 4:
							HTMLID_lamp.className = "disabledTower";
							break;
						case 5:
							HTMLID_calculator.className = "disabledTower";
							break;
						case 6:
							HTMLID_nutsAndBolts.className = "disabledTower";
							break;
						case 7:
							HTMLID_mouseTrap.className = "disabledTower";
							break;
						case 8:
							HTMLID_blenderDefender.className = "disabledTower";
							break;
						case 9:
							HTMLID_waterGun.className = "disabledTower";
							break;
						case 10:
							HTMLID_airplaneLauncher.className = "disabledTower";
							break;
						case 11:
							HTMLID_trophy.className = "disabledTower";
							break;
						case 12:
							HTMLID_vanquishEvil.className = "disabledTower";
							break;
						default:
						
					}
				} 
			}
		}
		//disabledTowers = document.getElementsByClassName("disabledTower");
		enableTowers();
	}	
}

function enableTowers() {

	for (var i = 0; i < allSelected.length; i++) {
		allSelected[i].style.opacity = '1.0';
		allSelected[i].style.pointerEvents = 'auto';
	}
	for (var i = 0; i < disabledTowers.length; i++) {
		disabledTowers[i].style.opacity = '0.3';
		disabledTowers[i].style.pointerEvents = 'none';
	}
}