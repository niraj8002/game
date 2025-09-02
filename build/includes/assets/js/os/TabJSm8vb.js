if (tab == "0") {
    home();
} else if (tab == "1") {
    group();
} else if (tab == "2") {
    wallet();
} else if (tab == "3") {
    my();
}

function home() {
    clstab();
    clswar();
    $('#adsob').addClass('adsob');
    $('#moxht2b4u').addClass('sel');
    $('#home').addClass('sel');
    window.history.pushState("object or string", "Title", "/");
    $('#warea').append(mphs);
    setTimeout(function() {
        wall();
        userInfo();
    }, 200);
}

function group() {
    clstab();
    clswar();
    $('#adsob').addClass('adsob');
    $('#raeiyf2m0').addClass('sel');
    $('#group').addClass('sel');
    window.history.pushState("object or string", "Title", "#/TabIndex?index=1");

    var result = rcpmns('invS');
    const data = JSON.parse(result);
    var rcV = data.rcV;
    if (rcV == "on") {
        $('#warea').append(minrid);
        setTimeout(function() {
            loadInv();
        }, 200);
    } else {
        cpum('warea');
        $("#warea").append('<div class="col-12 ummlp" onclick="ntmls()">My Link</div>');
    }

}

function wallet() {
    clstab();
    clswar();
    $('#sfrm6bvy').addClass('sel');
    $('#wallet').addClass('sel');
    window.history.pushState("object or string", "Title", "#/TabIndex?index=2");

    var result = rcpmns('rcS');
    const data = JSON.parse(result);
    var rcV = data.rcV;
    if (rcV == "on") {
        $('#warea').append(sfrmld);
        setTimeout(function() {
            wall();
            list();
            rcpen();
        }, 200);
    } else {
        cpum('warea');
    }

}

function my() {
    clstab();
    clswar();
    $('#adsob').addClass('adsob');
    $('#mcpnvd2my').addClass('sel');
    $('#my').addClass('sel');
    window.history.pushState("object or string", "Title", "#/TabIndex?index=3");
    $('#warea').append(myadavc);
    setTimeout(function() {
        userInfo();
    }, 200);
}