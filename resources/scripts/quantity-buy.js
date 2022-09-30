import { Crop, getCropQuality, baseCropArray, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';
import { getCropNumbers } from './sell-menu.js';



function getBestCrops(season, quantity, days, cropArray, profession, level, fertilizer, check) {
    /*days = eval(days);
    level = eval(level);
    console.log(season);
    console.log(days);
    console.log(level);
    console.log(profession);
    console.log(check);*/

    //filter out crops that are not in season
    let crops = cropArray.filter((value) => value.season.includes(season));
    //filter out crops who's growing period is longer than the amount of time left in the season
    crops = crops.filter((value) => value.matureDays < days);

    for (let i = 0; i < crops.length; i++) {
        delete crops[i].maxProfit;
        delete crops[i].mostHarvests;
        delete crops[i].singleProfit;
        delete crops[i].monthlyProfit;
        delete crops[i].monthlyHarvests;
        Object.defineProperty(crops[i], 'maxProfit', { enumerable: true, writable: true, configurable: true });
        Object.defineProperty(crops[i], 'mostHarvests', { enumerable: true, writable: true, configurable: true });
        Object.defineProperty(crops[i], 'singleProfit', { enumerable: true, writable: true, configurable: true });
        Object.defineProperty(crops[i], 'monthlyProfit', { enumerable: true, writable: true, configurable: true });
        Object.defineProperty(crops[i], 'monthlyHarvests', { enumerable: true, writable: true, configurable: true });
    }
    crops = crops.map((value) => {
        if (check == 'profit' && ((value.name !== 'Cactus Fruit') && (value.name !== 'Pineapple' && value.name !== 'Taro Root'))) {

            if (value.maxHarvests == 1 || ((value.name == 'Wheat' || value.name == 'Sunflower') && season == 'fall')) {
                value.singleProfit = (value.sellPrice - value.seedCost);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(28 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;

            } else if (value.maxHarvests > 1 || ((season == 'summer' && value.name == 'Coffee') || ((season == 'fall' && ((value.name == 'Corn'))) || (season == 'fall' && value.name == 'Ancient Fruit')))) {
                value.singleProfit = (value.sellPrice - value.seedCost);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice) - value.seedCost;

                remainingDays = 28 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice) - value.seedCost;
            } else if (((season == 'spring' && value.name == 'Coffee') || (season == 'summer' && value.name == 'Corn')) || ((season == 'fall' && value.name == 'Cactus Fruit') || (season == 'summer' && value.name == 'Ancient Fruit'))) {
                days = days + 28;
                value.singleProfit = (value.sellPrice - value.seedCost);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice) - value.seedCost;

                remainingDays = 56 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice) - value.seedCost;
                days = days - 28;
            } else if ((value.name == 'Sunflower' || value.name == 'Wheat') && season == 'summer') {
                days = days + 28;

                value.singleProfit = (value.sellPrice - value.seedCost);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(56 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;

                days = days - 28;
            } else if ((season == 'spring' && value.name == 'Ancient Fruit') || (season == 'summer' && value.name == 'Cactus Fruit')) {
                days = days + 56;
                value.singleProfit = (value.sellPrice - value.seedCost);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice) - value.seedCost;

                remainingDays = 84 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice) - value.seedCost;
                days = days - 56;
            } else {
                if (value.maxHarvests == 1 || (value.name == 'Wheat' || value.name == 'Sunflower')) {
                    value.singleProfit = (value.sellPrice);

                    value.mostHarvests = Math.floor(days / value.matureDays);

                    value.maxProfit = value.singleProfit * value.mostHarvests;

                    value.monthlyHarvests = Math.floor(28 / value.matureDays);

                    value.monthlyProfit = value.monthlyHarvests * value.singleProfit;
                } else {
                    value.singleProfit = (value.sellPrice);

                    let remainingDays = days - (value.matureDays + 1);
                    value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                    value.maxProfit = (value.mostHarvests * value.sellPrice);

                    remainingDays = 28 - (value.matureDays + 1);
                    value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                    value.monthlyProfit = (value.monthlyHarvests * value.sellPrice);
                }
            }
        } else {
            if (value.maxHarvests == 1 || value.name == 'Wheat') {
                value.singleProfit = (value.sellPrice);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(28 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;
            } else {
                value.singleProfit = (value.sellPrice);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice);

                remainingDays = 28 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice);
            }
        }

        return value;
    })


    crops = crops.sort((a, b) => {
        return a.maxProfit - b.maxProfit;
    });
    crops = crops.reverse();


    let crop1 = crops[0];
    getCropNumbers(crops, quantity, crop1, days, fertilizer, level, profession, profit);

    /* #region  first html elements */
    $('div, #result-div').remove();

    let resultDiv = document.createElement('div');
    resultDiv.setAttribute('id', 'result-div');
    resultDiv.style.padding = '1rem 1rem 2rem';

    let main = document.getElementById('main');

    let divTitle = document.createElement('p');
    divTitle.setAttribute('id', 'div-title');
    divTitle.innerHTML = 'Profit';

    let breaklineTitle = document.createElement('hr');

    $(resultDiv).appendTo(main);
    $(divTitle).appendTo(resultDiv);
    $(breaklineTitle).appendTo(resultDiv);

    $(main).css('flex-direction', 'column');
    /* #endregion */

    /* #region  other html elements */
    let cropDiv = document.createElement('div');
    cropDiv.setAttribute('class', 'crop-div');


    $(cropDiv).appendTo(resultDiv);

    let cropTitle = document.createElement('p');
    cropTitle.setAttribute('class', 'crop-title');
    cropTitle.textDecoration = 'underline';
    cropTitle.innerHTML = crop1.name;

    let singleProfitAmount = document.createElement('p');
    singleProfitAmount.setAttribute('class', 'crop-info');
    let singleSpan = document.createElement('span');
    singleSpan.setAttribute('class', 'span');
    singleSpan.innerHTML = crop1.singleProfit.toLocaleString('en-US', 'USD');
    singleProfitAmount.innerHTML = 'Single Harvest: ';
    $(singleSpan).appendTo(singleProfitAmount);

    let remainingMonthlyAmount = document.createElement('p');
    remainingMonthlyAmount.setAttribute('class', 'crop-info');
    let remainingSpan = document.createElement('span');
    remainingSpan.setAttribute('class', 'span');
    remainingSpan.innerHTML = crop1.maxProfit.toLocaleString('en-US', 'USD');
    remainingMonthlyAmount.innerHTML = 'Remaining Harvests Profit: ';
    $(remainingSpan).appendTo(remainingMonthlyAmount, '::after');



    $(remainingMonthlyAmount).hover(function () {
        let remainingContainer = document.createElement('div');
        remainingContainer.setAttribute('id', 'remaining-container');
        let main = document.getElementById('main');
        $(remainingContainer).appendTo(main);

        let disclaimer1 = document.createElement('p');
        disclaimer1.setAttribute('class', 'disclaimer');
        disclaimer1.style.margin = '0';
        disclaimer1.innerHTML = 'Remaining profit is based on remaining harvests in the season(s).';

        $(disclaimer1).appendTo(remainingContainer);

    }, function () {
        let remainingContainer = document.getElementById('remaining-container');
        $(remainingContainer).remove();
    })

    let potentialMonthlyAmount = document.createElement('p');
    potentialMonthlyAmount.setAttribute('class', 'crop-info');
    let potentialSpan = document.createElement('span');
    potentialSpan.setAttribute('class', 'span');
    potentialSpan.innerHTML = crop1.monthlyProfit.toLocaleString('en-US', 'USD');
    potentialMonthlyAmount.innerHTML = 'Potential Total for Season(s): ';
    $(potentialSpan).appendTo(potentialMonthlyAmount);

    $(potentialMonthlyAmount).hover(function () {
        let potentialContainer = document.createElement('div');
        potentialContainer.setAttribute('id', 'potential-container');
        let main = document.getElementById('main');
        $(potentialContainer).appendTo(main);

        let disclaimer1 = document.createElement('p');
        disclaimer1.setAttribute('class', 'disclaimer');
        disclaimer1.style.margin = '0';
        disclaimer1.innerHTML = 'Potential profit is based on harvests from the start of the current season to the end of last season crop can be grown.';

        $(disclaimer1).appendTo(potentialContainer);


    }, function () {
        $('#potential-container').remove();
    })

    $(cropTitle).appendTo(cropDiv);

    $(singleProfitAmount).appendTo(cropDiv);
    $(remainingMonthlyAmount).appendTo(cropDiv);
    $(potentialMonthlyAmount).appendTo(cropDiv);
    /* #endregion */
}












let form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let season = form.season.value;
    let quantityToBuy = form['quantity-to-buy'].value;
    let days = form.days.value;
    let fertilizer = form.fertilizer.value;
    let level = form.level.value;
    let profession = form.profession.value;
    let formulaCheck = form['profit-type'].value;
    let crops = document.getElementsByName('crops');
    let cropsArray = [];
    for (let i = 0; i < crops.length; i++) {
        if (crops[i].checked == true) {
            cropsArray.push(eval(crops[i].value.toString()));
        }
    }
    for (let j = 0; j < cropsArray.length; j++) {
        baseCropArray.push(cropsArray[j]);
    }
    getBestCrops(season, quantityToBuy, days, baseCropArray, profession, level, fertilizer, formulaCheck);
    console.log(form.elements);
})