var tab;
var trcamt;
var refbc;
navi();
loadApp();

function navi() {
    var url = (window.location).href;
    tab = url.substring(url.lastIndexOf('=') + 1);
    if (tab == "0" || tab == "1" || tab == "2" || tab == "3") {
        afnav();
    } else if (tab == "dairy") {
        dairy();
    } else if (tab == "RechargeList") {
        rclist();
    } else if (tab == "withDrawType1") {
        wdmain();
    } else if (tab == "withDrawType2") {
        wdcom();
    } else if (tab == "complaint") {
        Opsup("0");
    } else if (tab == "mylink") {
        ntmls();
        invite();
    } else if (tab == "privilege") {
        ntpvl();
        invite();
    } else if (tab == "IncomeDetail") {
        comr();
        invite();
    } else if (tab == "InviteRecord") {
        invr();
        invite();
    } else if (tab == "DailyIncome") {
        dincr();
        invite();
    } else if (tab == "CheckIn") {
        CheckR();
        chinh();
    } else if (tab == "Rewards") {
        taskR();
        chinh();
    } else if (tab == "Coupons") {
        ccp();
        chinh();
    } else if (tab == "FastParity") {
        fsmain();
    } else if (tab == "Parity") {
        pmain();
    } else if (tab == "Sapre") {
        sapmain();
    } else if (tab == "Dice") {
        dicemain();
    } else if (tab == "AndarBahar") {
        abmain();
    } else if (tab == "Wheelocity") {
        wcmain();
    } else if (tab == "MineSweeper") {
        msmain();
    } else if (tab == "JetX") {
        jxmain();
    } else if (tab == "IPL") {
        iplMx();
    } else {
        var pattern = /OrderList/;
        var exists = pattern.test(tab);
        if (exists) {
            odlist();
        } else {
            var pattern = /recharge/;
            var exists = pattern.test(tab);
            if (exists) {
                rcstart();
            } else {
                var pattern = /rchash/;
                var exists = pattern.test(tab);
                if (exists) {
                    var url = (window.location).href;
                    var rcoid = url.substring(url.lastIndexOf('&') + 1);
                    $.cookie("rchash", rcoid, {
                        path: "/"
                    });
                    payod();
                } else {
                    window.history.pushState("object or string", "Title", "/");
                    tab = "0";
                    afnav();
                }
            }
        }
    }
}

function loadApp() {
    Ranlex();
    OPbook(0);
    wRWU();
    chref(30000);
    setInterval(function() {
        usercheck();
    }, 30000);
}

function afnav() {
    $('#footer').append(bnftind);
}

function dairy() {
    loading();
    hcp();
    $('#warea').append(moreRDF);
    $("#backF").attr('onclick', 'myacc()');
    $("#MoreRCT").text('Transactions');
    setTimeout(function() {
        $.get("/my/dairy", function(data, status) {
            $("#dtaod").html(data);
            clsload();
        });
    }, 200);
}

function fsmain() {
    $('#warea').append(gmxfsfrm);
    setTimeout(function() {
        loadFS();
    }, 200);
}

function pmain() {
    $('#warea').append(gmxocgfrm);
    $('#fxnam').text('Parity');
    $('#fxrcdn').text('Parity');
    $('#fxrule').attr('onclick', 'prule()');
    $('#fxmrcd').attr('onclick', 'prx20()');
    $('#vevod').attr('onclick', 'pevod()');
    $('#vmyod').attr('onclick', 'podx()');
    $('#moreod').attr('onclick', 'podx20()');
    setTimeout(function() {
        loadP();
    }, 200);
}

function sapmain() {
    $('#warea').append(gmxocgfrm);
    $('#fxnam').text('Sapre');
    $('#fxrcdn').text('Sapre');
    $('#fxrule').attr('onclick', 'srule()');
    $('#fxmrcd').attr('onclick', 'srx20()');
    $('#vevod').attr('onclick', 'sevod()');
    $('#vmyod').attr('onclick', 'sodx()');
    $('#moreod').attr('onclick', 'sodx20()');
    setTimeout(function() {
        loadS();
    }, 200);
}

