const axios = require('axios');
const scrapeCoverImage = async (query) => {
    try {
        const response = await axios.get(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query + ' book cover')}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const match = response.data.match(/<img[^>]*src="([^"]+)"/g);
        if (match) {
            for (const imgTag of match) {
                if (imgTag.includes('encrypted-tbn0.gstatic.com/images')) {
                    const srcMatch = imgTag.match(/src="([^"]+)"/);
                    if (srcMatch && srcMatch[1]) {
                        return srcMatch[1];
                    }
                }
            }
        }
    } catch (e) {
        console.error("Scrape error", e.message);
    }
    return null;
}
scrapeCoverImage('Rich Dad Poor Dad').then(url => console.log('Image URL:', url));
