

const style2 = document.getElementById('style2').sheet;
console.log(style2)
let ruleLength = style2.cssRules.length;

//keyframe index - 40
//cssTextProperty

let windowWidth = window.innerWidth;

let positionTwo = (windowWidth * 0.125) + 'px';
let positionThree = (windowWidth * 0.25) + 'px';
let positionFour = (windowWidth * 0.375) + 'px';
let positionFive = (windowWidth * 0.5) + 'px';
let positionSix = (windowWidth * 0.625) + 'px';
let positionSeven = (windowWidth * 0.75) + 'px';
let positionEight = (windowWidth * 0.875) + 'px';

let keyframeRule = style2.cssRules[40];
console.log(keyframeRule)

for (let i = 0; i < 39; i++) {

    let transformRule = keyframeRule[i].style.transform;
    if (transformRule.includes('translate(12.5%')) {
        let string = keyframeRule[i].style.transform.replace('12.5%', positionTwo);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(25%')) {
        let string = keyframeRule[i].style.transform.replace('25%', positionThree);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(37.5%')) {
        let string = keyframeRule[i].style.transform.replace('37.5%', positionFour);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(50%')) {
        let string = transformRule.replace('50%', positionFive);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(62.5%')) {
        let string = transformRule.replace('62.5%', positionSix);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(75%')) {
        let string = transformRule.replace('75%', positionSeven);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(87.5%')) {
        let string = transformRule.replace('87.5%', positionEight);
        keyframeRule[i].style.transform = string;
    } else if (transformRule.includes('translate(100%')) {
        let string = transformRule.replace('100%', windowWidth + 'px');
        keyframeRule[i].style.transform = string;
    }
}
/*

let frog = document.getElementById('frog');
console.log(frog)

$(function () {

    
})

/*for (let i = 0; i < 9; i++) {
    console.log(frog.getBoundingClientRect());
    setTimeout('console.log(frog.getBoundingClientRect())', 1000);
    setTimeout('console.log(frog.getBoundingClientRect())', 1000);
    setTimeout('console.log(frog.getBoundingClientRect())', 1000);
    setTimeout('console.log(frog.getBoundingClientRect())', 1000);
    setTimeout('console.log(frog.getBoundingClientRect())', 1000);
    setTimeout('console.log(frog.getBoundingClientRect())', 1000);
    console.log('break');
}*/

/*function timer () {

    console.log('break');
    console.log(frog.getBoundingClientRect());

    setTimeout(() => {
        console.log(frog.getBoundingClientRect());
        setTimeout(() => {
            console.log(frog.getBoundingClientRect());
            setTimeout(() => {
                console.log(frog.getBoundingClientRect());
                setTimeout(() => {
                    console.log(frog.getBoundingClientRect());
                    setTimeout(() => {
                        console.log(frog.getBoundingClientRect());
                        setTimeout(() => {
                            console.log(frog.getBoundingClientRect());
                            setTimeout(() => {
                                console.log(frog.getBoundingClientRect());
                                console.log('break');
                            }, 125)
                        }, 125)
                    }, 80)
                }, 71.25)
            }, 62.5)
        }, 37.5)
    }, 12.5)
}



const myPromise = new Promise((resolveOne) => {

    timer();

})

*/

let frog = document.getElementById('frog');
let animationCount = 0;
