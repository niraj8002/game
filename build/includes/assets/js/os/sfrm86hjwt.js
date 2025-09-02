var hash;
var timer;

function rchl() {
    setTimeout(function() {
        $('#odrea').empty();
        $('#odrea').append(rcinst);
        hcp();
        payinst();
    }, 200);
}

function clsrcinst() {
    $('#odrea').empty();
    $("#cpanel").show();
}

function ppinst() {
    $("#odt2").removeClass('sel');
    $("#odt3").removeClass('sel');
    $("#odt1").addClass('sel');
    $('#dtaod').empty();
    $('#dtaod').append('<div class="mb-2 xtl tf-18 tfcdb">Recharge using PhonePe</div><video controls autoplay width="100%"><source src="/recharge/instruction/phonepe.mp4" type="video/mp4"><source src="/recharge/instruction/phonepe.mp4" type="video/ogg">Your browser does not support HTML video.</video>');
}

function payinst() {
    $("#odt1").removeClass('sel');
    $("#odt3").removeClass('sel');
    $("#odt2").addClass('sel');
    $('#dtaod').empty();
    $('#dtaod').append('<div class="mb-2 xtl tf-18 tfcdb">Recharge using Paytm</div><video controls muted autoplay width="100%"><source src="/recharge/instruction/paytm.mp4" type="video/mp4"><source src="/recharge/instruction/paytm.mp4" type="video/ogg">Your browser does not support HTML video.</video>');
}

function gpinst() {
    $("#odt1").removeClass('sel');
    $("#odt2").removeClass('sel');
    $("#odt3").addClass('sel');
    $('#dtaod').empty();
    $('#dtaod').append('<div class="mb-2 xtl tf-18 tfcdb">Recharge using Google Pay</div><video controls autoplay width="100%"><source src="/recharge/instruction/gpay.mp4" type="video/mp4"><source src="/recharge/instruction/gpay.mp4" type="video/ogg">Your browser does not support HTML video.</video>');
}

function srcp() {
    amount = $('#rcamt').val();
    rm = parseInt(rm);
    rx = parseInt(rx);
    if (amount == "" || amount < rm || amount > rx) {
        $('#dta_ref').append('<div class="col-12 conod LR"><div class="tffm ssmg suc ha"><span class="tf-20">Check recharge amount!</div></div>');
        setTimeout(function() {
            $('#dta_ref').empty();
        }, 1200);
        return false;
    }
    window.history.pushState("object or string", "Title", "#/TabIndex?index=recharge&amt@" + amount);
    rcstart();
}

function rcenk(ele) {
    if (event.key === 'Enter') {
        srcp();
    }
}

function refAL() {
    loading();
    $.ajax({
        url: "/modules/wallet/updrcA",
        type: "post",
        data: {
            "a": amount,
        },
        success: function(x) {
            $("#dtaod").html(x);
            clsload();
        }
    });

}

function upiPay(upi, mod) {
    paymode = mod;
    $('#dtaod').addClass('clickOff');
    if (paymode == "PhonePe") {
        $('#ppc').prop('checked', true);
        $('#upx1').removeClass('dipn');
    }
    if (paymode == "Paytm") {
        $('#payc').prop('checked', true);
        $('#upx2').removeClass('dipn');
    }
    if (paymode == "GPay") {
        $('#gpc').prop('checked', true);
        $('#upx3').removeClass('dipn');
    }
    if (paymode == "UPI") {
        $('#upc').prop('checked', true);
        $('#upx4').removeClass('dipn');
    }
    setTimeout(function() {
        copyUPI(upi);
    }, 400);
    setTimeout(function() {
        neworder(upi);
    }, 800);
}

function autopay(paylink, GID, memid) {
    $('#gatp').prop('checked', true);
    var pLink = paylink + "?user_id=" + memid + "&amount=" + amount + "&gid=" + GID;
    window.location.href = pLink;
}

function paybqr() {
    if (QRLink != "") {
        window.location.href = QRLink;
    }
}

function copyUPI(upid) {
    var Cupid = document.createElement("textarea");
    document.body.appendChild(Cupid);
    Cupid.value = upid;
    Cupid.focus();
    Cupid.select();
    document.execCommand("copy");
    document.body.removeChild(Cupid);
    $('#cu').text('Success');
    if (paymode == "PhonePe") {
        $('#upx1').text('copied successfully');
    }
    if (paymode == "Paytm") {
        $('#upx2').text('copied successfully');
    }
    if (paymode == "GPay") {
        $('#upx3').text('copied successfully');
    }

}

