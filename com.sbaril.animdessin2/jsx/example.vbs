'VBScript Example
'https://www.vbsedit.com/html/f1741259-9501-478b-bad6-36039a057410.asp
Set WshShell = WScript.CreateObject("WScript.Shell")

WshShell.Run "%windir%\notepad.exe"
WshShell.AppActivate "Notepad"

WshShell.SendKeys "Hello World!"