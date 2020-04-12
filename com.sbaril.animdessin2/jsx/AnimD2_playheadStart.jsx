// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////

function playheadStart() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try {
        var idslct = charIDToTypeID( 'slct' );
        var desc462 = new ActionDescriptor();
        var idnull = charIDToTypeID( 'null' );
        var ref403 = new ActionReference();
        var idMnspsp = charIDToTypeID( 'Mn  ' );
        var idMnIt = charIDToTypeID( 'MnIt' );
        var idtimelineSetStartOfWorkArea = stringIDToTypeID( 'timelineSetStartOfWorkArea' );
        ref403.putEnumerated( idMnspsp, idMnIt, idtimelineSetStartOfWorkArea );
        desc462.putReference( idnull, ref403 ); executeAction( idslct, desc462, DialogModes.ALL ); 

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// playheadStart.main
//=========================================
//

playheadStart.main = function () {
  playheadStart();
};

app.activeDocument.suspendHistory("Set start of work area", 'playheadStart.main()');