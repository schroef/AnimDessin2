// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

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

//
// Generated Fri May 16 2014 13:28:26 GMT+0200
//

//
//==================== AnimD2T_commentEdit ==============
//
cTID = function(s) {return app.charIDToTypeID(s);};
sTID = function(s) {return app.stringIDToTypeID(s);};

function AnimD2T_commentEdit() {
    
    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    // Select
    try {
        // function step1(enabled, withDialog) {
        //   if (enabled != undefined && !enabled)
        //     return;
        //   var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("timelineEditTimelineComment"));
        desc1.putReference(cTID('null'), ref1);
        executeAction(cTID('slct'), desc1, DialogModes.ALL);
        // };

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
    // step1();      // Select
};



//=========================================
// AnimD2T_commentEdit.main
//=========================================
//

AnimD2T_commentEdit.main = function() {
    AnimD2T_commentEdit();
};

//AnimD2T_commentEdit.main();
app.activeDocument.suspendHistory(localize(locCommentEdit), 'AnimD2T_commentEdit.main()');

// EOF

"AnimD2T_commentEdit.jsx"
// EOF