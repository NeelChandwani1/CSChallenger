// src/extension.ts

import * as vscode from 'vscode';
import { startChallenge } from './commands/startChallenge';
import { submitSolution } from './commands/submitSolution';

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating Code Challenger...');

    let startDisposable = vscode.commands.registerCommand(
        'codeChallenger.startChallenge', 
        () => {
            vscode.window.showInformationMessage('Starting Code Challenge');
            startChallenge();
        }
    );

    let submitDisposable = vscode.commands.registerCommand(
        'codeChallenger.submitSolution',
        () => {
            vscode.window.showInformationMessage('Submitting Solution');
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                submitSolution(editor.document.getText());
            }
        }
    );

    context.subscriptions.push(startDisposable, submitDisposable);
    console.log('Code Challenger activated successfully!');
}

export function deactivate() {}