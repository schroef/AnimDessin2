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

function cTID(s) {return app.charIDToTypeID(s);};
function sTID(s) {return app.stringIDToTypeID(s);};

function AnimD2_colorNoneFxHideAll() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var desc149 = new ActionDescriptor();
        var ref71 = new ActionReference();
        ref71.putProperty(cTID('Prpr'), cTID('lfxv'));
        ref71.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
        desc149.putReference(cTID('null'), ref71);

        var desc150 = new ActionDescriptor();
        desc150.putBoolean(cTID('lfxv'), false);
        desc149.putObject(cTID('T   '), cTID('lfxv'), desc150);
        executeAction(cTID('setd'), desc149, DialogModes.NO);

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// AnimD2_colorNoneFxHideAll.main
//=========================================
//

AnimD2_colorNoneFxHideAll.main = function() {
    AnimD2_colorNoneFxHideAll();
};

app.activeDocument.suspendHistory(localize(locColorNoneFXHideAll), 'AnimD2_colorNoneFxHideAll.main()');