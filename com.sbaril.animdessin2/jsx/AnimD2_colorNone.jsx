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

function cTID(s) {return app.charIDToTypeID(s);};
function sTID(s) {return app.stringIDToTypeID(s);};

function colorNone() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");

    try {
        // =======================================================
        // Clear all overlay fx
        var desc597 = new ActionDescriptor();
        var ref377 = new ActionReference();
        ref377.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
        desc597.putReference( cTID('null'), ref377 );
        executeAction( sTID('disableLayerStyle'), desc597, DialogModes.NO );

    // Separated this, runs into issue when layers dont have layer color applied
    
        // Clear red layer color
        var desc306 = new ActionDescriptor();
        var ref120 = new ActionReference();
        ref120.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc306.putReference(cTID('null'), ref120);
        var desc307 = new ActionDescriptor();
        desc307.putEnumerated(cTID('Clr '), cTID('Clr '), cTID('None'));
        desc306.putObject(cTID('T   '), cTID('Lyr '), desc307);
        executeAction(cTID('setd'), desc306, DialogModes.NO);

    
    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};
//=========================================
// colorNone.main
//=========================================
//

colorNone.main = function() {
    colorNone();
    // applyToAllLayers(colorNone);
};

app.activeDocument.suspendHistory(localize(locColorNone), 'colorNone.main()');