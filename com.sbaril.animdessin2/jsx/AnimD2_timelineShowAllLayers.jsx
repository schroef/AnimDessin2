#target photoshop
//
// AnimD2_timelineShowAllLayers.jsx
//

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
//                    AnimD2_timelineShowAllLayers.main
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
