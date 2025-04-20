// src/services/feedbackService.ts

export class FeedbackService {
    generateFeedback(analysisResults: any): string {
        let feedback = "Feedback Report:\n";

        if (analysisResults.correctness) {
            feedback += "Your solution is correct!\n";
        } else {
            feedback += "There are issues with your solution. Please review the following points:\n";
            feedback += this.getErrorFeedback(analysisResults.errors);
        }

        feedback += this.getOptimizationTips(analysisResults.performance);
        feedback += this.getBestPractices();

        return feedback;
    }

    private getErrorFeedback(errors: string[]): string {
        return errors.map(error => `- ${error}`).join("\n");
    }

    private getOptimizationTips(performance: any): string {
        let tips = "Optimization Tips:\n";
        if (performance.executionTime > 1000) {
            tips += "- Consider optimizing your algorithm for better performance.\n";
        }
        if (performance.memoryUsage > 512) {
            tips += "- Try to reduce memory usage by using more efficient data structures.\n";
        }
        return tips;
    }

    private getBestPractices(): string {
        return "Best Practices:\n- Ensure your code is well-commented.\n- Follow consistent naming conventions.\n";
    }
}