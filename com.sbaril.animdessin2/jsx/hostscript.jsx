/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


//Evaluate a file and catch the exception.
function evalFile(path) {
    try {
        $.evalFile(path);
    } catch (e) {
        alert("Exception:" + e);
    }
}



function sayHello() {
    alert("hello from ExendScript");
}
function checkOpenDoc(){
    if (app.documents.length == 0){
        // alert("no document available")
        return false
    } else {
        return true
    }
}
function countLayers() {
    // alert("Somehow keeps running")
    // alert(app.documents.length)
    try {
    // if (app.documents.length != 0) {
        // if (app.activeDocument > 0) {
            docRef = app.activeDocument;
            var selectedLayers = new Array()
            var ref = new ActionReference()
            // get a number list of selected artLayers in the document
            ref.putProperty(app.charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"))
            ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
            // what do I want to do this this list? Define an description of an action.
            var desc = executeActionGet(ref)
            // if the selected object has the "Target Layers" key (only works CS4+)
            if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
                desc = desc.getList(stringIDToTypeID("targetLayers"))
                var c = desc.count
                var selectedLayers = [] // for each
                for (var i = 0; i < c; i++) {
                    var lyr = {}
                    var lyrIndex;
                    try {
                        docRef.backgroundLayer // try to select a background layer, if I can then adjust the index counting. (Background layers change index counitng of all layers by 1)
                        // selectedLayers.push(desc.getReference(i).getIndex())
                        lyrIndex = desc.getReference(i).getIndex();
                    } catch (e) {
                        // console.log("Error: " + e)
                        // selectedLayers.push(desc.getReference(i).getIndex() + 1)
                        lyrIndex = desc.getReference(i).getIndex() + 1;
                    }

                    // Added from getLayerInfo
                    var lyrRef = new ActionReference();
                    lyrRef.putIndex(charIDToTypeID("Lyr "), lyrIndex)
                    var lyrDesc = executeActionGet(lyrRef);
                    var Id = lyrDesc.getInteger(stringIDToTypeID("layerID"));
                    lyr.AMid = Id;
                    lyr.lyrIndex = lyrIndex;
                    selectedLayers.push(lyr);
                }
            }
            return selectedLayers.length
    } catch (e) {
    //     console.log("Error: " + e)
}
}
// var layers = countLayers(docRef)

// =======================================================
// Function to get the framerate of the actual documment
function GetFrameRate() {
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("documentTimelineSettings"));
    ref.putClass(stringIDToTypeID("timeline"));
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID('null'), ref);
    var resultDesc = executeAction(charIDToTypeID('getd'), desc, DialogModes.NO);

    return resultDesc.getDouble(stringIDToTypeID('frameRate'));
};

// Paul Riggot
function getTimelineLength() {
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('duration'));
    ref.putClass(stringIDToTypeID('timeline'));
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID('null'), ref);
    var TC = executeAction(charIDToTypeID('getd'), desc, DialogModes.NO);
    TC = TC.getObjectValue(stringIDToTypeID('duration'));
    var M = 0;
    try {
        M = TC.getInteger(stringIDToTypeID('minutes'));
    } catch (e) {}
    var S = 0;
    try {
        S = TC.getInteger(stringIDToTypeID('seconds'));
    } catch (e) {}
    var F = TC.getInteger(stringIDToTypeID('frame'));
    var F = TC.getInteger(stringIDToTypeID('frame'));
    var FR = TC.getInteger(stringIDToTypeID('frameRate'));
    var A = new Array();
    A.push([
        [M],
        [S],
        [F],
        [FR]
    ]);
    return A;
}

// Paul Riggot
function gotoFrame(Frame) {
    frameRate = GetFrameRate();
    var desc69 = new ActionDescriptor();
    var ref33 = new ActionReference();
    ref33.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('time'));
    ref33.putClass(stringIDToTypeID('timeline'));
    desc69.putReference(charIDToTypeID('null'), ref33);
    var desc70 = new ActionDescriptor();
    // desc70.putInteger(stringIDToTypeID('seconds'), Seconds);
    desc70.putInteger(stringIDToTypeID('frame'), Frame);
    desc70.putDouble(stringIDToTypeID('frameRate'), frameRate);
    desc69.putObject(charIDToTypeID('T   '), stringIDToTypeID('timecode'), desc70);
    executeAction(charIDToTypeID('setd'), desc69, DialogModes.ALL);

    //Not sure why i added this? doesnt make sense
    // var idslct = charIDToTypeID( 'slct' ); 
    // var desc476 = new ActionDescriptor(); 
    // var idnull = charIDToTypeID( 'null' ); 
    // var ref417 = new ActionReference(); 
    // var idMnspsp = charIDToTypeID( 'Mn ' ); 
    // var idMnIt = charIDToTypeID( 'MnIt' ); 
    // var idtimelineGoToNextFrame = stringIDToTypeID( 'timelineGoToNextFrame' ); 
    // ref417.putEnumerated( idMnspsp, idMnIt, idtimelineGoToNextFrame ); 
    // desc476.putReference( idnull, ref417 ); 
    // executeAction( idslct, desc476, DialogModes.ALL );
}

