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
// AAAnimD2_newVideoGroup.jsx
//

//
// Generated Wed May 14 2014 16:13:27 GMT+0200
//

cTID = function(s) {return app.charIDToTypeID(s);};
sTID = function(s) {return app.stringIDToTypeID(s);};

//
//==================== AnimD2_newVideoGroup ==============
//
function AnimD2_newVideoGroup() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Make
        function step1(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putClass(sTID("sceneSection"));
            desc1.putReference(cTID('null'), ref1);
            executeAction(cTID('Mk  '), desc1, dialogMode);
        };

        // Set
        function step2(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
            desc1.putReference(cTID('null'), ref1);
            var desc2 = new ActionDescriptor();
            desc2.putString(cTID('Nm  '), "Anim");
            desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
            executeAction(cTID('setd'), desc1, dialogMode);
        };

        // Make
        function step3(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putClass(cTID('Lyr '));
            desc1.putReference(cTID('null'), ref1);
            executeAction(cTID('Mk  '), desc1, dialogMode);
        };

        // Move
        function step4(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
            desc1.putReference(cTID('null'), ref1);
            var ref2 = new ActionReference();
            ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Nxt '));
            desc1.putReference(cTID('T   '), ref2);
            executeAction(cTID('move'), desc1, dialogMode);
        };

        // Move Out Point
        function step5(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            executeAction(sTID('moveOutTime'), desc1, dialogMode);
        };

        // Move In Point
        function step6(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            executeAction(sTID('moveInTime'), desc1, dialogMode);
        };

        // Move
        function step7(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
            desc1.putReference(cTID('null'), ref1);
            var ref2 = new ActionReference();
            ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Prvs'));
            desc1.putReference(cTID('T   '), ref2);
            executeAction(cTID('move'), desc1, dialogMode);
        };

        // step1(1, 1); // Make
        step1(); // Make
        step2(); // Set
        step3(); // Make
        step4(); // Move
        step5(); // Move Out Point
        step6(); // Move In Point
        step7(); // Move

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// AnimD2_newVideoGroup.main
//=========================================
//

AnimD2_newVideoGroup.main = function() {
    AnimD2_newVideoGroup();
};

//AnimD2_newVideoGroup.main();
app.activeDocument.suspendHistory(localize(locNewVideoGroup), 'AnimD2_newVideoGroup.main()');

// EOF

"AAAnimD2_newVideoGroup.jsx"
// EOF