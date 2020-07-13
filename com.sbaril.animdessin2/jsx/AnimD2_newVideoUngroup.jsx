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
// Generated Wed May 14 2014 16:13:27 GMT+0200
//

//
//==================== AnimD2_newVideoGroupSelection ==============
//
function AnimD2_newVideoGroupSelection() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        app.runMenuItem(stringIDToTypeID('ungroupLayersEvent'));

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// AnimD2_newVideoGroupSelection.main
//=========================================
//

AnimD2_newVideoGroupSelection.main = function() {
    AnimD2_newVideoGroupSelection();
};

//AnimD2_newVideoGroupSelection.main();
app.activeDocument.suspendHistory(localize(locNewVideoUngroup), 'AnimD2_newVideoGroupSelection.main()');

// EOF

"AAAnimD2_newVideoGroupSelection.jsx"
// EOF