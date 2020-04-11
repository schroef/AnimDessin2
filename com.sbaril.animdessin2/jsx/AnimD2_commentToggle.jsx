// #target photoshop
//
// AnimD2T_commentHide.jsx
//

//
// Generated Wed Mar 24 2020 00;45
//

//
//==================== AnimD2T_commentToggle ==============
//
// function AnimD2T_commentToggle() {
// try {  
  // var idinvokeCommand = stringIDToTypeID( "invokeCommand" );
  // var desc7 = new ActionDescriptor();
  // var idcommandID = stringIDToTypeID( "commandID" );
  // desc7.putInteger( idcommandID, 4439 );
  // var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
  // desc7.putBoolean( idkcanDispatchWhileModal, true );
  // executeAction( idinvokeCommand, desc7, DialogModes.NO );

  var idinvokeCommand = stringIDToTypeID( "invokeCommand" );
  var desc6 = new ActionDescriptor();
  var idcommandID = stringIDToTypeID( "commandID" );
  desc6.putInteger( idcommandID, 4439 );
  var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
  desc6.putBoolean( idkcanDispatchWhileModal, true );
  // executeAction( idinvokeCommand, desc6, DialogModes.NO );
  executeAction(desc6, DialogModes.NO );
// } catch(e){
//   alert(e)
// }
// };



//=========================================
// AnimD2T_commentToggle.main
//=========================================
//

// AnimD2T_commentToggle.main = function () {
// AnimD2T_commentToggle();
// };

//AnimD2T_commentToggle.main();
// app.activeDocument.suspendHistory("Add or Edit a Timeline Comment", 'AnimD2T_commentToggle.main()');

// EOF

// "AnimD2T_commentHide.jsx"
// EOF
