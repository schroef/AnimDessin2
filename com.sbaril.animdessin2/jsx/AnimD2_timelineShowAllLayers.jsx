// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

//
// Generated Wed Mar 26 2020 19:14 AST
//


//
//==================== AnimD2_timelineShowAllLayers ==============
//
function AnimD2_timelineShowAllLayers() {
    app.runMenuItem(stringIDToTypeID('timelineShowAllLayers'));
};

//=========================================
// AnimD2_timelineShowAllLayers.main
//=========================================
//

AnimD2_timelineShowAllLayers.main = function () {
  AnimD2_timelineShowAllLayers();
};

//AnimD2_timelineShowAllLayers.main();
app.activeDocument.suspendHistory("Timeline Show All Layers", 'AnimD2_timelineShowAllLayers.main()');

// EOF

"AnimD2_timelineShowAllLayers.jsx"
// EOF
