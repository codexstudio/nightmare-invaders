// bestiary ---------------------------------------------------

var HTMLID_outputEnemyStats = document.getElementById("outBox");
var HTMLID_basicSkeleton = document.getElementById("basicSkeleton");
var HTMLID_blueSkeleton = document.getElementById("blueSkeleton");
var HTMLID_redSkeleton = document.getElementById("redSkeleton");
var HTMLID_bat = document.getElementById("bat");
var HTMLID_vampire = document.getElementById("vampire");
var HTMLID_witch = document.getElementById("witch");
var HTMLID_ghost = document.getElementById("ghost");
var HTMLID_clown = document.getElementById("clown");
var HTMLID_bigRoach = document.getElementById("bigRoach");
var HTMLID_blob = document.getElementById("blob");
var HTMLID_blueDemon = document.getElementById("blueDemon");
var HTMLID_redDemon = document.getElementById("redDemon");
var HTMLID_zombieDad = document.getElementById("zombieDad");
var HTMLID_zombieMom = document.getElementById("zombieMom");
var HTMLID_bigBoss = document.getElementById("bigBoss");
var HTMLID_grizzlyBear = document.getElementById("grizzlyBear");
var HTMLID_bigBlob = document.getElementById("bigBlob");
var HTMLID_grimReaper = document.getElementById("grimReaper");

// bestiary on hover

HTMLID_basicSkeleton.addEventListener( "mouseover", function() { getBeastStats('basicSkeleton'); });
HTMLID_blueSkeleton.addEventListener( "mouseover", function() { getBeastStats('blueSkeleton'); });
HTMLID_redSkeleton.addEventListener( "mouseover", function() { getBeastStats('redSkeleton'); });
HTMLID_bat.addEventListener( "mouseover", function() { getBeastStats('bat'); });
HTMLID_vampire.addEventListener( "mouseover", function() { getBeastStats('vampire'); });
HTMLID_witch.addEventListener( "mouseover", function() { getBeastStats('witch'); });
HTMLID_ghost.addEventListener( "mouseover", function() { getBeastStats('ghost'); });
HTMLID_clown.addEventListener( "mouseover", function() { getBeastStats('clown'); });
HTMLID_bigRoach.addEventListener( "mouseover", function() { getBeastStats('bigRoach'); });
HTMLID_blob.addEventListener( "mouseover", function() { getBeastStats('blob'); });
HTMLID_blueDemon.addEventListener( "mouseover", function() { getBeastStats('blueDemon'); });
HTMLID_redDemon.addEventListener( "mouseover", function() { getBeastStats('redDemon'); });
HTMLID_zombieDad.addEventListener( "mouseover", function() { getBeastStats('zombieDad'); });
HTMLID_zombieMom.addEventListener( "mouseover", function() { getBeastStats('zombieMom'); });
HTMLID_grizzlyBear.addEventListener( "mouseover", function() { getBeastStats('grizzlyBear'); });
HTMLID_bigBoss.addEventListener( "mouseover", function() { getBeastStats('bigBoss'); });
HTMLID_bigBlob.addEventListener( "mouseover", function() { getBeastStats('bigBlob'); });
HTMLID_grimReaper.addEventListener( "mouseover", function() { getBeastStats('grimReaper'); });

function getBeastStats(enemy) {
	
	switch (enemy) {
		case "basicSkeleton":
			HTMLID_outputEnemyStats.innerHTML = "Basic Skeleton:<br> Normal speed and normal health, plus easier to kill. Something you don't want to find in your closet. "; break;
		case "blueSkeleton":
			HTMLID_outputEnemyStats.innerHTML = "Blue Skeleton:<br> Fragile and fast. Would beat you in a 100m dash. "; break;
		case "redSkeleton":
			HTMLID_outputEnemyStats.innerHTML = "Red Skeleton:<br> Tanky and slow. Can give Rocky a run for his money. "; break;
		case "bat":
			HTMLID_outputEnemyStats.innerHTML = "Bat:<br> Fast when a bat and slow when a vampire. "; break;
		case "vampire":
			HTMLID_outputEnemyStats.innerHTML = "Vampire:<br> Slow when a vampire and fast when a bat. His name is not Edward though. "; break;
		case "witch":
			HTMLID_outputEnemyStats.innerHTML = "Witch:<br> Steals the option to buy a tower. Might live in a candy house. "; break;
		case "ghost":
			HTMLID_outputEnemyStats.innerHTML = "Ghost:<br> Invisible to other towers unless it comes into contact with the light. Who you gonna call?"; break;
		case "clown":
			HTMLID_outputEnemyStats.innerHTML = "Clown:<br> Steal a fraction of your gold. Don't invite him to your kids birthday party."; break;
		case "bigRoach":
			HTMLID_outputEnemyStats.innerHTML = "Big Roach:<br> Kill one and another one shows up. Cockroaches are immune to nuclear radiation. "; break;
		case "blob":
			HTMLID_outputEnemyStats.innerHTML = "Blob:<br> Splits into three mini blobs. "; break;
		case "blueDemon":
			HTMLID_outputEnemyStats.innerHTML = "Blue Demon:<br> Really fast and decreases your health to one upon escaping. He loves the song I'm blue da bu de da bu da. "; break;
		case "redDemon":
			HTMLID_outputEnemyStats.innerHTML = "Red Demon:<br> Very tanky and very slow, plus he decreases your health to one upon escaping. Didn't star in little Nicky. "; break;
		case "zombieDad":
			HTMLID_outputEnemyStats.innerHTML = "Zombie Dad:<br> He's your dad but dead. Buhh. "; break;
		case "zombieMom":
			HTMLID_outputEnemyStats.innerHTML = "Zombie Mom:<br> She's your mom but dead. Buhh. "; break;	
		case "bigBoss":
			HTMLID_outputEnemyStats.innerHTML = "Big Boss:<br> He is a skeleton but better. "; break;
		case "grizzlyBear":
			HTMLID_outputEnemyStats.innerHTML = "Grizzly Bear:<br> Stronger than your basic enemy. Thank grizzly for Leo's Oscar. "; break;
		case "bigBlob":
			HTMLID_outputEnemyStats.innerHTML = "Big Blob:<br> Splits into to three normal blobs. Ughhh so annoying. "; break;			
		case "grimReaper":
			HTMLID_outputEnemyStats.innerHTML = "Grim Reaper:<br> Phase 1 he spawns a zombie form of mom and dad, beware! Phase 2 he gives the kid a change to run along the path to his parents, but the towers on board target him. "; break;				
			 
	
	}
}