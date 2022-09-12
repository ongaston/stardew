let mobile = document.getElementById('mobile-check');

if ($(mobile).css('display') == 'block') {
    let fertilizerSelect = document.getElementById('fertilizer');

    let fertilizer = document.createElement('option');
    fertilizer.setAttribute('value', '');
    fertilizer.innerHTML = '-- Fertilizer --';

    $(fertilizerSelect).prepend(fertilizer);

}