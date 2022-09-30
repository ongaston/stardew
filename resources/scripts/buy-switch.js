

let scriptElement = document.getElementById('buy-script');

let quantityRadio = document.getElementById('quantity');

let goldRadio = document.getElementById('gold-buy');


$(function () {

    $(quantityRadio).on('click', function () {

        if (scriptElement.src !== 'http://127.0.0.1:5500/resources/scripts/quantity-buy.js') {
            let label = document.getElementById('gold');
            label.setAttribute('for', 'quantity-to-buy');
            label.setAttribute('id', 'quantity-label');
            label.innerHTML = '# of Crops to Buy: ';

            let input = document.getElementById('gold-to-spend');
            input.setAttribute('id', 'quantity-to-buy');
            input.setAttribute('name', 'quantity-to-buy');
            input.setAttribute('value', '100');
        }
        scriptElement.setAttribute('src', './resources/scripts/quantity-buy.js');

    })

    $(goldRadio).on('click', function () {

        if (scriptElement.src !== 'http://127.0.0.1:5500/resources/scripts/calculations.js') {
            let label = document.getElementById('quantity-label');
            label.setAttribute('id', 'gold');
            label.setAttribute('for', 'gold-to-spend');
            label.innerHTML = 'Gold to spend: ';

            let input = document.getElementById('quantity-to-buy');
            input.setAttribute('id', 'gold-to-spend');
            input.setAttribute('name', 'gold-to-spend');
            input.setAttribute('value', '10000');
        }

        scriptElement.setAttribute('src', './resources/scripts/calculations.js');
    })

})