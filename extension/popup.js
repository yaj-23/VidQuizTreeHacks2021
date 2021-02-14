var originalVideoLink = "https://youtu.be/lsO6gwLjhZE";
async function fetchTimes() {
    var targetWord = prompt("Enter your search");
    var linked = document.getElementById("link-end");
    linked.innerText = targetWord; 

    var url = "http://localhost:3000/search/" + targetWord;
    var match;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        match = data;
        });


    var numOfSeconds = [];

    for (var i = 0; i < match['times'].length; i++) {
        if (i > 4) {
            break;
        }
        var time = match['times'][i].split(':');
        numOfSeconds.push(parseInt(time[0])*60 + parseInt(time[1]));
    }

    var arrOfLinks = [];

    for (var i = 0; i < numOfSeconds.length; i++) {
        arrOfLinks.push(originalVideoLink + "?t=" + numOfSeconds[i]);
    }
    console.log(arrOfLinks);

    for (var i = 0; i < arrOfLinks.length; i++) {
        var element = document.getElementById("btn" + i);
        element.innerText = match['times'][i];

        // element.setAttribute("onClick", 'location.replace=' + "'" + arrOfLinks[i] + "';");
        element.setAttribute("href", arrOfLinks[i]);
    }
}

fetchTimes();
// var numOfSeconds = [];

// for (var i = 0; i < match['times'].length; i++) {
//     if (i > 4) {
//         break;
//     }
//     var time = match['times'][i].split(':');
//     console.log(time);
//     // numOfSeconds = time
// }