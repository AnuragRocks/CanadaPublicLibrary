const axios = require('axios');
(async () => {
    let q1 = "Windsor, Canada";
    let q2 = "Toronto, Canada";
    let r1 = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q1)}&format=json&limit=1`, { headers: { 'User-Agent': 'Test' } });
    console.log('Centroid Windsor:', r1.data[0]?.display_name, r1.data[0]?.lat, r1.data[0]?.lon);
})();
