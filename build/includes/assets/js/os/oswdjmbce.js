function chwda() {
    amount = $('#wdamt').val();
    wm = parseInt(wm);
    wx = parseInt(wx);
    if (amount < wm || amount > wx) {
        $('#wdb').removeClass('act');
    } else {
        $('#wdb').addClass('act');
    }
}

function wdenk(ele) {
    if (event.key === 'Enter') {
        amount = $('#wdamt').val();
        wm = parseInt(wm);
        wx = parseInt(wx);
        if (amount < wm || amount > wx) {
            ssmg('bn', 'The withdrawal amount is incorrect.');
            return false;
        } else {
            swdp();
        }
    }
}

function addBCARD(m, x) {
    $('#warea').append(bamfm);
    $("#bamfn").html(m + " Account");
    $("#abcbtn").attr("onclick", "return addNBC('" + m + "')");
    $("#bclbtn").attr("onclick", "return BCardList('" + m + "')");
    if (x == 'n') {
        addNBC(m);
    } else if (x == 'y') {
        BCardList(m);
    }
    if (m == "UPI") {
        $("#isPri").val('Yes');
    }

}

function modupi(name, email, upi, isp) {
    addNBC('UPI');
    setTimeout(function() {
        $("#upnam").val(name);
        $("#email").val(email);
        $("#upad").val(upi);
        $("#cupad").val(upi);
        $("#isPri").val(isp);
        $("#amupi").html('Modify & Set as Default');
    }, 200);
}

function modbank(x, s, name, bank, branch, acc, ifsc, isp) {
    addNBC('Bank');
    setTimeout(function() {
        $("#upnam").val(name);
        $("#bname").html(bank);
        $("#branch").html(branch);
        $("#bkAcc").val(acc);
        $("#bkifsc").val(ifsc);
        $("#isPri").val(isp);
        if (s == 'Yes') {
            $('#vimpsd').remove();
            $('#upnam').attr('disabled', true);
            $('#bkAcc').attr('disabled', true);
            $('#bkifsc').attr('disabled', true);
            $("#ambank").html('Set as Default');
            $("#ambank").addClass('act');
            $("#ambank").attr("onclick", "addBANK('m','" + x + "','" + s + "')");
        } else {
            $("#ambank").html('Modify & Set as Default');
            $("#vimpsd").attr("onclick", "vIFSC('m','" + x + "','" + s + "')");
        }
    }, 200);
}

function modWallet(name, app, wnum, isp) {
    addNBC('Wallet');
    setTimeout(function() {
        $("#upnam").val(name);
        // $("#wapp").val(app);
        $("#upwal").val(wnum);
        $("#cpwal").val(wnum);
        $("#isPri").val(isp);
        $("#ampwal").html('Modify & Set as Default');
    }, 200);

}

function addNBC(m) {
    if (m == "UPI") {
        $('#bamf').html(aupfrm);
    } else if (m == "Bank") {
        $('#bamf').html(abcfrm);
        $("#vimpsd").attr("onclick", "vIFSC('n','','')");
    } else if (m == "Wallet") {
        $('#bamf').html(awcfrm);
    }
}

function BCardList(m) {
    $.ajax({
        url: "/modules/wallet/BClist",
        type: "post",
        data: {
            "m": m,
        },
        success: function(data) {
            clsload();
            $('#bamf').html(data);
        },
        beforeSend: function() {
            loading();
        }
    });
}

function vIFSC(x, n, s) {
    var ifsc = $('#bkifsc').val();
    if (ifsc == "") {
        ssmg('bn', 'Input IFSC');
        return false;
    }

    loading();

    $.ajax({
        url: "/modules/wallet/get_ifsc",
        type: "POST",
        data: {
            ifsc: ifsc,
        },
        cache: false,
        success: function(result) {
            if (result != 'false') {

                const data = JSON.parse(result);

                var IFSC = data.IFSC;
                var Bank = data.Bank;
                var Branch = data.Branch;
                $("#bkifsc").val(IFSC);
                $("#bname").text(Bank);
                $("#branch").text(Branch);

                if (x == 'm') {
                    $("#ambank").html('Modify & Set as Default');
                    $("#ambank").addClass('act');
                    $("#ambank").attr("onclick", "addBANK('m','" + n + "','" + s + "')");
                } else {
                    $("#ambank").addClass('act');
                    $("#ambank").attr("onclick", "addBANK('n','','')");
                }

                clsload();

            } else {
                clsload();
                ssmg('bn', 'Invalid IFSC Code');
            }

        }
    });

}

