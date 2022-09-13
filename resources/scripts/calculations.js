

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
}

let submitCount = 0;

/* #region  crop object creation */
let blueJazz = new Crop('spring', 30, 7, 0, 50, 1, 'Blue jazz');
let cauliflower = new Crop('spring', 80, 12, 0, 175, 1, 'Cauliflower');
let greenBean = new Crop('spring', 60, 10, 3, 40, 1, 'Green bean');
let kale = new Crop('spring', 70, 6, 0, 110, 1, 'Kale');
let parsnip = new Crop('spring', 20, 4, 0, 35, 1, 'Parsnip');
let potato = new Crop('spring', 50, 6, 0, 80, 1.25, 'Potato');
let tulip = new Crop('spring', 20, 6, 0, 30, 1, 'Tulip');
let unmilledRice = new Crop('spring', 40, 8, 0, 30, 1, 'Unmilled rice');

let blueberry = new Crop('summer', 80, 13, 4, 150, 4.08, 'Blueberry');
let corn = new Crop('summer fall', 150, 14, 4, 50, 1, 'Corn');
let hops = new Crop('summer', 60, 11, 1, 25, 17, 'Hops');
let hotPepper = new Crop('summer', 40, 5, 3, 40, 1, 'Hot pepper');
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
let eggplant = new Crop('fall', 20, 5, 5, 60, 1, 'Eggplant');
let fairyRose = new Crop('fall', 200, 12, 0, 290, 1, 'Fairy rose');
let grape = new Crop('fall', 60, 10, 3, 80, 1, 'Grape');
let pumpkin = new Crop('fall', 100, 13, 0, 320, 1, 'Pumpkin');
let yam = new Crop('fall', 60, 10, 0, 160, 1, 'Yam');
let baseCropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam];

let garlic = new Crop('spring', 40, 4, 0, 60, 1, 'Garlic');
let strawberry = new Crop('spring', 100, 8, 4, 120, 5.15, 'Strawberry');
let rhubarb = new Crop('spring', 100, 13, 0, 220, 1, 'Rhubarb');
let redCabbage = new Crop('summer', 100, 9, 0, 260, 1, 'Red cabbage');
let artichoke = new Crop('fall', 30, 8, 0, 160, 1, 'Artichoke');
let beet = new Crop('fall', 20, 6, 0, 100, 1, 'Beet');
/* #endregion */

