/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    "use strict";

    var csInterface = new CSInterface();
    var gExtensionId = "com.sbaril.animdessin2.Timeline";

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

    // Localize Languages
    function getLocalize() {
        var csInterface = new CSInterface();
        var renderBundle = csInterface.initResourceBundle();
        // console.log(renderBundle)
        return renderBundle
    }
 
    // Iconsize > done with fontsize
    function iconSize(size) {
        $("body").removeClass("iconSml").removeClass("iconMed").removeClass("iconBig").addClass(size);
        storeSettings(size);
        // document.getElementsByTagName('BODY').className = document.getElementsByTagName('BODY').className.replace(/(?:^|\s)\"+size+\"(?!\S)/g ,"");
    }

    // Set timecode > time or frames
    function timeCode(timecode) {
        storeSettings(timecode);
    }

    function checkSettings() {
        if (localStorage.getItem("timeCode")) {
            var timeCode = localStorage.getItem("timeCode");
            timeCode = timeCode == "false" ? false : true;
            localStorage.setItem("timeCode", timeCode);
            csInterface.updatePanelMenuItem(getLocalize().flyout_timeCode, true, timeCode);
            csInterface.updateContextMenuItem("timeCode", true, timeCode);
        }
        var openTimeline = "globalTimeline";
        $("body").addClass(openTimeline);
        $("#track").addClass(openTimeline);
    }

    //Store settings
    function storeSettings(store) {
        // alert(store)
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
        if (store == "timeCode") {
            var timeCode = localStorage.getItem("timeCode");
            timeCode = timeCode == "false" ? true : false;
            localStorage.setItem("timeCode", timeCode);
            csInterface.updatePanelMenuItem(getLocalize().flyout_timeCode, true, timeCode);
            csInterface.updateContextMenuItem("timeCode", true, timeCode);
        }
        console.log(store);
    }

    // Localize Languages
    function getLocalize() {
        var csInterface = new CSInterface();
        // csInterface.initResourceBundle();
        var renderBundle = csInterface.initResourceBundle();
        // console.log(renderBundle)
        return renderBundle;
    }

    function init() {
        themeManager.init();
        getLocalize();
        // Persistent(true); //persistent to prevent extension from unloading

        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN2 CHECK FOR DOC
        ////////////////////////////////////////////////////////////////////////////////
        // checkOpenDoc();
        

        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN FLYOUT MENU
        ////////////////////////////////////////////////////////////////////////////////

        // // Ugly workaround to keep track of "checked" and "enabled" statuses
        var checkableMenuItem_isChecked = true;
        var targetMenuItem_isEnabled = true;

        function flyoutXML() {
            return (
                '<Menu> \n<MenuItem Id="AboutItemAnimD2" Label="' +
                getLocalize().flyout_about +
                '"/> \n<MenuItem Id="OpenWebsiteAnimD2" Label="' +
                getLocalize().flyout_onlineinfo +
                '"/> \n <MenuItem Label="---" /> \n<MenuItem Id="iconSml" Label="' +
                getLocalize().flyout_iconSml +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Id="iconMed" Label="' +
                getLocalize().flyout_iconMed +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Id="iconBig" Label="' +
                getLocalize().flyout_iconBig +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Id="timeCode" Label="' +
                getLocalize().flyout_timeCode +
                '" Checkable="true" Checked="false"/> \n\n<MenuItem Label="---" /> \n <MenuItem Id="help" Label="' +
                getLocalize().flyout_helpguides +
                '" Checkable="true" Checked="false"/>\n<MenuItem Label="---" /> \n<MenuItem Id="closePanel" Label="' +
                getLocalize().flyout_closepanel + 
                '" Checkable="true" Checked="false"/>\n</Menu>'
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
                    csInterface.evalScript("alert('AnimDessin2 \\nVersion 2.2.2\\nPhotoshop CC 2015 to 2018+\\n©2018 Stephane Baril\\nhttp://www.sbaril.me');");
                    break;
                case "OpenWebsiteAnimD2":
                    csInterface.openURLInDefaultBrowser("https://www.youtube.com/playlist?list=PLnNlOgl2T6GAsPqZDaf57TAqBa6ltL_gQ");
                    LoseFocus();
                    // csInterface.openURLInDefaultBrowser("http://www.sbaril.me/links"); LoseFocus();
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
                case "timeCode":
                    timeCode("timeCode");
                    break;
                case "help":
                    openGuides();
                    break;
                case "localize":
                    getLocalize();
                    break;
                case "closePanel":
                    toggleGuide("close");
                    break;
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
                    csInterface.evalScript("alert('AnimDessin2 \\nVersion 2.2.2\\nPhotoshop CC 2015 to 2018+\\n©2018 Stephane Baril\\nhttp://www.sbaril.me');");
                    break;
                case "OpenWebsiteAnimD2":
                    csInterface.openURLInDefaultBrowser("https://www.youtube.com/playlist?list=PLnNlOgl2T6GAsPqZDaf57TAqBa6ltL_gQ");
                    // csInterface.openURLInDefaultBrowser("http://www.sbaril.me/links");
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
                case "timeCode":
                    timeCode("timeCode");
                    break;
                case "help":
                    openGuides();
                    break;
                case "localize":
                    getLocalize();
                    break;
                case "closePanel":
                    toggleGuide("close");
                    break;
                default:
                    console.log(menuId + " panel clicked!");
            }
        }
        // Uses the XML string to build the menu
        csInterface.setContextMenu(flyoutXML(), contextHandler);
    }
    // $("#loaderBlock").hide();
    init();
    checkSettings();
})();
