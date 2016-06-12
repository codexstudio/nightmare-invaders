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
			
var pathKitchen = [grid[5][60], grid[5][59], grid[5][58], grid[5][57], grid[5][56], grid[5][55], grid[5][54], grid[5][53], 
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
			
var pathParentBedroom = [grid[5][60], grid[5][59], grid[5][58], grid[5][57], grid[5][56], grid[5][55], grid[5][54], grid[5][53], 
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
stagePaths[2] = pathKitchen;
stagePaths[3] = pathParentBedroom;


//UI Elements
var Gold = 100;
var Hp = 100;
var currentWave = 0;
var pause = false;
var gameMessage = "Welcome to Nightmare Invaders!";
var outputHp = document.querySelector("#outputHp");
var outputGold = document.querySelector("#outputGold");
var outputLevel = document.querySelector("#outputLevel");
var outputWave = document.querySelector("#outputWave");
var outputGameMessage = document.querySelector("#gameMessage");
var outputStageName = document.querySelector("#stageName");

//global variables
var ang = 0;
const TRAJ_SPEED = 5;

function menu(){
	window.location="Menu.html";
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
 
enemy.prototype.enemyMovement = function(enemyObj){
	
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
		if (enemyObj instanceof bat){
			enemyObj.checkBatVisibility();
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
	this.startHealth = 500;
	this.health = 500;
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
	this.startHealth = 2000;
	this.health = 2000;
	this.damage = 100;
	this.speed = 80;
	this.killReward = 0;
}
bigBoss.prototype = Object.create(enemy.prototype);
bigBoss.prototype.constructor = bigBoss;

bigBoss.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function blob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 400;
	this.health = 400;
	this.damage = 20;
	this.speed = 100;
	this.killReward = 10;
}
blob.prototype = Object.create(enemy.prototype);
blob.prototype.constructor = blob;

blob.prototype.doubleBlob = function(){
	
	console.log("Get splitted.");
};

function clown(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, goldTaken){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, goldTaken);
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
	var howManyGold	= Math.random() * 100;
	
	if (howManyGold >= 0 && howManyGold < 33) { //Three quarters gold stolen.
		this.goldTaken = (25 / 100) * Gold;
		Gold -= this.goldTaken;
	}	
	else if (howManyGold >= 33 && howManyGold < 66) { //Half your gold stolen.
		this.goldTaken = (50 / 100) * Gold;
		Gold -= this.goldTaken;
	}
	else if (howManyGold >= 66 && howManyGold < 100) { // Quarter of gold stolen.
		this.goldTaken = (75 / 100) * Gold;
		Gold -= this.goldTaken;
	} 
	gameMessage = "A clown has stolen " + this.goldTaken + " gold from you! Kill it to get it back!";
};

function bigBlob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 5000;
	this.health = 5000;
	this.damage = 100;
	this.speed = 50;
	this.killReward = 0;
}
bigBlob.prototype = Object.create(enemy.prototype);
bigBlob.prototype.constructor = bigBlob;

bigBlob.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function bat(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
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

function witch(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, towerStolen){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 300;
	this.health = 300;
	this.damage = 100;
	this.speed = 100;
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

function blueDemon(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 500;
	this.health = 500;
	this.damage = 0;
	this.speed = 20;
	this.killReward = 0;
}
blueDemon.prototype = Object.create(enemy.prototype);
blueDemon.prototype.constructor = blueDemon;

blueDemon.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function grizzlyBear(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 5000;
	this.health = 5000;
	this.damage = 50;
	this.speed = 400;
	this.killReward = 0;
}
grizzlyBear.prototype = Object.create(enemy.prototype);
grizzlyBear.prototype.constructor = grizzlyBear;

grizzlyBear.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function redDemon(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 10000;
	this.health = 10000;
	this.damage = 99;
	this.speed = 1000;
	this.killReward = 0;
}
redDemon.prototype = Object.create(enemy.prototype);
redDemon.prototype.constructor = redDemon;

redDemon.prototype.thisChildMethodNeedsAName = function(){
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
var tower = function(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr){
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
								Gold += enemiesOnBoard[j].goldTaken;
								gameMessage = "You have killed a clown and stolen back " + enemiesOnBoard[j].goldTaken +" gold!";
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
	
	if (show == false){
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
	if (show == true){
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
				if (show == false){
				togGrid();
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

var cursorX;
var cursorY;
var circleCheck = false;

function mouseCoord(e){
	cursorX = e.clientX;
	cursorY = e.clientY;;
}


function drawRange(){
	if (circleCheck === true){
		ctx.beginPath();
		ctx.arc(cursorX+22.5, cursorY+22.5, tempRange, 0, 2 * Math.PI);
		ctx.stroke();
	}
}

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
	outputHp.innerHTML = "<b>Health: </b>" + Hp;
	outputGold.innerHTML = "<b>Gold: </b>" + Gold;
	outputGameMessage.innerHTML = gameMessage;
	render();
}

//Update Game
function update(){
	outputHp.innerHTML = "<b>Health: </b>" + Hp;
	outputGold.innerHTML = "<b>Gold: </b>" + Gold;
	outputGameMessage.innerHTML = gameMessage;
	outputStageName.innerHTML = stages[currentStage];	
	outputLevel.innerHTML = "<b>Level: </b>" + (currentStage+1);
	outputWave.innerHTML = "<b>Wave: </b>" + (waveCounter+1);
	towerAvailable();
	if(Hp <= 0){
		gameMessage = "Game Over. You got rekt by your nightmares and peed your pants.";
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
	for (var i = 0; i < enemiesOnBoard.length; i++) {
		//draw enemies
		if (enemiesOnBoard[i] instanceof bigBoss){
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-30, enemiesOnBoard[i].yCoord-32, 55, 60);
			//draw health bar
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemiesOnBoard[i].xCoord-30, enemiesOnBoard[i].yCoord-37, (55 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else if (enemiesOnBoard[i] instanceof bat){
			if (enemiesOnBoard[i].isVisible == true){
				enemyImgToPrint.src = '../images/vampire.png';
			}
			else{
				enemyImgToPrint.src = '../images/bat.png';
			}
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
			//draw health bar
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else{
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
			//draw health bar
			ctx.fillStyle = "rgb(0,204,0)";
			ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
	}
}

function renderTowerAndBullet() {
	//iterate through towers
	for (var i = 0; i < towersOnBoard.length; i++){
		if (!(towersOnBoard[i] instanceof lamp)) {
			towerImg.src = '../images/' + towersOnBoard[i].constructor.name + '.png';
			//when there are no enemies on board, undefined parameters will be passed in to rotateTower. this if is to check and prevent it from passing through
			if (!(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === undefined) && !(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === -1)) {
				ang = rotateTower(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].xCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].yCoord);
			} else {
				ang = 0;
			}	

			if(towersOnBoard[i] instanceof actionFigure || towersOnBoard[i] instanceof mouseTrap || towersOnBoard[i] instanceof blenderDefender || towersOnBoard[i] instanceof trophy || towersOnBoard[i] instanceof calculator){
				ang = 0;
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
				//angle tower to target
				ctx.rotate(Math.PI / 180 * ang);
				//draw bullet with respect to trajectory parameter
				ctx.fillRect(0, -(towersOnBoard[i].bulletArr[b].trajectory), 5, 5);
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
			ctx.rotate(Math.PI / 180 * ang);
			ctx.drawImage(towerImg, -towerImg.width/2, -towerImg.height/2);
			ctx.restore();
		}
	}
}

// end of render section -------------------------------------------------------------------------------

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
	
	if (bActive == false && bossSpawned == true && Hp > 0) {
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
stageWave[0][0] = ["blueSkeleton", "blueSkeleton", "blueSkeleton"];
stageWave[0][1] = ["blueSkeleton", "basicSkeleton"];
stageWave[0][2] = ["blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[0][3] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[0][4] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton"];
stageWave[0][5] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[0][6] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[0][7] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[0][8] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[0][9] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "bigBoss"];
//Stage 2
stageWave[1][0] = ["bat"];
stageWave[1][1] = ["blueSkeleton", "basicSkeleton"];
stageWave[1][2] = ["blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[1][3] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[1][4] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton"];
stageWave[1][5] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[1][6] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[1][7] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[1][8] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton"];
stageWave[1][9] = ["blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "bigBoss"];
//Stage 3
stageWave[2][0] = ["blueSkeleton"];
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
stageWave[3][0] = ["witch", "witch", "witch", "witch", "witch", "witch", "witch", "witch", "witch"];
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
		}, 1500);
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


var disabledTowers = document.getElementsByClassName("disabledTower");
var allSelected = document.getElementsByClassName("tower");
function towerAvailable () {
	//disable towers according to stage
	
	if (currentStage == 0) {
		document.getElementById("toyCarLauncher").className = "tower";
		document.getElementById("actionFigure").className = "tower";
		document.getElementById("marbleShooter").className = "tower";
		
		enableTowers();

	} if (currentStage == 1) {
		document.getElementById("lamp").className = "tower";
		document.getElementById("calculator").className = "tower";
		document.getElementById("nutsAndBolts").className = "tower";
		
		enableTowers();

	} if (currentStage == 2) {
		document.getElementById("blenderDefender").className = "tower";
		document.getElementById("mouseTrap").className = "tower";
		document.getElementById("waterGun").className = "tower";
		
		enableTowers();

	} if (currentStage == 3) {
		document.getElementById("toyCarLauncher").className = "tower";
		document.getElementById("actionFigure").className = "tower";
		document.getElementById("marbleShooter").className = "tower";
		document.getElementById("lamp").className = "tower";
		document.getElementById("calculator").className = "tower";
		document.getElementById("nutsAndBolts").className = "tower";
		document.getElementById("blenderDefender").className = "tower";
		document.getElementById("mouseTrap").className = "tower";
		document.getElementById("waterGun").className = "tower";
		document.getElementById("airplaneLauncher").className = "tower";
		document.getElementById("trophy").className = "tower";
		document.getElementById("vanquishEvil").className = "tower";
		
		//selects which tower to disable from witch
		if (enemiesOnBoard.length > 0) {
			for (var i = 0; i < enemiesOnBoard.length; i++) {
				if (enemiesOnBoard[i] instanceof witch) {
					switch (enemiesOnBoard[i].towerStolen){
						case 1:
							document.getElementById("toyCarLauncher").className = "disabledTower";
							break;
						case 2:
							document.getElementById("actionFigure").className = "disabledTower";
							break;
						case 3:
							document.getElementById("marbleShooter").className = "disabledTower";
							break;
						case 4:
							document.getElementById("lamp").className = "disabledTower";
							break;
						case 5:
							document.getElementById("calculator").className = "disabledTower";
							break;
						case 6:
							document.getElementById("nutsAndBolts").className = "disabledTower";
							break;
						case 7:
							document.getElementById("mouseTrap").className = "disabledTower";
							break;
						case 8:
							document.getElementById("blenderDefender").className = "disabledTower";
							break;
						case 9:
							document.getElementById("waterGun").className = "disabledTower";
							break;
						case 10:
							document.getElementById("airplaneLauncher").className = "disabledTower";
							break;
						case 11:
							document.getElementById("trophy").className = "disabledTower";
							break;
						case 12:
							document.getElementById("vanquishEvil").className = "disabledTower";
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
