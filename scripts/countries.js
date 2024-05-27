document.addEventListener('DOMContentLoaded', function() {
    let addToFavoritesButtons = document.querySelectorAll('.plus');
    let heartButtons = document.querySelectorAll('.heart');
    let visitedCountriesList = document.querySelector('.visited-countries');
    let emptyMessage = document.querySelector('.empty-message');
    
    function updateEmptyMessage() {
        if (visitedCountriesList.children.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none'; 
        }
    }

    function saveState() {
        let countries = [];
        visitedCountriesList.querySelectorAll('li').forEach(function(item) {
            countries.push(item.textContent);
        });
        localStorage.setItem('visitedCountries', JSON.stringify(countries));

        let likedCountries = [];
        heartButtons.forEach(function(button) {
            if (button.classList.contains('active')) {
                let countryCard = button.parentElement;
                let countryName = countryCard.querySelector('.country__name').textContent;
                likedCountries.push(countryName);
            }
        });
        localStorage.setItem('likedCountries', JSON.stringify(likedCountries));
    }

    function loadState() {
        let countries = JSON.parse(localStorage.getItem('visitedCountries'));
        if (countries && countries.length > 0) {
            countries.forEach(function(countryName) {
                let visitedCountry = document.createElement('li');
                visitedCountry.textContent = countryName;
                visitedCountriesList.appendChild(visitedCountry);

                addToFavoritesButtons.forEach(function(button) {
                    let countryCard = button.parentElement;
                    let name = countryCard.querySelector('.country__name').textContent;
                    if (name === countryName) {
                        button.classList.add('active');
                        button.querySelector('.tooltip').textContent = 'Удалить из посещенных стран';
                    }
                });
            });
        }

        let likedCountries = JSON.parse(localStorage.getItem('likedCountries'));
        if (likedCountries && likedCountries.length > 0) {
            heartButtons.forEach(function(button) {
                let countryCard = button.parentElement;
                let countryName = countryCard.querySelector('.country__name').textContent;
                if (likedCountries.includes(countryName)) {
                    button.classList.add('active');
                    button.querySelector('.tooltip').textContent = 'Мне не нравится';
                }
            });
        }
        
        updateEmptyMessage();
    }

    loadState();

    addToFavoritesButtons.forEach(function(button) {
        button.onclick = function() {
            let countryCard = this.parentElement;
            let countryName = countryCard.querySelector('.country__name').textContent;

            let visitedCountryItems = visitedCountriesList.querySelectorAll('li');
            let countryAlreadyVisited = false;

            visitedCountryItems.forEach(function(item) {
                if (item.textContent === countryName) {
                    countryAlreadyVisited = true;
                    visitedCountriesList.removeChild(item);
                    button.classList.remove('active');
                    button.querySelector('.tooltip').textContent = 'Добавить в посещенные страны';
                    return;
                }
            });

            if (!countryAlreadyVisited) {
                let visitedCountry = document.createElement('li');
                visitedCountry.textContent = countryName;
                visitedCountriesList.appendChild(visitedCountry);
                button.classList.add('active');
                button.querySelector('.tooltip').textContent = 'Удалить из посещенных стран';
            }
            
            updateEmptyMessage();
            saveState();
        }
    });

    heartButtons.forEach(function(button) {
        button.onclick = function() {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                button.querySelector('.tooltip').textContent = 'Мне не нравится';
            } else {
                button.querySelector('.tooltip').textContent = 'Мне нравится';
            }
            saveState();
        }
    });

    let buttons = document.querySelectorAll('.country__button');

    buttons.forEach(function(button) {
        button.onclick = function() {
            let textBlock = this.previousElementSibling;

            if (textBlock.style.maxHeight === 'none') {
                textBlock.style.maxHeight = '80px';
                textBlock.classList.add('collapsed');
                this.textContent = 'Узнать больше';
            } else {
                textBlock.style.maxHeight = 'none';
                textBlock.classList.remove('collapsed');
                this.textContent = 'Скрыть';
            }
        }
    });
});