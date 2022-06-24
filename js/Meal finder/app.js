const mainContainer = document.querySelector('.js-main-container'),
        searchForm = document.getElementById('meal-search-form'),
        searchFormInput = document.getElementById('meal-search'),
        mealsContainer = document.querySelector('.js-meals-container'),
        recipePopup = document.querySelector('.js-meal-recipe__popup'),
        recipePopupClose = document.querySelector('.js-meal-recipe__popup-close'),
        recipeTitle = document.querySelector('.js-meal-recipe__title'),
        recipePhoto = document.querySelector('.js-meal-recipe__photo'),
        recipeDescription = document.querySelector('.js-meal-recipe__description'),
        recipeList = document.querySelector('.js-meal-recipe__ingridients'),
        randomMealsBtn = document.getElementById('meal-random-btn');

let resultTitle = document.querySelector('.js-meals-result-title'),
    meal = '';
       
function getRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            showResults(data, 'random');
        });
}

function getMeals(e) {
    e.preventDefault();
    meal = searchFormInput.value;

    if(meal.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(response => response.json())
        .then(data => {
            showResults(data);
        });

    } else {
        alert('Please, enter the correct meal name');
    }
    
    searchFormInput.value = '';
    
}

function getMealsById(id) {
    if(id) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            showMealRecipe(data.meals[0]);
        });
    }
}

function showMealRecipe(meal) {
    const ingridients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){
            ingridients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else {
            break
        }
    }
   
    const ingridientsList = ingridients.map(item => `<li>${item}</li>`).join('');

    recipeTitle.innerText = meal.strMeal;
    recipePhoto.src = meal.strMealThumb;
    recipeDescription.innerText = meal.strInstructions;
    recipeList.innerHTML = ingridientsList;
    openPopup();
}

function showResults(data, str) {
    if(data.meals === null) {
        resultTitle.innerText = 'No such meals. Try again';
        mealsContainer.innerHTML = '';
    } else {
        resultTitle.innerText = str ? 'Random meal' : `Search results for "${meal}"`;

        mealsContainer.innerHTML = 
            data.meals.map(meal => 
                `<div class="meals-item">
                    <img class="meals-item__img" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meals-item__info">
                        ${meal.strMeal}
                    </div>
                    <div class="meals-item__shadow" data-meal-id="${meal.idMeal}">
                        <i class="fas fa-mortar-pestle"/></i>
                    </div>
                </div>`
            ).join('');
    }
    
}

function closePopup() {
    mainContainer.classList.remove('popup-shadow');
    recipePopup.style.display = 'none';
}

function openPopup() {
    mainContainer.classList.add('popup-shadow');
    recipePopup.style.display = 'flex';
}

searchForm.addEventListener('submit', getMeals);

mealsContainer.addEventListener('click', (e)=>{
    let mealsItem = e.target.closest('.meals-item__shadow');

    if(mealsItem) {
        let mealId = mealsItem.getAttribute('data-meal-id');
        
        getMealsById(mealId);
    }
});

mainContainer.addEventListener('click', (e) => {
    if(!e.target.closest('.js-meal-recipe__popup')) {
        closePopup();
    }
});

recipePopupClose.addEventListener('click', closePopup);

randomMealsBtn.addEventListener('click', getRandomMeal);