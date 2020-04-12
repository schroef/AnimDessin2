// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

// AnimD2T_commentHide.jsx
//

//
// Generated Wed Mar 24 2020 00;45
//

//
//==================== AnimD2T_commentToggle ==============
//
function AnimD2T_commentToggle() {

    // ErrStrs = {}; 
    // ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    // try {
        // var idinvokeCommand = stringIDToTypeID("invokeCommand");
        // var desc6 = new ActionDescriptor();
        // var idcommandID = stringIDToTypeID("commandID");
        // desc6.putInteger(idcommandID, 4439);
        // var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
        // desc6.putBoolean(idkcanDispatchWhileModal, true);
        // // executeAction( idinvokeCommand, desc6, DialogModes.NO );
        // executeAction(desc6, DialogModes.NO);

        function cTID(s) { return app.charIDToTypeID(s); };
        function sTID(s) { return app.stringIDToTypeID(s); };

        var desc20 = new ActionDescriptor();
        desc20.putInteger( sTID('commandID'), 4439 );
        
        desc20.putBoolean( sTID('4439'), true );
        // executeAction( sTID('invokeCommand'), desc20, DialogModes.NO );
        executeAction( , desc20, DialogModes.NO );

    // Allows for cancel without feedback message
//     } catch(e){
//         if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
//         else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
//   }    
};



//=========================================
// AnimD2T_commentToggle.main
//=========================================
//

AnimD2T_commentToggle.main = function () {
    AnimD2T_commentToggle();
};

//AnimD2T_commentToggle.main();
app.activeDocument.suspendHistory("Add or Edit a Timeline Comment", 'AnimD2T_commentToggle.main()');

// EOF

// "AnimD2T_commentHide.jsx"
// EOF