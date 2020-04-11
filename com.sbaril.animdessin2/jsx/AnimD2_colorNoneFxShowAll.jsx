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
    var desc154 = new ActionDescriptor();
    var ref72 = new ActionReference();
    ref72.putProperty(cTID('Prpr'), cTID('lfxv'));
    ref72.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
    desc154.putReference(cTID('null'), ref72);
    var desc155 = new ActionDescriptor();
    desc155.putBoolean(cTID('lfxv'), true);
    desc154.putObject(cTID('T   '), cTID('lfxv'), desc155);
    executeAction(cTID('setd'), desc154, DialogModes.NO);
};

//=========================================
// AnimD2_colorNoneFxShowAll.main
//=========================================
//

AnimD2_colorNoneFxShowAll.main = function() {
    AnimD2_colorNoneFxShowAll();
};

app.activeDocument.suspendHistory("Show all layers Effects", 'AnimD2_colorNoneFxShowAll.main()');