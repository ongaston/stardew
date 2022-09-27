let mobile = document.getElementById('mobile-check');

if ($(mobile).css('display') == 'block') {

    let level = document.getElementById('farming-level');
    let days = document.getElementById('days-left');
    let season = document.getElementById('season');
    let daysInput = document.getElementById('days');
    let levelInput = document.getElementById('level');

    days.innerHTML = 'Days: ';
    level.innerHTML = 'Level: ';
    season.innerHTML = '-- Select Season --';
    daysInput.style.width = '2rem';
    daysInput.style.textAlign = 'center';
    levelInput.style.width = '2rem';
    levelInput.style.textAlign = 'center';


}

let daysInput = document.getElementById('days');
let levelInput = document.getElementById('level');

daysInput.style.width = '2rem';
daysInput.style.textAlign = 'center';
levelInput.style.width = '2rem';
levelInput.style.textAlign = 'center';

let form = document.getElementById('form');
let rect = form.getBoundingClientRect();

let mainInfo = document.getElementById('info-button-main');

mainInfo.style.top = rect.top - 7 + ('px');
mainInfo.style.right = rect.left - 7 + ('px');

let mainBackground = document.getElementById('button-background');

mainBackground.style.top = '103px';
mainBackground.style.right = rect.left - 7 + ('px');
mainBackground.style.width = mainInfo.width;
mainBackground.style.height = mainInfo.height;

$(function () {

    $('#form').on('submit', function () {

        let mobileCheck = document.getElementById('mobile-check');
        if ($(mobileCheck).css('display') == 'block') {
            let mobileInfo = document.getElementById('mobile-info-button');
            mobileInfo.style.display = 'block';
            mobileInfo.style.setProperty('--display','block');

            let mobileInfoContainer = document.createElement('div');
            mobileInfoContainer.setAttribute('id', 'mobile-info-container');
            mobileInfoContainer.innerHTML = "\n<i class='fa-solid fa-times fa-xl' id='close-mobile'></i>\n<div id='mobile-container'>\n<p class='main-info'>Profits assume replanting of crops with only one harvest.</p>\n<p class='main-info'>Profits assume selected crops are in season.</p>\n<p class='main-info'>Remaining Profit is based on remaining harvests in the season. For crops that can grow in more than one season, it's based on the remaining days in the current season + any following season(s) the crop can grow in.</p>\n<p class='main-info'>Potential Total is based on the total for crops grown from the first day of the current season. For crops that can grow in more than one season, it's based on the remaining days in the current season + any following season(s) the crop can grow in.</p>\n</div>"
            //$(mobileInfoContainer).appendTo('#main');
            let body = document.getElementById('body');
            $(mobileInfoContainer).prependTo(body);

            $(mobileInfo).on('click', function () {
                mobileInfoContainer.style.display = 'inline-flex';
            })

            $('#close-mobile').on('click', function () {
                mobileInfoContainer.style.display = 'none';
            })

            let resultDiv = document.getElementById('result-div');
            let resultRect = resultDiv.getBoundingClientRect();

            //mobileInfo.style.setProperty('--top', resultRect.top + 225 + ('px'));
            mobileInfo.style.top = resultRect.top + 225 + ('px');
            mobileInfo.style.right = resultRect.left + 7 + ('px');


            let mainInfoContainer = document.createElement('div');
            mainInfoContainer.setAttribute('id', 'main-info-container');
            mainInfoContainer.innerHTML = "<i class='fa-solid fa-times fa-xl' id='close-main'></i>\n <div id='info-container'>\n<p id='season-info' class='main-info'><span class='info-title'>Season:</span>  Select current in-game season. Used if any selected crops potentially grow in more than one season.</p>\n<p class='main-info'><span class='info-title'>Days:</span>  Number of days left in the current season.</p>\n<p class='main-info'><span class='info-title'>Tiller Profession:</span>  Check yes if you have the tiller profession for a more accurate calculation.</p>\n<p class='main-info'><span class='info-title'>Level:</span>  Input your farming level.</p>\n<p class='main-info'><span class='info-title'>Quantity:</span>  Amount of crop to sell.</p>\n<p class='main-info'><span class='info-title'>Fertilizer:</span>  Enter the type of fertilzer you grew the crop with to get a more accurate calculation.</p>\n<p class='main-info'><span class='info-title'>Net Income:</span>  Calculates the total amount of money you'll make without subtracting seed cost.</p>\n<p class='main-info'><span class='info-title'>Profit:</span>  Calculates the money you'll make minus the cost of the seeds. Takes into account whether crop has to be replanted or continues to grow after maturity.</p>\n</div>"
            $(mainInfoContainer).prependTo('#body');

            $(mainInfo).on('click', function () {
                mainInfoContainer.style.display = 'inline-flex';
            })

            $('#close-main').on('click', function () {
                mainInfoContainer.style.display = 'none';
            })
            
        }

    })

})