function copyText(x) {
    var Cupid = document.createElement("textarea");
    document.body.appendChild(Cupid);
    Cupid.value = x;
    Cupid.focus();
    Cupid.select();
    document.execCommand("copy");
    document.body.removeChild(Cupid);
    ssmg('gn', 'copied successfully')
}

function copyAMT() {
    var Cupid = document.createElement("textarea");
    document.body.appendChild(Cupid);
    Cupid.value = amount;
    Cupid.focus();
    Cupid.select();
    document.execCommand("copy");
    document.body.removeChild(Cupid);
    ssmg('gn', 'copied successfully')
}


function neworder(upid) {

    var bonus = "No";
    $.ajax({
        url: '/recharge/neworder',
        type: 'post',
        data: {
            'neworder': 1,
            'amount': amount,
            'paymode': paymode,
            'upid': upid,
            'bonus': bonus,
        },
        success: function(response) {
            if (response == 'true') {
                payod();
            } else {
                if (response == "session timeout!") {
                    ssmg('bn', 'Session timeout! Signing out . . .');
                    setTimeout(function() {
                        sot();
                    }, 1500);
                } else {
                    ssmg('bn', response);
                }
                $('#dtaod').removeClass('clickOff');
            }
        }
    });
}

function payod() {
    if (typeof $.cookie('rchash') === 'undefined') {
        recharge();
    } else {
        hash = $.cookie("rchash");
        if (hash != "") {

            clsfoot();
            clswar();
            clsload();
            hcp();
            window.history.pushState("object or string", "Title", "#/TabIndex?index=rchash&" + hash);
            $('#warea').append(rcpayp);
            setTimeout(function() {
                gettrdata();
            }, 200);
        } else {
            recharge();
        }
    }
}

function subUTR() {

    var utr = $("#utrn").val();
    if (utr == "") {
        alert('Enter UTR');
        return false;
    }
    $.ajax({
        url: "/recharge/utr",
        type: "post",
        data: {
            "subutr": 1,
            "utr": utr,
            "trid": trid,
        },
        success: function(response) {
            if (response == "true") {

                clearInterval(timer);
                lfutr(utr);
                rctimer();
                check();
            } else {
                $('#dta_ref').append('<div class="col-12 conod LR"><div class="tffm ssmg suc"><span class="tf-24">' + response + '</div></div>');
                setTimeout(function() {
                    $('#dta_ref').empty();
                }, 400);
            }
        }
    });

}

function lfutr(utr) {
    $('#utf').empty();
    $("#utf").html('<div class="tfw-6 tf-24" style="color: #8d00e2;font-style: italic;">UTR: ' + utr + '</div>');
    $("#ln1").addClass("bg");
    $("#rcagnt").attr("src", "/includes/icons/tick_p.svg");
}

Dropzone.options.ssupload = {
    method: "post",
    maxFiles: 1,
    maxFilesize: 10,
    timeout: 120000,
    acceptedFiles: ".png,.PNG,.jpg,.jpeg,.JPG,.JPEG",
    thumbnailWidth: null,
    thumbnailHeight: null,
    init: function() {
        this.on("sending", function(file, xhr, formData) {
            var u = $("#utrn").val();
            if (u == undefined) {
                u = "";
            }
            formData.append("utr", u);
            formData.append("trid", trid);
        });
        this.on("success", function(file, res) {

            if (res == 'success') {
                clearInterval(timer);
                $("#ln1").addClass("bg");
                $("#rcagnt").attr("src", "/includes/icons/tick_p.svg");
                rctimer();
                check();
            } else {
                alert('There was an error uploading the file, please try again.');
                location.reload()
            }

        });
        this.on("thumbnail", function(file, dataUrl) {

            setTimeout(function() {
                $('#upimg').empty();
                $('#upimg').append(uimgf);
                $("#payss").attr("src", '' + dataUrl + '');
            }, 1000);



        });
    }
};

