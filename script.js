const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Functions
// Update total and Count
function updateSelectedCounter() {
const selectedSeats = document.querySelectorAll(".row .seat.selected");
const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

const selectedSeatsCount = selectedSeats.length;
count.innerText = selectedSeatsCount;

total.innerText = selectedSeatsCount * ticketPrice;
};


// Save movie index and price
function setMovieData(movieIndex, moviePrice) {
localStorage.setItem("selectedMovieIndex", movieIndex);
localStorage.setItem("selectedMoviePrice", moviePrice);
};


// Show data from local storage
function populateUI() {
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add("selected");
        }
    });
}

const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
if (selectedMovieIndex !== null) {
movieSelect.selectedIndex = selectedMovieIndex;
}
};

// Event Listeners
// Seat click event
container.addEventListener("click", (e) => {
if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
    e.target.classList.toggle("selected");
    updateSelectedCounter();
}
});

// Movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCounter();
});

// Initial count and total set
updateSelectedCounter();

