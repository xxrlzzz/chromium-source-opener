// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const open = require('open');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "chromium-source-opener" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('chromium-source-opener.openInWeb', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VScode from chromium_source_opener!');
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
		console.log(path, line)
		await open(`${baseUrl}${path};l=${line}`)
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
