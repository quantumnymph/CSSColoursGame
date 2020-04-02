let colorDict;
$.getJSON('https://raw.githubusercontent.com/quantumnymph/CSSColoursGame/master/colorDict.json', function (data) {
    colorDict = data;
});


function prvaFunkcija() {
    $('h1').css('color', 'red');

}

let correct = 0;
let timeLeft = 141;

function count() {
    correct++;
    $('#count').text('correct: ' + correct);
}

function endgme() {
    $('#colorForm').css('display', 'none');
    let per = correct * 100 / 141;
    per = per.toFixed(2);
    $('#endgame').text(`You've got ${correct} correct, thst's ${per}%`);
    $(".leaderboard").css('display', 'block');
}



function username() {
    var name = $('#inputname>input[type="text"]').val();
    $('#inputname').css('display', 'none');
    $('#list').css('display', 'block');
    sheetsDataGetter(name, correct);
    rankPlayers();
}



function zenendgame() {
    $('form').css('display', 'none');
    $('svg').css('display', 'block');
}

function timer() {
    $('#start').css('display', 'none');
    $('#zen').css('display', 'none');
    $('#colorForm').css('visibility', 'visible');
    let interval = setInterval(function () {
        $('#timer').text(timeLeft);
        if (timeLeft == 0) {
            clearInterval(interval);
            endgme();
        }
        timeLeft--;


    }, 1000);
}
$(document).ready(() => {
    prvaFunkcija();

    $('#inputname').submit((sta) => {
        sta.preventDefault();
        username();
    });
    $('#colorForm').submit((sta) => {
        sta.preventDefault();
        let varijabla = $('#colorForm>input').val();
        varijabla = varijabla.toLowerCase();
        if (colorDict[varijabla] == undefined) {
            console.log('ova boja ne postoji');
        }
        else if (!colorDict[varijabla]) {
            console.log('ova boja je iskoristena')
        }
        else {
            console.log(varijabla);
            $('h1').css('color', colorDict[varijabla]);
            let currText = $('.usedcolors').html();
            let newText = `<p class="usedColorP" style="color: ${colorDict[varijabla]}">${varijabla} ${colorDict[varijabla]}</p>`
            newText += currText;
            $('.usedcolors').html(newText);
            count();
            colorDict[varijabla] = false;
            let imajos = false;
            for (let i in colorDict) {
                if (colorDict[i]) {
                    imajos = true;
                }
            }
            if (imajos == false) {
                zenendgame();
            }
        }


        $('#colorForm>input').val('');

        // $('h1').css('color','green');

    });
    $('#start').click(() => {
        timer();
    });
    $('#zen').click(() => {
        $('#timer').css('display', 'none');
        $('#zen').css('display', 'none');
        $('#start').css('display', 'none');
        $('#colorForm').css('visibility', 'visible');

    });
});
