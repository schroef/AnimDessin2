// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

// Call main function from getselected, we can reuse scripts
var ScriptFilePath = Folder($.fileName).parent.fsName;
$.evalFile(new File(ScriptFilePath + '/AnimD2_applyToAllLayers.jsx'));

//
// Generated Wed Mar 26 2020 19:14 AST
//

//
//==================== AnimD2_timelineShowFavorites ==============
//
function AnimD2_timelineShowFavorites() {

    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        app.runMenuItem(stringIDToTypeID('timelineShowFavoriteLayers'));

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// AnimD2_timelineShowFavorites.main
//=========================================
//

AnimD2_timelineShowFavorites.main = function() {
    // applyToAllLayers(AnimD2_timelineShowFavorites);
    // Doesnt need to run with applyToAllLayers
    AnimD2_timelineShowFavorites();
};

//AnimD2_timelineShowFavorites.main();
app.activeDocument.suspendHistory("Timeline Show Favorite", 'AnimD2_timelineShowFavorites.main()');

// EOF

"AnimD2_timelineShowFavorites.jsx"
// EOF