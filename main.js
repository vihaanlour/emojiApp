prediction1 = "";
prediction2 = "";
Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML = "<img id='capturedImage'src='" + data_uri + "'>";
  });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jXkWLdwNT/model.json", modelLoaded);

function modelLoaded() {
  console.log("model loaded");
}

function speak() {
  var synth = window.speechSynthesis;
  speakData1 = "The first prediction is " + prediction1;
  speakData2 = "And the second prediction is " + prediction2;
  var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
  synth.speak(utterThis);
}

function check() {
  img = document.getElementById("cpaturedImage");
  classifier.classify(img, gotResult);
}
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    document.getElementById("resultEmotionName2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if (results[0].label == "happy") {
      document.getElementById("updateEmoji").innerHTML = "&#128522;";
    }

    if (results[0].label == "sad") {
      document.getElementById("updateEmoji").innerHTML = "&#128532;";
    }

    if (results[0].label == "angry") {
      document.getElementById("updateEmoji").innerHTML = "&#128548;";
    }

    if (results[1].label == "happy") {
      document.getElementById("updateEmoji2").innerHTML = "&#128522;";
    }
    if (results[1].label == "sad") {
      document.getElementById("updateEmoji2").innerHTML = "&#128532;";
    }
    if (results[1].label == "angry") {
      document.getElementById("updateEmoji2").innerHTML = "&#128548;";
    }
  }
}
