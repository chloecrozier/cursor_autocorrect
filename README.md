# Cursor Autocorrect

A basic autocorrect extension for Cursor/VS Code that automatically fixes common typos in text files.

## Features

- **Real-time autocorrect**: Automatically corrects common misspellings as you type
- **Manual correction**: Correct the current word with a keyboard shortcut
- **Configurable**: Customize which file types and corrections are active
- **Case preservation**: Maintains the original capitalization of your text

## Usage

### Automatic Correction
The extension automatically corrects common typos when you:
- Press space, tab, or enter after a misspelled word
- Move to a new line

### Manual Correction
- Position your cursor on a word and press `Ctrl+Shift+C` (or `Cmd+Shift+C` on Mac)
- Or use the command palette: "Correct Current Word"

### Toggle Autocorrect
- Use the command palette: "Toggle Autocorrect" to enable/disable the feature

## Configuration

You can customize the extension through VS Code settings:

### `cursor-autocorrect.enabled`
- Type: `boolean`
- Default: `true`
- Description: Enable/disable autocorrect functionality

### `cursor-autocorrect.languages`
- Type: `array`
- Default: `["plaintext", "markdown", "text"]`
- Description: File types where autocorrect should be active

### `cursor-autocorrect.corrections`
- Type: `object`
- Description: Custom word corrections (misspelled: correct)
- Default includes common typos like:
  - `teh` → `the`
  - `adn` → `and`
  - `recieve` → `receive`
  - `seperate` → `separate`
  - And many more...

## Adding Custom Corrections

1. Open VS Code/Cursor settings
2. Search for "cursor-autocorrect"
3. Edit the "corrections" object to add your own typos and corrections

Example:
```json
{
  "cursor-autocorrect.corrections": {
    "teh": "the",
    "youre": "you're",
    "cant": "can't",
    "wont": "won't"
  }
}
```

## Development

### Setup
1. Clone this repository
2. Run `npm install` to install dependencies
3. Press `F5` to open a new VS Code window with the extension loaded

### Building
- `npm run compile` - Compile the TypeScript source
- `npm run watch` - Watch for changes and compile automatically

## Requirements

- VS Code 1.74.0 or higher
- Node.js for development

## License

This project is open source and available under the MIT License.