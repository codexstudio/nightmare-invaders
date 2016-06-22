//Set FPS
const fps = setInterval(update, 33.34); // 30fps

//language related stuff
var language = 0;
var HTMLID_langEN = document.getElementById("lang-EN");
var HTMLID_langFR = document.getElementById("lang-FR");
var HTMLID_langES = document.getElementById("lang-ES");
// end language related stuff
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
	'../images/grimReaper.png',
	'../images/bigRoach.png',
	'../images/kid.png',
	'../images/marble.png',
	'../images/paperPlane.png',
	'../images/teddyBear.png',
	'../images/toast.png',
	'../images/toyCar.png',
	'../images/water.png'
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

if (language === 0){
	stages[0] = "Child's Bedroom";
	stages[1] = "Basement";
	stages[2] = "Kitchen";
	stages[3] = "Parents' Bedroom";
}
else if(language === 1){
	stages[0] = "Chambre D'enfant";
	stages[1] = "Sous-sol";
	stages[2] = "Cuisine";
	stages[3] = "La Chambre des Parents";
}
else if(language === 2){
	stages[0] = "El Dormitorio del Nino";
	stages[1] = "Sotano";
	stages[2] = "Cocina";
	stages[3] = "Recamara de los Padres";
}


//List of stage images
var stageImages = [];

stageImages[0] = "Stage1.png";
stageImages[1] = "Stage2.png";
stageImages[2] = "Stage3.png";
stageImages[3] = "Stage4.png";


//List of stage paths (Paths not to be used for enemy path anymore like in prototype. Purpose is now for tower placement checking.)
	//format => [y, x]; [0, 0] => top left; [40, 60] => bottom right;
	//[same y, higher x] => →; [same y, lower x] => ←; [higher y, same x] => ↓; [lower y, same x] => ↑;

//Stage1Path.png
//[5, 60] ← [5, 49] ↓ [12, 49] left [12, 24] down [24, 24] right [24, 40] down [35, 40] left [35, 0]
var pathChildBedroom = [grid[5][60], grid[5][59], grid[5][58], grid[5][57], grid[5][56], grid[5][55], grid[5][54], grid[5][53],
			grid[5][52], grid[5][51], grid[5][50], grid[5][49], grid[6][49], grid[7][49], grid[8][49], grid[9][49],
			grid[10][49], grid[11][49], grid[12][49], grid[12][48], grid[12][47], grid[12][46],	grid[12][45],
			grid[12][44], grid[12][43], grid[12][42], grid[12][41], grid[12][40], grid[12][39],	grid[12][38],
			grid[12][37], grid[12][36], grid[12][35], grid[12][34], grid[12][33], grid[12][32],	grid[12][31],
			grid[12][30], grid[12][29], grid[12][28], grid[12][27], grid[12][26], grid[12][25],	grid[12][24],
			grid[13][24], grid[14][24], grid[15][24], grid[16][24], grid[17][24], grid[18][24],	grid[19][24],
			grid[20][24], grid[21][24], grid[22][24], grid[23][24], grid[24][24], grid[24][25],	grid[24][26],
			grid[24][27], grid[24][28], grid[24][29], grid[24][30], grid[24][31], grid[24][32],	grid[24][33],
			grid[24][34], grid[24][35], grid[24][36], grid[24][37], grid[24][38], grid[24][39], grid[24][40],
			grid[25][40], grid[26][40], grid[27][40], grid[28][40], grid[29][40], grid[30][40],	grid[31][40],
			grid[32][40], grid[33][40], grid[34][40], grid[35][40], grid[35][39], grid[35][38], grid[35][37],
			grid[35][36], grid[35][35], grid[35][34], grid[35][33], grid[35][32], grid[35][31],	grid[35][30],
			grid[35][29], grid[35][28], grid[35][27], grid[35][26], grid[35][25], grid[35][24], grid[35][23],
			grid[35][22], grid[35][21], grid[35][20], grid[35][19], grid[35][18], grid[35][17], grid[35][16],
			grid[35][15], grid[35][14], grid[35][13], grid[35][12], grid[35][11], grid[35][10], grid[35][9],
			grid[35][8], grid[35][7], grid[35][6], grid[35][5], grid[35][4], grid[35][3], grid[35][2], grid[35][1], grid[35][0]];
			
//Stage2Path.png
//[20, 60] ← [20, 53] ↓ [35, 53] ← [35, 37] ↑ [13, 37] ← [13, 22] ↓ [27, 22] ← [27, 10] ↑ [20, 10] ← [20, 0];
var pathBasement = [grid[20][60], grid[20][59], grid[20][58], grid[20][57], grid[20][56], grid[20][55], grid[20][54], grid[20][53],
			grid[21][53], grid[22][53], grid[23][53], grid[24][53], grid[25][53], grid[26][53], grid[27][53],
			grid[28][53], grid[29][53], grid[30][53], grid[31][53], grid[32][53], grid[33][53], grid[34][53],
			grid[35][53], grid[35][52], grid[35][51], grid[35][50], grid[35][49], grid[35][48], grid[35][47],
			grid[35][46], grid[35][45], grid[35][44], grid[35][43], grid[35][42], grid[35][41], grid[35][40],
			grid[35][39], grid[35][38], grid[35][37], grid[34][37], grid[33][37], grid[32][37], grid[31][37],
			grid[30][37], grid[29][37], grid[28][37], grid[27][37], grid[26][37], grid[25][37], grid[24][37],
			grid[23][37], grid[22][37], grid[21][37], grid[20][37], grid[19][37], grid[18][37], grid[17][37],
			grid[16][37], grid[15][37], grid[14][37], grid[13][37], grid[13][36], grid[13][35], grid[13][34],
			grid[13][33], grid[13][32], grid[13][31], grid[13][30],	grid[13][29], grid[13][28], grid[13][27],
			grid[13][26], grid[13][25], grid[13][24], grid[13][23],	grid[13][22], grid[14][22], grid[15][22],
			grid[16][22], grid[17][22], grid[18][22], grid[19][22],	grid[20][22], grid[21][22], grid[22][22],
			grid[23][22], grid[24][22], grid[25][22], grid[26][22],	grid[27][22], grid[27][21], grid[27][20],
			grid[27][19], grid[27][18], grid[27][17], grid[27][16], grid[27][15], grid[27][14], grid[27][13],
			grid[27][12], grid[27][11], grid[27][10], grid[24][10], grid[23][10], grid[22][10], grid[21][10],
			grid[20][10], grid[20][9], grid[20][8], grid[20][7], grid[20][6], grid[20][5], grid[20][4],
			grid[20][3], grid[20][2], grid[20][1], grid[20][0]];
			
//Stage3Path.png
//[25, 60] ← [25, 45] ↓ [35, 45] ← [35, 23] ↑ [20, 23] → [20, 37] ↑ [10, 37] ← [10, 15] ↓ [15, 15] ← [15, 0]
var pathKitchen = [grid[25][60], grid[25][59], grid[25][58], grid[25][57], grid[25][56], grid[25][55], grid[25][54], grid[25][53],
			grid[25][52], grid[25][51], grid[25][50], grid[25][49], grid[25][48], grid[25][47], grid[25][46],
			grid[25][45], grid[26][45], grid[27][45], grid[28][45], grid[29][45], grid[30][45], grid[31][45],
			grid[32][45], grid[33][45], grid[34][45], grid[35][45], grid[35][44], grid[35][43], grid[35][42],
			grid[35][41], grid[35][40], grid[35][39], grid[35][38], grid[35][37], grid[35][36], grid[35][35],
			grid[35][34], grid[35][33], grid[35][32], grid[35][31], grid[35][30], grid[35][29], grid[35][28],
			grid[35][27], grid[35][26], grid[35][25], grid[35][24], grid[35][23], grid[34][23], grid[33][23],
			grid[32][23], grid[31][23], grid[30][23], grid[29][23], grid[28][23], grid[27][23], grid[26][23],
			grid[25][23], grid[24][23], grid[23][23], grid[22][23], grid[21][23], grid[20][23], grid[20][24],
			grid[20][25], grid[20][26],	grid[20][27], grid[20][28], grid[20][29], grid[20][30], grid[20][31],
			grid[20][32], grid[20][33],	grid[20][34], grid[20][35], grid[20][36], grid[20][37], grid[19][37],
			grid[18][37], grid[17][37],	grid[16][37], grid[15][37], grid[14][37], grid[13][37], grid[12][37],
			grid[11][37], grid[10][37], grid[10][36], grid[10][35], grid[10][34], grid[10][33], grid[10][32],
			grid[10][31], grid[10][30], grid[10][29], grid[10][28], grid[10][27], grid[10][26], grid[10][25],
			grid[10][24], grid[10][23], grid[10][22], grid[10][21], grid[10][20], grid[10][19], grid[10][18],
			grid[10][17], grid[10][16], grid[10][15], grid[11][15], grid[12][15], grid[13][15], grid[14][15],
			grid[15][15], grid[15][14], grid[15][13], grid[15][12], grid[15][11], grid[15][10], grid[15][9],
			grid[15][8], grid[15][7], grid[15][6], grid[15][5], grid[15][4], grid[15][3], grid[15][2], grid[15][1], grid[15][0]];
			
//Stage4Path.png
//[35, 60] ← [35, 52] ↑ [25, 52] ← [25, 45] ↑ [20, 45] ← [20, 36] ↑ [10, 36] ← [10, 24] ↓ [20, 24] ← [20, 15] ↓ [25, 15] ← [25, 8] ↓ [35, 8] ← [35, 0]
var pathParentBedroom = [grid[35][60], grid[35][59], grid[35][58], grid[35][57], grid[35][56], grid[35][55], grid[35][54],
			grid[35][53], grid[35][52], grid[34][52], grid[33][52], grid[32][52], grid[31][52], grid[30][52],
			grid[29][52], grid[28][52], grid[27][52], grid[26][52], grid[25][52], grid[25][51], grid[25][50],
			grid[25][49], grid[25][48], grid[25][47], grid[25][46], grid[25][45], grid[24][45], grid[23][45],
			grid[22][45], grid[21][45], grid[20][45], grid[20][44], grid[20][43], grid[20][42], grid[20][41],
			grid[20][40], grid[20][39], grid[20][38], grid[20][37], grid[20][36], grid[19][36], grid[18][36],
			grid[17][36], grid[16][36], grid[15][36], grid[14][36], grid[13][36], grid[12][36], grid[11][36],
			grid[10][36], grid[10][35], grid[10][34], grid[10][33], grid[10][32], grid[10][31], grid[10][30],
			grid[10][29], grid[10][28], grid[10][27], grid[10][26], grid[10][25], grid[10][24], grid[11][24],
			grid[12][24], grid[13][24], grid[14][24], grid[15][24], grid[16][24], grid[17][24], grid[18][24],
			grid[19][24], grid[20][24], grid[20][23], grid[20][22],	grid[20][21], grid[20][20], grid[20][19],
			grid[20][18], grid[20][17], grid[20][16], grid[20][15],	grid[21][15], grid[22][15], grid[23][15],
			grid[24][15], grid[25][15], grid[25][14], grid[25][13],	grid[25][12], grid[25][11], grid[25][10],
			grid[25][9], grid[25][8], grid[26][8], grid[27][8],	grid[28][8], grid[29][8], grid[30][8],
			grid[31][8], grid[32][8], grid[33][8], grid[34][8],	grid[35][8], grid[35][7], grid[35][6],
			grid[35][5], grid[35][4], grid[35][3], grid[35][2], grid[35][1], grid[35][0]];
			
