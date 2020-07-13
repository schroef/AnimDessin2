//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

function countLayers() {
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
    // alert(selectedLayers.length)
    return selectedLayers.length
}
// var layers = countLayers(docRef)