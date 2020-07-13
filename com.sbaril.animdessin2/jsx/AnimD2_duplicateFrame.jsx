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
// AAAnimD2_duplicateFrame.jsx
//

//
// Generated Wed May 14 2014 16:13:43 GMT+0200
//

//
//==================== AnimD2_duplicateFrame ==============
//

function cTID(s) {return app.charIDToTypeID(s);};
function sTID(s) {return app.stringIDToTypeID(s);};

function AnimD2_duplicateFrame() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Duplicate
        function step1(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
            desc1.putReference(cTID('null'), ref1);
            desc1.putInteger(cTID('Vrsn'), 5);
            executeAction(cTID('Dplc'), desc1, dialogMode);
        };

        // Next Frame
        function step2(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            desc1.putBoolean(sTID("toNextWholeSecond"), false);
            executeAction(sTID('nextFrame'), desc1, dialogMode);
        };

        step1(); // Duplicate
        step2(); // Next Frame

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// AnimD2_duplicateFrame.main
//=========================================
//

AnimD2_duplicateFrame.main = function() {
    AnimD2_duplicateFrame();
};

//AnimD2_duplicateFrame.main();
app.activeDocument.suspendHistory(localize(locDuplicateFrame), 'AnimD2_duplicateFrame.main()');

// EOF

"AAAnimD2_duplicateFrame.jsx"
// EOF