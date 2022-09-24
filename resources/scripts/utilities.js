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

function fontcss(header, subheading, paragraph) {
	var a = $(header);
	var text = "h1 {\n\tfont-family: "+a.css('font-family')+";\n\tfont-size: "+a.css('font-size')+";\n\tfont-style: "+a.css('font-style')+";\n\tfont-variant: "+a.css('font-variant')+";\n\tfont-weight: "+a.css('font-weight')+";\n\tline-height: "+a.css('line-height')+";\n}\n";
	var a = $(subheading);
	var text = text+"h3 {\n\tfont-family: "+a.css('font-family')+";\n\tfont-size: "+a.css('font-size')+";\n\tfont-style: "+a.css('font-style')+";\n\tfont-variant: "+a.css('font-variant')+";\n\tfont-weight: "+a.css('font-weight')+";\n\tline-height: "+a.css('line-height')+";\n}\n";
	var a = $(paragraph);
	var text = text+"p {\n\tfont-family: "+a.css('font-family')+";\n\tfont-size: "+a.css('font-size')+";\n\tfont-style: "+a.css('font-style')+";\n\tfont-variant: "+a.css('font-variant')+";\n\tfont-weight: "+a.css('font-weight')+";\n\tline-height: "+a.css('line-height')+";\n}\n";
	$('#fontcss').text(text);
	return text;
}

//golden ratio formating
function goldenRatio (header, subheading, paragraph) {
    let ratio = 1.618034;
    let psize = parseInt($(paragraph).css('font-size').replace(/\D/g,''));
    let lineheight = Math.round(psize*ratio);
    let hsize = lineheight;
    let shsize = Math.round(psize/(ratio/2));
    let presize = Math.round(psize*(ratio/2));
/*		pageElements.forEach(function(v) {
        $('.ex'+v).css('font-size',hsize+'px','line-height',lineheight+'px');
                localStorage[v] = JSON.stringify($('.ex'+v).css());

    });
*/
    $(header).css('font-size',hsize+'px');
    $(header).css('line-height',lineheight+'px');
    $(subheading).css('font-size',shsize+'px'); 
    $(subheading).css('line-height',lineheight+'px'); 
    $(paragraph).css('font-size',psize+'px'); 
    $(paragraph).css('line-height',lineheight+'px'); 


    fontcss(header, subheading, paragraph);	
};

export { inlineToggle, rotateToggle, goldenRatio, fontcss };