function centerPlayhead(){
    // Set next frame Scriptlister > doesnt center playhead like menu???
    // function cTID(s) { return app.charIDToTypeID(s); };
    // function sTID(s) { return app.stringIDToTypeID(s); };
    // try {
    //     var desc250 = new ActionDescriptor();
    //     desc250.putBoolean( sTID('toNextWholeSecond'), false );
    //     executeAction( sTID('nextFrame'), desc250, DialogModes.NO );
    //     var desc256 = new ActionDescriptor();
    //     desc256.putBoolean( sTID('toNextWholeSecond'), false );
    //     executeAction( sTID('previousFrame'), desc256, DialogModes.NO );
    // } catch(e){
    //     alert(e)
    // }
    $.sleep (2000);
    alert("hehe")
    var idslct = charIDToTypeID( 'slct' ); 
    var desc476 = new ActionDescriptor(); 
    var idnull = charIDToTypeID( 'null' ); 
    var ref417 = new ActionReference(); 
    var idMnspsp = charIDToTypeID( 'Mn ' ); 
    var idMnIt = charIDToTypeID( 'MnIt' ); 
    var idtimelineGoToNextFrame = stringIDToTypeID( 'timelineGoToNextFrame' ); 
    ref417.putEnumerated( idMnspsp, idMnIt, idtimelineGoToNextFrame ); 
    desc476.putReference( idnull, ref417 ); 
    executeAction( idslct, desc476, DialogModes.ALL );
    // var idslct = charIDToTypeID( 'slct' ); 
    // var desc476 = new ActionDescriptor(); 
    // var idnull = charIDToTypeID( 'null' ); 
    // var ref417 = new ActionReference(); 
    // var idMnspsp = charIDToTypeID( 'Mn ' ); 
    // var idMnIt = charIDToTypeID( 'MnIt' ); 
    // var idtimelineGoToPreviousFrame = stringIDToTypeID( 'timelineGoToPreviousFrame' ); 
    // ref417.putEnumerated( idMnspsp, idMnIt, idtimelineGoToNextFrame ); 
    // desc476.putReference( idnull, ref417 ); 
    // executeAction( idslct, desc476, DialogModes.ALL );
    // Scriptlistner doesnt focus playheade
    // var idnextFrame = stringIDToTypeID( "nextFrame" );
    // var desc181 = new ActionDescriptor();
    // var idtoNextWholeSecond = stringIDToTypeID( "toNextWholeSecond" );
    // desc181.putBoolean( idtoNextWholeSecond, false );
    // executeAction( idnextFrame, desc181, DialogModes.ERROR );
    // app.refresh();
}
// Get frame frameCount
// https://community.adobe.com/t5/photoshop/is-there-any-way-to-get-frame-count-of-timeline-animation-using-jsx-script/td-p/9391244?page=1
// Items we can get
// time
// currentFrame
// documentTimelineSettings
// duration
// enabled
// frameCount
// frameRate
// hasMotion
// workInTime
// workOutTime

function timelineFrameCount() {
    // alert("timelineCount")
    var r = new ActionReference();
    r.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('frameCount'));
    r.putClass(stringIDToTypeID('timeline'));
    var ret = executeActionGet(r);
    var totFr = ret.getInteger(stringIDToTypeID('frameCount'));
    return totFr
}
function timelineCurrentFrame() {
    // alert("currentFr")
    var r = new ActionReference();
    r.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('currentFrame'));
    r.putClass(stringIDToTypeID('timeline'));
    var ret = executeActionGet(r);
    var totFr = ret.getInteger(stringIDToTypeID('currentFrame'));
    return totFr
}
function timelineFPS() {
    // alert("currentFr")
    var r = new ActionReference();
    r.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('frameRate'));
    r.putClass(stringIDToTypeID('timeline'));
    var ret = executeActionGet(r);
    var fps = ret.getInteger(stringIDToTypeID('frameRate'));
    return fps
}



