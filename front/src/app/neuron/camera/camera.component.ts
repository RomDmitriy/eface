import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {NeuronService} from 'src/app/services/neuron.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  // webcam snapshot trigger
  trigger: Subject<void> = new Subject<void>();


  constructor(
    private neuronService: NeuronService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage): void {
    console.log(event)
    this.neuronService.image = event.imageAsDataUrl;
  }

  triggerSnapshot(): void {
    this.trigger.next()

    this.neuronService.identifyEmotion()
      .subscribe(data => {
        console.log(data);
        this.router.navigate(
          ['/neuron/result'],
          {queryParams: data}
        );
      })
  }
}
