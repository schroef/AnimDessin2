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

function colorBlue() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // =======================================================
        // Add Blue Overlay to Later
        var desc30 = new ActionDescriptor();
        var ref10 = new ActionReference();
        ref10.putProperty(cTID('Prpr'), cTID('Lefx'));
        ref10.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc30.putReference(cTID('null'), ref10);
        var desc31 = new ActionDescriptor();
        desc31.putUnitDouble(cTID('Scl '), cTID('#Prc'), 100.000000);
        var desc32 = new ActionDescriptor();
        desc32.putBoolean(cTID('enab'), true);
        desc32.putBoolean(sTID('present'), true);
        desc32.putBoolean(sTID('showInDialog'), true);
        desc32.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
        var desc33 = new ActionDescriptor();
        desc33.putDouble(cTID('Rd  '), 0.000000);
        desc33.putDouble(cTID('Grn '), 6.000000);
        desc33.putDouble(cTID('Bl  '), 255.000000);
        desc32.putObject(cTID('Clr '), cTID('RGBC'), desc33);
        desc32.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100.000000);
        desc31.putObject(cTID('SoFi'), cTID('SoFi'), desc32);
        desc30.putObject(cTID('T   '), cTID('Lefx'), desc31);
        executeAction(cTID('setd'), desc30, DialogModes.NO);

        // =======================================================
        // Set Layer Color to Blue
        var desc24 = new ActionDescriptor();
        var ref9 = new ActionReference();
        ref9.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc24.putReference(cTID('null'), ref9);
        var desc25 = new ActionDescriptor();
        desc25.putEnumerated(cTID('Clr '), cTID('Clr '), cTID('Bl  '));
        desc24.putObject(cTID('T   '), cTID('Lyr '), desc25);
        executeAction(cTID('setd'), desc24, DialogModes.NO);

        // =======================================================
        // Collaps FX for cleaner look
        var desc41 = new ActionDescriptor();
        executeAction( sTID('collapseAllGroupsEvent'), desc41, DialogModes.NO );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// colorBlue.main
//=========================================
//

colorBlue.main = function() {
    applyToAllLayers(colorBlue);
};

app.activeDocument.suspendHistory(localize(locColorBlue), 'colorBlue.main()');