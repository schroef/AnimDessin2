// Created 2020
// Modified on October 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

// Call main function from getselected, we can reuse scripts
var ScriptFilePath = Folder($.fileName).parent.fsName;
$.evalFile(new File(ScriptFilePath + '/json2.js'));


// Localize
var strDocBackgroundColor = localize('$$$/JavaScripts/ArtboardsToFiles/ProjectBackgroundColor=Background Color:')
var strDocColorWhite = localize('$$$/JavaScripts/ArtboardsToFiles/ColorWhite=White')
var strDocColorBlack = localize('$$$/JavaScripts/ArtboardsToFiles/ColorBlack=Black')
var strDocColorGray = localize('$$$/JavaScripts/ArtboardsToFiles/ColorGray=Gray')
var strDocFgColorOther = localize('$$$/JavaScripts/ArtboardsToFiles/ColorForeground=Foreground Color')
var strDocBgColorOther = localize('$$$/JavaScripts/ArtboardsToFiles/ColorBackground=Background Color')
var strDocTransparentOther = localize('$$$/JavaScripts/ArtboardsToFiles/ColorTransparent=Transparent')
var strDocColorOther = localize('$$$/JavaScripts/ArtboardsToFiles/ColorOther=Other...')
locNewDocPreset1 = {
    en: "New project \"",
    fr: "XXXXXXXXX",
    nl: "Nieuw project \"",
    ch: "新项目 \"",
};
locNewDocPreset2 = {
    en: "\" created",
    fr: "XXXXXXXXX",
    nl: "\" opgezet",
    ch: "\" 创建"
};
// the drop down list indexes for color profiles
var colorProfile = new String();
var srgb = 0;
var adobergb = 1;
var applergb = 2;
var colormatch = 3;
var hdtv = 4;
var imagep3 = 5;

// the drop down list indexes for bitdepth
var eightbit = 0;
var sixtnbit = 1;
var thytwbit = 2;
// the drop down list indexes for color mode
// case DocumentMode.RBG:    
//      
// case DocumentMode.BITMAP:       
//     docColorMode = "BtmM";
// case DocumentMode.CMYK:         
//     docColorMode = "CMYM";
// case DocumentMode.DUOTONE:      
//     docColorMode = "DtnM"; 
// case DocumentMode.GRAYSCALE:    
//     docColorMode = "Grys"; 
// case DocumentMode.INDEXEDCOLOR: 
//     docColorMode = "IndC"; 
// case DocumentMode.LAB:          
//     docColorMode = "LbCM"; 
// case DocumentMode.MULTICHANNEL: 
//     docColorMode = "MltC"; 
// var bitmap = 0; CANT BE ANIAMTED

var docColorMode = new String();
var grayscale = 0;
var rgb = 1;
var cmyk = 2;
var lab = 3;

// the drop down list indexes for background colors
var bgwhite = 0;
var bgblack = 1;
var bggray = 2;
var bgforeground = 3; //CRASHES only works with fill
var bgbackground = 4;
var bgtransparent = 5;
// Skip one for ————— marker
var bgcustom = 7;

// ok and cancel button
var runButtonID = 1;
var cancelButtonID = 2;

var exportInfo = new Object();

///////////////////////////////////////////////////////////////////////////
// Function: RGBtoHSB
// Usage: convert a RGB numbers to a HSB numbers
// Input: list of 3 numbers RGB comma divided
// Return: a list of 3 number HSB
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
///////////////////////////////////////////////////////////////////////////
/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

///////////////////////////////////////////////////////////////////////////
// Function: StrToIntWithDefault
// Usage: convert a string to a number, first stripping all characters
// Input: string and a default number
// Return: a number
///////////////////////////////////////////////////////////////////////////
function StrToIntWithDefault(s, n) {
    var onlyNumbers = /[^0-9]/g;
    var t = s.replace(onlyNumbers, "");
    t = parseInt(t);
    if (!isNaN(t)) {
        n = t;
    }
    return n;
}

///////////////////////////////////////////////////////////////////////////
// Function: framesToTMC
// Usage: convert a frames to timecode format
// Input: number 
// Return: timecode HH:MM:SS:FF
// https://stackoverflow.com/questions/12295375/creating-timecode-from-frames
///////////////////////////////////////////////////////////////////////////
function framesToTMC(currentFrame) {
    var fps = exportInfo.tmlnFps;
    var h = Math.floor(currentFrame/(60*60*fps));
    var m = (Math.floor(currentFrame/(60*fps))) % 60;
    var s = (Math.floor(currentFrame/fps)) % 60;
    var f = currentFrame % fps;
    return showTwoDigits(h) + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f);
}

function showTwoDigits(number) {
    return ("00" + number).slice(-2);
}

// console.log("Frame 1020 will be displayed as " + displayTime(1020));
///////////////////////////////////////////////////////////////////////////
// Function: secondsToHms
// Usage: convert a number, time string format
// Input: number and a default number
// Return: a number
// https://stackoverflow.com/questions/42089868/converting-time-in-seconds-to-hhmmssff
///////////////////////////////////////////////////////////////////////////
function secondsToHms(d){
    // secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "00" : "") : "00:") + "0"+ m + ":" + (s < 10 ? "0" : "") + s);
}

///////////////////////////////////////////////////////////////////////////
// Function: Timecode to frames
// Usage: convert a 00:00:00:00, frames 
// Input: number and a default number
// Return: a number frames
// https://github.com/allensarkisyan/VideoFrame/blob/master/VideoFrame.js
///////////////////////////////////////////////////////////////////////////
// var frameRate = Number(24);
// alert(frameRate)
function toSMPTE(frame) {
    frameRate = exportInfo.tmlnFps;
	// if (!frame) { return this.toTime(this.video.currentTime); }
	var frameNumber = Number(frame);
    // alert(frame)
	var fps = frameRate;
	function wrap(n) { return ((n < 10) ? '0' + n : n); }
	var _hour = ((fps * 60) * 60), _minute = (fps * 60);
    // alert(_hour)
	var _hours = (frameNumber / _hour).toFixed(0);
	var _minutes = (Number((frameNumber / _minute).toString().split('.')[0]) % 60);
	var _seconds = (Number((frameNumber / fps).toString().split('.')[0]) % 60);
	var SMPTE = (wrap(_hours) + ':' + wrap(_minutes) + ':' + wrap(_seconds) + ':' + wrap(frameNumber % fps));
	return SMPTE;
}

function toFrames(SMPTE) {
    frameRate = exportInfo.tmlnFps;

	var time = (!SMPTE) ? this.toSMPTE().split(':') : SMPTE.split(':');
    // alert(Number(time[3]))
	// var frameRate = frameRate;
    // alert(time)
    // alert( SMPTE.split(':'))
    // alert(Number(24))
    // alert(frameRate)
	var hh = (((Number(time[0]) * 60) * 60) * frameRate);
	var mm = ((Number(time[1]) * 60) * frameRate);
	var ss = (Number(time[2]) * frameRate);
	var ff = Number(time[3]);
    // alert(Number(time[2]))
    // alert("ss "+ss)
    // alert("time "+Math.floor((hh + mm + ss + ff)))
	return Math.floor((hh + mm + ss + ff))
}


///////////////////////////////////////////////////////////////////////////////
// Function: Validate
// Usage: Only allow timceode input using 00:00:00:00 as pattern
// Input: Numbers and :
// Return: proper formated timecode 
///////////////////////////////////////////////////////////////////////////////
function validate(durationHint,timecode){
//   var pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    var timePattern = /^\d{2}:\d{2}:\d{2}[:;]\d{2}$/;
    var framPattern = /^[0-9]{1,6}$/;
//   var framPattern = /^\d{10}$/;
//   var timecodeResult = timecode.replace(pattern);
//   var timecodeResult = timecode.replace(pattern,timecode);
//   alert(timecodeResult)
  var timecodeResult = timePattern.test(timecode);
  var framesResult = framPattern.test(timecode);
  
  if(timecodeResult == false){
    durationHint.text = "Wrong formatting, needs HH:MM:SS:FR";
    durationHint.visible = true;
    durationHint.enabled = false;
  }
  if(framesResult == true){
    durationHint.text = "Timeline duration " + framesToTMC(timecode);
    // durationHint.text = "Timeline total frames " + timecode;
    durationHint.visible = true;
    durationHint.enabled = false;
    return "frames"
  }
  if(timecodeResult==true){
    durationHint.text = "Timeline duration " + timecode;
    durationHint.visible = true;
    return "timecode";
  }
  
}
///////////////////////////////////////////////////////////////////////////////
// Function: NumericEditKeyboardHandler
// Usage: Do not allow anything except for numbers 0-9
// Input: ScriptUI keydown event
// Return: <nothing> key is rejected and beep is sounded if invalid
///////////////////////////////////////////////////////////////////////////////
function NumericEditKeyboardHandler (event) {
    try {
        var keyIsOK = KeyIsNumeric (event) ||
					  KeyIsDelete (event) ||
					  KeyIsLRArrow (event) ||
					  KeyIsTabEnterEscape (event);

        if (! keyIsOK) {
            //    Bad input: tell ScriptUI not to accept the keydown event
            event.preventDefault();

            /*    Notify user of invalid input: make sure NOT
			       to put up an alert dialog or do anything which
		                 requires user interaction, because that
		                 interferes with preventing the 'default'
		                 action for the keydown event */
            app.beep();
        }
    }
    catch (e) {
        ; // alert ("Ack! bug in NumericEditKeyboardHandler: " + e);
    }
}

