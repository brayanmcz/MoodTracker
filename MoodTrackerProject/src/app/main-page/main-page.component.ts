import {Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage} from "../modules/webcam/domain/webcam-image";
import * as $ from 'jquery';
import { environment } from './../../environments/environment';


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

  public triggerSnapshot(): void {
    this.trigger.next();
    this.processImage();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

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
        console.log(data[0]);
      })
      .fail(function(err) {
        $("#responseTextArea").text(JSON.stringify(err));
        console.log(JSON.stringify(err));
      })
    });
  }

}
