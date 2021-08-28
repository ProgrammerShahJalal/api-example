// errorMasseges
document.getElementById('error-message').style.display = 'none';
document.getElementById('not-found').style.display = 'none';
const searchFood = async () => {
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
        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.meals);
        }
        catch {
            displayError('error-message');
        }
        /* fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error)); */
    }
}
const spinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const displayError = error => {
    if (error == 'error-message') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('not-found').style.display = 'none';
    }
    else if (error == 'not-found') {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('not-found').style.display = 'block';
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

const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);
    /* fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0])); */

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