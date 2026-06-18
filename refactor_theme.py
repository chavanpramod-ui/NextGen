import os
import re

MAPPING = {
    # Backgrounds
    r'(?<!dark:)bg-slate-950': 'bg-slate-50 dark:bg-slate-950',
    r'(?<!dark:)bg-slate-900': 'bg-white dark:bg-slate-900',
    r'(?<!dark:)bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
    r'(?<!dark:)bg-slate-700': 'bg-slate-200 dark:bg-slate-700',
    # Text
    r'(?<!dark:)text-slate-50': 'text-slate-900 dark:text-slate-50',
    r'(?<!dark:)text-slate-100': 'text-slate-900 dark:text-slate-100',
    r'(?<!dark:)text-slate-200': 'text-slate-800 dark:text-slate-200',
    r'(?<!dark:)text-slate-300': 'text-slate-700 dark:text-slate-300',
    r'(?<!dark:)text-slate-400': 'text-slate-600 dark:text-slate-400',
    r'(?<!dark:)text-slate-500': 'text-slate-500 dark:text-slate-500',
    r'(?<!dark:)text-white': 'text-slate-900 dark:text-white',
    # Borders
    r'(?<!dark:)border-slate-800': 'border-slate-200 dark:border-slate-800',
    r'(?<!dark:)border-slate-700': 'border-slate-300 dark:border-slate-700',
    r'(?<!dark:)border-slate-600': 'border-slate-400 dark:border-slate-600',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for pattern, replacement in MAPPING.items():
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
