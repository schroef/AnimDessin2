// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools�) by St�phane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

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

if (isMac()) {
    os = "Mac";
} else {
    os = "Windows";
}

function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeI(s); };

var layerInfo = applyToAllLayersInfo(docRef) 

function splitToFramesGroup() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    // try {
        // // Split at playhead
        // var idsplitVideoLayer = stringIDToTypeID( "splitVideoLayer" );
        // var desc75 = new ActionDescriptor();
        // executeAction( idsplitVideoLayer, desc75, DialogModes.NO );

        // Group into video group
        function ftn1() {

            var desc40 = new ActionDescriptor();
            var ref18 = new ActionReference();
            ref18.putClass( sTID('sceneSection') );
            desc40.putReference( cTID('null'), ref18 );
            var ref19 = new ActionReference();
            ref19.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
            desc40.putReference( cTID('From'), ref19 );
            desc40.putInteger( sTID('layerSectionStart'), layerInfo[0].lyrIndex );
            desc40.putInteger( sTID('layerSectionEnd'), layerInfo[0].lyrIndex );
            desc40.putString( cTID('Nm  '), "Video Group 1" );
            executeAction( cTID('Mk  '), desc40, DialogModes.NO );
        };
        
        function splitNewDoc(frStep){
            // try {
                // gotoFrame(sttFrm); 
                // alert(typeof(os))
                var startFr = timelineCurrentFrame();
                // alert(startFr)
                // alert(totFrm)D
                var curFrm = 0;
                var totFrm = timelineFrameCount();

                // alert(sttFrm)
                for (curFrm=startFr;curFrm < totFrm; curFrm++){
                    gotoFrame((curFrm * frStep))

                    // Cut ttimeline
                    var desc73 = new ActionDescriptor();
                    executeAction( sTID('splitVideoLayer'), desc73, DialogModes.NO );
                }
            // } catch(e){
            //     alert(e)
            // }
        }
        // keyPress(os)
        // 123 left
        // 124 right
        // 126 up
        // 125 down
        // 116 PgUp
        // 121 PgDn
        // 115 Home
        // 119 End
        // app.system( 'osascript -e \'tell application "System Events" to key code "116\"' ); 
        // app.system( 'osascript -e \'tell application "System Events" to key code "126"\' {shift down}' ); 
        ftn1()
        // Select single layer by if > orignal selected layer
        selectById(layerInfo[0].AMid);
        var sttFrm = timelineCurrentFrame();
        // app.system( 'osascript -e \'tell application \"System Events\" to key code 126\'' ); 
        // $.sleep (2000);
        // alert(sttFrm)
        // Select initial layer again > add tp select
        // selLyr(layerInfo[0].lyrIndex, 1);
        splitNewDoc(1)
        // gotoFrame(layerInfo[0].lyrIndex)
        gotoFrame(sttFrm)
        // selectById(layerInfo.length);
        

    // Allows for cancel without feedback message
//     } catch(e){
//         if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
//         else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
//   }
};




//=========================================
// splitToFramesGroup.main
//=========================================
//

// splitToFramesGroup.main = function() {
//     // splitToFramesGroup();
//     applyToAllLayers(splitToFramesGroup);
// };
splitToFramesGroup()
// app.activeDocument.suspendHistory(localize(locSplitToFramesGroup), 'splitToFramesGroup.main()');
// app.system( 'osascript -e \'tell application \"System Events\" to key code 123\'' ); 