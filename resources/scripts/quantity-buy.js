import { Crop, getCropQuality, baseCropArray, blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam, garlic, strawberry, rhubarb, redCabbage, artichoke, beet } from './calculations.js';





















let form = document.querySelector('#form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        let season = form.season.value;
        let goldToSpend = form['gold-to-spend'].value;
        let days = form.days.value;
        let fertilizer = form.fertilizer.value;
        let level = form.level.value;
        let profession = form.profession.value;
        let formulaCheck = form['formula-switch'].checked;
        let crops = document.getElementsByName('crops');
        let cropsArray = [];
        for (let i = 0; i < crops.length; i++) {
            if (crops[i].checked == true) {
                cropsArray.push(eval(crops[i].value.toString()));
            }
        }
        for (let j = 0; j < cropsArray.length; j++) {
            baseCropArray.push(cropsArray[j]);
        }
        console.log(form.elements);
    })