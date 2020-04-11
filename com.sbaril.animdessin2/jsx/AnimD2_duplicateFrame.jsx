﻿#target photoshop 
//
// AAAnimD2_duplicateFrame.jsx
//

//
// Generated Wed May 14 2014 16:13:43 GMT+0200
//

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

//
//==================== AnimD2_duplicateFrame ==============
//
function AnimD2_duplicateFrame() {
  // Duplicate
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putInteger(cTID('Vrsn'), 5);
    executeAction(cTID('Dplc'), desc1, dialogMode);
  };

  // Next Frame
  function step2(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(sTID("toNextWholeSecond"), false);
    executeAction(sTID('nextFrame'), desc1, dialogMode);
  };

  step1();      // Duplicate
  step2();      // Next Frame
};



//=========================================
// AnimD2_duplicateFrame.main
//=========================================
//

AnimD2_duplicateFrame.main = function () {
  AnimD2_duplicateFrame();
};

//AnimD2_duplicateFrame.main();
app.activeDocument.suspendHistory("Duplicate Frame", 'AnimD2_duplicateFrame.main()');

// EOF

"AAAnimD2_duplicateFrame.jsx"
// EOF
