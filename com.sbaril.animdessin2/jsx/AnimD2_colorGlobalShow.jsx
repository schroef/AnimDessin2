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

function colorGlobalShow() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Show Color
        var idShw = charIDToTypeID("Shw ");
        var desc271 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var list50 = new ActionList();
        var ref116 = new ActionReference();
        var idSoFi = charIDToTypeID("SoFi");
        ref116.putIndex(idSoFi, 1);
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref116.putEnumerated(idLyr, idOrdn, idTrgt);
        list50.putReference(ref116);
        desc271.putList(idnull, list50);
        executeAction(idShw, desc271, DialogModes.NO);

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// colorGlobalShow.main
//=========================================
//

colorGlobalShow.main = function() {
    applyToAllLayers(colorGlobalShow);
    // colorGlobalShow();
};

app.activeDocument.suspendHistory(localize(locColorGlobalShow), 'colorGlobalShow.main()');