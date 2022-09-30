import { Crop, getCropQuality, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';

/* #region  variable declaration */


let cropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet];

let coffee = new Crop('spring summer', 2500, 10, 2, 15, 0, 'Coffee');
let starfruit = new Crop('summer', 400, 13, 0, 750, 1, 'Starfruit');
let ancientFruit = new Crop('spring summer fall', 1000, 28, 7, 550, 0, 'Ancient Fruit');
let cactusFruit = new Crop('spring summer fall winter', 150, 12, 3, 75, 0, 'Cactus Fruit');
let pineapple = new Crop('summer', 0, 14, 7, 300, 1, 'Pineapple');
let taroRoot = new Crop('summer', 0, 10, 0, 100, 1, 'Taro Root');
taroRoot.defaultMatureDays = 10;
let sweetGemFruit = new Crop('fall', 1000, 24, 0, 3000, 1, 'Sweet Gem Fruit');

cropArray.push(coffee, starfruit, ancientFruit, cactusFruit, pineapple, taroRoot, sweetGemFruit);
cropArray = cropArray.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
})

let selectedCrops = [];
let quantities = [];
let fertilizers = [];
/* #endregion */


function disclaimerHover() {

    let disclaimerContainer = document.createElement('div');
    disclaimerContainer.setAttribute('id', 'disclaimer-container');
    $(disclaimerContainer).appendTo('#main');

    let disclaimer1 = document.createElement('p');
    disclaimer1.setAttribute('class', 'disclaimer');
    disclaimer1.innerHTML = 'Profits assume replanting of crops with only one harvest.\n';

    let disclaimer2 = document.createElement('p');
    disclaimer2.setAttribute('class', 'disclaimer');
    disclaimer2.innerHTML = 'Profits assume selected crops are in season.';

    $(disclaimer1).appendTo(disclaimerContainer);
    $(disclaimer2).appendTo(disclaimerContainer);

}