var stagePaths = [];
stagePaths[0] = pathChildBedroom;
stagePaths[1] = pathBasement;
stagePaths[2] = pathKitchen;
stagePaths[3] = pathParentBedroom;


//UI Elements
var Gold = 80; 
var Hp = 100;
var currentWave = 0;
var pause = false;
var gameMessage = "";

var outputTowerStats = document.getElementById("outputTowerStats");
var outputPlayerStats = document.getElementById("outputPlayerStats");
var outputGameMessage = document.getElementById("gameMessage");
var outputStageName = document.getElementById("stageName");
var disabledTowers = document.getElementsByClassName("disabledTower");
var allSelected = document.getElementsByClassName("enabledTower");

//pausing section
var HTMLBTN_playTgl = document.getElementById("btnPlayTgl");
var SVG_pause = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60"><g class="btnUI"><path d="M33,46h8V14h-8V46z"/><path d="M19,46h8V14h-8V46z"/></g></svg>'
var SVG_play = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 294.843 294.843"><g class="btnUI"><path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029C113.877,77.926,111.575,77.902,109.699,78.969z"/></g>'
var HTMLID_pauseUI = document.getElementById("pauseUI");
var HTMLBTN_muteTgl = document.getElementById("pauseUI-mute");
var HTMLBTN_mainMenu = document.getElementById("pauseUI-mainMenu");
var HTMLBTN_pauseTitle = document.getElementById("pauseTitle");
var HTMLID_langMenuWrapper = document.getElementById("languageDrop");
var HTMLBTN_pauseButton = document.getElementById("pauseButton");
var langMenuShow = false;
// end pausing section

// muting 
var SVG_soundOn = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60"><g class="btnUI"> \
						<path d="M34.437,7.413c-0.979-0.561-2.143-0.553-3.115,0.019c-0.063,0.037-0.121,0.081-0.174,0.131L17.906,19.891 \
							C17.756,19.963,17.593,20,17.427,20H9.104C7.392,20,6,21.393,6,23.104v12.793C6,37.607,7.392,39,9.104,39h8.324 \
							c0.166,0,0.329,0.037,0.479,0.109l13.242,12.328c0.053,0.05,0.112,0.094,0.174,0.131c0.492,0.289,1.033,0.434,1.574,0.434 \
							c0.529,0,1.058-0.138,1.541-0.415C35.416,51.027,36,50.021,36,48.894V10.106C36,8.979,35.416,7.973,34.437,7.413z M34,48.894 \
							c0,0.577-0.389,0.862-0.556,0.958c-0.158,0.09-0.562,0.262-1.025,0.037l-13.244-12.33c-0.054-0.051-0.113-0.095-0.176-0.131 \
							C18.522,37.147,17.979,37,17.427,37H9.104C8.495,37,8,36.505,8,35.896V23.104C8,22.495,8.495,22,9.104,22h8.324 \
							c0.551,0,1.095-0.147,1.572-0.428c0.063-0.036,0.122-0.08,0.176-0.131l13.244-12.33c0.465-0.226,0.868-0.053,1.025,0.037 \
							C33.611,9.244,34,9.529,34,10.106V48.894z"/> \
						<path d="M43.248,17.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c6.238,6.238,6.238,16.39,0,22.628 \
							c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293 \
							C50.266,35.73,50.266,24.312,43.248,17.293z"/> \
						<path d="M39.707,20.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c4.297,4.297,4.297,11.289,0,15.586 \
							c-0.391,0.391-0.391,1.023,0,1.414C38.488,38.902,38.744,39,39,39s0.512-0.098,0.707-0.293 \
							C44.784,33.63,44.784,25.37,39.707,20.293z"/> \
						<path d="M46.183,12.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c4.356,4.355,6.755,10.142,6.755,16.293 \
							s-2.399,11.938-6.755,16.293c-0.391,0.391-0.391,1.023,0,1.414C44.964,47.902,45.22,48,45.476,48s0.512-0.098,0.707-0.293 \
							c4.734-4.733,7.341-11.021,7.341-17.707S50.917,17.026,46.183,12.293z"/> \
						<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 \
							S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/> \
					</g>'

var SVG_soundOff = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 59.986 59.986"><g class="btnUI"> \
					<path d="M51.213,8.78C39.517-2.917,20.484-2.916,8.787,8.78C3.121,14.446,0,21.98,0,29.993S3.121,45.54,8.787,51.206 \
						c5.848,5.849,13.531,8.772,21.213,8.772s15.365-2.924,21.213-8.772C62.91,39.509,62.91,20.477,51.213,8.78z M10.201,10.194 \
						C15.66,4.736,22.83,2.007,30,2.007c6.858,0,13.713,2.504,19.074,7.498L42,16.579v-6.479c0-1.127-0.584-2.134-1.563-2.693 \
						c-0.978-0.561-2.143-0.553-3.115,0.019c-0.063,0.037-0.121,0.081-0.174,0.131L23.906,19.884c-0.149,0.072-0.313,0.109-0.479,0.109 \
						h-8.324c-1.711,0-3.104,1.393-3.104,3.104v12.793c0,1.711,1.392,3.104,3.104,3.104h4.482L9.511,49.068 \
						C4.664,43.869,2,37.137,2,29.993C2,22.514,4.913,15.483,10.201,10.194z M21.586,36.993h-6.482c-0.608,0-1.104-0.495-1.104-1.104 \
						V23.096c0-0.608,0.495-1.104,1.104-1.104h8.324c0.551,0,1.095-0.147,1.572-0.428c0.063-0.036,0.122-0.08,0.176-0.131l13.244-12.33 \
						c0.465-0.226,0.868-0.053,1.025,0.037C39.611,9.237,40,9.522,40,10.099v8.479L21.586,36.993z M40,21.407v27.479 \
						c0,0.577-0.389,0.862-0.556,0.958c-0.158,0.09-0.562,0.262-1.025,0.037l-13.244-12.33c-0.054-0.051-0.113-0.095-0.176-0.131 \
						c-0.224-0.132-0.466-0.229-0.713-0.3L40,21.407z M49.799,49.792c-10.68,10.679-27.908,10.904-38.873,0.689l11.488-11.488h1.013 \
						c0.166,0,0.329,0.037,0.479,0.109L37.148,51.43c0.053,0.05,0.112,0.094,0.174,0.131c0.492,0.289,1.033,0.434,1.574,0.434 \
						c0.529,0,1.058-0.138,1.541-0.415C41.416,51.02,42,50.013,42,48.887V19.407l8.488-8.488C60.704,21.884,60.479,39.112,49.799,49.792z \
						"/> \
					</g>'
var bkgAudio = document.getElementById('background_audio');
var mute = false;
// end muting
var HTMLID_turretWrapper = document.getElementById("turrets");
var HTMLID_toyCarLauncher = document.getElementById("toyCarLauncher");
var HTMLID_actionFigure = document.getElementById("actionFigure");
var HTMLID_marbleShooter = document.getElementById("marbleShooter");
var HTMLID_lamp = document.getElementById("lamp");
var HTMLID_calculator = document.getElementById("calculator");
var HTMLID_nutsAndBolts = document.getElementById("nutsAndBolts");
var HTMLID_blenderDefender = document.getElementById("blenderDefender");
var HTMLID_toaster = document.getElementById("toaster");
var HTMLID_waterGun = document.getElementById("waterGun");
var HTMLID_airplaneLauncher = document.getElementById("airplaneLauncher");
var HTMLID_trophy = document.getElementById("trophy");
var HTMLID_vanquishEvil = document.getElementById("vanquishEvil");

var HTMLID_sellTowers = document.getElementById("sellTowers");


//global variables
var ang = 0;
const TRAJ_SPEED = 7;

function menu(){
	window.location="Menu.html";
}

function gameOver(){
	window.location = "Game_Over.html";
}

function gameWin() {
	ctx.drawImage(gameCleared, 0, 0);
	setTimeout(function(){ 
		window.location="Menu.html";
	}, 4000);
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
		if (language === 0){
			gameMessage = "This is the first stage!";
		}
		else if (language === 1){
			gameMessage = "Ceci est la Premiere Etape!";
		}
		else if (language === 2){
			gameMessage = "Esta es la Primera Etapa!";
		}
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
		if (language === 0){
			gameMessage = "This is the last stage!";
		}
		else if (language === 1){
			gameMessage = "Ceci est la Derniere Etape!";
		}
		else if (language === 2){
			gameMessage = "Esta es la Ultima Etapa!";
		}
	}
}


//The img elements
var currentStageImage = document.getElementById("currentStageImage");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var towerImg = new Image();
var lampOnOff = new Image();
var enemyImgToPrint = new Image();
var bulletImg = new Image();


//Gold Over Time
var awardGoldOverTime;
var goldOverTime = setInterval(function(){
	if (awardGoldOverTime == true){
			Gold++;
	}
}, 500);


