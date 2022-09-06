

class Crop {
    constructor(season, seedCost, matureDays, harvestDays, sellPrice, maxHarvests, name) {
        this.season = season;
        this.seedCost = seedCost;
        this.matureDays = matureDays;
        this.harvestDays = harvestDays;
        this.sellPrice = sellPrice;
        this.maxHarvests = maxHarvests;
        this.growingDays = this.matureDays + ((this.maxHarvests - 1) * this.harvestDays);
        this.name = name;
    }
    get gpd() {
        let gpd = ((this.maxHarvests * this.sellPrice) - this.seedCost) / this.growingDays;
        return gpd;
    }
    get maxProfit() {
        return this.maxProfit;
    }
}

let submitCount = 0;

/* #region  crop object creation */
let blueJazz = new Crop('spring', 30, 7, 0, 50, 1, 'Blue jazz');
let cauliflower = new Crop('spring', 80, 12, 0, 175, 1, 'Cauliflower');
let greenBean = new Crop('spring', 60, 10, 3, 40, 6, 'Green bean');
let kale = new Crop('spring', 70, 6, 0, 110, 1, 'Kale');
let parsnip = new Crop('spring', 20, 4, 0, 35, 1, 'Parsnip');
let potato = new Crop('spring', 50, 6, 0, 80, 1.25, 'Potato');
let tulip = new Crop('spring', 20, 6, 0, 30, 1, 'Tulip');
let unmilledRice = new Crop('spring', 40, 8, 0, 30, 1, 'Unmilled rice');

let blueberry = new Crop('summer', 80, 13, 4, 156, 4.08, 'Blueberry');
let corn = new Crop('summer fall', 150, 14, 4, 50, 1, 'Corn');
let hops = new Crop('summer', 60, 11, 1, 25, 17, 'Hops');
let hotPepper = new Crop('summer', 40, 5, 3, 40, 7.21, 'Hot pepper');
let melon = new Crop('summer', 80, 12, 0, 250, 1, 'Melon');
let poppy = new Crop('summer', 100, 7, 0, 140, 1, 'Poppy');
let radish = new Crop('summer', 40, 6, 0, 90, 1, 'Radish');
let summerSpangle = new Crop('summer', 50, 8, 0, 90, 1, 'Summer spangle');
let sunflower = new Crop('summer fall', 200, 8, 0, 80, 1, 'Sunflower');
let tomato = new Crop('summer', 50, 11, 4, 60, 4, 'Tomato');
let wheat = new Crop('summer fall', 10, 4, 0, 25, 1, 'Wheat');

let amaranth = new Crop('fall', 70, 7, 0, 150, 1, 'Amaranth');
let bokChoy = new Crop('fall', 50, 4, 0, 80, 1, 'Bok choy');
let cranberry = new Crop('fall', 240, 7, 5, 150, 5.20, 'Cranberry');
let eggplant = new Crop('fall', 20, 5, 5, 60, 5.15, 'Eggplant');
let fairyRose = new Crop('fall', 200, 12, 0, 290, 1, 'Fairy rose');
let grape = new Crop('fall', 60, 10, 3, 80, 6, 'Grape');
let pumpkin = new Crop('fall', 100, 13, 0, 320, 1, 'Pumpkin');
let yam = new Crop('fall', 60, 10, 0, 160, 1, 'Yam');
let baseCropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam];


let garlic = new Crop('spring', 40, 4, 0, 60, 1, 'Garlic');
let strawberry = new Crop('spring', 100, 8, 4, 120, 5.15, 'Strawberry');
let rhubarb = new Crop('spring', 100, 13, 0, 220, 1, 'Rhubarb');
let redCabbage = new Crop('summer', 100, 9, 0, 260, 1, 'Red cabbage');
let starfruit = new Crop('summer', 400, 13, 0, 750, 1, 'Star fruit');
let artichoke = new Crop('fall', 30, 8, 0, 160, 1, 'Artichoke');
let beet = new Crop('fall', 20, 6, 0, 100, 1, 'Beet');
/* #endregion */

