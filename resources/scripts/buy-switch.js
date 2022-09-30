

let buyMethod = 'gold';

let quantityRadio = document.getElementById('quantity');

let goldRadio = document.getElementById('gold-buy');


$(function () {

    /*$(window).on('load', function () {
        let label = document.getElementById('gold');
            label.setAttribute('for', 'quantity-to-buy');
            label.setAttribute('id', 'quantity-label');
            label.innerHTML = '# of Crops to Buy: ';

            let input = document.getElementById('gold-to-spend');
            input.setAttribute('id', 'quantity-to-buy');
            input.setAttribute('name', 'quantity-to-buy');
            input.setAttribute('value', '100');



            let formulaLegend = document.createElement('legend');
            formulaLegend.setAttribute('id', 'profit-type');

            let section1 = document.createElement('section');
            section1.setAttribute('class', 'radio-container');

            let netLabel = document.createElement('label');
            netLabel.setAttribute('for', 'net');
            netLabel.innerHTML = 'Net Income';

            let netInput = document.createElement('input');
            netInput.setAttribute('id', 'net');
            netInput.setAttribute('type', 'radio');
            netInput.setAttribute('value', 'net');
            netInput.setAttribute('name', 'profit-type');

            let section2 = document.createElement('section');
            section2.setAttribute('class', 'radio-container');

            let formulaLabel = document.getElementById('formula-container');
            formulaLabel.setAttribute('for', 'profit');
            formulaLabel.innerHTML = 'Total Profit';

            let formulaInput = document.createElement('input');
            formulaInput.setAttribute('id', 'profit');
            formulaInput.setAttribute('value', 'profit');
            formulaInput.setAttribute('type', 'radio');
            formulaInput.setAttribute('checked', 'true');
            formulaInput.setAttribute('name', 'profit-type');

            $(section1).appendTo(formulaLegend);
            $(netLabel).appendTo(section1);
            $(netInput).appendTo(section1);

            $(section2).appendTo(formulaLegend);
            $(formulaLabel).appendTo(section2);
            $(formulaInput).appendTo(section2);

            let form = document.getElementById('form');

            $(formulaLegend).appendTo(form);
            $('#submit').appendTo(form);
    })*/

    $(quantityRadio).on('click', function () {

        if (buyMethod == 'gold') {
            let label = document.getElementById('gold');
            label.setAttribute('for', 'quantity-to-buy');
            label.setAttribute('id', 'quantity-label');
            label.innerHTML = '# of Crops to Buy: ';

            let input = document.getElementById('gold-to-spend');
            input.setAttribute('id', 'quantity-to-buy');
            input.setAttribute('name', 'quantity-to-buy');
            input.setAttribute('value', '100');



            let formulaLegend = document.createElement('legend');
            formulaLegend.setAttribute('id', 'profit-type');

            let section1 = document.createElement('section');
            section1.setAttribute('class', 'radio-container');

            let netLabel = document.createElement('label');
            netLabel.setAttribute('for', 'net');
            netLabel.innerHTML = 'Net Income';

            let netInput = document.createElement('input');
            netInput.setAttribute('id', 'net');
            netInput.setAttribute('type', 'radio');
            netInput.setAttribute('value', 'net');

            let section2 = document.createElement('section');
            section2.setAttribute('class', 'radio-container');

            let formulaLabel = document.getElementById('formula-container');
            formulaLabel.setAttribute('for', 'profit');
            formulaLabel.innerHTML = 'Total Profit';

            let formulaInput = document.createElement('input');
            formulaInput.setAttribute('id', 'profit');
            formulaInput.setAttribute('value', 'profit');
            formulaInput.setAttribute('type', 'radio');
            formulaInput.setAttribute('checked', 'true');

            $(section1).appendTo(formulaLegend);
            $(netLabel).appendTo(section1);
            $(netInput).appendTo(section1);

            $(section2).appendTo(formulaLegend);
            $(formulaLabel).appendTo(section2);
            $(formulaInput).appendTo(section2);

            let form = document.getElementById('form');

            $(formulaLegend).appendTo(form);
            $('#submit').appendTo(form);

        }

        buyMethod = 'quantity';

    })

    $(goldRadio).on('click', function () {

        if (buyMethod == 'quantity') {
            let label = document.getElementById('quantity-label');
            label.setAttribute('id', 'gold');
            label.setAttribute('for', 'gold-to-spend');
            label.innerHTML = 'Gold to spend: ';

            let input = document.getElementById('quantity-to-buy');
            input.setAttribute('id', 'gold-to-spend');
            input.setAttribute('name', 'gold-to-spend');
            input.setAttribute('value', '10000');


            let formulaLabel = document.getElementById('formula-container');
            formulaLabel.setAttribute('for', 'formula-switch');
            formulaLabel.innerHTML = "User Quantity Formula\n <input id='formula-switch' value='quantity-formula' type='checkbox' name='formula-switch'>\n <span class='checkmark'></span>";

            $(formulaLabel).appendTo('#form');

            $('#submit').appendTo('#form');
        }

        buyMethod = 'gold';

    })

})