var tips = setInterval(function(){
	
	var displayTip = Math.random() * 100;
	if (currentStage == 0 && waveCounter >= 2) {
		if (displayTip < 100 && displayTip >= 80){
			if (language === 0) {
				gameMessage = "Tip: Sometimes sacrificing health for more gold can be a good strategy.";
			}
			if (language === 1) {
				gameMessage = "Astuce: Parfois sacrifier la santé pour plus d'or peut être une bonne stratégie.";
			}
			if (language === 2) {
				gameMessage = "Consejo: A veces sacrificar la salud para más de oro puede ser una buena estrategia.";
			}
		}
		else if (displayTip < 80 && displayTip >= 60){
			if (language === 0) {
				gameMessage = "Tip: Tower placement is important! Look at your range indicator surrounding the tower.";
			}
			if (language === 1) {
				
				gameMessage = "Astuce: Placement Tower est important! Regardez votre indicateur de plage entourant la tour.";
			}
			if (language === 2) {
				
				gameMessage = "Consejo: La colocación de la torre es importante! Mire a su indicador de rango que rodea la torre.";
			}
		}
		else if (displayTip < 60 && displayTip >= 40){
			if (language === 0) {
				gameMessage = "Tip: You can sell towers to upgrade to better towers.";
			}
			if (language === 1) {
				gameMessage = "Astuce: Vous pouvez vendre des tours pour passer à de meilleurs tours.";
			}
			if (language === 2) {
				gameMessage = "Consejo: Usted puede vender torres para actualizar a mejores torres.";
			}
		}
		else if (displayTip < 40 && displayTip >= 20){
			if (language === 0) {
				gameMessage = "Tip: If you are able to clear all enemies, save money for better towers.";
			}
			if (language === 1) {
				gameMessage = "Astuce: Si vous êtes en mesure d' effacer tous les ennemis , économiser de l'argent pour de meilleurs tours.";
			}
			if (language === 2){
				gameMessage = "Si usted es capaz de eliminar a todos los enemigos , ahorrar dinero para mejores torres.";
			}
		}
		else if (displayTip < 20 && displayTip >= 0){
			if (language === 0) {
				gameMessage = "Warning! Gold resets back to 100 at the end of each stage!";
			}
			if (language === 1) {
				gameMessage = "Attention! Or réinitialise retour à 100 à la fin de chaque étape!";
			}
			if (language === 2){
				gameMessage = "¡Advertencia! Oro restablece de nuevo a 100 al final de cada etapa!";
			}
		}
	}
	if (currentStage == 1) {
		if (displayTip < 100 && displayTip >= 75){
		gameMessage = "Tip: Calculators help you in the long run.";
		}
		else if (displayTip < 75 && displayTip >= 50){
		gameMessage = "Tip: Killing a big blob makes three smaller, faster blobs appear in its place!";
		}
	}
}, 30000);

//Temporary grid toggle
var showGrid = true;
function togGrid() {
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
 var enemy = function(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	this.startHealth = startHealth;
	this.health = health;
	this.damage = damage;
	this.speed = speed;
	this.killReward = killReward;
	this.xCoord = (stagePaths[currentStage])[0].x;
	this.yCoord = (stagePaths[currentStage])[0].y;
	this.pathPos = 0;
	this.isSlowed = false;
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
		
		else if (((stagePaths[currentStage])[enemyObj.pathPos].y <= enemyObj.yCoord) && ((stagePaths[currentStage])[enemyObj.pathPos].x == enemyObj.xCoord+1)){
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
					if (enemiesOnBoard[j] instanceof blueDemon) {
						enemyObj.blueDemonExit();
					}
					if (enemiesOnBoard[j] instanceof redDemon) {
						enemyObj.redDemonExit();
					}
					enemiesOnBoard.splice(j,1);
					break;
				}
			}
			Hp -= enemyObj.damage;
			clearInterval(enemyObj.enemyNextMove);
		}
		if ( !(enemyObj instanceof bat) && !(enemyObj instanceof ghost)){
			var seenByWaterGun = false;
	
			for (var a = 0; a < towersOnBoard.length; a++){
				var i = a;
				if(towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towersOnBoard[i] instanceof waterGun){
					var distanceWaterGun = distance (towersOnBoard[i].xCoord, enemyObj.xCoord, towersOnBoard[i].yCoord, enemyObj.yCoord);
					
					if (distanceWaterGun <= towersOnBoard[i].range){
						seenByWaterGun = true;
					}
				}
			}
			if (seenByWaterGun){
				if (enemyObj.isSlowed == false){
					clearInterval(enemyObj.enemyNextMove);
					enemyObj.speed = enemyObj.speed * 2;
					enemyObj.enemyMovement(enemyObj);
				}
				enemyObj.isSlowed = true;
			}
			else if (!seenByWaterGun){
				if (enemyObj.isSlowed == true){
					clearInterval(enemyObj.enemyNextMove);
					enemyObj.speed = enemyObj.speed / 2;
					enemyObj.enemyMovement(enemyObj);
				}
				enemyObj.isSlowed = false;
			}
		}
		if (enemyObj instanceof sensei) {
			enemyObj.tutorial(); //runs tutorial function on 569
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
			else if (enemyObj.phaseTwoComplete == false) {
				enemyObj.spawnKid();
			}
		}
		if (enemyObj instanceof kid) {
			if (enemyObj.health <= (enemyObj.startHealth/2)) {
				gameMessage = "What are you doing!? Save him!";
			}
		}
	}, this.speed);
}

function sensei(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction, isSlowed, hasSpawned){
	enemy.call(this, startHealth,health, damage, speed, killReward, xCoord, yCoord, pathPos, direction, isSlowed);
	this.startHealth = 200;
	this.health = 200;
	this.damage = 0;
	this.speed = 110;
	this.killReward = 100;
	this.hasSpawned = false;
}
sensei.prototype = Object.create(enemy.prototype);
sensei.prototype.constructor = sensei;

sensei.prototype.tutorial = function(){
	if (towersOnBoard.length == 1) {
		gameMessage = "Good job! Now use the towers to get me out of this Nightmare!"; 
	}
	if (this.health <= 175) {
		gameMessage = "As enemies walk through the path, you will have to place more towers to deal with them. Make sure you have enough gold for the tower you want."; 
	}
	if (this.health <= 125){
		gameMessage = "You can always click on a tower and sell it for half its original cost.";
	}
	if (this.health <= 75) {
		gameMessage = "If you allow an enemy to travel to the end of the path, Tommy's health will be lowered. Don't let his health drop to 0 or else you will lose."; 
	}
};

function basicSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction, isSlowed){
	enemy.call(this, startHealth,health, damage, speed, killReward, xCoord, yCoord, pathPos, direction, isSlowed);
	this.startHealth = 220;
	this.health = 220;
	this.damage = 1;
	this.speed = 30;
	this.killReward = 1;
}
basicSkeleton.prototype = Object.create(enemy.prototype);
basicSkeleton.prototype.constructor = basicSkeleton;

basicSkeleton.prototype.thisChildMetohdNeedsAName = function(){
	console.log("Undefined Child Method");
};

function redSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 500;
	this.health = 500;
	this.damage = 2;
	this.speed = 50;
	this.killReward = 5;
}
redSkeleton.prototype = Object.create(enemy.prototype);
redSkeleton.prototype.constructor = redSkeleton;

redSkeleton.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function blueSkeleton(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed)
	this.startHealth = 150;
	this.health = 150;
	this.damage = 1;
	this.speed = 20;
	this.killReward = 4;
}
blueSkeleton.prototype = Object.create(enemy.prototype);
blueSkeleton.prototype.constructor = blueSkeleton;

blueSkeleton.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method");
};

function ghost(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isVisible){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos)
	this.startHealth = 300;
	this.health = 300;
	this.damage = 2;
	this.speed = 50;
	this.killReward = 10;
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

function bigBoss(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 10000;
	this.health = 10000;
	this.damage = 100;
	this.speed = 80;
	this.killReward = 0;
}
bigBoss.prototype = Object.create(enemy.prototype);
bigBoss.prototype.constructor = bigBoss;

bigBoss.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function blob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 750;
	this.health = 750;
	this.damage = 5;
	this.speed = 70;
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
		tempObj1.pathPos = this.pathPos+2;
		tempObj1.xCoord = (stagePaths[currentStage])[tempObj1.pathPos].x;
		tempObj1.yCoord = (stagePaths[currentStage])[tempObj1.pathPos].y;
		enemiesOnBoard.push(tempObj1);
		tempObj1.enemyMovement(tempObj1);
		
		//for blob that spawn behind
		var tempObj2 = new miniBlob;
		tempObj2.pathPos = this.pathPos-2;
		tempObj2.xCoord = (stagePaths[currentStage])[tempObj2.pathPos].x;
		tempObj2.yCoord = (stagePaths[currentStage])[tempObj2.pathPos].y;
		enemiesOnBoard.push(tempObj2);
		tempObj2.enemyMovement(tempObj2);
		
	}
};

function miniBlob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 200;
	this.health = 200;
	this.damage = 1;
	this.speed = 20;
	this.killReward = 5;
}
miniBlob.prototype = Object.create(enemy.prototype);
miniBlob.prototype.constructor = miniBlob;

miniBlob.prototype.miniBlob = function(){
};

function clown(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, goldTaken, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, goldTaken, isSlowed);
	this.startHealth = 150;
	this.health = 150;
	this.damage = 1;
	this.speed = 10;
	this.killReward = 0;
	this.goldTaken;
}
clown.prototype = Object.create(enemy.prototype);
clown.prototype.constructor = clown;

clown.prototype.stealGold = function(){
	var percentageGold = Math.random() * 100;
	
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
	var clownAudio = document.getElementById('clownLaugh');
	clownAudio.play();
	if (language === 0){
			gameMessage = "A clown has stolen " + Math.round(this.goldTaken) + " gold from you! Kill it to get it back!";
		}
		else if (language === 1){
			gameMessage = "Un clown a vole " + Math.round(this.goldTaken) + " or de vous! Tuez-le pour le recuperer!";
		}
		else if (language === 2){
			gameMessage = "Un payaso ha robado " + Math.round(this.goldTaken) + " oro de usted! Acabar con el para recuperarlo!";
		}

};

function bigBlob(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, direction, isSlowed);
	this.startHealth = 14000;
	this.health = 14000;
	this.damage = 100; 
	this.speed = 90;
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
		tempObj1.xCoord = (stagePaths[currentStage])[tempObj1.pathPos].x;
		tempObj1.yCoord = (stagePaths[currentStage])[tempObj1.pathPos].y;
		enemiesOnBoard.push(tempObj1);
		tempObj1.enemyMovement(tempObj1);
		
		//for blob that spawn behind
		var tempObj2 = new blob;
		tempObj2.pathPos = this.pathPos-2;
		tempObj2.xCoord = (stagePaths[currentStage])[tempObj2.pathPos].x;
		tempObj2.yCoord = (stagePaths[currentStage])[tempObj2.pathPos].y;
		enemiesOnBoard.push(tempObj2);
		tempObj2.enemyMovement(tempObj2);
		
	}
};

