# AnimDessin2
This panel is designed for Photoshop CC 2014 to CC 2020+. It allows you to draw frame-by-image animations (cel-animation like), simplifying the process. it also lets you test the movie and set the duration of a keyframe…

### Short info
This [Photoshop Extension](https://helpx.adobe.com/photoshop/kb/plug-ins-extensions-photoshop-cc.html) was created by [Stéphane Baril](https://github.com/sbaril/Photoshop-Animation) aka sbaril with help of others. This repo is my add to this wonderful extension and i hope it helps others. I wanted to expand its functionality while learning the process of creating an Extension. 

I've added many updates and features which for the time being you can [read more about in this issue](https://github.com/sbaril/Photoshop-Animation/issues/8) on his repo


### Installing (manual method)
Since this extension is still a work in progress currently the only method to try it, i using the manual install method. Below are some steps the users needs to follow, its shows both Mac and Windows.

> Windows: Open regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.7, then add a new entry `PlayerDebugMode` of type “`string`” with the value of “`1`”.

> Mac: In the Terminal, type: `defaults write com.adobe.CSXS.7 PlayerDebugMode 1`

[Source > Adobe](https://github.com/Adobe-CEP/Getting-Started-guides/tree/d85c8e861ef90bb5c3443516d45c631e9fdebd7f/Client-side%20Debugging)

This is the correct info about the install location


**Debugging Unsigned Extensions**
If you are in the midst of development and are not using HTML Extension Builder for debug workflows and want to bypass the need to sign your extensions, you can bypass the check for extension signatures by editing the CSXS preference properties file, located at:

- Win: regedit > `HKEY_CURRENT_USER/Software/Adobe/CSXS.7`, then add a new entry` PlayerDebugMode` of type "string" with the value of "1".
- Mac: In the terminal, type: `defaults write com.adobe.CSXS.7 PlayerDebugMode 1` (The plist is also located at /Users/<username>/Library/Preferences/com.adobe.CSXS.8.plist)

These entries will enable debug extensions to be displayed in the host applications. Please note that, CSXS.8 is given with the assumption that, you are developing the extension for CEP 8. If you are developing extension for previous version of CEP, replace 8 with corresponding version number.

> Debugging is need to make the extension working without using the ZXP approach. These are signed and therefor run without blockage.

**Extension Folders**
CEP supports 3 types of extension folders.

Product extension folder. Here is a suggestion, but each point product can decide where this folder should be. Third party extension can't be installed at this location.

**System extension folder**
```Win(x86): C:\Program Files\Common Files\Adobe\CEP\extensions```
```Win(x64): C:\Program Files (x86)\Common Files\Adobe\CEP\extensions, and C:\Program Files\Common Files\Adobe\CEP\extensions (since CEP 6.1)```
```Mac: /Library/Application Support/Adobe/CEP/extensions```


**Per-user extension folder**

```Win: C:\Users\<USERNAME>\AppData\Roaming\Adobe\CEP/extensions```
```Mac: ~/Library/Application Support/Adobe/CEP/extensions```

[source > Adobe CEP](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders
)

