// === получение элементов ===
const engWord = document.getElementById('eng'),
    rusWord = document.getElementById('rus'),
    addWordBtn = document.getElementById('add-word-btn'),
    table = document.getElementById('table'),
    inputs = document.getElementsByClassName('input');
// === / получение элементов ===



// === объявление переменных ===
let words; // массив для хранения слов и для localStorage
let btnsDelete;
// === / объявление переменных ===



// === объявление функций ===
function CreateWord(english, russian) {
    this.english = english;
    this.russian = russian;
};

// Выводим в HTML из массива words определенную строчку по индексу
const addWordToTable = index => {
    table.innerHTML += `
    <tr class='tr'>
        <td class='eng-word'>${words[index].english}</td>
        <td class='rus-word'>${words[index].russian}</td>
        <td>
            <button class='btn-delete'>x</button>
        </td>
    </tr>
    `;
    addEventDelete();
};
const deleteWord = e => {
    //сохряняем rowIndex у элемента
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    // удаляем строчку в HTML у элемента
    e.target.parentNode.parentNode.parentNode.remove();
    // удаляем из массива 1 элемент с порядковым номером rowIndex
    words.splice(rowIndex,1);

    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));

};

const addEventDelete = () => {
    if (words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for (let btn of btnsDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            })
        }
    }
};
// === / объявление функций ===



// === вызов функций ===
// работа с LocalStorage
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));
// выводим все значения из localStorage в HTML
words.forEach((element, i) => {
    addWordToTable(i);
});
// удаление строчки по нажатию на кнопку delete
addEventDelete();
// === / вызов функций ===



// === события ===
addWordBtn.addEventListener('click', () => {
    // валидация
    if (engWord.value.length < 1 ||
        rusWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(rusWord.value)
    ) {
        // ставим класс error
        for (let key of inputs) {
            key.classList.add('error');
        }
    } else {
        //убираем класс error
        for (let key of inputs) {
            key.classList.remove('error');
        }
        //записываем в массив words новые слова
        words.push(new CreateWord(engWord.value, rusWord.value));
        //записываем в localStorage новые слова
        localStorage.setItem('words', JSON.stringify(words));
        //выводим в HTML таблицу последнее значение 
        addWordToTable(words.length - 1);
        //обнуляем значение в инпутах
        engWord.value = null;
        rusWord.value = null;
    }
});
// === / события ===