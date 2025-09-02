function ntmls() {
    var domain = document.location.hostname;
    var refcode = $.cookie("refcode");
    mylink = "https://" + domain + "/LR?RG&C=" + refcode;
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=mylink");
    $('#dta_ref').append(myrlik);
    setTimeout(function() {
        $("#mylink").text(mylink);
    }, 200);
}

function ntpvl() {
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=privilege");
    $('#dta_ref').append(privi);
    setTimeout(function() {
        $("#open").load('/invite/privilege');
    }, 200);
}

function invr() {
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=InviteRecord");
    $('#odrea').append(ivrcfmk);
    setTimeout(function() {
        invtab();
        $("#open").load('/invite/inv_com_info');
    }, 200);
}

function dincr() {
    hcp();
    loading();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=DailyIncome");
    $('#odrea').append(dincrf);
    setTimeout(function() {
        $("#dtaod").load('/invite/daily_income');
    }, 200);
}

function comr() {
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=IncomeDetail");
    $('#odrea').append(incrcd);
    setTimeout(function() {
        comtab();
    }, 200);
}

function copymyLink() {
    var rlink = document.createElement("textarea");
    document.body.appendChild(rlink);
    rlink.value = mylink;
    rlink.focus();
    rlink.select();
    document.execCommand("copy");
    document.body.removeChild(rlink);
    $('#dta_ref').append('<div class="col-12 conod LR" id="clink"><div class="tffm ssmg suc cml"><span class="tf-24"><img src="/includes/images/tick_green.png" height="36">Copy Successfully</div></div>');
    setTimeout(function() {
        $('#clink').remove();
    }, 1000);
}

function clsmyl() {
    loading();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=1");
    $("#cpanel").show();
    $('#dta_ref').empty();
    $('#odrea').empty();
}


function comtab() {
    loading();
    var Type = $('#comtab').val()
    $.ajax({
        url: "/invite/income_record",
        type: "POST",
        data: {
            Type: Type
        },
        cache: false,
        success: function(result) {
            $("#dtaod").html(result);
        }
    });
}

function invtab() {
    loading();
    var Type = $('#invtab').val()
    $.ajax({
        url: "/invite/invite_record",
        type: "POST",
        data: {
            Type: Type
        },
        cache: false,
        success: function(result) {
            $("#dtaod").html(result);
        }
    });
}

function contus() {
    var cotus = 'https://t.me/Osmoxybot';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = cotus;
    } else {
        var win = window.open(cotus);
        win.focus();
    }
}

function addWcom() {
    var AvlCom = $("#u_com").text();
    var ApplyAmt = $("#appAmt").val();
    ApplyAmt = Math.floor(ApplyAmt);
    if (confirm("Are you sure you want to appy " + ApplyAmt + " to your main wallet?")) {
        loading();
        $.ajax({
            url: '/invite/apply',
            type: 'post',
            data: {
                'apply': 1,
                'ApplyAmt': ApplyAmt,
            },
            success: function(response) {
                if (response == 'true') {
                    clsload();
                    ssmg('gn', ' Successfully');
                    $("#addWcom").hide();
                    var BonBal = AvlCom - ApplyAmt;
                    BonBal = Number(BonBal).toFixed(2);
                    $("#u_com").text(BonBal);
                    $.get("/invite/insort", function(data, status) {
                        $("#insort").html(data);
                    });
                } else {
                    clsload();
                    ssmg('bn', response);
                }
            }
        });
    }
}