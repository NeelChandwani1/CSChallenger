import OpenAI from 'openai';
import * as vscode from 'vscode';

export interface CodeAnalysis {
    correctness: boolean;
    efficiency: string;
    suggestions: string[];
    timeComplexity: string;
    spaceComplexity: string;
}

export class AIService {
    private openai: OpenAI;

    constructor() {
        const apiKey = vscode.workspace
            .getConfiguration('codeChallenger')
            .get<string>('openAIApiKey');
        
        if (!apiKey) {
            throw new Error('OpenAI API key not found. Please set it in VS Code settings.');
        }

        this.openai = new OpenAI({
            apiKey: apiKey
        });
        console.log('AIService initialized successfully'); // Debug log
    }

    public async analyzeSolution(code: string): Promise<CodeAnalysis> {
        try {
            console.log('Starting code analysis...'); // Debug log
            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo", // Explicitly using 3.5
                temperature: 0.7,
                max_tokens: 500,
                messages: [{
                    role: "system",
                    content: "You are a code reviewer analyzing solutions to programming challenges. Provide feedback on correctness, efficiency, and potential improvements."
                }, {
                    role: "user",
                    content: code
                }]
            });

            console.log('Received response from OpenAI'); // Debug log
            const response = completion.choices[0]?.message?.content || 'No feedback provided';
            
            // Create a more robust response object
            const analysis: CodeAnalysis = {
                correctness: true,
                efficiency: "Good",
                suggestions: [response],
                timeComplexity: "O(n)",
                spaceComplexity: "O(1)"
            };

            console.log('Analysis result:', analysis); // Debug log
            return analysis;

        } catch (error) {
            console.error('Error details:', error); // Debug log
            vscode.window.showErrorMessage(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export default AIService;