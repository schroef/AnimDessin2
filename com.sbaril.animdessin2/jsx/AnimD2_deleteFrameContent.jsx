// Updated 2020
// Modified on October 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop;

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

// Call main function from getselected, we can reuse scripts
var ScriptFilePath = Folder($.fileName).parent.fsName;
$.evalFile(new File(ScriptFilePath + '/AnimD2_applyToAllLayers.jsx'));

//
// AnimD2T_deleteFrameContent.jsx
//

//
// Generated Sat Oct 31 2020 11:36 GMT-0400
//

cTID = function(s) {return app.charIDToTypeID(s);};
sTID = function(s) {return app.stringIDToTypeID(s);};
// alert(timelineCurrentFrame()!==0)
// if (timelineCurrentFrame()!==0)var setTime = timelineCurrentFrame()+1;

// Select bottom layer
function selFirstLyr() {
    var desc99 = new ActionDescriptor();
    var ref55 = new ActionReference();
    ref55.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Back'));
    desc99.putReference(cTID('null'), ref55);
    desc99.putBoolean(cTID('MkVs'), false);
    var list26 = new ActionList();
    list26.putInteger(1);
    desc99.putList(cTID('LyrI'), list26);
    executeAction(cTID('slct'), desc99, DialogModes.NO);
}

if (timelineCurrentFrame()!==0) {
    var setTime = timelineCurrentFrame()+1;
} else {
    var setTime = timelineCurrentFrame();
}
// alert(setTime)
// playheadActiveFr()
// Set Playhead active frame
function playheadActiveFr(){
    var desc5 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty( cTID('Prpr'), sTID('time') );
    ref1.putClass( sTID('timeline') );
    desc5.putReference( cTID('null'), ref1 );
    var desc6 = new ActionDescriptor();
    desc6.putInteger( sTID('seconds'), 0 );
    // desc6.putInteger( sTID('frame'), timelineCurrentFrame()+setTime );
    desc6.putInteger( sTID('frame'), timelineCurrentFrame()+1 ); // Works but timeindicator needs to be at first active frame
    desc6.putDouble( sTID('frameRate'), Number(GetFrameRate()) );
    desc5.putObject( cTID('T   '), sTID('timecode'), desc6 );
    executeAction( cTID('setd'), desc5, DialogModes.NO );
}
// Playhead Next Frame
function plyHeadNextFr() {
    var desc37 = new ActionDescriptor();
    var ref19 = new ActionReference();
    ref19.putProperty(cTID('Prpr'), sTID('time'));
    ref19.putClass(sTID('timeline'));
    desc37.putReference(cTID('null'), ref19);
    var desc38 = new ActionDescriptor();
    desc38.putInteger(sTID('seconds'), 0);
    desc38.putInteger(sTID('frame'), 3);
    desc38.putDouble(sTID('frameRate'), 24.000000);
    desc37.putObject(cTID('T   '), sTID('timecode'), desc38);
    executeAction(cTID('setd'), desc37, DialogModes.NO);
}
// plyHeadNextFr() 
// selFirstLyr()
//
//==================== AnimD2_deleteFrameContent ==============
//
function AnimD2_deleteFrameContent() {
    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    // try {

     
    // Select All
    var desc16 = new ActionDescriptor();
    var ref8 = new ActionReference();
    ref8.putProperty(cTID('Chnl'), cTID('fsel'));
    desc16.putReference(cTID('null'), ref8);
    desc16.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('Al  '));
    executeAction(cTID('setd'), desc16, DialogModes.NO);

    // Clear/Delete All
    executeAction(cTID('Dlt '), undefined, DialogModes.NO);

    // Clear Selection
    var desc67 = new ActionDescriptor();
    var ref13 = new ActionReference();
    ref13.putProperty(cTID('Chnl'), cTID('fsel'));
    desc67.putReference(cTID('null'), ref13);
    desc67.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
    executeAction(cTID('setd'), desc67, DialogModes.NO);

    
    // Next Frame
    function step2(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putBoolean(sTID("toNextWholeSecond"), false);
        executeAction(sTID('nextFrame'), desc1, dialogMode);
    }
    // playheadActiveFr()    
    // step2(); // Next Frame
    // playheadActiveFr()      
 
    
    // Allows for cancel without feedback message
    //     } catch(e){
    //         if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
    //         else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    //   }    

};


//=========================================
// AnimD2_deleteFrameContent.main
//=========================================
//

AnimD2_deleteFrameContent.main = function() {
    // AnimD2_deleteFrameContent();
    applyToAllLayers(AnimD2_deleteFrameContent);
};

app.activeDocument.suspendHistory(localize(locDeleteFrameContent), 'AnimD2_deleteFrameContent.main()');

// EOF

"AnimD2T_deleteFrameContent.jsx"
// EOF