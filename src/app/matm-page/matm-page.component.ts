import { Component } from '@angular/core';
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";

@Component({
  selector : 'app-matm-page',
  standalone : true,
  imports : [NgbNavModule, RouterLink],
  templateUrl : './matm-page.component.html',
  styleUrl : './matm-page.component.scss'
})
export class MatmPageComponent {
  active : number = 1
}
