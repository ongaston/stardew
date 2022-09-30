import { Crop, getCropQuality, baseCropArray, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';




function getBestCrops(season, quantity, days, cropArray, profession, level, fertilizer, check) {
    days = eval(days);
    level = eval(level);
    //filter out crops that are not in season
    let potentialCropArray = cropArray.filter((value) => value.season.includes(season));
    //filter out crops who's growing period is longer than the amount of time left in the season
    potentialCropArray = potentialCropArray.filter((value) => value.matureDays < days);
    
    for (let i = 0; i < potentialCropArray.length; i++) {
        delete potentialCropArray[i].maxProfit;
        Object.defineProperty(potentialCropArray[i], 'maxProfit', { enumerable: true, writable: true, configurable: true });
    }



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
        let formulaCheck = form['formula-switch'].checked;
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