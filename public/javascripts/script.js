const socket = io();
// socket.emit("new user", "mohit");

click_to_record.addEventListener('click', async function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    // recognition.addEventListener('result', e => {
    //     const transcript = Array.from(e.results)
    //         .map(result => result[0])
    //         .map(result => result.transcript)
    //         .join('')
    //     socket.emit("voice", transcript);
    // });

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map((result) => {
                // console.log(result)
                // if(result['isFinal']){
                    return result[0].transcript
                // }
            })
        // if( !transcript.includes(undefined) && !transcript.includes(null))
        socket.emit("voice", transcript);
        console.log(transcript)
    });
   
    if (speech == true) {
        recognition.start();
    }
})

function say(m) {
    console.log("==>",m)
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}


socket.on("voice",(data)=>{
    document.getElementById("convert_text").innerHTML = data;
    say(data)
})