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
//==================== AnimD2_timelineShowAllLayers ==============
//
function AnimD2_timelineShowAllLayers() {

    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        app.runMenuItem(stringIDToTypeID('timelineShowAllLayers'));

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// AnimD2_timelineShowAllLayers.main
//=========================================
//

AnimD2_timelineShowAllLayers.main = function() {
    // applyToAllLayers(AnimD2_timelineShowAllLayers);
    // Doesnt need to run with applyToAllLayers
    AnimD2_timelineShowAllLayers();
};

//AnimD2_timelineShowAllLayers.main();
app.activeDocument.suspendHistory("Timeline Show All Layers", 'AnimD2_timelineShowAllLayers.main()');

// EOF

"AnimD2_timelineShowAllLayers.jsx"
// EOF