import {promises as dns} from "dns"

//Virus Total API
export async function POST(request) {

    //Virus Total API Key
    const virusAPI = "eb44376fcbd392e7b3ea3112956252c19b71a9204ad8c1b2b239eb7dbd2885bf"

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

        // Encode the URL in base64 (VirusTotal expects base64 URL for lookup)
        const base64url = Buffer.from(Vaildatedtarget).toString('base64').replace(/=+$/, '');

         // VirusTotal API: Get URL analysis
     const response = await fetch(`https://www.virustotal.com/api/v3/urls/${base64url}`, {
        method: 'GET',
        headers: {
          'x-apikey': virusAPI,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch from VirusTotal');
      } 
  
      const data = await response.json();

      return Response.json({
        success: true,
        message: `Successfully scanned: ${Vaildatedtarget}`,
        analysis_stats: data.data.attributes.last_analysis_stats,
        reputation: data.data.attributes.reputation,
        categories: data.data.attributes.categories,
      });
      }      
      catch (error) {
       return Response.json({
        failure:true,
        message: `Something went wrong while scanning, ${Vaildatedtarget}!`,
        error:error.message
       })
      }
}


