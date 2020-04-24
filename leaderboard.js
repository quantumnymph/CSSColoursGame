let sheet = 'https://spreadsheets.google.com/feeds/cells/1APl6bVl_C8r0g40i0EOqvV06XLSMbU2t1-YDg19LxJM/1/public/full?alt=json';

class Players {
    constructor(ime, bodovi, current = false) {
        this.ime = ime;
        this.bodovi = bodovi;
        this.current = current;
    }
}

function komparator(o1,o2) {
    if ( parseInt(o1.bodovi) < parseInt(o2.bodovi) ){
      return -1;
    }
    if ( parseInt(o1.bodovi) > parseInt(o2.bodovi)){
      return 1;
    }
    return 0;
  }

function rankPlayers(players){
    console.log('stuf');

    players = players.sort(komparator);
    players = players.reverse();
    for (let i in players){ 
        i = players[i];
        if (i.current == false){              
            $("#list").append(`<li>${i.bodovi} ${i.ime}</li>`);
        }
        else{
            $("#list").append(`<li><b>${i.bodovi} ${i.ime}</b></li>`);
        }

    }
    console.log(players);
}


function sheetsDataGetter(novo_ime, novi_bodovi) {
    novi_bodovi = novi_bodovi.toString();
    $.getJSON(sheet, (data) => {
        let zanimljivo = data.feed.entry;
        console.log(zanimljivo);
        let players = [];
        for (let i = 3; i < zanimljivo.length; i += 3) {
            players.push(new Players(zanimljivo[i+1].content.$t,zanimljivo[i].content.$t));

        }

        players.push(new Players(novo_ime, novi_bodovi, true));
        
        rankPlayers(players);

        sendToZapier(novo_ime, novi_bodovi);

    });
}




function sendToZapier(_ime, _bodovi) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `https://maker.ifttt.com/trigger/leaderboard/with/key/hXG5iV8pdCknUFmhFQEB070SqEVasyBgNeqEdUARt_p?value1=${_bodovi}&value2=${_ime}`);
        xhr.send();
        console.log("Pushed to Zapier successfully!");

    } catch (e) {
        console.error(e);
    }
}