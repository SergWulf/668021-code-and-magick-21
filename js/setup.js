'use strict';

const COUNT_WIZARDS = 4;
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const LIST_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const LIST_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
const LIST_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

const randomElementOfArray = function (listElements) {
  return Math.floor(Math.random() * listElements.length);
};

const createWizards = function (countWizards) {
  const wizards = [];
  for (let i = 0; i < countWizards; i++) {
    const oldWizard = {
      name: NAMES[randomElementOfArray(NAMES)] + ' ' + SURNAMES[randomElementOfArray(SURNAMES)],
      coatColor: LIST_COAT_COLOR[randomElementOfArray(LIST_COAT_COLOR)],
      eyesColor: LIST_EYES_COLOR[randomElementOfArray(LIST_EYES_COLOR)]
    };
    wizards.push(oldWizard);
  }
  return wizards;
};

// Функция добавления данных волшебника из объекта в вёрстку
const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Ищем окно setup
const setup = document.querySelector('.setup');

// Создаем волшебников
const listWizards = createWizards(COUNT_WIZARDS);

// Создаем шаблон для отображения волшебника
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Создаем фрагмент и наполняем его волшебниками
const fragment = document.createDocumentFragment();
for (let i = 0; i < listWizards.length; i++) {
  fragment.appendChild(renderWizard(listWizards[i]));
}

// Ищем блок, в котором будем отображать волшебников
const similarListElement = setup.querySelector('.setup-similar-list');

// Вставляем в разметку новые блоки с волшебниками из фрагмента
similarListElement.appendChild(fragment);

// Показываем новых волшебников
document.querySelector('.setup-similar').classList.remove('hidden');


// Отображем setup (убираем класс hidden)

const setupOpen = document.querySelector('.setup-open');
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});

// Когда в фокусе кнопка setup-open, то по нажатию Enter запускать окно настроек
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setup.classList.remove('hidden');
  }
});

// Пишем обработчик закрытия окна настроек по клику мыши
const setupClose = setup.querySelector('.setup-close');
setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});

// Обработчик закрытия окна настроек на кнопку ESC, если фокус находится в строке ввода, то не закрывать окно
document.addEventListener('keydown', function (evt) {
  if ((!document.activeElement.matches('.setup-user-name')) && (evt.key === 'Escape')) {
    setup.classList.add('hidden');
  }
});

// Если окно открыто и фокус находится на кнопке закрытия окна
// 1. Проверить наличие фокуса на кнопке закрытия
// 2. Проверить наличие класса hidden в элементе окна настроек, если нет, то открыто окно
// 3. Если оба условия предыдущих совпадают и нажата клавиша Enter, то закрыть окно.

setupClose.addEventListener('keydown', function (evt) {
  if (!setup.classList.contains('hidden')) {
    if (evt.key === 'Enter') {
      setup.classList.add('hidden');
    }
  }
});

// Находим блоки глаз, мантии и файерболла в окне настроек
const coatWizard = setup.querySelector('.wizard-coat');
const eyesWizard = setup.querySelector('.wizard-eyes');
const fireballWizard = setup.querySelector('.setup-fireball-wrap');

coatWizard.addEventListener('click', function () {
  const currentCoatColor = LIST_COAT_COLOR[randomElementOfArray(LIST_COAT_COLOR)];
  document.getElementsByName('coat-color')[0].value = currentCoatColor;
  coatWizard.style.fill = currentCoatColor;
});

fireballWizard.addEventListener('click', function () {
  const currentFireballColor = LIST_FIREBALL_COLOR[randomElementOfArray(LIST_FIREBALL_COLOR)];
  document.getElementsByName('fireball-color')[0].value = currentFireballColor;
  fireballWizard.style.background = currentFireballColor;
});

eyesWizard.addEventListener('click', function () {
  const currentEyesColor = LIST_EYES_COLOR[randomElementOfArray(LIST_EYES_COLOR)];
  document.getElementsByName('eyes-color')[0].value = currentEyesColor;
  eyesWizard.style.fill = currentEyesColor;
});