// r-bin
// https://community.adobe.com/t5/photoshop/is-there-any-way-to-get-frame-count-of-timeline-animation-using-jsx-script/td-p/9391244?page=1
function nextKeyFrame(){
    $.sleep (2000);
    alert("hehe")
    var d1 = new ActionDescriptor();
    var d2 = new ActionDescriptor();
    d2.putEnumerated( stringIDToTypeID( "trackID" ), stringIDToTypeID( "stdTrackID" ), stringIDToTypeID( "sheetPositionTrack" ) );
    d1.putObject( stringIDToTypeID( "trackID" ), stringIDToTypeID( "animationTrack" ), d2 );
    executeAction( stringIDToTypeID( "nextKeyframe" ), d1, DialogModes.NO );
    // app.refresh();
}

// Get OS
// fromt "_LastLogEntry.jsx"
isWindows = function() {
  return $.os.match(/windows/i);
};
isMac = function() {
  return !isWindows();
};


// Create AnimDessin folder romaing
function getPrefFolder(){
  var userData = Folder.userData;
  if (!userData || !userData.exists) {
    userData = Folder("~");
  }
  var folder = new Folder(userData + "/animdessin2");

  if (!folder.exists) {
    folder.create();
  }
  return folder;
};

// Execute keypress OS 
// https://www.ps-scripts.com/viewtopic.php?f=66&t=7614&p=37657&hilit=key+press#p37657
// keycodes OSX > https://eastmanreference.com/complete-list-of-applescript-key-codes#:~:text=The%20enter%20key%20on%20most,accomplished%20by%20hitting%20fn%20%2B%20enter.
function keyPress(os){
    // #target photoshop
    // app.bringToFront();
    // 123 left
    // 124 right
    // 126 up
    // 125 down
    // 116 PgUp
    // 121 PgDn
    // 115 Home
    // 119 End
    
    // alert(os)
    // $.sleep (100);
    // Check OS
    if (os == "Windows") {
      // WIP get windows equilant code
    //   alert(os)
        // sources cscript
        // https://www.vbsedit.com/html/f1741259-9501-478b-bad6-36039a057410.asp
        // https://social.technet.microsoft.com/wiki/contents/articles/5169.vbscript-sendkeys-method.aspx#:~:text=The%20SendKeys%20method%20is%20used,where%20typed%20from%20the%20keyboard.&text=Single%20alphanumeric%20keystrokes%20can%20simply,SendKeys%20%22S%22.
        // 
        // app.system('cscript //logo C:/Users/romboutversluijs/Desktop/arrowright.vbs')
        // var path = File($.fileName).path; // return photoshop path
        // alert(File($.fsName)); // return temp folder
        
        // var extensionRoot = getSystemPath(SystemPath.EXTENSION);// + "/jsx/";
        // alert($.%p);
        // alert(Folder.userData) // ROmaing folder
        // var path = 'cscript //nologo C:/Users/romboutversluijs/Desktop/arrowright.vbs';
        // var path = Folder.userData+'/'+'Adobe/Adobe Photoshop 2021/CEP/AnimDessin2/example.vbs'; // ROmaing folder
        // var path = 'cscript //nologo \''+ path + '\'';
        // var path = 'cscript //nologo C:/Program%20Files/Common%20Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs'; // ROmaing folder
        // var path = 'C:/Program%20Files/Common%20Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs'; // ROmaing folder
        // var extDir = Folder.commonFiles+'/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs'; // ROmaing folder
        // alert(File(extDir).exists)
        // var extDir = 'C:/Program%20Files/Common%20Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs';
        // var path = 'C:\\Program Files\\Common Files\\Adobe\\CEP\\extensions\\com.sbaril.animdessin2\\jsx\\arrowright.vbs';
        // alert(File('C:/Program Files/Common Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs').exists)
        // app.system('cscript //logo C:/Program Files/Common Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/example.vbs');
        // var path = File($.fileName).path+'\"presets\"scripts\"arrowright.vbs';
        // alert(Folder.userData)
        // alert(File("C:/Program Files/Common Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs").exists)
        // alert(path)
        // alert(Folder('$$$/AdobePlugin'))
        // var path = Folder.userData;
        // alert(Folder.appPackage.toString() + "/Scripts/")
        // var path = encodeURIComponent(Folder.appPackage+'/Presets/Scripts/arrowright.vbs');
        // var path = encodeURI(Folder.appPackage+'/Presets/Scripts/arrowright.vbs');
        // var path = decodeURI(encodeURI(Folder.appPackage+'/Presets/Scripts/arrowright.vbs'));
        // alert(path)
        // var path = 'cscript //nologo '+encodeURIComponent(Folder.appPackage+'/Presets/Scripts/arrowright.vbs')+'\'';
        // var path = 'cscript //nologo '+path;
        // alert(Folder.appPackage.toString())
        // alert(Folder.appPackage.toString())
        // alert(Folder($.fileName))
        // alert(File(path).exists)
        // alert(encodeURIComponent(path))
        
        // var path = 'C:/Users/romboutversluijs/documents/Adobe/CEP/AnimDessin2/arrowright.vbs';
        // var path = 'cscript //nologo C:/Users/romboutversluijs/documents/Adobe/CEP/AnimDessin2/arrowright.vbs';
        
        // var path = 'cscript //nologo '+app.path +'/Presets/Scripts/right.vbs';
        // var path = 'cscript //nologo '+app.path.toString().replace(/%20/g, ' ') +'/Presets/Scripts/right.vbs';
        // alert(app.path.fsName + '/Presets/Scripts')
        // alert(app.path)
        
        // Working
        // https://community.adobe.com/t5/photoshop/send-keystroke-from-javascript-to-photoshop/m-p/8082657#M423540
        try{
            // var mb_keystrF = new File(File("C:/Users/romboutversluijs/Desktop/kestr.vbs"));
            // var mb_keystrF = new File(File($.fileName).path +"/kestr.vbs");
            // var str = 'WScript.Sleep 1500\
                    //   WScript.Sleep 100\
                    //   WshShell.SendKeys "%g"';
                    // for(i in app){
                    //     alert(app[i].name)

                    // }
                    // alert(Folder.userData)
            // alert((app.path).name)
            // alert(getPrefFolder())
            // var mb_keystrF = new File(File(app.path +'/Presets/Scripts/amd2-shortcut.vbs'));
            // var mb_keystrF = new File(File('C:/Program Files/Adobe/Adobe Photoshop 2021/Presets/Scripts/left.vbs'));
            // alert(File($.fileName).path)
            var mb_keystrF = new File(File(getPrefFolder()+'/amd2-shortcut.vbs'));
            var str = 'Set WshShell = WScript.CreateObject("WScript.Shell")\
                      WshShell.SendKeys "{RIGHT}"';
            mb_keystrF.open('w');
            mb_keystrF.write(str);
            mb_keystrF.close();
            mb_keystrF.execute();
        } catch(e){
            alert(e)
        }
        // var path = 'C:/Users/romboutversluijs/';
        // var path = 'cscript //nologo '+path+'documents/Adobe/CEP/AnimDessin2/right.vbs';
        // try {
        //     app.system(path);
        // } catch(e){
        //     alert(e)
        // }
        // app.system("cscript //nologo "+path+"\"");
        // app.system("cscript //nologo C:/Program Files/Common Files/Adobe/CEP/extensions/com.sbaril.animdessin2/jsx/arrowright.vbs");
        // app.system('cscript //logo '+extDir+'arrowright.vbs');

        // app.system('set shl = CreateObject("wscript.shell")');
        // app.system('shl.sendkeys "^{ESC}+"');
        // app.system('Shell.Application');
        // app.system('objShell.WindowSwitcher');
        // app.system('Set WshShell = WScript.CreateObject("WScript.Shell")');
        // app.system('WshShell.SendKeys "5"');
        // app.system('cscript //logo hi')
        // System.Windows.Forms.SendKeys.SendWait("^c"); // not working
        // app.system('System.Windows.Forms.SendKeys::SendWait("Hi")') // notworking
    //   app.system('ctypes.windll.user32.mouse_event(2, 0, 0, 0,0)');
    //   app.system('cmd run'); // Works

    } else if (os == "Mac") {
        // alert(os)
        app.system( 'osascript -e \'tell application "System Events" to key code "124"\'' ); 
        // app.system( 'osascript -e \'tell application "System Events" to key code "123" using command down\'' );
    }
}


