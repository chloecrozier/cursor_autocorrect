import * as vscode from 'vscode';

let isAutocorrectEnabled = true;
let disposables: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
    console.log('Cursor Autocorrect extension is now active!');

    // Load configuration
    const config = vscode.workspace.getConfiguration('cursor-autocorrect');
    isAutocorrectEnabled = config.get('enabled', true);

    // Register commands
    const toggleCommand = vscode.commands.registerCommand('cursor-autocorrect.toggleAutocorrect', () => {
        isAutocorrectEnabled = !isAutocorrectEnabled;
        vscode.window.showInformationMessage(`Autocorrect ${isAutocorrectEnabled ? 'enabled' : 'disabled'}`);
    });

    const correctWordCommand = vscode.commands.registerCommand('cursor-autocorrect.correctCurrentWord', () => {
        correctCurrentWord();
    });

    // Register text document change listener for real-time autocorrect
    const changeListener = vscode.workspace.onDidChangeTextDocument((event) => {
        if (!isAutocorrectEnabled) {
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor || event.document !== editor.document) {
            return;
        }

        // Check if the document language is supported
        const config = vscode.workspace.getConfiguration('cursor-autocorrect');
        const supportedLanguages = config.get('languages', ['plaintext', 'markdown', 'text']);
        
        if (!supportedLanguages.includes(event.document.languageId)) {
            return;
        }

        // Handle changes
        for (const change of event.contentChanges) {
            if (change.text === ' ' || change.text === '\n' || change.text === '\t') {
                // Word boundary detected, check for corrections
                setTimeout(() => autocorrectLastWord(editor), 10);
            }
        }
    });

    context.subscriptions.push(toggleCommand, correctWordCommand, changeListener);
    disposables.push(changeListener);
}

function autocorrectLastWord(editor: vscode.TextEditor) {
    const position = editor.selection.active;
    const line = editor.document.lineAt(position.line);
    const lineText = line.text;

    // Find the word before the cursor
    let wordStart = position.character - 1;
    while (wordStart > 0 && /\w/.test(lineText[wordStart - 1])) {
        wordStart--;
    }

    if (wordStart === position.character - 1) {
        return; // No word found
    }

    const word = lineText.substring(wordStart, position.character - 1);
    const correction = getCorrection(word);

    if (correction && correction !== word) {
        const range = new vscode.Range(position.line, wordStart, position.line, position.character - 1);
        editor.edit(editBuilder => {
            editBuilder.replace(range, correction);
        });
    }
}

function correctCurrentWord() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const position = editor.selection.active;
    const wordRange = editor.document.getWordRangeAtPosition(position);
    
    if (!wordRange) {
        vscode.window.showInformationMessage('No word found at cursor position');
        return;
    }

    const word = editor.document.getText(wordRange);
    const correction = getCorrection(word);

    if (correction && correction !== word) {
        editor.edit(editBuilder => {
            editBuilder.replace(wordRange, correction);
        });
        vscode.window.showInformationMessage(`Corrected "${word}" to "${correction}"`);
    } else {
        vscode.window.showInformationMessage(`No correction found for "${word}"`);
    }
}

function getCorrection(word: string): string | undefined {
    const config = vscode.workspace.getConfiguration('cursor-autocorrect');
    const corrections = config.get('corrections', {}) as Record<string, string>;
    
    // Check for exact match (case-insensitive)
    const lowerWord = word.toLowerCase();
    for (const [incorrect, correct] of Object.entries(corrections)) {
        if (incorrect.toLowerCase() === lowerWord) {
            // Preserve original case
            if (word === word.toUpperCase()) {
                return correct.toUpperCase();
            } else if (word[0] === word[0].toUpperCase()) {
                return correct.charAt(0).toUpperCase() + correct.slice(1);
            } else {
                return correct;
            }
        }
    }

    return undefined;
}

export function deactivate() {
    disposables.forEach(d => d.dispose());
} 