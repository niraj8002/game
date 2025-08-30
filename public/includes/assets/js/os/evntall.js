var evnData;
var evID;

function openQST(x, y, z) {
    if (y == "wcm4") {
        crwdTx();
    }
    res = $("#" + z).hasClass("0");
    if (res == true) {
        $("#" + z).css('transform', 'rotateZ(180deg)');
        $("#" + y).css('height', x + 'px');
        $("#" + z).removeClass('0');
    } else {
        $("#" + z).css('transform', 'rotateZ(0deg)');
        $("#" + y).css('height', '48px');
        $("#" + z).addClass('0');
    }
}

function reloadEVN() {
    myevnord(0);
    myevnword();
}

function loadEVN() {
    $.ajax({
        url: "/event/getInfo",
        type: "POST",
        data: {},
        cache: false,
        success: function(result) {
            const einfo = JSON.parse(result);
            var evnC = einfo.evnC;
            if (evnC == 1) {
                evID = einfo.evID;
                var evNM = einfo.evNM;
                var evDT = einfo.evDT;
                var evTI = einfo.evTI;
                var evTA = einfo.evTA;
                var evAI = einfo.evAI;
                var evTB = einfo.evTB;
                var evBI = einfo.evBI;
                $("#gmxId").html(evID);
                $("#tmxAIc").html('<img src="' + evAI + '">');
                $("#tmxANm").html(evTA);
                $("#tmxBIc").html('<img src="' + evBI + '">');
                $("#tmxBNm").html(evTB);
                enCD(evDT, evTI);
                GetPList(evTA, evTB, evNM);
            } else {
                $("#evQNS").html('<div class="gmqst xtc">Waiting for upcomimg event(s).</div>');
            }
        }
    });
    myevnord(0);
    myevnword();
}

