import * as assert from 'assert';
import * as vscode from 'vscode';
import { activate } from '../../src/extension';

suite('Extension Tests', () => {
    test('Extension activates correctly', async () => {
        const context = { subscriptions: [] };
        await activate(context);
        assert.ok(context.subscriptions.length > 0, 'Extension did not activate correctly');
    });

    // Add more tests for commands and services as needed
});