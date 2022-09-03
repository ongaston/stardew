

class Crop {
    constructor(season, seedCost, matureDays, harvestDays, sellPrice, maxHarvests) {
        this.season = season;
        this.seedCost = seedCost;
        this.matureDays = matureDays;
        this.harvestDays = harvestDays;
        this.sellPrice = sellPrice;
        this.maxHarvests = maxHarvests;
        this.growingDays;
    }
    get growingDaysMethod() {
        this.growingDays = this.matureDays + ((this.maxHarvests - 1) * this.harvestDays);
        return this.growingDays;
    }
}


let blueJazz = new Crop('spring', 30, 7, 0, 50, 1);
let cauliflower = new Crop('spring', 80, 12, 0, 175, 1);
let greenBean = new Crop('spring', 60, 10, 3, 40, 6);
let kale = new Crop('spring', 70, 6, 0, 110, 1);
let parsnip = new Crop('spring', 20, 4, 0, 35, 1);
let potato = new Crop('spring', 50, 6, 0, 80, 1.25);
let tulip = new Crop('spring', 20, 6, 0, 30, 1);
let unmilledRice = new Crop('spring', 40, 8, 0, 30, 1);

let blueberry = new Crop('summer', 80, 13, 4, 50, 4.08);
let corn = new Crop('summer fall', 150, 14, 4, 50, 11);
let hops = new Crop('summer', 60, 11, 1, 25, 14);
let hotPepper = new Crop('summer', 40, 5, 3, 40, 7.21);
let melon = new Crop('summer', 80, 12, 0, 250, 1);
let poppy = new Crop('summer', 100, 7, 0, 140, 1);
let radish = new Crop('summer', 40, 6, 0, 90, 1);
let summerSpangle = new Crop('summer', 50, 8, 0, 90, 1);
let sunflower = new Crop('summer fall', 200, 8, 0, 80, 1);
let tomato = new Crop('summer', 50, 11, 4, 60, 4);
let wheat = new Crop('summer fall', 10, 4, 0, 25, 1);

let amaranth = new Crop('fall', 70, 7, 0, 150, 1);
let bokChoy = new Crop('fall', 50, 4, 0, 80, 1);
let cranberry = new Crop('fall', 240, 7, 5, 75, 8.12);
let eggplant = new Crop('fall', 20, 5, 5, 60, 5.15);
let fairyRose = new Crop('fall', 200, 12, 0, 290, 1);
let grape = new Crop('fall', 60, 10, 3, 80, 6);
let pumpkin = new Crop('fall', 100, 13, 0, 320, 1);
let yam = new Crop('fall', 60, 10, 0, 160, 1);
let baseCropArray = [blueJazz, cauliflower, greenBean, kale, parsnip, potato, tulip, unmilledRice, blueberry, corn, hops, hotPepper, melon, poppy, radish, summerSpangle, sunflower, tomato, wheat, amaranth, bokChoy, cranberry, eggplant, fairyRose, grape, pumpkin, yam];


let garlic = new Crop('spring', 40, 4, 0, 60, 1);
let strawberry = new Crop('spring', 100, 8, 4, 120, 5.15);
let rhubarb = new Crop('spring', 100, 13, 0, 220, 1);
let redCabbage = new Crop('summer', 100, 9, 0, 260, 1);
let starfruit = new Crop('summer', 400, 13, 0, 750, 1);
let artichoke = new Crop('fall', 30, 8, 0, 160, 1);
let beet = new Crop('fall', 20, 6, 0, 100, 1);


let form = document.querySelector('#form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let season = form.season.value;
    let goldToSpend = form['gold-to-spend'].value;
    let days = form.days.value;
    let fertilizer = form.fertilizer.value;
    let crops = document.getElementsByName('crops');
    let cropsArray = [];
    for (let i = 0; i < crops.length; i++) {
        if (crops[i].checked == true) {
            cropsArray.push(crops[i]);
        }
    }


    console.log(form.elements);
})

console.log(form.elements);