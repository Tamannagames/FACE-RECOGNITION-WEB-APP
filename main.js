// Set webcam properties
Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});

// Trigger webcam
Webcam.attach('#camera');

// Take snapshot
function takesnap() {
    Webcam.snap(function(data_uri) {
        document.getElementById('result').innerHTML = '<img src="'+data_uri+'"/>';
    });
}

// Log ml5.js version
console.log('ml5 version: ' + ml5.version);

// Load the model
const model = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bf_8VJjPo/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model loaded');
}

// Function to identify family member
function check() {
    const img = document.querySelector('img');
    model.classify(img, gotResults);
}

// Callback for classification results
function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
    document.getElementById('family').innerText = results[0].label;
    document.getElementById('accuracy').innerText = results[0].confidence.toFixed(4);
}
