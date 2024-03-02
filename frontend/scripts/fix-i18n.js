const fs = require('fs');
const path = require('path');

function formatJsonFile(filePath) {
    try {
        // Read the JSON data from the file
        const rawData = fs.readFileSync(filePath);
        const data = JSON.parse(rawData);

        // Write the pretty-printed JSON back to the file
        const formattedJson = JSON.stringify(data, null, 4);
        fs.writeFileSync(filePath, formattedJson);

        console.log(`Formatted JSON written to ${filePath}`);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log(`Error: Invalid JSON format in '${filePath}'.`);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
}

function getTitleKey(filePath) {
    try {
        // Read the JSON data from the file
        const rawData = fs.readFileSync(filePath);
        const data = JSON.parse(rawData);

        // Check if "title" key exists in the data
        if ('title' in data) {
            const titleValue = data.title;
            return titleValue;
        } else {
            console.log(`Error: 'title' key not found in '${filePath}'.`);
            return null;
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log(`Error: Invalid JSON format in '${filePath}'.`);
        } else {
            console.error(`Error: ${error.message}`);
        }
        return null;
    }
}

function formatAllJsonFiles(directoryPath) {
    try {
        // Get a list of all files in the directory
        const lang_directory = fs.readdirSync(directoryPath);

        lang_directory.forEach(lang => {
            let keys = {};
            const files = fs.readdirSync(path.join(directoryPath, lang));
            const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
            jsonFiles.forEach(file => {
                const filePath = path.join(directoryPath, lang, file);
                formatJsonFile(filePath);
                if (file !== 'navbar.json') {
                    keys[path.parse(filePath).name] = getTitleKey(filePath)
                }
            });
            const keysJson = JSON.stringify(keys, null, 4);
            fs.writeFileSync(path.join(directoryPath, lang, 'navbar.json'), keysJson);
        })

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Replace 'frontend/public/messages' with your actual directory path
const directoryPath = 'public/messages';

formatAllJsonFiles(directoryPath);
