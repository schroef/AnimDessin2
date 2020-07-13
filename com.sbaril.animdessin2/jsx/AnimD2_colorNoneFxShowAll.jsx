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

function cTID(s) {return app.charIDToTypeID(s);};
function sTID(s) {return app.stringIDToTypeID(s);};

function AnimD2_colorNoneFxShowAll() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try{ 
        var desc154 = new ActionDescriptor();
        var ref72 = new ActionReference();
        ref72.putProperty(cTID('Prpr'), cTID('lfxv'));
        ref72.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
        desc154.putReference(cTID('null'), ref72);
        var desc155 = new ActionDescriptor();
        desc155.putBoolean(cTID('lfxv'), true);
        desc154.putObject(cTID('T   '), cTID('lfxv'), desc155);
        executeAction(cTID('setd'), desc154, DialogModes.NO);

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// AnimD2_colorNoneFxShowAll.main
//=========================================
//

AnimD2_colorNoneFxShowAll.main = function() {
    AnimD2_colorNoneFxShowAll();
};

app.activeDocument.suspendHistory(localize(locColorNoneFXShowAll), 'AnimD2_colorNoneFxShowAll.main()');