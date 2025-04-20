"use strict";
// src/utils/helpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFeedback = formatFeedback;
exports.formatChallenge = formatChallenge;
exports.manageUserInteraction = manageUserInteraction;
function formatFeedback(feedback) {
    return `## Code Analysis Results\n\n${feedback.split('\n').map(line => `- ${line}`).join('\n')}`;
}
function formatChallenge(title, description) {
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
function manageUserInteraction(message) {
    console.log(`[Code Challenger] ${message}`);
}
//# sourceMappingURL=helpers.js.map