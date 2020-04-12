// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

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

///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////

function playheadMoveEnd() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try {
        var idslct = charIDToTypeID( 'slct' );
        var desc462 = new ActionDescriptor();
        var idnull = charIDToTypeID( 'null' );
        var ref403 = new ActionReference();
        var idMnspsp = charIDToTypeID( 'Mn  ' );
        var idMnIt = charIDToTypeID( 'MnIt' );
        var idtimelineMoveLayerInPoint = stringIDToTypeID( 'timelineMoveLayerEndPoint' );
        ref403.putEnumerated( idMnspsp, idMnIt, idtimelineMoveLayerInPoint );
        desc462.putReference( idnull, ref403 ); executeAction( idslct, desc462, DialogModes.ALL ); 

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};
//=========================================
// playheadMoveEnd.main
//=========================================
//

playheadMoveEnd.main = function () {
    applyToAllLayers(playheadMoveEnd);
};

app.activeDocument.suspendHistory("Moves end of frame(s) to playhead", 'playheadMoveEnd.main()');