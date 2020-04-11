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

cTID = function(s) {
    return app.charIDToTypeID(s);
};
sTID = function(s) {
    return app.stringIDToTypeID(s);
};

//
//==================== AnimD2_canvasRealSize ==============
//
function AnimD2_canvasRealSize() {
    // =======================================================
    // Select
    function step1(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('ActP'));
        desc1.putReference(cTID('null'), ref1);
        executeAction(cTID('slct'), desc1, dialogMode);
    };
    step1(); // Select
};



//=========================================
// AnimD2_canvasRealSize.main
//=========================================
//

AnimD2_canvasRealSize.main = function() {
    AnimD2_canvasRealSize();
};

AnimD2_canvasRealSize.main();

// EOF

"AnimD2_canvasRealSize.jsx"
// EOF