function getCropNumbers(cropsArray, number, crop, days, fertilizer, level, profession, profit) {
    let array = getCropQuality(level, fertilizer);
    number = eval(number);

    /*console.log(number);
    console.log(crop);
    console.log(days);
    console.log(fertilizer);
    console.log(level);
    console.log(profession);
    console.log(array);*/

    /* #region  variable housekeeping */
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
    /* #endregion */

    if (profit == 'profit' && ((crop.name !== 'Ancient Fruit' && crop.name !== 'Cactus Fruit') && (crop.name !== 'Pineapple' && crop.name !== 'Taro Root'))) {
        switch (crop.name) {
            case 'Blueberry':
                tempSellPrice = crop.sellPrice / 3;
                secondArray = getCropQuality(level, 'none', crop);
                secondGoldAmount = Math.floor(number * secondArray[1]);
                secondSilverAmount = Math.floor(number * secondArray[2]);
                secondNoAmount = Math.floor((number * secondArray[3]) + (number - ((number * secondArray[3] + secondGoldAmount + secondSilverAmount) + (number * secondArray[3])) + (number * secondArray[3])));
                if (profession == 'yes') {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2) + ((crop.mostHarvests * (tempSellPrice * 2))) * 0.1))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (noAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2) + ((crop.monthlyHarvests * (tempSellPrice * 2))) * 0.1) - (crop.seedCost / 3))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2) + (((tempSellPrice * 2))) * 0.1) - (crop.seedCost / 3))) + (goldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (silverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (noAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (secondSilverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (secondNoAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))));


                } else {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2)) - (crop.seedCost / 3))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (noAmount * ((crop.mostHarvests * (tempSellPrice)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice)) - (crop.seedCost / 3)))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2)) - (crop.seedCost / 3))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice)) - (crop.seedCost / 3)))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2)) - (crop.seedCost / 3))) + (goldAmount * (((tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (silverAmount * (((tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (noAmount * (((tempSellPrice)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5)) - (crop.seedCost / 3))) + (secondSilverAmount * (((tempSellPrice * 1.25)) - (crop.seedCost / 3))) + (secondNoAmount * (((tempSellPrice)) - (crop.seedCost / 3)))));


                }
                break;
            case 'Cranberry':
                tempSellPrice = crop.sellPrice / 2;
                secondArray = getCropQuality(level, 'none', crop);
                secondGoldAmount = Math.floor(number * secondArray[1]);
                secondSilverAmount = Math.floor(number * secondArray[2]);
                secondNoAmount = Math.floor((number * secondArray[3]) + (number - ((number * secondArray[3] + secondGoldAmount + secondSilverAmount) + (number * secondArray[3])) + (number * secondArray[3])));
                if (profession == 'yes') {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2) + ((crop.mostHarvests * (tempSellPrice * 2))) * 0.1) - (crop.seedCost / 2))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (noAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2) + ((crop.monthlyHarvests * (tempSellPrice * 2))) * 0.1) - (crop.seedCost / 2))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2) + (((tempSellPrice * 2))) * 0.1) - (crop.seedCost / 2))) + (goldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (silverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (noAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 2))) + (secondSilverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 2))) + (secondNoAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1)) - (crop.seedCost / 2)))));


                } else {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2)) - (crop.seedCost / 2))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (noAmount * ((crop.mostHarvests * (tempSellPrice)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice)) - (crop.seedCost / 2)))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2)) - (crop.seedCost / 2))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice)) - (crop.seedCost / 2)))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2)) - (crop.seedCost / 2))) + (goldAmount * (((tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (silverAmount * (((tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (noAmount * (((tempSellPrice)) - (crop.seedCost / 2)))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5)) - (crop.seedCost / 2))) + (secondSilverAmount * (((tempSellPrice * 1.25)) - (crop.seedCost / 2))) + (secondNoAmount * (((tempSellPrice)) - (crop.seedCost / 2)))));


                }
                break;
            default:
                if (profession == 'yes') {
                    crop.maxProfit = Math.round((iridiumAmount * ((crop.mostHarvests * (crop.sellPrice * 2) + ((crop.mostHarvests * (crop.sellPrice * 2))) * 0.1) - crop.seedCost)) + (goldAmount * ((crop.mostHarvests * (crop.sellPrice * 1.5) + ((crop.mostHarvests * (crop.sellPrice * 1.5)) * 0.1)) - crop.seedCost)) + (silverAmount * ((crop.mostHarvests * (crop.sellPrice * 1.25) + ((crop.mostHarvests * (crop.sellPrice * 1.25))) * 0.1) - crop.seedCost)) + (noAmount * ((crop.mostHarvests * (crop.sellPrice) + ((crop.mostHarvests * (crop.sellPrice))) * 0.1) - crop.seedCost)));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / harvestsLeft;
                        crop.seedCost = crop.seedCost * crop.monthlyHarvests;
                    }

                    crop.monthlyProfit = Math.round((iridiumAmount * ((crop.monthlyHarvests * (crop.sellPrice * 2) + ((crop.monthlyHarvests * (crop.sellPrice * 2))) * 0.1) - crop.seedCost)) + (goldAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.5) + ((crop.monthlyHarvests * (crop.sellPrice * 1.5)) * 0.1)) - crop.seedCost)) + (silverAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.25) + ((crop.monthlyHarvests * (crop.sellPrice * 1.25))) * 0.1) - crop.seedCost)) + (noAmount * ((crop.monthlyHarvests * (crop.sellPrice) + ((crop.monthlyHarvests * (crop.sellPrice))) * 0.1) - crop.seedCost)));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / crop.monthlyHarvests;

                    }
                    crop.singleProfit = Math.round((iridiumAmount * (((crop.sellPrice * 2) + (((crop.sellPrice * 2))) * 0.1) - crop.seedCost)) + (goldAmount * (((crop.sellPrice * 1.5) + (((crop.sellPrice * 1.5)) * 0.1)) - crop.seedCost)) + (silverAmount * (((crop.sellPrice * 1.25) + (((crop.sellPrice * 1.25))) * 0.1) - crop.seedCost)) + (noAmount * (((crop.sellPrice) + (((crop.sellPrice))) * 0.1) - crop.seedCost)));


                } else {
                    crop.maxProfit = Math.round((iridiumAmount * ((crop.mostHarvests * (crop.sellPrice * 2)) - crop.seedCost)) + (goldAmount * ((crop.mostHarvests * (crop.sellPrice * 1.5)) - crop.seedCost)) + (silverAmount * ((crop.mostHarvests * (crop.sellPrice * 1.25)) - crop.seedCost)) + (noAmount * ((crop.mostHarvests * (crop.sellPrice)) - crop.seedCost)));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / (harvestsLeft);
                        crop.seedCost = crop.seedCost * crop.monthlyHarvests;
                    }

                    crop.monthlyProfit = Math.round((iridiumAmount * ((crop.monthlyHarvests * (crop.sellPrice * 2)) - crop.seedCost)) + (goldAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.5)) - crop.seedCost)) + (silverAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.25)) - crop.seedCost)) + (noAmount * ((crop.monthlyHarvests * (crop.sellPrice)) - crop.seedCost)));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / crop.monthlyHarvests;

                    }
                    crop.singleProfit = Math.round((iridiumAmount * (((crop.sellPrice * 2)) - crop.seedCost)) + (goldAmount * (((crop.sellPrice * 1.5)) - crop.seedCost)) + (silverAmount * (((crop.sellPrice * 1.25)) - crop.seedCost)) + (noAmount * (((crop.sellPrice)) - crop.seedCost)));


                }
                break;
        }
    } 
    else {
        switch (crop.name) {
            case 'Blueberry':
                tempSellPrice = crop.sellPrice / 3;
                secondArray = getCropQuality(level, 'none', crop);
                secondGoldAmount = Math.floor(number * secondArray[1]);
                secondSilverAmount = Math.floor(number * secondArray[2]);
                secondNoAmount = Math.floor((number * secondArray[3]) + (number - ((number * secondArray[3] + secondGoldAmount + secondSilverAmount) + (number * secondArray[3])) + (number * secondArray[3])));
                if (profession == 'yes') {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2) + ((crop.mostHarvests * (tempSellPrice * 2))) * 0.1))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (noAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1))))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1))))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2) + ((crop.monthlyHarvests * (tempSellPrice * 2))) * 0.1))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1))))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1))))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2) + (((tempSellPrice * 2))) * 0.1))) + (goldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)))) + (silverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)))) + (noAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1))))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)))) + (secondSilverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)))) + (secondNoAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1))))));


                } else {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2)))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)))) + (noAmount * ((crop.mostHarvests * (tempSellPrice))))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice))))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2)))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice))))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice))))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2)))) + (goldAmount * (((tempSellPrice * 1.5)))) + (silverAmount * (((tempSellPrice * 1.25)))) + (noAmount * (((tempSellPrice))))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5)))) + (secondSilverAmount * (((tempSellPrice * 1.25)))) + (secondNoAmount * (((tempSellPrice))))));


                }
                break;
            case 'Cranberry':
                tempSellPrice = crop.sellPrice / 2;
                secondArray = getCropQuality(level, 'none', crop);
                secondGoldAmount = Math.floor(number * secondArray[1]);
                secondSilverAmount = Math.floor(number * secondArray[2]);
                secondNoAmount = Math.floor((number * secondArray[3]) + (number - ((number * secondArray[3] + secondGoldAmount + secondSilverAmount) + (number * secondArray[3])) + (number * secondArray[3])));
                if (profession == 'yes') {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2) + ((crop.mostHarvests * (tempSellPrice * 2))) * 0.1))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (noAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1))))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1))))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2) + ((crop.monthlyHarvests * (tempSellPrice * 2))) * 0.1))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1))))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5) + ((crop.monthlyHarvests * (tempSellPrice * 1.5)) * 0.1)))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25) + ((crop.monthlyHarvests * (tempSellPrice * 1.25)) * 0.1)))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice) + ((crop.monthlyHarvests * (tempSellPrice)) * 0.1))))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2) + (((tempSellPrice * 2))) * 0.1))) + (goldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)))) + (silverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)))) + (noAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1))))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5) + (((tempSellPrice * 1.5)) * 0.1)))) + (secondSilverAmount * (((tempSellPrice * 1.25) + (((tempSellPrice * 1.25)) * 0.1)))) + (secondNoAmount * (((tempSellPrice) + (((tempSellPrice)) * 0.1))))));


                } else {
                    crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2)))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)))) + (noAmount * ((crop.mostHarvests * (tempSellPrice))))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5)))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25)))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice))))));

                    crop.monthlyProfit = Math.round(((iridiumAmount * ((crop.monthlyHarvests * (tempSellPrice * 2)))) + (goldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)))) + (silverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)))) + (noAmount * ((crop.monthlyHarvests * (tempSellPrice))))) + 2 * ((secondGoldAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.5)))) + (secondSilverAmount * ((crop.monthlyHarvests * (tempSellPrice * 1.25)))) + (secondNoAmount * ((crop.monthlyHarvests * (tempSellPrice))))));

                    crop.singleProfit = Math.round(((iridiumAmount * (((tempSellPrice * 2)))) + (goldAmount * (((tempSellPrice * 1.5)))) + (silverAmount * (((tempSellPrice * 1.25)))) + (noAmount * (((tempSellPrice))))) + 2 * ((secondGoldAmount * (((tempSellPrice * 1.5)))) + (secondSilverAmount * (((tempSellPrice * 1.25)))) + (secondNoAmount * (((tempSellPrice))))));


                }
                break;
            default:
                if (profession == 'yes') {
                    crop.maxProfit = Math.round((iridiumAmount * ((crop.mostHarvests * (crop.sellPrice * 2) + ((crop.mostHarvests * (crop.sellPrice * 2))) * 0.1))) + (goldAmount * ((crop.mostHarvests * (crop.sellPrice * 1.5) + ((crop.mostHarvests * (crop.sellPrice * 1.5)) * 0.1)))) + (silverAmount * ((crop.mostHarvests * (crop.sellPrice * 1.25) + ((crop.mostHarvests * (crop.sellPrice * 1.25))) * 0.1))) + (noAmount * ((crop.mostHarvests * (crop.sellPrice) + ((crop.mostHarvests * (crop.sellPrice))) * 0.1))));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / harvestsLeft;
                        crop.seedCost = crop.seedCost * crop.monthlyHarvests;
                    }

                    crop.monthlyProfit = Math.round((iridiumAmount * ((crop.monthlyHarvests * (crop.sellPrice * 2) + ((crop.monthlyHarvests * (crop.sellPrice * 2))) * 0.1))) + (goldAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.5) + ((crop.monthlyHarvests * (crop.sellPrice * 1.5)) * 0.1)))) + (silverAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.25) + ((crop.monthlyHarvests * (crop.sellPrice * 1.25))) * 0.1))) + (noAmount * ((crop.monthlyHarvests * (crop.sellPrice) + ((crop.monthlyHarvests * (crop.sellPrice))) * 0.1))));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / crop.monthlyHarvests;

                    }
                    crop.singleProfit = Math.round((iridiumAmount * (((crop.sellPrice * 2) + (((crop.sellPrice * 2))) * 0.1))) + (goldAmount * (((crop.sellPrice * 1.5) + (((crop.sellPrice * 1.5)) * 0.1)))) + (silverAmount * (((crop.sellPrice * 1.25) + (((crop.sellPrice * 1.25))) * 0.1))) + (noAmount * (((crop.sellPrice) + (((crop.sellPrice))) * 0.1))));


                } else {
                    crop.maxProfit = Math.round((iridiumAmount * ((crop.mostHarvests * (crop.sellPrice * 2)))) + (goldAmount * ((crop.mostHarvests * (crop.sellPrice * 1.5)))) + (silverAmount * ((crop.mostHarvests * (crop.sellPrice * 1.25)))) + (noAmount * ((crop.mostHarvests * (crop.sellPrice)))));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / (harvestsLeft);
                        crop.seedCost = crop.seedCost * crop.monthlyHarvests;
                    }

                    crop.monthlyProfit = Math.round((iridiumAmount * ((crop.monthlyHarvests * (crop.sellPrice * 2)))) + (goldAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.5)))) + (silverAmount * ((crop.monthlyHarvests * (crop.sellPrice * 1.25)))) + (noAmount * ((crop.monthlyHarvests * (crop.sellPrice)))));

                    if (crop.harvestDays == 0) {
                        crop.seedCost = crop.seedCost / crop.monthlyHarvests;

                    }
                    crop.singleProfit = Math.round((iridiumAmount * (((crop.sellPrice * 2)))) + (goldAmount * (((crop.sellPrice * 1.5)))) + (silverAmount * (((crop.sellPrice * 1.25)))) + (noAmount * (((crop.sellPrice)))));


                }
                break;
        }
    }

    if (crop.harvestDays == 0) {
        harvestsLeft = Math.floor(days / crop.matureDays);
    }

    return crop;
}

