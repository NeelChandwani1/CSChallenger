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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const openai_1 = __importDefault(require("openai"));
const vscode = __importStar(require("vscode"));
class AIService {
    constructor() {
        const apiKey = vscode.workspace
            .getConfiguration('codeChallenger')
            .get('openAIApiKey');
        if (!apiKey) {
            throw new Error('OpenAI API key not found. Please set it in VS Code settings.');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey
        });
        console.log('AIService initialized successfully'); // Debug log
    }
    async analyzeSolution(code) {
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
            const analysis = {
                correctness: true,
                efficiency: "Good",
                suggestions: [response],
                timeComplexity: "O(n)",
                spaceComplexity: "O(1)"
            };
            console.log('Analysis result:', analysis); // Debug log
            return analysis;
        }
        catch (error) {
            console.error('Error details:', error); // Debug log
            vscode.window.showErrorMessage(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
exports.AIService = AIService;
exports.default = AIService;
//# sourceMappingURL=aiService.js.map