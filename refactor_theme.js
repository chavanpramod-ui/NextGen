const fs = require('fs');
const path = require('path');

const MAPPING = {
    // Backgrounds
    '(?<!dark:)bg-slate-50 dark:bg-slate-950': 'bg-slate-50 dark:bg-slate-950',
    '(?<!dark:)bg-white dark:bg-slate-900': 'bg-white dark:bg-slate-900',
    '(?<!dark:)bg-slate-100 dark:bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
    '(?<!dark:)bg-slate-200 dark:bg-slate-700': 'bg-slate-200 dark:bg-slate-700',
    // Text
    '(?<!dark:)text-slate-900 dark:text-slate-50': 'text-slate-900 dark:text-slate-50',
    '(?<!dark:)text-slate-900 dark:text-slate-100': 'text-slate-900 dark:text-slate-100',
    '(?<!dark:)text-slate-800 dark:text-slate-200': 'text-slate-800 dark:text-slate-200',
    '(?<!dark:)text-slate-700 dark:text-slate-300': 'text-slate-700 dark:text-slate-300',
    '(?<!dark:)text-slate-600 dark:text-slate-400': 'text-slate-600 dark:text-slate-400',
    '(?<!dark:)text-slate-900 dark:text-slate-500': 'text-slate-900 dark:text-slate-500 dark:text-slate-500',
    '(?<!dark:)text-slate-900 dark:text-white': 'text-slate-900 dark:text-white',
    // Borders
    '(?<!dark:)border-slate-200 dark:border-slate-800': 'border-slate-200 dark:border-slate-800',
    '(?<!dark:)border-slate-300 dark:border-slate-700': 'border-slate-300 dark:border-slate-700',
    '(?<!dark:)border-slate-400 dark:border-slate-600': 'border-slate-400 dark:border-slate-600',
};

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;

    for (const [pattern, replacement] of Object.entries(MAPPING)) {
        const regex = new RegExp(pattern, 'g');
        content = content.replace(regex, replacement);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated ${filepath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', '.next'].includes(file)) {
                walkDir(fullPath);
            }
        } else {
            if (/\.(tsx|ts|js|jsx)$/.test(file)) {
                processFile(fullPath);
            }
        }
    }
}

walkDir('.');
