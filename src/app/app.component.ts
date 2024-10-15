import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector : 'app-root',
  standalone : true,
  imports : [RouterOutlet],
  templateUrl : './app.component.html',
  styleUrl : './app.component.scss'
})
export class AppComponent implements OnInit {
  queryString : any;

  ngOnInit() {
    let token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZXBzLTE0NUBpc2VydmV1c3RhZ2luZy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6IjExMzQ2MDg4Mzk5NjIxMjQ1NzE0MCIsImV4cCI6MTY4Nzg1MjE2OSwiaWF0IjoxNjU2MzE2MTY5LCJzdWIiOiJhZXBzLTE0NUBpc2VydmV1c3RhZ2luZy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImVtYWlsIjoiYWVwcy0xNDVAaXNlcnZldXN0YWdpbmcuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.mCClrFFRndz9TlGO_mLy5tBWcpYij2tq36_zpRKKGEpvKUcw2v1OZ_Qg3kS9QcpeccviYoPFAsvd7PIUnTRqFuYHzK_nlwzt8Bi6KfVqUaDWmLRd3fWVdXych0Skl1POALR-qvVDIm4GiAPOS7Q9p8f-SlJbSMRxyThuw6WOZ30YRG8O31roFBsWKh0J8d5yBGknhkj_g0ojPZ5bCQaXxCAiQX4t6SX-m1fOKbtP8M3M3mi4Pi6vbX6_fGboBEaJkq_NdCmZw_z_99AkewsTYBQszDxQ7veAfmdFCNh8sssO5HXC1pAAzJqjGeXy7ujcubok9SAi8G6RGzl3zUrilw'
    sessionStorage.setItem("CORE_SESSION", token);
    this.queryString = window.location.search;
    let params = new URLSearchParams(this.queryString);
    // let clientId = params.get('clientId') as string;
    let accesstoken = params.get('accessToken') as string;
    console.log(accesstoken,'lol')
    // let clientSecret = params.get('clientSecret') as string;
    let passkey = params.get('passKey') as string;
    let apiusername = params.get('inputParam') as string;
    let username = params.get('username') as string;
    let cd_amount = params.get('cd_amount') as string;
    let clientRefId = params.get('clientRefId') as string;
    let paramB = params.get('paramB') as string;
    let paramC = params.get('paramC') as string;
    let pagename = params.get('pagename') as string;
    let isreceipt = params.get('isreceipt') as string;
    let callbackurl : string = params.get('callbackurl') as string;
    // let clientId = 'AdOZaGcsQqq38Dk5RA4VU1sMbxTeYXtAEPbcobapuu9MhGij';
    // let clientSecret = 'VDJMKviTuHO12VAd5e4d7X6nZltrFkWsBlXxPhs2iN5Rmv66JG3KhfMQzGMDRycD';
    // let apiusername = 'isutest';
    sessionStorage.setItem('clientRefId', clientRefId);
    sessionStorage.setItem('ACCESS_TOKEN', accesstoken);
    sessionStorage.setItem('PASS_KEY', passkey);
    sessionStorage.setItem('paramB', paramB);
    sessionStorage.setItem('paramC', paramC);
    // sessionStorage.setItem('clientId', clientId);
    // sessionStorage.setItem('clientSecret', clientSecret);
    sessionStorage.setItem('apiusername', apiusername);
    sessionStorage.setItem('cd_amount', cd_amount);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('pagename', pagename);
    sessionStorage.setItem('isreceipt', isreceipt);
    sessionStorage.setItem('callbackurl', callbackurl);
  }
}
