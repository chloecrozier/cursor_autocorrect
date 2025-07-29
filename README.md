# Cursor Autocorrect

A simple autocorrect extension for VS Code/Cursor that fixes common typos as you type.

## Quick Start

1. **Install the extension** from the `.vsix` file
2. **Open any `.txt` or `.md` file**
3. **Type common typos** like `teh `, `adn `, `recieve ` (with space)
4. **Watch them auto-correct!**

## Features

- ✅ **Real-time correction**: Fixes typos when you press space/enter
- ✅ **Manual correction**: `Cmd+Shift+C` (or `Ctrl+Shift+C`) to fix current word
- ✅ **Toggle on/off**: Command palette → "Toggle Autocorrect"
- ✅ **Customizable**: Add your own corrections in settings

## Settings

Search for `cursor-autocorrect` in VS Code/Cursor settings:

- **Enable/disable**: `cursor-autocorrect.enabled`
- **File types**: `cursor-autocorrect.languages` 
- **Custom corrections**: `cursor-autocorrect.corrections`

## Default Corrections

The extension fixes these common typos:
- `teh` → `the`
- `adn` → `and`
- `recieve` → `receive`
- `seperate` → `separate`
- `definately` → `definitely`
- And 10+ more...

## Adding Custom Corrections

1. Open settings (`Cmd+,` or `Ctrl+,`)
2. Search for "cursor-autocorrect"
3. Edit "corrections" to add your own:

```json
{
  "cursor-autocorrect.corrections": {
    "youre": "you're",
    "cant": "can't",
    "wont": "won't"
  }
}
```

## Development

```bash
# Set up environment
nvm use cursor-autocorrect
npm install
npm run compile

# Package extension
vsce package
```

## Next Steps: Full Dictionary Implementation

Want to add comprehensive spell checking? Here's the roadmap:

### Phase 1: Dictionary Integration
- **Add word lists**: Integrate common dictionaries (e.g., `american-english`, `british-english`)
- **Smart suggestions**: Use Levenshtein distance for "did you mean?" suggestions
- **Language detection**: Auto-detect document language

### Phase 2: Advanced Features
- **Context awareness**: Different corrections for different contexts
- **Machine learning**: Learn from user corrections over time
- **Performance optimization**: Efficient trie data structures for large dictionaries

### Phase 3: Professional Features
- **Medical/Legal dictionaries**: Specialized vocabulary
- **Custom dictionaries**: Import/export user dictionaries
- **Team sharing**: Share corrections across teams

### Implementation Guide:
1. **Install dictionary packages**: `npm install american-english-words`
2. **Add fuzzy matching**: `npm install fuse.js` or `levenshtein`
3. **Update extension logic**: Replace static corrections with dictionary lookup
4. **Add suggestion UI**: VS Code/Cursor quick-fix provider for multiple suggestions
5. **Add settings**: Dictionary language, suggestion count, confidence threshold

Want to contribute? The foundation is ready - just extend the `getCorrection()` function!

## Requirements

- VS Code/Cursor 1.74.0+
- Node.js 18+ for development