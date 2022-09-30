import { cropArray } from './sell-menu.js';

let newCropButton = document.getElementById('new-crop-button');
let oldCropContainer = document.getElementsByClassName('new-crop-container');
let firstAddContainer = document.getElementById('old-crop-container');
let biggerContainer = document.getElementById('bigger-container');
let bigContainers;

let removeArray;
let array = [];

let cropNumber = 1;
let num = 1;

let cropName = document.getElementById('crop-name');


function irrigationClick(element) {
    let fertilizerGinger = document.getElementById('fertilizer-ginger');
    let fertCon = document.getElementById('fertilizer-container');
    if ((element.value == 'taroRoot' && fertilizerGinger.nextElementSibling == firstAddContainer)) {

        let irrigationContainer = document.createElement('section');
        irrigationContainer.setAttribute('class', 'section');
        irrigationContainer.setAttribute('id', 'irrigationContainer');

        let irrigationLabel = document.createElement('label');
        irrigationLabel.setAttribute('for', 'irrigation');
        irrigationLabel.setAttribute('id', 'irrigationLabel');
        irrigationLabel.setAttribute('class', 'checkbox-label');
        irrigationLabel.innerHTML = 'Irrigated: \n <input id="irrigation' + '"" type="checkbox">\n <span class="checkmark"></span>';

        $(irrigationLabel).appendTo(irrigationContainer);

        fertilizerGinger.parentElement.insertBefore(irrigationContainer, firstAddContainer);

        if (element.value == 'taroRoot' && fertilizerGinger.lastElementChild !== fertCon) {
            $(fertilizerGinger.lastElementChild).remove();

            gingerClick(element);

        }
        

    } else if (element.value == 'unmilledRice' && fertilizerGinger.lastElementChild == fertCon) {

        let irrigationLabel = document.createElement('label');
        irrigationLabel.setAttribute('for', 'irrigation');
        irrigationLabel.setAttribute('id', 'irrigationLabel');
        irrigationLabel.setAttribute('class', 'checkbox-label');
        irrigationLabel.innerHTML = 'Irrigated: \n <input id="irrigation" type="checkbox">\n <span class="checkmark"></span>';

        $(irrigationLabel).appendTo(fertilizerGinger);

        if (element.value == 'unmilledRice' && fertilizerGinger.nextElementSibling !== firstAddContainer) {

            let containerId = 'irrigationContainer';
            let irrigationContainer = document.getElementById(containerId);
            $(irrigationContainer).remove();
        }

    } else {

        let containerId = 'irrigationContainer';
        let irrigationContainer = document.getElementById(containerId);
        $(irrigationContainer).remove();

        let labelId = 'irrigationLabel';
        let irrigationLabel = document.getElementById(labelId);
        $(irrigationLabel).remove();

        gingerClick(element);
    }
}

