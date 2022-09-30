let mobile = document.getElementById('mobile-check');

if ($(mobile).css('display') == 'block') {

    let gold = document.getElementById('gold');
    let level = document.getElementById('farming-level');
    let days = document.getElementById('days-left');
    let season = document.getElementById('season');
    let daysInput = document.getElementById('days');
    let levelInput = document.getElementById('level');
    let goldInput = document.getElementById('gold-to-spend');

    gold.innerHTML = 'Gold: ';
    days.innerHTML = 'Days: ';
    level.innerHTML = 'Level: ';
    season.innerHTML = '-- Select Season --';
    daysInput.style.width = '2rem';
    daysInput.style.textAlign = 'center';
    levelInput.style.width = '2rem';
    levelInput.style.textAlign = 'center';
    goldInput.style.width = '4rem';
    goldInput.style.textAlign = 'center';

    let additionalCropsTitle = document.getElementById('additional-crops');
    additionalCropsTitle.style.fontSize = '23px';
    additionalCropsTitle.style.fontWeight = 'bold';

    let breakOne = document.createElement('hr');
    let breakTwo = document.createElement('hr');

    $(breakOne).appendTo('#form');
    $('#additional-crops').appendTo('#form');
    $('#crops-available').appendTo('#form');
    $(breakTwo).appendTo('#form');
    $('#formula-container').appendTo('#form');
    $('#submit').appendTo('#form');

    $('#form').on('submit', function () {
        let breakThree = document.createElement('hr');
        $(breakThree).appendTo('#form');
    })

}

let daysInput = document.getElementById('days');
let levelInput = document.getElementById('level');
let goldInput = document.getElementById('gold-to-spend');

daysInput.style.width = '2rem';
daysInput.style.textAlign = 'center';
levelInput.style.width = '2rem';
levelInput.style.textAlign = 'center';
goldInput.style.width = '4rem';
goldInput.style.textAlign = 'center';