//toggle from close
function inlineToggle(obj) {
    if ($(obj).css('display') == 'none') {
        $(obj).slideToggle();
        $(obj).css({
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center'
        })
    } else if (obj.style.display == 'inline-flex') {
        $(obj).slideToggle();
    }
}

//rotate element
function rotateToggle(element, duration=400, rotation='180deg') {
    if ($(element).css('rotate') !== rotation) {
        $(element).animate({
            rotate: rotation
        }, duration);
    } else {
        $(element).animate({
            rotate: '0deg'
        }, duration);
    }
}

//golden ratio formating
function goldenRatio (base) {
    ratio = 1.618034;
    psize = parseInt($(base).css('font-size').replace(/\D/g,''));
    lineheight = Math.round(psize*ratio);
    hsize = lineheight;
    shsize = Math.round(psize/(ratio/2));
    presize = Math.round(psize*(ratio/2));
/*		pageElements.forEach(function(v) {
        $('.ex'+v).css('font-size',hsize+'px','line-height',lineheight+'px');
                localStorage[v] = JSON.stringify($('.ex'+v).css());

    });
*/
    $('.exheader').css('font-size',hsize+'px');
    $('.exheader').css('line-height',lineheight+'px');
    $('.exsubheading').css('font-size',shsize+'px'); 
    $('.exsubheading').css('line-height',lineheight+'px'); 
    $('.exparagraph').css('font-size',psize+'px'); 
    $('.exparagraph').css('line-height',lineheight+'px'); 
    $('.exblockquote').css('font-size',shsize+'px'); 
    $('.exblockquote').css('line-height',lineheight+'px'); 
    $('.expreformatted').css('font-size',presize+'px'); 
    $('.expreformatted').css('line-height',lineheight+'px'); 
            localStorage['header'] = JSON.stringify($('.exheader').css());
            localStorage['subheading'] = JSON.stringify($('.exsubheading').css());
            localStorage['paragraph'] = JSON.stringify($('base').css());
            localStorage['blockquote'] = JSON.stringify($('.exblockquote').css());
            localStorage['preformatted']= JSON.stringify($('.expreformatted').css());

    fontcss();	
};

export { inlineToggle, rotateToggle, goldenRatio };