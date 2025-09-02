var jvm;

function loadJX() {
    var image = document.getElementById("jximg");
    image.style.top = "90px";
    image.style.display = "block";
    var x = document.getElementById("jxpj");
    var c = x.offsetWidth;
    x = (c / 2) - 56;
    image.style.top = "90px";
    image.style.left = x + "px";
    $("#jxbgh").css('display', 'block');
    $("#jxbgh").css('width', (c + 120) + 'px');
    $("#jxbgh").css('top', '0');
    $("#jxbgh").css('left', '0');
    $('#wncx').remove();
}

function startanimation() {

    takeoff();
    var jxpj = document.getElementById("jxpj");
    var targetX = jxpj.offsetWidth;
    var image = document.getElementById("jximg");


    var i = 0;
    var canvas = document.getElementById('xyaop');
    var ctx = canvas.getContext('2d');
    canvas.width = targetX;
    canvas.height = 282;

    targetX = targetX - 112;
    var targetY = 10;


    var duration = 1000;

    var startX = 0;
    var startY = 156;
    var lnsp = 200;

    var startBX = 0;
    var StartBY = 0;

    var distanceX = (targetX - startX) / (duration / 5);
    var distanceY = (startY - targetY) / (duration / 5);

    var disBX = -1;
    var disBY = 1;

    $("#jximg").attr('src', '/jetx/res/jxr.gif');
    image.style.display = "block";



    jvm = setInterval(function() {
        i++;

        duration = duration - 5;

        var newX = distanceX * i;
        var newY = startY - (distanceY * i);
        var newLP = lnsp - (distanceY * i);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(-40, lnsp);
        ctx.quadraticCurveTo(newX, lnsp, newX + 50, newLP + 20);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffa726';
        ctx.stroke();



        image.style.left = newX + "px";
        image.style.top = newY + "px";
        $("#jxbgh").css('top', (disBY * i) + 'px');
        $("#jxbgh").css('left', (disBX * i) + 'px');



        if (i >= 50) {
            x = i - 50;
            var newD = 360 - (0.36 * x);
            image.style.transform = "rotate(" + newD + "deg)";
        }


        if (duration <= 0) {
            clearInterval(jvm);
            moveanimation(targetX, distanceX);
            ifbmani();
        }
    }, 5);
}

function moveanimation(x, y) {
    const sa = Math.floor(Math.random() * el.length);
    const e = el[sa];
    movela(x, y, e);

}

function movela(x, y, e) {
    var s = 2000;
    var i = 0;
    var cr = new Date().getTime();
    const sep = Math.floor(Math.random() * ep.length);
    const v = ep[sep];
    $("#jxpj").append('<img class="selmo x' + v + '" id="' + cr + '" src="/jetx/res/x' + e + '.svg">');
    ania = setInterval(function() {
        s = s - 10;
        var m = (x + 120) - ((y + 1) * i);
        $("#" + cr).css('left', m + 'px');
        if (i == 100) {
            const sb = Math.floor(Math.random() * el.length);
            const o = el[sb];
            movelb(x, y, o);
        }
        if (s <= 0) {
            clearInterval(ania);
            $("#" + cr).remove();
            moveanimation(x, y);
        } else {
            i++;
        }
    }, 10);

}

function movelb(x, y, o) {
    var s = 2000;
    var i = 0;
    var d = 0;
    var cr = new Date().getTime();
    $("#jxpj").append('<img class="selmo x0" id="' + cr + '" src="/jetx/res/x' + o + '.svg">');
    anib = setInterval(function() {
        s = s - 10;
        var m = (x + 120) - ((y + 1) * i);
        d = d + 0.5;
        $("#" + cr).css('left', m + 'px');
        $("#" + cr).css('top', d + 'px');
        if (s <= 0) {
            $("#" + cr).remove();
            clearInterval(anib);
        } else {
            i++;
        }
    }, 10);

}

function ifbmani() {

}

function stopanimation() {
    clearInterval(jvm);
    boom();
    var image = document.getElementById("jximg");
    image.src = "/jetx/res/boom.gif";
    setTimeout(function() {
        clearInterval(ania);
        clearInterval(anib);
        $('.selmo').remove();
        image.style.display = "none";
        var canvas = document.getElementById('xyaop');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resetanimation();
    }, 200);


}

function resetanimation() {
    var image = document.getElementById("jximg");
    image.style.transform = "rotate(360deg)";
    image.src = "/jetx/res/jxs.gif";
    setTimeout(function() {
        loadJX();
    }, 1000);

}

function jxsof() {
    var x = $("#jxv").hasClass("voloff");
    if (x == true) {
        $('#jxv').addClass('volon').removeClass('voloff');
    } else {
        $('#jxv').addClass('voloff').removeClass('volon');
    }
}

function takeoff() {
    var image = document.getElementById("jximg");
    image.style.display = "none";
    var m = $("#jxv").hasClass("volon");
    if (m == true) {
        var x = document.getElementById("jtoa");
        x.play();
    }

}

function boom() {
    var m = $("#jxv").hasClass("volon");
    if (m == true) {
        var x = document.getElementById("jcra");
        x.play();
    }

}

function mnjk() {
    var en = 8;
    var sn = 1.00;
    var vn = 100;
    var xi = 2;
    $('#jxpj').append('<div id="wncx">1.00x</div>');
    startanimation();
    var bns = setInterval(function() {

        sn = sn + ((vn * xi) / (vn * 100));
        x = parseFloat(sn).toFixed(2);
        if (x <= en) {
            $('#wncx').html(x + 'x');
        }

        if (sn >= 2 && sn < 3) {
            xi = 3;
        } else if (sn >= 3 && sn < 4) {
            xi = 4;
        } else if (sn >= 4 && sn < 6) {
            xi = 6;
        } else if (sn >= 6 && sn < 8) {
            xi = 8;
        } else if (sn >= 8 && sn < 10) {
            xi = 10;
        } else if (sn >= 10 && sn < 20) {
            xi = 100;
        } else if (sn >= 20 && sn < 50) {
            xi = 200;
        } else if (sn >= 50 && sn < 100) {
            xi = 300;
        } else if (sn >= 100 && sn < 300) {
            xi = 400;
        } else if (sn >= 300) {
            xi = 500;
        }

        if (sn >= en) {
            stopanimation();
            clearInterval(bns);
        }

    }, vn);

}

//Get the current period details on gameload and also check timeSetting
function gnxMV() {

}

const el = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
const ep = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "130", "150"];
var ania, anib;