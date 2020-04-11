//
// AnimD2_setTimelinePanelOptions.jsx
//

//
// Generated Wed Mar 26 2020 19:14 AST
//
#target photoshop;

//Make Photoshop the front most application
app.bringToFront();



//
//==================== AnimD2_setTimelinePanelOptions ==============
//
function AnimD2_setTimelinePanelOptions() {
    // app.runMenuItem(stringIDToTypeID('timelineGoToTime'));
    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try {
      app.runMenuItem(stringIDToTypeID('timelinePaletteOptions'));
      // var idslct = charIDToTypeID( 'slct' );
      // var desc444 = new ActionDescriptor();
      // var idnull = charIDToTypeID( 'null' );
      // var ref385 = new ActionReference();
      // var idMnspsp = charIDToTypeID( 'Mn  ' );
      // var idMnIt = charIDToTypeID( 'MnIt' );
      // // var idtimelineEnableOnionSkins = stringIDToTypeID( 'timelineEnableAutoGrouping' );
      // var idtimelineEnableOnionSkins = stringIDToTypeID( 'timelinePaletteOptions' );
      // ref385.putEnumerated( idMnspsp, idMnIt, idtimelineEnableOnionSkins );
      // desc444.putReference( idnull, ref385 ); executeAction( idslct, desc444, DialogModes.ALL ); 
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;} 
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};



//=========================================
// AnimD2_setTimelinePanelOptions.main
//=========================================
//

AnimD2_setTimelinePanelOptions.main = function () {
  AnimD2_setTimelinePanelOptions();
};

//AnimD2_setTimelinePanelOptions.main();
app.activeDocument.suspendHistory("Set timeline Panel Options", 'AnimD2_setTimelinePanelOptions.main()');

// EOF

"AnimD2_setTimelinePanelOptions.jsx"
// EOF
