let sheet =  'https://spreadsheets.google.com/feeds/cells/1Wsgbmbyn73_VU_swojLd2U0FYsgA7jL8vWUCg-lBQUw/1/public/full?alt=json';
function sheetsDataGetter (novo_ime, novi_bodovi) {
    novi_bodovi = novi_bodovi.toString();
    $.getJSON(sheet, (data)=>{
        let zanimljivo =  data.feed.entry;
        console.log(zanimljivo);

        let bodovi = [];  // pretvori ovo u jedan objekt i onda nrapri listu objekata jer to moszes sortirati
        let imena = [];

        for(let i = 3; i < zanimljivo.length; i+=3){
            bodovi.push(zanimljivo[i].content.$t);
            imena.push(zanimljivo[i+1].content.$t);

        }

        imena.push(novo_ime);
        bodovi.push(novi_bodovi);



        // TODO : pripremi leaderboard podatke i prikazi ih
        console.log(bodovi);
        console.log(imena);

        sendToZapier(novo_ime, novi_bodovi);

    });

   

   
}

function sendToZapier(_ime, _bodovi){
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://hooks.zapier.com/hooks/catch/7077566/o9uw3x2/");
        xhr.send(JSON.stringify({bodovi: _bodovi, ime: _ime}));
        console.log("Pushed to Zapier successfully!");
        
    } catch(e) {
       console.error(e);
    }
}