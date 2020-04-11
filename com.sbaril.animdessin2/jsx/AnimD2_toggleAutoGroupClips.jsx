// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

// Call main function from getselected, we can reuse scripts
var ScriptFilePath = Folder($.fileName).parent.fsName;
$.evalFile(new File(ScriptFilePath + '/AnimD2_applyToAllLayers.jsx'));

///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////


function cTID(s) {
    return app.charIDToTypeID(s);
};

function sTID(s) {
    return app.stringIDToTypeID(s);
};

//
//==================== AnimD2_toggleAutoGroupClips ==============
//

// Call function from Function test
function testCall() {
    alert("call Function from Function");
}
applySelected(testCall);



// var desc6 = new ActionDescriptor();
// desc6.putInteger( sTID('commandID'), 4457 );
// alert(desc6.putInteger(cTID('commandID'), 4457 ))
// // desc6.putBoolean( sTID('kcanDispatchWhileModal'), true );
// executeAction( sTID('invokeCommand'), desc6, DialogModes.NO );

// function AnimD2_toggleAutoGroupClips() {
//     // app.runMenuItem(stringIDToTypeID('EnableAutoGroupingOfClips'));

//     var idslct = charIDToTypeID( 'slct' );
//       var desc444 = new ActionDescriptor();
//       var idnull = charIDToTypeID( 'null' );
//       var ref385 = new ActionReference();
//       var idMnspsp = charIDToTypeID( 'Mn  ' );
//       var idMnIt = charIDToTypeID( 'MnIt' );
//       // var idtimelineEnableOnionSkins = stringIDToTypeID( 'timelineEnableAutoGrouping' );
//       var idtimelineEnableOnionSkins = stringIDToTypeID( 'EnableAutoGroupingOfClips' );
//       ref385.putEnumerated( idMnspsp, idMnIt, idtimelineEnableOnionSkins );
//       desc444.putReference( idnull, ref385 ); executeAction( idslct, desc444, DialogModes.ALL ); 

//     // var idslct = charIDToTypeID( 'slct' );
//     // var desc445 = new ActionDescriptor();
//     // var idnull = charIDToTypeID( 'null' );
//     // var ref386 = new ActionReference();
//     // var idMnspsp = charIDToTypeID( 'Mn  ' );
//     // var idMnIt = charIDToTypeID( 'MnIt' );
//     // var ididtimelineEnableShortcutKeys = stringIDToTypeID( 'EnableAutoGroupingOfClips' );
//     // ref386.putEnumerated( idMnspsp, idMnIt, ididtimelineEnableShortcutKeys );
//     // desc445.putReference( idnull, ref386 ); executeAction( idslct, desc445, DialogModes.ALL ); 

// };

// function AnimD2_toggleAutoGroupClips() {
//_SLCFix
// var desc8 = new ActionDescriptor();
// desc8.putInteger( sTID('commandID'), 4457 );
// desc8.putBoolean( sTID('kcanDispatchWhileModal'), true );
// executeAction( sTID('invokeCommand'), desc8, DialogModes.NO );

// scriptlistener
//     var idinvokeCommand = stringIDToTypeID( "invokeCommand" );
//     var desc11 = new ActionDescriptor();
//     var idcommandID = stringIDToTypeID( "commandID" );
//     desc11.putInteger( idcommandID, 4457 );
//     var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
//     desc11.putBoolean( idkcanDispatchWhileModal, true );
// executeAction( idinvokeCommand, desc11, DialogModes.NO );
// function cTID(s) { return app.charIDToTypeID(s); };
// function sTID(s) { return app.stringIDToTypeID(s); };

//   var desc40 = new ActionDescriptor();
//   desc40.putInteger( sTID('commandID'), 4439 );
//   desc40.putBoolean( sTID('kcanDispatchWhileModal'), true );
//   executeAction( sTID('invokeCommand'), desc40, DialogModes.NO );
// function step1(enabled, withDialog) {
//   if (enabled != undefined && !enabled)
//     return;
//   //   alert("asdas")
//   // var desc91 = new ActionDescriptor();
//   // desc91.putInteger( cTID('Lvl '), 0 );
//   // desc91.putEnumerated( cTID('Stte'), cTID('Stte'), sTID('exit') );
//   // desc91.putBoolean( sTID('kcanDispatchWhileModal'), true );
//   // desc91.putString( cTID('Ttl '), "Timeline Frame Rate" );
//   // executeAction( sTID('modalStateChanged'), desc91, DialogModes.NO );
//   // var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
//   // var desc1 = new ActionDescriptor();
//   // var ref1 = new ActionReference();
//   // ref1.putEnumerated(cTID('Mn  '), cTID('Ttl'), cTID('Timeline Frame Rate'));
//   // desc1.putReference(cTID('null'), ref1);
//   // executeAction(cTID('slct'), desc1, dialogMode);
//   app.runMenuItem(stringIDToTypeID('Timeline Frame Rate'));
// try {
//   var idslct = charIDToTypeID( 'slct' ); 
//   var desc441 = new ActionDescriptor(); 
//   var idnull = charIDToTypeID( 'null' ); 
//   var ref382 = new ActionReference(); 
//   var idMnspsp = charIDToTypeID( 'Mn ' ); 
//   var idMnIt = charIDToTypeID( 'MnIt' ); 
//   var idtimelineDocumentSettings = stringIDToTypeID( 'timelineDocumentSettings' ); 
//   ref382.putEnumerated( idMnspsp, idMnIt, idtimelineDocumentSettings ); 
//   desc441.putReference( idnull, ref382 ); 
//   executeAction( idslct, desc441, DialogModes.ALL );


//   } catch(e) {
//     alert(e)
//       if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;} 
//       else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));
//       }
//   }





//=========================================
// AnimD2_toggleAutoGroupClips.main
//=========================================
//

// AnimD2_toggleAutoGroupClips.main = function () {
//   AnimD2_toggleAutoGroupClips();
// };

// //AnimD2_toggleAutoGroupClips.main();
// app.activeDocument.suspendHistory("Toggle Auto-Grouping of Clips", 'AnimD2_toggleAutoGroupClips.main()');

// EOF

"AnimD2_toggleAutoGroupClips.jsx"
// EOF