function bat(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = 500;
	this.health = 500;
	this.damage = 15;
	this.speed = 20;
	this.killReward = 3;
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

function grizzlyBear(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 1500;
	this.health = 1500;
	this.damage = 3;
	this.speed = 65;
	this.killReward = 20;
}
grizzlyBear.prototype = Object.create(enemy.prototype);
grizzlyBear.prototype.constructor = grizzlyBear;

grizzlyBear.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function bigRoach(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 4000;
	this.health = 4000;
	this.damage = 20;
	this.speed = 50;
	this.killReward = 0;
}
bigRoach.prototype = Object.create(enemy.prototype);
bigRoach.prototype.constructor = bigRoach;

bigRoach.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Child Method.");
};

function witch(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, towerStolen, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 400;
	this.health = 400;
	this.damage = 1;
	this.speed = 60;
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
	if (language === 0){
		gameMessage = "A witch has stolen a tower from the store!";
	}
	else if (language === 1){
		gameMessage = "Une sorciere a vole une tour dans le magasin!";
	}
	else if (language === 2){
		gameMessage = "Una bruja ha robado una torre desde la tienda!";
	}
	towerAvailable();
};

function blueDemon(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 1000;
	this.health = 1000;
	this.damage = 0; 
	this.speed = 15;
	this.killReward = 200;
}
blueDemon.prototype = Object.create(enemy.prototype);
blueDemon.prototype.constructor = blueDemon;

blueDemon.prototype.blueDemonExit = function(){
	Hp = 1; 
};

function redDemon(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 5000;
	this.health = 5000;
	this.damage = 0;
	this.speed = 95;
	this.killReward = 200;
}
redDemon.prototype = Object.create(enemy.prototype);
redDemon.prototype.constructor = redDemon;

redDemon.prototype.redDemonExit = function(){
	Hp = 1; 
};

function zombieMom(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 10000;
	this.health = 10000;
	this.damage = 5;
	this.speed = 80;
	this.killReward = 1000;
}
zombieMom.prototype = Object.create(enemy.prototype);
zombieMom.prototype.constructor = zombieMom;

zombieMom.prototype.deaderThanCheddar = function(){	
};

function zombieDad(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 10000;
	this.health = 10000;
	this.damage = 5;
	this.speed = 80;
	this.killReward = 1000;
}
zombieDad.prototype = Object.create(enemy.prototype);
zombieDad.prototype.constructor = zombieDad;

zombieDad.prototype.afterDeaderThanCheddar = function(){
};

function kid(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos);
	this.startHealth = Hp * 300;
	this.health = Hp * 300;
	this.damage = 0;
	this.speed = 80;
	this.killReward = 0;
}
kid.prototype = Object.create(enemy.prototype);
kid.prototype.constructor = kid;

kid.prototype.kidDies = function(){
	gameOver();
};

function grimReaper(startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, phaseOne, isVisible, hasPhaseOned, phaseOneComplete, hasPhaseTwoed, isSlowed){
	enemy.call(this, startHealth, health, damage, speed, killReward, xCoord, yCoord, pathPos, isSlowed);
	this.startHealth = 15000;
	this.health = 15000;
	this.damage = 100;
	this.speed = 100;
	this.killReward = 0;
	this.phaseOne = this.startHealth * 0.75; //initiates boss phase one
	this.phaseTwo = this.startHealth * 0.25; //initates boss phase two
	this.hasPhaseOned = false;
	this.phaseOneComplete = false;
	this.hasPhaseTwoed = false;
	this.phaseTwoComplete = false; 
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
		tempObj1.xCoord = (stagePaths[currentStage])[tempObj1.pathPos].x;
		tempObj1.yCoord = (stagePaths[currentStage])[tempObj1.pathPos].y;
		enemiesOnBoard.push(tempObj1);
		tempObj1.enemyMovement(tempObj1);
		
		//for mom that spawn behind
		var tempObj2 = new zombieMom;
		tempObj2.pathPos = this.pathPos-2;
		tempObj2.xCoord = (stagePaths[currentStage])[tempObj2.pathPos].x;
		tempObj2.yCoord = (stagePaths[currentStage])[tempObj2.pathPos].y;
		enemiesOnBoard.push(tempObj2);
		tempObj2.enemyMovement(tempObj2);
		gameMessage = "Mom?... Dad?...!";
		
		clearInterval(this.enemyNextMove);
		this.speed *= 5;
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
			this.speed /= 5;
			this.enemyMovement(this);
		}
	}
};
	
grimReaper.prototype.spawnKid = function(){ 	
	if (this.health < this.phaseTwo && this.hasPhaseTwoed == false) {
		this.hasPhaseTwoed = true;
		this.isVisible = false;
		var tempObj = new kid;
		enemiesOnBoard.push(tempObj);
		tempObj.enemyMovement(tempObj);
		gameMessage = "NOW YOU WILL UNDERSTAND HOW IT FEELS!";
		clearInterval(this.enemyNextMove);
		this.speed *= 10;
		this.enemyMovement(this);
	}
	if (this.health < this.phaseTwo){
		var kidActive = false;
		for (var i = 0; i < enemiesOnBoard.length; i++){
			if(enemiesOnBoard[i] instanceof kid){
				kidActive = true;
			}
		}
		if (!kidActive){
			this.isVisible = true;
			this.phaseTwoComplete = true;
			clearInterval(this.enemyNextMove);
			this.speed /= 10;
			this.enemyMovement(this);
		}
	}
}

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
	if (tempEnemyObj instanceof sensei) {
		gameMessage = "Hello, I am the sensei of Tommy's wonderful dreams. But unfortunately you have fallen into his Nightmare. Try clicking on a tower and placing it on the floor!";
	}
}
//End of enemy related section-------------------------------------------------------------------------------------------------------------


//Tower related section -------------------------------------------------------------------------------------------------------------------
var towersOnBoard = [];
var towerLocationsByPixelPosition = [];
var numOfTowers = 0;
var towerxy = {x:0, y:0};
var objObstruct = false;

//Tower blueprints section--------------------------------------------------------
var tower = function(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, info, isBuffed){
	this.cost = cost;
	this.damage = damage;
	this.range = range;
	this.attackSpeed = attackSpeed;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.upgraded = false;
	this.targetIndice = -1;
	this.isShooting = 0;
	this.lastAngState = 0;
	this.bulletArr = [];
	this.info = info;
	this.isBuffed = false;
	this.attackEnemy;
	this.boxBool = false;
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
		
		if (towersOnBoard.length > 0 && towerName == "trophy"){
			towerObj.towerBuff(); 
		}
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
		if (towersOnBoard.length > 0 && enemiesOnBoard.length > 0 && towerName != "lamp" && towerName != "calculator" && towerName != "trophy"){
			
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
						if(!(towersOnBoard[j] instanceof actionFigure || towersOnBoard[j] instanceof blenderDefender || towersOnBoard[j] instanceof trophy || towersOnBoard[j] instanceof calculator)) {
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
							if (enemiesOnBoard[j] instanceof kid) {
								enemiesOnBoard[j].kidDies();
							}
							if (enemiesOnBoard[j] instanceof witch){
								switch (enemiesOnBoard[j].towerStolen){
									case 1:
										HTMLID_toyCarLauncher.className = "enabledTower";
										break;
									case 2:
										HTMLID_actionFigure.className = "enabledTower";
										break;
									case 3:
										HTMLID_marbleShooter.className = "enabledTower";
										break;
									case 4:
										HTMLID_lamp.className = "enabledTower";
										break;
									case 5:
										HTMLID_calculator.className = "enabledTower";
										break;
									case 6:
										HTMLID_nutsAndBolts.className = "enabledTower";
										break;
									case 7:
										HTMLID_toaster.className = "enabledTower";
										break;
									case 8:
										HTMLID_blenderDefender.className = "enabledTower";
										break;
									case 9:
										HTMLID_waterGun.className = "enabledTower";
										break;
									case 10:
										HTMLID_airplaneLauncher.className = "enabledTower";
										break;
									case 11:
										HTMLID_trophy.className = "enabledTower";
										break;
									case 12:
										HTMLID_vanquishEvil.className = "enabledTower";
										break;
									default:
									
								}
								enableTowers();
							}
							if (enemiesOnBoard[j] instanceof clown){
								Math.round(enemiesOnBoard[j].goldTaken);
								Gold += Math.round(enemiesOnBoard[j].goldTaken);
								if (language === 0){
									gameMessage = "You have killed a clown and stolen back " + Math.round(enemiesOnBoard[j].goldTaken) +" gold!";
								}
								else if (language === 1){
									gameMessage = "Vous avez tue un clown et vole retour " + Math.round(enemiesOnBoard[j].goldTaken) +" or!";
								}
								else if (language === 2){
									gameMessage = "Que ha matado a un payaso y robado " + Math.round(enemiesOnBoard[j].goldTaken) +" oro!";
								}
							}
							if (enemiesOnBoard[j] instanceof blob) {
								enemiesOnBoard[j].blobSplit();
							}
							if (enemiesOnBoard[j] instanceof bigBlob) {
								enemiesOnBoard[j].bigBlobSplit();
							}
							if (enemiesOnBoard[j] instanceof sensei) {
								gameMessage = "Thanks for getting me outta hereeeeeee! Take 100 gold to help you on your adventure. Good luck!";
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

function toyCarLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed);
	this.cost = 40;
	this.damage = 5;
	this.range = 150;
	this.attackSpeed = 900;
	if (language === 0){
		this.info = "This shoots the dinkie cars at the scary monsters. Not sure what that will do, but use it anyways!";
	}
	else if (language === 1){
		this.info = "Ce tire les voitures de jouet aux monstres effrayants. Je ne sais pas ce que cela va faire, mais l'utiliser de toute facon!";
	}
	else if (language === 2){
		this.info = "Este dispara los coches de mala muerte en los monstruos que dan miedo. No estoy seguro de lo que va a hacer, sino que lo utiliza de todos modos!";
	}
}
toyCarLauncher.prototype = Object.create(tower.prototype);
toyCarLauncher.prototype.constructor = toyCarLauncher;

toyCarLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined toyCarLauncher Method.")
};

function lamp(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, on, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, isBuffed);
	this.cost = 30;
	this.damage = 0;
	this.range = 120;
	this.attackSpeed = 1;
	this.on = false;
	if (language === 0){
		this.info = "Spots ghosts and changes those pesky bats. You may want to wipe off the dust...";
	}
	else if (language === 1){
		this.info = "Trouve des fantomes et modifie ces chauves-souris embetants. Vous pouvez essuyer la poussiere...";
	}
	else if (language === 2){
		this.info = "Encuentra fantasmas y cambia los murcielagos molestos. Es posible que desee limpiar el polvo ...";
	}
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

function actionFigure(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isBuffed);
	this.cost = 100;
	this.damage = 60;
	this.range = 110;
	this.attackSpeed = 4000;
	if (language === 0){
		this.info = "You think this is Superman? It's actually the action figure Dad steps on every night, and it really hurts!";
	}
	else if (language === 1){
		this.info = "Vous pensez que cela est Superman? Il est en fait la figure d'action papa marche sur tous les soirs, et ca fait vraiment mal!";
	}
	else if (language === 2){
		this.info = "Crees que esto es Superman? En realidad es la figura de accion de papa pasos en cada noche, y me duele mucho!";
	}
}
actionFigure.prototype = Object.create(tower.prototype);
actionFigure.prototype.constructor = actionFigure;