function getBestCrops(season, gold, days, cropArray, profession, level, fertilizer) {
    days = eval(days);
    //filter out crops that are not in season
    let potentialCropArray = cropArray.filter((value) => value.season.includes(season));
    //filter out crops who's growing period is longer than the amount of time left in the season
    potentialCropArray = potentialCropArray.filter((value) => value.matureDays < days);

    for (let i = 0; i < potentialCropArray.length; i++) {
        Object.defineProperty(potentialCropArray[i], 'maxProfit', { enumerable: true, writable: true });
    }
    //create maxProfit property of crop objects in array
    potentialCropArray = potentialCropArray.map((value) => {
        if (value.harvestDays == 0 && value.maxHarvests !== 1.25) {
            value.maxProfit = Math.floor((days / value.growingDays));
            value.maxProfit = value.maxProfit * (value.sellPrice - value.seedCost);

        } else if (value.harvestDays == 0 && value.maxHarvests == 1.25) {
            value.maxProfit = Math.floor((days / value.growingDays));
            value.maxProfit = value.maxProfit * (value.sellPrice * 1.25 - value.seedCost)

        } else if ((value.harvestDays == 4 && season == 'summer') && value.season.includes('fall')) {
            days = days + 28;
            let remainingDays = days - value.matureDays;
            value.maxProfit = Math.floor((remainingDays / value.harvestDays));
            value.maxProfit = value.maxProfit * (value.sellPrice) + (value.sellPrice - value.seedCost);
            days = days - 28;

        }
        else {
            let remainingDays = days - value.matureDays;
            value.maxProfit = Math.floor((remainingDays / value.harvestDays));
            value.maxProfit = value.maxProfit * (value.sellPrice) + (value.sellPrice - value.seedCost);
        }
        if (profession == 'yes') {
            value.maxProfit = value.maxProfit + (value.maxProfit * 0.10);
        }
        return value;
    })
    //sort by max profit
    potentialCropArray = potentialCropArray.sort((a, b) => {
        if (a.maxProfit == b.maxProfit) {
            return 0;
        }
        return a.maxProfit < b.maxProfit ? -1 : 1;
    })
    potentialCropArray = potentialCropArray.reverse();
    console.log(potentialCropArray);

    /* #region  top 3 crops */
    let crop1 = potentialCropArray[0];
    let crop2 = potentialCropArray[1];
    let crop3 = potentialCropArray[2];

    let crop1Array = getCropQuality(level, fertilizer, crop1.name);
    let crop2Array = getCropQuality(level, fertilizer, crop2.name);
    let crop3Array = getCropQuality(level, fertilizer, crop3.name);

    let crop1Amount = Math.floor(gold / crop1.seedCost);
    let remainingMoney = gold - crop1.seedCost * crop1Amount;
    getQualityNumbers(crop1Array, crop1Amount, crop1);

    let crop2Amount = Math.floor(remainingMoney / crop2.seedCost);
    crop2.maxProfit = crop2Amount * crop2.maxProfit;
    remainingMoney = remainingMoney - crop2.seedCost * crop2Amount;

    let crop3Amount = Math.floor(remainingMoney / crop3.seedCost);
    crop3.maxProfit = crop3Amount * crop3.maxProfit;
    remainingMoney = remainingMoney - crop3.seedCost * crop3Amount;
    /* #endregion */

    /* #region  html element creation */
    if (submitCount == 0) {
        let resultDiv = document.createElement('div');
        resultDiv.setAttribute('id', 'result-div');

        let divTitle = document.createElement('p');
        divTitle.setAttribute('id', 'div-title');
        divTitle.innerHTML = 'Crops to Purchase';
        let main = document.getElementById('main');

        $(resultDiv).appendTo(main);
        $(divTitle).appendTo(resultDiv);

        let crop1div = document.createElement('div');
        crop1div.setAttribute('class', 'crop-div');

        $(crop1div).appendTo(resultDiv);

        let crop1title = document.createElement('p');
        crop1title.setAttribute('class', 'crop-info');
        crop1title.style.textDecoration = 'underline';;
        crop1title.innerHTML = crop1.name;

        let crop1amount = document.createElement('p');
        crop1amount.setAttribute('class', 'crop-info');
        crop1amount.innerHTML = 'Amount to purchase: ' + crop1Amount;

        let crop1profit = document.createElement('p');
        crop1profit.setAttribute('class', 'crop-info');
        crop1profit.innerHTML = 'Profit: ' + crop1.maxProfit;

        $(crop1title).appendTo(crop1div);
        $(crop1amount).appendTo(crop1div);
        $(crop1profit).appendTo(crop1div);

        if (crop2Amount !== 0) {
            let crop2div = document.createElement('div');
            crop2div.setAttribute('class', 'crop-div');

            $(crop2div).appendTo(resultDiv);

            let crop2title = document.createElement('p');
            crop2title.setAttribute('class', 'crop-info');
            crop2title.style.textDecoration = 'underline';;
            crop2title.innerHTML = crop2.name;

            let crop2amount = document.createElement('p');
            crop2amount.setAttribute('class', 'crop-info');
            crop2amount.innerHTML = 'Amount to purchase: ' + crop2Amount;

            let crop2profit = document.createElement('p');
            crop2profit.setAttribute('class', 'crop-info');
            crop2profit.innerHTML = 'Profit: ' + crop2.maxProfit;

            $(crop2title).appendTo(crop2div);
            $(crop2amount).appendTo(crop2div);
            $(crop2profit).appendTo(crop2div);
        }

        if (crop3Amount !== 0) {
            let crop3div = document.createElement('div');
            crop3div.setAttribute('class', 'crop-div');

            $(crop3div).appendTo(resultDiv);

            let crop3title = document.createElement('p');
            crop3title.setAttribute('class', 'crop-info');
            crop3title.style.textDecoration = 'underline';;
            crop3title.innerHTML = crop3.name;

            let crop3amount = document.createElement('p');
            crop3amount.setAttribute('class', 'crop-info');
            crop3amount.innerHTML = 'Amount to purchase: ' + crop3Amount;

            let crop3profit = document.createElement('p');
            crop3profit.setAttribute('class', 'crop-info');
            crop3profit.innerHTML = 'Profit: ' + crop3.maxProfit;

            $(crop3title).appendTo(crop3div);
            $(crop3amount).appendTo(crop3div);
            $(crop3profit).appendTo(crop3div);
        }
    } else {
        let cropInfo = document.getElementsByClassName('crop-info');
        let remove = document.getElementsByClassName('remove');
        $(remove).remove();
        let crop1title = cropInfo[0];
        crop1title.innerHTML = crop1.name;
        let crop1amount = cropInfo[1];
        crop1amount.innerHTML = 'Amount to Purchase: ' + crop1Amount;
        let crop1profit = cropInfo[2];
        crop1profit.innerHTML = 'Profit: ' + crop1.maxProfit;
        if (crop2Amount !== 0) {
            let crop2title = cropInfo[3];
            crop2title.innerHTML = crop2.name;
            let crop2amount = cropInfo[4];
            crop2amount.innerHTML = 'Amount to Purchase: ' + crop2Amount;
            let crop2profit = cropInfo[5];
            crop2profit.innerHTML = 'Profit: ' + crop2.maxProfit;
        }
        if (crop3Amount !== 0) {
            let crop3title = cropInfo[6];
            crop3title.innerHTML = crop3.name;
            let crop3amount = cropInfo[7];
            crop3amount.innerHTML = 'Amount to Purchase: ' + crop3Amount;
            let crop3profit = cropInfo[8];
            crop3profit.innerHTML = 'Profit: ' + crop3.maxProfit;
        }
    }
    /* #endregion */
    while (remainingMoney > 0) {
        let otherCrops = potentialCropArray.filter((value) => value.seedCost < remainingMoney)
        otherCrops = otherCrops.sort((a, b) => {
            return a.maxProfit - b.maxProfit;
        });
        let length = otherCrops.length - 1;
        if (otherCrops.length !== 0) {
            let crop = otherCrops[length];
            let cropAmount = Math.floor(remainingMoney / crop.seedCost);
            remainingMoney = remainingMoney - crop.seedCost * cropAmount;
            crop.maxProfit = cropAmount * crop.seedCost;

            let resultDiv = document.getElementById('result-div');
            let cropDiv = document.createElement('div');
            cropDiv.setAttribute('class', 'crop-div');
            cropDiv.setAttribute('class', 'remove');

            $(cropDiv).appendTo(resultDiv);

        let croptitle = document.createElement('p');
        croptitle.setAttribute('class', 'crop-info');
        croptitle.style.textDecoration = 'underline';;
        croptitle.innerHTML = crop.name;

        let cropamount = document.createElement('p');
        cropamount.setAttribute('class', 'crop-info');
        cropamount.innerHTML = 'Amount to purchase: ' + cropAmount;

        let cropprofit = document.createElement('p');
        cropprofit.setAttribute('class', 'crop-info');
        cropprofit.innerHTML = 'Profit: ' + crop.maxProfit;

        $(croptitle).appendTo(cropDiv);
        $(cropamount).appendTo(cropDiv);
        $(cropprofit).appendTo(cropDiv);
        }
        if (otherCrops.length == 0) {
            remainingMoney = 0;
        }
    }
    baseCropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam];
}

