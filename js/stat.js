'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 16;
const COLUMN_WIDTH = 40;
const COLUMN_HEIGHT = 150;
const COLUMN_SPACING = 50;

const texts = ['Ура вы победили!', 'Список результатов:'];

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const maxValue = function (values) {
  let maxCurrentValue = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > maxCurrentValue) {
      maxCurrentValue = values[i];
    }
  }
  return maxCurrentValue;
};

const outLineByLine = function (ctx, lines, x, y, lineSpacing) {
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y);
    y += lineSpacing;
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем полупрозрачный фон для тени
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  // Рисуем белый фон
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Вывод текста
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  outLineByLine(ctx, texts, 120, 40, 20);

  let onePercentHeightColumn = COLUMN_HEIGHT / 100;
  let onePercentMaxScorePlayer = 0;
  let columnOffset = COLUMN_WIDTH + COLUMN_SPACING;
  let maxScorePlayer = maxValue(times); // Найти игрока с максимальным значением
  let columnHeightPlayer = 0;
  let colorColumnPlayer = '';
  let colorBlack = '#000000';
  let firstPlayerX = CLOUD_X + COLUMN_SPACING; // Начальная координата X отрисовки гистограммы
  let firstPlayerY = CLOUD_HEIGHT - CLOUD_Y; // Начальная координата Y отрисовки гистограммы
  let columnPlayerY = 0;

  // Найти количество очков соответсвующее одному проценту от максимального значения
  onePercentMaxScorePlayer = maxScorePlayer / 100;
  // Отрисовка гистаграмм игроков
  for (let j = 0; j < names.length; j++) {
    // Рассчитываем высоту гистограммы игрока, 100% это максимальная, она равна высоте колонки.
    columnHeightPlayer = Math.floor(times[j] / onePercentMaxScorePlayer * onePercentHeightColumn);
    // Определяем цвета гистограмм, у противников синий со случайной насыщенностью
    colorColumnPlayer = (names[j] === 'Вы') ? 'hsl(0, 100%, 50%)' : 'hsl(240, ' + (Math.floor(Math.random() * 100) + 1) + '%' + ', 50%)';
    ctx.fillStyle = colorBlack;
    ctx.textBaseline = 'bottom';
    columnPlayerY = firstPlayerY - FONT_GAP - columnHeightPlayer;
    ctx.fillText(String(Math.round(times[j])), firstPlayerX + columnOffset * j, columnPlayerY);
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(names[j], firstPlayerX + columnOffset * j, firstPlayerY);
    ctx.fillStyle = colorColumnPlayer;
    ctx.fillRect(firstPlayerX + columnOffset * j, columnPlayerY, COLUMN_WIDTH, columnHeightPlayer);
  }
};
