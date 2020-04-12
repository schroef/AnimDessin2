// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

//
// AnimD2T_commentExportHtml.jsx
//

//
// Generated Fri May 16 2014 13:30:45 GMT+0200
//


//
//==================== AnimD2T_commentExportHtml ==============
//

cTID = function(s) {return app.charIDToTypeID(s);};
sTID = function(s) {return app.stringIDToTypeID(s);};

function AnimD2T_commentExportHtml() {

    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Select
        function step1(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("exportTimelineCommentsAsHTML"));
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
// AnimD2T_commentExportHtml.main
//=========================================
//

AnimD2T_commentExportHtml.main = function() {
    AnimD2T_commentExportHtml();
};

AnimD2T_commentExportHtml.main();
//app.activeDocument.suspendHistory("Export Timeline Comments as HTML…", 'AnimD2T_commentExportHtml.main()');

// EOF

"AnimD2T_commentExportHtml.jsx"
// EOF