function DesmalEditKeyboardHandler (event) {
    try {
        var keyIsOK = KeyIsNumeric (event) ||
					  KeyIsColon (event) ||
					//   KeyIsPeriod (event) ||
					//   KeyIsShift (event) ||
					  KeyIsDelete (event) ||
					  KeyIsLRArrow (event) ||
					  KeyIsTabEnterEscape (event);
        if (! keyIsOK) {
            //    Bad input: tell ScriptUI not to accept the keydown event
            event.preventDefault();

            /*    Notify user of invalid input: make sure NOT
			       to put up an alert dialog or do anything which
		                 requires user interaction, because that
		                 interferes with preventing the 'default'
		                 action for the keydown event */
            app.beep();
        }
    }
    catch (e) {
        ; // alert ("Ack! bug in NumericEditKeyboardHandler: " + e);
    }
}

// key identifier functions
function KeyHasModifier (event) {
    return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
}
function KeyIsNumeric (event) {
    return  (event.keyName >= '0') && (event.keyName <= '9') && ! KeyHasModifier (event);
}
// Added extra
function KeyIsColon (event) {
    return  (event.keyName == 'Colon') || (event.shiftKey);
}
function KeyIsPeriod (event) {
    return  (event.keyName == 'Period') && ! KeyHasModifier (event);
}
// Added extra
function KeyIsShift (event) {
    return ((event.keyName == 'Shift') || (event.keyName == 'ShiftL')) && ! (event.ctrlKey);
}
function KeyIsDelete (event) {
    //    Shift-delete is ok
    return ((event.keyName == 'Backspace') || (event.keyName == 'Delete')) && ! (event.ctrlKey);
}
function KeyIsLRArrow (event) {
    return ((event.keyName == 'Left') || (event.keyName == 'Right')) && ! (event.altKey || event.metaKey);
}
function KeyIsTabEnterEscape (event) {
    return event.keyName == 'Tab' || event.keyName == 'Enter' || event.keyName == 'Escape';
}

/// ////////////////////////////////////////////////////////////////////////////
// Function: addTimeRef
// Usage: Add a text layer with the given string
// Input: text string, font name and style string, size in pts, color array, color of frame : e.g. '00:00:00:00 frame fps', 'MyriadPro-Regular', 24, [0,0,0], [0,0,0]
// Return: the resulting text layer
/// ////////////////////////////////////////////////////////////////////////////
function placeTimeRef (name, font, size, color, frameColor) { // timecode + currframe + fps , string, # pt, int, array, array
  var doc = app.activeDocument
  var posX, posY, alignId
  var timeRef = doc.artLayers.add()
  timeRef.kind = LayerKind.TEXT
  timeRef.textItem.contents = name
  timeRef.textItem.size = new UnitValue(size, 'pt')
  timeRef.textItem.font = font
  var solidColor = new SolidColor()
  solidColor.rgb.red = color[0]
  solidColor.rgb.green = color[1]
  solidColor.rgb.blue = color[2]
  timeRef.textItem.color = solidColor

  var widthRatio = doc.width / (timeRef.bounds[2] - timeRef.bounds[0])
  if (widthRatio < 1) { // before adding frame
    timeRef.resize(widthRatio * 100, widthRatio * 100)
  }
//   var frameWidth = addFrameForArtboardName(timeRef.bounds[3] - timeRef.bounds[1], frameColor)
  var frameWidth = doc.width
  timeRef.move(doc.layers[0], ElementPlacement.PLACEBEFORE)
  var w = doc.width // after adding frame
  var h = doc.height
  var leftIndent = frameWidth
  var rightIndent = w - frameWidth
  var topIndent = frameWidth / 2
  var bottomIndent = h - frameWidth / 2
  posX = leftIndent
  alignId = 'Left'
  posY = topIndent
  var bnds = timeRef.bounds
  var textHeight = bnds[3] - bnds[1]
  var textWidth = bnds[2] - bnds[0]
  var textLayerYCenter = (bnds[1] + bnds[3]) / 2
  var deltaX = posX - bnds[0].value // adjust for bounds
  var deltaY = posY - textLayerYCenter.value // adjust for bounds
  timeRef.translate(deltaX, deltaY) // adjust for bounds
  return timeRef
}


// Adobes function for id /string to TypeId
// =======================================================
function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };


///////////////////////////////////////////////////////////////////////////////
// Function: newProjectDialog
// Usage: the core routine for this script
// Input: <none>
// Return: <none>
///////////////////////////////////////////////////////////////////////////////
function newProjectDialog() {
    try {        
        app.playbackDisplayDialogs = DialogModes.ALL;
        initExportInfo(exportInfo);
        if (DialogModes.ALL == app.playbackDisplayDialogs) {
            if (cancelButtonID == settingDialog(exportInfo)) {
                return "cancel"; // quit, returning "cancel" (dont localize) makes the actions palette not record our script
            }
        }
        app.playbackDisplayDialogs = DialogModes.ALL;
        // if (exportInfo.renameLayer == newNameStr) {
        //     alert(alertNameStr)
        //     return
        // }
        
        // if (exportInfo.allLayers){
        //     applyToAllLayers(allLayers);
        // } else {
        //     frameRename(exportInfo.renameLayer);
        // }
        if(exportInfo){
            var extensionPath = $.fileName.split('/').slice(0, -2).join('/') + '/';
            var presetFilePath = new File(extensionPath + '/docPreset.json');
            newDocPreset(exportInfo)

            presetFilePath.open("w");
            presetFilePath.write(JSON.stringify(exportInfo));
            presetFilePath.close();
            // alert(presetFilePath)
            presetFilePath.open('r');
            var contentDocPreset = presetFilePath.read(); //shows JSON structure
            presetFilePath.close();

            var settings = ["docName","docWidth","docHeight","docColorMode","docColorModeIndex","docICC","docBitD","docDPI","projectBgColor","projectBgColorIndex","tmlnDuration","tmlnFps", "fpsPreset","splitTmln","splitTmlnIndex","addTimeRef"]
            var readPreset = JSON.parse(contentDocPreset);
            var priorPreset = [];
            var colorsHSB = [];
            for (x in readPreset) {
                if (x === "projectBgColor" ){
                    // alert(readPreset[x].length)
                    for(y in readPreset[x]) {
                        colorsHSB.push(readPreset[x][y])
                    }
                    // alert(colorsHSB.length)
                    //alert(colorsHSB.slice(0,3))
                }
                // alert(x) //returns keys
                // alert(readPreset[x]) //returns value of keys
                // priorPreset.split(',').slice(0, -1).join(',');
                // colorsHSB.split(',');
            }    
            // alert(priorPreset)
            // alert(priorPreset[1])
        }

        app.playbackDisplayDialogs = DialogModes.ALL;

    } catch (e) {
        if (DialogModes.NO != app.playbackDisplayDialogs) {
            alert(e);
        }
        return "cancel"; // quit, returning "cancel" (dont localize) makes the actions palette not record our script
    }
} 

///////////////////////////////////////////////////
// Set Defaults Dialog
///////////////////////////////////////////////////
function initExportInfo(exportInfo){
    // Document Settings
    exportInfo.docName = "New Project..."; //new String(); //projectnameInput
    exportInfo.docWidth = "1920"; //new String(); //widthInput 
    exportInfo.docHeight = "1080"; //new String(); //heightInput 
    exportInfo.docColorMode = "RGBM";
    exportInfo.docColorModeIndex = 1; //RGB
    exportInfo.docICC = "asdasd"; //resolutionInput.text;
    exportInfo.docBitD = 0; //8 bit
    exportInfo.docDPI = "72"; //resolutionInput.text;


    exportInfo.projectBgColor = app.foregroundColor.hsb;
    // exportInfo.projectBgColor = [app.foregroundColor.hsb.hue,app.foregroundColor.hsb.saturation,app.foregroundColor.hsb.brightness]; // set directly to HSB mode
    // exportInfo.projectBgColor = [255,255,255];
    exportInfo.projectBgColorIndex = 0;

    // Timeline Settings
    exportInfo.tmlnDuration = "24";
    exportInfo.tmlnFps = "25";
    exportInfo.fpsPreset = 6; // 25 fps

    // Split timeline
    exportInfo.splitTmln = false; // Split timeline in 1 frames
    exportInfo.splitTmlnIndex = 0; // default is 1 frame
    // Add Time Reference
    exportInfo.addTimeRef = false; // Show timecode + currfrane + fps

    // Set Defaults    
    // resolutionInput.text = "72";
    // colormodeDropdown.items[3].selected = true;
    // colorprofileDropdown.items[0].selected = true;
    // splitTmlnCheck.value = 1;
    // addFrameCheck.value = 1;
}

