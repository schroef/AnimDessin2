// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

//
// Generated Wed May 14 2014 16:13:27 GMT+0200
//

//
//==================== AnimD2_newVideoGroupSelection ==============
//
function AnimD2_newVideoGroupSelection() {
    var idMk = charIDToTypeID("Mk  ");
    var desc216 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref114 = new ActionReference();
    var idsceneSection = stringIDToTypeID("sceneSection");
    ref114.putClass(idsceneSection);
    desc216.putReference(idnull, ref114);
    var idFrom = charIDToTypeID("From");
    var ref115 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref115.putEnumerated(idLyr, idOrdn, idTrgt);
    desc216.putReference(idFrom, ref115);
    var idlayerSectionStart = stringIDToTypeID("layerSectionStart");
    desc216.putInteger(idlayerSectionStart, 45);
    var idlayerSectionEnd = stringIDToTypeID("layerSectionEnd");
    desc216.putInteger(idlayerSectionEnd, 46);
    var idNm = charIDToTypeID("Nm  ");
    desc216.putString(idNm, ""
        "Video Group 1"
        "");
    executeAction(idMk, desc216, DialogModes.NO);
};

//=========================================
// AnimD2_newVideoGroupSelection.main
//=========================================
//

AnimD2_newVideoGroupSelection.main = function() {
    AnimD2_newVideoGroupSelection();
};

//AnimD2_newVideoGroupSelection.main();
app.activeDocument.suspendHistory("New Video Group from Selection", 'AnimD2_newVideoGroupSelection.main()');

// EOF

"AAAnimD2_newVideoGroupSelection.jsx"
// EOF