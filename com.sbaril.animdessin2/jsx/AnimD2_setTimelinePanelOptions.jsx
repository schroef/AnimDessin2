// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

//
//==================== AnimD2_setTimelinePanelOptions ==============
//
function AnimD2_setTimelinePanelOptions() {
    // app.runMenuItem(stringIDToTypeID('timelineGoToTime'));
    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        app.runMenuItem(stringIDToTypeID('timelinePaletteOptions'));

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// AnimD2_setTimelinePanelOptions.main
//=========================================
//

AnimD2_setTimelinePanelOptions.main = function() {
    AnimD2_setTimelinePanelOptions();
};

AnimD2_setTimelinePanelOptions.main();
// Does use history
// app.activeDocument.suspendHistory("Set timeline Panel Options", 'AnimD2_setTimelinePanelOptions.main()');

// EOF

"AnimD2_setTimelinePanelOptions.jsx"
// EOF