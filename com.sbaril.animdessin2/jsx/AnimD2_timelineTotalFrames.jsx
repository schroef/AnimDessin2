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
function gotoFrame(Seconds, Frame, frameRate) {
    var desc69 = new ActionDescriptor();
    var ref33 = new ActionReference();
    ref33.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('time'));
    ref33.putClass(stringIDToTypeID('timeline'));
    desc69.putReference(charIDToTypeID('null'), ref33);
    var desc70 = new ActionDescriptor();
    desc70.putInteger(stringIDToTypeID('seconds'), Seconds);
    desc70.putInteger(stringIDToTypeID('frame'), Frame);
    desc70.putDouble(stringIDToTypeID('frameRate'), frameRate);
    desc69.putObject(charIDToTypeID('T   '), stringIDToTypeID('timecode'), desc70);
    executeAction(charIDToTypeID('setd'), desc69, DialogModes.NO);
};