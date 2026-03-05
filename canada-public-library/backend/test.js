const axios = require('axios');
async function test() {
    try {
        const nom = await axios.get('https://nominatim.openstreetmap.org/search?q=library+in+Toronto,+ON&format=json&limit=5', {
            headers: { 'User-Agent': 'CanadaLibraryApp/1.0' }
        });
        console.log(nom.data);
    } catch (e) { console.error(e.message); }
}
test();