///////////////////////////////////////////////////
// Custom Frame Step Action from jsx
///////////////////////////////////////////////////
function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

function AnimD2_customFrameStep(customFrameStep,frameLength, direction) {
    // alert(customFrameStep)
    // alert(direction)0
    // alert(frameLength)
    if(customFrameStep=="null") customFrameStep = 1;
    if(customFrameStep=="undefined") customFrameStep = 1;
    if(frameLength=="null") frameLength = 1;
    if(frameLength=="undefined") frameLength = 1;

    if(frameLength=="false") {
        alert("Frame Length is not Set") 
        return
    }
    if(customFrameStep=="false") {
        alert("No Custom Frame Set") 
        return
    }
    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // check what direction to go and use custom framesteps
        if(direction=="prev") {
            var directionMove = 'Bckw';
            var directionFrame = 5;
        } else {
            var directionMove = 'Frwr';
            var directionFrame = 6;
        }

        // we use loop to jump layers
        // TODO need to know how long each frame is. When using 2frames it will jump double the time
        // Divide customframestep / framelength > gets a rough number. Doesnt work nice with uneven frame numbers
        var stepLayers = Math.round(customFrameStep / frameLength);
        for(i=0;i<stepLayers;i++){
            // Set selection layer panel
            var desc83 = new ActionDescriptor();
            var ref48 = new ActionReference();
            ref48.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID(directionMove) );
            desc83.putReference( cTID('null'), ref48 );
            desc83.putBoolean( cTID('MkVs'), false );
            var list25 = new ActionList();
            list25.putInteger( directionFrame );
            desc83.putList( cTID('LyrI'), list25 );
            executeAction( cTID('slct'), desc83, DialogModes.NO );
        }

        // https://www.ps-scripts.com/viewtopic.php?f=77&t=40409&p=169007&hilit=timeline#p169007
        // Get frame numbers
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID('property'), stringIDToTypeID('time'));
        ref.putClass(stringIDToTypeID('timeline'), stringIDToTypeID('timeline'));
        var desc = executeActionGet(ref); // <- it's here inside desc

        var time_Seconds = desc.getObjectValue(stringIDToTypeID('time')).getInteger(stringIDToTypeID('seconds'))
        var time_Frame = desc.getObjectValue(stringIDToTypeID('time')).getInteger(stringIDToTypeID('frame'))
        var time_FrameRate = desc.getObjectValue(stringIDToTypeID('time')).getDouble(stringIDToTypeID('frameRate'))
        
        // check what direction to go and use custom framesteps
        if(direction=="prev") {
            var directionTime = time_Frame-=Number(customFrameStep);
        } else {
            var directionTime = time_Frame+=Number(customFrameStep);
        }
        // set to frame 0 if number is minus
        if (directionTime.toString().indexOf('-')==0) directionTime = 0;
        // alert(directionTime.toString().indexOf('-')==0)
        // alert(directionTime.toString().indexOf('-'))
        // alert(directionTime.toString().indexOf('-'))
        // Set playhead to selection
        // Move playhead 1 second
        var idsetd = charIDToTypeID( "setd" );
        var desc36 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref18 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idtime = stringIDToTypeID( "time" );
        ref18.putProperty( idPrpr, idtime );
        var idtimeline = stringIDToTypeID( "timeline" );
        ref18.putClass( idtimeline );
        desc36.putReference( idnull, ref18 );
        var idT = charIDToTypeID( "T   " );
        var desc37 = new ActionDescriptor();
        var idseconds = stringIDToTypeID( "seconds" );
        desc37.putInteger( idseconds, time_Seconds );
        var idframe = stringIDToTypeID( "frame" );
        desc37.putInteger( idframe, directionTime );
        var idframeRate = stringIDToTypeID( "frameRate" );
        desc37.putDouble( idframeRate, time_FrameRate );
        var idtimecode = stringIDToTypeID( "timecode" );
        desc36.putObject( idT, idtimecode, desc37 );
        executeAction( idsetd, desc36, DialogModes.NO );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

