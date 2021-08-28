// errorMasseges
document.getElementById('error-message').style.display = 'none';
document.getElementById('not-found').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //    clear data
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    if (searchText == '') {
        displayError('error-message');
    }
    else {
        // load data
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    }
}


const displayError = error => {
    if (error == 'error-message') {
        document.getElementById('error-message').style.display = 'block';
    }
    else if (error == 'not-found') {
        document.getElementById('not-found').style.display = 'block';
        searchResult.textContent = '';
    }
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    if (meals == null) {
        displayError('not-found');
    }
    else {
        searchResult.textContent = '';
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div onclick ="loadMealDetail(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>`;
            searchResult.appendChild(div);
        });
    }
}

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));

}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">View More</a>
            </div>`;
    mealDetails.appendChild(div);
}