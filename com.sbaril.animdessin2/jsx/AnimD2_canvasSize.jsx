// Copyright 2014
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

//
//==================== AnimD2_canvasSize ==============
//
function AnimD2_canvasSize() {
    // ErrStrs = {};
    // ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var idCnvS = charIDToTypeID('CnvS');
        executeAction(idCnvS, undefined, DialogModes.ALL);
    } catch (e) {
      // Turned this off, we dont need an error warning when users cancels
        // alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available")); 
    }
};



//=========================================
// AnimD2_canvasSize.main
//=========================================
//

AnimD2_canvasSize.main = function() {
    AnimD2_canvasSize();
};

AnimD2_canvasSize.main();

// EOF

"AnimD2_canvasSize.jsx"
// EOF