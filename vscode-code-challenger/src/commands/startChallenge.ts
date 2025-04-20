import * as vscode from 'vscode';
import { ChallengeProvider } from '../services/challengeProvider';

export function startChallenge() {
    const challengeProvider = new ChallengeProvider();
    const challenges = challengeProvider.getChallenges();

    vscode.window.showQuickPick(
        challenges.map(c => ({
            label: c.title,
            description: c.id,
            detail: c.description
        })),
        {
            placeHolder: 'Select a coding challenge',
            matchOnDescription: true,
            matchOnDetail: true
        }
    ).then(selectedChallenge => {
        if (selectedChallenge) {
            // Create new file for the challenge
            vscode.workspace.openTextDocument({
                language: 'javascript',
                content: `// ${selectedChallenge.label}\n\n${selectedChallenge.detail}\n\n// Write your solution here:\n`
            }).then(document => {
                vscode.window.showTextDocument(document);
            });
        }
    });
}