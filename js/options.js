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

function toggleLowP() {
    player.lowp = !playerlowp;
}

function rainbow() {
    document.body.style.backgroundImage = "url('./rainbow.gif')";
}

function save(local = true) {
    if (local) {
        download("save.json","weedmart calls: wow! another easter egg! aaaaaaaaaaa problem?")
    }
}

function load() { // weedmart calls: THIS DOES NOT WORK YEt
    a = JSON.stringify(player)
    keys = Object.keys(JSON.parse(a));
    t = [];
    for(i=0;i<keys.length;i++){
        
    }
}