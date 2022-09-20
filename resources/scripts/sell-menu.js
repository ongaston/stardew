import { Crop, getCropQuality, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';

/* #region  variable declaration */
let newCropButton = document.getElementById('new-crop-button');
let oldCropContainer = document.getElementsByClassName('new-crop-container');
let biggerContainer = document.getElementById('bigger-container');

let cropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet];

let cropNumber = 1;
let submitCount = 1;

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

function clickFunction() {

    $(newCropButton).remove();

    for (let i = 0; i < oldCropContainer.length; i++) {
        $(oldCropContainer[i]).remove();
    }

    /* #region  first html elements */
    cropNumber++;

    let bigContainer = document.createElement('section');
    bigContainer.setAttribute('class', 'big-container');

    let cropTitle = document.createElement('p');
    cropTitle.setAttribute('class', 'crop-section');
    cropTitle.innerHTML = 'Crop ' + cropNumber.toString();

    let removeContainer = document.createElement('section');
    removeContainer.setAttribute('class', 'remove-container');

    let removeButton = document.createElement('p');
    removeButton.setAttribute('class', 'remove-button');
    removeButton.setAttribute('id', 'remove' + cropNumber.toString());
    removeButton.innerHTML = 'Remove Crop  ';
    $(removeButton).appendTo(removeContainer);

    let xSymbol = document.createElement('i');
    xSymbol.setAttribute('class', 'fa-solid');
    xSymbol.setAttribute('class', 'fa-circle-xmark');
    $(xSymbol).appendTo(removeButton);

    let nameAndQuantity = document.createElement('section');
    nameAndQuantity.setAttribute('class', 'section');

    let nameContainer = document.createElement('section');
    nameContainer.setAttribute('class', 'mobile');

    let nameLabel = document.createElement('label');
    nameLabel.setAttribute('class', 'desktop');
    nameLabel.innerHTML = 'Crop: ';

    let cropSelect = document.createElement('select');
    cropSelect.setAttribute('name', 'crop-name' + cropNumber.toString());
    cropSelect.setAttribute('class', 'crop-name');

    $(bigContainer).appendTo(biggerContainer);
    $(cropTitle).appendTo(bigContainer);
    $(removeContainer).appendTo(bigContainer);
    $(nameAndQuantity).appendTo(bigContainer);
    $(nameContainer).appendTo(nameAndQuantity);
    $(nameLabel).appendTo(nameContainer);
    $(cropSelect).appendTo(nameContainer);

    let blank = document.createElement('option');
    blank.setAttribute('value', '');
    blank.innerHTML = '--Choose a Crop--';
    $(blank).appendTo(cropSelect);
    /* #endregion */

    function capitalize(s) {
        return s[0].toLowerCase() + s.slice(1);
    }

    for (let i = 0; i < cropArray.length; i++) {
        let newOption = document.createElement('option');
        newOption.innerHTML = cropArray[i].name;
        let value;
        if (cropArray[i].name === 'Sweet Gem Fruit') {
            value = 'sweetGemFruit';
        } else {
            let letterIndex = cropArray[i].name.indexOf(' ') + 1;
            if (letterIndex == 0) {
                value = cropArray[i].name.toLowerCase();
            } else {
                value = cropArray[i].name.substr(0, letterIndex - 1) + cropArray[i].name.substr(letterIndex, 1).toUpperCase() + cropArray[i].name.substr(letterIndex + 1);
                value = capitalize(value);
            }
        }
        newOption.setAttribute('value', value);
        $(newOption).appendTo(cropSelect);
    }

    /* #region  crop info html elements */
    let quantityContainer = document.createElement('section');
    quantityContainer.setAttribute('class', 'mobile');
    $(quantityContainer).appendTo(nameAndQuantity);

    let quantityLabel = document.createElement('label');
    quantityLabel.innerHTML = 'Quantity: ';
    $(quantityLabel).appendTo(quantityContainer);

    let quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('max', 5000);
    quantityInput.setAttribute('value', 1);
    quantityInput.setAttribute('id', 'quantity' + cropNumber.toString());
    quantityInput.setAttribute('class', 'quantity');
    $(quantityInput).appendTo(quantityContainer);

    let fertilizerContainer = document.createElement('section');
    fertilizerContainer.setAttribute('class', 'mobile');
    $(fertilizerContainer).appendTo(bigContainer);

    let fertilizerLabel = document.createElement('label');
    fertilizerLabel.innerHTML = 'Fertilizer: ';
    $(fertilizerLabel).appendTo(fertilizerContainer);

    let fertilizerSelect = document.createElement('select');
    fertilizerSelect.setAttribute('id', 'fertilizer' + cropNumber.toString());
    fertilizerSelect.setAttribute('class', 'fertilizer');
    $(fertilizerSelect).appendTo(fertilizerContainer);

    let none = document.createElement('option');
    none.setAttribute('value', 'none');
    none.innerHTML = 'None';
    $(none).appendTo(fertilizerSelect);

    let deluxe = document.createElement('option');
    deluxe.setAttribute('value', 'deluxe');
    deluxe.innerHTML = 'Deluxe';
    $(deluxe).appendTo(fertilizerSelect);

    let quality = document.createElement('option');
    quality.setAttribute('value', 'quality');
    quality.innerHTML = 'Quality';
    $(quality).appendTo(fertilizerSelect);

    let standard = document.createElement('option');
    standard.setAttribute('value', 'standard');
    standard.innerHTML = 'Standard';
    $(standard).appendTo(fertilizerSelect);

    let newCropContainer = document.createElement('section');
    newCropContainer.setAttribute('class', 'new-crop-container');
    $(newCropContainer).appendTo(bigContainer);

    newCropButton = document.createElement('p');
    newCropButton.setAttribute('id', 'new-crop-button');
    newCropButton.innerHTML = 'Add Another Crop ';
    $(newCropButton).appendTo(newCropContainer);
    /* #endregion */

    $(newCropButton).on('click', function () {
        clickFunction();
    })

    let plus = document.createElement('i');
    plus.setAttribute('class', 'fa-solid');
    plus.setAttribute('class', 'fa-plus');
    $(plus).appendTo(newCropButton);


}


