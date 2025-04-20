// src/services/challengeProvider.ts

export class ChallengeProvider {
    private challenges: Array<{ id: string; title: string; description: string }> = [];

    constructor() {
        this.loadChallenges();
    }

    private loadChallenges() {
        // Load challenges from a predefined source or API
        this.challenges = [
            { id: '1', title: 'FizzBuzz', description: 'Write a program that prints the numbers from 1 to 100, but for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".' },
            { id: '2', title: 'Palindrome Checker', description: 'Create a function that checks if a given string is a palindrome.' },
            // Add more challenges as needed
        ];
    }

    public getChallenges() {
        return this.challenges;
    }

    public getChallengeById(id: string) {
        return this.challenges.find(challenge => challenge.id === id);
    }
}