function loadMS() {
    clearInterval(cdown);
    mymsord(0);
    mymsword();
    msagmxc();
}

function mymsord(x) {
    $.get("/msweeper/x10_order", function(data, status) {
        $("#myod").html(data);
        if (x == 1) {
            $("#mywod").empty();
        }
    });
}

function mymsword() {
    $.get("/msweeper/worder", function(data, status) {
        $("#mywod").html(data);
    });
}

function newmsod(x) {
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
    var gameId = gamexid();
    $.ajax({
        url: 'msweeper/neworder',
        type: 'post',
        data: {
            'neworder': 1,
            'amount': amount,
            'sel': x,
            'gameId': gameId,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                mymsword();
                clsbfrm();
                msagmxc();
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

function msagmxc() {
    $.get("/msweeper/msgmxc", function(res, status) {
        const data = JSON.parse(res);
        var xod = data.xod
        if (xod == 1) {
            gameId = data.gameId;
            msType = data.msType;
            msOT = data.msOT;
            odPoint = data.odPoint;
            winx = data.winx;
            pass = data.pass;
            winxa = data.winxa;
            $("#mscore").html(winxa);
            mscd(msOT, gameId);
            upnmsw(pass, winx, msType);

        }

    });
}

function mscd(t, p) {
    msstart(p);
    cx = new Date(t).getTime();
    cdown = setInterval(function() {
        var nd = CurTime();
        var now = nd.getTime();
        var msc = cx - now;
        var m = Math.floor((msc % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((msc % (1000 * 60)) / 1000);
        var rm = m * 60 + s;
        if (rm < 10) {
            rm = "0" + rm
        }
        $("#smcd").html(rm + "s");
        if (msc < 0) {
            stop_ms(p);
        }
    }, 1000);

}

function msstart(gameId) {
    $.ajax({
        url: "/msweeper/new_start",
        'async': false,
        type: "POST",
        data: {
            gameId: gameId
        },
        cache: false,
        success: function(res) {
            if (res != "false") {
                $("#msfb").html(res);
            } else {
                $("#msfb").html(msbrld);
                $("#mscore").html('0.00');
                $("#msupn").html('<div class="tf-18">To get a bonus, check the boxes where you think there are no mines!</div>');
            }
        }
    });
}

function msmine(x) {

    $.ajax({
        url: "/msweeper/start_mine",
        'async': false,
        type: "POST",
        data: {
            gameId: gameId,
            x: x,
        },
        cache: false,
        success: function(res) {

            if (res == "true") {
                msobr(x, upna);
                upnmsw(nx, winx, msType);
            } else if (res == "Success") {
                clearInterval(cdown);
                $("#smcd").html("0s");
                $("#ab" + x).html('<div class="ms-boxop"><span>+' + upna + '</span></div>');
                $("#mscore").html(winx);
                mymsord(1);
                mymsword();
                msSuccess(gameId);
            } else {
                clearInterval(cdown);
                msmbomb();
                $("#smcd").html("0s");
                $("#ab" + x).html('<div class="ms-boxb"></div>');
                mymsord(1);
                mymsword();
                msbomb(gameId);
            }
            $("#msfb").removeClass("clickOff");

        },
        beforeSend: function() {
            $("#msfb").addClass("clickOff");
            msmdig();
            $("#ab" + x).html('<div class="ms-embox dig"></div>');
        }
    });

}

function msobr(x, a) {
    $("#ab" + x).html('<div class="ms-boxop"><span>+' + a + '</span></div>');
    var wx = $("#mscore").html();
    wx = Math.round(wx * 100) / 100;
    a = Math.round(a * 100) / 100;
    wx = wx + a;
    wx = wx.toFixed(2);
    $("#mscore").html(wx);
}

var upna = 0;
var nx = 0;

function upnmsw(pass, winx, msType) {

    pass = parseInt(pass);
    nx = pass + 1;

    if (msType == "3x3") {
        if (nx == 1) {
            upna = 10 / 100 * winx;
        } else if (nx == 2) {
            upna = 3 / 100 * winx;
        } else if (nx == 3) {
            upna = 4 / 100 * winx;
        } else if (nx == 4) {
            upna = 8 / 100 * winx;
        } else if (nx == 5) {
            upna = 12 / 100 * winx;
        } else if (nx == 6) {
            upna = 15 / 100 * winx;
        } else if (nx == 7) {
            upna = 20 / 100 * winx;
        } else if (nx == 8) {
            upna = 28 / 100 * winx;
        }

        upna = upna.toFixed(2);

    }

    var upnms = '<div class="xtc"><div class="ms_sc_div"><span class="mr-1"><img src="/includes/icons/coin_rs.svg"></span> Next</div><div class="ms_sc_div pt-2 tf-20 tfw-6" id="nextmsb">+' + upna + '</div></div><div class="xtc"><div class="btn-con ms_stop" id="ms_st" onclick="stop_ms(' + "'" + gameId + "'" + ')">STOP & GET BONUS</div></div>'
    $("#msupn").html(upnms)

}

function stop_ms(gameId) {
    $.ajax({
        url: "/msweeper/stop_mine",
        'async': false,
        type: "POST",
        data: {
            gameId: gameId
        },
        cache: false,
        success: function(res) {
            if (res == "true") {
                nx = parseInt(nx);
                nx = nx - 1;
                var winAmt = $("#mscore").text();
                msrefb('WIN', winAmt, odPoint, nx, gameId);
                mymsord(1);
                mymsword();
            }
        },
        beforeSend: function() {
            clearInterval(cdown);
            $("#smcd").html("0s");
            $('#ms_st').html(lodsm);
        }
    });

}

function msbomb(gameId) {
    nx = parseInt(nx);
    nx = nx - 1;
    msrefb('LOSS', '0', odPoint, nx, gameId);
}

function msSuccess(gameId) {
    var winAmt = $("#mscore").text();
    msrefb('WIN', winAmt, odPoint, nx, gameId);
}

function msrefb(x, a, p, n, y) {
    if (x == "WIN") {
        $.ajax({
            url: "/msweeper/winres",
            type: "post",
            data: {
                "a": a,
                "y": y,
            },
            success: function(response) {}
        });
    }
    $('#suc-fail').html('<div class="col-12 conod" onclick="clink()" id="clink"><div class="row podfs fadein" id="smgid"><div class="col-12 xtc pa-0" style="margin-top: -85px;"><img src="/includes/images/' + x + '.svg"><div class="tfw-6">₹<span class="tf-24" id="smwma">' + a + '<span></div></div><div class="col-12 xtc"><div class="row" id="msosb" style="width: 256px;"></div></div><div class="col-8 xtl pt-3 pb-3">Order Point: ₹<span>' + p + '</span></div><div class="col-4 xtr pt-3 pb-3">Pass: <span>' + n + '</span></div></div></div>');
    for (i = 1; i <= 16; i++) {
        $("#msb" + i).attr("onclick", "").unbind("click");
    }
    var msboxc = document.getElementById('msfb');
    var wlmsb = document.getElementById('msosb');
    wlmsb.innerHTML = msboxc.innerHTML;
    $("#msfb").html(msbrld);
    $("#mscore").html('0.00');
    $("#msupn").html('<div class="tf-18">To get a bonus, check the boxes where you think there are no mines!</div>');
}


function jnms() {
    fShow('');
}

function gamexid() {

    var date = new Date();
    var cdate = date.getYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
    var ctime = date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
    var fullDT = cdate + "" + ctime;
    var uid = $.cookie("uid");
    var gameId = 'GMX' + uid + fullDT;
    return gameId;
}

function msodx20() {
    $.cookie("pUrl", "#/TabIndex?index=MineSweeper", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type07");
    loading();
    odlist();
}


function msmof() {
    var x = $("#jxv").hasClass("off");
    if (x == true) {
        $('#jxv').addClass('on').removeClass('off');
    } else {
        $('#jxv').addClass('off').removeClass('on');
    }
}

function msmbomb() {
    var m = $("#jxv").hasClass("on");
    if (m == true) {
        var x = document.getElementById("mmbomb");
        x.play();
    }

}

function msmdig() {
    var m = $("#jxv").hasClass("on");
    if (m == true) {
        var x = document.getElementById("mmdig");
        x.play();
    }

}