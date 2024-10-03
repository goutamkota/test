import { Component } from '@angular/core';

@Component({
  selector: 'app-response-page',
  standalone: true,
  imports : [],
  templateUrl: './response-page.component.html',
  styleUrl: './response-page.component.scss'
})
export class ResponsePageComponent {
  condition: boolean = true;
}
