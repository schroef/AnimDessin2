// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

//
// AnimD2T_commentExportText.jsx
//

//
// Generated Fri May 16 2014 13:28:51 GMT+0200
//

//
//==================== AnimD2T_commentExportText ==============
//

cTID = function(s) {return app.charIDToTypeID(s);};
sTID = function(s) {return app.stringIDToTypeID(s);};

function AnimD2T_commentExportText() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Select
        function step1(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("exportTimelineCommentsAsText"));
            desc1.putReference(cTID('null'), ref1);
            executeAction(cTID('slct'), desc1, dialogMode);
        };
        step1(); // Select
    
    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};



//=========================================
// AnimD2T_commentExportText.main
//=========================================
//

AnimD2T_commentExportText.main = function() {
    AnimD2T_commentExportText();
};

AnimD2T_commentExportText.main();
//app.activeDocument.suspendHistory("Export Timeline Comments as TEXT…", 'AnimD2T_commentExportText.main()');

// EOF

"AnimD2T_commentExportText.jsx"
// EOF