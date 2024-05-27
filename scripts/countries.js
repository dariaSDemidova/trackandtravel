// Находим все кнопки "Узнать больше"
let buttons = document.querySelectorAll('.country__button');

// Проходимся по каждой кнопке и устанавливаем обработчик события
buttons.forEach(function(button) {
    button.onclick = function() {
        // Находим блок с текстом, который находится перед кнопкой
        let textBlock = this.previousElementSibling;

        // Проверяем текущую высоту блока с текстом
        if (textBlock.style.maxHeight === 'none') {
            // Если блок текста развернут, сжимаем его до 80px
            textBlock.style.maxHeight = '80px'; 
            // Добавляем класс 'collapsed', чтобы применить стили для свернутого блока
            textBlock.classList.add('collapsed'); 
            // Меняем текст кнопки на "Узнать больше"
            this.textContent = 'Узнать больше';
        } else {
            // Если блок текста свернут, разворачиваем его
            textBlock.style.maxHeight = 'none'; 
            // Удаляем класс 'collapsed'
            textBlock.classList.remove('collapsed'); 
            // Меняем текст кнопки на "Скрыть"
            this.textContent = 'Скрыть';
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    let addToFavoritesButtons = document.querySelectorAll('.plus');
    let heartButtons = document.querySelectorAll('.heart');
    let visitedCountriesList = document.querySelector('.visited-countries');
    let emptyMessage = document.querySelector('.empty-message');
    
    // Функция для обновления состояния сообщения
    function updateEmptyMessage() {
        if (visitedCountriesList.children.length === 0) {
            emptyMessage.style.display = 'block'; // Показываем сообщение
        } else {
            emptyMessage.style.display = 'none'; // Скрываем сообщение
        }
    }
    
    // Проверка состояния при загрузке страницы
    updateEmptyMessage();
    
    // Проходимся по каждой кнопке "добавить в посещенные" и устанавливаем обработчик события
    addToFavoritesButtons.forEach(function(button) {
        button.onclick = function() {
            // Получаем родительский элемент кнопки
            let countryCard = this.parentElement;
            // Получаем название страны
            let countryName = countryCard.querySelector('.country__name').textContent;
            
            // Проверяем, была ли уже добавлена эта страна
            let visitedCountryItems = visitedCountriesList.querySelectorAll('li');
            let countryAlreadyVisited = false;
            
            visitedCountryItems.forEach(function(item) {
                if (item.textContent === countryName) {
                    countryAlreadyVisited = true;
                    // Если страна уже посещена, удаляем её из списка и выходим из цикла
                    visitedCountriesList.removeChild(item);
                    button.classList.remove('active'); // Удаляем класс 'active'
                    return;
                }
            });
            
            // Если страна еще не посещена, добавляем её в список
            if (!countryAlreadyVisited) {
                let visitedCountry = document.createElement('li');
                visitedCountry.textContent = countryName;
                visitedCountriesList.appendChild(visitedCountry);
                button.classList.add('active'); // Добавляем класс 'active'
            }
            
            // Обновляем состояние сообщения
            updateEmptyMessage();
        }
    });

    // Проходимся по каждой кнопке "нравится" и устанавливаем обработчик события
    heartButtons.forEach(function(button) {
        button.onclick = function() {
            button.classList.toggle('active'); // Переключаем класс 'active'
        }
    });
});