var abodata;

function loadAB() {
    var element = document.getElementById("evod");
    element.id = "abeod";
    clsabcd();
    abcd();
    upcard();
    gabarrd();
    setTimeout(function() {
        myabord(0);
        myabword();
    }, 1000);
}

function reloadAB() {
    clsabcd();
    abcd();
    upcard();
    gabarrd();
    myabord(0);
    myabword();
}

function clsabcd() {
    clearInterval(abcdown);
    clearInterval(cdown);
}

function abcd() {
    var data = GETPNOT('60', '4');
    Period = data.Period;
    if (Period == 1441) {
        abcd();
        return false;
    }
    fullPeriod = data.fullPeriod;
    $('#cpd').text(fullPeriod);
    loadEV(fullPeriod);
    OpenT = data.OpenT;
    cx = new Date(OpenT).getTime();
    abcdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var abc = cx - now;
        var seconds = Math.floor((abc % (1000 * 60)) / 1000);
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
        if (abc < 0) {
            clsabcd();
            $("#fs0").text('0');
            $("#fs1").text('0');
            rxc(fullPeriod);
        }
    }, 1000);
}

function rxc(cfrp) {

    $.ajax({
        url: "/AvB/rxc",
        type: "POST",
        data: {
            cfrp: cfrp
        },
        cache: false,
        success: function(card) {

            if (card != 0) {

                const nx = card.split(" ");
                var alen = nx.length;
                var i = 0;
                ancard(i, nx, alen, cunx);

            } else {
                setTimeout(function() {
                    rxc(cfrp);
                }, 1000);
            }

        }
    });
}

function ancard(i, nx, alen, cunx) {

    setTimeout(function() {

        var res = $("#wicrd").hasClass("abwnxb");
        if (res == true) {
            if (abod == "") {
                ssmg('gn', 'UP Next . . .');
                setTimeout(function() {
                    clink();
                    ABRstB();
                }, 1000);
                return false;
            } else {
                ABRstB();
                return false;
            }

        } else if (i == 8 && alen == 8) {

            if (abod == "") {
                ssmg('gn', 'Tie, UP Next . . .');
                setTimeout(function() {
                    clink();
                    ABRstB();
                }, 1000);
                return false;
            } else {
                ABRstB();
                return false;
            }

        } else {
            $("#upanc").append('<img class="anmcrd" id="wicrd" src="/includes/images/AvB/bcc.png">');
        }


        var vcard = nx[i];
        setTimeout(function() {
            var extc;
            if (vcard == cunx) {
                extc = "zooani abwnxb"
            }
            $("#wicrd").attr("src", "/includes/images/AvB/" + vcard + ".png");
            $("#wicrd").addClass(extc);
        }, 200)


        var m = i % 2;
        if (m == 0) {
            setTimeout(function() {
                $("#wicrd").addClass("andar");
            }, 200)
            setTimeout(function() {

                var res = $("#wicrd").hasClass("abwnxb");
                if (res == true) {
                    $("#wicrd").css("top", "15px");
                } else {
                    $("#wicrd").remove();
                    if (i == 1) {
                        var p = 11;
                    } else if (i == 3) {
                        var p = 7;
                    } else if (i == 5) {
                        var p = 3;
                    } else if (i == 7) {
                        var p = -1;
                    } else if (i == 9) {
                        var p = -5;
                    }
                    $("#candh").append('<img class="cardv wt crdand" src="/includes/images/AvB/' + vcard + '.png" style="margin-top:' + p + 'px">');
                }

            }, 800)

        } else {
            setTimeout(function() {
                $("#wicrd").addClass("bahar");
            }, 200)
            setTimeout(function() {

                var res = $("#wicrd").hasClass("abwnxb");
                if (res == true) {
                    $("#wicrd").css("top", "15px");
                } else {
                    $("#wicrd").remove();
                    if (i == 2) {
                        var p = 11;
                    } else if (i == 4) {
                        var p = 7;
                    } else if (i == 6) {
                        var p = 3;
                    } else if (i == 8) {
                        var p = -1;
                    }
                    $("#cbnh").append('<img class="cardv wt crdbnd" src="/includes/images/AvB/' + vcard + '.png" style="margin-top:' + p + 'px;">');
                }

            }, 800)
        }

        //console.log(nx[i]);
        i++;
        if (i <= alen) {
            ancard(i, nx, alen, cunx);
        }

    }, 1000)
}

function ABRstB() {

    clsABR();
    joinEnab();
    gabrcd(fullPeriod, 1);
    abcd();
    upcard();

}

