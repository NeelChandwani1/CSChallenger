"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSolution = submitSolution;
const vscode = __importStar(require("vscode"));
const aiService_1 = require("../services/aiService");
async function submitSolution(solution) {
    try {
        const aiService = new aiService_1.AIService();
        console.log('Solution to analyze:', solution); // Add debug logging
        // Wait for analysis result
        const analysisResult = await aiService.analyzeSolution(solution);
        console.log('Raw analysis result:', JSON.stringify(analysisResult, null, 2)); // Debug the raw result
        // Validate analysis result
        if (!analysisResult || typeof analysisResult !== 'object') {
            throw new Error('Invalid analysis result received');
        }
        // Create feedback with safe property access
        const feedbackDoc = await vscode.workspace.openTextDocument({
            language: 'markdown',
            content: `# Code Analysis Results

## Overview
- **Correctness:** ${analysisResult?.correctness ? '✅' : '❌'}
- **Efficiency:** ${analysisResult?.efficiency || 'Not Available'}
- **Time Complexity:** ${analysisResult?.timeComplexity || 'Not Available'}
- **Space Complexity:** ${analysisResult?.spaceComplexity || 'Not Available'}

## Suggestions
${Array.isArray(analysisResult?.suggestions)
                ? analysisResult.suggestions.map(s => `- ${s}`).join('\n')
                : '- No suggestions available'}`
        });
        // Show feedback
        await vscode.window.showTextDocument(feedbackDoc, {
            viewColumn: vscode.ViewColumn.Beside,
            preview: true
        });
        vscode.window.showInformationMessage('Analysis complete! Check the feedback panel.');
    }
    catch (error) {
        console.error('Full submission error:', error); // Enhanced error logging
        const errorMessage = error instanceof Error
            ? error.message
            : 'An unknown error occurred';
        vscode.window.showErrorMessage('Error submitting solution: ' + errorMessage);
    }
}
//# sourceMappingURL=submitSolution.js.map