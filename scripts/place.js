const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

const temperature = parseFloat(document.getElementById("temp").textContent);
const windSpeed = parseFloat(document.getElementById("wind").textContent);
const chillSpan = document.getElementById("chill");

function calculateWindChill(temp, speed) {
  return (
    35.74 +
    0.6215 * temp -
    35.75 * Math.pow(speed, 0.16) +
    0.4275 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

if (temperature <= 50 && windSpeed > 3) {
  chillSpan.textContent = calculateWindChill(temperature, windSpeed) + " °F";
} else {
  chillSpan.textContent = "N/A";
}