function dicemain() {
    $('#warea').append(dcmfrm);
    setTimeout(function() {
        loadD();
    }, 200);
}

function abmain() {
    $('#warea').append(abgmxmf);
    setTimeout(function() {
        loadAB();
    }, 200);
}

function wcmain() {
    $('#warea').append(wcgmxf);
    setTimeout(function() {
        loadWC();
    }, 200);
}

function msmain() {
    $('#warea').append(msmf);
    setTimeout(function() {
        mstype = "3x3";
        loadMS();
    }, 200);
}

function jxmain() {
    $('#warea').load('jetxm');
    setTimeout(function() {
        wall();
        loadJX();
    }, 200);

}

function iplMx() {
    $('#warea').append(evnF);
    setTimeout(function() {
        wall();
        loadEVN();
    }, 200);
}

function clsCD() {
    clearInterval(wccdown);
    clearInterval(abcdown);
    clearInterval(cdown);
}

function odlist() {
    $('#odrea').empty();
    $('#odrea').append(odPif4);
    hcp();
    setTimeout(function() {
        odnav();
    }, 200);
}

function rcstart() {
    var url = (window.location).href;
    amount = url.substring(url.lastIndexOf('@') + 1);
    hcp();
    $('#warea').append(rcpstm);
    setTimeout(function() {
        $.ajax({
            url: "/modules/wallet/recharge",
            type: "post",
            data: {
                "a": amount,
            },
            success: function(x) {
                $("#dtaod").html(x);
                $("#rmt").text(amount);
                $("#rcmtl").text(amount);
            }
        });
    }, 200);
}

function rclist() {
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=RechargeList");
    setTimeout(function() {
        $('#warea').append(moreRDF);
        loading();
        backF('recharge', 'Recharge Records');
        $.get("/recharge/record", function(data, status) {
            $("#dtaod").html(data);
            clsload();
        });
    }, 200);
}

function wdmain() {

    window.history.pushState("object or string", "Title", "#/TabIndex?index=withDrawType1");
    clswar();
    $('#warea').append(wdmf);
    WdType = "A";

    var result = rcpmns('wdS');
    const data = JSON.parse(result);
    var rcV = data.rcV;
    if (rcV == "on") {
        Lcard();
        setTimeout(function() {
            wall();
        }, 200);
        setTimeout(function() {
            wdinfo();
        }, 1000);
    } else {
        $("#xv08").css('padding', '0');
        $("#xv08").removeClass('mt-3');
        $("#xv08").empty();
        $("#xv09").remove();
        cpum('xv08');
    }

}

function wdcom() {
    window.history.pushState("object or string", "Title", "#/TabIndex?index=withDrawType2");
    clswar();
    $('#warea').append(wdmf);
    WdType = "B";

    var result = rcpmns('wdS');
    const data = JSON.parse(result);
    var rcV = data.rcV;
    if (rcV == "on") {
        Lcard();
        setTimeout(function() {
            $('#u_bal').load('/invite/avcom');
            wdinfo();
        }, 200);
        setTimeout(function() {
            wdinfo();
        }, 1000);
    } else {
        $("#xv08").css('padding', '0');
        $("#xv08").removeClass('mt-3');
        $("#xv08").empty();
        $("#xv09").remove();
        cpum('xv08');
    }


}

function Lcard() {
    hcp();

    $.get("/modules/wallet/upi_card", function(data, status) {
        $("#upcard").html(data);
    });

    $.get("/modules/wallet/paytm_card", function(data, status) {
        $("#pwcard").html(data);
    });

    $.get("/modules/wallet/bank_card", function(data, status) {
        $("#bankcard").html(data);
    });

}

function wdinfo() {
    $("#wdamt").attr("placeholder", wm + " ~ " + wx);
    var sdwb = $('#u_bal').text();
    sdwb = parseInt(sdwb);
    wx = parseInt(wx);
    if (sdwb > wx) {
        sdwb = wx;
    }
    $('#mwa').text('₹' + sdwb);
    $('#mwda').text('₹' + wm);
    var v = wc.split(",");
    var x = v[0];
    var y = v[1];
    var z = v[2];
    $('#wdw').text(y);
    $('#wdx').text(x);
    $('#wdy').text(y);
    $('#wdz').text(z);
}

