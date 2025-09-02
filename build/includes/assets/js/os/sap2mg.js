var sodata;

function loadS() {
    var element = document.getElementById("evod");
    element.id = "seod";
    clearInterval(cdown);
    scd();
    gsarrd();
    setTimeout(function() {
        mysord(0);
        mysword();
    }, 1000);
}

function reloadS() {
    gsarrd();
    mysord(0);
    mysword();
}

function scd() {
    var data = GETPNOT('120', '3');
    Period = data.Period;
    if (Period == 721) {
        scd();
        return false;
    }
    fullPeriod = data.fullPeriod;
    $('#cpd').text(fullPeriod);
    OpenT = data.OpenT;
    cx = new Date(OpenT).getTime();
    cdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var spc = cx - now;
        var minutes = Math.floor((spc % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((spc % (1000 * 60)) / 1000);
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
        if (spc < 0) {
            clearInterval(cdown);
            $("#fs0").text('0');
            $("#fs1").text('0');
            joinEnab();
            gsrcd(fullPeriod, 1);
            scd();
        }
    }, 1000);
}

function gsarrd() {
    if (typeof $.cookie('rowid') === 'undefined') {
        $.cookie("rowid", 19, {
            path: "/"
        });
        var rxid = 19;
    } else {
        var rxid = $.cookie("rowid");
    }
    $.ajax({
        url: "/sapre/x10_record",
        type: "POST",
        data: {
            rowid: rxid
        },
        cache: false,
        success: function(result) {
            $("#rx10").html(result);
            upnexts();
        }
    });
}

function gsrcd(xPeriod, x) {
    $.ajax({
        url: "/sapre/upnext",
        type: "POST",
        data: {
            period: xPeriod
        },
        cache: false,
        success: function(result) {
            if (result == 'false') {
                setTimeout(function() {
                    if (x <= 3) {
                        gsrcd(xPeriod, x);
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
                upnexts();
                if (sod == xPeriod) {
                    wnxsbanner(xNumber, xPrice);
                } else {
                    sod === "";
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
                    gsarrd();
                }

            }
        }
    });
}

function upnexts() {
    var xpd = GETPNOT('120', '3');
    xperido = xpd.fullPeriod;
    xperido = xperido.substr(xperido.length - 3);
    $("#rx10").append('<div class="rcd-pillar mb-2" id="upcp"><div class="per-rcd dn upn"><b>?</b></div><div class="rcd-per">' + xperido + '</div></div>');
}

function wnxsbanner(xNumber, xPrice) {
    xSelect = sodata.xSelect;
    xAmount = sodata.xAmount;
    xPeriod = sodata.xPeriod;
    $.ajax({
        url: "/sapre/od_result",
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

function mysord(x) {
    $.get("/sapre/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function mysword() {
    $.get("/sapre/worder", function(data, status) {
        $("#mywod").html(data);
    });
}

function newsod() {
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
        url: 'sapre/neworder',
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
                LvSBonus();
                clsbfrm();
                ssmg('gn', amount + ' Successfully');
                setTimeout(function() {
                    clink();
                }, 1000);
                sod = fullPeriod;
                sodata = new Object();
                sodata.xSelect = sel;
                sodata.xAmount = amount;
                sodata.xPeriod = fullPeriod;
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

function LvSBonus() {
    mysword();
    $.ajax({
        url: 'sapre/level_bonus',
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


function srx20() {
    loading();
    $('#lfprd').append(mxgrdf);
    $('#mxGRT').text('Sapre');
    $('.main').addClass('scrollOff');
    $('#dtaod').load('/sapre/xm_records');
}

function srule() {
    $(".main").addClass("scrollOff");
    $("#xrule").addClass("bbg");
    $('#xrule').append(sprl);
}

function sevod() {
    $('#ev').show();
    $('#order').hide();
    $('#vmyod').removeClass('active');
    $('#vevod').addClass('active');
}

function sodx() {
    $('#ev').hide();
    $('#order').show();
    $('#vmyod').addClass('active');
    $('#vevod').removeClass('active');
    $("#evod").empty();
}

function sodx20() {
    $.cookie("pUrl", "#/TabIndex?index=Sapre", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type03");
    loading();
    odlist();
}