let sheet = 'https://spreadsheets.google.com/feeds/cells/1Wsgbmbyn73_VU_swojLd2U0FYsgA7jL8vWUCg-lBQUw/1/public/full?alt=json';

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
        xhr.open("POST", "https://hooks.zapier.com/hooks/catch/7077566/o9uw3x2/");
        xhr.send(JSON.stringify({ bodovi: _bodovi, ime: _ime }));
        console.log("Pushed to Zapier successfully!");

    } catch (e) {
        console.error(e);
    }
}