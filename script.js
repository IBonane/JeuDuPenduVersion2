//desactivation du div input and winnerDiv
$("#nameWinnerInputDiv").hide();
$("#simpleWinner").hide();
$("#bestWinner").hide();

///////////////////////////////////////////////////////////////////
//localStorage.clear();
let motRandom = "";
console.log(motRandom+" length = "+word.length);

const newWordGenerator = () =>{
    let index = Math.floor(Math.random() * word.length);
    motRandom = word[index].toUpperCase();
}
////////////////////////////////////////////////////////////////////
//création et initialisation du tableau de nom des touches
let nameButton = [];

const copyAlphabet = () =>{
    for(let index = 0; index < alphabet.length; index++){
        nameButton[index] = alphabet[index];
    }
}

////////////////////////////////////////////////////////////////
//Création des touche A,B,C....Z
const generateKeyPlaying = () =>{
    copyAlphabet();
    for(let index = 0; index < alphabet.length; index++){
        nameButton[index] = $('<button>').text(alphabet[index].toLocaleUpperCase());
        nameButton[index].attr('id', alphabet[index]);
        nameButton[index].attr('class', 'alphabetKey');
        $("#toucheAlphabet").append(nameButton[index]);
    }
}

/////////////////////////////////////////////////////////////////////////////
//Création du tableau html des meilleurs scores
const generateTableWinner = () =>{

    let tableofBetter = $("<table>");

    let thead = $("<thead>");
    let trh = $("<tr>");
    let tdh1 = $("<td>").text("Ranking");
    let tdh2 = $("<td>").text("Name");
    let tdh3 = $("<td>").text("nbPenality");
    let tdh4 = $("<td>").text("gameTime");

    thead.append(trh.append(tdh1, tdh2, tdh3, tdh4));

    let tbody = $("<tbody>");

    for(let index = 0; index < 10; index++){
        let tr = $("<tr>");
        tr.attr("id", "tr"+index);

        let td1 = $("<td>").text(index+1);
        let td2 = $("<td>").text("-");
        let td3 = $("<td>").text("-");
        let td4 = $("<td>").text("-");
        tbody.append(tr.append(td1, td2, td3, td4));
    }
    $("#tableBestWin").append(tableofBetter.append(thead, tbody));
    tableofBetter.css('text-align', 'center');
}
/////////////////////////////////////////////////////////////////////////////////////////////
//declaration de variables
let letter, nbChange = 10, wordUser = [], lettreOk, countLetter = 0, nbPenality = 0;
let beginGameTime, endGameTime, timePlaying;
let nameButtonPlay = $("#play");
let buttonLetter = $('button');
let letterWinDisable;
let indexCanvaDuPendus = 0;

/////////////////////////////////////////////////////////////////////////////
//initialisation du tableau des meilleurs vainqueurs
function playerWin(){
    this.name="";
    this.penality=10000;
    this.time=10000;
} 
//tableau stockant le nom des 10 meilleures score
let bestPlayer = [];
//initialisation du tableau
for (let i=0;i<10;i++)     
    bestPlayer[i] = new playerWin();

console.log(bestPlayer);

