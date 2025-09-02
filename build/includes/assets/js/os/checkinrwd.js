function CheckIn() {
    CheckN();
}

function CheckN() {
    if (trcamt < 200) {
        var smg = "Recharge your wallet, to get this reward";
        ssmg('bn', smg);
        return false;
    }
    $('#cibt').addClass('clickOff');
    $.ajax({
        url: '/rewards/checkin',
        type: 'post',
        data: {
            'checkin': 1,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                $('#dtaod').empty();
                $('#cibt').text('Check In');
                $('#cibt').removeClass('act');
                $("#anof").load("/rewards/checkin_info");
                ssmg('gn', 'Congratulations!');
            } else {
                ssmg('bn', response);
                $('#cibt').empty();
                $('#cibt').text('Check In');
                $('#cibt').removeClass('clickOff');
            }
        }
    });
}

function clschin() {
    clearTimeout(jbm);
    window.history.pushState("object or string", "Title", "/");
    $("#cpanel").show();
    $('#dta_ref').empty();
}

function opentrs() {
    if (trcamt < 200) {
        var smg = "Recharge your wallet, to get this reward";
        ssmg('bn', smg);
        return false;
    }
    $('#rcb').addClass('clickOff');
    $.ajax({
        url: '/rewards/open_treasure',
        type: 'post',
        data: {
            'TRS': 1,
        },
        success: function(response) {
            ssmg('bn', response);
            wall();
            $("#anof").load("/rewards/checkin_info");
        }
    });
}