function settingDialog(exportInfo) {

// NEWDOCCUSTOMDIALOGBOX
// =====================
// var newDocCustomDialogBox = new Window("dialog", undefined, undefined, {maximizeButton: true, minimizeButton: true}); 
var newDocCustomDialogBox = new Window("dialog"); 
    newDocCustomDialogBox.text = "New Project"; 
    newDocCustomDialogBox.preferredSize.width = 300; 
    newDocCustomDialogBox.orientation = "column"; 
    newDocCustomDialogBox.alignChildren = ["fill","top"]; 
    newDocCustomDialogBox.spacing = 10; 
    newDocCustomDialogBox.margins = 20; 

// SPACERGRP
// ==============
// var spacerGrp = newDocCustomDialogBox.add("group", undefined, {name: "spacerGrp"}); 
//     // spacerGrp.preferredSize.width = 158; 
//     spacerGrp.preferredSize.height = 20; 
//     spacerGrp.orientation = "row"; 
//     spacerGrp.alignChildren = ["center","center"]; 
//     spacerGrp.spacing = 10; 
//     spacerGrp.margins = 0; 

// PROJECTNAMEGRP
// ==============
var projectnameGrp = newDocCustomDialogBox.add("group", undefined, {name: "projectnameGrp"}); 
    projectnameGrp.preferredSize.width = 158; 
    projectnameGrp.orientation = "row"; 
    projectnameGrp.alignChildren = ["center","center"]; 
    projectnameGrp.spacing = 10; 
    projectnameGrp.margins = 0; 

var projectnameLabel = projectnameGrp.add("statictext", undefined, undefined, {name: "projectnameLabel"}); 
    projectnameLabel.text = "Name"; 

var projectnameInput = projectnameGrp.add('edittext {properties: {name: "projectnameInput"}}'); 
    projectnameInput.text = "Project name..."; 
    projectnameInput.preferredSize.width = 311; 
    projectnameInput.alignment = ["center","fill"]; 

// CANVASLABEL
// ===========
var canvasLabel = newDocCustomDialogBox.add("panel", undefined, undefined, {name: "canvasLabel"}); 
    canvasLabel.text = "Canvas"; 
    canvasLabel.orientation = "column"; 
    canvasLabel.alignChildren = ["center","top"]; 
    canvasLabel.spacing = 8; 
    canvasLabel.margins = 16; 

// SIZEGRP
// =======
var sizeGrp = canvasLabel.add("group", undefined, {name: "sizeGrp"}); 
    sizeGrp.orientation = "row"; 
    sizeGrp.alignChildren = ["center","center"]; 
    sizeGrp.spacing = 10; 
    sizeGrp.margins = 0; 
    sizeGrp.alignment = ["fill","top"]; 

var sizeLabel = sizeGrp.add("statictext", undefined, undefined, {name: "sizeLabel", multiline: true}); 
    sizeLabel.text = "Size"; 
    sizeLabel.preferredSize.width = 80; 
    sizeLabel.justify = "right"; 
    sizeLabel.alignment = ["center","center"]; 

var sizePresetDropdown_array = ["Custom","-","HD 720p","HD 1080p","Cineon Half","Cineon Full","Film 2k","Film 4k","Film 8k","-","720 x 720", "Square 1080 x 1080", "Story 1080 x 1920"]; 
var sizePresetDropdown = sizeGrp.add("dropdownlist", undefined, undefined, {name: "sizePresetDropdown", items: sizePresetDropdown_array}); 
    sizePresetDropdown.helpTip = "Choose canvas preset size"; 
    sizePresetDropdown.selection = 0; 
    sizePresetDropdown.preferredSize.width = 152; 

// WIDTHGRP
// ========
var widthGrp = canvasLabel.add("group", undefined, {name: "widthGrp"}); 
    widthGrp.orientation = "row"; 
    widthGrp.alignChildren = ["center","center"]; 
    widthGrp.spacing = 10; 
    widthGrp.margins = 0; 
    widthGrp.alignment = ["center","top"]; 

var widthLabel = widthGrp.add("statictext", undefined, undefined, {name: "widthLabel", multiline: true}); 
    widthLabel.text = "Width"; 
    widthLabel.preferredSize.width = 80; 
    widthLabel.justify = "right"; 
    widthLabel.alignment = ["center","center"]; 

var widthInput = widthGrp.add('edittext {properties: {name: "widthInput"}}'); 
    widthInput.text = exportInfo.docWidth;//"Set width..."; 
    widthInput.preferredSize.width = 122; 

var wpxiLabel = widthGrp.add("statictext", undefined, undefined, {name: "wpxiLabel", multiline: true}); 
    wpxiLabel.text = "px"; 
    wpxiLabel.alignment = ["center","center"]; 

// HEIGHTGRP
// =========
var heightGrp = canvasLabel.add("group", undefined, {name: "heightGrp"}); 
    heightGrp.orientation = "row"; 
    heightGrp.alignChildren = ["left","center"]; 
    heightGrp.spacing = 10; 
    heightGrp.margins = 0; 

var heightLabel = heightGrp.add("statictext", undefined, undefined, {name: "heightLabel", multiline: true}); 
    heightLabel.text = "Height"; 
    heightLabel.preferredSize.width = 80; 
    heightLabel.justify = "right"; 
    heightLabel.alignment = ["left","center"]; 

var heightInput = heightGrp.add('edittext {properties: {name: "heightInput"}}'); 
    heightInput.text = exportInfo.docHeight;//"Set height..."; 
    heightInput.preferredSize.width = 122; 

var hpxLabel = heightGrp.add("statictext", undefined, undefined, {name: "hpxLabel", multiline: true}); 
    hpxLabel.text = "px"; 
    hpxLabel.alignment = ["left","center"]; 

// RESOLUTIONGRP
// =============
var resolutionGrp = canvasLabel.add("group", undefined, {name: "resolutionGrp"}); 
    resolutionGrp.orientation = "row"; 
    resolutionGrp.alignChildren = ["left","center"]; 
    resolutionGrp.spacing = 10; 
    resolutionGrp.margins = 0; 

var resolutionLabel = resolutionGrp.add("statictext", undefined, undefined, {name: "resolutionLabel", multiline: true}); 
    resolutionLabel.text = "Resolution"; 
    resolutionLabel.preferredSize.width = 80; 
    resolutionLabel.justify = "right"; 
    resolutionLabel.alignment = ["left","center"]; 

var resolutionInput = resolutionGrp.add('edittext {properties: {name: "resolutionInput"}}'); 
    resolutionInput.text = exportInfo.docDPI;//"Set Resolution..."; 
    resolutionInput.preferredSize.width = 120; 

var dpiLabel = resolutionGrp.add("statictext", undefined, undefined, {name: "dpiLabel", multiline: true}); 
    dpiLabel.text = "dpi"; 
    dpiLabel.alignment = ["left","center"]; 

// COLORMODEGRP
// ============
var colormodeGrp = canvasLabel.add("group", undefined, {name: "colormodeGrp"}); 
    colormodeGrp.orientation = "row"; 
    colormodeGrp.alignChildren = ["left","center"]; 
    colormodeGrp.spacing = 10; 
    colormodeGrp.margins = 0; 

var colormodeLabel = colormodeGrp.add("statictext", undefined, undefined, {name: "colormodeLabel", multiline: true}); 
    colormodeLabel.text = "Color Mode"; 
    colormodeLabel.preferredSize.width = 80; 
    colormodeLabel.justify = "right"; 
    colormodeLabel.alignment = ["left","center"]; 

var colormodeDropdown_array = ["Grayscale","RGB color","CMYK color","LAB color"]; 
var colormodeDropdown = colormodeGrp.add("dropdownlist", undefined, undefined, {name: "colormodeDropdown", items: colormodeDropdown_array}); 
    colormodeDropdown.helpTip = "Choose canvas preset size"; 
    colormodeDropdown.selection = exportInfo.docColorModeIndex;//0; 
    colormodeDropdown.preferredSize.width = 90; 

var bitDepthDropdown_array = ["8 bit","16 bit","32 bit"]; 
var bitDepthDropdown = colormodeGrp.add("dropdownlist", undefined, undefined, {name: "bitDepthDropdown", items: bitDepthDropdown_array}); 
    bitDepthDropdown.helpTip = "Choose color profile for document"; 
    bitDepthDropdown.selection = exportInfo.docBitD;//0; 
    bitDepthDropdown.preferredSize.width = 58; 


// COLORPROFILEGRP
// ===============
var colorprofileGrp = canvasLabel.add("group", undefined, {name: "colorprofileGrp"}); 
    colorprofileGrp.orientation = "row"; 
    colorprofileGrp.alignChildren = ["center","center"]; 
    colorprofileGrp.spacing = 10; 
    colorprofileGrp.margins = 0; 
    colorprofileGrp.alignment = ["fill","top"]; 

var colorprofileLabel = colorprofileGrp.add("statictext", undefined, undefined, {name: "colorprofileLabel", multiline: true}); 
    colorprofileLabel.text = "Color Profile"; 
    colorprofileLabel.preferredSize.width = 80; 
    colorprofileLabel.justify = "right"; 
    colorprofileLabel.alignment = ["center","center"]; 

var colorprofileDropdown_array = [
    "sRGB IEC61966-2.1",
    "Adobe RGB (1998)",
    "Apple RGB",
    "ColorMath RGB",
    "HDTV (REC. 709",
    "Image P3",
    "SWOP Coated 240% Ink Limit",
    "U.S. Web Coated (SWOP) v2",
    "Coated FOGRA27 (ISO 12647-2:2004)",
    "Coated FOGRA39 (ISO 12647-2:2004)",
    "Japan Color 2001 Coated",
    "Japan Color 2001 Uncoated",
    "Japan Color 2002 Newspaper",
    "Japan Color 2003 Web Coated",
    "Japan Web Coated (ad)"
    ]; 

var colorprofileGRAY_array = [
    "Dot Gain 10%",
    "Dot Gain 15%",
    "Dot Gain 20%",
    "Dot Gain 25%",
    "Dot Gain 35%",
    "-",
    "Gray Gamma 1.8",
    "Gray Gamma 2.2"
    ]; 

var colorprofileRGB_array = [
    "sRGB IEC61966-2.1",
    "Adobe RGB (1998)",
    "Apple RGB",
    "ColorMath RGB",
    "HDTV (REC. 709",
    "Image P3",
    "ProPhoto RGB"
    ]; 

var colorprofileCMYK_array = [
    "Coated FOGRA27 (ISO 12647-2:2004)",
    "Coated FOGRA39 (ISO 12647-2:2004)",
    "Uncoated FOGRA29 (ISO 12647-2:2004",
    "-",
    "Japan Color 2001 Coated",
    "Japan Color 2001 Uncoated",
    "Japan Color 2002 Newspaper",
    "Japan Color 2003 Web Coated",
    "-",
    "SWOP Coated 240% Ink Limit",
    "U.S. Web Coated (SWOP) v2",
    "U.S. Web Unoated v2",
    "-",
    "Euroscale Coated v2",
    "Euroscale Uncoated v2",
    "-",
    "Generic CMYK Profile",
    "Photoshop 4 Default",
    "Photoshop 5 Default"
    ]; 

    
var colorprofileDropdown = colorprofileGrp.add("dropdownlist", undefined, undefined, {name: "colorprofileDropdown", items: colorprofileRGB_array}); 
    colorprofileDropdown.helpTip = "Choose color profile for document"; 
    colorprofileDropdown.selection = 0; 
    colorprofileDropdown.preferredSize.width = 158; 

// TIMELINELABEL
// =============
var timelineLabel = newDocCustomDialogBox.add("panel", undefined, undefined, {name: "timelineLabel"}); 
    timelineLabel.text = "Timeline"; 
    timelineLabel.orientation = "column"; 
    timelineLabel.alignChildren = ["center","top"]; 
    timelineLabel.spacing = 8; 
    timelineLabel.margins = 16; 

// ADVANCEDGRP
// ===========
var advancedGrp = timelineLabel.add("group", undefined, {name: "advancedGrp"}); 
    advancedGrp.orientation = "row"; 
    advancedGrp.alignChildren = ["center","center"]; 
    advancedGrp.spacing = 10; 
    advancedGrp.margins = 0; 
    advancedGrp.alignment = ["fill","top"]; 

var durationLabel = advancedGrp.add("statictext", undefined, undefined, {name: "durationLabel", multiline: true}); 
    durationLabel.text = "Duration"; 
    durationLabel.preferredSize.width = 64; 
    durationLabel.justify = "right"; 
    durationLabel.alignment = ["center","center"]; 

var durationInput = advancedGrp.add('edittext {properties: {name: "durationInput"}}'); 
    durationInput.helpTip = "Set frames or timecode"; 
    durationInput.text = exportInfo.tmlnDuration;//"Frames / Times..."; 
    durationInput.preferredSize.width = 90; 

var hintGrp = timelineLabel.add("group", undefined, {name: "hintGrp"}); 
    hintGrp.orientation = "row"; 
    hintGrp.alignChildren = ["center","center"]; 
    hintGrp.spacing = 10; 
    hintGrp.margins = 0; 
    hintGrp.alignment = ["fill","top"]; 

var durationHint = hintGrp.add("statictext", undefined, undefined, {name: "durationHint", multiline: true}); 
    durationHint.text = "Timeline duration"; 
    durationHint.preferredSize.width = 250; 
    durationHint.justify = "center"; 
    durationHint.enabled = false; 
    durationHint.alignment = ["center","center"]; 
    durationHint.visible = false; 

var deviderLabel = advancedGrp.add("statictext", undefined, undefined, {name: "deviderLabel", multiline: true}); 
    deviderLabel.text = "@"; 
    deviderLabel.alignment = ["center","center"]; 

var fpsInput = advancedGrp.add('edittext {properties: {name: "fpsInput"}}'); 
    fpsInput.helpTip = "Set Frames Per Second rate"; 
    fpsInput.text = exportInfo.tmlnFps;//"Set FPS..."; 
    fpsInput.preferredSize.width = 50; 

var fpsDropdown_array = ["10","12","12.5","15","23.976","24","25","29.97","30","50","59.94","60","-","Custom"]; 
var fpsDropdown = advancedGrp.add("dropdownlist", undefined, undefined, {name: "fpsDropdown", items: fpsDropdown_array}); 
    fpsDropdown.helpTip = "Set FPS from default presets"; 
    fpsDropdown.selection = exportInfo.fpsPreset; 
    fpsDropdown.preferredSize.width = 60; 

var fpsLabel = advancedGrp.add("statictext", undefined, undefined, {name: "fpsLabel", multiline: true}); 
    fpsLabel.text = "fps"; 
    fpsLabel.alignment = ["center","center"]; 


// SETUPLABEL
// ===========
// var setupLabel = newDocCustomDialogBox.add("panel", undefined, undefined, {name: "setupLabel"}); 
// var setupLabel = newDocCustomDialogBox.add("panel", undefined, undefined, {name: "setupLabel"}); 
    // setupLabel.text = "Setup"; 
    // setupLabel.orientation = "column"; 
    // setupLabel.alignChildren = ["center","top"]; 
    // setupLabel.spacing = 8; 
    // setupLabel.margins = 16; 

// setupGrp
// =============
var setupGrp = timelineLabel.add("group", undefined, {name: "setupGrp"}); 
    setupGrp.orientation = "row"; 
    setupGrp.alignChildren = ["center","center"]; 
    setupGrp.spacing = 10; 
    setupGrp.margins = 0; 
    setupGrp.alignment = ["fill","top"]; 

var splitTmlnCheck = setupGrp.add("checkbox", undefined, undefined, {name: "splitTmlnCheck"}); 
    splitTmlnCheck.text = "Split Timeline"; 
    // splitTmlnCheck.preferredSize.width = 150; 
    splitTmlnCheck.checked = exportInfo.splitTmln; 
    
var splitTmlnLabel = setupGrp.add("statictext", undefined, undefined, {name: "splitTmlnLabel", multiline: true}); 
    splitTmlnLabel.text = "@"; 
    splitTmlnLabel.alignment = ["left","center"]; 
    splitTmlnLabel.visible = exportInfo.splitTmln; 

var splitTmlnDropdown_array = ["1 frame","2 frames"]; 
var splitTmlnDropdown = setupGrp.add("dropdownlist", undefined, undefined, {name: "splitTmlnDropdown", items: splitTmlnDropdown_array}); 
    splitTmlnDropdown.helpTip = "Splits the Timeline by 1 or 2 frames"; 
    splitTmlnDropdown.selection = exportInfo.splitTmlnIndex; 
    // splitTmlnDropdown.preferredSize.width = 60; 
    splitTmlnDropdown.visible = exportInfo.splitTmlnIndex; 

// Slows process down A LOT!!!
// TIMEREFGrp
// =============
// var timerefGrp = timelineLabel.add("group", undefined, {name: "timerefGrp"}); 
//     timerefGrp.orientation = "row"; 
//     timerefGrp.alignChildren = ["center","center"]; 
//     timerefGrp.spacing = 10; 
//     timerefGrp.margins = 0; 
//     timerefGrp.alignment = ["fill","top"]; 
//     timerefGrp.visible = false; // HIDE THIS FOR NOW

// var timerefCheck = timerefGrp.add("checkbox", undefined, undefined, {name: "timerefCheck"}); 
//     timerefCheck.text = "Add Time Reference";
//     timerefCheck.helpTip = "Adds time reference using 00:00:00:00 + CurrFrame + FPS ";  
//     // splitTmlnCheck.preferredSize.width = 150; 
//     timerefCheck.checked = exportInfo.addTimeRef; 


// var addFrameCheck = setupGrp.add("checkbox", undefined, undefined, {name: "addFrameCheck"}); 
//     addFrameCheck.text = "Add Blank Frame"; 

// Cant be scripted?
// var tmlModeGrp = timelineLabel.add("group", undefined, {name: "advancedGrp"}); 
//     tmlModeGrp.orientation = "row"; 
//     tmlModeGrp.alignChildren = ["center","center"]; 
//     tmlModeGrp.spacing = 10; 
//     tmlModeGrp.margins = 0; 
//     tmlModeGrp.alignment = ["fill","top"]; 

// var useTmlFramesCheck = tmlModeGrp.add("checkbox", undefined, undefined, {name: "useTmlFramesCheck"}); 
//     useTmlFramesCheck.text = "Use timeline frames"; 
//     useTmlFramesCheck.preferredSize.width = 150; 
//     useTmlFramesCheck.enabled = true; 
    
// var useTmlTimecodeCheck = tmlModeGrp.add("checkbox", undefined, undefined, {name: "useTmlTimecode"}); 
//     useTmlTimecodeCheck.text = "Use timeline timecode"; 
//     useTmlTimecodeCheck.preferredSize.width = 150; 


// PROJECTBACKGROUNDGRP
// =============
var projectBgGrp = canvasLabel.add("group", undefined, {name: "projectBgGrp"}); 
    projectBgGrp.orientation = "row"; 
    projectBgGrp.alignChildren = ["center","center"]; 
    projectBgGrp.spacing = 10; 
    projectBgGrp.margins = 0; 
    projectBgGrp.alignment = ["fill","top"]; 

    projectBgGrp.add('statictext', undefined, strDocBackgroundColor)
var BackgroundColors_array = [strDocColorWhite,strDocColorBlack,strDocColorGray,strDocFgColorOther,strDocBgColorOther,strDocTransparentOther,"-",strDocColorOther]; 
    projectBgGrp.bgSelection = projectBgGrp.add('dropdownlist',undefined, undefined, {name: "backgroundColorDropdown", items: BackgroundColors_array}); 
    // projectBgGrp.bgSelection = projectBgGrp.add('dropdownlist')
    // projectBgGrp.bgSelection.add('item', strDocColorWhite)
    // projectBgGrp.bgSelection.add('item', strDocColorBlack)
    // projectBgGrp.bgSelection.add('item', strDocColorGray)
    // // projectBgGrp.bgSelection.add('item', strDocFgColorOther)
    // projectBgGrp.bgSelection.add('item', strDocBgColorOther)
    // projectBgGrp.bgSelection.add('item', strDocTransparentOther)
    // projectBgGrp.bgSelection.add('item', '-')
    // projectBgGrp.bgSelection.add('item', strDocColorOther)

    projectBgGrp.bgSwatchGrp = projectBgGrp.add('group', [0, 0, 20, 20])
var bgSelectUpdate = true;
var bgSwatchButton = projectBgGrp.bgSwatchGrp.add('button')
    bgSwatchButton.bg = true
    bgSwatchButton.onDraw = function () {} // don't draw the button; it's just there to make the swatch clickable
    projectBgGrp.bgSelection.onChange = function (select) {
        switch (this.selection.index) {
            case 0:
            projectBgGrp.backgroundColor = [255, 255, 255]
            projectBgGrp.bgSwatchGrp.visible = true
            { break }
            case 1:
            projectBgGrp.backgroundColor = [0, 0, 0]
            projectBgGrp.bgSwatchGrp.visible = true
            { break }
            case 2:
            projectBgGrp.backgroundColor = [128, 128, 128]
            projectBgGrp.bgSwatchGrp.visible = true
            { break }
            case 3:
            projectBgGrp.backgroundColor = [app.foregroundColor.rgb.red,app.foregroundColor.rgb.green,app.foregroundColor.rgb.blue];
            projectBgGrp.bgSwatchGrp.visible = true
            { break }
            case 4:
            projectBgGrp.backgroundColor = [app.backgroundColor.rgb.red,app.backgroundColor.rgb.green,app.backgroundColor.rgb.blue];
            projectBgGrp.bgSwatchGrp.visible = true
            { break }
            case 5:
            projectBgGrp.bgSwatchGrp.visible = false
            { break }
            case 7:
            if (bgSelectUpdate){
                swatchButton.onClick()
            }
            projectBgGrp.bgSwatchGrp.visible = true
            // projectBgGrp.backgroundColor = swatchButton.parent.parent.backgroundColor // Works but returns error because of RGB list
            exportInfo.projectBgColor = app.foregroundColor.hsb
            projectBgGrp.backgroundColor = exportInfo.projectBgColor // Works but returns error because of RGB list
            
            { break }
        }
        projectBgGrp.bgSwatchGrp.graphics.backgroundColor = projectBgGrp.graphics.newBrush(projectBgGrp.graphics.BrushType.SOLID_COLOR, [projectBgGrp.backgroundColor[0] / 255, projectBgGrp.backgroundColor[1] / 255, projectBgGrp.backgroundColor[2] / 255])
    }
    projectBgGrp.bgSelection.selection = exportInfo.projectBgColorIndex

    // Color Picker
    var swatchButton = projectBgGrp.bgSwatchGrp.add('button')
    swatchButton.onClick = function () {
        var fg = app.foregroundColor
        var currentColor = new SolidColor()
        currentColor.rgb.red = this.bg == this.parent.parent.backgroundColor[0]; //: this.parent.parent.nameColor[0]
        currentColor.rgb.green = this.bg == this.parent.parent.backgroundColor[1]; //: this.parent.parent.nameColor[1]
        currentColor.rgb.blue = this.bg == this.parent.parent.backgroundColor[2]; //: this.parent.parent.nameColor[2]
        // currentColor.rgb.red = this.bg ? this.parent.parent.backgroundColor[0] //: this.parent.parent.nameColor[0]
        // currentColor.rgb.green = this.bg ? this.parent.parent.backgroundColor[1] //: this.parent.parent.nameColor[1]
        // currentColor.rgb.blue = this.bg ? this.parent.parent.backgroundColor[2] //: this.parent.parent.nameColor[2]
        app.foregroundColor = currentColor
        var completed = app.showColorPicker()
        newDocCustomDialogBox.active = true
        if (completed) {
        var pickedColor = app.foregroundColor
        if (this.bg) {
            this.parent.parent.backgroundColor = [pickedColor.rgb.red, pickedColor.rgb.green, pickedColor.rgb.blue]
            // exportInfo.projectBgColor = this.parent.parent.backgroundColor > Returns RGB we need HSB
            exportInfo.projectBgColor = pickedColor.hsb
            bgSelectUpdate = false; // dont call colorPicker again from background dropdown
            projectBgGrp.bgSelection.selection = bgcustom
        } else { this.parent.parent.nameColor = [pickedColor.rgb.red, pickedColor.rgb.green, pickedColor.rgb.blue] }
        var gfx = this.parent.graphics
        gfx.backgroundColor = gfx.newBrush(gfx.BrushType.SOLID_COLOR, [pickedColor.rgb.red / 255, pickedColor.rgb.green / 255, pickedColor.rgb.blue / 255])
        }
        // app.foregroundColor = fg // FG set foreground to wrong color
        app.foregroundColor = pickedColor // set forground to new set color as well
    }
    swatchButton.onDraw = function () {} // don't draw the button; it's just there to make the swatch clickable
    bgSwatchButton.onClick = swatchButton.onClick


// PRESETSDDGRP
// ==============
var presetsPanel = newDocCustomDialogBox.add("panel", undefined, undefined, {name: "presetsPanel"}); 
    presetsPanel.text = "Project Presets"; 
    presetsPanel.orientation = "row"; 
    presetsPanel.alignChildren = ["center","top"]; 
    presetsPanel.spacing = 8; 
    presetsPanel.margins = 16; 

var presetList_array = ["Select...","Preset 01","Preset 02"]; 
var presetListDropDown = presetsPanel.add("dropdownlist", undefined, undefined, {name: "presetListDropDown", items: presetList_array}); 
    presetListDropDown.helpTip = "Choose, add or remove presets"; 
    presetListDropDown.selection = 0; 
    presetListDropDown.preferredSize.width = 163; 

var saveNewPresetButton = presetsPanel.add('button');
    saveNewPresetButton.text = "New";
    saveNewPresetButton.preferredSize.width = "44";//[44,24]; 

var deletePresetButton = presetsPanel.add('button');
    deletePresetButton.text = "Remove";
    deletePresetButton.preferredSize.width = "60";//[60,24]; 

var resetPresetsButton = presetsPanel.add('button');
    resetPresetsButton.text = "Reset";
    resetPresetsButton.preferredSize.width = "50";//[50,24]; 

// var presetsPanel: Panel {
//     	orientation: 'row',
//     	alignChildren: 'center',
//     	text: 'Presets',
//     	margins: 14,
//     	presetList: DropDownList {preferredSize: [163,20] },
//     	saveNewPreset: Button { text: 'New', preferredSize: [44,24]},
//     	deletePreset: Button { text: 'Remove', preferredSize: [60,24]},
//     	resetPresets: Button { text: 'Reset', preferredSize: [50,24]}
//     }


// BUTTONGROUP
// ===========
var buttonGroup = newDocCustomDialogBox.add("group", undefined, {name: "buttonGroup"}); 
    buttonGroup.orientation = "row"; 
    buttonGroup.alignChildren = ["right","center"]; 
    buttonGroup.spacing = 8; 
    buttonGroup.margins = [0,10,0,0]; 
    buttonGroup.alignment = ["fill","top"]; 

// DIALOGBUTTONS
// =============
var dialogButtons = buttonGroup.add("group", undefined, {name: "dialogButtons"}); 
    dialogButtons.orientation = "row"; 
    dialogButtons.alignChildren = ["right","top"]; 
    dialogButtons.spacing = 8; 
    dialogButtons.margins = [0,0,0,0]; 
    dialogButtons.alignment = ["right","fill"]; 

var cancelButton = dialogButtons.add("button", undefined, undefined, {name: "cancelButton"}); 
    cancelButton.helpTip = "Cancel new create document"; 
    cancelButton.text = "Cancel"; 

var okBtn = dialogButtons.add("button", undefined, undefined, {name: "okBtn"}); 
    okBtn.helpTip = "Create document using setting"; 
    okBtn.text = "OK"; 

//    END SCRIPT UI 

 // UI Interaction buttons, dropdowns and inputs
    // Lock custom width height with preset
    sizePresetDropdown.onChange = function() {
        // Skip one for Custom Dimenions
        // Skip one for ————— marker
        if (this.selection.index == 2) {
            widthInput.text = "1280";
            heightInput.text = "720";
        }
        if (this.selection.index == 3) {
            widthInput.text = "1920";
            heightInput.text = "1080";
        }
        if (this.selection.index == 4) {
            widthInput.text = "1828";
            heightInput.text = "1332";
        }
        if (this.selection.index == 5) {
            widthInput.text = "3656";
            heightInput.text = "2664";
        }
        if (this.selection.index == 6) {
            widthInput.text = "2048";
            heightInput.text = "1556";
        }
        if (this.selection.index == 7) {
            widthInput.text = "4096";
            heightInput.text = "3112";
        }
        if (this.selection.index == 8) {
            widthInput.text = "8112";
            heightInput.text = "6224";
        }
        // Skip one for ————— marker
        if (this.selection.index == 10) {
            widthInput.text = "720";
            heightInput.text = "720";
        }
        if (this.selection.index == 11) {
            widthInput.text = "1080";
            heightInput.text = "1080";
        }
        if (this.selection.index == 12) {
            widthInput.text = "1080";
            heightInput.text = "1920";
        }
    }
    widthInput.onChange = function() {
        sizePresetDropdown.items[0].selected = true;
    }
    heightInput.onChange = function() {
        sizePresetDropdown.items[0].selected = true;
    }


    function getColorProfile(colorprofileDropdown){
        // switch (colorprofileDropdown.selection.index) {
        //     case srgb: 
        //         colorProfile = "sRGB IEC61966-2.1";
        //         break;
        //     case adobergb:
        //         colorProfile = "Adobe RGB (1998)";
        //         break;
        //     case applergb:
        //         colorProfile = "Apple RGB";
        //         break;
        //     case colormatch:
        //         colorProfile = "ColorMath RGB";
        //         break;
        //     case hdtv:
        //         colorProfile = "HDTV(REC. 709)";
        //         break;
        //     case imagep3:
        //         colorProfile = "Image P3";
        //         break;
        // }
        // return colorProfile
        return colorprofileDropdown.selection.text
    }

    function getBitDepth(bitDepthDropdown){

        switch (bitDepthDropdown.selection.index) {
            case eightbit: 
                bitDepth = 8;
                break;
            case sixtnbit:
                bitDepth = 16;
                break;
            case thytwbit:
                bitDepth = 32;
                break;
        }
        return bitDepth
    }
    // Validate numbers & timecode only
    durationInput.addEventListener ('keydown', DesmalEditKeyboardHandler);
        //  this.text.val(this.text.val().replace(/[^0-9]/g, ''));
    // }

    // Store timecode input when fps is changed
    var timeCodeStore;
    var useTimeCode = false;
    durationInput.onChange = function() {
        var durationCheck = validate(durationHint,this.text);
        // this.text = this.text.replace(/[^0-9:]/g, '');
        if (durationCheck == "timecode"){
            timeCodeStore = this.text; 
            useTimeCode = true;
            // var timeToFranes = toFrames(this.text);
            this.text = toFrames(this.text);
        }
        if (durationCheck == "frames"){
            this.text = this.text;
            useTimeCode = false;
        }
    }

    fpsDropdown.onChange = function() {
        if(this.selection.index!=13){
            fpsInput.text = this.selection.text;
            exportInfo.tmlnFps = this.selection.text; //Update stored fps
            if(useTimeCode){ 
                durationInput.text = toFrames(timeCodeStore); // Adjust duration to new fps
            }
            durationHint.text = "Timeline duration " + framesToTMC(Number(durationInput.text)); // Adjust frames to time indication
        }
    }
    // Validate numbers only
    fpsInput.addEventListener ('keydown', NumericEditKeyboardHandler);

    fpsInput.onChange = function() {
        fpsDropdown.items[13].selected = true;
        exportInfo.tmlnFps = this.text; //Update stored fps
        if(useTimeCode){ 
            durationInput.text = toFrames(timeCodeStore); // Adjust duration to new fps
        }
        durationHint.text = "Timeline duration " + framesToTMC(Number(durationInput.text)); // Adjust frames to time indication
        // durationHint.text = "Tiasdasd " ; // Adjust frames to time indication
    }
    // Color Profile 
    // colorprofileDropdown.onChange = function() {
    //     alert(this.selection.index)
    //     switch (this.selection.index) {
    //         case srgb: 
    //             colorProfile = "sRGB IEC61966-2.1";
    //             break;
    //         case adobergb:
    //             colorProfile = "Adobe RGB (1998)";
    //             break;
    //         case applergb:
    //             colorProfile = "Apple RGB";
    //             break;
    //         case colormatch:
    //             colorProfile = "ColorMath RGB";
    //             break;
    //         case hdtv:
    //             colorProfile = "HDTV(REC. 709)";
    //             break;
    //         case imagep3:
    //             colorProfile = "Image P3";
    //             break;
    //     }
    // }


    // Color Mode 
    colormodeDropdown.onChange = function() {
        // var oldList = colorprofileDropdown.items.length
        colorprofileDropdown.enabled = true;
        colorprofileLabel.enabled = true;
        colorprofileDropdown.removeAll()
        if (colormodeDropdown.selection.index == 0) {
            for(i=0;i<colorprofileGRAY_array.length;i++) {
                items = colorprofileGRAY_array[i] == "-" ? "separator" : "item"
                colorprofileDropdown.add(items,colorprofileGRAY_array[i]);
            }
        }
        if (colormodeDropdown.selection.index == 1) {
            for(i=0;i<colorprofileRGB_array.length;i++) {
                items = colorprofileRGB_array[i] == "-" ? "separator" : "item"
                colorprofileDropdown.add(items,colorprofileRGB_array[i]);
            }
        }
        if (colormodeDropdown.selection.index == 2) {
            for(i=0;i<colorprofileCMYK_array.length;i++) {
                items = colorprofileCMYK_array[i] == "-" ? "separator" : "item"
                colorprofileDropdown.add(items, colorprofileCMYK_array[i])
            }
        }
        if (colormodeDropdown.selection.index == 3) {
            // colorprofileDropdown.remove(colorprofileDropdown.selection.index[0])
            colorprofileDropdown.enabled = false;
            colorprofileLabel.enabled = false;
        }
        colorprofileDropdown.items[0].selected=true
    }

    function getColorMode(colormodeDropdown) {
        switch (colormodeDropdown.selection.index) {
            case grayscale:    
                docColorMode = "Grys"; 
                break;
            case rgb:          
                docColorMode = "RGBM"; 
                break;
            case cmyk:         
                docColorMode = "CMYM";
                break;
            case lab:          
                docColorMode = "LbCM"; 
                break;
            default: throw "Bad color mode specified";
        }
        return docColorMode
    }
    
    splitTmlnCheck.onClick = function() {
        exportInfo.splitTmln = this.value;
        exportInfo.splitTmlnIndex = splitTmlnDropdown.selection.index;
        splitTmlnDropdown.visible = exportInfo.splitTmln;
        splitTmlnLabel.visible = exportInfo.splitTmln;
        // splitTmlnTwoCheck.checked = this.value == true ? false : true;
    }
    splitTmlnDropdown.onChange = function() {
        exportInfo.splitTmlnIndex = this.value;
    }


    cancelButton.onClick = function() {
        newDocCustomDialogBox.close(cancelButtonID);
    }

    okBtn.onClick = function() {
        // check if the setting is properly
        if (renameLayer.length == 0) {
            alert(strAlertRename); // +" "+ strAlertFailure);
            return;
        }
        newDocCustomDialogBox.close(runButtonID);
    }

    // in case we double clicked the file
    app.bringToFront();
    newDocCustomDialogBox.center();

    // newDocCustomDialogBox.show();
    var result = newDocCustomDialogBox.show();

    if (cancelButtonID == result) {
        return result; // close to quit
    }

    
    
    // Get settings from Dialog
    // Document Settings
    exportInfo.docName = projectnameInput.text;
    exportInfo.docColorMode = getColorMode(colormodeDropdown);
    exportInfo.docHeight = heightInput.text;
    exportInfo.docWidth = widthInput.text;
    exportInfo.docICC = getColorProfile(colorprofileDropdown);
    exportInfo.docBitD = getBitDepth(bitDepthDropdown);
    // alert(colorProfile)
    // alert(exportInfo.docICC)
    exportInfo.docDPI = resolutionInput.text;
    
    // Timeline Settings
    exportInfo.tmlnDuration = durationInput.text;
    exportInfo.tmlnFps = fpsInput.text;

    // Background Color
    // exportInfo.projectBgColorIndex = exportInfo.artboardNameColor = projectBgGrp.nameColor
    // exportInfo.projectBgGrp.backgroundColor = exportInfo.projectBgColor;

    exportInfo.projectBgColor = projectBgGrp.backgroundColor // this is RGB we need HSB
    exportInfo.projectBgColorIndex = projectBgGrp.bgSelection.selection.index;


    // Extra Options
    exportInfo.splitTmln = splitTmlnCheck.value;
    // exportInfo.addTimeRef = timerefCheck.value;

    return result;

}

