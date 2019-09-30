window.onload = function () {
    reset();
    $("button").on("click", fighter_selected);
};

var availableFighters = true;
var fighters = [{image_mini: "assets/images/ryu_mini.jpg",
                 image: "assets/images/ryu.jpg",
                 attack_power: 8,
                 live: 110,
                 status: true},
                {image_mini: "assets/images/zangief_mini.jpg",
                 image: "assets/images/zangief.jpg",
                 attack_power: 6,
                 live: 130,
                 status: true},
                {image_mini: "assets/images/guile_mini.jpg",
                 image: "assets/images/guile.jpg",
                 attack_power: 12,
                 live: 120,
                 status: true},
                {image_mini: "assets/images/bison_mini.jpg",
                 image: "assets/images/bison.jpg",
                 attack_power: 25,
                 live: 150,
                 status: true}];
var yourFighter = {image_mini: "",
                   image: "",
                   attack_power: 0,
                   live: 0,
                   level_attack_power: 0,
                   status: false,
                   selected: false,
                   position: 0
                  };
var enemySelected = {image_mini: "",
                     image: "",
                     attack_power: 0,
                     live: 0,
                     level_attack_power: 0,
                     status: false,
                     selected: false,
                     position: 0};
                 
function reset() {
    enemySelected.image_mini = "";
    enemySelected.image = "";
    enemySelected.attack_power = 0;
    enemySelected.live = 0;
    enemySelected.level_attack_power = 0;
    enemySelected.status = false;
    enemySelected.selected = false;
    enemySelected.position = 0;
    yourFighter.image_mini = "";
    yourFighter.image = "";
    yourFighter.attack_power = 0;
    yourFighter.live = 0;
    yourFighter.level_attack_power = 0;
    yourFighter.status = false;
    yourFighter.selected = false;
    yourFighter.position = 0;
    $("#attack").text("Attack");
    $("#yourLive").text("");
    $("#yourDamage").text("");
    $("#liveEnemy").text("");
    $("#damageEnemy").text("");
    for (var i = 0; i < fighters.length; i++) {
         fighters[i].status = true;
    }
    putImages();
}

function putImages() {
    $("#enemy").hide();
    $("#mainMessage").text("Choose another Enemy");
    $("#attackButton").hide();
    availableFighters = false;
    if (!yourFighter.status){
        $("#yourFighter").hide();
        $("#mainMessage").text("Choose your fighter");    
        $("#characters").show();
    }
    for (var i = 0; i < fighters.length; i++) {
        if (fighters[i].status){
            availableFighters = true;
            $("#button"+(i+1)).show();
            $("#button"+(i+1)).css("background","url(\""+fighters[i].image_mini+"\")");
            $("#button"+(i+1)).css("background-repeat","no-repeat");
            $("#button"+(i+1)).css("background-position","50%");
            $("#button"+(i+1)).css("background-size","contain");
            $("#button"+(i+1)).css("background-color","rbg(0,1,119)");
        }
        else{
            $("#button"+(i+1)).hide();
        }
    }

    if(!availableFighters){
        console.log("entro a reiniciar");
        $("#attack").text("Restart");
        $("#mainMessage").text("");
        $("#characters").hide();
        $("#attackButton").show();
    }
}

function fighter_selected(){

    if ($("#attack").text() === "Restart"){
        reset();
        return;
    }
    
    if (!yourFighter.selected){
       yourFighter.image_mini = fighters[this.id.replace("button","")-1].image_mini;
       yourFighter.image = fighters[this.id.replace("button","")-1].image;
       yourFighter.attack_power = fighters[this.id.replace("button","")-1].attack_power;
       yourFighter.level = fighters[this.id.replace("button","")-1].level;
       yourFighter.live = fighters[this.id.replace("button","")-1].live;
       yourFighter.status = true;
       yourFighter.selected = true;
       yourFighter.position = this.id.replace("button","")-1;
       fighters[this.id.replace("button","")-1].status = false;
       $("#"+this.id).hide();
       $("#yourFighter").attr("src",yourFighter.image);
       $("#yourFighter").show();
       $("#mainMessage").text("Choose your Enemy");
       $("#yourLive").text("Live: "+yourFighter.live);
   }
   else if(!enemySelected.selected) {
       enemySelected.image_mini = fighters[this.id.replace("button","")-1].image_mini;
       enemySelected.image = fighters[this.id.replace("button","")-1].image;
       enemySelected.attack_power = fighters[this.id.replace("button","")-1].attack_power;
       enemySelected.level = fighters[this.id.replace("button","")-1].level;
       enemySelected.live = fighters[this.id.replace("button","")-1].live;
       enemySelected.status = true;
       enemySelected.selected = true;
       enemySelected.position = this.id.replace("button","")-1;
       fighters[this.id.replace("button","")-1].status = false;
       $("#"+this.id).hide();
       $("#characters").hide();
       $("#attackButton").show();
       $("#enemy").attr("src",enemySelected.image);
       $("#enemy").show();
       $("#mainMessage").text("");
       $("#liveEnemy").text("Live: "+enemySelected.live);
       $("#damageEnemy").text("");
       $("#yourDamage").text("");
   }
   else if (yourFighter.selected && enemySelected.selected){
       
       if ($("#attack").text() === "Restart"){
           reset();
           return;
       }
       yourFighter.live = yourFighter.live - enemySelected.attack_power;
       $("#yourLive").text("Live: "+yourFighter.live);
       $("#yourDamage").text("Damage: "+enemySelected.attack_power);
       enemySelected.live = enemySelected.live - (yourFighter.level_attack_power+yourFighter.attack_power);
       $("#liveEnemy").text("Live: "+enemySelected.live);
       $("#damageEnemy").text("Damage: "+(yourFighter.level_attack_power+yourFighter.attack_power));
       yourFighter.level_attack_power = yourFighter.level_attack_power + yourFighter.attack_power;

       if (yourFighter.live <= 0 && enemySelected.live > 0){
           $("#yourLive").text("Live: 0");
           $("#yourDamage").text("You Loose!");
           $("#attack").text("Restart");
       }
       
       if (enemySelected.live <= 0 && yourFighter.live > 0){
           fighters[enemySelected.position].status = false;
           $("#yourDamage").text("You Win!");
           $("mainMessage").text("Choose your Enemy");
           $("#characters").show();
           enemySelected.image_mini = "";
           enemySelected.image = "";
           enemySelected.attack_power = 0;
           enemySelected.live = 0;
           enemySelected.level_attack_power = 0;
           enemySelected.status = false;
           enemySelected.selected = false;
           putImages();
       }

       if (yourFighter.live <= 0 && enemySelected.live <= 0){
           $("#yourLive").text("Live: 0");
           $("#liveEnemy").text("Live: 0");
           $("#yourDamage").text("Draw Game!");
           $("#attack").text("Restart");
       }
   }
}
