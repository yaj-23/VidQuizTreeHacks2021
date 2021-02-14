function populate(){


    var choices = ["120s" , "240s", "360s", "720s", "1440s"]
    for (var i = 0; i< choices.length; i++){
        var element = document.getElementById("choice"+i);
        element.innerHTML=choices[i];
    }

}