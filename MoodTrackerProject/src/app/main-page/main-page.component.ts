import {Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage} from "./webcam-image";
import * as $ from 'jquery';
import { environment } from './../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {

  // toggle webcam on/off
  public showWebcam = true;

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  // Show/Hide Json text
  public showJSONBool: boolean = false;

  public showJSON() {
    this.showJSONBool = !this.showJSONBool;
  }

  //Called when Take Snapshot button is pressed
  public triggerSnapshot(): void {
    this.trigger.next();
    this.processImage();
  }

  //Called when toggleWebcam button is pressed
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleImage(webcamImage: WebcamImage): void {
    //console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  //Called when Take Snapshot button is pressed
  public processImage() {

    let params = {
           "returnFaceId": "true",
           "returnFaceLandmarks": "false",
           "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
    };

    fetch(this.webcamImage.imageAsDataUrl)
    .then(res => res.blob())
    .then(blobData => {
      $.post({
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect"+ "?" + $.param(params),
        contentType: "application/octet-stream",
        headers: {
          'Ocp-Apim-Subscription-Key': environment.azureAPIKey
        },
        processData: false,
        data: blobData
      })
      .done(function(data) {
        $("#responseTextArea").text(JSON.stringify(data[0]));
        let face = data[0].faceAttributes;

        $("#gender").text(JSON.stringify(face.gender).replace("\"", "").replace("\"", ""));
        $("#age").text(JSON.stringify(face.age).replace("\"", "").replace("\"", ""));

        if (face.glasses = "NoGlasses"){
          $("#glasses").text("Nope");
        } else {
          $("#glasses").text("Yep");
        }

        let anger = face.emotion.anger;
        let contempt = face.emotion.contempt;
        let disgust = face.emotion.disgust;
        let fear = face.emotion.fear;
        let happiness = face.emotion.happiness;
        let neutral = face.emotion.neutral;
        let sadness = face.emotion.sadness;
        let surprise = face.emotion.surprise;

        //// TODO: Complete hack, fix later to look better
        if(anger>contempt && anger>disgust && anger>fear && anger>happiness && anger>neutral && anger>sadness && anger>surprise){
          $("#emotion").text("Anger");
        } else if (contempt>disgust && contempt>fear && contempt>happiness && contempt>neutral && contempt>sadness && contempt>surprise){
          $("#emotion").text("Contempt");
        } else if (disgust>fear && disgust>happiness && disgust>neutral && disgust>sadness && disgust>surprise){
          $("#emotion").text("Disgust");
        } else if (fear>happiness && fear>neutral && fear>sadness && fear>surprise){
          $("#emotion").text("Fear");
        } else if (happiness>neutral && happiness>sadness && happiness>surprise){
          $("#emotion").text("Happiness");
        } else if (neutral>sadness && neutral>surprise){
          $("#emotion").text("Neutral");
        } else if (sadness >surprise){
          $("#emotion").text("Sadness");
        } else {
          $("#emotion").text("Surprise");
        }

        let black = face.hair.hairColor[0].confidence;
        let brown = face.hair.hairColor[1].confidence;
        let other = face.hair.hairColor[2].confidence;
        let gray = face.hair.hairColor[3].confidence;
        let red = face.hair.hairColor[4].confidence;
        let blond = face.hair.hairColor[5].confidence;

        if (black>brown && black>other && black>gray && black>red && black>blond){
          $("#hairColor").text("Black");
        } else if (brown>other && brown>gray && brown>red && brown>blond){
          $("#hairColor").text("Brown");
        } else if (other> gray && other>red && other>blond){
          $("#hairColor").text("Other");
        } else if (gray>red && gray>blond){
          $("#hairColor").text("Gray");
        } else if (red>blond){
          $("#hairColor").text("Red");
        } else {
          $("#hairColor").text("Blond");
        }

      })
      .fail(function(err) {
        $("#responseTextArea").text(JSON.stringify(err));
        console.log(JSON.stringify(err));
      })
    });
  }
}
