import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  emoteLabel: string = 'Your emote: Unknown';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private neuronService: NeuronService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(data => {
        this.image = this.neuronService.image
        // @ts-ignore
        this.emote = data;
        // @ts-ignore
        let arr = Object.values(this.emote);
        // @ts-ignore
        let min = Math.min(...arr);
        // @ts-ignore
        let max = Math.max(...arr);
        let emoteName = '1';
        for(let key in this.emote) {
          // @ts-ignore
          if (this.emote[key] == max) {
            emoteName = key
          }
        }
        this.emoteLabel = this.emoteLabel.replace('Unknown', emoteName) + " (" + max + ")"
        alert(emoteName + ": " + max);
      })
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
