/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    var gExtensionId = "com.sbaril.animdessin2.Panel2";

    function Persistent(inOn) { // keep session stored

        if (inOn) {
            var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
        } else {
            var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
        }

        event.extensionId = gExtensionId;
        csInterface.dispatchEvent(event);
    }
    // Localize Languages
    function getLocalize() {
        var csInterface = new CSInterface();
        var renderBundle = csInterface.initResourceBundle();
        // console.log(renderBundle)
        return renderBundle
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

    // Loads / executes a jsx file
    function loadJSXFile(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        csInterface.evalScript('evalFile("' + scriptPath + '")');
    }

    function checkSettings() {
        toggleGuide();
    }
    function callToolMock() {
        window.location.href = "./toolsguide.html";
    }

    function callVideoMock() {
        window.location.href = "./videoguide.html";
    }
    // Show helpguide
    function toggleGuide(item) {
        if (item == "guide") {
            // else {
            localStorage.setItem('toggleGuide', "guideInActive");
            localStorage.setItem('toggleVideo', "videoInActive");
            $("#guide").addClass("InActive").removeClass("Active");
            $("#video").addClass("InActive").removeClass("Active");
            // document.getElementById("toggleVideo").Checked;
            // }
            if (localStorage.getItem('toggleGuide') == "guideInActive") {
                localStorage.setItem('toggleGuide', "guideActive");
                localStorage.setItem('toggleVideo', "videoInActive");
                $("#guide").addClass("Active").removeClass("InActive");
                $("#video").addClass("InActive").removeClass("Active");
                csInterface.resizeContent(400, 500);
                csInterface.updateContextMenuItem("toggleGuide", true, true);
                csInterface.updateContextMenuItem("toggleVideo", true, false);

            }
        }
        if (item == "close") {
            csInterface.closeExtension();
        }
        if (item == "videoMock") {
            csInterface.resizeContent(345, 480);
            callVideoMock();
        }
        if (item == "toolMock") {
            csInterface.resizeContent(345, 500);
            callToolMock();
        }
    }

    function sendWarning() {
        loadJSXFile("/jsx/AnimD2_warning.jsx");
    }

    function init() {
        themeManager.init();

        //Persistent(true); //persistent to prevent extension from unloading


        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN2 TOOLGUIDE BUTTONS FUNCTIONS
        ////////////////////////////////////////////////////////////////////////////////   

        $("#btn_debug").click(showDevTools);
        $("#btn_reload").click(reloadPanel);

        $("#btn_closeGuide").click(toggleGuide);
        $("#btn_closeVideo").click(toggleGuide);



        ////////////////////////////////////////////////////////////////////////////////
        // ANIMDESSIN TOOLGUIDE FLYOUT MENU
        ////////////////////////////////////////////////////////////////////////////////

        // Ugly workaround to keep track of "checked" and "enabled" statuses
        var checkableMenuItem_isChecked = true;
        var targetMenuItem_isEnabled = true;


        function flyoutXML() {
            return "<Menu> \n<MenuItem Id=\"toolMock\" Label=\"" + (getLocalize().flyout_toolguide) + "\" Checkable=\"true\" Checked=\"false\"/> \n<MenuItem Id=\"videoMock\" Label=\"" + (getLocalize().flyout_videoguide) + "\" Checkable=\"true\" Checked=\"false\"/> \n <MenuItem Label=\"---\" /> \n<MenuItem Id=\"closePanel\" Label=\"" + (getLocalize().flyout_closepanel) + "\" Checkable=\"true\" Checked=\"false\"/> \n</Menu>";
        };

        // Uses the XML string to build the menu
        csInterface.setPanelFlyoutMenu(flyoutXML());

        // Flyout Menu Click Callback
        function toolGuideMenuClickedHandler(e) {

            // the event's "data" attribute is an object, which contains "menuId" and "menuName"
            console.dir(e);
            switch (e.data.menuId) {
                case "videoMock":
                    toggleGuide("videoMock");
                    break;
                case "toolMock":
                    toggleGuide("toolMock");
                    break;
                case "closePanel":
                    toggleGuide("close");
                    break;
                default:
                    console.log(e.data.menuName + " clicked!");
            }
        }


        // Listen for the Flyout menu clicks
        csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", toolGuideMenuClickedHandler);

        // Righclick Context Menu > uses exact same structure for now. easier acces
        function contextHandler(menuId) {
            if (menuId == "toggleGuide") {
                toggleGuide("guide");
            }
            if (menuId == "videoMock") {
                toggleGuide("videoMock");
            }
            if (menuId == "toolMock") {
                toggleGuide("toolMock");
            }
            if (menuId == "closePanel") {
                toggleGuide("close");
            }
        }
        // Uses the XML string to build the menu
        csInterface.setContextMenu(flyoutXML(), contextHandler);

    }
    init();

    //Dirty workarouned checking which page is loaded,
    // So context menu's can be checked
    if (document.title == getLocalize().PNL_Title_ToolGuide) {
        csInterface.updatePanelMenuItem(getLocalize().flyout_toolguide, true, true);
        csInterface.updatePanelMenuItem(getLocalize().flyout_videoguide, true, false);
        csInterface.updateContextMenuItem("toolMock", true, true);
        csInterface.updateContextMenuItem("videoMock", true, false);
    }
    if (document.title == getLocalize().PNL_Title_VideoGuide) {
        csInterface.updatePanelMenuItem(getLocalize().flyout_toolguide, true, false);
        csInterface.updatePanelMenuItem(getLocalize().flyout_videoguide, true, true);
        csInterface.updateContextMenuItem("toolMock", true, false);
        csInterface.updateContextMenuItem("videoMock", true, true);
    }
    console.log(document.title)
    // checkSettings();
    // getLocalize();
}());