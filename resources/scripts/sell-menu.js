import { Crop, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';

let newCropButton = document.getElementById('new-crop-button');
let biggerContainer = document.getElementById('bigger-container');

let cropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet];

let cropNumber = 1;


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
        }
        

    })

})