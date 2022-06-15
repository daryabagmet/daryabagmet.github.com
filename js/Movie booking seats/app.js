const container = document.querySelector('.cinema-seats'),
	seatsArray = document.querySelectorAll('.cinema-seats__row .seats'),
	movieList = document.getElementById('movie-list'),
	btnClear = document.getElementById('clear-seats');

let movieIndex = movieList.selectedIndex,
	moviePrice = movieList.options[movieIndex].value,
	totalSeats = document.querySelector('.js-total-seats'),
	totalAmount = document.querySelector('.js-total-cost'),
	totalMovie = document.querySelector('.js-total-movie'),
	selected = new Map();

this.renderSeats();

movieList.addEventListener('change', (e)=>{
    movieIndex = e.target.selectedIndex;
    moviePrice = e.target.options[movieIndex].value;

    this.clearSeats();
});

container.addEventListener('click', (e)=>{
    let element = e.target;


    if(element.closest('.seats')) {
        if(element.classList.contains('occupied')) return
        
        element.classList.toggle('selected');

        this.updateBookingInfo();
    }
});

btnClear.addEventListener('click', (e)=> {
    this.clearSeats();
});

function updateBookingInfo() {
    seatsArray.forEach((item, index)=>{
        if(item.classList.contains('selected')){
            selected.set(index, item); 
        }else if(selected.has(index)){
            selected.delete(index);
        }
    });
   
    totalSeats.innerText = parseInt(selected.size);
    totalAmount.innerText = parseInt(selected.size) * moviePrice;
    totalMovie.innerText = movieList.options[movieIndex].text;

    this.setSelectedData();
}

function setSelectedData() {
    let seats = [...selected.keys()];
    
    localStorage.setItem('seats', JSON.stringify(seats));
    localStorage.setItem('movie', JSON.stringify(movieIndex));
}

function renderSeats() {
    if(localStorage.getItem('seats') && localStorage.getItem('movie')) {
        
        let selectedSeats = JSON.parse(localStorage.getItem('seats'));

        seatsArray.forEach((item, index)=>{
            if(selectedSeats.indexOf(index) != -1) {
                seatsArray[index].classList.add('selected')
            }
        });

        movieIndex = JSON.parse(localStorage.getItem('movie'));
        movieList.selectedIndex = movieIndex;
        moviePrice = movieList.options[movieIndex].value;

        this.updateBookingInfo();
    }
    
}

function clearSeats() {
   if (!seatsArray.length) return

    seatsArray.forEach((item) => {
        item.classList.remove('selected');
    });

    this.updateBookingInfo();
}