function addUPID() {
    var name = $('#upnam').val();
    var email = $('#email').val();
    var upid = $('#upad').val();
    var cupid = $('#cupad').val();
    var isPri = $('#isPri').val();
    if (name == "" || upid == "" || email == "") {
        ssmg('bn', 'Please Input Details');
        return false;
    }
    if (upid != cupid) {
        ssmg('bn', 'UPI Not matches');
        return false;
    }
    loading();
    $.ajax({
        url: '/modules/wallet/addUPI',
        type: 'post',
        data: {
            'addUPI': 1,
            'name': name,
            'email': email,
            'upid': upid,
            'isPri': isPri,
        },
        success: function(response) {
            if (response == 'true') {
                clsload();
                navi();
            } else {
                clsload();
                ssmg('bn', response);
            }
        }
    });
}

function addPAYTM() {
    var name = $('#upnam').val();
    var upwal = $('#upwal').val();
    var cpwal = $('#cpwal').val();
    var isPri = $('#isPri').val();
    if (name == "" || upwal == "" || cpwal == "") {
        ssmg('bn', 'Please Input Details');
        return false;
    }
    if (upwal != cpwal) {
        ssmg('bn', 'Wallet Not matches');
        return false;
    }
    loading();
    $.ajax({
        url: '/modules/wallet/addPaytm',
        type: 'post',
        data: {
            'addW': 1,
            'name': name,
            'upwal': upwal,
            'isPri': isPri,
        },
        success: function(response) {
            if (response == 'true') {
                clsload();
                Lcard();
                exit();
            } else {
                clsload();
                ssmg('bn', response);
            }
        }
    });
}

function addBANK(c, x, s) {

    var name = $('#upnam').val();
    var acc = $('#bkAcc').val();
    var bank = $('#bname').text();
    var branch = $('#branch').text();
    var ifsc = $('#bkifsc').val();
    var isPri = $('#isPri').val();

    if (name == "" || bank == "" || acc == "" || ifsc == "" || branch == "") {
        ssmg('bn', 'Please Input Details');
        return false;
    }
    loading();

    $.ajax({
        url: '/modules/wallet/addBank',
        type: 'post',
        data: {
            'addB': 1,
            'c': c,
            'x': x,
            's': s,
            'name': name,
            'bank': bank,
            'branch': branch,
            'acc': acc,
            'ifsc': ifsc,
            'isPri': isPri,
        },
        success: function(response) {
            if (response == 'true') {
                clsload();
                Lcard();
                exit();
            } else {
                clsload();
                ssmg('bn', response);
            }
        }
    });
}