function clsABR() {
    $("#candh").empty();
    $("#cbnh").empty();
    $("#wicrd").remove();
    $("#candh").append('<img class="cardv wt" id="upand" src="/includes/images/AvB/and_bk.png">');
    $("#cbnh").append('<img class="cardv wt" id="upbnd" src="/includes/images/AvB/bnd_bk.png">');
}

function upcard() {
    var pdx = GETPNOT('60', '4');
    var curp = pdx.Period;
    if (curp == 1441) {
        upcard();
        return false;
    }
    var cfrp = pdx.fullPeriod;

    $("#upsc").empty()
    $("#upsc").append('<img class="cardv" id="upimg" style="margin-top: 144px;">');
    setTimeout(function() {

        $.ajax({
            url: "/AvB/abcd",
            type: "POST",
            data: {
                cfrp: cfrp
            },
            cache: false,
            success: function(card) {

                if (card != 0) {
                    $("#upimg").attr("src", "/includes/images/AvB/" + card + ".png");
                    $("#upimg").css("margin-top", "0");
                    cunx = card;

                } else {
                    setTimeout(function() {
                        upcard();
                    }, 1000);
                }

            }
        });

    }, 1000);

}

//New Codes

function gabarrd() {
    if (typeof $.cookie('rowid') === 'undefined') {
        $.cookie("rowid", 19, {
            path: "/"
        });
        var rxid = 19;
    } else {
        var rxid = $.cookie("rowid");
    }
    $.ajax({
        url: "/AvB/x10_record",
        type: "POST",
        data: {
            rowid: rxid
        },
        cache: false,
        success: function(result) {
            $("#rx10").html(result);
            upnextab();
        }
    });
}

function gabrcd(xPeriod, x) {
    $.ajax({
        url: "/AvB/upnext",
        type: "POST",
        data: {
            period: xPeriod
        },
        cache: false,
        success: function(result) {
            if (result == 'false') {
                setTimeout(function() {
                    if (x <= 3) {
                        gabrcd(xPeriod, x);
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
                upnextab();
                if (abod == xPeriod) {
                    wnxabbanner(xNumber, xPrice);
                } else {
                    abod === "";
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
                    gabarrd();
                }

            }
        }
    });
}

function upnextab() {
    var xpd = GETPNOT('60', '4');
    xperido = xpd.fullPeriod;
    xperido = xperido.substr(xperido.length - 3);
    $("#rx10").append('<div class="rcd-pillar mb-2" id="upcp"><div class="per-rcd dn upn"><b>?</b></div><div class="rcd-per">' + xperido + '</div></div>');
}

function wnxabbanner(xNumber, xPrice) {
    xSelect = abodata.xSelect;
    xAmount = abodata.xAmount;
    xPeriod = abodata.xPeriod;
    $.ajax({
        url: "/AvB/od_result",
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

function myabord(x) {
    $.get("/AvB/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function myabword() {
    $.get("/AvB/worder", function(data, status) {
        $("#mywod").html(data);
    });
}


function newabod() {
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
        url: 'AvB/neworder',
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
                LvABBonus();
                clsbfrm();
                ssmg('gn', amount + ' Successfully');
                setTimeout(function() {
                    clink();
                }, 1000);
                abod = fullPeriod;
                abodata = new Object();
                abodata.xSelect = sel;
                abodata.xAmount = amount;
                abodata.xPeriod = fullPeriod;
            } else {
                reSC(res);
            }
        }
    });
}

function LvABBonus() {
    myabword();
    $.ajax({
        url: 'AvB/level_bonus',
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

function abrule() {
    $(".main").addClass("scrollOff");
    $("#xrule").addClass("bbg");
    $('#xrule').append(abrl);
}

function abrx20() {
    loading();
    $('#lfprd').append(mxgrdf);
    $('#mxGRT').text('Andar Bahar');
    $('.main').addClass('scrollOff');
    $('#dtaod').load('/AvB/xm_records');
}

function abevod() {
    $('#ev').show();
    $('#order').hide();
    $('#vmyod').removeClass('active');
    $('#vevod').addClass('active');
}

function abodx() {
    $('#ev').hide();
    $('#order').show();
    $('#vmyod').addClass('active');
    $('#vevod').removeClass('active');
    $("#evod").empty();
}

function abodx20() {
    $.cookie("pUrl", "#/TabIndex?index=AndarBahar", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type05");
    loading();
    odlist();
}