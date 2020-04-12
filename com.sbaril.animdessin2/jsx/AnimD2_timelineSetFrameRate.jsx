// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

//
// Generated Wed May 14 2014 16:13:27 GMT+0200
//

//
//==================== AnimD2_timelineSetFrameRate ==============
//
function cTID(s) {return app.charIDToTypeID(s);};
function sTID(s) {return app.stringIDToTypeID(s);};

function AnimD2_timelineSetFrameRate() {
    
    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var idslct = charIDToTypeID('slct');
        var desc445 = new ActionDescriptor();
        var idnull = charIDToTypeID('null');
        var ref386 = new ActionReference();
        var idMnspsp = charIDToTypeID('Mn  ');
        var idMnIt = charIDToTypeID('MnIt');
        // var idtimelineEnableShortcutKeys = stringIDToTypeID( 'timelineDocumentSettings' );
        var idtimelineEnableShortcutKeys = stringIDToTypeID('timelineDocumentSettings');
        ref386.putEnumerated(idMnspsp, idMnIt, idtimelineEnableShortcutKeys);
        desc445.putReference(idnull, ref386);
        executeAction(idslct, desc445, DialogModes.ALL);

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// AnimD2_timelineSetFrameRate.main
//=========================================
//

AnimD2_timelineSetFrameRate.main = function() {
    AnimD2_timelineSetFrameRate();
};

// //AnimD2_timelineSetFrameRate.main();
app.activeDocument.suspendHistory("Set Timeline Frame Rate", 'AnimD2_timelineSetFrameRate.main()');

// EOF

"AnimD2_timelineSetFrameRate.jsx"
// EOF