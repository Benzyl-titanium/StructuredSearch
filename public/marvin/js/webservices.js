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
        // "clean3dws":         buildUrl("clean3d"),
        "molconvertws":      buildUrl("molExport"),
        "stereoinfows":      buildUrl("stereoInfo"), // Calculate stereo
        // "reactionconvertws": buildUrl("reactionExport"),
        "hydrogenizews":     buildUrl("hydrogenizer"), // Add/Remove explicit H
        // "automapperws":      buildUrl("automapper"), // Auto Map
        // "aromatizews":       buildUrl("aromatizer") // Aromatize/dearomatize
    };
    return services;
}