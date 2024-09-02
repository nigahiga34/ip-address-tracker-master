
window.onload = () => {
    fetchUserIP();
};

async function fetchUserIP() {
    try {

        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();


        await fetchIPInfo(data.ip);
    } catch (error) {
        console.error('Error fetching user IP address:', error);
    }
}


async function fetchIPInfo(ip) {
    const apiKey = 'at_aOtUm1qLW5oHNyCTF578SiqGoMDPs'; 
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        updateUI(data);
    } catch (error) {
        console.error('Error fetching IP data:', error);
    }
}

function updateUI(data) {
    try {

        document.getElementById('ip-address').textContent = data.ip;
        document.getElementById('location').textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        document.getElementById('timezone').textContent = `UTC ${data.location.timezone}`;
        document.getElementById('isp').textContent = data.isp;


        const map = L.map('map').setView([data.location.lat, data.location.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        L.marker([data.location.lat, data.location.lng]).addTo(map)
            .bindPopup(`Location: ${data.location.city}`)
            .openPopup();
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

document.getElementById('search-button').addEventListener('click', async () => {
    const ip = document.getElementById('ip-input').value;
    if (ip) {
        await fetchIPInfo(ip);
    }
});
