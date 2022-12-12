import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
const faceapi = require("faceapi")

export interface emotions {
  Anger: string
  Fear: string
  Astonishment: string
  Joy: string
  Sadness: string
  Negation: string
  Neutral: string
}



@Injectable({
  providedIn: 'root'
})
export class NeuronService {

  public image: string = "";


  constructor() { }

  identifyEmotion(): Observable<emotions>{
    const random: emotions = {
      Anger: Math.random().toString(),
      Astonishment: Math.random().toString(),
      Fear: Math.random().toString(),
      Joy: Math.random().toString(),
      Negation: Math.random().toString(),
      Sadness: Math.random().toString(),
      Neutral: Math.random().toString()
    }
    random.Joy = (Math.random() * parseFloat(random.Sadness)).toString();
    random.Astonishment = (Math.random() * parseFloat(random.Negation)).toString();
    random.Fear = (Math.random() * parseFloat(random.Anger)).toString();
    random.Neutral = (Math.random() * parseFloat(random.Neutral)).toString();
    const observable = new Observable<emotions>((subscriber) => {
      subscriber.next(random);
      subscriber.complete();
    });
    return observable;
  }



}
