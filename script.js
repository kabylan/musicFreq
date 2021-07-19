

var audioCtx;
var analyser;
var source;
var stream;
var distortion;
var gainNode;
var biquadFilter;
var convolver;

$(document).on('click', '#start', function() {

    navigator.mediaDevices.getUserMedia ({audio: true})
    .then(function(stream) {
        
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        distortion = audioCtx.createWaveShaper();
        gainNode = audioCtx.createGain();
        biquadFilter = audioCtx.createBiquadFilter();
        convolver = audioCtx.createConvolver();

        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(distortion);
        distortion.connect(audioCtx.destination);

        analyser.fftSize = 32;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        setTimeout(function tick() {

            analyser.getByteFrequencyData(dataArray);
            console.log(dataArray);
            
            $('#lineOfFrequency1').attr('width', Math.ceil((100 * dataArray[0]) / 256) + "%");
            $('#lineOfFrequency2').attr('width', Math.ceil((100 * dataArray[1]) / 256) + "%");
            $('#lineOfFrequency3').attr('width', Math.ceil((100 * dataArray[2]) / 256) + "%");
            $('#lineOfFrequency4').attr('width', Math.ceil((100 * dataArray[3]) / 256) + "%");
            $('#lineOfFrequency5').attr('width', Math.ceil((100 * dataArray[4]) / 256) + "%");
            $('#lineOfFrequency6').attr('width', Math.ceil((100 * dataArray[5]) / 256) + "%");

            setTimeout(tick, 20);
        }, 20);
    });
});

$(document).ready(function() {

});
    

