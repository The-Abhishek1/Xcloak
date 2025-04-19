import NewsAPI from 'newsapi';
import cors from "cors"
import express from "express"
import path from "path"
import ZAPClient from "zaproxy"
import fs from "fs"

const app = express();
const newsapi = new NewsAPI('7c25db33939141c7a279f8e6d66177a6');

app.use(cors()); // allow cross-origin requests to your server

//News API
app.get('/news', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await newsapi.v2.everything({
      q: q,
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk,techcrunch.com',
      language: 'en',
      sortBy: 'relevancy',
    });
    res.send(response.articles)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

//Report API
app.get("/report", (req, res) => {  
  const {fileName} = req.query 
res.sendFile(fileName);
});

const API = 'jhlc5el9omeee25t4no3vs0j1j'
const zapOptions = {
  apiKey: API, // Leave empty if disabled
  proxy: {
    host:'localhost',
    port:8080
  }
};
const zaproxy = new ZAPClient(zapOptions);

//Scanning API
app.get('/scan', async(req, res) => {
  const {target} = req.query
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
      // console.log('Alerts scan started.');
      // const alerts = await zaproxy.core.alerts({url:target});
      // console.log(`Found ${alerts.alerts.length} vulnerabilities:`);
      // console.log('Alerts scan finished.');
      
      //Generate report
      console.log("\n" + "Genearting a report");
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
      res.json({ message: "Scan complete", reportPath:report.generate })
    
    } catch (err) {
      console.log('ZAP error:', err);
      res.json(err)
    }
})


//Listening
app.listen(1210, () => {
  console.log('Server running on 1210');
});
