

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
        this.maxProfit;
    }
    get gpd() {
        let gpd = ((this.maxHarvests * this.sellPrice) - this.seedCost) / this.growingDays;
        return gpd;
    }
}


/* #region  crop object creation */
let blueJazz = new Crop('spring', 30, 7, 0, 50, 1, 'blue jazz');
let cauliflower = new Crop('spring', 80, 12, 0, 175, 1, 'cauliflower');
let greenBean = new Crop('spring', 60, 10, 3, 40, 6, 'green bean');
let kale = new Crop('spring', 70, 6, 0, 110, 1, 'kale');
let parsnip = new Crop('spring', 20, 4, 0, 35, 1, 'parsnip');
let potato = new Crop('spring', 50, 6, 0, 80, 1.25, 'potato');
let tulip = new Crop('spring', 20, 6, 0, 30, 1, 'tulip');
let unmilledRice = new Crop('spring', 40, 8, 0, 30, 1, 'unmilled rice');

let blueberry = new Crop('summer', 80, 13, 4, 156, 4.08, 'blueberry');
let corn = new Crop('summer fall', 150, 14, 4, 50, 1, 'corn');
let hops = new Crop('summer', 60, 11, 1, 25, 17, 'hops');
let hotPepper = new Crop('summer', 40, 5, 3, 40, 7.21, 'hot pepper');
let melon = new Crop('summer', 80, 12, 0, 250, 1, 'melon');
let poppy = new Crop('summer', 100, 7, 0, 140, 1, 'poppy');
let radish = new Crop('summer', 40, 6, 0, 90, 1, 'radish');
let summerSpangle = new Crop('summer', 50, 8, 0, 90, 1, 'summer spangle');
let sunflower = new Crop('summer fall', 200, 8, 0, 80, 1, 'sunflower');
let tomato = new Crop('summer', 50, 11, 4, 60, 4, 'tomato');
let wheat = new Crop('summer fall', 10, 4, 0, 25, 1, 'wheat');

let amaranth = new Crop('fall', 70, 7, 0, 150, 1, 'amaranth');
let bokChoy = new Crop('fall', 50, 4, 0, 80, 1, 'bok choy');
let cranberry = new Crop('fall', 240, 7, 5, 150, 5.20, 'cranberry');
let eggplant = new Crop('fall', 20, 5, 5, 60, 5.15, 'eggplant');
let fairyRose = new Crop('fall', 200, 12, 0, 290, 1, 'fairy rose');
let grape = new Crop('fall', 60, 10, 3, 80, 6, 'grape');
let pumpkin = new Crop('fall', 100, 13, 0, 320, 1, 'pumpkin');
let yam = new Crop('fall', 60, 10, 0, 160, 1, 'yam');
let baseCropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam];


let garlic = new Crop('spring', 40, 4, 0, 60, 1, 'garlic');
let strawberry = new Crop('spring', 100, 8, 4, 120, 5.15, 'strawberry');
let rhubarb = new Crop('spring', 100, 13, 0, 220, 1, 'rhubarb');
let redCabbage = new Crop('summer', 100, 9, 0, 260, 1, 'red cabbage');
let starfruit = new Crop('summer', 400, 13, 0, 750, 1, 'star fruit');
let artichoke = new Crop('fall', 30, 8, 0, 160, 1, 'artichoke');
let beet = new Crop('fall', 20, 6, 0, 100, 1, 'beet');
/* #endregion */

function getBestCrops(season, gold, days, cropArray) {
    days = eval(days)
    //filter out crops that are not in season
    let potentialCropArray = cropArray.filter((value) => value.season.includes(season));
    //filter out crops who's growing period is longer than the amount of time left in the season
    potentialCropArray = potentialCropArray.filter((value) => value.matureDays < days);
    //create maxProfit property of crop objects in array
    potentialCropArray = potentialCropArray.map((value) => {
        if (value.harvestDays == 0 && value.maxHarvests !== 1.25) {
            value.maxProfit = Math.floor((days / value.growingDays));
            value.maxProfit = value.maxProfit * (value.sellPrice - value.seedCost);
            return value;
        } else if (value.harvestDays == 0 && value.maxHarvests == 1.25) {
            value.maxProfit = Math.floor((days / value.growingDays)); 
            value.maxProfit = value.maxProfit * (value.sellPrice * 1.25 - value.seedCost)
            return value;
        } else if ((value.harvestDays == 4 && season == 'summer') && value.season.includes('fall')) {
            days = days + 28;
            let remainingDays = days - value.matureDays;
            value.maxProfit = Math.floor((remainingDays / value.harvestDays));
            value.maxProfit = value.maxProfit * (value.sellPrice) + (value.sellPrice - value.seedCost);
            days = days - 28;
            return value;
        }
        else {
            let remainingDays = days - value.matureDays;
            value.maxProfit = Math.floor((remainingDays / value.harvestDays));
            value.maxProfit = value.maxProfit * (value.sellPrice) + (value.sellPrice - value.seedCost);
            return value;
        }
    })
    //sort by max profit
    potentialCropArray = potentialCropArray.map((value) => {
        value.maxProfit = value.maxProfit * days;
        return value;
    })
    potentialCropArray = potentialCropArray.sort((a, b) => {
       return a.maxProfit - b.maxProfit;
    })
    potentialCropArray = potentialCropArray.reverse();

    let crop1 = potentialCropArray[0].name;
    let crop2 = potentialCropArray[1].name;
    let crop3 = potentialCropArray[2].name;

    let crop1Amount = Math.floor(gold / potentialCropArray[0].seedCost);
    let remainingMoney = gold - potentialCropArray[0].seedCost * crop1Amount;
    let crop2Amount = Math.floor(remainingMoney / potentialCropArray[1].seedCost);
    remainingMoney = remainingMoney - potentialCropArray[1].seedCost * crop2Amount;
    let crop3Amount = Math.floor(remainingMoney / potentialCropArray[2].seedCost);
    console.log(crop1 + ': ' + crop1Amount);
    console.log(crop2 + ': ' + crop2Amount);
    console.log(crop3 + ': ' + crop3Amount);
}


let form = document.querySelector('#form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let season = form.season.value;
    let goldToSpend = form['gold-to-spend'].value;
    let days = form.days.value;
    let fertilizer = form.fertilizer.value;
    let crops = document.getElementsByName('crops');
    let cropsArray = [];
    for (let i = 0; i < crops.length; i++) {
        if (crops[i].checked == true) {
            cropsArray.push(crops[i]);
        }
    }
    for (let j = 0; j < cropsArray.length; j++) {
        baseCropArray.push(cropsArray[j]);
    }
    getBestCrops(season, goldToSpend, days, baseCropArray);

    console.log(form.elements);
})

console.log(form.elements);