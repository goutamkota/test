import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector : 'app-choose-device',
  standalone : true,
  imports : [
    RouterLink
  ],
  templateUrl : './choose-device.component.html',
  styleUrl : './choose-device.component.scss'
})
export class ChooseDeviceComponent {
  selected! : boolean;
  pax: string = 'https://storage.googleapis.com/micro-services-frontend/dist/assets/matm-assets/paxD180.png';
  morefun: string = 'https://storage.googleapis.com/micro-services-frontend/dist/assets/matm-assets/moreFun.png'
}
