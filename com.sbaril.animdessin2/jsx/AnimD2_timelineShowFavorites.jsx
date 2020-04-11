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
//==================== AnimD2_timelineShowFavorites ==============
//
function AnimD2_timelineShowFavorites() {
    app.runMenuItem(stringIDToTypeID('timelineShowFavoriteLayers'));
};


//=========================================
// AnimD2_timelineShowFavorites.main
//=========================================
//

AnimD2_timelineShowFavorites.main = function () {
  AnimD2_timelineShowFavorites();
};

//AnimD2_timelineShowFavorites.main();
app.activeDocument.suspendHistory("Timeline Show Favorite", 'AnimD2_timelineShowFavorites.main()');

// EOF

"AnimD2_timelineShowFavorites.jsx"
// EOF
