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
    app.runMenuItem(stringIDToTypeID('ungroupLayersEvent'));
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