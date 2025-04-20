// src/utils/helpers.ts

export function formatFeedback(feedback: string): string {
    return `## Code Analysis Results\n\n${feedback.split('\n').map(line => `- ${line}`).join('\n')}`;
}

export function formatChallenge(title: string, description: string): string {
    return `// Challenge: ${title}
// 
// ${description}
//
// Write your solution below:

function solution() {
    // Your code here
}
`;
}

export function manageUserInteraction(message: string): void {
    console.log(`[Code Challenger] ${message}`);
}