function enCD(d, i) {
    OpenT = d + ',' + i;
    cx = new Date(OpenT).getTime();
    cdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var evc = cx - now;
        var hours = Math.floor((evc % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours < 10) {
            hours = '0' + hours
        }
        var minutes = Math.floor((evc % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        var seconds = Math.floor((evc % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        $("#gech").text(hours);
        $("#gecm").text(minutes);
        $("#gecs").text(seconds);
        if (evc < 0) {
            clearInterval(cdown);
            $("#gech").text('00');
            $("#gecm").text('00');
            $("#gecs").text('00');
            evQND();
            setTimeout(function() {
                loadEVN();
            }, 12000);
        }
    }, 1000);

}

function evQND() {
    for (i = 0; i < 10; i++) {
        $("#qst" + i).remove();
    }
}

function GetPList(a, b, n) {
    $.ajax({
        url: "/event/PList",
        type: "POST",
        data: {
            'a': a,
            'b': b,
            'n': n,
        },
        cache: false,
        success: function(response) {
            response = JSON.parse(response);
            var html = "";
            if (response.length) {
                $.each(response, function(key, value) {
                    html += '<option value="' + value.Player + '">' + value.Player + ', ' + value.Role + ', ' + value.Team + '</option>';
                });
                var evX = '<option value="">-Select-</option><option value="' + a + '">' + a + '</option><option value="' + b + '">' + b + '</option>';
                var evC = '<option value="">-Select-</option><option value="YES">YES</option><option value="NO">NO</option>';
                GETEVQ(n, html, evX, evC);
            }
        }
    });
}

function GETEVQ(x, o, e, c) {
    $.ajax({
        url: "/event/QInfo",
        type: "POST",
        data: {
            'x': x,
        },
        cache: false,
        success: function(response) {
            response = JSON.parse(response);
            var html = "";
            if (response.length) {
                $.each(response, function(key, value) {

                    html += '<div class="gmqst" id="qst' + value.ID + '">';
                    html += '<div class="qsmh" onclick="return openQST(&quot;136&quot;,&quot;qst' + value.ID + '&quot;,&quot;qsti' + value.ID + '&quot;)">';
                    html += '<div class="qsifd"><span class="qsic ' + value.iconClass + '"></span>' + value.Question + '</div>';
                    html += '<div class="qsmil 0" id="qsti' + value.ID + '"><span class="darw"></span></div>';
                    html += '</div>';
                    html += '<div class="row mt-3">';
                    html += '<div class="col-12 mb-2 dflx">';
                    html += '<select class="exbox" onchange="return evnBAC(&quot;' + value.xPrice + '&quot;,&quot;' + value.QID + '&quot;,&quot;' + value.ID + '&quot;)" id="Q' + value.ID + 'SO">';
                    html += '<option value="">-Select-</option>';
                    html += o;
                    html += '</select>';
                    html += '<input type="tel" class="exbox amt" oninput="return evnBAC(&quot;' + value.xPrice + '&quot;,&quot;' + value.QID + '&quot;,&quot;' + value.ID + '&quot;)" id="Q' + value.ID + 'BA" placeholder="Bet Amt>=50">';
                    html += '</div>';
                    html += '<div class="col-6 pt-2 pl-3">' + value.QID + ', Win(' + value.xPrice + 'x): <span id="Q' + value.ID + 'WP">0</span></div>';
                    html += '<div class="col-6 xtr">';
                    html += '<div class="evBtn" id="Q' + value.ID + 'BN">BET NOW</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                $("#evQNS").html(html);
                $("#Q1SO").html(e);
                $("#Q2SO").html(e);
                $("#Q3SO").html(c);
            }

        }
    });
}


function evnBAC(x, q, i) {
    var a = $('#Q' + i + 'BA').val();
    var s = $('#Q' + i + 'SO').val();
    var xp = x * a;
    $('#Q' + i + 'WP').html('<b><v>₹' + xp + '</v></b>');
    if (a >= 50 && s != '') {
        $('#Q' + i + 'BN').addClass('act');
        $('#Q' + i + 'BN').attr("onclick", "return evnBet('" + q + "','" + i + "','" + s + "','" + a + "')");
    } else {
        $('#Q' + i + 'BN').removeClass('act');
        $('#Q' + i + 'BN').attr('onclick', '');
    }
}

function evnBet(q, i, s, a) {

    a = Math.floor(a);
    if (a < 50) {
        ssmg('bn', 'Check, input amount!');
        return false;
    }
    if (s == "") {
        ssmg('bn', 'Check, your selection!');
        return false;
    }

    $.ajax({
        url: 'event/evnOD',
        type: 'post',
        data: {
            'nOD': 1,
            'q': q,
            's': s,
            'a': a,
            'evID': evID,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                clsbfrm();
                ssmg('gn', a + ' Successfully');
                setTimeout(function() {
                    clink();
                }, 1000);
                evnData = new Object();
                evnData.xQID = q;
                evnData.xSel = s;
                evnData.xAmt = a;
                evnData.xGId = evID;
                clsEvof(i);
                evNR();


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

function clsEvof(i) {
    $('#Q' + i + 'BN').removeClass('act');
    $('#Q' + i + 'BN').attr('onclick', '');
    $('#Q' + i + 'BA').val('');
    $('#Q' + i + 'SO').val('');
}

function evNR() {
    var q = evnData.xQID;
    var s = evnData.xSel;
    var a = evnData.xAmt;
    var g = evnData.xGId;
    var c = "";
    c += '<div class="row plr-10">';
    c += '<div class="col-12 lih-32 pt-2 pb-2 dflx">';
    c += '<div class="wd-36 xtl">' + g + '</div>';
    c += '<div class="wd-26">' + q + '</div>';
    c += '<div class="wd-150">' + s + '</div>';
    c += '<div class="wd-80 xtr"><v>₹' + a + '</div></v>';
    c += '</div>';
    c += '</div>';
    $("#mywod").prepend(c);
}

function myevnord(x) {
    $.get("/event/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function myevnword() {
    $.get("/event/worder", function(data, status) {
        $("#mywod").html(data);
    });
}

function eevod() {
    $('#ev').show();
    $('#order').hide();
    $('#vmyod').removeClass('active');
    $('#vevod').addClass('active');
}

function eodx() {
    $('#ev').hide();
    $('#order').show();
    $('#vmyod').addClass('active');
    $('#vevod').removeClass('active');
    $("#evod").empty();
}

function eodx20() {
    $(".mordm").append(moreRDF);
    backF('exit', 'Event Order(s)');
    $.get("/event/xm_orders", function(data, status) {
        $("#dtaod").html(data);
    });
}