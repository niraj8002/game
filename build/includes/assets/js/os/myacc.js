function ode() {
    $.cookie("pUrl", "#/TabIndex?index=3", {
        path: "/"
    });
    window.history.pushState("object or string", "Title", "#/TabIndex?index=OrderList&type01");
    loading();
    odlist();
}

function fde() {
    window.history.pushState("object or string", "Title", "#/TabIndex?index=dairy");
    dairy();
}

function dowa() {
    hcp();
    $('#warea').append(moreRDF);
    $("#backF").attr('onclick', 'myacc()');
    $("#MoreRCT").text('Download');
    $("#moreRcd").addClass('dn');
    $("#dtaod").html(dnaf);
}

function opennt() {
    $('#dta_ref').append(cnnfrm);
}

function opast() {
    $('#dta_ref').append(snpsf);
}

function changeName() {
    var name = $('#newname').val();
    $.ajax({
        url: "/my/cname",
        type: "post",
        data: {
            "CName": 1,
            name: name,
        },
        success: function(response) {
            if (response == "true") {
                $("#u_nam").text(name);
                ssmg('gn', 'Successfully')
                setTimeout(function() {
                    clink();
                }, 1000);
            } else {
                ssmg('gn', response)
                setTimeout(function() {
                    clink();
                }, 1000);
            }
        }
    });
}

function changePass() {
    var pass = $('#newpass').val();
    if (pass.length < 6) {
        alert("Please enter a valid password (6 characters or more).");
        return;
    }
    $.ajax({
        url: "/my/cpass",
        type: "post",
        data: {
            CPass: 1,
            pass: pass,
        },
        success: function(response) {
            if (response == 'sO') {
                ssmg('bn', 'Session out!');
                window.location.href = ("/signout");
            } else {
                ssmg('gn', response);
                setTimeout(function() {
                    clink();
                }, 1000);
            }
        }
    });
}

function sup() {
    var win = window.open(sl);
    win.focus();
}

function fus() {
    var win = window.open(cl);
    win.focus();
}

function doa() {
    var win = window.open(al);
    win.focus();
}

function sot() {
    $.cookie("uid", null);
    $.cookie("umob", null);
    $.cookie("unam", null);
    window.location.href = '/logout';
}

function Opsup(x, pm, pa, pv, pi) {
    $('#warea').append(supmf);
    $('.main').addClass('scrollOff');
    if (x == 0) {
        supHis();
        $("#backS").attr("onclick", "myacc()");
        window.history.pushState("object or string", "Title", "#/TabIndex?index=complaint");
    } else {
        $("#backS").attr("onclick", "exitS('supc')");
        if (x == 1) {
            var html = "";
            html += '<div class="row mb-2 mt-2"><div class="col-5 xtl qsifd"><label for="supR">Reason for complaint:</label></div><div class="col-7 pl-0"><select class="form-control" id="supR"><option value="did not receive the recharge amount">Did not receive the recharge amount</option></select></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="payMode">Payment Mode:</label></div><div class="col-7 pl-0"><select class="form-control" id="payMode"><option value="' + pm + '" selected hidden>' + pm + '</option><option value="PhonePe">PhonePe</option><option value="Paytm">Paytm</option><option value="GPay">GPay</option><option value="UPI">Others</option></select></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="payAmt">Amount:</label></div><div class="col-7 pl-0"><input class="form-control" id="payAmt" placeholder="Amount" value="' + pa + '" disabled></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="paidTo">Paid To UPID (Optional):</label></div><div class="col-7 pl-0"><input class="form-control" id="paidTo" placeholder="Paid To UPID" value="' + pv + '" disabled></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="payUtr">UTR** :</label></div><div class="col-7 pl-0"><input class="form-control" id="payUtr" placeholder="Payment UTR No**"></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="tranId">Trx Id:</label></div><div class="col-7 pl-0"><input class="form-control" id="tranId" placeholder="Transaction Id" value="' + pi + '" disabled></div></div>';
            html += '<div class="row mb-3 mt-3"><div class="col-5 xtl qsifd"><label for="ss">Screenshot:</label></div><div class="col-7 pl-0"><input type="file" id="ss" name="ssfile" accept=".jpg, .jpeg, .png"></div></div>';
            html += '<button class="btn btn-primary" style="width:100%" id="CToken" onclick="return CRCToken(&quot;' + pa + '&quot;,&quot;' + pv + '&quot;,&quot;' + pi + '&quot;)">Confirm</button>';
            $("#hdesk").html(html);
        } else if (x == 2) {
            var html = "";
            html += '<div class="row mb-2 mt-2"><div class="col-5 xtl qsifd"><label for="supR">Reason for complaint:</label></div><div class="col-7 pl-0"><select class="form-control" id="supR"><option value="Did not credited in my bank">Did not credited in my bank</option></select></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="payAmt">Amount:</label></div><div class="col-7 pl-0"><input class="form-control" id="payAmt" placeholder="Amount" value="' + pa + '" disabled></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="payMode">Primary Mode:</label></div><div class="col-7 pl-0"><input class="form-control" id="payMode"  value="' + pm + '" disabled></div></div>';
            html += '<div class="row mb-2"><div class="col-5 xtl qsifd"><label for="tranId">Trx Id:</label></div><div class="col-7 pl-0"><input class="form-control" id="tranId" placeholder="Transaction Id" value="' + pi + '" disabled></div></div>';
            html += '	<div class="row mb-2">'
            html += '<div class="col-12 xtl"><label for="comDesc">Complaint Description (Max 256 char.):</label></div>';
            html += '<div class="col-12 xtl"><textarea class="form-control" id="comDesc" rows="3"></textarea></div>';
            html += '</div>';
            html += '<button class="btn btn-primary" style="width:100%" id="CToken" onclick="return CWDToken(&quot;' + pa + '&quot;,&quot;' + pm + '&quot;,&quot;' + pi + '&quot;)">Confirm</button>';
            $("#hdesk").html(html);
        }
    }

}