actionFigure.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined Action Figure Method.")
};

function marbleShooter(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, shotCounter, isShooting, bulletArr, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, shotCounter, isShooting, bulletArr, isBuffed);
	this.cost = 75;
	this.damage = 5;
	this.range = 200;
	this.attackSpeed = 700;
	this.shotCounter = 0;
	if (language === 0){
		this.info = "Shoots marbles at the speed of sound! Every fifth marble may pack a punch!";
	}
	else if (language === 1){
		this.info = "Pousses billes a la vitesse du son! Chaque cinquieme marbre peut emballer un coup de poing!";
	}
	else if (language === 2){
		this.info = "Dispara canicas a la velocidad del sonido! Uno de cada cinco de marmol puede embalar un sacador!";
	}
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
	this.cost = 250;
	this.damage = 0;
	this.range = 1;
	this.attackSpeed = 5000;
	if (language === 0){
		this.info = "Allows for more spending which means more video games, tamagotchis, and pokemon cards.";
	}
	else if (language === 1){
		this.info = "Permet une augmentation des depenses qui signifie plus de jeux video, tamagotchis, et les cartes pokemon.";
	}
	else if (language === 2){
		this.info = "Permite un mayor gasto que significa mas juegos de video, tamagotchis, y tarjetas de pokemon.";
	}
}
calculator.prototype = Object.create(tower.prototype);
calculator.prototype.constructor = calculator;

calculator.prototype.goldBuff = function(){
	Gold += 5;
};

function nutsAndBolts(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, baseDamage, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed);
	this.cost = 120;
	this.damage = 10;
	this.range = 140;
	this.attackSpeed = 750;
	this.baseDamage = 15;
	if (language === 0){
		this.info = "Nuts do basic damage and there is a 10% chance to shoot a Bolt for 4x damage.";
	}
	else if (language === 1){
		this.info = "Les noix font des dégâts de base et si cette tour tire un boulon, attendent beaucoup de degats.";
	}
	else if (language === 2){
		this.info = "Frutos secos hacen dano de base y si esta torre dispara un rayo, le espera una gran cantidad de danos.";
	}
}
nutsAndBolts.prototype = Object.create(tower.prototype);
nutsAndBolts.prototype.constructor = nutsAndBolts;

nutsAndBolts.prototype.critChance = function() {
	crit = Math.random() * 100;
		if (crit <= 20) {
			this.damage = this.damage * 3;
		}
};

function toaster(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, isBuffed);
	this.cost = 100;
	this.damage = 50;
	this.range = 135;
	this.attackSpeed = 2000;
	if (language === 0){
		this.info = "Don't be fooled by it's cute toasty design, it will fire hot toast to toast your enemies to toasty bits. Toast those enemies! TOOAAAST!!";
	}
	else if (language === 1){
		this.info = "Ne vous laissez pas berner par son design mignon grille, il mettra le feu toasts chauds pour griller vos ennemis en morceaux de pain grille. Faire griller les ennemis! PAIN GRILLE!!";
	}
	else if (language === 2){
		this.info = "No se deje enganar por su diseno tostado lindo, que se disparara tostada caliente para brindar por sus enemigos en pedazos tostados. Brindar por los enemigos! BRINDIS!!";
	}
}
toaster.prototype = Object.create(tower.prototype);
toaster.prototype.constructor = toaster;

toaster.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined toaster Method.")
};

function blenderDefender(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, isBuffed);
	this.cost = 90;
	this.damage = 0.5;
	this.range = 80;
	this.attackSpeed = 15;
	if (language === 0){
		this.info = "May blend enemies into a delicious smoothie.";
	}
	else if (language === 1){
		this.info = "Peut melanger les ennemis dans un smoothie delicieux.";
	}
	else if (language === 2){
		this.info = "Puede mezclar los enemigos en un delicioso batido.";
	}
}
blenderDefender.prototype = Object.create(tower.prototype);
blenderDefender.prototype.constructor = blenderDefender;

blenderDefender.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined blenderDefender Method.")
};

function waterGun(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed);
	this.cost = 80;
	this.damage = 1;
	this.range = 100;
	this.attackSpeed = 400;
	if (language === 0){
		this.info = "Enough force to slow enemies as they approach.";
	}
	else if (language === 1){
		this.info = "Vigueur assez pour ralentir les ennemis comme ils approchent. N'affecte pas les fantomes et les chauves-souris.";
	}
	else if (language === 2){
		this.info = "La fuerza suficiente para ralentizar enemigos cuando se acercan. No afecta a los fantasmas y los murcielagos.";
	}
}
waterGun.prototype = Object.create(tower.prototype);
waterGun.prototype.constructor = waterGun;

waterGun.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined waterGun Method.")
};

function airplaneLauncher(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed);
	this.cost = 200;
	this.damage = 150;
	this.range = 250;
	this.attackSpeed = 3000;
	if (language === 0){
		this.info = "Shoots paper airplanes the kid made. How did they find the time to make all of these?";
	}
	else if (language === 1){
		this.info = "Tire des avions en papier l'enfant fait. Comment ont-ils trouver le temps de faire tout cela?";
	}
	else if (language === 2){
		this.info = "Dispara aviones de papel hecho el chico. Como encontraron el tiempo para hacer todo esto?";
	}
}
airplaneLauncher.prototype = Object.create(tower.prototype);
airplaneLauncher.prototype.constructor = airplaneLauncher;

airplaneLauncher.prototype.thisChildMethodNeedsAName = function(){
	console.log("Undefined airplaneLauncher Method.")
};

function trophy(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded){
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded);
	this.cost = 100;
	this.damage = 0;
	this.range = 100;
	this.attackSpeed = 1;
	if (language === 0){
		this.info = "Remember when the child won the spelling bee? I certainly don't. This buffs other towers. No stacking.";
	}
	else if (language === 1){
		this.info = "Rappelez-vous quand l'enfant a remporte le concours d'orthographe? Je fais certainement pas. Ce buff d'autres tours. Aucun empilement.";
	}
	else if (language === 2){
		this.info = "Recuerde que cuando el nino gano el concurso de ortografia? Ciertamente no. Esta aficionados a otras torres. No apilamiento.";
	}
}
trophy.prototype = Object.create(tower.prototype);
trophy.prototype.constructor = trophy;

trophy.prototype.towerBuff = function(){
	for (var i = 0; i < towersOnBoard.length; i++){
		var distanceFromTrophy = distance(this.xCoord, towersOnBoard[i].xCoord, this.yCoord, towersOnBoard[i].yCoord);
		if (distanceFromTrophy < this.range && !(towersOnBoard[i] instanceof trophy) && !(towersOnBoard[i] instanceof calculator) && !(towersOnBoard[i] instanceof lamp) && towersOnBoard[i].isBuffed == false){
			towersOnBoard[i].isBuffed = true;
			towersOnBoard[i].range *= 1.25;
			towersOnBoard[i].damage *= 1.25;
		}
	}
};

function vanquishEvil(cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed){
	
	tower.call(this, cost, damage, range, attackSpeed, xCoord, yCoord, upgraded, targetIndice, isShooting, bulletArr, isBuffed);
	this.cost = 500;
	this.damage = 200;
	this.range = 500000;
	this.attackSpeed = 6000; 
	if (language === 0){
		this.info = "Caution! Three per customer as per the nightmare safety regulations.";
	}
	else if (language === 1){
		this.info = "Prudence! Trois par client selon les regles de securite de cauchemar.";
	}
	else if (language === 2){
		this.info = "Precaucion! Tres por el cliente de acuerdo con las normas de seguridad pesadilla.";
	}
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
var placingTower = false;
function placeTower(towerType){
	placingTower = true;
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
	placingTower = false;
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
				if (language === 0){
					gameMessage = "Failed to place. Too close to the path.";
				}
				else if (language === 1){
					gameMessage = "Impossible de placer. Trop proche de la voie.";
				}
				else if (language === 2){
					gameMessage = "No se ha podido colocar. Demasiado cerca de la ruta.";
				}
				setTimeout(function(){ 
					gameMessage = "";
				}, 3000);
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
					if (language === 0){
						gameMessage = "Failed to place. Too close to another tower.";
					}
					else if (language === 1){
						gameMessage = "Impossible de placer. Trop pres d'une autre tour.";
					}
					else if (language === 2){
						gameMessage = "No se ha podido colocar. Demasiado cerca de otra torre.";
					}
					setTimeout(function(){ 
						gameMessage = "";
					}, 3000);
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
		if (vanquishEvilCount >= 3 && towerType == "vanquishEvil") {
		objObstruct = true;
		if (language === 0){
			gameMessage = "You can have only 3 Vanquish The Evil Towers!";
		}
		else if (language === 1){
			gameMessage = "Vous pouvez avoir seulement 3 vaincre les tours du mal!";
		}
		else if (language === 2){
			gameMessage = "Solo puede tener 3 torres vencer a los malos!";
		}
		togGrid();
		circleCheck = false;
		}
		var towerObjectHolder = new (eval(towerType))();
		if (!objObstruct && towerxy.x < 870 && towerxy.y < 570){
			if (Gold >= towerObjectHolder.cost){
				createTowerObject(towerType, towerLocationsByPixelPosition[numOfTowers].x, towerLocationsByPixelPosition[numOfTowers].y);
				numOfTowers++;
			}
			else {
				if (language === 0){
					gameMessage = "Not enough funds.";
				}
				else if (language === 1){
					gameMessage = "Pas assez de fonds.";
				}
				else if (language === 2){
					gameMessage = "Sin fondos suficientes.";
				}
				togGrid();
				circleCheck = false;
			}
		}
		objObstruct = false;
		e.target.removeEventListener(e.type, arguments.callee);
	}
	
}

function rotateTower(towerX, towerY, enemyX, enemyY) {
	
	var a = enemyX - (towerX + 22.5) - 1.5;
	var b = enemyY - (towerY + 22.5) - 1.5; 
	
	var c = Math.atan2(b , a) * 180 / Math.PI;
	c+=90;
	
	return c;
}