function gingerClick(element) {
    let fertilizerCon = document.getElementById('fertilizer-ginger');
    let fertilizerSel = document.getElementById('fertilizer-container');
    if (((element.value == 'cactusFruit' || element.value == 'taroRoot') || element.value == 'pineapple') && (fertilizerCon.lastElementChild == fertilizerSel)) {

        let gingerLabel = document.createElement('label');
        gingerLabel.setAttribute('for', 'gingerIsland');
        gingerLabel.setAttribute('id', 'gingerLabel');


        let gingerSwitch = document.createElement('input');
        gingerSwitch.setAttribute('id', 'gingerIsland');
        gingerSwitch.setAttribute('type', 'checkbox');

        let gingerSpan = document.createElement('span');
        gingerSpan.setAttribute('class', 'checkmark');

        gingerLabel.innerHTML = 'Grown on Ginger Island:\n  <input id="gingerIsland" type="checkbox">\n  <span class="checkmark"></span> '

        $(gingerLabel).appendTo(fertilizerCon);
        /*$(gingerSwitch).appendTo(gingerLabel);
        $(gingerSpan).appendTo(gingerLabel);*/
    } else {

        let gingerLabel = document.getElementById('gingerLabel');
        $(gingerLabel).remove();

        let gingerSwitch = document.getElementById('gingerIsland');
        $(gingerSwitch).remove();

    }
}

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
    cropSelect.setAttribute('required', true);

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
    /* #region  condense */
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
    quantityInput.setAttribute('required', true);
    $(quantityInput).appendTo(quantityContainer);

    let fertilizerGinger = document.createElement('section');
    fertilizerGinger.setAttribute('class', 'section');
    $(fertilizerGinger).appendTo(bigContainer);

    let fertilizerContainer = document.createElement('section');
    fertilizerContainer.setAttribute('class', 'mobile');
    $(fertilizerContainer).appendTo(fertilizerGinger);

    let fertilizerLabel = document.createElement('label');
    fertilizerLabel.innerHTML = 'Fertilizer: ';
    $(fertilizerLabel).appendTo(fertilizerContainer);

    let fertilizerSelect = document.createElement('select');
    fertilizerSelect.setAttribute('id', 'fertilizer' + cropNumber.toString());
    fertilizerSelect.setAttribute('class', 'fertilizer');
    fertilizerSelect.setAttribute('required', true);
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
    /* #endregion */

    $(cropSelect).on('change', function (event) {
        gingerCheck(event.target);
        irrigationCheck(event.target);
    })

    function gingerCheck(element) {
        if (((element.value == 'cactusFruit' || element.value == 'taroRoot') || element.value == 'pineapple') && (fertilizerGinger.lastElementChild == fertilizerContainer)) {
            let gingerLabel = document.createElement('label');
            gingerLabel.setAttribute('for', 'gingerIsland' + cropNumber.toString());
            gingerLabel.setAttribute('id', 'gingerLabel' + cropNumber.toString());
            gingerLabel.setAttribute('class', 'checkbox-label');
            gingerLabel.innerHTML = 'Grown on Ginger Island: \n <input id="gingerIsland' + cropNumber.toString() + '" type="checkbox">\n <span class="checkmark"></span>';


            $(gingerLabel).appendTo(fertilizerGinger);

        } else {
            let titleParentText = element.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
            let textLength = titleParentText.length - 1;
            let numberCrop = titleParentText[textLength];

            let labelId = 'gingerLabel'.concat(numberCrop);
            let gingerLabel = document.getElementById(labelId);
            $(gingerLabel).remove();

            let switchId = 'gingerIsland'.concat(numberCrop);
            let gingerSwitch = document.getElementById(switchId);
            $(gingerSwitch).remove();
        }
    }

    function irrigationCheck (element) {
        if ((element.value == 'taroRoot' && fertilizerGinger.nextElementSibling == newCropContainer)) {

            let irrigationContainer = document.createElement('section');
            irrigationContainer.setAttribute('class', 'section');
            irrigationContainer.setAttribute('id', 'irrigationContainer' + cropNumber.toString());

            let irrigationLabel = document.createElement('label');
            irrigationLabel.setAttribute('for', 'irrigation' + cropNumber.toString());
            irrigationLabel.setAttribute('id', 'irrigationLabel' + cropNumber.toString());
            irrigationLabel.setAttribute('class', 'checkbox-label');
            irrigationLabel.innerHTML = 'Irrigated: \n <input id="irrigation' + cropNumber.toString() + '"" type="checkbox">\n <span class="checkmark"></span>';

            $(irrigationLabel).appendTo(irrigationContainer);

            fertilizerGinger.parentElement.insertBefore(irrigationContainer, newCropContainer);

            if (element.value == 'taroRoot' && fertilizerGinger.lastElementChild !== fertilizerContainer) {
                $(fertilizerGinger.lastElementChild).remove();

                gingerCheck(element);
    
            }
            

        } else if (element.value == 'unmilledRice' && fertilizerGinger.lastElementChild == fertilizerContainer) {

            let irrigationLabel = document.createElement('label');
            irrigationLabel.setAttribute('for', 'irrigation' + cropNumber.toString());
            irrigationLabel.setAttribute('id', 'irrigationLabel' + cropNumber.toString());
            irrigationLabel.setAttribute('class', 'checkbox-label');
            irrigationLabel.innerHTML = 'Irrigated: \n <input id="irrigation' + cropNumber.toString() + '"" type="checkbox">\n <span class="checkmark"></span>';

            $(irrigationLabel).appendTo(fertilizerGinger);

            if (element.value == 'unmilledRice' && fertilizerGinger.nextElementSibling !== newCropContainer) {
                let titleParentText = element.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
                let textLength = titleParentText.length - 1;
                let numberCrop = titleParentText[textLength];
    
                let containerId = 'irrigationContainer'.concat(numberCrop);
                let irrigationContainer = document.getElementById(containerId);
                $(irrigationContainer).remove();
            }

        } else {
            let titleParentText = element.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
            let textLength = titleParentText.length - 1;
            let numberCrop = titleParentText[textLength];

            let containerId = 'irrigationContainer'.concat(numberCrop);
            let irrigationContainer = document.getElementById(containerId);
            $(irrigationContainer).remove();

            let labelId = 'irrigationLabel'.concat(numberCrop);
            let irrigationLabel = document.getElementById(labelId);
            $(irrigationLabel).remove();

            gingerCheck(element);
        }
    }

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

    for (let i = 0; i < bigContainers.length; i++) {
        if (bigContainers.length > 2 && i > 1) {
            bigContainers[i].firstElementChild.innerHTML = 'Crop ' + i.toString();
        }
    }

    let main = document.getElementById('main');
    let resultDiv = document.getElementById('result-div');
    let lastIndex = main.childNodes.length - 1;
    if (main.childNodes[lastIndex] == resultDiv) {

        let bigContainerArray = Array.from(biggerContainer.children);
        let removeIndex = bigContainerArray.indexOf(parent) + 1;
        $(resultDiv.children[removeIndex - 1].lastElementChild).remove();
        $(resultDiv.children[removeIndex]).remove();
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

    $(cropName).on('change', function (event) {
        gingerClick(event.target);
        irrigationClick(event.target);
    })

    $(window).on('load', function () {
        cropName.value = 'coffee';
        gingerClick(cropName);
        irrigationClick(cropName);

        let seasonSelect = document.getElementById('season-select');
        seasonSelect.value = 'spring';
    })

})