// Trim Spaces
// https://community.adobe.com/t5/indesign-discussions/trim-function-not-working-in-extendscript-is-there-a-way-to-replicate-the-functioning/m-p/7671887#M161781
function trim (str) {
    return str.replace(/^\s+/,'').replace(/\s+$/,'');
}
///////////////////////////////////////////////////
// custom frame step Dialog
///////////////////////////////////////////////////
function frameStepDialog(customFrameStep, frameLength) {
    // var customFrameStep = customFrameStep;
    // var frameLength = frameLength;
    // alert(customFrameStep)
    // alert(frameLength)
    if(customFrameStep==null) customFrameStep = 1;
    if(frameLength==null) frameLength = 1;
    // if(customFrameStep=="undefined") customFrameStep = 1;
    // if(frameLength=="undefined") frameLength = 1;
    // alert(customFrameStep)
    // alert(frameLength)

    // customFrameStep = customFrameStep != "Set..." ? customFrameStep : "Set...";
    // frameLength = frameLength != "Set..." ? frameLength : "Set...";
    // if (customFrameStep=="undefined") customFrameStep = "Set..."
    // if (frameLength==" undefined") frameLength = "Set..."
    var runButtonID = 1;
    var cancelButtonID = 2;
    var frameStepStr = customFrameStep;
    var frameLengthStr = frameLength;

    // var exportInfo = new Object();
    //     exportInfo.frameStep = frameStepStr;
    var cancelBtnStr = "Cancel";
    var okBtnStr = "OK";
    // FRAMERENAME
    // ===========
    var dlgMain = new Window("dialog"); 
        dlgMain.text = "Set Custom Frame Step"; //renameFrameTitleStr; 
        dlgMain.preferredSize.width = 100; 
        dlgMain.orientation = "column"; 
        dlgMain.alignChildren = ["fill","top"]; 
        dlgMain.spacing = 10; 
        dlgMain.margins = 16; 

    var frameStepGrp = dlgMain.add("group", undefined, {name: "frameStepGrp"}); 
        frameStepGrp.orientation = "row"; 
        frameStepGrp.alignChildren = ["left","top"]; 
        frameStepGrp.spacing = 10; 
        frameStepGrp.margins = 0; 

    var customFrameStepLabel = frameStepGrp.add('statictext {properties: {name: "frameStepLabel"}}'); 
        customFrameStepLabel.text = "Frame Step"; //exportInfo.frameStep;
        customFrameStepLabel.preferredSize = [100,15];

    var customFrameStepInput = frameStepGrp.add('edittext {properties: {name: "frameStep"}}'); 
        customFrameStepInput.helpTip = "Set custom frame step"; 
        customFrameStepInput.text = trim(frameStepStr); //exportInfo.frameStep;
        customFrameStepInput.active = true; // Set focus on input
        customFrameStepInput.preferredSize = [45,15];
    
    var frameLengthGrp = dlgMain.add("group", undefined, {name: "frameLengthGrp"}); 
        frameLengthGrp.orientation = "row"; 
        frameLengthGrp.alignChildren = ["left","top"]; 
        frameLengthGrp.spacing = 10; 
        frameLengthGrp.margins = 0; 

    var frameLengthLabel = frameLengthGrp.add('statictext {properties: {name: "frameLengthLabel"}}'); 
        frameLengthLabel.text = "Frame Length"; //exportInfo.frameStep;
        frameLengthLabel.preferredSize = [100,15];

    var customFrameLengthInput = frameLengthGrp.add('edittext {properties: {name: "frameStep"}}'); 
        customFrameLengthInput.helpTip = "Set length of each frames, this helps with the next and prev actions"; 
        customFrameLengthInput.text = trim(frameLengthStr); //exportInfo.frameStep;
        customFrameLengthInput.active = false; // Set focus on input
        customFrameLengthInput.preferredSize = [45,15];

    // GROUP1
    // ======
    var group1 = dlgMain.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["right","top"]; 
        group1.spacing = 10; 
        group1.margins = 0; 

    var cancel = group1.add("button", undefined, undefined, {name: "cancel"}); 
        cancel.text = cancelBtnStr; 
        // cancel.preferredSize.width = 70; 
    
    cancel.onClick = function() {
        dlgMain.close(cancelButtonID);
    }

    var ok = group1.add("button", undefined, undefined, {name: "ok"}); 
        ok.text = okBtnStr; 
        // ok.preferredSize.width = 80; 

    var frameStepInput= customFrameStepInput.text;
    var frameLengthInput= customFrameLengthInput.text;
    customFrameStepInput.onChange = function(){
        frameStepInput = customFrameStepInput.text;
    }
    frameLength.onChange = function(){
        frameLengthInput = customFrameLengthInput.text;
    }
    if (frameStepInput == frameStepInput) frameStepInput
    if (frameLengthInput == frameLengthInput) frameLengthInput

    ok.onClick = function() {
        frameStepInput = customFrameStepInput.text;
        frameLengthInput = customFrameLengthInput.text;

        // check if the setting is properly
        if (frameStepInput.length == 0) {
            alert(strAlertRename); // +" "+ strAlertFailure);
            return;
        }
        if (frameLengthInput.length == 0) {
            alert(strAlertRename); // +" "+ strAlertFailure);
            return;
        }
        dlgMain.close(runButtonID);
    }

    // in case we double clicked the file
    dlgMain.center();

    var result = dlgMain.show();

    if (cancelButtonID == result) {
        // return result; // close to quit
        return [frameStepInput, frameLengthInput]
    }

    // Get settings from Dialog
    // exportInfo.frameStep = customFrameStep.text;
    return [frameStepInput, frameLengthInput]
}


