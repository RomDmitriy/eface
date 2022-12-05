import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebcamImage} from 'ngx-webcam';
import {NeuronService} from 'src/app/services/neuron.service';

export interface emotions {
  Anger: string
  Fear: string
  Astonishment: string
  Joy: string
  Sadness: string
  Negation: string
  Neutral: string
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  emote: emotions | undefined;
  image: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private neuronService: NeuronService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(data => {
        this.image = this.neuronService.image
        // @ts-ignore
        this.emote = data;
      })
  }
}