function selFirstFrameLyr(){
    // Better use layerID here, select by layername can cause issues
    var desc13221 = new ActionDescriptor();
    var ref3857 = new ActionReference();
    ref3857.putName( cTID('Lyr '), "Layer 1" );
    desc13221.putReference( cTID('null'), ref3857 );
    desc13221.putBoolean( cTID('MkVs'), false );
    var list1402 = new ActionList();
    list1402.putInteger( 2 );
    desc13221.putList( cTID('LyrI'), list1402 );
    executeAction( cTID('slct'), desc13221, DialogModes.NO );
}

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

function moveEnd(){
    // Move so we get nice round frames
    // =======================================================
    var idmoveOutTime = stringIDToTypeID("moveOutTime");
    var desc49 = new ActionDescriptor();
    executeAction(idmoveOutTime, desc49, DialogModes.NO);
}
function workEnd(){
    var desc6950 = new ActionDescriptor();
    var ref2455 = new ActionReference();
    ref2455.putProperty( cTID('Prpr'), sTID('workOutTime') );
    ref2455.putClass( sTID('timeline') );
    desc6950.putReference( cTID('null'), ref2455 );
    var desc6951 = new ActionDescriptor();
    desc6951.putInteger( sTID('seconds'), 0 );
    desc6951.putInteger( sTID('frame'), Number(exportInfo.tmlnDuration) );
    desc6951.putDouble( sTID('frameRate'), Number(exportInfo.tmlnFps) );
    desc6950.putObject( cTID('T   '), sTID('timecode'), desc6951 );
    executeAction( cTID('setd'), desc6950, DialogModes.NO );
}