function sellFunction(season, days, level, profession, check, crops, fertilizers, quantities, profit, gingers, irrigations) {
    /* console.log(season);
     console.log(days);
     console.log(level);
     console.log(profession);
     console.log(check);
     console.log(crops);
     console.log(fertilizers);
     console.log(quantities);*/

    days = eval(days);
    level = eval(level);

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

    crops = crops.map((value, index) => {

        if ((value.name == 'Unmilled rice' || value.name == 'Taro Root') && irrigations[index] == true) {
            switch(value.name) {
                case 'Unmilled rice':
                    value.matureDays = 6;
                    break;
                case 'Taro Root':
                    value.matureDays = 7;
                    break;
            }
        }

        if (profit == 'profit' && ((value.name !== 'Cactus Fruit') && (value.name !== 'Pineapple' && value.name !== 'Taro Root'))) {

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
                if (value.maxHarvests == 1 || (value.name == 'Sunflower' || value.name == 'Wheat')) {
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
        } else if (gingers[index] == false) {
            if (value.maxHarvests == 1 || ((value.name == 'Wheat' || value.name == 'Sunflower') && season == 'fall')) {
                value.singleProfit = (value.sellPrice);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(28 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;
            } else if (value.maxHarvests > 1 || ((season == 'summer' && value.name == 'Coffee') || ((season == 'fall' && ((value.name == 'Corn'))) || ((season == 'fall' && value.name == 'Ancient Fruit') || (value.name == 'Cactus Fruit'))))) {
                value.singleProfit = (value.sellPrice);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice);

                remainingDays = 28 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice);
            } else if (((season == 'spring' && value.name == 'Coffee') || (season == 'summer' && value.name == 'Corn')) || ( (season == 'summer' && value.name == 'Ancient Fruit'))) {
                days = days + 28;
                value.singleProfit = (value.sellPrice);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice);

                remainingDays = 56 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice);
                days = days - 28;
            } else if ((value.name == 'Sunflower' || value.name == 'Wheat') && season == 'summer') {
                days = days + 28;

                value.singleProfit = (value.sellPrice);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(56 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;

                days = days - 28;
            } else if ((season == 'spring' && value.name == 'Ancient Fruit') ) {
                days = days + 56;
                value.singleProfit = (value.sellPrice);

                let remainingDays = days - (value.matureDays + 1);
                value.mostHarvests = (remainingDays / value.harvestDays) + 1;

                value.maxProfit = (value.mostHarvests * value.sellPrice);

                remainingDays = 84 - (value.matureDays + 1);
                value.monthlyHarvests = remainingDays / value.harvestDays + 1;

                value.monthlyProfit = (value.monthlyHarvests * value.sellPrice);
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
            if (value.maxHarvests == 1) {
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

    /* #region  html element creation */
    $('div, #result-div').remove();

    let resultDiv = document.createElement('div');
    resultDiv.setAttribute('id', 'result-div');
    resultDiv.style.padding = '1rem 1rem 2rem';

    let main = document.getElementById('main');

    let divTitle = document.createElement('p');
    divTitle.setAttribute('id', 'div-title');
    divTitle.innerHTML = 'Profit';

    let breaklineTitle = document.createElement('hr');


    $(function () {

        $(divTitle).hover(function () {
            disclaimerHover();
        }, function () {
            $('#disclaimer-container').remove();
        })

    });


    $(resultDiv).appendTo(main);
    $(divTitle).appendTo(resultDiv);
    $(breaklineTitle).appendTo(resultDiv);

    if ($('#mobile-check').css('display') == 'block') {
        let mobileInfo = document.getElementById('mobile-info-button');
        mobileInfo.style.display = 'block';
        mobileInfo.style.setProperty('--display','block');

        $(mobileInfo).prependTo('#result-div');

        let mobileInfoContainer = document.createElement('div');
        mobileInfoContainer.setAttribute('id', 'mobile-info-container');
        mobileInfoContainer.innerHTML = "\n<i class='fa-solid fa-times fa-xl' id='close-mobile'></i>\n<div id='mobile-container'>\n<p class='main-info'>Profits assume replanting of crops with only one harvest.</p>\n<p class='main-info'>Profits assume selected crops are in season.</p>\n<p class='main-info'>Remaining Profit is based on remaining harvests in the season. For crops that can grow in more than one season, it's based on the remaining days in the current season + any following season(s) the crop can grow in.</p>\n<p class='main-info'>Potential Total is based on the total for crops grown from the first day of the current season. For crops that can grow in more than one season, it's based on the remaining days in the current season + any following season(s) the crop can grow in.</p>\n</div>"
        //$(mobileInfoContainer).appendTo('#main');
        let body = document.getElementById('body');
        $(mobileInfoContainer).prependTo(body);


        $(mobileInfo).on('click', function () {
            mobileInfoContainer.style.display = 'inline-flex';
            mobileInfoContainer.style.top =  window.visualViewport.pageTop + 'px';
        })

        $('#close-mobile').on('click', function () {
            mobileInfoContainer.style.display = 'none';
        })

        let resultDiv = document.getElementById('result-div');
        let resultRect = resultDiv.getBoundingClientRect();
        console.log(resultRect);

        //mobileInfo.style.setProperty('--top', resultRect.top + 225 + ('px'));
        mobileInfo.style.top = resultRect.top + 180 + ('px');
        //mobileInfo.style.right = resultRect.left + 50 + ('px');
        mobileInfo.style.right = '25px';


        
    }
    /* #endregion */



    for (let i = 0; i < crops.length; i++) {

        getCropNumbers(crops, quantities[i], crops[i], days, fertilizers[i], level, profession, profit);

        if ($('#mobile-check').css('display') == 'block') {
            let submitBreak = document.createElement('hr');
            $(submitBreak).appendTo(form);
        }

        let cropDiv = document.createElement('div');
        cropDiv.setAttribute('class', 'crop-div');


        $(cropDiv).appendTo(resultDiv);

        let cropTitle = document.createElement('p');
        cropTitle.setAttribute('class', 'crop-title');
        cropTitle.textDecoration = 'underline';
        cropTitle.innerHTML = crops[i].name;

        let singleProfitAmount = document.createElement('p');
        singleProfitAmount.setAttribute('class', 'crop-info');
        let singleSpan = document.createElement('span');
        singleSpan.setAttribute('class', 'span');
        singleSpan.innerHTML = crops[i].singleProfit.toLocaleString('en-US', 'USD');
        singleProfitAmount.innerHTML = 'Single Harvest: ';
        $(singleSpan).appendTo(singleProfitAmount);

        let remainingMonthlyAmount = document.createElement('p');
        remainingMonthlyAmount.setAttribute('class', 'crop-info');
        let remainingSpan = document.createElement('span');
        remainingSpan.setAttribute('class', 'span');
        remainingSpan.innerHTML = crops[i].maxProfit.toLocaleString('en-US', 'USD');
        remainingMonthlyAmount.innerHTML = 'Remaining Harvests Profit: ';
        $(remainingSpan).appendTo(remainingMonthlyAmount,'::after');



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
        potentialSpan.innerHTML = crops[i].monthlyProfit.toLocaleString('en-US', 'USD');
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

        /*if ((((crops[i].name == 'Ancient Fruit' || crops[i].name == 'Corn') || (crops[i].name == 'Sunflower' || crops[i].name == 'Wheat')) && season == 'summer') || ((crops[i].name == 'Coffee' || crops[i].name == 'Ancient Fruit') && season == 'spring')) {
            remainingMonthlyAmount.innerHTML = 'Profit from remaining harvests while crop is in season: ';
            $(remainingSpan).appendTo(remainingMonthlyAmount,'::after');

            potentialMonthlyAmount.innerHTML = 'Potential total profit from start of current season to end of crop\'s final season: ';
            $(potentialSpan).appendTo(potentialMonthlyAmount);
        }*/

        $(cropTitle).appendTo(cropDiv);

        if ((crops[i].name == 'Ancient Fruit') || (crops[i].name == 'Pineapple' || crops[i].name == 'Taro Root')) {
            let netDisclaimer = document.createElement('p');
            netDisclaimer.style.color = 'hsla(56, 23%, 90%, 1)';
            netDisclaimer.style.fontSize = '14px';
            netDisclaimer.style.width = '350px';
            netDisclaimer.style.textDecoration = 'none';
            netDisclaimer.style.textAlign = 'center';
            netDisclaimer.style.margin = '0 0 1rem';
            netDisclaimer.style.lineHeight = '120%';
            netDisclaimer.innerHTML = 'Due to the method(s) of obtainment for this crop, only net income can be calculated. Other crops still show profit.';
            $(netDisclaimer).appendTo(cropDiv);
            cropTitle.style.marginBottom = '0.5rem';
        } if ((((crops[i].name == 'Cactus Fruit') || (crops[i].name == 'Pineapple' || crops[i].name == 'Taro Root')) && gingers[i] == true) || (crops[i].name == 'Cactus Fruit')) {
            let seasonDisclaimer = document.createElement('p');
            seasonDisclaimer.style.color = 'hsla(56, 23%, 1)';
            seasonDisclaimer.style.fontSize = '14px';
            seasonDisclaimer.style.width = '350px';
            seasonDisclaimer.style.textDecoration = 'none';
            seasonDisclaimer.style.textAlign = 'center';
            seasonDisclaimer.style.margin = '0 0 1rem';
            seasonDisclaimer.style.lineHeight = '120%';
            seasonDisclaimer.innerHTML = 'Because this crop can grow year-round, only income for the remainder of the season is calculated.';
            $(seasonDisclaimer).appendTo(cropDiv);
        }

        $(singleProfitAmount).appendTo(cropDiv);
        $(remainingMonthlyAmount).appendTo(cropDiv);
        $(potentialMonthlyAmount).appendTo(cropDiv);

        if ((crops.length > 1) && i !== crops.length - 1) {
            let breakline = document.createElement('hr');


            $(breakline).appendTo(cropDiv);
        }

        if ((crops[i].name == 'Unmilled rice' || crops[i].name == 'Taro Root') && irrigations[i] == true) {
            crops[i].matureDays = crops[i].defaultMatureDays;
        }
    };

}

let form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault;

    let season = form.season.value;
    let days = form.days.value;
    let level = form.level.value;
    let profession = form.profession.value;
    let formulaCheck = null;
    let profitCheck = form['profit-type'].value;
    console.log(form['profit-type'])

    let formArray = form.firstElementChild.children;
    let gingerArray = [];

    let irrigationArray = [];

    for (let i = 0; i < formArray.length; i++) {
        if (i !== 0) {
            let cropElementContainer = formArray[i];
            let fertCon;
            if (i == 1) {
                fertCon = cropElementContainer.children[2];
            } else {
                fertCon = cropElementContainer.children[3];
            }
            if (fertCon.children.length == 1) {
                gingerArray.push(false);
                irrigationArray.push(false);
            } else if (i == 1 && cropElementContainer.children[1].children[0].children[1].value == 'unmilledRice') {
                gingerArray.push(false);
                irrigationArray.push(fertCon.children[1].children[0].checked);
            } else if (cropElementContainer.children[2].children[0].children[1].value == 'unmilledRice') {
                gingerArray.push(false);
                irrigationArray.push(fertCon.children[1].children[0].checked);
            } else if (i == 1 && cropElementContainer.children[1].children[0].children[1].value == 'taroRoot') {
                gingerArray.push(fertCon.children[1].children[0].checked);

                irrigationArray.push(cropElementContainer.children[3].children[0].children[0].checked);
            } else if (cropElementContainer.children[2].children[0].children[1].value == 'taroRoot') {
                gingerArray.push(fertCon.children[1].children[0].checked);
                irrigationArray.push(cropElementContainer.children[4].children[0].children[0].checked);
            }
             else {
                gingerArray.push(fertCon.children[1].children[0].checked);
                irrigationArray.push(false);
            }
        }
    }

    selectedCrops = document.getElementsByClassName('crop-name');
    fertilizers = document.getElementsByClassName('fertilizer');
    quantities = document.getElementsByClassName('quantity');

    let cropsArray = [];
    let fertilizerArray = [];
    let quantityArray = [];

    for (let i = 0; i < selectedCrops.length; i++) {
        cropsArray.push(eval(selectedCrops[i].value));
        fertilizerArray.push(fertilizers[i].value);
        quantityArray.push(quantities[i].value);
    }

    sellFunction(season, days, level, profession, formulaCheck, cropsArray, fertilizerArray, quantityArray, profitCheck, gingerArray, irrigationArray);


    console.log(form.elements);
})


export { cropArray, getCropNumbers };