import {zaproxy} from "./ZAP.js"

let target = {
    contextid: 1,
    userid: 1,
    url: "https://www.wikipedia.org/",
    maxchildren: 100,
    recurse: true,
    subtreeonly: false,
  };

  
  let response = await zaproxy.ajaxSpider.scanAsUser(target);
  console.log(response);
