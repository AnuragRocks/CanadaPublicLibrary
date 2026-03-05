const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
    try {
        const query = "book reading literature events in toronto site:eventbrite.ca OR site:meetup.com";
        const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
        const res = await axios.get(url, { headers: { 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
        const $ = cheerio.load(res.data);
        const events = [];
        $('.result').each((i, el) => {
            if (i < 5) {
                let title = $(el).find('.result__title a').text().trim();
                let linkEl = $(el).find('a.result__url');
                let link = linkEl.attr('href') ? linkEl.attr('href').trim() : '';
                if (link.includes('uddg=')) {
                    const u = new URL('https:' + link);
                    link = decodeURIComponent(u.searchParams.get('uddg'));
                } else if (link.startsWith('//')) {
                    link = 'https:' + link;
                }

                let desc = $(el).find('.result__snippet').text().trim();

                if (title && link && !title.includes('No events')) events.push({ title, link, desc });
            }
        });
        console.log(events);
    } catch (e) {
        console.log(e.message);
    }
}
scrape();
