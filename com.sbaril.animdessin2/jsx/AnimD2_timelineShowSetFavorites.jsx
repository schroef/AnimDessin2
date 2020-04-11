#target photoshop
//
// AnimD2_timelineShowSetFavorites.jsx
//

//
// Generated Wed Mar 26 2020 19:14 AST
//


//
//==================== AnimD2_timelineShowSetFavorites ==============
//
function AnimD2_timelineShowSetFavorites() {
    app.runMenuItem(stringIDToTypeID('timelineShowSetFavoriteLayers'));
};



//=========================================
// AnimD2_timelineShowSetFavorites.main
//=========================================
//

AnimD2_timelineShowSetFavorites.main = function () {
  AnimD2_timelineShowSetFavorites();
};

//AnimD2_timelineShowSetFavorites.main();
app.activeDocument.suspendHistory("Timeline Show Set Favorite", 'AnimD2_timelineShowSetFavorites.main()');

// EOF

"AnimD2_timelineShowSetFavorites.jsx"
// EOF