function swdp(wdm) {

    rm = parseInt(rm);
    if (trcamt < rm && WdType == 'A') {
        ssmg('bn', 'Minimum ₹' + rm + ' recharge is mandatory for withdrawal');
        return false;
    }

    var xpu = $('#xpu').text();
    if (xpu == "0") {
        ssmg('bn', 'Please, add UPI in your account!');
        return false;
    }

    var bbk = $('#bbk').text();
    if (bbk == "0") {
        ssmg('bn', 'Please, add Bank in your account!');
        return false;
    }

    var wapp = $('#wapp').text();
    if (wapp == "0") {
        ssmg('bn', 'Please, add Paytm Wallet in your account!');
        return false;
    }

    //CheckPrimary
    var wdTo;
    var isPri = $.cookie("wPri");
    if (isPri != '0') {
        wdTo = isPri;
    } else {
        wdTo = wdm;
    }

    amount = $('#wdamt').val();
    var sdwb = $('#u_bal').text();
    sdwb = parseInt(sdwb);
    wm = parseInt(wm);
    wx = parseInt(wx);
    if (sdwb > wx) {
        sdwb = wx;
    }

    if (amount == "" || amount < wm || amount > sdwb) {
        ssmg('bn', 'Please Check Input!');
        return false;
    }
    $('#dta_ref').append('<div class="col-12 conod"><div class="tffm ssmg rc fadein"><div class="tf-36 tfw-5 tfcdb">Confirm Withdrawal?</div><div class="tf-16 tfcdb">Are you sure to withdraw ₹' + amount + ' to ' + wdTo + '?</div><div class="inpbcx"><span class="xicon key"></span> <input type="text" class="xbox ctuc" id="wdotp" oninput="cinnu()" maxlength="6" placeholder="OTP" autocomplete="off"> <span class="GROTP" id="otp" onclick="GWDO()">GET</span></div><div class="row mt-2"><div class="col-6 pr-1"><div class="btn-con rc" onclick="clsload()">Cancel</div></div><div class="col-6 pl-1 xtc"><div class="btn-main" id="awdbao" onclick="wdnow()">Submit</div></div></div></div></div>');


}

function GWDO() {
    amount = $('#wdamt').val();
    $('#otp').addClass('clickOff');
    $.ajax({
        url: '/modules/wallet/wdstart',
        type: 'post',
        data: {
            'wdtoken': 1,
            'amount': amount,
            'WdType': WdType,
        },
        success: function(response) {
            clink();
            if (response == 'true') {
                setTimeout(function() {
                    $('#otp').removeClass('clickOff');
                }, 60000);
                var Validity = 60;
                timer = setInterval(function() {
                    $('#otp').text("OTP expires in " + Validity + "s");
                    Validity -= 1;
                    if (Validity < 0) {
                        clearInterval(timer);
                        $('#otp').text("GET NEW");
                    }
                }, 1000);
                $("#awdbao").addClass('act');
                $("#lprfh").remove();
            } else {
                if (response == "session timeout!") {
                    ssmg('bn', 'Session timeout! Signing out . . .');
                    setTimeout(function() {
                        sot();
                    }, 1500);
                } else {
                    ssmg('bn', response);
                }
            }
        },
        beforeSend: function() {
            var bvs = $('#bavs').text();
            if (bvs == "Verified") {
                ssmg('gn', 'Sending OTP. Please wait. . .');
            } else if (bvs == "Rejected") {
                ssmg('gn', 'Invalid Bank Account.');
                return false;
            } else if (bvs == "") {
                ssmg('gn', 'Sending OTP after verifying Bank A/c. Please wait. . .');
            }
        }

    });
}

function wdnow() {
    loading();
    $('#awdbao').addClass('clickOff');
    var OTP = $('#wdotp').val();
    if (OTP == "") {
        $("#lprfh").remove();
        $('#awdbao').removeClass('clickOff');
        ssmg('bn', 'Enter otp!');
        return false;
    }
    $.ajax({
        url: '/modules/wallet/wdOrder',
        type: 'post',
        data: {
            'wd': 1,
            'OTP': OTP,
        },
        success: function(response) {
            if (response == 'true') {

                clsload();
                wRWU();
                ssmg('gn', '₹' + amount + ' Successfully, it will arrive to your account within 120 minutes');

            } else {
                if (response == 'sO') {
                    ssmg('bn', 'Session out!');
                    window.location.href = ("/signout");
                } else {
                    $("#lprfh").remove();
                    $('#awdbao').removeClass('clickOff');
                    ssmg('bn', response);
                }
            }
        }
    });
}

function wdlist() {
    $('#warea').append(moreRDF);
    loading();
    backF('exit', 'Withdrawal Records');
    $.ajax({
        url: "/modules/wallet/wdRecord",
        type: "POST",
        data: {
            WdType: WdType
        },
        cache: false,
        success: function(result) {
            $("#dtaod").html(result);
            clsload();
        }
    });
}