function splitNewDoc(frStep){
    try {
        gotoFrame(frStep); //Start at frame 1
        var totFrm = timelineFrameCount();
        // alert(totFrm)
        var sttFrm = timelineCurrentFrame();
        var curFrm = 0;

        for (curFrm=0;curFrm < totFrm; curFrm++){
            gotoFrame((curFrm * frStep))

            // if (exportInfo.addTimeRef){
            //     var name = "00:00:00:00 "+timelineCurrentFrame()+"fr "+GetFrameRate()+"fps"
            //     var font = 'MyriadPro-Regular'
            //     var size = 24
            //     var color = [0,0,0]
            //     var frameColor = [255,255,255]
            //     placeTimeRef (name, font, size, color, frameColor) // timecode + currframe + fps , string, # pt, int, array, array
            //     // placeTimeRef (name, font, size, color, frameColor) // timecode + currframe + fps , string, # pt, int, array, array
            // }
            // alert(curFrm)
            // Cut ttimeline
            var desc73 = new ActionDescriptor();
            executeAction( sTID('splitVideoLayer'), desc73, DialogModes.NO );
        }
        // moveEnd()

        // // goto next frame
        // var desc63 = new ActionDescriptor();
        // var ref23 = new ActionReference();
        // ref23.putProperty( cTID('Prpr'), sTID('time') );
        // ref23.putClass( sTID('timeline') );
        // desc63.putReference( cTID('null'), ref23 );
        // var desc64 = new ActionDescriptor();
        // desc64.putInteger( sTID('seconds'), 0 );
        // desc64.putInteger( sTID('frame'), 1 );
        // desc64.putDouble( sTID('frameRate'), Number(exportInfo.tmlnFps) );
        // desc63.putObject( cTID('T   '), sTID('timecode'), desc64 );
        // executeAction( cTID('setd'), desc63, DialogModes.NO );
    } catch(e){
        alert(e)
    }
}

