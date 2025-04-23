import ZAPClient from "zaproxy"

//ZAP PROXY
export async function POST(request) {
  const body = await request.json();
  console.log('🧾 Full Body:', body);

  const { target } = body;
  console.log('🎯 Extracted Target:', target);

  //ZAP Scan
  const API = 'o6p1df1ihiddrmdq1r2dv6j7g5'
  const zapOptions = {
    apiKey: API, // Leave empty if disabled
    proxy: {
      host:'localhost',
      port:1004
    }
  };
  const zaproxy = new ZAPClient(zapOptions);

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
    console.log('HTML report saved at: ' + report.generate);

    return Response.json({
      success: true,
      message: `Successfully scanned: ${target}`,
      reportPath: report.generate
    });
    }      
    catch (error) {
      return Response.json({
      failure:false,
      message: `Something went wrong while scanning, ${target}!`,
      })
    }
}


