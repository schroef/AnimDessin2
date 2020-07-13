// Copyright 2014
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

//
//==================== AnimD2_canvasSize ==============
//
function AnimD2_canvasSize() {
    ErrStrs = {};
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var idCnvS = charIDToTypeID('CnvS');
        executeAction(idCnvS, undefined, DialogModes.ALL);

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};



//=========================================
// AnimD2_canvasSize.main
//=========================================
//

AnimD2_canvasSize.main = function() {
    AnimD2_canvasSize();
};

app.activeDocument.suspendHistory(localize(locCanvasSize), 'AnimD2_canvasSize.main()');

// EOF

"AnimD2_canvasSize.jsx"
// EOF