function newDocPreset(exportInfo){
    // New document 1920x1080p
    // alert(exportInfo.docColorMode)
    // alert(exportInfo.docICC)
    // alert(StrToIntWithDefault(exportInfo.docHeight,exportInfo.docHeight))
    var idMk = charIDToTypeID("Mk  ");
    var desc1 = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var desc2 = new ActionDescriptor();
    var idNm = charIDToTypeID("Nm  ");
    desc2.putString(idNm, exportInfo.docName);
    var idMd = charIDToTypeID("Md  ");
    var idRGBM = charIDToTypeID(exportInfo.docColorMode);
    desc2.putClass(idMd, idRGBM);
    var idWdth = charIDToTypeID("Wdth");
    var idRlt = charIDToTypeID("#Rlt");
    desc2.putUnitDouble(idWdth, idRlt, StrToIntWithDefault(exportInfo.docWidth,exportInfo.docWidth));
    var idHght = charIDToTypeID("Hght");
    var idRlt = charIDToTypeID("#Rlt");
    desc2.putUnitDouble(idHght, idRlt, StrToIntWithDefault(exportInfo.docHeight,exportInfo.docHeight));
    var idRslt = charIDToTypeID("Rslt");
    var idRsl = charIDToTypeID("#Rsl");
    desc2.putUnitDouble(idRslt, idRsl, StrToIntWithDefault(exportInfo.docDPI));
    var idpixelScaleFactor = stringIDToTypeID("pixelScaleFactor");
    desc2.putDouble(idpixelScaleFactor, 1.000000);
    // bgColor
    switch (exportInfo.projectBgColorIndex) {
        case bgwhite:    
            bgDocColr = charIDToTypeID("Wht ");
            break;
        case bgblack:          
            bgDocColr = charIDToTypeID( "Blck" );
            break;
        case bggray:          
            bgDocColr = charIDToTypeID( "Clr " );
            break;
        case bgforeground:         
            bgDocColr = charIDToTypeID( "Clr " );
            break;
        // CRASHES ps only works with Fill    
        //     bgDocColr = charIDToTypeID( "FrgC" );
        case bgbackground:         
            bgDocColr = charIDToTypeID( "BckC" );
            break;
        case bgtransparent:          
            bgDocColr = charIDToTypeID( "Trns" );
            break;
        case bgcustom:          
            bgDocColr = charIDToTypeID( "Clr " );
            break;
        default: throw "Bad color mode specified";
    }
    

    // var idWht = charIDToTypeID("Wht ");
    // var idBlck = charIDToTypeID( "Blck" );
    // var idBckC = charIDToTypeID( "BckC" );
    // var idTrns = charIDToTypeID( "Trns" );
    // var idClr = charIDToTypeID( "Clr " );
    // var idWht = charIDToTypeID("Blk "); CRASHES PS !!!
    // desc2.putEnumerated(idFl, idFl, idBlck);
    var idFl = charIDToTypeID("Fl  ");
    var idFl = charIDToTypeID("Fl  ");
    // Preset Color   
    if (exportInfo.projectBgColorIndex == bgwhite||bgblack||bgbackground||bgtransparent){
        desc2.putEnumerated(idFl, idFl, bgDocColr);
    }
    // Foreground Color workaround   
    if (exportInfo.projectBgColorIndex == bgforeground){
        var hsb = app.foregroundColor.hsb;
        desc2.putEnumerated( idFl, idFl, bgDocColr );
        var idFlCl = charIDToTypeID( "FlCl" );
            var desc55 = new ActionDescriptor();
            var idH = charIDToTypeID( "H   " );
            var idAng = charIDToTypeID( "#Ang" );
            desc55.putUnitDouble( idH, idAng, hsb.hue );
            var idStrt = charIDToTypeID( "Strt" );
            desc55.putDouble( idStrt, hsb.saturation);
            var idBrgh = charIDToTypeID( "Brgh" );
            desc55.putDouble( idBrgh, hsb.brightness);
        var idHSBC = charIDToTypeID( "HSBC" );
        desc2.putObject( idFlCl, idHSBC, desc55 );
    }
    // Gray Color   
    if (exportInfo.projectBgColorIndex == bggray){
        desc2.putEnumerated( idFl, idFl, bgDocColr );
        // alert(typeof(exportInfo.projectBgColor[0]))
        var idFlCl = charIDToTypeID( "FlCl" );
            var desc55 = new ActionDescriptor();
            var idH = charIDToTypeID( "H   " );
            var idAng = charIDToTypeID( "#Ang" );
            desc55.putUnitDouble( idH, idAng, 0);
            var idStrt = charIDToTypeID( "Strt" );
            desc55.putDouble( idStrt, 0);
            var idBrgh = charIDToTypeID( "Brgh" );
            desc55.putDouble( idBrgh, 50 );
        var idHSBC = charIDToTypeID( "HSBC" );
        desc2.putObject( idFlCl, idHSBC, desc55 );
    }
    //Custom Color   
    if (exportInfo.projectBgColorIndex == bgcustom){
        // alert(typeof(exportInfo.projectBgColor[0]))
        // alert(exportInfo.projectBgColor)
        // var hsv = RGBtoHSV(exportInfo.projectBgColor);
        var hsb = exportInfo.projectBgColor; //(exportInfo.projectBgColor.hue,exportInfo.projectBgColor.saturation,exportInfo.projectBgColor.value);
        // alert(hsb.hue)
        desc2.putEnumerated( idFl, idFl, bgDocColr );
        var idFlCl = charIDToTypeID( "FlCl" );
            var desc55 = new ActionDescriptor();
            var idH = charIDToTypeID( "H   " );
            var idAng = charIDToTypeID( "#Ang" );
            desc55.putUnitDouble( idH, idAng, hsb.hue );
            var idStrt = charIDToTypeID( "Strt" );
            desc55.putDouble( idStrt, hsb.saturation);
            var idBrgh = charIDToTypeID( "Brgh" );
            desc55.putDouble( idBrgh, hsb.brightness);
        var idHSBC = charIDToTypeID( "HSBC" );
        desc2.putObject( idFlCl, idHSBC, desc55 );
    }
    
    // var idFl = charIDToTypeID( "Fl  " );
    //     var idFl = charIDToTypeID( "Fl  " );
    //     var idClr = charIDToTypeID( "Clr " );
    //     desc145.putEnumerated( idFl, idFl, idClr );
    //     var idFlCl = charIDToTypeID( "FlCl" );
    //         var desc146 = new ActionDescriptor();
    //         var idH = charIDToTypeID( "H   " );
    //         var idAng = charIDToTypeID( "#Ang" );
    //         desc146.putUnitDouble( idH, idAng, 239.996338 );
    //         var idStrt = charIDToTypeID( "Strt" );
    //         desc146.putDouble( idStrt, 88.627451 );
    //         var idBrgh = charIDToTypeID( "Brgh" );
    //         desc146.putDouble( idBrgh, 66.274510 );
    //     var idHSBC = charIDToTypeID( "HSBC" );
    //     desc145.putObject( idFlCl, idHSBC, desc146 );

    
    var idDpth = charIDToTypeID("Dpth");
    desc2.putInteger(idDpth, exportInfo.docBitD);
    var idprofile = stringIDToTypeID("profile");
    desc2.putString(idprofile, exportInfo.docICC);
    var idDcmn = charIDToTypeID("Dcmn");
    desc1.putObject(idNw, idDcmn, desc2);
    executeAction(idMk, desc1, DialogModes.NO);
    // End Create new document

    // Suspend history > users doesnt need to see al items
    var historyDesc = localize(locNewDocPreset1)+exportInfo.docName+localize(locNewDocPreset2);
    app.activeDocument.suspendHistory(historyDesc, 'setupProject()');
}

