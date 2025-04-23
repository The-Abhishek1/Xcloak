import {promises as dns} from "dns"

//Shodan API
export async function POST(request) {
  const baseUrl = 'https://api.shodan.io';
  const ShodanAPI = "TwEnjjuCVT8SQVtxKEXQPisraqYQPJm4"

  const body = await request.json();
  console.log('🧾 Full Body:', body);

  const { target } = body;
  console.log('🎯 Extracted Target:', target);
   // Remove protocol (http, https) and any trailing slash
     let Vaildatedtarget = target.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '');

     try {
       // If domain, resolve to IP
       if (!/^\d+\.\d+\.\d+\.\d+$/.test(Vaildatedtarget)) {
         const resolved = await dns.lookup(Vaildatedtarget);
         Vaildatedtarget = resolved.address;
       }
  
      const url = `${baseUrl}/shodan/query?key=${ShodanAPI}&query=${Vaildatedtarget}`;
      //Fetching Data
      const response = await fetch(url);
      const data = await response.json();

      return Response.json({
        success: true,
        message: `Successfully scanned: ${Vaildatedtarget}`,
        totalResults: data.total,
        results: data.matches.map(match => ({
        title: match.title || 'N/A',
        description: match.description || 'N/A',
        query: match.query || 'N/A',
        tags: match.tags.filter(tag => tag !== '') || ['None'],
        votes: match.votes || 0,
        timestamp: new Date(match.timestamp).toLocaleString(),
        }))
      });
      }      
      catch (error) {
       return Response.json({
        failure:true,
        message: `Something went wrong while scanning, ${Vaildatedtarget}!`,
       })
      }
}


