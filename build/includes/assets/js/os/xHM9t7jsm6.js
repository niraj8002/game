function gofs() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=FastParity");
    fsmain();
}

function gopar() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=Parity");
    pmain();
}

function gosap() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=Sapre");
    sapmain();
}

function godic() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=Dice");
    dicemain();
}

function CheckR() {
    window.history.pushState("object or string", "Title", "#/TabIndex?index=CheckIn");
    hcp();
    $('#dta_ref').append(chinfrm);
    setTimeout(function() {
        $("#anof").load("/rewards/checkin_info");
    }, 100);
}

function taskR() {
    window.history.pushState("object or string", "Title", "#/TabIndex?index=Rewards");
    hcp();
    $('#dta_ref').append(rwdsm);
    setTimeout(function() {
        $("#weca").text(jb);
        $("#wecb").text(jb);
        $("#frba").text(frb);
        $("#anof").load("/rewards/join_info");
        $("#anof").load("/rewards/daily_od_info");
        $("#anof").load("/rewards/frc_info");
    }, 100);
}

function goavb() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=AndarBahar");
    abmain();
}

function gowlc() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=Wheelocity");
    wcmain();
}

function goms() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=MineSweeper");
    msmain();
}

function gojet() {
    alert('coming soon.');
    //clswar();clsfoot();hcp();window.history.pushState("object or string", "Title", "#/TabIndex?index=JetX");jxmain();
}

function playIPL() {
    clswar();
    clsfoot();
    hcp();
    window.history.pushState("object or string", "Title", "#/TabIndex?index=IPL");
    iplMx();
}