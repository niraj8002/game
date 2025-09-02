function rcpmns(ser) {

    var tmp = null;

    $.ajax({
        'async': false,
        'type': "POST",
        'global': false,
        'dataType': 'html',
        'url': "/modules/appsetting/rcpmns",
        'data': {
            'ser': ser,
        },
        'success': function(data) {
            tmp = data;
        }
    });

    return tmp;
}