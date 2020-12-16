// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const open = require('open');
const express = require('express');
const exec = require('child_process').exec;
const morgan = require('morgan');
const fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// 集成 chrome 打开 ide 的插件
	var app = express();
	var logStream = fs.createWriteStream('/tmp/chrome_source_opener.log', {flags: 'a'})
	app.use(morgan('short', {stream: logStream}))

	app.get('/file', (req, res)=> {
		let filepath = req.query.f;
		let line = req.query.l ;
		console.log(`open file: ${filepath}:${line}`);
		exec(`myeditor -f ${filepath} -l ${line}`)
		res.send("ok");
	})
	let started = false;
	let listen = vscode.commands.registerCommand('chromium-source-opener.listen', function() {
		if (!started) {
			vscode.window.showInformationMessage('open server in localhost:8989, check log in /tmp/chrome_source_opener.log');
			started = true;
			app.listen(8999);
		} else {
			vscode.window.showWarningMessage('server already start');
		}
	})
	/*
	// how to stop this?
	vscode.commands.registerCommand('chromium-source-opener.unlisten', function() {

	})
	*/
	
	//  try to open in source.chromium.org
	let disposable = vscode.commands.registerCommand('chromium-source-opener.openInWeb', async function () {
		const editor = vscode.window.activeTextEditor;

		if (!editor)	{
			console.log('no in a valid editor');
			return ;
		}
		const baseUrl = "https://source.chromium.org/chromium/chromium/src/+/master:";
		var path = editor.document.uri.fsPath
		var src_idx = path.search('src/')
		if (src_idx == -1) {
			console.log('not in a src file')
			return 
		}
		path = path.substring(src_idx + 4 )
		var line = (editor.selection.active.line + 1).toString()
		// console.log(path, line)
		const selection = vscode.window.activeTextEditor.selection
		const selected = vscode.window.activeTextEditor.document.getText(new vscode.Range
			(selection.start, selection.end))
		let queryUrl = `${baseUrl}${path};l=${line}`
		if (!selection.isEmpty) {
			queryUrl += `?q=${selected}`
		}
		await open(queryUrl)
	});

	context.subscriptions.push(listen);
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