function getBestCrops(season, gold, days, cropArray, profession, level, fertilizer, check) {
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

    //create maxProfit property of crop objects in array
    potentialCropArray = potentialCropArray.map((value) => {
        if (check == true) {
            let currentCropAmount = Math.floor(gold / value.seedCost);
            if (value.harvestDays == 0 && value.maxHarvests !== 1.25) {
                value.maxProfit = Math.floor(((days - 1) / (value.growingDays)));
                value.maxProfit = (value.maxProfit * (value.sellPrice - value.seedCost)) * currentCropAmount;
            } else if (value.harvestDays == 0 && value.maxHarvests == 1.25) {
                value.maxProfit = Math.floor(((days - 1) / value.growingDays));
                value.maxProfit = (value.maxProfit * (value.sellPrice * 1.25 - value.seedCost)) * currentCropAmount;
            } else if ((value.harvestDays == 4 && season == 'summer') && value.season.includes('fall')) {
                let remainingDays = days - (value.matureDays + 1);
                let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                value.maxProfit = ((harvestsLeft * value.seedCost) - value.seedCost) * currentCropAmount;
            }
            else {
                let remainingDays = days - (value.matureDays + 1);
                let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                value.maxProfit = (currentCropAmount * (harvestsLeft * value.sellPrice) - currentCropAmount * value.seedCost);

            }
        } else {
            if (value.harvestDays == 0 && value.maxHarvests !== 1.25) {
                value.maxProfit = Math.floor((days / value.growingDays));
                value.maxProfit = value.maxProfit * (value.sellPrice - value.seedCost);
            } else if (value.harvestDays == 0 && value.maxHarvests == 1.25) {
                value.maxProfit = Math.floor((days / value.growingDays));
                value.maxProfit = value.maxProfit * (value.sellPrice * 1.25 - value.seedCost);
            } else if ((value.harvestDays == 4 && season == 'summer') && value.season.includes('fall')) {
                let remainingDays = days - (value.matureDays + 1);
                let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                value.maxProfit = (harvestsLeft * value.seedCost) - value.seedCost;
    
            }
            else {
                let remainingDays = days - (value.matureDays + 1);
                let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                value.maxProfit = (harvestsLeft * value.sellPrice) - value.seedCost;
            }
        }
    
        return value;
    })
    //sort by max profit
    potentialCropArray = potentialCropArray.sort((a, b) => {
        return a.maxProfit - b.maxProfit;
    })
    potentialCropArray = potentialCropArray.reverse();

    /* #region  top crop */
    let crop1 = potentialCropArray[0];
    console.log(potentialCropArray);


    let crop1Array = getCropQuality(level, fertilizer);
    let crop1Amount = Math.floor(gold / crop1.seedCost);
    let remainingMoney = gold - crop1.seedCost * crop1Amount;
    getQualityNumbers(crop1Array, crop1Amount, crop1, days, fertilizer, level, profession);

    /* #endregion */

    /* #region  html element creation */

        $('div, #result-div').remove();

        let mobile = document.getElementById('mobile-check');

        let resultDiv = document.createElement('div');
        resultDiv.setAttribute('id', 'result-div');

        let divTitle = document.createElement('p');
        divTitle.setAttribute('id', 'div-title');
        divTitle.innerHTML = 'Crops to Purchase';
        let main = document.getElementById('main');

        let disclaimer = document.createElement('p');
        disclaimer.style.color = 'hsla(151, 45%, 15%, 1)';
        disclaimer.style.fontSize = '12px';
        disclaimer.style.width = '150px';
        disclaimer.style.textDecoration = 'none';
        disclaimer.style.textAlign = 'center';
        disclaimer.style.margin = '1rem 0';
        disclaimer.innerHTML = 'Profits assume replanting of crops with only one harvest.';

        if ($(mobile).css('display') == 'block') {
            $(main).css('flex-direction', 'column');
        }

        $(resultDiv).appendTo(main);
        $(divTitle).appendTo(resultDiv);
        $(disclaimer).appendTo(resultDiv);

        let crop1div = document.createElement('div');
        crop1div.setAttribute('class', 'crop-div');

        $(crop1div).appendTo(resultDiv);

        let crop1title = document.createElement('p');
        crop1title.setAttribute('class', 'crop-info');
        crop1title.style.textDecoration = 'underline';;
        crop1title.innerHTML = crop1.name;

        let crop1amount = document.createElement('p');
        crop1amount.setAttribute('class', 'crop-info');
        crop1amount.innerHTML = 'Amount to purchase: ' + crop1Amount.toLocaleString('en-US');

        let crop1profit = document.createElement('p');
        crop1profit.setAttribute('class', 'crop-info');
        crop1profit.innerHTML = 'Approximate Profit: ' + crop1.maxProfit.toLocaleString('en-US');

        $(crop1title).appendTo(crop1div);
        $(crop1amount).appendTo(crop1div);
        $(crop1profit).appendTo(crop1div);

        let totalProfit = crop1.maxProfit;

    /* #endregion */
    while (remainingMoney > 0) {

        let otherCrops = potentialCropArray.filter((value) => value.seedCost <= remainingMoney);
        otherCrops = otherCrops.map((value) => {
            if (check == true) {
                let currentCropAmount = Math.floor(gold / value.seedCost);
                if (value.harvestDays == 0 && value.maxHarvests !== 1.25) {
                    value.maxProfit = Math.floor(((days - 1) / (value.growingDays)));
                    value.maxProfit = (value.maxProfit * (value.sellPrice - value.seedCost)) * currentCropAmount;
                } else if (value.harvestDays == 0 && value.maxHarvests == 1.25) {
                    value.maxProfit = Math.floor(((days - 1) / value.growingDays));
                    value.maxProfit = (value.maxProfit * (value.sellPrice * 1.25 - value.seedCost)) * currentCropAmount;
                } else if ((value.harvestDays == 4 && season == 'summer') && value.season.includes('fall')) {
                    let remainingDays = days - (value.matureDays + 1);
                    let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                    value.maxProfit = ((harvestsLeft * value.seedCost) - value.seedCost) * currentCropAmount;
                }
                else {
                    let remainingDays = days - (value.matureDays + 1);
                    let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                    value.maxProfit = (currentCropAmount * (harvestsLeft * value.sellPrice) - currentCropAmount * value.seedCost);
                }
            } else {
                if (value.harvestDays == 0 && value.maxHarvests !== 1.25) {
                    value.maxProfit = Math.floor((days / value.growingDays));
                    value.maxProfit = value.maxProfit * (value.sellPrice - value.seedCost);
                } else if (value.harvestDays == 0 && value.maxHarvests == 1.25) {
                    value.maxProfit = Math.floor((days / value.growingDays));
                    value.maxProfit = value.maxProfit * (value.sellPrice * 1.25 - value.seedCost);
                } else if ((value.harvestDays == 4 && season == 'summer') && value.season.includes('fall')) {
                    let remainingDays = days - (value.matureDays + 1);
                    let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                    value.maxProfit = (harvestsLeft * value.seedCost) - value.seedCost;
                }
                else {
                    let remainingDays = days - (value.matureDays + 1);
                    let harvestsLeft = Math.floor(remainingDays / value.harvestDays) + 1;
                    value.maxProfit = (harvestsLeft * value.sellPrice) - value.seedCost;
                }
            }
        
            return value;
        })
        otherCrops = otherCrops.sort((a, b) => {
            return a.maxProfit - b.maxProfit;
        });
        otherCrops = otherCrops.reverse();
        if (otherCrops.length !== 0) {
            let crop = otherCrops[0];
            let cropArray = getCropQuality(level, fertilizer);
            let cropAmount = Math.floor(remainingMoney / crop.seedCost);
            getQualityNumbers(cropArray, cropAmount, crop, days, fertilizer, level, profession);
            remainingMoney = remainingMoney - crop.seedCost * cropAmount;

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
            cropamount.innerHTML = 'Amount to purchase: ' + cropAmount.toLocaleString('en-US');

            let cropprofit = document.createElement('p');
            cropprofit.setAttribute('class', 'crop-info');
            cropprofit.innerHTML = 'Approximate Profit: ' + crop.maxProfit.toLocaleString('en-US');

            $(croptitle).appendTo(cropDiv);
            $(cropamount).appendTo(cropDiv);
            $(cropprofit).appendTo(cropDiv);

            totalProfit = totalProfit + crop.maxProfit;
            
        }

        if (otherCrops.length === 0) {
            remainingMoney = 0;

        }
        if (remainingMoney == 0) {

                let totalProfitTitle = document.createElement('p');
                totalProfitTitle.setAttribute('class', 'crop-info');
                totalProfitTitle.setAttribute('id', 'total-profit');
                totalProfitTitle.style.textDecoration = 'underline';
                totalProfitTitle.style.textAlign = 'center';
                totalProfitTitle.innerHTML = 'Approximate Total Profit: ' + totalProfit.toLocaleString('en-US');
                $(totalProfitTitle).appendTo(resultDiv);
            
        }

    }
    baseCropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam];
}