function supHis() {
    $("#anupif").removeClass("sel");
    $("#anbnkf").addClass("sel");
    $.get("/support/history", function(data, status) {
        $("#hdesk").html(data);
    });
}

function CRCToken(pa, pv, pi) {

    var name = document.getElementById("ss").files[0];
    if (name == null) {
        alert('upload payment screenshot');
        return false;
    } else {
        var ss = $("#ss").val();
        var ext = ss.split('.').pop().toLowerCase();
        if (jQuery.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            alert("Invalid Image File");
            return false;
        }
    }

    var pm = $("#payMode").val();
    var pu = $("#payUtr").val();

    let formData = new FormData();
    formData.append("ss", name);
    formData.append("mode", pm);
    formData.append("utr", pu);
    formData.append("amt", pa);
    formData.append("vpa", pv);
    formData.append("trx", pi);

    $.ajax({
        url: '/support/rcc_create',
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        data: formData,
        success: function(res) {
            if (res == 'true') {
                clsload();
                supHis();
                ssmg('gn', 'Successfully');
            } else {
                clsload();
                ssmg('bn', res);
            }
        },
        beforeSend: function() {
            loading();
        }
    });
}

function CWDToken(pa, pm, pi) {
    var cd = $("#comDesc").val();
    if (cd == "") {
        alert('Input Complaint Description');
        return false;
    }
    $.ajax({
        url: "/support/wcc_create",
        type: "post",
        data: {
            "wCC": 1,
            pa: pa,
            pm: pm,
            pi: pi,
            cd: cd,
        },
        success: function(res) {
            if (res == "true") {
                clsload();
                supHis();
                ssmg('gn', 'Successfully');
            } else {
                clsload();
                ssmg('gn', res)
            }
        },
        beforeSend: function() {
            loading();
        }
    });
}

function infob() {
    var ubid = '<div class="col-12 conod" id="clink"><div class="tffm ssmg info xtl"><div class="jxhb bifh"><div class="tfw-5">Balance Information</div><div class="tfw-6" onclick="clink()"><r>x</r></div></div><div class="pa-10 tf-16"><div class="jxhb"><span>Available Balance:</span> <span>₹<span id="u_bal">0.00</span></span></div><div class="jxhb mt-1"><span>Available Bonus:</span> <span>₹<span id="u_com">0.00</span></span></div><div class="jxhb mt-1"><span>Wagering Remaining:</span> <span>₹<span id="wram">0</span>.00</span></div><div class="jxhb mt-1"><span>Balance Hold:</span> <span>₹<span id="amh">0.00</span></span></div></div></div></div>';
    $("#dta_ref").html(ubid);
    wall();
    BonBall();
    $.ajax({
        url: "/my/winfo",
        type: "POST",
        data: {},
        cache: false,
        success: function(r) {
            const data = JSON.parse(r);
            $('#amh').text(data.h);
            $('#wram').text(data.w);
        }
    });
}