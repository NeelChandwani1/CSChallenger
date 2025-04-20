import * as vscode from 'vscode';
import { AIService } from '../services/aiService';

export async function submitSolution(solution: string) {
    const aiService = new AIService();
    
    try {
        // Create and initialize analysis result first
        let analysisResult;
        
        try {
            analysisResult = await aiService.analyzeSolution(solution);
            console.log('Analysis completed:', analysisResult);
        } catch (analysisError) {
            console.error('Analysis error:', analysisError);
            throw new Error('Failed to analyze solution');
        }

        if (!analysisResult) {
            throw new Error('No analysis result received');
        }

        const feedback = {
            correctness: analysisResult.correctness || false,
            efficiency: analysisResult.efficiency || 'Not Available',
            timeComplexity: analysisResult.timeComplexity || 'Not Available',
            spaceComplexity: analysisResult.spaceComplexity || 'Not Available',
            suggestions: Array.isArray(analysisResult.suggestions) ? analysisResult.suggestions : ['No suggestions available']
        };

        const feedbackDoc = await vscode.workspace.openTextDocument({
            language: 'markdown',
            content: `# Code Analysis Results

## Overview
- **Correctness:** ${feedback.correctness ? '✅' : '❌'}
- **Efficiency:** ${feedback.efficiency}
- **Time Complexity:** ${feedback.timeComplexity}
- **Space Complexity:** ${feedback.spaceComplexity}

## Suggestions
${feedback.suggestions.map(s => `- ${s}`).join('\n')}`
        });

        await vscode.window.showTextDocument(feedbackDoc, {
            viewColumn: vscode.ViewColumn.Beside,
            preview: true
        });

        vscode.window.showInformationMessage('Analysis complete!');
    } catch (error) {
        console.error('Submission error:', error);
        vscode.window.showErrorMessage(`Error submitting solution: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}