// /////////////////////////////////////////////////////////////////////

// Localize createCustomFrameDialog
locCreateCustomFrameDialog = {
    en: "Set create custom frame",
    fr: "Ajouter custom couche",
    nl: "Voorinstelling Custom frame",
    ch: "设置创建自定义框架"
};
// Localize AnimD2_createCustomFrameMain
locCreateCustomFrame = {
    en: "Add custom frame",
    fr: "Ajouter custom couche",
    nl: "Custom frame toevoegen",
    ch: "添加自定义框架"
};
///////////////////////////////////////////////////
// Custom Frame Step Action from jsx
///////////////////////////////////////////////////
function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

function AnimD2_createCustomFrameMain(customFrame) {
     // set default at 3 if nothing set
    if(customFrame==null) customFrame = 3
    // correct start of 0
    customFrame = customFrame -1;
    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // =======================================================
        var idMk = charIDToTypeID("Mk  ");
        var desc13 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref7 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref7.putClass(idLyr);
        desc13.putReference(idnull, ref7);
        executeAction(idMk, desc13, DialogModes.NO);

        // =======================================================
        // Reduze the end of the layer to the actual frame
        var idmoveOutTime = stringIDToTypeID("moveOutTime");
        var desc99 = new ActionDescriptor();
        executeAction(idmoveOutTime, desc99, DialogModes.NO);


        // =======================================================
        // Function to get the framerate of the actual documment
        function GetFrameRate() {
            var ref = new ActionReference();
            ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("documentTimelineSettings"));
            ref.putClass(stringIDToTypeID("timeline"));
            var desc = new ActionDescriptor();
            desc.putReference(charIDToTypeID('null'), ref);
            var resultDesc = executeAction(charIDToTypeID('getd'), desc, DialogModes.NO);

            return resultDesc.getDouble(stringIDToTypeID('frameRate'));
        };

        var idmoveOutTime = stringIDToTypeID("moveOutTime");
        var desc123 = new ActionDescriptor();
        var idtimeOffset = stringIDToTypeID("timeOffset");
        var desc124 = new ActionDescriptor();
        var idseconds = stringIDToTypeID("seconds");
        desc124.putInteger(idseconds, 0);
        var idframe = stringIDToTypeID("frame");
        desc124.putInteger(idframe, customFrame); // Value 0=1; 1=2 …
        var idframeRate = stringIDToTypeID("frameRate");
        desc124.putDouble(idframeRate, GetFrameRate());
        var idtimecode = stringIDToTypeID("timecode");
        desc123.putObject(idtimeOffset, idtimecode, desc124);
        executeAction(idmoveOutTime, desc123, DialogModes.NO);


        // =======================================================
        var idnextFrame = stringIDToTypeID("nextFrame");
        var desc211 = new ActionDescriptor();
        var idtoNextWholeSecond = stringIDToTypeID("toNextWholeSecond");
        desc211.putBoolean(idtoNextWholeSecond, false);
        executeAction(idnextFrame, desc211, DialogModes.NO);

        // // check what direction to go and use custom framesteps
        // var directionMove = 'Frwr';
        // var directionFrame = 6;

        // we use loop to jump layers
        // TODO need to know how long each frame is. When using 2frames it will jump double the time
        // Divide customFrame / framelength > gets a rough number. Doesnt work nice with uneven frame numbers
        // var stepLayers = Math.round(customFrame / frameLength);
        // var directionMove = 'Frwr';
        // var directionFrame = 6;
        // for(i=0;i<customFrame;i++){
        //     // Set selection layer panel
        //     var desc83 = new ActionDescriptor();
        //     var ref48 = new ActionReference();
        //     ref48.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID(directionMove) );
        //     desc83.putReference( cTID('null'), ref48 );
        //     desc83.putBoolean( cTID('MkVs'), false );
        //     var list25 = new ActionList();
        //     list25.putInteger( directionFrame );
        //     desc83.putList( cTID('LyrI'), list25 );
        //     executeAction( cTID('slct'), desc83, DialogModes.NO );
        // }

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

