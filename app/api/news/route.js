import NewsAPI from 'newsapi';


//News Scan
export async function POST(request) {
  //News API
  const newsapi = '7c25db33939141c7a279f8e6d66177a6'
  const body = await request.json();
  console.log('🧾 Full Body:', body);

  const { target } = body;
  console.log('🎯 Extracted Target:', target);

  try {
  const url = new URL('https://newsapi.org/v2/everything');
  url.searchParams.append('q', target);
  url.searchParams.append('sources', 'bbc-news,the-verge');
  url.searchParams.append('domains', 'bbc.co.uk,techcrunch.com');
  url.searchParams.append('language', 'en');
  url.searchParams.append('sortBy', 'relevancy');
  url.searchParams.append('apiKey', newsapi);

  const res = await fetch(url);
  const data = await res.json();

  return Response.json({
    success: true,
      message: `Successfully Fetched News for: ${target}`,
      totalResults: data.totalResults,
      articles: data.articles,
  });
  }      
  catch (error) {
    console.log(error)
    return Response.json({
    failure:true,
    message: `Something went wrong while scanning, ${target}!`,
    })
  }
}


