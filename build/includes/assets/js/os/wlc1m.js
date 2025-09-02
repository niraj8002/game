var wcodata;
var wlsn = 0;

function loadWC() {
    var element = document.getElementById("evod");
    element.id = "wceod";
    clsCD();
    wccd();
    gwcarrd();
    setTimeout(function() {
        mywcord(0);
        mywcword();
    }, 1000);
}

function reloadWC() {
    clearTimeout(evd);
    clsCD();
    wccd();
    gwcarrd();
    mywcord(0);
    mywcword();
    clearInterval(spinInterval);
}

function wccd() {
    var data = GETPNOT('30', '4');
    Period = data.Period;
    if (Period == 2881) {
        wccd();
        return false;
    }
    fullPeriod = data.fullPeriod;
    $('#cpd').text(fullPeriod);
    loadEV(fullPeriod);
    $("#wlsmg").html("Place your bets");
    $("#wlbamt").html("₹0");
    OpenT = data.OpenT;
    cx = new Date(OpenT).getTime();
    wccdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var wcc = cx - now;
        var ms = Math.floor((wcc % (1000)) / 100);
        var sec = Math.floor((wcc % (1000 * 60)) / 1000);
        sec = sec - 8;
        if (sec <= 22 && sec >= 0) {

            $("#ms1").text(ms);
            if (sec < 10) {
                $("#fs0").text('0');
                $("#fs1").text(sec);
            } else {
                let num = sec;
                let arr = Array.from(String(num), Number);
                var fs0 = arr[0];
                var fs1 = arr[1];
                $("#fs0").text(fs0);
                $("#fs1").text(fs1);
            }
            if (sec <= 3 && sec >= 0) {
                jnxDis();
                clsbfrm();
                clearTimeout(evd);
                $("#wlsmg").html("Waiting for spin");
            }
            if (sec <= 0) {
                $("#fs0").text('0');
                $("#fs1").text('0');
                $("#ms1").text('0');
                $("#wlsmg").html("Waiting for result");
                spinWheel();
            }
        }
        if (wcc < 0) {
            clsCD();
            wlupr(fullPeriod);
        }
    }, 100);
}

function wlupr(cfrp) {
    $.ajax({
        url: "/wheelocity/rxc",
        type: "POST",
        data: {
            cfrp: cfrp
        },
        cache: false,
        success: function(result) {

            if (result != 0) {

                const data = JSON.parse(result);
                var wd = data.dx;
                var wx = data.wx;
                var xPrice = data.xP;
                wd = parseInt(wd, 10);
                stopWheel(wd, cfrp, wx, xPrice);
            } else {
                setTimeout(function() {
                    wlupr(cfrp);
                }, 1000);
            }

        }
    });
}

function spinWheel() {
    $("#wheel").addClass('spin');
}

function stopWheel(stopDegree, cfrp, wx, xPrice) {
    let i = getRotationDegrees(wheel);
    var x = 15;
    const spinInterval = setInterval(() => {
        if (i === 361) {
            i = 2;
        } else {
            i++;
        }
        wheel.style.transform = `rotate(${i}deg)`;
        if (i === stopDegree) {
            clearInterval(spinInterval);
            gwcarrd();
            if (wcod == cfrp) {
                wnxwcbanner(wx, xPrice);
            } else {
                wcod = '';
            }
            $("#wlsmg").html(wx + " wins");
            wccd();
            jnxEnb();
        }

        if (x < i) {
            x = i * 3;
        }
    }, x);
}

function getRotationDegrees(element) {
    $("#wheel").removeClass('spin');
    const transform = element.style.transform;
    if (transform) {
        const match = transform.match(/rotate\(([-]?\d+)deg\)/);
        if (match) {
            return parseInt(match[1]);
        }
    }
    return 0;
}

function wnxwcbanner(xNumber, xPrice) {
    xSelect = wcodata.xSelect;
    xAmount = wcodata.xAmount;
    xPeriod = wcodata.xPeriod;
    $.ajax({
        url: "/wheelocity/od_result",
        type: "POST",
        data: {
            xNumber: xNumber,
            xPrice: xPrice,
            xSelect: xSelect,
            xAmount: xAmount,
            xPeriod: xPeriod,
        },
        cache: false,
        success: function(result) {
            $("#suc-fail").html(result);
        }
    });

}

function mywcord(x) {
    $.get("/wheelocity/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function mywcword() {
    $.get("/wheelocity/worder", function(data, status) {
        $("#mywod").html(data);
    });
}

function newwcod() {
    amount = $('#tca').text();
    var sdwb = $('#u_bal').text();
    sdwb = parseInt(sdwb);
    if (amount > sdwb) {
        ssmg('bn', 'Low Balance!');
        clsbfrm();
        return false;
    } else if (amount == "" || amount < 10) {
        ssmg('bn', 'Please check contract amount!');
        clsbfrm();
        return false;
    }
    $('#nod').empty();
    $('#nod').append(lodsm);
    $('#nod').addClass('clickOff');
    $.ajax({
        url: 'wheelocity/neworder',
        type: 'post',
        data: {
            'neworder': 1,
            'amount': amount,
            'sel': sel,
            'period': fullPeriod,
        },
        success: function(res) {
            if (res == 'true') {
                wall();
                LvWCBonus();
                clsbfrm();
                ssmg('gn', amount + ' Successfully');
                setTimeout(function() {
                    clink();
                }, 1000);
                wcod = fullPeriod;
                wcodata = new Object();
                wcodata.xSelect = sel;
                wcodata.xAmount = amount;
                wcodata.xPeriod = fullPeriod;
            } else {
                reSC(res);
            }
        }
    });
}

function LvWCBonus() {
    mywcword();
    $.ajax({
        url: 'wheelocity/level_bonus',
        type: 'post',
        data: {
            'Bonus': 1,
            'amount': amount,
            'sel': sel,
            'period': fullPeriod,
        },
        success: function(res) {
            if (res != 'true') {
                reSC(res);
            }
        }
    });
}

function wcrule() {
    $(".main").addClass("scrollOff");
    $("#xrule").addClass("bbg");
    $('#xrule').append(wcrl);
}

function wcrx20() {
    loading();
    $('#lfprd').append(mxgrdf);
    $('#mxGRT').text('Wheelocity');
    $('.main').addClass('scrollOff');
    $('#dtaod').load('/wheelocity/xm_records');
}

function wcevod() {
    $('#ev').show();
    $('#order').hide();
    $('#vmyod').removeClass('active');
    $('#vevod').addClass('active');
}

function wcodx() {
    $('#ev').hide();
    $('#order').show();
    $('#vmyod').addClass('active');
    $('#vevod').removeClass('active');
    $("#evod").empty();
}

function wcodx20() {
    $.cookie("pUrl", "#/TabIndex?index=Wheelocity", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type06");
    loading();
    odlist();
}

function gwcarrd() {
    $.ajax({
        url: '/wheelocity/x20_record',
        success: function(response) {
            $('#rx20').html(response);
        }
    });
}

function jnxDis() {
    $('.wlj').addClass('disabled');
}

function jnxEnb() {
    $('.wlj').removeClass('disabled');
}

function jnwl(x, y) {
    sel = x.charAt(0).toUpperCase() + x.slice(1);
    fShow(x);
    $('#nxsel').append('Join ' + sel + '(' + y + ')');
}