import { cropArray } from './sell-menu.js';

let newCropButton = document.getElementById('new-crop-button');
let oldCropContainer = document.getElementsByClassName('new-crop-container');
let biggerContainer = document.getElementById('bigger-container');
let bigContainers;

let removeArray;
let array = [];

let cropNumber = 1;
let num = 1;




function clickFunction() {

    $(newCropButton).remove();

    for (let i = 0; i < oldCropContainer.length; i++) {
        $(oldCropContainer[i]).remove();
    }

    num++;
    /* #region  first html elements */
    
    bigContainers = document.querySelectorAll('.big-container');
    cropNumber = bigContainers.length;


    if (num > bigContainers.length) {
        num--;
        let hiddenArray = document.getElementsByClassName('change');

        biggerContainer.removeChild(hiddenArray[0]);

        let bigContainersArray = Array.from(bigContainers);
        //console.log(bigContainersArray);

        for (let i = 0; i < bigContainers.length; i++) {
            if (bigContainersArray.indexOf(bigContainers[i]) > 1) {
                //console.log(bigContainers[i]);
            }
        }
    }


    let bigContainer = document.createElement('section');
    bigContainer.setAttribute('class', 'big-container');
    bigContainer.style.display = 'none';

    let cropTitle = document.createElement('p');
    cropTitle.setAttribute('class', 'crop-section');
    cropTitle.innerHTML = 'Crop ' + cropNumber.toString();

    let removeContainer = document.createElement('section');
    removeContainer.setAttribute('class', 'remove-container');
    removeContainer.setAttribute('id', 'remove' + cropNumber.toString());

    let removeButton = document.createElement('p');
    removeButton.setAttribute('class', 'remove-button');
    removeButton.innerHTML = 'Remove Crop  ';
    $(removeButton).appendTo(removeContainer);

    let xSymbol = document.createElement('i');
    xSymbol.setAttribute('class', 'fa-solid');
    xSymbol.setAttribute('class', 'fa-circle-xmark');
    $(xSymbol).appendTo(removeButton);

    /* #region  collapse */
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

    $(bigContainer).slideToggle();
    removeArray = Array.from(document.getElementsByClassName('remove-container'));
    removeArray.forEach(crop => {
        $(crop).off();
        $(crop).on('click', function () {
            removeCrop(crop);
            addButton();
        })
    })

}

function removeCrop(element) {
    //console.log(element);
    let parent = element.parentElement;
    //console.log(parent);
    $(parent).slideToggle();
    parent.setAttribute('class', 'change');

    bigContainers = document.getElementsByClassName('big-container');
    let bigContainersArray = Array.from(bigContainers);
    console.log(bigContainersArray);

    for (let i = 0; i < bigContainers.length; i++) {
        if (bigContainers.length > 2 && i > 1) {
            console.log(bigContainers[i]);
            bigContainers[i].firstElementChild.innerHTML = 'Crop ' + i.toString();
        }
    }

}

function addButton() {
    bigContainers = document.querySelectorAll('.big-container');
    let lastIndex = bigContainers.length - 1;
    let lastChild = bigContainers[lastIndex];
    //console.log(bigContainers);
    //console.log(lastChild);
    if (lastChild.lastElementChild.className !== 'new-crop-container') {
        let newCropContainer = document.createElement('section');
        newCropContainer.setAttribute('class', 'new-crop-container');
        $(newCropContainer).appendTo(lastChild);

        newCropButton = document.createElement('p');
        newCropButton.setAttribute('id', 'new-crop-button');
        newCropButton.innerHTML = 'Add Another Crop ';
        $(newCropButton).appendTo(newCropContainer);

        let plus = document.createElement('i');
        plus.setAttribute('class', 'fa-solid');
        plus.setAttribute('class', 'fa-plus');
        $(plus).appendTo(newCropButton);

        $(newCropButton).on('click', function () {
            clickFunction();
        })

    }
}


$(function () {

    $(newCropButton).on('click', function () {
        clickFunction();

    })





})