function loading() {
    $('#dta_ref').append(loader);
}

function clstab() {
    $('#moxht2b4u').removeClass('sel');
    $('#raeiyf2m0').removeClass('sel');
    $('#sfrm6bvy').removeClass('sel');
    $('#mcpnvd2my').removeClass('sel');
    $('#adsob').removeClass('adsob');
    $('#home').removeClass('sel');
    $('#group').removeClass('sel');
    $('#wallet').removeClass('sel');
    $('#my').removeClass('sel');
    $("#cpanel").removeClass("active");
}

function clswar() {
    $('#warea').empty();
}

function clsfoot() {
    $('#footer').empty();
}

function clsload() {
    $('#dta_ref').empty();
    $("#dtl").remove();
}

function exit() {
    $('#lfprd').empty();
    $('#moreRcd').remove();
    $('.main').removeClass('scrollOff');
}

function exitS(x) {
    $('#' + x).remove();
}

function clsxrule() {
    $("#xrule").empty();
    $("#xrule").removeClass("bbg");
    $(".main").removeClass("scrollOff");
}

function wRWU() {
    $.ajax({
        url: '/modules/wallet/wRWU',
        success: function(response) {
            trcamt = response;
        }
    });
}

function wall() {
    if (!!$.cookie('WallBal')) {
        var WallBal = $.cookie("WallBal");
        $('#u_bal').text(WallBal);
        $('#lhsd').removeClass('wals');
    } else {
        $.ajax({
            url: '/modules/wallet/WallBal',
            success: function(response) {
                $('#u_bal').text(response);
                $('#lhsd').removeClass('wals');
            }
        });
    }
}

function wallU() {
    $.ajax({
        url: '/modules/wallet/opdaybook',
        success: function(response) {
            $('#u_bal').text(response);
            $('#lhsd').removeClass('wals');
        }
    });
}

function OPbook(x) {
    $('#lhsd').addClass('wals');
    if (x == 1) {
        wallU();
    } else if (x == 0) {
        //check if user already logged in
        if (!!$.cookie('usrli')) {
            var cnx = $.cookie("usrli");
            if (cnx == 0) {
                //set new cookie
                $.cookie("usrli", "1", {
                    path: "/"
                });
                wallU();
            } else {
                wall();
            }
        } else {
            //set new cookie
            $.cookie("usrli", "1", {
                path: "/"
            });
            wallU();
        }

    }
}

function userInfo() {
    var uid = $.cookie("uid");
    var umob = $.cookie("umob");
    var unam = $.cookie("unam");
    $("#u_id").text(uid);
    $("#u_mob").text(umob);
    $("#u_nam").text(unam);
}

function BonBall() {
    $('#u_com').load('/invite/avcom');
}

function loadInv() {

    var upd = $.cookie("UPD");
    if (upd == "N") {
        var d = '<div class="col-12 conod" id="clink"><div class="ssmg fadein"><div class="xtc"><div class="xtc"><img src="/includes/icons/update.svg"></div><div class="tf-16 pt-1">Updating, please wait...</div><div class="tf-12 pt-1 pb-1">Do not close or refresh this page.</div></div></div></div></div>';
        $('#dta_ref').html(d);

        $.ajax({
            url: '/invite/UPD',
            success: function(x) {

                if (x == "true") {
                    $.cookie("UPD", 'Y', {
                        path: "/"
                    });
                    clink();
                    uinvInfo();

                } else {
                    clink();
                    ssmg('bn', 'Something went wrong!');
                }

            }
        });

    } else {
        uinvInfo();
    }
}

function submitBUR() {
    $.get("/invite/pbur", function(res, status) {
        if (res == "true") {
            $("#brst").css("width", "100%");
            $("#brst").html("Thank you for your response. You will receive an update within 24 hours.")
        }
    });
}

function uinvInfo() {

    BonBall();
    $("#open").load("/invite/invite_info");
    $.get("/invite/insort", function(data, status) {
        $("#insort").html(data);
    });

}

