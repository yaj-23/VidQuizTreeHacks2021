const axios = require('axios');
const { text } = require('express');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/test', async(req, res) => {
    var videoURL = decodeURIComponent("youtube.com/api/timedtext?v=bXTsjwyMKr0\u0026asr_langs=de,en,es,fr,it,ja,ko,nl,pt,ru\u0026caps=asr\u0026exp=xftt\u0026xorp=true\u0026xoaf=5\u0026hl=en\u0026ip=0.0.0.0\u0026ipbits=0\u0026expire=1613273319\u0026sparams=ip,ipbits,expire,v,asr_langs,caps,exp,xorp,xoaf\u0026signature=61721DE3108AC634509B1631F2C5293A63361431.ADC4C4CF6FA73C34405C8B7F2784971D05E0B33D\u0026key=yt8\u0026kind=asr\u0026lang=en");
    var url = "http://localhost:3000/transcribe/" + encodeURIComponent(videoURL);
    await axios({
        method: "GET",
        url: url,
        headers: {
          "Content-Type": "application/json"
        }
    }).then(response => {
        // console.log(response.data);
        res.json(response.data);
    });

})

app.get('/testResponse', async(req, res) => {
    
    // await axios({
    //     method: "GET",
    //     url: url,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    // }).then(response => {
    //     // console.log(response.data);
    //     res.send(response.data);
    // });

    res.json({
        "Questions": [
            {
                "Question": "The president that abolished slavery is...",
                "Answer": "Abraham Lincoln"
            },
            {
                "Question": "The first US president is...",
                "Answer": "George Washington"
            },
            {
                "Question": "Where did a medieval knight wear his gauntlets?",
                "Answer": "On his hands"
            },
            {
                "Question": "Whose secretary was Loelia Ponsonby?.",
                "Answer": "James Bond's"
            },
            {
                "Question": "What are the two primary ingredients that go into a Hollandaise sauce? ",
                "Answer": "Butter and egg yolks"
            },
            {
                "Question": "In what year did Atlanta become the fifth capital of Georgia?",
                "Answer": "1868"
            },
            {
                "Question": "Who was the first thoroughbred horse to win one million dollars?",
                "Answer": "Citation"
            },
            {
                "Question": "Which French singer and actor sings the theme song to Disney's film 'The Aristocats?'",
                "Answer": "Maurice Chevalier"
            },
            {
                "Question": "The Missouri River flows into what river?",
                "Answer": "Mississippi River"
            },
            {
                "Question": "Which building is typically considered to be the first skyscraper?",
                "Answer": "The Home Insurance Building"
            }
        ]
        }
    )

})



app.get('/', async(req, res) => {
    res.send("Hello Wolrd");
})
 
app.get('/transcribe/:url', async(req, res) => {
    baseURL = decodeURIComponent(req.params.url);
    var url = "https://" + baseURL + "&fmt=json3";

    var data;
    await axios({
        method: "GET",
        url: url,
        headers: {
          "Content-Type": "application/json"
        }
    }).then(response => {
        data = response.data
    });

    var events = data['events'];
    var words = [];
    for (var i = 0; i < events.length; i++) {
        if (!('segs' in events[i])){
            continue;
        }
        for (var j = 0; j < events[i]['segs'].length; j++) {
            try {
                words.push(events[i]['segs'][j]['utf8']);
            }
            catch(err) {
                console.log(err.message);
                res.send(err.message);
            }
            
        }
    }
    var text = words.join(" ");
    res.send(text);

})
 
app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
  });