$(function () {

    $(newCropButton).on('click', function () {
        clickFunction();
    })


})

function getCropNumbers(cropsArray, number, crop, days, fertilizer, level, profession) {
    let array = getCropQuality(level, fertilizer);
    number = eval(number);

    console.log(number);
    console.log(crop);
    console.log(days);
    console.log(fertilizer);
    console.log(level);
    console.log(profession);
    console.log(array);

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
    console.log('harvestsLeft ' + harvestsLeft);
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
                crop.maxProfit = Math.round(((iridiumAmount * ((crop.mostHarvests * (tempSellPrice * 2) + ((crop.mostHarvests * (tempSellPrice * 2))) * 0.1) - (crop.seedCost / 3))) + (goldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (silverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (noAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))) + 2 * ((secondGoldAmount * ((crop.mostHarvests * (tempSellPrice * 1.5) + ((crop.mostHarvests * (tempSellPrice * 1.5)) * 0.1)) - (crop.seedCost / 3))) + (secondSilverAmount * ((crop.mostHarvests * (tempSellPrice * 1.25) + ((crop.mostHarvests * (tempSellPrice * 1.25)) * 0.1)) - (crop.seedCost / 3))) + (secondNoAmount * ((crop.mostHarvests * (tempSellPrice) + ((crop.mostHarvests * (tempSellPrice)) * 0.1)) - (crop.seedCost / 3)))));

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

    if (crop.harvestDays == 0) {
        harvestsLeft = Math.floor(days / crop.matureDays);
    }

    return crop;
}

function sellFunction(season, days, level, profession, check, crops, fertilizers, quantities, profit) {
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

    crops = crops.map((value) => {

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
    disclaimer.style.width = '150px';
    disclaimer.style.textDecoration = 'none';
    disclaimer.style.textAlign = 'center';
    disclaimer.style.margin = '1rem 0';
    disclaimer.innerHTML = 'Profits assume replanting of crops with only one harvest.';

    $(resultDiv).appendTo(main);
    $(divTitle).appendTo(resultDiv);
    $(disclaimer).appendTo(resultDiv);
    /* #endregion */
    console.log(crops);

    for (let i = 0; i < crops.length; i++) {

        getCropNumbers(crops, quantities[i], crops[i], days, fertilizers[i], level, profession);

        let cropDiv = document.createElement('div');
        cropDiv.setAttribute('class', 'crop-div');

        $(cropDiv).appendTo(resultDiv);

        let cropTitle = document.createElement('p');
        cropTitle.setAttribute('class', 'crop-title');
        cropTitle.textDecoration = 'underline';
        cropTitle.innerHTML = crops[i].name;

        let singleProfitAmount = document.createElement('p');
        singleProfitAmount.setAttribute('class', 'crop-info');
        singleProfitAmount.innerHTML = 'Profit from one harvest: ' + crops[i].singleProfit.toLocaleString('en-US', 'USD');

        let remainingMonthlyAmount = document.createElement('p');
        remainingMonthlyAmount.setAttribute('class', 'crop-info');
        remainingMonthlyAmount.innerHTML = 'Profit from remaining harvests this month: ' + crops[i].maxProfit.toLocaleString('en-US', 'USD');

        let potentialMonthlyAmount = document.createElement('p');
        potentialMonthlyAmount.setAttribute('class', 'crop-info');
        potentialMonthlyAmount.innerHTML = 'Potential total profit from start of the month: ' + crops[i].monthlyProfit.toLocaleString('en-US', 'USD');

        $(cropTitle).appendTo(cropDiv);
        $(singleProfitAmount).appendTo(cropDiv);
        $(remainingMonthlyAmount).appendTo(cropDiv);
        $(potentialMonthlyAmount).appendTo(cropDiv);
    };

    let cropInfo = document.getElementsByClassName('crop-info');





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

    sellFunction(season, days, level, profession, formulaCheck, cropsArray, fertilizerArray, quantityArray, profitCheck);
    submitCount++;

    console.log(form.elements);
})
