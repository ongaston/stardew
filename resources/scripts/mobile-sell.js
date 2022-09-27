let mobile = document.getElementById('mobile-check');

if ($(mobile).css('display') == 'block') {

    let level = document.getElementById('farming-level');
    let days = document.getElementById('days-left');
    let season = document.getElementById('season');
    let daysInput = document.getElementById('days');
    let levelInput = document.getElementById('level');

    days.innerHTML = 'Days: ';
    level.innerHTML = 'Level: ';
    season.innerHTML = '-- Select Season --';
    daysInput.style.width = '2rem';
    daysInput.style.textAlign = 'center';
    levelInput.style.width = '2rem';
    levelInput.style.textAlign = 'center';


}

let daysInput = document.getElementById('days');
let levelInput = document.getElementById('level');

daysInput.style.width = '2rem';
daysInput.style.textAlign = 'center';
levelInput.style.width = '2rem';
levelInput.style.textAlign = 'center';

let form = document.getElementById('form');
let rect = form.getBoundingClientRect();
console.log(rect);

let mainInfo = document.getElementById('info-button-main');

mainInfo.style.top = rect.top - 7 + ('px');
mainInfo.style.right = rect.left - 7 + ('px');

let mainBackground = document.getElementById('button-background');

mainBackground.style.top = rect.top - 7 + ('px');
mainBackground.style.right = rect.left - 7 + ('px');
mainBackground.style.width = mainInfo.width;
mainBackground.style.height = mainInfo.height;