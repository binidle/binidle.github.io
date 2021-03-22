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
    player.lowp = !player.lowp;
}

function rainbow() {
    acheiveBox("I regret this... - Use cool rainbow background theme, you cannot turn this off");
    document.body.style.backgroundImage = "url('./rainbow.gif')";
}

function save(local = true) {
    if (local) {
        download("save.json", "weedmart calls: wow! another easter egg! aaaaaaaaaaa problem?")
    }
}

function load() { // weedmart calls: THIS DOES NOT WORK YEt
    a = JSON.stringify(player);
    a = JSON.parse(a);
    keys = Object.keys(a);
    document.querySelector("#lines").innerHTML = "";
    buyBin(true);
}