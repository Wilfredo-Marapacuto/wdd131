let count = localStorage.getItem("reviews");

if (!count) {
    count = 0;
}

count++;
localStorage.setItem("reviews", count);

document.getElementById("counter").textContent = count;