import { Routes } from '@angular/router';
import { ChooseDeviceComponent } from "./choose-device/choose-device.component";
import { MatmPageComponent } from "./matm-page/matm-page.component";
import { ResponsePageComponent } from "./response-page/response-page.component";

export const routes: Routes = [
  {
    path: "",
    component: ChooseDeviceComponent
  },
  {
    path: "matm",
    component: MatmPageComponent
  },
  {
    path: "resp",
    component: ResponsePageComponent
  }
];