// AnimD2_createCustomFrameMain.Main =function(customFrame){
//     AnimD2_createCustomFrameMain(customFrame)
// }
function AnimD2_createCustomFrame(customFrame) {
    app.activeDocument.suspendHistory(localize(locCreateCustomFrame), "AnimD2_createCustomFrameMain('"+customFrame+"')");
};

///////////////////////////////////////////////////
// Create Custom Frame Dialog
///////////////////////////////////////////////////
// function createCustomFrameDialogMain(createCustomFrame) {
function createCustomFrameDialog(createCustomFrame) {
    if(createCustomFrame==null) createCustomFrame = 3;
    // if(createCustomFrame==null) {
    //     createCustomFrame = 3
    // }
    // if(createCustomFrame=="undefined") createCustomFrame = 3;
    // if(createCustomFrame=="EvalScript error") {
    //     createCustomFrame = 3
    // }
    // alert(createCustomFrame=="EvalScript error")
    // createCustomFrame = createCustomFrame != "Set..." ? createCustomFrame : "Set...";
    // if (createCustomFrame=="undefined") createCustomFrame = "Set..."
    var runButtonID = 1;
    var cancelButtonID = 2;
    var frameStepStr = createCustomFrame;

    // var exportInfo = new Object();
    //     exportInfo.frameStep = frameStepStr;
    var cancelBtnStr = "Cancel";
    var okBtnStr = "OK";
    // FRAMERENAME
    // ===========
    var dlgMain = new Window("dialog"); 
        dlgMain.text = "Set Custom Frame"; //renameFrameTitleStr; 
        dlgMain.preferredSize.width = 100; 
        dlgMain.orientation = "column"; 
        dlgMain.alignChildren = ["fill","top"]; 
        dlgMain.spacing = 10; 
        dlgMain.margins = 16; 

    var customFrameGrp = dlgMain.add("group", undefined, {name: "customFrameGrp"}); 
        customFrameGrp.orientation = "row"; 
        customFrameGrp.alignChildren = ["left","top"]; 
        customFrameGrp.spacing = 10; 
        customFrameGrp.margins = 0; 

    var createCustomFrameLabel = customFrameGrp.add('statictext {properties: {name: "frameLengthLabel"}}'); 
        createCustomFrameLabel.text = "Frame length"; //exportInfo.frameStep;
        createCustomFrameLabel.preferredSize = [100,15];

    var customFrame = customFrameGrp.add('edittext {properties: {name: "customFrame"}}'); 
        customFrame.helpTip = "Set custom frame length"; 
        customFrame.text = frameStepStr; //trim(frameStepStr); //exportInfo.frameStep;
        customFrame.active = true; // Set focus on input
        customFrame.preferredSize = [45,15];

    // GROUP1
    // ======
    var group1 = dlgMain.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["right","top"]; 
        group1.spacing = 10; 
        group1.margins = 0; 

    var cancel = group1.add("button", undefined, undefined, {name: "cancel"}); 
        cancel.text = cancelBtnStr; 
        // cancel.preferredSize.width = 70; 
    
    cancel.onClick = function() {
        dlgMain.close(cancelButtonID);
    }

    var ok = group1.add("button", undefined, undefined, {name: "ok"}); 
        ok.text = okBtnStr; 
        // ok.preferredSize.width = 80; 

    var customFrameInput= customFrame.text;
    customFrame.onChange = function(){
        customFrameInput = customFrame.text;
    }

    // if (customFrameInput == customFrameInput) customFrameInput

    ok.onClick = function() {
        customFrameInput = customFrame.text;
        // check if the setting is properly
        if (customFrameInput.length == 0) {
            alert(strAlertRename); // +" "+ strAlertFailure);
            return;
        }
        dlgMain.close(runButtonID);
    }

    // in case we double clicked the file
    dlgMain.center();

    var result = dlgMain.show();

    if (cancelButtonID == result) {
        // return result; // close to quit
        return customFrameInput
    }

    // Get settings from Dialog
    return customFrameInput
}
