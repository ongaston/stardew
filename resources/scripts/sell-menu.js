import { Crop, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';

let newCropButton = document.getElementById('new-crop-button');
let biggerContainer = document.getElementById('bigger-container');

let cropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet];

let cropNumber = 1;

let coffee = new Crop('spring summer', 2500, 10, 2, 15, 4, 'Coffee');
let starfruit = new Crop('summer', 400, 13, 0, 750, 1, 'Starfruit');
let ancientFruit = new Crop('spring summer fall', 1000, 28, 7, 550, 1, 'Ancient Fruit');
let cactusFruit = new Crop('spring summer fall winter', 150, 12, 3, 75, 1, 'Cactus Fruit');
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


$(function () {

    $(newCropButton).on('click', function () {
        $(newCropButton).remove();

        cropNumber++;

        let bigContainer = document.createElement('section');
        bigContainer.setAttribute('class', 'big-container');

        let cropTitle = document.createElement('p');
        cropTitle.setAttribute('class', 'crop-section');
        cropTitle.innerHTML = 'Crop ' + cropNumber.toString();

        let nameAndQuantity = document.createElement('section');
        nameAndQuantity.setAttribute('class', 'section');

        let nameContainer = document.createElement('section');
        nameContainer.setAttribute('class', 'mobile');

        let nameLabel = document.createElement('label');
        nameLabel.setAttribute('class', 'desktop');
        nameLabel.innerHTML = 'Crop: ';

        let cropSelect = document.createElement('select');
        cropSelect.setAttribute('name', 'crop-name');

        $(bigContainer).appendTo(biggerContainer);
        $(cropTitle).appendTo(bigContainer);
        $(nameAndQuantity).appendTo(bigContainer);
        $(nameContainer).appendTo(nameAndQuantity);
        $(nameLabel).appendTo(nameContainer);
        $(cropSelect).appendTo(nameContainer);

        let blank = document.createElement('option');
        blank.setAttribute('value', '');
        blank.innerHTML = '--Choose a Crop--';
        $(blank).appendTo(cropSelect);

        function capitalize (s) {
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
        $(quantityInput).appendTo(quantityContainer);
        
        let fertilizerContainer = document.createElement('section');
        fertilizerContainer.setAttribute('class', 'mobile');
        $(fertilizerContainer).appendTo(bigContainer);

        let fertilizerLabel = document.createElement('label');
        fertilizerLabel.innerHTML = 'Fertilizer: ';
        $(fertilizerLabel).appendTo(fertilizerContainer);

        let fertilizerSelect = document.createElement('select');
        fertilizerSelect.setAttribute('id', 'fertilizer' + cropNumber.toString());

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


    })

})