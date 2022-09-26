import { Crop, getCropQuality, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';

/* #region  variable declaration */


let cropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet];

let coffee = new Crop('spring summer', 2500, 10, 2, 15, 0, 'Coffee');
let starfruit = new Crop('summer', 400, 13, 0, 750, 1, 'Starfruit');
let ancientFruit = new Crop('spring summer fall', 1000, 28, 7, 550, 0, 'Ancient Fruit');
let cactusFruit = new Crop('spring summer fall winter', 150, 12, 3, 75, 0, 'Cactus Fruit');
let pineapple = new Crop('summer', 0, 14, 7, 300, 1, 'Pineapple');
let taroRoot = new Crop('summer', 0, 10, 0, 100, 1, 'Taro Root');
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

function sellFunction(season, days, level, profession, check, crops, fertilizers, quantities, profit, gingers) {
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

        if (profit == 'profit' && ((value.name !== 'Cactus Fruit') && (value.name !== 'Pineapple' && value.name !== 'Taro Root'))) {

            if (value.maxHarvests == 1) {
                value.singleProfit = (value.sellPrice - value.seedCost);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(28 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;
            } else if (value.maxHarvests > 1 || ((season == 'summer' && value.name == 'Coffee') || ((season == 'fall' && ((value.name == 'Corn' || value.name == 'Sunflower') || value.name == 'Wheat')) || (season == 'fall' && value.name == 'Ancient Fruit')))) {
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
            }
        } else if (gingers[index] == false) {
            if (value.maxHarvests == 1) {
                value.singleProfit = (value.sellPrice);

                value.mostHarvests = Math.floor(days / value.matureDays);

                value.maxProfit = value.singleProfit * value.mostHarvests;

                value.monthlyHarvests = Math.floor(28 / value.matureDays);

                value.monthlyProfit = value.monthlyHarvests * value.singleProfit;
            } else if (value.maxHarvests > 1 || ((season == 'summer' && value.name == 'Coffee') || ((season == 'fall' && ((value.name == 'Corn' || value.name == 'Sunflower') || value.name == 'Wheat')) || ((season == 'fall' && value.name == 'Ancient Fruit') || (value.name == 'Cactus Fruit'))))) {
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

    let main = document.getElementById('main');

    let divTitle = document.createElement('p');
    divTitle.setAttribute('id', 'div-title');
    divTitle.innerHTML = 'Profit';

    let disclaimer = document.createElement('p');
    disclaimer.style.color = 'hsla(56, 23%, 90%, 1)';
    disclaimer.style.fontSize = '14px';
    disclaimer.style.width = '300px';
    disclaimer.style.textDecoration = 'none';
    disclaimer.style.textAlign = 'center';
    disclaimer.style.margin = '0 0 1rem';
    disclaimer.style.lineHeight = '120%';
    disclaimer.innerHTML = 'Profits assume replanting of crops with only one harvest.';

    $(resultDiv).appendTo(main);
    $(divTitle).appendTo(resultDiv);
    $(disclaimer).appendTo(resultDiv);
    /* #endregion */



    for (let i = 0; i < crops.length; i++) {

        getCropNumbers(crops, quantities[i], crops[i], days, fertilizers[i], level, profession, profit);

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
        singleProfitAmount.innerHTML = 'Profit from one harvest: ';
        $(singleSpan).appendTo(singleProfitAmount);

        let remainingMonthlyAmount = document.createElement('p');
        remainingMonthlyAmount.setAttribute('class', 'crop-info');
        let remainingSpan = document.createElement('span');
        remainingSpan.setAttribute('class', 'span');
        remainingSpan.innerHTML = crops[i].maxProfit.toLocaleString('en-US', 'USD');
        remainingMonthlyAmount.innerHTML = 'Profit from remaining harvests this month: ';
        $(remainingSpan).appendTo(remainingMonthlyAmount,'::after');

        let potentialMonthlyAmount = document.createElement('p');
        potentialMonthlyAmount.setAttribute('class', 'crop-info');
        let potentialSpan = document.createElement('span');
        potentialSpan.setAttribute('class', 'span');
        potentialSpan.innerHTML = crops[i].monthlyProfit.toLocaleString('en-US', 'USD');
        potentialMonthlyAmount.innerHTML = 'Potential total profit from start of the month: ';
        $(potentialSpan).appendTo(potentialMonthlyAmount);

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
    };

}

let form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault;

    let season = form.season.value;
    let days = form.days.value;
    let level = form.level.value;
    let profession = form.profession.value;
    let formulaCheck = form['formula-switch'].checked;
    let profitCheck = form['profit-type'].value;

    let formArray = form.firstElementChild.children;

    let gingerArray = [];

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
            } else {
                gingerArray.push(fertCon.children[1].children[0].checked);
            }
        }
    }

    let irrigationArray = [];

    console.log(gingerArray);

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

    sellFunction(season, days, level, profession, formulaCheck, cropsArray, fertilizerArray, quantityArray, profitCheck, gingerArray);


    console.log(form.elements);
})

export { cropArray };