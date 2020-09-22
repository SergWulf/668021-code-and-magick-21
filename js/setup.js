'use strict';

// Ищем окно и отображем его(убираем класс hidden)
const setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Ищем блок, в котором будем отображать волшебников
const similarListElement = setup.querySelector('.setup-similar-list');

// Создаем шаблон для отображения волшебника
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

const COUNT_WIZARDS = 4;
const vornames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const listCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const listEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

const randomElementOfArray = function (listElements) {
  return Math.floor(Math.random() * listElements.length);
};

const createWizards = function (countWizards) {
  const wizards = [];
  for (let i = 0; i < countWizards; i++) {
    let oldWizard = {
      name: vornames[randomElementOfArray(vornames)] + ' ' + surnames[randomElementOfArray(surnames)],
      coatColor: listCoatColor[randomElementOfArray(listCoatColor)],
      eyesColor: listEyesColor[randomElementOfArray(listEyesColor)]
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

// Создаем волшебников
const listWizards = createWizards(COUNT_WIZARDS);

// Создаем фрагмент и наполняем его волшебниками
const fragment = document.createDocumentFragment();
for (let j = 0; j < listWizards.length; j++) {
  fragment.appendChild(renderWizard(listWizards[j]));
}
// Вставляем в разметку новые блоки с волшебниками из фрагмента
similarListElement.appendChild(fragment);

// Показываем новых волшебников
document.querySelector('.setup-similar').classList.remove('hidden');
