var podata;

function loadP() {
    var element = document.getElementById("evod");
    element.id = "peod";
    clearInterval(cdown);
    clearInterval(refbc);
    pcd();
    gparrd();
    setTimeout(function() {
        mypord(0);
        mypword();
    }, 1000);
}

function reloadP() {
    gparrd();
    mypord(0);
    mypword();
}

function pcd() {
    var data = GETPNOT('180', '3');
    Period = data.Period;
    if (Period == 481) {
        pcd();
        return false;
    }
    fullPeriod = data.fullPeriod;
    $('#cpd').text(fullPeriod);
    OpenT = data.OpenT;
    cx = new Date(OpenT).getTime();
    cdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var pc = cx - now;
        var minutes = Math.floor((pc % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((pc % (1000 * 60)) / 1000);
        if (minutes > 0) {
            $("#fsm").text(minutes);
        } else {
            $("#fsm").text('0');
        }
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
        if (minutes == 0 && seconds < 30) {
            joinDis();
            clsbfrm();
            clearTimeout(evd);
        }
        if (pc < 0) {
            clearInterval(cdown);
            $("#fs0").text('0');
            $("#fs1").text('0');
            joinEnab();
            gprcd(fullPeriod, 1);
            pcd();
        }
    }, 1000);
}

function gparrd() {
    if (typeof $.cookie('rowid') === 'undefined') {
        $.cookie("rowid", 19, {
            path: "/"
        });
        var rxid = 19;
    } else {
        var rxid = $.cookie("rowid");
    }
    $.ajax({
        url: "/parity/x10_record",
        type: "POST",
        data: {
            rowid: rxid
        },
        cache: false,
        success: function(result) {
            $("#rx10").html(result);
            upnextp();
        }
    });
}

function gprcd(xPeriod, x) {
    $.ajax({
        url: "/parity/upnext",
        type: "POST",
        data: {
            period: xPeriod
        },
        cache: false,
        success: function(result) {
            if (result == 'false') {
                setTimeout(function() {
                    if (x <= 3) {
                        gprcd(xPeriod, x);
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
                upnextp();
                if (pod == xPeriod) {
                    wnxpbanner(xNumber, xPrice);
                } else {
                    pod === "";
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
                    gparrd();
                }

            }
        }
    });
}

function upnextp() {
    var xpd = GETPNOT('180', '3');
    xperido = xpd.fullPeriod;
    xperido = xperido.substr(xperido.length - 3);
    $("#rx10").append('<div class="rcd-pillar mb-2" id="upcp"><div class="per-rcd dn upn"><b>?</b></div><div class="rcd-per">' + xperido + '</div></div>');
}

function wnxpbanner(xNumber, xPrice) {
    xSelect = podata.xSelect;
    xAmount = podata.xAmount;
    xPeriod = podata.xPeriod;
    $.ajax({
        url: "/parity/od_result",
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

function mypord(x) {
    $.get("/parity/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function mypword() {
    $.get("/parity/worder", function(data, status) {
        $("#mywod").html(data);
    });
}


function newpod() {
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
        url: 'parity/neworder',
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
                LvPBonus();
                clsbfrm();
                ssmg('gn', amount + ' Successfully');
                setTimeout(function() {
                    clink();
                }, 1000);
                pod = fullPeriod;
                podata = new Object();
                podata.xSelect = sel;
                podata.xAmount = amount;
                podata.xPeriod = fullPeriod;
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

function LvPBonus() {
    mypword();
    $.ajax({
        url: 'parity/level_bonus',
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

function prx20() {
    loading();
    $('#lfprd').append(mxgrdf);
    $('#mxGRT').text('Parity');
    $('.main').addClass('scrollOff');
    $('#dtaod').load('/parity/xm_records');
}

function prule() {
    $(".main").addClass("scrollOff");
    $("#xrule").addClass("bbg");
    $('#xrule').append(prl);
}

function pevod() {
    $('#ev').show();
    $('#order').hide();
    $('#vmyod').removeClass('active');
    $('#vevod').addClass('active');
}

function podx() {
    $('#ev').hide();
    $('#order').show();
    $('#vmyod').addClass('active');
    $('#vevod').removeClass('active');
    $("#evod").empty();
}

function podx20() {
    $.cookie("pUrl", "#/TabIndex?index=Parity", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type02");
    loading();
    odlist();
}