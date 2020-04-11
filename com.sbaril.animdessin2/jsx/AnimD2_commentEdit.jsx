#target photoshop
//
// AnimD2T_commentEdit.jsx
//

//
// Generated Fri May 16 2014 13:28:26 GMT+0200
//

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

//
//==================== AnimD2T_commentEdit ==============
//
function AnimD2T_commentEdit() {
  ErrStrs = {}; 
  ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
  // Select
  try {
    // function step1(enabled, withDialog) {
    //   if (enabled != undefined && !enabled)
    //     return;
    //   var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("timelineEditTimelineComment"));
      desc1.putReference(cTID('null'), ref1);
      executeAction(cTID('slct'), desc1, DialogModes.ALL);
    // };
  } catch(e){
    if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
    else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }

  // step1();      // Select
};



//=========================================
// AnimD2T_commentEdit.main
//=========================================
//

AnimD2T_commentEdit.main = function () {
  AnimD2T_commentEdit();
};

//AnimD2T_commentEdit.main();
app.activeDocument.suspendHistory("Add or Edit a Timeline Comment", 'AnimD2T_commentEdit.main()');

// EOF

"AnimD2T_commentEdit.jsx"
// EOF
