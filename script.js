//desactivation du div input
$("#nameWinnerInput").hide();


let motRandom = "";
console.log(motRandom+" length = "+word.length);

const newWordGenerator = () =>{
    let index = Math.floor(Math.random() * word.length);
    motRandom = word[index].toUpperCase();
}

//création et initialisation du tableau de nom des touches
let nameButton = [];
for(let index = 0; index < alphabet.length; index++){
    nameButton[index] = alphabet[index];
}


//Création des touche A,B,C....Z
for(let index = 0; index < alphabet.length; index++){
    nameButton[index] = $('<button>').text(nameButton[index].toLocaleUpperCase());
    nameButton[index].attr('id', alphabet[index]);
    $("#toucheAlphabet").append(nameButton[index]);
}

//Création du tableau des meilleurs scores
let tableofBetter = $("<table>");

let thead = $("<thead>");
let trh = $("<tr>");
let tdh1 = $("<td>").text("Ranking");
let tdh2 = $("<td>").text("Name");
let tdh3 = $("<td>").text("score");
let tdh4 = $("<td>").text("gameTime");

thead.append(trh.append(tdh1, tdh2, tdh3, tdh4));

let tbody = $("<tbody>");

for(let index = 0; index < 10; index++){
    let tr = $("<tr>");
    let td1 = $("<td>").text(index+1);
    let td2 = $("<td>").text("-------");
    let td3 = $("<td>").text("-------");
    let td4 = $("<td>").text("-------");
    tbody.append(tr.append(td1, td2, td3, td4));
}
$("#tableBestWin").append(tableofBetter.append(thead, tbody));
tableofBetter.css('text-align', 'center');


let letter, nbChange = 3, wordUser = [], lettreOk, countLetter = 0;

//initialisation du mot avec des "_"
const initWordUser = () =>{
    for(let index=0; index < motRandom.length; index++)
        wordUser[index]= "_"
    console.log(wordUser.join(" "));
}

let buttonLetter = $('button');


//programme principal
$(document).ready(function(){

    newWordGenerator();
    initWordUser();
    console.log(motRandom+" length = "+word.length);
    $("#hiddenWord").text(wordUser.join(" "));
    $('button[id]').click(function(){
            letter = this.id.toUpperCase();
            letterWinDisable = $(this);
            console.log("lettre : "+letter);
            verifieLettre();
    });   
});

//verification de la lettre
const verifieLettre = () => {
    lettreOk = 0;

    for(let index=0; index < motRandom.length; index++){
        if(letter == motRandom[index]){
            letterWinDisable.attr("disabled", true);
            console.log(index+" : "+motRandom[index]);
            wordUser[index] = motRandom[index];
            countLetter++;
            lettreOk += 1;
            $("#hiddenWord").text(wordUser.join(" "));
        }           
    }

    if(lettreOk == 0){
        nbChange--;
        console.log("nb change "+nbChange);
    }
    console.log("user word "+wordUser.join(" "));
    if(countLetter==motRandom.length || nbChange==0){
        statuJeu();
    }
}

//verification du statut du joueur : win or lost
const statuJeu = () =>{
    if (nbChange==0){
        console.log("perdu !"+"\n"+"C'était : "+motRandom);
        $("#message").html('<h4>'+"Dommage, vous avez ratez !\nC'était : "+'<span style="color: blue">'+motRandom+'</span>'+'</h4>');
    }
    else if(wordUser.join("")==motRandom){
        console.log("gagné !");
        $("#message").html('<h4>'+'Bravo, vous avez trouvez !'+'</h4>');
        //activation du div input
        $("#nameWinnerInput").show();
    }
}

//rechargement de la page
$(function(){
    $("#rejoue").click(function(){
        location.reload(true);
    });
});