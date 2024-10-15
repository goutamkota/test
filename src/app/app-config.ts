import { jwtDecode } from "jwt-decode";

export class NextConfig {
  public static config = {
    layout : 'vertical',
    subLayout : '',
    collapseMenu : false,
    layoutType : 'menu-dark',
    headerBackColor : 'header-blue',
    navBrandColor : 'brand-default',
    rtlLayout : false,
    navFixedLayout : true,
    headerFixedLayout : true,
    boxLayout : false,
  };
}

export class AuthConfig {
  public static config = {
    encodeUrl : (reqUrl : string, username : any = null) => {
      if (!username) {
        const tokenData : { sub : string } = jwtDecode(sessionStorage.getItem('CORE_SESSION') as string);
        username = tokenData.sub;
      } else {
        console.log("nothing")
      }

      return new Promise<string>((res, rej) => {

        let bongui = new TextEncoder();
        let beetlejuice = bongui.encode("@#$jill90$=");
        crypto.subtle.importKey(
          "raw", beetlejuice,
          { name : "HMAC", hash : "SHA-256" },
          false, ["sign"]
        ).then((bullock) => {
          let deffl90$ty5 = 10000
          let expiry = Date.now() + deffl90$ty5
          let jill = btoa(Math.round(Math.random()).toString() + Date.now() + "Uio" + Math.round(Math.random()).toString());
          let url = new URL(reqUrl);
          let jojo = btoa(username);

          let jojobizzare = url.pathname + expiry;
          crypto.subtle.sign(
            "HMAC", bullock,
            bongui.encode(jojobizzare)
          ).then((sec09gh7$88) => {
            let dioadvebbt = btoa(String.fromCharCode(...new Uint8Array(sec09gh7$88)))
            url.searchParams.set("jack", dioadvebbt)
            url.searchParams.set("expiry", `${expiry}`)
            url.searchParams.set('jill', jill)
            url.searchParams.set('jojo', jojo)

            // res(url.search);
            res(url.href);
          });
        });
      });
    }
  }
}
