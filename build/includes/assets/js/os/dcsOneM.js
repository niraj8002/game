var dodata;

function loadD() {
    var element = document.getElementById("evod");
    element.id = "deod";
    clearInterval(cdown);
    dcd();
    gdarrd();
    setTimeout(function() {
        mydord(0);
        mydword();
    }, 1000);
}

function reloadD() {
    gdarrd();
    mydord(0);
    mydword();
}

function dcd() {
    var data = GETPNOT('60', '4');
    Period = data.Period;
    if (Period == 1441) {
        dcd();
        return false;
    }
    fullPeriod = data.fullPeriod;
    $('#cpd').text(fullPeriod);
    loadEV(fullPeriod);
    OpenT = data.OpenT;
    cx = new Date(OpenT).getTime();
    cdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var dc = cx - now;
        var seconds = Math.floor((dc % (1000 * 60)) / 1000);
        if (seconds < 10) {
            $("#fs0").text('0');
            $("#fs1").text(seconds);
        } else {
            let num = seconds;
            let arr = Array.from(String(num), Number);
            var fs0 = arr[0];
            var fs1 = arr[1];
            $("#fs0").text(fs0);
            $("#fs1").text(fs1);
        }
        if (seconds <= 10) {
            joinDis();
            clsbfrm();
            clearTimeout(evd);
        }
        if (dc < 0) {
            clearInterval(cdown);
            $("#fs0").text('0');
            $("#fs1").text('0');
            joinEnab();
            gdrcd(fullPeriod, 1);
            dcd();
        }
    }, 1000);
}

function gdarrd() {
    if (typeof $.cookie('rowid') === 'undefined') {
        $.cookie("rowid", 19, {
            path: "/"
        });
        var rxid = 19;
    } else {
        var rxid = $.cookie("rowid");
    }
    $.ajax({
        url: "/dice/x10_record",
        type: "POST",
        data: {
            rowid: rxid
        },
        cache: false,
        success: function(result) {
            $("#rx10").html(result);
            upnextd();
        }
    });
}

function gdrcd(xPeriod, x) {
    $.ajax({
        url: "/dice/upnext",
        type: "POST",
        data: {
            period: xPeriod
        },
        cache: false,
        success: function(result) {
            if (result == 'false') {
                setTimeout(function() {
                    if (x <= 3) {
                        gdrcd(xPeriod, x);
                        x = x + 1;
                    } else {
                        location.reload();
                    }
                }, 2000);
            } else {
                const data = JSON.parse(result);
                xNumber = data.xNumber
                xColor = data.xColor
                xViolet = data.xViolet
                xPrice = data.xPrice
                xSP = xPeriod.substr(xPeriod.length - 3);
                $("#upcp").remove();
                $("#rx10").append('<div class="rcd-pillar mb-2"><div class="' + xColor + '"><div class="' + xViolet + '"></div><div class="tpr">' + xNumber + '</div></div><div class="rcd-per">' + xSP + '</div></div>');
                upnextd();
                if (dod == xPeriod) {
                    wnxdbanner(xNumber, xPrice);
                } else {
                    dod === "";
                }

                var rxid = $.cookie("rowid");
                rxid = parseInt(rxid);
                rxid = rxid + 1;
                if (rxid <= 29) {
                    $.cookie("rowid", rxid, {
                        path: "/"
                    });
                } else {
                    $.cookie("rowid", 19, {
                        path: "/"
                    });
                    gdarrd();
                }

            }
        }
    });
}

function upnextd() {
    var xpd = GETPNOT('60', '4');
    xperido = xpd.fullPeriod;
    xperido = xperido.substr(xperido.length - 3);
    $("#rx10").append('<div class="rcd-pillar mb-2" id="upcp"><div class="per-rcd dn upn"><b>?</b></div><div class="rcd-per">' + xperido + '</div></div>');
}

function wnxdbanner(xNumber, xPrice) {
    xSelect = dodata.xSelect;
    xAmount = dodata.xAmount;
    xPeriod = dodata.xPeriod;
    $.ajax({
        url: "/dice/od_result",
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

function mydord(x) {
    $.get("/dice/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function mydword() {
    $.get("/dice/worder", function(data, status) {
        $("#mywod").html(data);
    });
}

function newdod() {
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
        url: 'dice/neworder',
        type: 'post',
        data: {
            'neworder': 1,
            'amount': amount,
            'sel': sel,
            'period': fullPeriod,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                LvDBonus();
                clsbfrm();
                ssmg('gn', amount + ' Successfully');
                setTimeout(function() {
                    clink();
                }, 1000);
                dod = fullPeriod;
                dodata = new Object();
                dodata.xSelect = sel;
                dodata.xAmount = amount;
                dodata.xPeriod = fullPeriod;
            } else {
                clsbfrm();
                if (response == "session timeout!") {
                    ssmg('bn', 'Session timeout! Signing out . . .');
                    setTimeout(function() {
                        sot();
                    }, 1500);
                } else {
                    ssmg('bn', response);
                }
            }
        }
    });
}

function LvDBonus() {
    mydword();
    $.ajax({
        url: 'dice/level_bonus',
        type: 'post',
        data: {
            'Bonus': 1,
            'amount': amount,
            'sel': sel,
            'period': fullPeriod,
        },
        success: function(response) {
            if (response == 'true') {} else {
                ssmg('bn', response);
            }
        }
    });
}

function drx20() {
    loading();
    $('#lfprd').append(mxgrdf);
    $('#mxGRT').text('Dice');
    $('.main').addClass('scrollOff');
    $('#dtaod').load('/dice/xm_records');
}

function drule() {
    $(".main").addClass("scrollOff");
    $("#xrule").addClass("bbg");
    $('#xrule').append(dcrl);
}

function devod() {
    $('#ev').show();
    $('#order').hide();
    $('#vmyod').removeClass('active');
    $('#vevod').addClass('active');
}

function dodx() {
    $('#ev').hide();
    $('#order').show();
    $('#vmyod').addClass('active');
    $('#vevod').removeClass('active');
    $("#evod").empty();
}

function dodx20() {
    $.cookie("pUrl", "#/TabIndex?index=Dice", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type04");
    loading();
    odlist();
}