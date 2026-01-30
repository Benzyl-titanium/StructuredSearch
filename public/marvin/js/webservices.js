function getDefaultServicesPrefix() {
    return "";
}

function getDefaultServices() {
    var apiBase = "/api";
    var buildUrl = function(endpoint) {
        return apiBase + "/" + endpoint; 
    };
    var services = {
        "clean2dws":         buildUrl("clean2d"),
        "clean3dws":         buildUrl("clean3d"),
        "molconvertws":      buildUrl("molExport"),
        "stereoinfows":      buildUrl("stereoInfo"),
        "reactionconvertws": buildUrl("reactionExport"),
        "hydrogenizews":     buildUrl("hydrogenizer"),
        "automapperws":      buildUrl("reactionConverter"),
        "aromatizews":       buildUrl("molExport")
    };
    return services;
}