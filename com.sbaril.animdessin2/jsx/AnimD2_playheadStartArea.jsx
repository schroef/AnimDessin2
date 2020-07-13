// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools�) by St�phane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

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
function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

function playheadStartArea() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        
        // VIDEO TIMELINE
        // var idslct = charIDToTypeID( 'slct' );
        // var desc471 = new ActionDescriptor();
        // var idnull = charIDToTypeID( 'null' );
        // var ref412 = new ActionReference();
        // var idMnspsp = charIDToTypeID( 'Mn ' );
        // var idMnIt = charIDToTypeID( 'MnIt' );
        // var idtimelineGoToWorkAreaEnd = stringIDToTypeID( 'timelineGoToWorkAreaStart' );
        // ref412.putEnumerated( idMnspsp, idMnIt, idtimelineGoToWorkAreaEnd ); 
        // desc471.putReference( idnull, ref412 ); 
        // executeAction( idslct, desc471, DialogModes.ALL ); 


    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};




//=========================================
// playheadStartArea.main
//=========================================
//

playheadStartArea.main = function() {
    playheadStartArea();
    // applyToAllLayers(playheadStartArea);
};

playheadStartArea.main();
// Doesnt use history
// app.activeDocument.suspendHistory(localize(locplayheadStartArea), 'playheadStartArea.main()');
