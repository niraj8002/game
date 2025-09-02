var rwdlod = '<img class="pl-2" src="/includes/images/loader.gif" style="height: 20px;vertical-align: sub;">';

function GetWB() {
    clearTimeout(jbm);
    $('#wbc').empty();
    $('#wbc').append("Waiting" + rwdlod);
    var win = window.open(cl);
    jbm = setTimeout(function() {
        GETJB();
    }, 15000);
}

function GETJB() {
    $('#wbc').addClass('clickOff');
    $.ajax({
        url: '/rewards/join_bonus',
        type: 'post',
        data: {
            'JB': 1,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                $('#dtaod').empty();
                $('#wbc').removeClass('act');
                ssmg('gn', 'Successfully');
                setTimeout(function() {
                    clink();
                    $('#wbc').text('Claimed');
                }, 1000);
            } else {
                ssmg('gn', response);
                setTimeout(function() {
                    clink();
                    $('#wbc').removeClass('clickOff');
                    $('#wbc').removeClass('act');
                    $('#wbc').text('Join & Get');
                }, 1000);
            }
        }
    });
}

function GetODB() {
    $('#dodb').addClass('clickOff');
    $('#dodb').append(rwdlod);
    $.ajax({
        url: '/rewards/daily_od_bonus',
        type: 'post',
        data: {
            'ODB': 1,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                $('#dtaod').empty();
                $('#dodb').removeClass('act');
                ssmg('gn', 'Successfully');
                setTimeout(function() {
                    clink();
                    $('#dodb').text('Claimed');
                }, 1000);
            } else {
                ssmg('gn', response);
                setTimeout(function() {
                    clink();
                    $('#dodb').removeClass('clickOff');
                    $('#dodb').removeClass('act');
                    $('#dodb').text('Get');
                }, 1000);
            }
        }
    });
}

function GetRFC() {
    $('#frbo').addClass('clickOff');
    $('#frbo').append(rwdlod);
    $.ajax({
        url: '/rewards/frc_bonus',
        type: 'post',
        data: {
            'FRCB': 1,
        },
        success: function(response) {
            if (response == 'true') {
                wall();
                $('#dtaod').empty();
                $('#frbo').removeClass('act');
                ssmg('gn', 'Successfully');
                setTimeout(function() {
                    clink();
                    $('#frbo').text('Claimed');
                }, 1000);
            } else {
                ssmg('gn', response);
                setTimeout(function() {
                    clink();
                    $('#frbo').removeClass('clickOff');
                    $('#frbo').removeClass('act');
                    $('#frbo').text('Get');
                }, 1000);
            }
        }
    });
}