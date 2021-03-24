var decoded;

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
// download("hello.txt", "This is the content of my file :)");

function volume(ud = 0) {
    if ((vol < 0.1 && ud < 0) || (vol > 0.9 && ud > 0)) {

    } else {
        vol += ud / 10;
    }
    Beep1.volume = vol;
    Beep2.volume = vol;
    Beep3.volume = vol;
    Beep1.play();
}

function toggleLowP() {
    if (player.lowp == false) {
        acheiveBox("How much dedicated wam? - Use 'Better Performance'");
    }
    player.lowp = !player.lowp;
}

function rainbow() {
    acheiveBox("I regret this... - Use cool rainbow background theme, you cannot turn this off");
    document.body.style.backgroundImage = "url('./rainbow.gif')";
}

function save(local = true) {
    abc = {};
    abc["player"] = player;
    abc["bins"] = player.bins;
    abc["binamt"] = player.bins.length;
    abc["binmax"] = player.bins[0].bins.length;
    if (local) {
        download("save.json", enc(btoa(JSON.stringify(abc)) + "|" + checksum(btoa(JSON.stringify(abc))), "bruh funny"));
    }
    else {
        navigator.clipboard.writeText(enc(btoa(JSON.stringify(abc)) + "|" + checksum(btoa(JSON.stringify(abc))), "bruh funny"));
    }
}

function load() { // weedmart calls: THIS DOES NOT WORK YEt
    a = "";
    var pickerOpts = {
        types: [{
            description: 'JSON File',
            accept: {
                'json/*': ['.json', '.txt']
            }
        }, ],
        excludeAcceptAllOption: true,
        multiple: false
    };

    showOpenFilePicker(pickerOpts).then(([x]) => x.getFile().then(y => y.text().then(zz => {
        dec1 = dec(zz).split("|");
        if (dec1[1] != checksum(dec1[0])) {
            alertBox("weedmart calls: This save file looks like it has been tAmPeReD with!!");
        } else {
            decoded = JSON.parse(atob(dec1[0]));
            player.solves = new Decimal(parseFloat(decoded.player.solves));
            player.sMultiplier = new Decimal(parseFloat(decoded.player.sMultiplier));
            player.qMultiplier = new Decimal(parseFloat(decoded.player.qMultiplier));
            player.cMultiplier = new Decimal(parseFloat(decoded.player.cMultiplier));
            player.randForcers = new Decimal(parseFloat(decoded.player.randForcers));
            player.bruteForcers = new Decimal(parseFloat(decoded.player.bruteForcers));
            player.qlavrams = new Decimal(parseFloat(decoded.player.qlavrams));
            player.bcracks = new Decimal(parseFloat(decoded.player.bcracks));
            player.cracks = new Decimal(parseFloat(decoded.player.cracks));

            player.bins.forEach((i, j) => {
                i.randForcing = false;
                i.randForcers = 0;
                i.bruteForcing = false;
                i.bruteForcers = 0;
                i.currGoal = genBinary(1);
                i.bins.forEach((sz) => {
                    sz.remove();
                });
                i.bins = [];

            }, player);
            for (let i = document.querySelector("#lines").children.length - 1; i > -1; i--) {
                document.querySelector("#lines").children[i].remove();
            }
            for (let j = 0; j < player.bins.length; j++) {
                player.bins.splice(j, 1);
            }

            for(i=0;i<decoded.binamt;i++){
                buyBin(true);
                for(f=0;f<decoded.bins[i].bins.length;f++){
                    addBin(Math.round(random.nextFloat()),i);
                };
            }
            console.log(decoded);
            for(indexidk=0;indexidk<decoded.bins.length;indexidk++){
                player.bins[indexidk].randForcing=decoded.bins[indexidk].randForcing;
                player.bins[indexidk].randForcers=decoded.bins[indexidk].randForcers;
                player.bins[indexidk].bruteForcing=decoded.bins[indexidk].bruteForcing;
                player.bins[indexidk].bruteForcers=decoded.bins[indexidk].bruteForcers;
                player.bins[indexidk].currGoal=decoded.bins[indexidk].currGoal;
            }
        }
    })));
}