function clearTowerStats () {
	outputTowerStats.innerHTML = "";
}

function muteToggle(e) {	
	e = e || window.event;
	bkgAudio.muted = !bkgAudio.muted;
	mute = !mute;
	e.preventDefault();

	HTMLBTN_muteTgl.innerHTML = mute ? SVG_soundOff : SVG_soundOn;
}

HTMLBTN_playTgl.addEventListener( "click", pauseGame );

document.getElementById("pauseUI-btns-wrapper").addEventListener( "click", function (e) {

	var target = e.target;
	while ( target.tagName !== "DIV" ) {
		target = target.parentNode;
	}

	switch (target.id) {
	
		case "btnPlayTgl" :
		case "pauseUI-play" : pauseGame(); break;
		case "pauseUI-mute" : muteToggle(e); break;
		case "pauseUI-mainMenu" : menu(); break;
		case "pauseUI-lang" : 
				if (!langMenuShow) {
					HTMLID_langMenuWrapper.style.animation = "animation-lang-window 0.4s";
					HTMLID_langMenuWrapper.style.animationFillMode = "forwards";
					HTMLID_langMenuWrapper.style.pointerEvents = 'auto';
				} else {
					HTMLID_langMenuWrapper.style.animation = "animation-lang-window-reverse 0.4s";
					HTMLID_langMenuWrapper.style.animationFillMode = "forwards";
					HTMLID_langMenuWrapper.style.pointerEvents = 'none';
				}
				langMenuShow = !langMenuShow;

				break;
		case "languageDrop" : changeLanguage(e); break;
		default:

	}
	
} );
function changeLanguage(e) {
	language = (e.target == HTMLID_langEN) ? 0 :
		(e.target == HTMLID_langFR) ? 1 :
		2;
	if (langMenuShow) {
		HTMLID_langMenuWrapper.style.animation = "animation-lang-window-reverse 0.4s";
		HTMLID_langMenuWrapper.style.animationFillMode = "forwards";
		HTMLID_langMenuWrapper.style.pointerEvents = "none";
	}
	if (language === 0){
		stages[0] = "Child's Bedroom";
		stages[1] = "Basement";
		stages[2] = "Kitchen";
		stages[3] = "Parents' Bedroom";
	}
	else if(language === 1){
		stages[0] = "Chambre D'enfant";
		stages[1] = "Sous-sol";
		stages[2] = "Cuisine";
		stages[3] = "La Chambre des Parents";
	}
	else if(language === 2){
		stages[0] = "El Dormitorio del Nino";
		stages[1] = "Sotano";
		stages[2] = "Cocina";
		stages[3] = "Recamara de los Padres";
	}
}
// tower events -------------------------------------------------------------

HTMLID_turretWrapper.addEventListener("mouseout", clearTowerStats);
HTMLID_turretWrapper.addEventListener("mouseover", function(e) { if (e.target.tagName === "IMG") {getStats(e.target.id);}});
HTMLID_turretWrapper.addEventListener("click", function(e) { if (e.target.tagName === "IMG" && !pause && !placingTower) {placeTower(e.target.id);}});

// end tower events -------------------------------------------------------------

canvas.addEventListener( "mousemove", function(e) { cursorX = e.clientX; cursorY = e.clientY; });
canvas.addEventListener("mouseout", function(){resetCoord();});

function getStats(turret) {
	
	var towerPlaceholder = new (eval(turret))();

	/*outputCost.innerHTML = "Cost: " + towerPlaceholder.cost;
	outputDamage.innerHTML = "Damage: " + towerPlaceholder.damage;
	outputRange.innerHTML = "Range: " + towerPlaceholder.range;
	outputAspd.innerHTML = "Attack Speed: " + towerPlaceholder.attackSpeed + " (Reload Time)";*/

	switch (towerPlaceholder.constructor.name) {
		case "toyCarLauncher":
			if(language === 0){
				outputTowerStats.innerHTML = "Toy Car Launcher"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Voiture Jouet Lanceur"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Lanzador Coche de Juguete"; break;
			}
		case "actionFigure":
			if(language === 0){
				outputTowerStats.innerHTML = "Action Figure"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Figurine"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Figura de Accion"; break;
			}
		case "marbleShooter":
			if(language === 0){
				outputTowerStats.innerHTML = "Marble Shooter"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Marbre Lanceur"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Tirador de Marmol"; break;
			}
		case "lamp":
			if(language === 0){
				outputTowerStats.innerHTML = "Lava Lamp"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Lampe a Lave"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Lampara de Lava"; break;
			}
		case "calculator":
			if(language === 0){
				outputTowerStats.innerHTML = "Calculator"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Calculatrice"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Calculadora"; break;
			}
		case "nutsAndBolts":
			if(language === 0){
				outputTowerStats.innerHTML = "Nuts and Bolts Shooter"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Ecrous et Boulons Lanceur"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Tuercas y Tornillos Lanzador"; break;
			}
		case "blenderDefender":
			if(language === 0){
				outputTowerStats.innerHTML = "Blender Defender"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Defenseur Melangeur"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Defensor de la Licuadora"; break;
			}
		case "toaster":
			if(language === 0){
				outputTowerStats.innerHTML = "Toaster"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Grille-pain"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Tostadora"; break;
			}
		case "waterGun":
			if(language === 0){
				outputTowerStats.innerHTML = "Water Gun"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Pistolet a Eau"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Pistola de Agua"; break;
			}
		case "airplaneLauncher":
			if(language === 0){
				outputTowerStats.innerHTML = "Paper Plane Launcher"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Papier Avion Lanceur"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Lanzador Avion de Papel"; break;
			}
		case "trophy":
			if(language === 0){
				outputTowerStats.innerHTML = "Trophy"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Trophee"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Trofeo"; break;
			}
		case "vanquishEvil":
			if(language === 0){
				outputTowerStats.innerHTML = "Vanquish Evil"; break;
			}
			else if(language === 1){
				outputTowerStats.innerHTML = "Vaincre le Mal"; break;
			}
			else if(language === 2){
				outputTowerStats.innerHTML = "Vencer el Mal"; break;
			}
	
	}
	if (language === 0){
		outputTowerStats.innerHTML += "<br>Cost: " + towerPlaceholder.cost;
		outputTowerStats.innerHTML += "<br>Damage: " + towerPlaceholder.damage;
		outputTowerStats.innerHTML += "<br>Range: " + towerPlaceholder.range;
		outputTowerStats.innerHTML += "<br>Attack Speed: " + towerPlaceholder.attackSpeed + " (Reload Time)";
		outputTowerStats.innerHTML += "<br>" + towerPlaceholder.info; 
	}
	else if(language === 1){
		outputTowerStats.innerHTML += "<br>Cout: " + towerPlaceholder.cost;
		outputTowerStats.innerHTML += "<br>Dommage: " + towerPlaceholder.damage;
		outputTowerStats.innerHTML += "<br>Gamme: " + towerPlaceholder.range;
		outputTowerStats.innerHTML += "<br>Vitesse d'Attaque: " + towerPlaceholder.attackSpeed + " (Temps de Rechargement)";
		outputTowerStats.innerHTML += "<br>" + towerPlaceholder.info; 
	}
	else if(language === 2){
		outputTowerStats.innerHTML += "<br>Costo: " + towerPlaceholder.cost;
		outputTowerStats.innerHTML += "<br>Danar: " + towerPlaceholder.damage;
		outputTowerStats.innerHTML += "<br>Distancia: " + towerPlaceholder.range;
		outputTowerStats.innerHTML += "<br>La Velocidad de Ataque: " + towerPlaceholder.attackSpeed + " (Tiempo de Recarga)";
		outputTowerStats.innerHTML += "<br>" + towerPlaceholder.info; 
	}
}

var cursorX;
var cursorY;
var circleCheck = false;

function resetCoord(){
	cursorX = undefined;
	cursorY = undefined;	
}

function boxStatus(){
	for (var i = 0; i <= towersOnBoard.length-1;i++){
		if (((cursorX >= towersOnBoard[i].xCoord) && (cursorX <= (towersOnBoard[i].xCoord+45))) && ((cursorY >= towersOnBoard[i].yCoord) && (cursorY <= (towersOnBoard[i].yCoord+45)))){
			if ((towersOnBoard[i].xCoord == tempX) && (towersOnBoard[i].yCoord == tempY)){
				if (towersOnBoard[i].boxBool == false){
					towersOnBoard[i].boxBool = true;
				}
				else{
					towersOnBoard[i].boxBool = false;
				}
			}
		}
	}
}

function drawBox(){
	if (towersOnBoard.length > 0){
		for (i = 0; i <= towersOnBoard.length-1;i++){
			if (towersOnBoard[i].boxBool == true){
				ctx.beginPath();
				ctx.moveTo(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord);
				ctx.lineTo(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord+15);
				ctx.moveTo(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord+30);
				ctx.lineTo(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord+45);
				ctx.lineTo(towersOnBoard[i].xCoord+15, towersOnBoard[i].yCoord+45);
				ctx.moveTo(towersOnBoard[i].xCoord+30, towersOnBoard[i].yCoord+45);
				ctx.lineTo(towersOnBoard[i].xCoord+45, towersOnBoard[i].yCoord+45);
				ctx.lineTo(towersOnBoard[i].xCoord+45, towersOnBoard[i].yCoord+30);
				ctx.moveTo(towersOnBoard[i].xCoord+45, towersOnBoard[i].yCoord+15);
				ctx.lineTo(towersOnBoard[i].xCoord+45, towersOnBoard[i].yCoord);
				ctx.lineTo(towersOnBoard[i].xCoord+30, towersOnBoard[i].yCoord);
				ctx.moveTo(towersOnBoard[i].xCoord+15, towersOnBoard[i].yCoord);
				ctx.lineTo(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord);
				ctx.lineWidth = 2.75;
				ctx.strokeStyle = "#f0ff00";
				ctx.stroke();
			}
		}
	}
}

