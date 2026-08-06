const fs = require('fs');
const path = require('path');

const cssClassMappings = [
    // Remove Auroras and Glows completely by removing elements containing specific classes
    // We can't easily remove whole elements with regex, so we'll remove the classes that make them visible
    [/bg-cyan-500\/15 blur-3xl/g, 'hidden'],
    [/bg-violet-500\/15 blur-3xl/g, 'hidden'],
    [/bg-emerald-500\/15 blur-3xl/g, 'hidden'],
    [/bg-teal-500\/15 blur-3xl/g, 'hidden'],
    [/pointer-events-none absolute .*? bg-gradient-to-r .*? to-transparent/g, 'hidden'],
    [/pointer-events-none absolute .*? h-36 w-36 .*? blur-2xl/g, 'hidden'],

    // Replace Dashboard panels
    [/group\/header .*? bg-gradient-to-br from-white via-slate-50\/95 to-slate-100\/90 .*? sm:p-8/g, 'flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8'],
    [/group\/queue .*? sm:p-6/g, 'flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6'],
    [/group\/roadmap .*? sm:p-7/g, 'flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7'],
    [/group\/milestone .*? sm:p-6/g, 'flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6'],

    // Replace Metric tiles
    [/group\/metric .*? sm:p-6/g, 'relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6'],
    
    // Replace Buttons
    [/group\/btn .*? inline-flex h-10 w-10 .*? dark:hover:text-cyan-300/g, 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'],
    [/group\/btn .*? inline-flex items-center gap-2 .*? dark:hover:text-cyan-300/g, 'inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'],
    
    // Replace text gradients
    [/bg-gradient-to-r from-cyan-600 via-teal-500 to-violet-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-teal-300 dark:to-violet-400/g, 'text-zinc-900 dark:text-white'],
    
    // Remove hover scale and translations
    [/hover:-translate-y-3/g, ''],
    [/hover:scale-\[1\.03\]/g, ''],
    [/hover:scale-105/g, ''],
    [/hover:scale-110/g, ''],
    [/hover:rotate-6/g, ''],
    [/transition-all duration-500/g, 'transition-colors duration-200'],
    [/transition-all duration-300/g, 'transition-colors duration-200'],
    [/transition-all duration-700/g, 'transition-colors duration-200'],
    [/shadow-\[0_.*?\]/g, 'shadow-sm'],
    
    // Simplification for metric backgrounds
    [/bg-gradient-to-br from-white via-cyan-50\/40 to-slate-50\/90 dark:from-slate-900 dark:via-cyan-950\/25 dark:to-slate-950/g, 'bg-white dark:bg-zinc-900'],
    [/bg-gradient-to-br from-white via-violet-50\/40 to-slate-50\/90 dark:from-slate-900 dark:via-violet-950\/25 dark:to-slate-950/g, 'bg-white dark:bg-zinc-900'],
    [/bg-gradient-to-br from-white via-amber-50\/40 to-slate-50\/90 dark:from-slate-900 dark:via-amber-950\/25 dark:to-slate-950/g, 'bg-white dark:bg-zinc-900'],

    // Replace Metric values
    [/bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-500 dark:from-cyan-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-3xl font-black tracking-tight text-transparent/g, 'text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white'],
    [/bg-gradient-to-r from-violet-600 via-purple-500 to-violet-500 dark:from-violet-400 dark:via-purple-300 dark:to-violet-300 bg-clip-text text-3xl font-black tracking-tight text-transparent/g, 'text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white'],
    [/bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 dark:from-amber-400 dark:via-orange-300 dark:to-amber-300 bg-clip-text text-3xl font-black tracking-tight text-transparent/g, 'text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white'],

    // Text slate to zinc
    [/text-slate-900/g, 'text-zinc-900'],
    [/text-slate-800/g, 'text-zinc-800'],
    [/text-slate-700/g, 'text-zinc-700'],
    [/text-slate-600/g, 'text-zinc-600'],
    [/text-slate-500/g, 'text-zinc-500'],
    [/text-slate-400/g, 'text-zinc-400'],
    [/text-slate-300/g, 'text-zinc-300'],
    [/text-slate-200/g, 'text-zinc-200'],
    [/text-slate-100/g, 'text-zinc-100'],
    [/text-slate-50/g, 'text-zinc-50'],
    
    // Border slate to zinc
    [/border-slate-800/g, 'border-zinc-800'],
    [/border-slate-700/g, 'border-zinc-700'],
    [/border-slate-600/g, 'border-zinc-600'],
    [/border-slate-500/g, 'border-zinc-500'],
    [/border-slate-400/g, 'border-zinc-400'],
    [/border-slate-300/g, 'border-zinc-300'],
    [/border-slate-200/g, 'border-zinc-200'],
    [/border-slate-100/g, 'border-zinc-100'],
    
    // Bg slate to zinc
    [/bg-slate-950/g, 'bg-zinc-950'],
    [/bg-slate-900/g, 'bg-zinc-900'],
    [/bg-slate-800/g, 'bg-zinc-800'],
    [/bg-slate-100/g, 'bg-zinc-100'],
    [/bg-slate-50/g, 'bg-zinc-50'],
];

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    let originalContent = content;

    for (const [regex, replacement] of cssClassMappings) {
        content = content.replace(regex, replacement);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Cleaned classes in ${filepath}`);
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

walkDir('./app');
walkDir('./components');
