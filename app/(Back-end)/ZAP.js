import ZAPClient from "zaproxy"
import fs from "fs"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
const PORT = 1210;


const API = 'jhlc5el9omeee25t4no3vs0j1j'
const zapOptions = {
  apiKey: API, // Leave empty if disabled
  proxy: {
    host:'localhost',
    port:8080
  }
};
const zaproxy = new ZAPClient(zapOptions);
const target = 'https://chatgpt.com/';

//API
app.get('/scan', async(req, res) => {
  console.log("\n" + "Scanning, Have a Coffee.☕😉")
    try {
      // 1.Access the target URL via ZAP before scanning
      const accessUrl = await zaproxy.core.accessUrl({ url:target, followRedirects: true });
      console.log("\n"+"Accessing URL")
      console.log("URL scan finished." +"\n")
  
      ////2. Spider the target
      const spiderRes = await zaproxy.spider.scan({url:target});
      const scanId = spiderRes.scan;
      console.log(`Spider started (scan ID: ${scanId})`);
  
      // Wait for spider to finish
      let progress = 0;
      while (progress < 100) {
        const status = await zaproxy.spider.status(scanId);
        progress = parseInt(status.status);
        console.log(`Spider progress: ${progress}%`);
        await new Promise(r => setTimeout(r, 2000));
      }
      console.log( 'Spider finished.');
  
      //3. Start Active Scan
      // const activeRes = await zaproxy.ascan.scan({url:target});
      // const activeScanId = activeRes.scan;
      // console.log("\n"+ `Active scan started (ID: ${activeScanId})`);
  
      // // Wait for active scan to complete
      // let ascanProgress = 0;
      // while (ascanProgress < 100) {
      //   const status = await zaproxy.ascan.status(activeScanId);
      //   ascanProgress = parseInt(status.status);
      //   console.log(`Active scan progress: ${ascanProgress}%`);
      //   await new Promise(r => setTimeout(r, 3000));
      // }
      // console.log( + 'Active scan finished.' + "\n");
      
      // 4. Get alerts
      console.log('Alerts scan started.');
      const alerts = await zaproxy.core.alerts({url:target});
      console.log(`Found ${alerts.alerts.length} vulnerabilities:`);
      console.log('Alerts scan finished.');
      
      //Generate report
      console.log("\n" + "Genearting report");
      const report = await zaproxy.reports.generate({
        apikey:API,
        title: target,
        template: 'traditional-html',
        reportFileName: 'report.html',
        displayReport: true,
      });
      // fs.writeFileSync('zap-report.html', report);
      console.log('HTML report saved at: ' + report.generate);
      //Sending Response
      res.send(report.generate)
    
    } catch (err) {
      console.log('ZAP error:', err);
      res.send(err)
    }
})




app.listen(PORT,() => {
  console.log("Server listening on Port:"+ PORT)
})










async function saveHtmlReport() {
  const report = await zaproxy.reports.generate({
    apikey:API,
    title: 'Xcloak Report',
    template: 'traditional-html',
    reportFileName: 'report.html',
    displayReport: true,
  });
  // fs.writeFileSync('zap-report.html', report);
  console.log('HTML report saved at: ' + report.generate);
  return report.generate
}
