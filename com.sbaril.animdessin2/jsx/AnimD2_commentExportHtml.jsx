﻿#target photoshop 
//
// AnimD2T_commentExportHtml.jsx
//

//
// Generated Fri May 16 2014 13:30:45 GMT+0200
//

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

//
//==================== AnimD2T_commentExportHtml ==============
//
function AnimD2T_commentExportHtml() {
  // Select
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("exportTimelineCommentsAsHTML"));
    desc1.putReference(cTID('null'), ref1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  step1();      // Select
};



//=========================================
// AnimD2T_commentExportHtml.main
//=========================================
//

AnimD2T_commentExportHtml.main = function () {
  AnimD2T_commentExportHtml();
};

AnimD2T_commentExportHtml.main();
//app.activeDocument.suspendHistory("Export Timeline Comments as HTML…", 'AnimD2T_commentExportHtml.main()');

// EOF

"AnimD2T_commentExportHtml.jsx"
// EOF
