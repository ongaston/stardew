
let mainInfoContainer = document.getElementById('main-info-container');
let closeButton = document.getElementById('close-main');
let mainInfoButton = document.getElementById('info-button-main');

function closeMain() {

    mainInfoContainer.style.display = 'none';

}

function mainInfo() {


    mainInfoContainer.style.display = 'inline-flex';

}

let mobileInfoContainer = document.getElementById('mobile-info-container');
let mobileClose = document.getElementById('close-mobile');
let mobileInfoButton = document.getElementById('mobile-info-button');



$(function () {

    $(mainInfoButton).on('click', function () {
        mainInfo();
    })

    $(closeButton).on('click', function () {
        closeMain();
    })

})