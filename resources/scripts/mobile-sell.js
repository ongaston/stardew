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

let mainInfo = document.getElementById('info-button-main');

mainInfo.style.top = rect.top - 7 + ('px');
mainInfo.style.right = rect.left - 7 + ('px');

let mainBackground = document.getElementById('button-background');

mainBackground.style.top = rect.top - 7 + ('px');
mainBackground.style.right = rect.left - 7 + ('px');
mainBackground.style.width = mainInfo.width;
mainBackground.style.height = mainInfo.height;

$(function () {

    $('#form').on('submit', function () {

        let mobileCheck = document.getElementById('mobile-check');
        if ($(mobileCheck).css('display') == 'block') {
            let mobileInfo = document.getElementById('mobile-info-button');
            mobileInfo.style.display = 'block';
            mobileInfo.style.setProperty('--display','block');

            let resultDiv = document.getElementById('result-div');
            let resultRect = resultDiv.getBoundingClientRect();

            //mobileInfo.style.setProperty('--top', resultRect.top + 225 + ('px'));
            mobileInfo.style.top = resultRect.top + 225 + ('px');
            mobileInfo.style.right = resultRect.left + 13 + ('px');

            console.log(mobileInfo);
        }

    })

})