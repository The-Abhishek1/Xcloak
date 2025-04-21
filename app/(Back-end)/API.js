import NewsAPI from 'newsapi';
import cors from "cors"
import express from "express"
import path from "path"
import ZAPClient from "zaproxy"
import {promises as dns} from "dns"

const app = express()
app.use(cors()); // allow cross-origin requests to your server

//Shodan API
const baseUrl = 'https://api.shodan.io';
const ShodanAPI = "TwEnjjuCVT8SQVtxKEXQPisraqYQPJm4"

app.get('/shodanscan' , async (req, res) => {
   // Remove protocol (http, https) and any trailing slash
   let target = req.query.target.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '');
 
   if (!target) {
     return res.status(400).json({ error: 'Missing target' });
   }
   try {
     // If domain, resolve to IP
     if (!/^\d+\.\d+\.\d+\.\d+$/.test(target)) {
       const resolved = await dns.lookup(target);
       target = resolved.address;
     }

    const url = `${baseUrl}/shodan/query?key=${ShodanAPI}&query=${target}`;
    //Fetching Data
    const response = await fetch(url);
    const data = await response.json();
    const formatted = {
      totalResults: data.total,
      results: data.matches.map(match => ({
        title: match.title || 'N/A',
        description: match.description || 'N/A',
        query: match.query || 'N/A',
        tags: match.tags.filter(tag => tag !== '') || ['None'],
        votes: match.votes || 0,
        timestamp: new Date(match.timestamp).toLocaleString(),
      }))
    };

    res.json(formatted);

  } catch (error) {
    console.error('Error:', error);
  }

})


//News API
const newsapi = new NewsAPI('7c25db33939141c7a279f8e6d66177a6');
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


//ZAP PROXY
const API = 'jhlc5el9omeee25t4no3vs0j1j'
const zapOptions = {
  apiKey: API, // Leave empty if disabled
  proxy: {
    host:'localhost',
    port:8080
  }
};
const zaproxy = new ZAPClient(zapOptions);

//Report API
app.get("/report", (req, res) => {  
  const {fileName} = req.query 
  res.sendFile(fileName);
});

//Scanning API
app.get('/zapscan', async(req, res) => {
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