function getCropQuality(level, fertilizer, crop) {
    let bonus;
    let noChance;
    let goldChance;
    let silverChance;
    let iridiumChance;
    let fertilizerLevel;
    switch (fertilizer) {
        case 'none':
            fertilizerLevel = 0;
            break;
        case 'standard': 
            fertilizerLevel = 1;
            break;
        case 'quality':
            fertilizerLevel = 2;
            break;
        case 'deluxe':
            fertilizerLevel = 3;
            break;
    }
    if ((fertilizer == 'none' || fertilizer =='standard') || fertilizer == 'quality') {
        switch (crop.name) {

            default:
                goldChance = 0.2 * (level / 10) + 0.2 * fertilizerLevel * ((level + 2) / 12) + 0.01;
                silverChance = goldChance * 2;
                if (silverChance > 0.75) {
                    silverChance = 0.75;
                }
                break;
                iridiumChance = 0;
        }
    }


    else if (fertilizer == 'deluxe') {
        switch (crop.name) {
            case 'Green bean':
            case 'Potato': 
            case 'Blueberry':
            case 'Hot pepper':
            case 'Tomato':
            case 'Wheat':
            case 'Cranberry':
            case 'Eggplant':
                break;
            default:
                goldChance = 0.2 * (level / 10) + 0.2 * fertilizerLevel * ((level + 2) / 12) + 0.01;
                iridiumChance = goldChance / 2;
                silverChance = goldChance * 2;
                break;
        }
    }
    noChance = 1 - iridiumChance - goldChance - silverChance;
    bonus = [iridiumChance, goldChance, silverChance, noChance];
    return bonus;
}

function getQualityNumbers(array, number, crop) {
    console.log(array);
    console.log(number);
    console.log(crop);
    let noAmount = Math.floor(number * array[3]);
    let silverAmount = Math.floor(number * array[2]);
    let goldAmount = Math.floor(number * array[1]);
    let iridiumAmount = Math.floor(number * array[0]);
    noAmount = (number - (noAmount + silverAmount + goldAmount + iridiumAmount) + noAmount);
    crop.maxProfit = noAmount + silverAmount + goldAmount + iridiumAmount;
    return crop;
}


let form = document.querySelector('#form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let season = form.season.value;
    let goldToSpend = form['gold-to-spend'].value;
    let days = form.days.value;
    let fertilizer = form.fertilizer.value;
    let profession = form.profession.value;
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
    getBestCrops(season, goldToSpend, days, baseCropArray, profession);
    submitCount++;
    console.log(form.elements);
})