function getCropQuality(level, fertilizer) {
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
        goldChance = 0.2 * (level / 10) + 0.2 * fertilizerLevel * ((level + 2) / 12) + 0.01;
        silverChance = goldChance * 2;
        iridiumChance = 0;
        if (silverChance > 0.75) {
            silverChance = 0.75;
        }
        silverChance = (1 - goldChance) * (silverChance);
        noChance = 1 - iridiumChance - goldChance - silverChance;
    }


    else if (fertilizer == 'deluxe') {
        let formula = 0.2 * (level / 10) + 0.2 * fertilizerLevel * ((level + 2) / 12) + 0.01;
        goldChance = 0.2 * (level / 10) + 0.2 * fertilizerLevel * ((level + 2) / 12) + 0.01;
        iridiumChance = formula / 2;
        silverChance = formula * 2;
        if (silverChance > 0.75) {
            silverChance = 0.75;
        }
        goldChance = (1 - iridiumChance) * (goldChance);
        silverChance = (1 - iridiumChance - goldChance);
        noChance = 0;
    }

    bonus = [iridiumChance, goldChance, silverChance, noChance];
    
    return bonus;
}

function getQualityNumbers(array, number, crop, days, fertilizer, level, profession) {
    let noAmount = Math.floor(number * array[3]);
    let silverAmount = Math.floor(number * array[2]);
    let goldAmount = Math.floor(number * array[1]);
    let iridiumAmount = Math.floor(number * array[0]);
    let remainingDays = days - (crop.matureDays + 1);
    let harvestsLeft;
    if (crop.harvestDays == 0) {
        harvestsLeft = Math.floor(days / crop.matureDays);
        crop.seedCost = crop.seedCost * (harvestsLeft);
    } else {
        harvestsLeft = Math.floor(remainingDays / crop.harvestDays) + 1;
    }
    let tempSellPrice;
    let secondArray;
    let secondGoldAmount;
    let secondSilverAmount;
    let secondNoAmount;

    if (fertilizer == 'deluxe') {
        silverAmount = (number - (noAmount + silverAmount + goldAmount + iridiumAmount) + silverAmount);
    } else {
        noAmount = (number - (noAmount + silverAmount + goldAmount + iridiumAmount) + noAmount);
    }

    switch (crop.name) {
        case 'Blueberry':
            tempSellPrice = crop.sellPrice / 3;
            secondArray = getCropQuality(level, 'none', crop);
            secondGoldAmount = Math.floor(number * secondArray[1]);
            secondSilverAmount = Math.floor(number * secondArray[2]);
            secondNoAmount = Math.floor((number * secondArray[3]) + (number - ((number * secondArray[3] + secondGoldAmount + secondSilverAmount) + (number * secondArray[3])) + (number * secondArray[3])));
            if (profession == 'yes') {
                crop.maxProfit = Math.round(((iridiumAmount * ((harvestsLeft * (tempSellPrice * 2) + ((harvestsLeft * (tempSellPrice * 2))) * 0.1) - (crop.seedCost / 3))) + (goldAmount * ((harvestsLeft * (tempSellPrice * 1.5) + ((harvestsLeft * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (silverAmount * ((harvestsLeft * (tempSellPrice * 1.25) + ((harvestsLeft * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (noAmount * ((harvestsLeft * (tempSellPrice) + ((harvestsLeft * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((harvestsLeft * (tempSellPrice * 1.5) + ((harvestsLeft * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (secondSilverAmount * ((harvestsLeft * (tempSellPrice * 1.25) + ((harvestsLeft * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (secondNoAmount * ((harvestsLeft * (tempSellPrice) + ((harvestsLeft * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))));
            } else {
                crop.maxProfit = Math.round(((iridiumAmount * ((harvestsLeft * (tempSellPrice * 2)) - (crop.seedCost / 3))) + (goldAmount * ((harvestsLeft * (tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (silverAmount * ((harvestsLeft * (tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (noAmount * ((harvestsLeft * (tempSellPrice)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((harvestsLeft * (tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (secondSilverAmount * ((harvestsLeft * (tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (secondNoAmount * ((harvestsLeft * (tempSellPrice)) - (crop.seedCost / 3)))));
            }
            break;
        case 'Cranberry':
            tempSellPrice = crop.sellPrice / 2;
            secondArray = getCropQuality(level, 'none', crop);
            secondGoldAmount = Math.floor(number * secondArray[1]);
            secondSilverAmount = Math.floor(number * secondArray[2]);
            secondNoAmount = Math.floor((number * secondArray[3]) + (number - ((number * secondArray[3] + secondGoldAmount + secondSilverAmount) + (number * secondArray[3])) + (number * secondArray[3])));
            if (profession == 'yes') {
                crop.maxProfit = Math.round(((iridiumAmount * ((harvestsLeft * (tempSellPrice * 2) + ((harvestsLeft * (tempSellPrice * 2))) * 0.1) - (crop.seedCost / 2))) + (goldAmount * ((harvestsLeft * (tempSellPrice * 1.5) + ((harvestsLeft * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (silverAmount * ((harvestsLeft * (tempSellPrice * 1.25) + ((harvestsLeft * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (noAmount * ((harvestsLeft * (tempSellPrice) + ((harvestsLeft * (tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * ((harvestsLeft * (tempSellPrice * 1.5) + ((harvestsLeft * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (secondSilverAmount * ((harvestsLeft * (tempSellPrice * 1.25) + ((harvestsLeft * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (secondNoAmount * ((harvestsLeft * (tempSellPrice) + ((harvestsLeft * (tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))));
            } else {
                crop.maxProfit = Math.round(((iridiumAmount * ((harvestsLeft * (tempSellPrice * 2)) - (crop.seedCost / 2))) + (goldAmount * ((harvestsLeft * (tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (silverAmount * ((harvestsLeft * (tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (noAmount * ((harvestsLeft * (tempSellPrice)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * ((harvestsLeft * (tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (secondSilverAmount * ((harvestsLeft * (tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (secondNoAmount * ((harvestsLeft * (tempSellPrice)) - (crop.seedCost / 2)))));
            }
            break;
        default:
            if (profession == 'yes') {
                crop.maxProfit = Math.round((iridiumAmount * ((harvestsLeft * (crop.sellPrice * 2)) - crop.seedCost)) + (goldAmount * ((harvestsLeft * (crop.sellPrice * 1.5)) - crop.seedCost)) + (silverAmount * ((harvestsLeft * (crop.sellPrice * 1.25)) - crop.seedCost)) + (noAmount * ((harvestsLeft * (crop.sellPrice)) - crop.seedCost)));
            } else {
                crop.maxProfit = Math.round((iridiumAmount * ((harvestsLeft * (crop.sellPrice * 2)) - crop.seedCost)) + (goldAmount * ((harvestsLeft * (crop.sellPrice * 1.5)) - crop.seedCost)) + (silverAmount * ((harvestsLeft * (crop.sellPrice * 1.25)) - crop.seedCost)) + (noAmount * ((harvestsLeft * (crop.sellPrice)) - crop.seedCost)));
            }
            break;
    }

    if (crop.harvestDays == 0) {
        harvestsLeft = Math.floor(days / crop.matureDays);
        crop.seedCost = crop.seedCost / (harvestsLeft);
    }

    return crop;
}


let form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let season = form.season.value;
    let goldToSpend = form['gold-to-spend'].value;
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
    getBestCrops(season, goldToSpend, days, baseCropArray, profession, level, fertilizer, formulaCheck);
    submitCount++;
    console.log(form.elements);
})
