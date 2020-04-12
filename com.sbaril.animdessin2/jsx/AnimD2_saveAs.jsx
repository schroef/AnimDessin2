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

ErrStrs = {};
ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
try {
    // https://community.adobe.com/t5/photoshop/javascript-for-quot-save-as-quot-dialog-prompt-in-photshop/m-p/10355890?page=1
    aD = app.activeDocument;
    displayDialogs = DialogModes.NO, aD.save(File(aD.fullName)), displayDialogs = DialogModes.NO

// Allows for cancel without feedback message
} catch (e) {
    if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
    else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
}
