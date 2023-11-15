/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    "use strict";

    var csInterface = new CSInterface();
    var gExtensionId = "com.sbaril.animdessin2.Panel";

    function Persistent(inOn) {
        // keep session stored

        if (inOn) {
            var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
        } else {
            var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
        }

        event.extensionId = gExtensionId;
        csInterface.dispatchEvent(event);
    }

    // Opens the chrome developer tools in host app
    // Depricated https://community.adobe.com/t5/labs/showdevtools-method-added-by-default/td-p/6905305?page=1
    function showDevTools() {
        window.__adobe_cep__.showDevTools();
    }

    // Reloads extension panel
    function reloadPanel() {
        location.reload();
    }

    // Sleeper
    function sleep(milliseconds) {
        console.log("sleep");
        //  const let not working cs2015
        var date = Date.now();
        var currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    function highlightNewDoc(show) {
        var newDoc = document.getElementById("btn_newDoc");
        var myBtn = document.getElementsByClassName("mybtn");
        if (show) {
            newDoc.style.boxShadow = "0 0 0 1.6px #1473e6";
            for (var i = 2; i < myBtn.length; i++) {
                myBtn[i].style.opacity = ".3";
            }
        }
        if (!show) {
            newDoc.style.boxShadow = "none";
            for (var i = 2; i < myBtn.length; i++) {
                myBtn[i].style.opacity = "1";
            }
        }

    }
    // Check if doc is available
    function checkOpenDoc() {
        csInterface.evalScript("checkOpenDoc()", function (count) {
            if (count == "false") {
                highlightNewDoc(true);
            }
            if (count == "true") {
                highlightNewDoc(false);
            }
        });
    }

    // Panel & New Doc should always be available > but we do check weither or not to show button highlighter
    var firstRun = false;
    function loadNoDoc(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        // alert(scriptPath)
        csInterface.evalScript('evalFile("' + scriptPath + '")');
        // checkOpenDoc();
        // if (!firstRun) {
        //     highlightNewDoc(false);
        //     firstRun = true;
        // }
    }

    // Loads / executes a jsx file
    function loadJSXFile(pPath) {
        csInterface.evalScript("checkOpenDoc()", function (count) {
            // console.log(count)    
            if (count == "true") {
                if (!firstRun) {
                    highlightNewDoc(false);
                }
                // var count = Number;
                // First countlayers, so we can show loader before app freezes due to script running
                csInterface.evalScript("countLayers()", function (count) {
                    // Show loader
                    if (count > 30) {
                        $("#loaderBlock").show();
                        setTimeout(function () {
                            var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
                            csInterface.evalScript('evalFile("' + scriptPath + '")', function () {
                                $("#loaderBlock").hide();
                            });
                        }, 100);
                        // Dont show loader
                    } else {
                        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
                        csInterface.evalScript('evalFile("' + scriptPath + '")');
                    }
                });
            } else {
                highlightNewDoc(true);
            }
        });
    }

    // Iconsize > done with fontsize
    function iconSize(size) {
        $("body").removeClass("iconSml").removeClass("iconMed").removeClass("iconBig").addClass(size);
        storeSettings(size);
        // document.getElementsByTagName('BODY').className = document.getElementsByTagName('BODY').className.replace(/(?:^|\s)\"+size+\"(?!\S)/g ,"");
    }
    // Center Icons
    function iconCenter(center) {
        $("body").toggleClass("iconCenter", "");
        storeSettings(center);
    }
    // GLobal Timeline
    function globalTimeline(show) {
        $("#track").toggleClass("globalTimeline", "");
        $("body").toggleClass("globalTimeline", "");
        storeSettings(show);
    }
    // Set timecode > time or frames
    function timeCode(timecode) {
        storeSettings(timecode);
    }
    // ToolTips
    function toolTips() {
        console.log('IconsShow '+(document.getElementsByClassName("ttHide").length))
        console.log('IconsShow '+(document.getElementsByClassName("ttHide").length == 0))
        if (document.getElementsByClassName("ttHide").length == 1) {
            storeSettings("ttShow");
        } else {
            storeSettings("ttHide");
            $("#toolinfo").removeClass("ttShow");
        }
        $("#toolinfo").toggleClass("ttHide", "ttShow");
    }
    var getGlobalTimeline = Boolean();
    var getTooltips = Boolean();
    function resizePanelHeight(getGlobalTimeline,getTooltips){
        var resize = Boolean(false);
        if (getGlobalTimeline == true || getTooltips == true) {
            resize = true
        } 
        if (getGlobalTimeline == true && getTooltips == false) {
            resize = true
        } 
        if (getGlobalTimeline == false && getTooltips == true) {
            resize = true
        } 
        if (getGlobalTimeline == false && getTooltips == false) {
            resize = false
        }
        console.log('Timline: '+getGlobalTimeline+' - Tooltips: '+getTooltips)
        // alert(typeof(getGlobalTimeline)+' - '+typeof(getTooltips))
        // alert(getGlobalTimeline+' - '+getTooltips)
        // alert("check both:'"+(getGlobalTimeline && getTooltips == true)+'"')
        // alert("either "+getGlobalTimeline == true || getTooltips == true)
        // alert("both false "+getGlobalTimeline == false && getTooltips == false)
        // alert(resize)
        var resizePnl = resize == false ? 35 : 55;
        console.log('panel height: '+resizePnl)
        console.log('lower panel: '+(getGlobalTimeline == false && getTooltips == false))
        csInterface.resizeContent(window.innerHeight, resizePnl);
    }
    function checkSettings() {
        $("#btn_onionSkin").addClass(localStorage.getItem("onionSkin"));
        $("#btn_videoShortcuts").addClass(localStorage.getItem("keySettings"));
        if (localStorage.getItem("onionSkin" == "onionDisabled")) {
            $("body").addClass(localStorage.getItem("onionSkin"));
            $("#btn_onionSkin").addClass("onionDisabled");
            // loadJSXFile("/jsx/AnimD2_onionSkin.jsx");
        }
        if (localStorage.getItem("onionSkin" == "onionActive")) {
            loadJSXFile("/jsx/AnimD2_onionSkin.jsx");
        }
        if (localStorage.getItem("keySettings" == "keysDisabled")) {
            $("body").addClass(localStorage.getItem("keysSettings"));
            $("#btn_videoShortcuts").addClass("keysDisabled");
        }
        if (localStorage.getItem("iconSize") == "iconSml") {
            // alert("iconSml")
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, true);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
            csInterface.updateContextMenuItem("iconSml", true, true);
            csInterface.updateContextMenuItem("iconMed", true, false);
            csInterface.updateContextMenuItem("iconBig", true, false);
        }
        if (localStorage.getItem("iconSize") == "iconMed") {
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, true);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
            csInterface.updateContextMenuItem("iconSml", true, false);
            csInterface.updateContextMenuItem("iconMed", true, true);
            csInterface.updateContextMenuItem("iconBig", true, false);
        }
        if (localStorage.getItem("iconSize") == "iconBig") {
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, true);
            csInterface.updateContextMenuItem("iconSml", true, false);
            csInterface.updateContextMenuItem("iconMed", true, false);
            csInterface.updateContextMenuItem("iconBig", true, true);
        }
        if (localStorage.getItem("iconCenter")) {
            var iconCenter = localStorage.getItem("iconCenter");
            iconCenter = iconCenter == "false" ? false : true;
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconCenter, true, iconCenter);
            csInterface.updateContextMenuItem("iconCenter", true, iconCenter);
            var icnCenter = localStorage.getItem("iconCenter");
            icnCenter = icnCenter == "false" ? "" : "iconCenter";
            $("body").addClass(icnCenter);
        }
        if (localStorage.getItem("globalTimeline")) {
            var globalTimeline = localStorage.getItem("globalTimeline");
            console.log('globalTimeline == "false" '+(globalTimeline == "false"))
            globalTimeline = String(globalTimeline) == "false" ? false : true;
            // var getGlobalTimeline = globalTimeline
            getGlobalTimeline = Boolean(globalTimeline);
            csInterface.updatePanelMenuItem(getLocalize().flyout_globalTimeline, true, globalTimeline);
            csInterface.updateContextMenuItem("globalTimeline", true, globalTimeline);
            var globTimeline = localStorage.getItem("globalTimeline");
            globTimeline = globTimeline == "false" ? "" : "globalTimeline";
            $("body").addClass(globTimeline);
            $("#track").addClass(globTimeline);
        }
        if (localStorage.getItem("timeCode")) {
            var timeCode = localStorage.getItem("timeCode");
            timeCode = timeCode == "false" ? false : true;
            localStorage.setItem("timeCode", timeCode);
            csInterface.updatePanelMenuItem(getLocalize().flyout_timeCode, true, timeCode);
            csInterface.updateContextMenuItem("timeCode", true, timeCode);
        }
        if (localStorage.getItem("toolTips") == "ttHide") {
            $("body").removeClass("toolTips");
            csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, false);
            csInterface.updateContextMenuItem("toolTips", true, false);
            // var getTooltips = globalTimeline
            // var getTooltips = globalTimeline
            getTooltips = false;
        }
        if (localStorage.getItem("toolTips") == "ttShow") {
            $("body").addClass("toolTips");
            csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, true);
            csInterface.updateContextMenuItem("toolTips", true, true);
            // var getTooltips = globalTimeline
            getTooltips = true;
        }
        $("body").addClass(localStorage.getItem("iconSize"));
        // var icnCenter = localStorage.getItem("iconCenter") ? "iconCenter" : "";
        // $("body").addClass(icnCenter);
        // // $("body").addClass((iconCenter = localStorage.getItem("iconCenter") ? "iconCenter" : ""));
        // var globTimeline = localStorage.getItem("globalTimeline") ? "globalTimeline" : "";
        // $("body").addClass(globTimeline);
        // $("#track").addClass(globTimeline);
        // $("#track").addClass((globalTimeline = localStorage.getItem("globalTimeline") ? "globalTimeline" : ""));
        $(".mybtn").addClass("tthide");
        $("#toolinfo").addClass(localStorage.getItem("toolTips"));
        resizePanelHeight(Boolean(getGlobalTimeline),Boolean(getTooltips))
        console.log("getGlobalTimeline "+Boolean(getGlobalTimeline)+" "+"getTooltips "+Boolean(getTooltips))
    }

    //Store settings
    function storeSettings(store) {
        var globalTimeline = localStorage.getItem("globalTimeline");
        var toolTips = localStorage.getItem("toolTips");
        if (store == "onion") {
            if (localStorage.getItem("onionSkin") == "onionDisabled") {
                localStorage.setItem("onionSkin", "onionActive");
            } else {
                localStorage.setItem("onionSkin", "onionDisabled");
            }
        }
        if (store == "keys") {
            if (localStorage.getItem("keySettings") == "keysDisabled") {
                localStorage.setItem("keySettings", "keysActive");
            } else {
                localStorage.setItem("keySettings", "keysDisabled");
            }
        }
        if (store == "iconSml") {
            localStorage.setItem("iconSize", "iconSml");
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, true);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
            csInterface.updateContextMenuItem("iconSml", true, true);
            csInterface.updateContextMenuItem("iconMed", true, false);
            csInterface.updateContextMenuItem("iconBig", true, false);
        }
        if (store == "iconMed") {
            localStorage.setItem("iconSize", "iconMed");
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, true);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
            csInterface.updateContextMenuItem("iconSml", true, false);
            csInterface.updateContextMenuItem("iconMed", true, true);
            csInterface.updateContextMenuItem("iconBig", true, false);
        }
        if (store == "iconBig") {
            localStorage.setItem("iconSize", "iconBig");
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, true);
            csInterface.updateContextMenuItem("iconSml", true, false);
            csInterface.updateContextMenuItem("iconMed", true, false);
            csInterface.updateContextMenuItem("iconBig", true, true);
        }
        if (store == "iconCenter") {
            var iconCenter = Boolean(localStorage.getItem("iconCenter"));
            console.log('iconCenter '+iconCenter)
            if (iconCenter == null){
                iconCenter = true;
            } else {
                iconCenter = iconCenter == false ? true : false;
            }
            localStorage.setItem("iconCenter", String(iconCenter));
            csInterface.updatePanelMenuItem(getLocalize().flyout_iconCenter, true, iconCenter);
            csInterface.updateContextMenuItem("iconCenter", true, iconCenter);
        }
        if (store == "globalTimeline") {
            globalTimeline = localStorage.getItem("globalTimeline");
            // var resizePnl = globalTimeline == "false" ? 55 : 35;
            // csInterface.resizeContent(window.innerWidth, resizePnl);
            console.log('globalTimeline '+globalTimeline)
            // console.log('globalTimeline '+typeof(globalTimeline))
            globalTimeline = globalTimeline == "false" ? "true" : "false";
            console.log('store globalTimeline '+globalTimeline)
            // console.log('store globalTimeline == "false" '+ globalTimeline == false)
            // console.log('store globalTimeline == "false" '+(globalTimeline == false))
            localStorage.setItem("globalTimeline", String(globalTimeline));
            // toolTips = toolTips == "ttHide" ? false : true;
            resizePanelHeight(JSON.parse(globalTimeline),Boolean(getTooltips))
            csInterface.updatePanelMenuItem(getLocalize().flyout_globalTimeline, true, JSON.parse(globalTimeline));
            csInterface.updateContextMenuItem("globalTimeline", true, JSON.parse(globalTimeline));
        }
        if (store == "openTimeline") {
            var openTimeline = localStorage.getItem("openTimeline");
            console.log(openTimeline);
            openTimeline = openTimeline == "false" ? "true" : "false";
            localStorage.setItem("openTimeline", String(openTimeline));
            csInterface.updatePanelMenuItem(getLocalize().flyout_openTimeline, true, JSON.parse(openTimeline));
            csInterface.updateContextMenuItem("openTimeline", true, JSON.parse(openTimeline));
            console.log('openTimeline '+openTimeline);
        }
        if (store == "timeCode") {
            var timeCode =  localStorage.getItem("timeCode");
            timeCode = timeCode == "false" ? "true" : "false";
            localStorage.setItem("timeCode", String(timeCode));
            csInterface.updatePanelMenuItem(getLocalize().flyout_timeCode, true, JSON.parse(timeCode));
            csInterface.updateContextMenuItem("timeCode", true, JSON.parse(timeCode));
            console.log('timeCode '+String(timeCode));
        }
        if (store == "ttHide") {
            localStorage.setItem("toolTips", "ttHide");
            // var tooltips = globalTimeline == "false" ? 35 : 55;
            // csInterface.resizeContent(window.innerWidth, tooltips);
            // if (globalTimeline == "false") csInterface.resizeContent(window.innerWidth, 35);
            getTooltips = false;
            resizePanelHeight(JSON.parse(globalTimeline),Boolean(getTooltips))
            $("body").removeClass("toolTips");
            csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, false);
            csInterface.updateContextMenuItem("toolTips", true, false);
        }
        if (store == "ttShow") {
            // var tooltips = localStorage.getItem("toolTips");
            // if (globalTimeline == "false") csInterface.resizeContent(window.innerWidth, 55);
            localStorage.setItem("toolTips", "ttShow");
            getTooltips = true;
            resizePanelHeight(JSON.parse(globalTimeline),Boolean(getTooltips))
            $("body").addClass("toolTips");
            csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, true);
            csInterface.updateContextMenuItem("toolTips", true, true);
        }
        
        console.log(store);
        console.log("getGlobalTimeline "+getGlobalTimeline+" "+"getTooltips "+getTooltips)
        // Return variable with nested function
        // https://stackoverflow.com/questions/40172830/get-variable-inside-the-function
        return {
            getglobalTimeline : function () {
                return globalTimeline
            }
        }
    }

    function openGuides() {
        var ext = "com.sbaril.animdessin2.Guides";
        csInterface.requestOpenExtension(ext, "");
    }

    function openTimeline(openTimeline) {
        var ext = "com.sbaril.animdessin2.Timeline";
        csInterface.requestOpenExtension(ext, "");
        var settings = new storeSettings();
        if (settings.getglobalTimeline()) globalTimeline("globalTimeline"); // if globaltime line true > then close
        storeSettings(openTimeline);
    }
    // function hostApp(){
    // 	var hostEnv = csInterface.getHostEnvironment();
    // 	var languageCode = hostEnv.appUILocale;
    // 	return languageCode
    // }

    // Localize Languages
    function getLocalize() {
        var csInterface = new CSInterface();
        // csInterface.initResourceBundle();
        var renderBundle = csInterface.initResourceBundle();
        // console.log(renderBundle)
        return renderBundle;
    }

    function sendWarning() {
        loadJSXFile("/jsx/AnimD2_warning.jsx");
    }
    // Custom Frame Step
    function setFrameStep(){
        var customFrameStep = localStorage.getItem("customFrameStep");
        var frameLength = localStorage.getItem("frameLength");
        // csInterface.evalScript("alert('"+typeof(customFrameStep)+"')")
        // csInterface.evalScript("alert('"+customFrameStep == "null"+"')")
        // console.log(customFrameStep)
        // console.log(customFrameStep == "null")
        // console.log(customFrameStep == null)
        // console.log(frameLength)
        // console.log(frameLength == "null")
        // console.log(frameLength == null)
        customFrameStep = customFrameStep == null ? "1" : customFrameStep;
        // customFrameStep = customFrameStep == "undefined" ? "1" : customFrameStep;
        frameLength = frameLength == null ? "1" : frameLength;
        // frameLength = frameLength == "undefined" ? "1" : frameLength;
        // csInterface.evalScript("alert('"+customFrameStep+"')")
        // csInterface.evalScript("alert('"+frameLength+"')")
        console.log(customFrameStep)
        console.log(frameLength)
        csInterface.evalScript(`frameStepDialog('${customFrameStep}',' ${frameLength}')`, function (frameStepReturn) {
            console.log(frameStepReturn)
            var frameStepReturn = frameStepReturn.trim().split(",");
            localStorage.setItem("customFrameStep", frameStepReturn[0]);
            localStorage.setItem("frameLength", frameStepReturn[1]);
        });
    }

    function customFrameStep(direction){
        var customFrameStep = localStorage.getItem("customFrameStep");
        var frameLength = localStorage.getItem("frameLength");
        // csInterface.evalScript("alert('"+customFrameStep+"')")
        // csInterface.evalScript("alert('"+frameLength+"')")
        // csInterface.evalScript("alert('"+customFrameStep == "null"+"')")
        customFrameStep = customFrameStep == null ? "1" : customFrameStep;
        frameLength = frameLength == null ? "1" : frameLength;
        console.log(customFrameStep)
        console.log(frameLength)
        console.log(direction)
        // customFrameStep = customFrameStep == "undefined" ? "1" : customFrameStep;
        // frameLength = frameLength == "undefined" ? "1" : frameLength;
        // csInterface.evalScript("alert('"+customFrameStep+"')")
        // csInterface.evalScript("alert('"+frameLength+"')")
        // customFrameStep = customFrameStep == "undefined" ? "1" : customFrameStep;
        // frameLength = frameLength == "undefined" ? "1" : frameLength;
        csInterface.evalScript(`AnimD2_customFrameStep('${customFrameStep}',' ${frameLength}','${direction}')`);
    }
    
    // Create Custom Frame
    function setCustomeFrame(){
        var createCustomFrame = localStorage.getItem("createCustomFrame");
        createCustomFrame = createCustomFrame == null ? "3" : createCustomFrame;
        // createCustomFrame = createCustomFrame == "undefined" ? "3" : createCustomFrame;
        csInterface.evalScript(`createCustomFrameDialog('${createCustomFrame}')`, function (createCustomeFrameReturn) {
            localStorage.setItem("createCustomFrame", createCustomeFrameReturn);
        });
    }

    function createCustomFrame(){
        var createCustomFrame = localStorage.getItem("createCustomFrame");
        createCustomFrame = createCustomFrame == null ? "3" : createCustomFrame;
        // createCustomFrame = createCustomFrame == "false" ? "3" : createCustomFrame;
        csInterface.evalScript(`AnimD2_createCustomFrame('${createCustomFrame}')`);
    }

    // Add event listener to AD2 buttons to check open doc
    const ad2bbtns = document.getElementById("ad2btns");
    ad2bbtns.addEventListener("mouseenter", checkOpenDoc, false); // only check once prevents fireing 

    function init() {
        themeManager.init();
        // Persistent(true); //persistent to prevent extension from unloading

        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN2 CHECK FOR DOC
        ////////////////////////////////////////////////////////////////////////////////
        checkOpenDoc();
        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN2 BUTTONS FUNCTIONS
        ////////////////////////////////////////////////////////////////////////////////

        $("#btn_debug").click(showDevTools);
        $("#btn_reload").click(reloadPanel);

        // $("#btn_saveSettings").click(function () {
        //     loadJSXFile("/jsx/sessionCookie.jsx");
        // });

        // $("#btn_closeGuide").click(toggleGuide);
        // $("#btn_closeVideo").click(toggleVideo);

        // $("#btn_test").click(function () {
        // 	csInterface.evalScript('sayHello()');
        // });

        // $("#btn_showTimeline").mouseover(function() { 
        //     $("#showTimeline").toggleClass("showinfo");
        // });
        // $("#btn_showTimeline").mouseout(function() { 
        //     $("#showTimeline").toggleClass("showinfo");
        // });
        $("#btn_showTimeline").click(function (e) {
            if (e.shiftKey) loadNoDoc("/jsx/AnimD2_setTimelinePanelOptions.jsx");
            else if (!e.altKey || !e.shiftKey) loadNoDoc("/jsx/AnimD2_showTimeline.jsx");
        });

        // console.log(navigator.platform);
        // $("#btn_newDoc").mouseover(function() { 
        //     $("#newDoc").toggleClass("showinfo");
        // });
        // $("#btn_newDoc").mouseout(function() { 
        //     $("#newDoc").toggleClass("showinfo");
        // });
        if (navigator.platform === "MacIntel") $("#newDocSet").addClass("kcmb-sh-al-osx-lm");
        if (navigator.platform === "Win32") $("#newDocSet").addClass("kcmb-sh-al-win-lm");
        $("#btn_newDoc").click(function (e) {
            if (e.altKey && e.shiftKey && e.metaKey) loadNoDoc("/jsx/AnimD2_newDocSettings.jsx");
            else if (e.altKey && e.shiftKey) loadJSXFile("/jsx/AnimD2_timelineSetFrameRate.jsx");
            else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_gotoInTimeLine.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_timelineRenderVideo.jsx");
            else if (!e.altKey || !e.shiftKey) loadNoDoc("/jsx/AnimD2_newDocPreset.jsx");
            // else if (!e.altKey || !e.shiftKey) loadNoDoc("/jsx/AnimD2_newDoc.jsx");
        });

        // $("#btn_canvasSize").mouseover(function() { 
        //     $("#canvasSize").toggleClass("showinfo");
        // });
        // $("#btn_canvasSize").mouseout(function() { 
        //     $("#canvasSize").toggleClass("showinfo");
        // });
        $("#btn_canvasSize").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_canvasFitScreen.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_canvasRealSize.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_canvasSize.jsx");
        });

        $("#btn_save").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_saveAs.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_save.jsx");
        });

        $("#btn_newFrameOne").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_create1FrameVideoLayer.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_create1Frame.jsx");
        });

        $("#btn_newFrameTwo").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_create2FrameVideoLayer.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_create2Frames.jsx");
        });
        
        $("#btn_newFrameCustom").click(function (e) {
            if (e.shiftKey) setCustomeFrame() // open createCustomFrameDialog
            else if (!e.altKey || !e.shiftKey) createCustomFrame();
        });

        $("#btn_duplicateFrame").click(function () {
            loadJSXFile("/jsx/AnimD2_duplicateFrame.jsx");
        });

        $("#btn_deleteFrame").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_deleteFrameContent.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_deleteFrame.jsx");
        });

        $("#btn_toggleFavorite").click(function (e) {
            if (e.altKey && e.shiftKey) loadJSXFile("/jsx/AnimD2_timelineShowAllLayers.jsx") || $(this).addClass("favoriteDisabled").removeClass("favoriteActive");
            else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_timelineShowFavorites.jsx") || $(this).addClass("favoriteActive").removeClass("favoriteDisabled");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_timelineShowSetFavorites.jsx") || $(this).addClass("favoriteActive").removeClass("favoriteDisabled");
            $("body").toggleClass("favoriteDisabled", "");
        });

        $("#btn_onionSkin").click(function () {
            loadJSXFile("/jsx/AnimD2_onionSkin.jsx");
            $(this).toggleClass("onionActive", "onionDisabled");
            $("body").toggleClass("onionDisabled", "");
            // sendWarning();
        });

        $("#btn_onionSkinSettings").click(function () {
            loadJSXFile("/jsx/AnimD2_onionSkinSettings.jsx");
        });

        $("#btn_newVideoGroup").click(function (e) {
            // if (e.altKey && e.shiftKey)
            //     loadJSXFile("/jsx/AnimD2_toggleAutoGroupClips.jsx");
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_newVideoGroupSelection.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_newVideoUngroup.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_newVideoGroup.jsx");
        });

        $("#btn_renameFrame").click(function () {
            loadJSXFile("/jsx/AnimD2_frameRename.jsx");
        });

        $("#btn_minus").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_frameMinusTwo.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_frameMinusFive.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_frameMinusOne.jsx");
        });

        $("#btn_plus").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_framePlusTwo.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_framePlusFive.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_framePlusOne.jsx");
        });

        $("#btn_red").click(function (e) {
            if (e.altKey && e.shiftKey) loadJSXFile("/jsx/AnimD2_colorOnlyClearColor.jsx");
            else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_colorGlobalHide.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_colorGlobalShow.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_colorRed.jsx");
        });

        $("#btn_green").click(function (e) {
            if (e.altKey && e.shiftKey) loadJSXFile("/jsx/AnimD2_colorOnlyClearColor.jsx");
            else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_colorGlobalHide.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_colorGlobalShow.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_colorGreen.jsx");
        });

        $("#btn_blue").click(function (e) {
            if (e.altKey && e.shiftKey) loadJSXFile("/jsx/AnimD2_colorOnlyClearColor.jsx");
            else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_colorGlobalHide.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_colorGlobalShow.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_colorBlue.jsx");
        });

        $("#btn_none").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_colorNoneFxHideAll.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_colorNoneFxShowAll.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_colorNone.jsx");
        });

        $("#btn_inBetweenPrevious").click(function () {
            loadJSXFile("/jsx/AnimD2_inBetweenPrevious.jsx");
        });

        $("#btn_createInBetweenAfter").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_inBetweenCreateBefore.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_inBetweenCreateAfter.jsx");
        });

        $("#btn_inBetweenNext").click(function () {
            loadJSXFile("/jsx/AnimD2_inBetweenNext.jsx");
        });
        $("#btn_playheadSplit").click(function (e) {
            if (e.altKey && e.shiftKey) loadJSXFile("/jsx/AnimD2_splitToFrames2FrGroup.jsx");
            else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadSplitGroup.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_splitToFramesGroup.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadSplit.jsx");
        });

        $("#btn_playheadStart").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadTrimStart.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_playheadMoveStart.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadStart.jsx");
        });

        $("#btn_playheadEnd").click(function (e) {
            if (e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadTrimEnd.jsx");
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_playheadMoveEnd.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadEnd.jsx");
        });
        $("#btn_playheadPrevEdit").click(function (e) {
            if (e.altKey && e.shiftKey) {
                setFrameStep() // open framestepDialog
            }
            // else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadPrevEdit2fr.jsx");
            else if (e.shiftKey) {
                customFrameStep('prev');
            }
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_playheadFirstFrame.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadPrevEdit.jsx");
        });
        $("#btn_playheadNextEdit").click(function (e) {
            // if (e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadNextEdit2fr.jsx");
            // if (e.metaKey && e.shiftKey) {
            //     loadJSXFile("/jsx/AnimD2_playheadEndArea.jsx");
            // }
            if (e.altKey && e.shiftKey) {
                setFrameStep() // open framestepDialog
            }
            // else if (e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadPrevEdit2fr.jsx");
            else if (e.shiftKey) {
                customFrameStep('next');
            }
            else if (e.altKey) loadJSXFile("/jsx/AnimD2_playheadLastFrame.jsx");
            else if (!e.altKey || !e.shiftKey) loadJSXFile("/jsx/AnimD2_playheadNextEdit.jsx");
        });

        $("#btn_commentEdit").click(function (e) {
            //     loadJSXFile("/jsx/AnimD2_commentToggle.jsx");
            // else if (!e.altKey || !e.shiftKey) 
            loadJSXFile("/jsx/AnimD2_commentEdit.jsx");
        });

        $("#btn_commentsHtml").click(function () {
            loadJSXFile("/jsx/AnimD2_commentExportHtml.jsx");
        });

        $("#btn_commentsText").click(function () {
            loadJSXFile("/jsx/AnimD2_commentExportText.jsx");
        });

        $("#btn_videoShortcuts").click(function () {
            loadJSXFile("/jsx/AnimD2_videoShortcuts.jsx");
            $(this).toggleClass("keysActive", "keysDisabled");
            $("body").toggleClass("keysDisabled", "");
            storeSettings("keys");
            sendWarning();
        });



        /////////////////////////////////////////////////////////////////////////
        // AddEventlisternes buttons
        /////////////////////////////////////////////////////////////////////////
        // New Tooltips below buttons
        // Doesnt give proper behavior, is opstructed by mybtns divs
        $("#track").mouseover(function () {
            $("#toolinfo").css("padding","0");
        });

        document.addEventListener('mouseover', function (event) {
            // console.log(event.target.id);
            // console.log(event.target.closest('.bcol'));
            if (event.target.closest('.bcol')) {
                var info = event.target.id.replace('btn_','')
                $('#'+info).toggleClass('showinfo');
                setTimeout(function() {
                    $('#'+info).css.display="flex";
                  }, 250);
            }
    
        }, false);
        document.addEventListener('mouseout', function (event) {
            if (event.target.closest('.bcol')) {
                var info = event.target.id.replace('btn_','')
                $('#'+info).toggleClass('showinfo');
                setTimeout(function() {
                    $('#'+info).css.display="none";
                }, 250);
            }
        }, false);
        // function showInfo(elem) {
        //     var el = document.getElementById(elem);
        //     $(el).toggleClass("showinfo");
        //     // var el2 = document.getElementById(elem2);
        //     // el2.style.backgroundColor = "blue";
        // }
        // function addEvents(){
        //     var myBtns = document.getElementsByClassName("bcol");
        //     var info = document.getElementsByClassName("btnInfo");
        //     for(var i=0; i < myBtns.length; i++){
        //         // var k = i + 1;
        //         // var btn = elem[i].childNode.id;
        //         // console.log(elemB[i].parentNode.id)
        //         console.log(myBtns[i].id)
        //         // console.log(elemB[i].id)
        //         var divInfo = info[i].id;
        //     //    var boxb = elem[k].parentNode.id;
        //         // elem[i].addEventListener("mouseover", showInfo.bind(divInfo), false);
        //         myBtns[i].addEventListener("mouseover", showInfo.bind(this,divInfo), false);
        //     //    elem[k].addEventListener("click", makeItHappen.bind(this, boxa, boxb), false);
        //     }
        //  }
        // addEvents()
        /////////////////////////////////////////////////////////////////////////
        // Main Feature Button
        /////////////////////////////////////////////////////////////////////////
        /*
		$("#mainBT").click(function () {
            invokeFeature("Main");
        });
		*/

        $("#lassoToolBT").click(function () {
            invokeFeature("Tool-Lasso_Tool");
        });

        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN FLYOUT MENU
        ////////////////////////////////////////////////////////////////////////////////

        // Ugly workaround to keep track of "checked" and "enabled" statuses
        var checkableMenuItem_isChecked = true;
        var targetMenuItem_isEnabled = true;

        function flyoutXML() {
            return (
                '<Menu> \n<MenuItem Id="AboutItemAnimD2" Label="' +
                getLocalize().flyout_about +
                '"/> \n<MenuItem Id="OpenWebsiteAnimD2" Label="' +
                getLocalize().flyout_onlineinfo +
                '"/> \n <MenuItem Id="ReportBugAnimD2" Label="' +
                getLocalize().flyout_reportbug +
                '"/> \n<MenuItem Label="---" /> \n<MenuItem Id="iconSml" Label="' +
                getLocalize().flyout_iconSml +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Id="iconMed" Label="' +
                getLocalize().flyout_iconMed +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Id="iconBig" Label="' +
                getLocalize().flyout_iconBig +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Id="iconCenter" Label="' +
                getLocalize().flyout_iconCenter +
                '" Checkable="true" Checked="false"/> \n<MenuItem Label="---" />\n<MenuItem Id="globalTimeline" Label="' +
                getLocalize().flyout_globalTimeline +
                '" Checkable="true" Checked="false"/> \n<MenuItem Id="openTimeline" Label="' +
                getLocalize().flyout_openTimeline +
                '" Checkable="true" Checked="false"/>\n\n<MenuItem Id="timeCode" Label="' +
                getLocalize().flyout_timeCode +
                '" Checkable="true" Checked="false"/>\n<MenuItem Label="---" /> \n<MenuItem Id="toolTips" Label="' +
                getLocalize().flyout_tooltips +
                '" Checkable="true" Checked="false"/>\n<MenuItem Id="help" Label="' +
                getLocalize().flyout_helpguides +
                '" Checkable="true" Checked="false"/>\n<MenuItem Label="---" /></Menu>'
            )
        }

        // Uses the XML string to build the menu
        csInterface.setPanelFlyoutMenu(flyoutXML());

        // Flyout Menu Click Callback
        function flyoutMenuClickedHandler(e) {
            // the event's "data" attribute is an object, which contains "menuId" and "menuName"
            console.dir(e);
            switch (e.data.menuId) {
                case "AboutItemAnimD2":
                    csInterface.evalScript("alert('AnimDessin2 \\nVersion 2.2.2\\nPhotoshop CC 2015 to 2018+\\n©2018 Stephane Baril\\n©2020 Rombout Versluijs');");
                    //\\nhttp://www.sbaril.me removed not working anymore
                    break;
                case "OpenWebsiteAnimD2":
                    csInterface.openURLInDefaultBrowser("https://www.youtube.com/playlist?list=PLnNlOgl2T6GAsPqZDaf57TAqBa6ltL_gQ");
                    LoseFocus();
                    // csInterface.openURLInDefaultBrowser("http://www.sbaril.me/links"); LoseFocus();
                    break;
                case "ReportBugAnimD2":
                    csInterface.openURLInDefaultBrowser("https://github.com/sbaril/Photoshop-Animation/issues");
                    LoseFocus();
                    break;
                case "iconSml":
                    iconSize("iconSml");
                    break;
                case "iconMed":
                    iconSize("iconMed");
                    break;
                case "iconBig":
                    iconSize("iconBig");
                    break;
                case "iconCenter":
                    iconCenter("iconCenter");
                    break;
                case "globalTimeline":
                    globalTimeline("globalTimeline");
                    break;
                case "openTimeline":
                    openTimeline("openTimeline");
                    break;
                case "timeCode":
                    timeCode("timeCode");
                    break;    
                case "toolTips":
                    toolTips();
                    break;
                case "help":
                    openGuides();
                    break;
                case "localize":
                    getLocalize();
                    break;
                // case "closePanel":
                //     toggleGuide("close");
                //     break;
                default:
                    console.log(e.data.menuName + " panel clicked!");
            }
        }

        // Listen for the Flyout menu clicks
        csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", flyoutMenuClickedHandler);

        // Righclick Context Menu > uses exact same structure for now. easier acces
        function contextHandler(menuId) {
            switch (menuId) {
                case "AboutItemAnimD2":
                    csInterface.evalScript("alert('AnimDessin2 \\nVersion 2.2.2\\nPhotoshop CC 2015 to 2018+\\n©2018 Stephane Baril\\n©2020 Rombout Versluijs');");
                    //\\nhttp://www.sbaril.me removed not working anymore
                    break;
                case "OpenWebsiteAnimD2":
                    csInterface.openURLInDefaultBrowser("https://www.youtube.com/playlist?list=PLnNlOgl2T6GAsPqZDaf57TAqBa6ltL_gQ");
                    // csInterface.openURLInDefaultBrowser("http://www.sbaril.me/links");
                    LoseFocus();
                    break;
                case "ReportBugAnimD2":
                    csInterface.openURLInDefaultBrowser("https://github.com/sbaril/Photoshop-Animation/issues");
                    LoseFocus();
                    break;
                case "iconSml":
                    iconSize("iconSml");
                    break;
                case "iconMed":
                    iconSize("iconMed");
                    break;
                case "iconBig":
                    iconSize("iconBig");
                    break;
                case "iconCenter":
                    iconCenter("iconCenter");
                    break;
                case "globalTimeline":
                    globalTimeline("globalTimeline");
                    break;
                case "openTimeline":
                    openTimeline("openTimeline");
                    break;
                case "timeCode":
                    timeCode("timeCode");
                    break;
                case "toolTips":
                    toolTips();
                    break;
                case "help":
                    openGuides();
                    break;
                case "localize":
                    getLocalize();
                    break;
                // case "closePanel":
                //     toggleGuide("close");
                //     break;
                default:
                    console.log(menuId + " panel clicked!");
            }
        }
        // Uses the XML string to build the menu
        csInterface.setContextMenu(flyoutXML(), contextHandler);
    }
    $("#loaderBlock").hide();
    init();
    checkSettings();
})();
