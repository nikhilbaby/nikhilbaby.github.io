var customCookieFunctions = {
    getCookie: function (name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    },
    getUserId: function () {
        var cookiesList = document.cookie.split(';');
        var userId = '';
        for (var i = 1; i <= cookiesList.length; i++) {
            if (cookiesList[i - 1].split('=')[0].indexOf('WC_USERACTIVITY_') != -1) {
                userId = cookiesList[i - 1].split('=')[0].split('_')[2];
                return (userId);
            }
        }
        return null;
    }
}