function hoverCheck(){
	if (towersOnBoard.length > 0)
	{
		for (var i = 0; i <= (towersOnBoard.length-1); i++){
			if (((cursorX >= towersOnBoard[i].xCoord) && (cursorX <= (towersOnBoard[i].xCoord+45))) && ((cursorY >= towersOnBoard[i].yCoord) && (cursorY <= (towersOnBoard[i].yCoord+45)))){
				tempX = towersOnBoard[i].xCoord;
				tempY = towersOnBoard[i].yCoord;
				canvas.addEventListener ("click", boxStatus);
				ctx.beginPath();
				ctx.arc(towersOnBoard[i].xCoord+22.5, towersOnBoard[i].yCoord+22.5, towersOnBoard[i].range, 0, 2 * Math.PI);
				ctx.lineWidth = 2.75;
				ctx.strokeStyle = "#f0ff00";
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
	nextWave();
	towerAvailable();
	render();
}

//Update Game
function update(){
	
	if (inAWave) {
		HTMLBTN_playTgl.style.pointerEvents = 'none';
		HTMLBTN_pauseButton.style.fill = '#626262';
	} else {
		HTMLBTN_playTgl.style.pointerEvents = 'auto';
		HTMLBTN_pauseButton.style.fill = '#e5e5e5';
	}
	if(language === 0){
		HTMLID_sellTowers.innerHTML = "Sell Towers";
		HTMLBTN_pauseTitle.innerHTML = "Paused";
		HTMLBTN_mainMenu.innerHTML = "Main Menu";
		outputPlayerStats.innerHTML = "<b>Health: </b>" + Hp;
		outputPlayerStats.innerHTML += "<br><b>Gold: </b>" + Gold;
		outputPlayerStats.innerHTML += "<br><b>Stage: </b>" + (currentStage + 1);
		outputPlayerStats.innerHTML += "<br><b>Wave: </b>" + (waveCounter + 1);
	}
	else if(language === 1){
		HTMLID_sellTowers.innerHTML = "Vendre la Tours";
		HTMLBTN_pauseTitle.innerHTML = "Pause";
		HTMLBTN_mainMenu.innerHTML = "Menu Principal";
		outputPlayerStats.innerHTML = "<b>Sante: </b>" + Hp;
		outputPlayerStats.innerHTML += "<br><b>Or: </b>" + Gold;
		outputPlayerStats.innerHTML += "<br><b>Niveau: </b>" + (currentStage + 1);
		outputPlayerStats.innerHTML += "<br><b>Vague: </b>" + (waveCounter + 1);
	}
	else if(language === 2){
		HTMLID_sellTowers.innerHTML = "Venders Torres";
		HTMLBTN_pauseTitle.innerHTML = "Pausa";
		HTMLBTN_mainMenu.innerHTML = "Menu principal";
		outputPlayerStats.innerHTML = "<b>Salud: </b>" + Hp;
		outputPlayerStats.innerHTML += "<br><b>Oro: </b>" + Gold;
		outputPlayerStats.innerHTML += "<br><b>Nivel: </b>" + (currentStage + 1);
		outputPlayerStats.innerHTML += "<br><b>Ola: </b>" + (waveCounter + 1);
	}

	outputGameMessage.innerHTML = gameMessage;
	outputStageName.innerHTML = stages[currentStage];

	if(Hp <= 0){
		if (language === 0){
			gameMessage = "Game Over. You got rekt by your nightmares and peed your pants.";
		}
		else if (language === 1){
			gameMessage = "Jeu termine. Tu as battu par vos cauchemars et pisse votre pantalon.";
		}
		else if (language === 2){
			gameMessage = "Juego terminado. Usted consiguio golpeado por sus pesadillas y orino en los pantalones.";
		}
		gameOver();
	}
	
	if (enemiesOnBoard.length == 0 || (currentStage == 0 && waveCounter == 0)){
		awardGoldOverTime = false;
	}
	else if (enemiesOnBoard.length > 0 && !pause){
		awardGoldOverTime = true;
	}
	if ( enemiesOnBoard.length === 0 ) {
		setTimeout( nextWave, 5000 );
	}
}


function render(){
	requestID = requestAnimationFrame(render);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	renderLampCheck();
	renderTowerAndBullet();
	renderEnemyMovement();	
	drawRange();
	hoverCheck();
	stageWin();
	drawBox();
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
		
		if (enemiesOnBoard[i] instanceof bigBoss || enemiesOnBoard[i] instanceof bigBlob || enemiesOnBoard[i] instanceof grizzlyBear) {
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-30, 55, 60);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-28, enemiesOnBoard[i].yCoord-35, (55 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else if (enemiesOnBoard[i] instanceof bigRoach) {
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-30, enemiesOnBoard[i].yCoord-32, 55, 70);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-30, enemiesOnBoard[i].yCoord-37, (55 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else if (enemiesOnBoard[i] instanceof redDemon) {
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-20, enemiesOnBoard[i].yCoord-29, 35, 60);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-20, enemiesOnBoard[i].yCoord-34, (35 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else if (enemiesOnBoard[i] instanceof blueDemon) {
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-20, enemiesOnBoard[i].yCoord-29, 45, 60);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-20, enemiesOnBoard[i].yCoord-34, (45 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
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
		else if (enemiesOnBoard[i] instanceof ghost) {
			enemyImgToPrint.src = '../images/ghost.png';
			if (enemiesOnBoard[i].isVisible == false) {
				ctx.save();
				ctx.globalAlpha = '0.3';
				ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
				ctx.restore();
				ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
			}
			else{
				ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-15, 25, 32);
				//draw health bar
				ctx.fillRect(enemiesOnBoard[i].xCoord-13, enemiesOnBoard[i].yCoord-20, (25 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
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
		else if (enemiesOnBoard[i] instanceof witch){
			enemyImgToPrint.src = '../images/' + enemiesOnBoard[i].constructor.name + '.png';
			ctx.drawImage(enemyImgToPrint, enemiesOnBoard[i].xCoord-15, enemiesOnBoard[i].yCoord-17, 43, 36);
			//draw health bar
			ctx.fillRect(enemiesOnBoard[i].xCoord-15, enemiesOnBoard[i].yCoord-22, (43 * (enemiesOnBoard[i].health / enemiesOnBoard[i].startHealth)), 5);
		}
		else {
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

		if (!(towersOnBoard[i] instanceof lamp)) {
			towerImg.src = '../images/' + towersOnBoard[i].constructor.name + '.png';
			//when there are no enemies on board, undefined parameters will be passed in to rotateTower. this if is to check and prevent it from passing through
			if (!(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === undefined) && !(enemiesOnBoard[(towersOnBoard[i].targetIndice)] === -1)) {
				ang = rotateTower(towersOnBoard[i].xCoord, towersOnBoard[i].yCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].xCoord, enemiesOnBoard[(towersOnBoard[i].targetIndice)].yCoord);
			} else {
				ang = 720;
			}	

			if(towersOnBoard[i] instanceof actionFigure || towersOnBoard[i] instanceof blenderDefender || towersOnBoard[i] instanceof trophy || towersOnBoard[i] instanceof calculator){
				ang = 720;
			}
			//if tower is shooting then push new bullet to towersOnBoard.bulletArr[]
			if (towersOnBoard[i].isShooting === 1) {
				towersOnBoard[i].isShooting++;
				towersOnBoard[i].bullet();
			}
			
			if(towersOnBoard[i] instanceof marbleShooter){
				bulletImg.src = '../images/marble.png';
			}
			else if(towersOnBoard[i] instanceof toyCarLauncher){
				bulletImg.src = '../images/toycar.png';
			}
			else if(towersOnBoard[i] instanceof waterGun){
				bulletImg.src = "../images/water.png";
			}
			else if(towersOnBoard[i] instanceof nutsAndBolts){
				bulletImg.src = '../images/bolt.png';
			}
			else if(towersOnBoard[i] instanceof toaster){
				bulletImg.src = '../images/toast.png';
			}
			else if(towersOnBoard[i] instanceof airplaneLauncher){
				bulletImg.src = '../images/paperPlane.png';
			}
			else if(towersOnBoard[i] instanceof vanquishEvil){
				bulletImg.src = '../images/teddyBear.png';
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
					if (towersOnBoard[i] instanceof vanquishEvil){
						ctx.drawImage(bulletImg, 0, -(towersOnBoard[i].bulletArr[b].trajectory), 30, 30);
					}
					else {
						ctx.drawImage(bulletImg, 0, -(towersOnBoard[i].bulletArr[b].trajectory), 15, 15);
					}
					towersOnBoard[i].lastAngState = ang;
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
				ctx.rotate( Math.PI / 180 * towersOnBoard[i].lastAngState );
			}
			ctx.drawImage(towerImg, -towerImg.width/2, -towerImg.height/2);
			ctx.restore();
		}
	}
}

function drawRange() {
	if (circleCheck === true) {
		ctx.beginPath();
		ctx.arc(cursorX+22.5, cursorY+22.5, tempRange, 0, 2 * Math.PI);
		ctx.lineWidth = 2.75;
		ctx.strokeStyle = "#f0ff00";
		ctx.stroke();
	}
}
// end of render section -------------------------------------------------------------------------------

var bossSpawned = false; //Checks to see if boss has spawned 

//Checks if player has beat the current stage
function stageWin() {
	var bActive = false; //If boss is on map, turns to true
	for(var i = 0; i < enemiesOnBoard.length; i++) {
		if (enemiesOnBoard[i] instanceof bigBoss || enemiesOnBoard[i] instanceof bigBlob || enemiesOnBoard[i] instanceof bigRoach || enemiesOnBoard[i] instanceof grimReaper) {
			if (bossSpawned == false){
				if (language === 0){
					gameMessage = "BOSS INCOMING! YOU HAVE TO STOP HIM!";
				}
				else if (language === 1){
					gameMessage = "PATRON ENTRANT! VOUS DEVEZ ARRÊTER LUI!";
				}
				else if (language === 2){
					gameMessage = "ENTRANTE JEFE! USTED TIENE QUE PARAR EL!";
				}
			}
			bActive = true;
			break;
		} 	
	}
	
	if (bActive == true) {
		bossSpawned = true;
	}
	
	if (bActive == false && bossSpawned == true && Hp > 0 && enemiesOnBoard.length == 0 && currentStage == 3) {
		if (language === 0){
					gameMessage = "STAGE COMPLETE!";
				}
				else if (language === 1){
					gameMessage = "COMPLETE DE LA SCENE!";
				}
				else if (language === 2){
					gameMessage = "ETAPA COMPLETA!";
				}
		cancelAnimationFrame(requestID);
		requestID = undefined;
		ctx.drawImage(stageTransition, 0, 0);
		setTimeout(function(){ 
			gameWin();
		}, 4000);
	}
	else if (bActive == false && bossSpawned == true && Hp > 0 && enemiesOnBoard.length == 0) {
		if (language === 0){
			gameMessage = "STAGE COMPLETE!";
		}
		else if (language === 1){
			gameMessage = "COMPLETE DE LA SCENE!";
		}
		else if (language === 2){
			gameMessage = "ETAPA COMPLETA!";
		}
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
stageWave[0][0] = ["sensei"];
stageWave[0][1] = ["basicSkeleton", "basicSkeleton", "blueSkeleton"];
stageWave[0][2] = ["basicSkeleton", "basicSkeleton","basicSkeleton", "blueSkeleton", "basicSkeleton", "redSkeleton"];
stageWave[0][3] = ["redSkeleton", "basicSkeleton", "basicSkeleton", "blueSkeleton", "basicSkeleton", "basicSkeleton", "redSkeleton", 				   "basicSkeleton"];
stageWave[0][4] = ["redSkeleton", "redSkeleton", "redSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", 					"basicSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton"];
stageWave[0][5] = ["blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "blueSkeleton", 					"blueSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", 					 "redSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton", "blueSkeleton", 					 "blueSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[0][6] = ["basicSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton", "basicSkeleton", "blueSkeleton", "blueSkeleton", 				  "redSkeleton", "basicSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton", "basicSkeleton", "blueSkeleton", 					"blueSkeleton", "redSkeleton", "basicSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton", "basicSkeleton", 				  "blueSkeleton", "blueSkeleton", "redSkeleton", "basicSkeleton", "blueSkeleton", "blueSkeleton", "redSkeleton"];
stageWave[0][7] = ["basicSkeleton", "basicSkeleton", "redSkeleton", "basicSkeleton", "basicSkeleton", "redSkeleton", "basicSkeleton", 					"basicSkeleton", "basicSkeleton", "basicSkeleton", "redSkeleton", "basicSkeleton", "basicSkeleton", "redSkeleton", 					 "basicSkeleton", "basicSkeleton", "redSkeleton", "basicSkeleton", "basicSkeleton", "redSkeleton", "redSkeleton",
				   "basicSkeleton", "basicSkeleton", "redSkeleton", "basicSkeleton", "basicSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton"];
stageWave[0][8] = ["redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", 					 "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", 				   "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", 					 "redSkeleton", "redSkeleton", "redSkeleton"];
stageWave[0][9] = ["bigBoss"];

//Stage 2
stageWave[1][0] = ["ghost"];
stageWave[1][1] = ["redSkeleton", "basicSkeleton", "bat"];
stageWave[1][2] = ["blueSkeleton", "ghost", "basicSkeleton", "blueSkeleton", "ghost", "blueSkeleton", "ghost"];
stageWave[1][3] = ["blueSkeleton", "bat", "ghost", "blueSkeleton", "redSkeleton", "bat", "bat", "ghost", "blob"];
stageWave[1][4] = ["redSkeleton", "redSkeleton", "blueSkeleton", "ghost", "blob", "blob", "ghost", "blueSkeleton", "blob", "redSkeleton", 					"bat", "redSkeleton", "blueSkeleton", "ghost"];
stageWave[1][5] = ["ghost", "redSkeleton", "ghost", "ghost", "blueSkeleton", "ghost", "ghost", "basicSkeleton", "ghost", "ghost", "bat", 				   "ghost", "ghost", "blob", "ghost", "ghost", "blueSkeleton", "ghost", "ghost", "ghost", "ghost", "ghost", "ghost", 				   "ghost", "ghost", "ghost","ghost", "ghost"];
stageWave[1][6] = ["basicSkeleton", "basicSkeleton", "blob", "basicSkeleton", "blueSkeleton", "blob", "basicSkeleton", "redSkeleton", 					"blob", "basicSkeleton", "basicSkeleton", "blob", "basicSkeleton", "blueSkeleton", "blob", "basicSkeleton", 				  "redSkeleton", "blob"];
stageWave[1][7] = ["bat", "bat", "bat", "blueSkeleton", "redSkeleton", "redSkeleton", "redSkeleton", "bat", "bat", "bat", "blueSkeleton", 					"redSkeleton", "redSkeleton", "redSkeleton", "bat", "bat", "bat", "blueSkeleton", "redSkeleton", "redSkeleton", 				  "redSkeleton"];
stageWave[1][8] = ["blob", "blob", "blob", "bat", "blob", "blob", "blob", "bat", "blob", "blob", "blob", "bat", "blob", "blob", "blob", 				  "bat", "blob", "blob", "blob", "bat"];
stageWave[1][9] = ["bigBlob"];

//Stage 3
stageWave[2][0] = ["basicSkeleton", "basicSkeleton", "blueSkeleton", "ghost"];
stageWave[2][1] = ["redSkeleton", "ghost", "bat"];
stageWave[2][2] = ["grizzlyBear"];
stageWave[2][3] = ["grizzlyBear", "blob", "blueSkeleton", "basicSkeleton", "basicSkeleton", "clown"];
stageWave[2][4] = ["ghost", "blueSkeleton", "redSkeleton", "ghost", "grizzlyBear", "bat", "clown", "redSkeleton", "blob", "grizzlyBear", 				   "bat", "blueSkeleton"];
stageWave[2][5] = ["grizzlyBear", "bat", "blob", "blob", "ghost", "redSkeleton", "clown", "grizzlyBear", "bat", "blob", "blob", "ghost", 				   "redSkeleton", "clown", "grizzlyBear", "bat", "blob", "blob", "ghost", "redSkeleton", "clown"];
stageWave[2][6] = ["ghost", "bat", "clown", "redSkeleton", "blueSkeleton", "blob", "grizzlyBear", "blob", "clown", "blob", "ghost", "bat", 					 "basicSkeleton", "basicSkeleton", "basicSkeleton", "blob", "ghost", "bat", "grizzlyBear", "bat", "clown", "redSkeleton"  				  ,"redSkeleton", "clown", "clown"];
stageWave[2][7] = ["ghost", "ghost", "ghost", "ghost", "ghost", "blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton", 				  "blueSkeleton", "grizzlyBear", "grizzlyBear", "blob", "blob", "blob", "bat", "bat", "bat", "blueSkeleton", 				   "blueSkeleton", "blueSkeleton", "blueSkeleton", "blueSkeleton"];
stageWave[2][8] = ["grizzlyBear", "grizzlyBear", "grizzlyBear", "clown", "grizzlyBear", "grizzlyBear", "grizzlyBear", "grizzlyBear", 				   "grizzlyBear", "clown", "clown", "clown", ];
stageWave[2][9] = ["bigRoach, bigRoach", "bigRoach", "bigRoach", "bigRoach"];

//Stage 4
stageWave[3][0] = ["witch"];
stageWave[3][1] = ["witch", "redSkeleton", "redSkeleton", "witch"];
stageWave[3][2] = ["basicSkeleton", "blueSkeleton", "blob", "witch", "clown", "basicSkeleton", "ghost", "ghost"];
stageWave[3][3] = ["blueDemon", "blueSkeleton"];
stageWave[3][4] = ["ghost", "witch", "bat", "witch", "ghost","witch", "bat", "witch", "ghost", "witch", "bat", "witch", "ghost", "redDemon"						];
stageWave[3][5] = ["grizzlyBear", "witch", "witch", "redSkeleton", "blob", "clown", "blueDemon"];
stageWave[3][6] = ["clown", "grizzlyBear", "blob", "blob", "blob", "witch", "witch", "grizzlyBear", "redSkeleton", "blueSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "basicSkeleton", "redDemon"];
stageWave[3][7] = ["grizzlyBear", "grizzlyBear", "blob", "grizzlyBear", "blob", "bat", "bat", "bat", "clown", "bat", "redSkeleton", "basicSkeleton", "blueSkeleton", "ghost", "redDemon", "redDemon", "redSkeleton"];
stageWave[3][8] = ["basicSkeleton", "blueSkeleton", "redSkeleton", "ghost", "bat", "blob", "clown", "grizzlyBear", "blueDemon", "redDemon", "grizzlyBear", "basicSkeleton", "blueSkeleton", "redSkeleton", "ghost", "bat", "blob", "clown", "grizzlyBear", "blueDemon", "redDemon", "blob", "blob"];
stageWave[3][9] = ["grimReaper"];

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

function renderPauseUI() {
	
	requestID_PAUSE = requestAnimationFrame(renderPauseUI);
	
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "rgba(0,0,0, 0.3)";
	ctx.fillRect(0,0, canvas.width, canvas.height);

}

document.addEventListener( "visibilitychange", function() { 
	if (document.hidden || !document.hidden) {
		pauseGame();
	}
} );
function pauseGame(){
	if(!pause) {
		bkgAudio.volume = 0.2;
		HTMLBTN_playTgl.innerHTML = SVG_play;

		for (var i = 0; i < towersOnBoard.length; i++){
			clearInterval(towersOnBoard[i].attackEnemy);
		}
		for (var i = 0; i < enemiesOnBoard.length; i++){
			clearInterval(enemiesOnBoard[i].enemyNextMove);
		}
		awardGoldOverTime = false;
		cancelAnimationFrame(requestID);
		requestID = undefined;
		renderPauseUI();
		
		HTMLID_pauseUI.style.animation = "animation-pause-window 1s";
		HTMLID_pauseUI.style.animationFillMode = "forwards";
		pause = true;
	}
	else {
		bkgAudio.volume = 1;
		HTMLBTN_playTgl.innerHTML = SVG_pause;

		for (var i = 0; i < towersOnBoard.length; i++){
			towersOnBoard[i].attack(towersOnBoard[i], towersOnBoard[i].constructor.name);
		}
		for (var i = 0; i < enemiesOnBoard.length; i++){
			enemiesOnBoard[i].enemyMovement(enemiesOnBoard[i], enemiesOnBoard[i].constructor.name);
		}
		awardGoldOverTime = true;
		cancelAnimationFrame(requestID_PAUSE);
		requestID_PAUSE = undefined;

		HTMLID_pauseUI.style.animation = "animation-pause-window-reverse 1s";
		HTMLID_pauseUI.style.animationFillMode = "forwards";
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
		HTMLID_toaster.className = "disabledTower";
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
		HTMLID_toaster.className = "enabledTower";
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
		HTMLID_toaster.className = "enabledTower";
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
							HTMLID_toaster.className = "disabledTower";
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

function sellTowers() {
	//HTMLID_btnSell.style.display = "none";
	//Small bugfix needed for when indice out of range
	for (var i=towersOnBoard.length-1; i => 0;i--){
		if (towersOnBoard[i].boxBool == true){
			numOfTowers--;
			Gold += Math.round(towersOnBoard[i].cost/2);
			towerLocationsByPixelPosition.splice(i, 1);
			clearInterval(towersOnBoard[i].attackEnemy);
			towersOnBoard.splice(i,1);
		}
	}
}