function list() {
    $("#rcamt").attr("placeholder", rm + " ~ " + rx);
    var items1 = Array(rm, 500, 550, 600, 650, 700, 800, 900, 1000);
    var items2 = Array(1200, 1500, 2000, 2400, 2500, 2800, 3000);
    var items3 = Array(4000, 4500, 5600, 6000, 7200, 8000, 9500, 1000);
    var items4 = Array(11000, 12000, 13000, 15000, 18000, 20000);
    var items5 = Array(24000, 25000, 28000, 30000, 36000);
    var items6 = Array(40000, 42000, 45000, 48000, rx);
    $('#alst').empty();
    for (i = 1; i <= 6; i++) {

        if (i == 1) {
            var x = items1[Math.floor(Math.random() * items1.length)];
        } else if (i == 2) {
            var x = items2[Math.floor(Math.random() * items2.length)];
        } else if (i == 3) {
            var x = items3[Math.floor(Math.random() * items3.length)];
        } else if (i == 4) {
            var x = items4[Math.floor(Math.random() * items4.length)];
        } else if (i == 5) {
            var x = items5[Math.floor(Math.random() * items5.length)];
        } else if (i == 6) {
            var x = items6[Math.floor(Math.random() * items6.length)];
        }

        $('#alst').append('<div class="col-4 pda5"><div class="add-amt" id="' + i + '">₹' + x + '</div></div><div id="srca"><script>$("#' + i + '").click(function(){$(".rcamt").val("' + x + '");});$("#srca").remove();</script></div>');
    }
    if (rcb > 0) {
        $('#rcblt').append('<div class="col-12 xtl mb-4 tf-20 pl-0 dipn" id="rcbsh"><input class="hw-20" type="radio" id="bonc"><span class="pl-2 tf-16" id="bonps">5% Bonus</span></div>');
        var v = rcbc.split(",");
        var rcmb = v[0];
        var rcbx = v[1];
        $("#bonps").text(rcb + "% bonus on recharge >= " + rcmb + ", max:" + rcbx);
        $("#rcbsh").removeClass("dipn");
        $("#rcbsh").addClass("ddavc");
        $("#bonc").prop("checked", true);
    }
}

function hcp() {
    $("#cpanel").hide();
}

function scp() {
    $("#cpanel").show();
}

function main() {
    clsfoot();
    afnav();
    home();
    scp();
}

function myacc() {
    clsfoot();
    afnav();
    my();
    scp();
}

function invite() {
    afnav();
    clstab();
    $('#raeiyf2m0').addClass('sel');
    $('#warea').append(minrid);
    setTimeout(function() {
        loadInv();
    }, 200);
}

function recharge() {
    clsfoot();
    afnav();
    wallet();
    scp();
    rcpen();
}

function tabid0() {
    afnav();
    clstab();
    $('#moxht2b4u').addClass('sel');
    $('#warea').append(mphs);
    setTimeout(function() {
        wall();
        userInfo();
    }, 200);
}

function chinh() {
    afnav();
    $('#moxht2b4u').addClass('sel');
    $('#home').addClass('sel');
    $('#warea').append(mphs);
    setTimeout(function() {
        wall();
        userInfo();
    }, 200);
}

function rcpen() {
    $.get("/modules/wallet/rcpen", function(data, status) {
        $("#dta_ref").html(data);
    });
}

function chref(x) {
    refbc = setTimeout(function() {
        $.get("/invite/refer_bonus", function(data, status) {
            $("#opffp").html(data);
        });
    }, x);
}

function usercheck() {
    $.ajax({
        url: "/my/check",
        type: "post",
        data: {
            "check": 1,
        },
        success: function(x) {
            reSC(x);
        }
    });
}

function reSC(x) {
    if (x === 'sO') {
        ssmg('bn', 'Session out!');
        window.location.href = ("/signout");
    } else if (x != '') {
        clsbfrm();
        ssmg('bn', x);
    }
}
var WdType;
var cdown;
var abcdown;
var wccdown;
var evd;
var amount;
var paymode;
var mylink;
var sel = "";
var fpod = "";
var pod = "";
var sod = "";
var dod = "";
var abod = "";
var wcod = "";
var jbm;
var cunx;
var mstype;