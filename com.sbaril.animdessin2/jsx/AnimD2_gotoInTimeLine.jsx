//
// AnimD2_gotoInTimeLine.jsx
//

//
// Generated Wed Mar 26 2020 19:14 AST
//
#target photoshop;

//Make Photoshop the front most application
app.bringToFront();



//
//==================== AnimD2_gotoInTimeLine ==============
//
function AnimD2_gotoInTimeLine() {
    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try {
      app.runMenuItem(stringIDToTypeID('timelineGoToTime'));
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;} 
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};



//=========================================
//                    AnimD2_gotoInTimeLine.main
//=========================================
//

AnimD2_gotoInTimeLine.main = function () {
  AnimD2_gotoInTimeLine();
};

//AnimD2_gotoInTimeLine.main();
app.activeDocument.suspendHistory("Go to in Timeline", 'AnimD2_gotoInTimeLine.main()');

// EOF

"AnimD2_gotoInTimeLine.jsx"
// EOF