function gettrdata() {
    $.ajax({
        url: "/modules/wallet/getRCData",
        type: "GET",
        data: {
            hash: hash
        },
        cache: false,
        success: function(result) {
            $("#dtaod").html(result);
            var result = rcpmns('rcM');
            const data = JSON.parse(result);
            var rcV = data.rcV;
            if (rcV == "screenshot") {
                $('#upimg').append(upssf);
                $("#ssupload").attr("action", "/recharge/upload");
                Dropzone.discover();
            } else if (rcV == "utr") {
                $('#upimg').append(utrf);
            } else if (rcV == "both") {
                $('#upimg').html(ssutrf);
                $("#ssupload").attr("action", "/recharge/upload");
                Dropzone.discover();
            }
        }
    });
}

function check() {
    $.ajax({
        url: '/recharge/status-check',
        type: 'post',
        data: {
            'check': 1,
            'trid': trid,
        },
        success: function(response) {
            if (response == 'Processing') {
                setTimeout(function() {
                    check();
                }, 5000);
            } else if (response == 'Completed') {
                $('#dta_ref').append('<div class="col-12 conod"><div class="tffm ssmg rc"><div class="tf-28"><img class="ivam" src="/includes/images/success.png"></div><div class="tf-36 pt-2 tfw-7 tfcdb xtc">₹' + amount + '</div><div class="tf-16 tfcdb">Your ₹' + amount + ' recharge successfully completed.</div><div class="mt-2 btn-main act xtc" onclick="recharge()">OK</div></div></div>');
                clearInterval(timer);
                rconcom();
                wRWU();
                OPbook(1);
                $('#timer').empty();
                $('#timer').append('<img src="/includes/images/tick_green.png" height="56">');
            } else if (response == 'Failed') {
                $('#dta_ref').append('<div class="col-12 conod"><div class="tffm ssmg rc"><div class="tf-28"><img class="ivam" src="/includes/images/fail.png"></div><div class="tf-36 pt-2 tfw-7 tfcdb txc">₹' + amount + '</div><div class="tf-16 tfcdb">Your ₹' + amount + ' recharge was failed.</div><div class="mt-2 btn-main act xtc" onclick="conrc()">CLOSE</div></div></div>');
                clearInterval(timer);
                rconfail();
                usercheck();
                $('#timer').empty();
                $('#timer').append('<img src="/includes/images/cross_red.png" height="56">');
            }
        }
    });
}


function rctimer() {
    var Validity = 90;
    timer = setInterval(function() {
        $('#timer').text(Validity);
        Validity -= 1;
        if (Validity < 0) {
            clearInterval(timer);
            $('#timer').text("?");
            $('#spuvt').addClass('zooani');
        }
    }, 1000);
}

function conrc() {
    $('#dta_ref').empty();
}

function canrc() {
    $.ajax({
        url: "/recharge/canorder",
        type: "post",
        data: {
            "canorder": 1,
        },
        success: function(response) {
            if (response == "true") {
                recharge();
            } else {
                $('#dta_ref').append('<div class="col-12 conod LR"><div class="tffm ssmg suc"><span class="tf-24">' + response + '</div></div>');
                setTimeout(function() {
                    $('#dta_ref').empty();
                }, 400);
            }
        }
    });
}

function telgram() {
    var Cupid = document.createElement("textarea");
    document.body.appendChild(Cupid);
    Cupid.value = 'Hello\n\n I have recharge ₹' + amount + ' via ' + paymode + ' and uploaded a screenshot.\n Order No:' + trid + '\n\n Please confirm as soon as possiple.';
    Cupid.focus();
    Cupid.select();
    document.execCommand("copy");
    document.body.removeChild(Cupid);
    $('#spuvt').text('Message copied');
    setTimeout(function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            window.location.href = telLink;
        } else {
            var win = window.open(telLink);
            win.focus();
            if (win) {
                win.focus();
            } else {
                $('#spuvt').append('<a href=' + telLink + ' target="blank"> Open Telegram</a>');
            }
        }
    }, 2000);
}

function rconcom() {
    $("#rcpro").addClass("clickOff");
    $("#ccomod").addClass("clickOff");
    $("#ssupload").removeClass("zooani");
    $("#ln2").addClass("bg");
    $("#rccmp").attr("src", "/includes/images/tick_ac.png");
    $("#canod").addClass("xc");
    $("#concs").addClass("xc");
}

function rconfail() {
    $("#rcpro").addClass("clickOff");
    $("#canod").addClass("xc");
    $("#canod").addClass("clickOff");
    $("#ssupload").removeClass("zooani");
}