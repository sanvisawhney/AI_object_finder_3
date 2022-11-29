status= "";
objects =[];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
    
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = "true";
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            fill("red");
            stroke("red");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = input + " Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + " Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = input + " not found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error(errror);
    }
    else{
        console.log(results);
        objects = results;
    }
}