// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

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

function colorGlobalHide() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var idHd = charIDToTypeID("Hd  ");
        var desc11 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var list6 = new ActionList();
        var ref8 = new ActionReference();
        var idSoFi = charIDToTypeID("SoFi");
        ref8.putIndex(idSoFi, 1);
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref8.putEnumerated(idLyr, idOrdn, idTrgt);
        list6.putReference(ref8);
        desc11.putList(idnull, list6);
        executeAction(idHd, desc11, DialogModes.NO);

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// colorGlobalHide.main
//=========================================
//

colorGlobalHide.main = function() {
    // colorGlobalHide();
    applyToAllLayers(colorGlobalHide);
};

app.activeDocument.suspendHistory(localize(locColorGlobalHide), 'colorGlobalHide.main()');