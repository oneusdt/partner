var initLaguage = function() {
    if (!language) {
        language = "language_us"
    }
    $("ul.language-menu > li").click(function() {
        store.set("language", "language_" + $(this).attr("data-value"));
        window.location.reload()
    });
    if (!language) {
        lan_arr = language_us;
        tipl = tipl_language_us
    } else {
        try {
            lan_arr = eval(language);
            tipl = eval("tipl_" + language)
        } catch (err) {
            lan_arr = language_us;
            tipl = tipl_language_us
        }
    }
    for (var i = 0; i < lan_arr.length; i++) {
        $(".lan-" + (i + 1)).html(lan_arr[i])
    }
};