function setupProject(){
    // Setup Project Video Group & Blank Frame
    // Create a new Layer
    // Default layer is 144 frames @ 29.97 > therefor first do timeline adjustment then do fps
    var idMk = charIDToTypeID("Mk  ");
    var desc80 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref60 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref60.putClass(idLyr);
    desc80.putReference(idnull, ref60);
    executeAction(idMk, desc80, DialogModes.NO);

    // create a Video Timeline
    var idmakeTimeline = stringIDToTypeID("makeTimeline");
    executeAction(idmakeTimeline, undefined, DialogModes.NO);

    // =======================================================
    // open dialog box to setup the Duration framerate
    // var idslct = charIDToTypeID("slct");
    // var desc10 = new ActionDescriptor();
    // var idnull = charIDToTypeID("null");
    // var ref10 = new ActionReference();
    // var idMn = charIDToTypeID("Mn  ");
    // var idMnIt = charIDToTypeID("MnIt");
    // var idtimelineDocumentSettings = stringIDToTypeID("timelineDocumentSettings");
    // ref10.putEnumerated(idMn, idMnIt, idtimelineDocumentSettings);
    // desc10.putReference(idnull, ref10);
    // executeAction(idslct, desc10, DialogModes.NO);

    // =======================================================
    // Create a Video Group based on the Selected layer(s)
    var idMk = charIDToTypeID("Mk  ");
    var desc4 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref3 = new ActionReference();
    var idsceneSection = stringIDToTypeID("sceneSection");
    ref3.putClass(idsceneSection);
    desc4.putReference(idnull, ref3);
    var idFrom = charIDToTypeID("From");
    var ref4 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref4.putEnumerated(idLyr, idOrdn, idTrgt);
    desc4.putReference(idFrom, ref4);
    executeAction(idMk, desc4, DialogModes.NO);

    // =======================================================
    // Rename the Video Group
    var idsetd = charIDToTypeID("setd");
    var desc98 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref76 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref76.putEnumerated(idLyr, idOrdn, idTrgt);
    desc98.putReference(idnull, ref76);
    var idT = charIDToTypeID("T   ");
    var desc99 = new ActionDescriptor();
    var idNm = charIDToTypeID("Nm  ");
    desc99.putString(idNm, exportInfo.docName);
    var idLyr = charIDToTypeID("Lyr ");
    desc98.putObject(idT, idLyr, desc99);
    executeAction(idsetd, desc98, DialogModes.NO);

    // =======================================================
    // Move (select) the layer below
    var idslct = charIDToTypeID("slct");
    var desc7 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref7 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idBckw = charIDToTypeID("Bckw");
    ref7.putEnumerated(idLyr, idOrdn, idBckw);
    desc7.putReference(idnull, ref7);
    var idMkVs = charIDToTypeID("MkVs");
    desc7.putBoolean(idMkVs, false);
    executeAction(idslct, desc7, DialogModes.NO);
    
    // OLD method > First set time to 0 > default layers adds 120 fr so we move it -119
    // NEW method > Default layers adds 149 fr somthing??  @ 29.97 so we move it -149 
    var desc16 = new ActionDescriptor();
    var desc17 = new ActionDescriptor();
    desc17.putInteger( sTID('seconds'),-4);
    desc17.putInteger( sTID('frame'), -29.97);
    desc17.putDouble( sTID('frameRate'), 29.97); // use default fps 
    desc16.putObject( sTID('timeOffset'), sTID('timecode'), desc17 );
    executeAction( sTID('moveOutTime'), desc16, DialogModes.NO );

    

    // Set out time to timeline length
    var desc16 = new ActionDescriptor();
    var desc17 = new ActionDescriptor();
    // alert(exportInfo.tmlnDuration / exportInfo.tmlnFps)
    // desc17.putInteger( sTID('seconds'),10);
    desc17.putInteger( sTID('frame'), (exportInfo.tmlnDuration)); // Minus 1 timeline starts @ 0
    desc17.putDouble( sTID('frameRate'), exportInfo.tmlnFps);
    // desc17.putDouble( sTID('frameRate'),  29.97);
    desc16.putObject( sTID('timeOffset'), sTID('timecode'), desc17 );
    executeAction( sTID('moveOutTime'), desc16, DialogModes.NO );
    
    // workEnd()

    // Setup the default framerate
    var idsetd = charIDToTypeID("setd");
    var desc243 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref150 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var iddocumentTimelineSettings = stringIDToTypeID("documentTimelineSettings");
    ref150.putProperty(idPrpr, iddocumentTimelineSettings);
    var idtimeline = stringIDToTypeID("timeline");
    ref150.putClass(idtimeline);
    desc243.putReference(idnull, ref150);
    var idframeRate = stringIDToTypeID("frameRate");
    desc243.putDouble(idframeRate, Number(exportInfo.tmlnFps));
    executeAction(idsetd, desc243, DialogModes.NO);
    
    // alert(timelineFrameCount())
    // Transparent doc needs default layer delete
    if (exportInfo.projectBgColorIndex == bgtransparent){
        // Select layer 1 > default created layer
        var desc921 = new ActionDescriptor();
        var ref250 = new ActionReference();
        ref250.putName( cTID('Lyr '), "Layer 1" );
        desc921.putReference( cTID('null'), ref250 );
        desc921.putBoolean( cTID('MkVs'), false );
        var list60 = new ActionList();
        list60.putInteger( 2 );
        desc921.putList( cTID('LyrI'), list60 );
        executeAction( cTID('slct'), desc921, DialogModes.NO );

        // Delete layer 1
        var desc896 = new ActionDescriptor();
        var ref241 = new ActionReference();
        ref241.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
        desc896.putReference( cTID('null'), ref241 );
        var list55 = new ActionList();
        list55.putInteger( 2 );
        desc896.putList( cTID('LyrI'), list55 );
        executeAction( cTID('Dlt '), desc896, DialogModes.NO );
        
    }
    
    // var idsetd = charIDToTypeID("setd");
    // var desc53 = new ActionDescriptor();
    // var idnull = charIDToTypeID("null");
    // var ref38 = new ActionReference();
    // var idPrpr = charIDToTypeID("Prpr");
    // var idtime = stringIDToTypeID("time");
    // ref38.putProperty(idPrpr, idtime);
    // var idtimeline = stringIDToTypeID("timeline");
    // ref38.putClass(idtimeline);
    // desc53.putReference(idnull, ref38);
    // var idT = charIDToTypeID("T   ");
    // var desc54 = new ActionDescriptor();
    // // Sets scrubber location???
    // var idseconds = stringIDToTypeID("seconds");
    // desc54.putInteger(idseconds, 12);
    // // desc54.putInteger(idseconds, Number(exportInfo.tmlnDuration));
    // var idframe = stringIDToTypeID("frame");
    // // desc54.putInteger(idframe, Number(exportInfo.tmlnDuration));
    // // desc54.putInteger(idframe, Number(exportInfo.tmlnDuration));
    // // desc54.putInteger(idframe, StrToIntWithDefault(exportInfo.tmlnDuration));
    // desc54.putInteger(idframe, 120.000);
    // var idframeRate = stringIDToTypeID("frameRate");
    // // desc54.putDouble(idframeRate, 50);
    // // desc54.putDouble(idframeRate, StrToIntWithDefault(exportInfo.tmlnFps));
    // var idtimecode = stringIDToTypeID("timecode");
    // desc53.putObject(idT, idtimecode, desc54);
    // executeAction(idsetd, desc53, DialogModes.NO);


    // Move so we get nice round frames
    

    // =======================================================
    // var idmoveInTime = stringIDToTypeID("moveInTime");
    // var desc50 = new ActionDescriptor();
    // executeAction(idmoveInTime, desc50, DialogModes.NO);
    if (exportInfo.splitTmln) {
        splitNewDoc(exportInfo.splitTmlnIndex+1)
    }
    gotoFrame(0); // Move back at frame 1
    // alert(exportInfo.projectBgColorIndex == bgtransparent)
    if(exportInfo.projectBgColorIndex == bgtransparent) {
        selFirstLyr()
     } else {
        selFirstFrameLyr(); 
    }
    // if (exportInfo.projectBgColorIndex) bgtransparent ? selFirstLyr() : selFirstFrameLyr();
    // if (exportInfo.projectBgColorIndex == bgtransparent){
    //     selFirstLyr() // Select first layer with no background
    // } else {
    //     selFirstFrameLyr() // Select first layer if we have background
    // }
    // moveEnd()
}


newProjectDialog()