//////////////////////////////////////////////////////////////
//initialisation du mot avec des "_"
const initWordUser = () =>{
    for(let index=0; index < motRandom.length; index++)
        wordUser[index]= "_"
    console.log(wordUser.join(" "));
}
/////////////////////////////////////////////////////////////
//generation du tableau des meilleurs au debut
generateTableWinner();
generateKeyPlaying();
//////////////////////////////////////////////////////////////
//programme principal
$(document).ready(function(){
    //hideCanva
    $(".hideCanva").hide();
    //debut du temps de jeu
    beginGameTime = new Date();
    nbChange = 5;
    wordUser = [];
    //countLetter = 0;
    letter="";
    nbPenality = 0;
    console.log("word utili : "+wordUser);
    $('button').attr("disabled", false);
        
    nameButtonPlay.text("Essayer un autre mot");
    $("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>');
    newWordGenerator();
    initWordUser();
    console.log(motRandom+" length = "+word.length);
    $("#hiddenWord").text(wordUser.join(" "));
    $(".alphabetKey").click(function(){
        letter = this.id.toUpperCase();
        letterWinDisable = $(this);
        console.log("lettre : "+letter);
        letterWinDisable.attr("disabled", true);
        letterWinDisable.css("background-color", "red");
        letterWinDisable.css("color", "white");
        verifieLettre();
        
    });   
});
//////////////////////////////////////////////////////////////////////////////
//verification de la lettre
const verifieLettre = () => {
    
    lettreOk = false;
    for(let index=0; index < motRandom.length; index++){
        if(letter == motRandom[index]){
            letterWinDisable.css("background-color", "green");
            console.log("index : "+index+" : "+motRandom[index]);
            wordUser[index] = motRandom[index];
            lettreOk = true;
            $("#hiddenWord").text(wordUser.join(" "));
        }           
    }
    console.log("lettre ok : "+lettreOk);
    console.log("lettre compte = "+countLetter+" = "+motRandom.length);
    if(lettreOk == false){
        $("."+canvaDuPendus[indexCanvaDuPendus]).show();
        indexCanvaDuPendus++;
        nbChange--;
        nbPenality++;
        console.log("nb change "+nbChange);
        $("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>');
    }
    console.log("user word "+wordUser.join(" "));
    statuJeu();    
}
///////////////////////////////////////////////////////////////////////////////////
//verification du statut du joueur : win or lost
const statuJeu = () =>{
    if (nbChange==0){
        console.log("perdu !"+"\n"+"C'était : "+motRandom);
        $("#message").html('<h4>'+"Dommage, vous avez ratez !\nC'était : "+'<span style="color: blue">'+motRandom+'</span>'+'</h4>');
        $(".alphabetKey").attr("disabled", true);
        return false;
    }
    if(wordUser.join("")==motRandom){
        //fin du temps de jeu et calcul du temps de jeu du vainqueur
        timePlaying = Math.round((new Date() - beginGameTime.getTime())/1000);

        $("#penduLost").hide();

        console.log("gagné !");
        $(".alphabetKey").attr("disabled", true);
        if(nbPenality <= bestPlayer[9].penality){

            $("#bestWinner").show();
            $("#message").html('<h4 id="centerMsg">'+'Bravo, vous avez trouvez ! <br/>vous faites parties des 10 meilleurs performances'+'</h4>');
            tenBestWinner();
        }

        else {
            $("#simpleWinner").show();
            $("#message").html('<h4 id="centerMsg">'+'Bravo, vous avez trouvez ! <br/>Mais, dommage vous ne faites pas parties des 10 meilleurs.'+
                                '<br/><span>nbPenalités = '+nbPenality+' | temps de jeu = '+timePlaying+'</span></h4>');
        }

        return true;
    }
}
/////////////////////////////////////////////////////////////////////////////////////
//recupération du nom du gagnant et ajout dans le tableau des 10 meilleurs
const tenBestWinner = () =>{
    //activation du div input
    $("#nameWinnerInputDiv").show();

    $("#nameWinnerInput").change(function(){

        bestPlayer[9].name = $("#nameWinnerInput").val();
        bestPlayer[9].penality = nbPenality;
        bestPlayer[9].time = timePlaying;
        
        console.log("Winner : "+bestPlayer[9].name);
        console.log("penality : "+bestPlayer[9].penality);
        console.log("time : "+bestPlayer[9].time);

        $("#nameWinnerInput").val(""); 
        $("#nameWinnerInputDiv").hide();

        //trie du tableau
        bestPlayer.sort(function(a, b){
            if(a.penality == b.penality)
                return a.time - b.time;
            return a.penality - b.penality;
        });

        displayTenBestWinner();
        localStorage["savePerson"] = JSON.stringify(bestPlayer);
        
        
    });        
}
/////////////////////////////////////////////////////////////////////////////////////////
const displayTenBestWinner = ()=>{
    //affichage du tableau des 10 meilleurs scores
    for(let i=0; i<bestPlayer.length; i++)
        if(bestPlayer[i].name !="")
            $("#tr"+i).html('<td>'+(i+1)+'</td><td>'+bestPlayer[i].name+'</td><td>'+bestPlayer[i].penality+'</td><td>'+bestPlayer[i].time+'</td>'); 
}

//////////////////////////////////////////////////////////
//chargement du tableau meilleurs
if(localStorage["savePerson"]!=undefined){
    bestPlayer = JSON.parse(localStorage["savePerson"]);
    displayTenBestWinner();
}

//////////////////////////////////////////////////////////////
//rechargement de la page
$("#play").click(function(){
    location.reload(true);
});
