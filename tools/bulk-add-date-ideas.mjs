#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = path.resolve(process.cwd());

function parseArgs(argv) {
    const parsed = { file: '', dryRun: false, appsScriptUrl: '' };
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--file' && argv[i + 1]) parsed.file = argv[++i];
        else if (arg === '--apps-script-url' && argv[i + 1]) parsed.appsScriptUrl = argv[++i];
        else if (arg === '--dry-run') parsed.dryRun = true;
    }
    return parsed;
}

async function readAppsScriptUrlFromConfig() {
    const configPath = path.join(rootDir, 'config.js');
    const raw = await fs.readFile(configPath, 'utf8');
    const match = raw.match(/APPS_SCRIPT_URL:\s*'([^']+)'/);
    return match ? match[1] : '';
}

function normalizeIdeas(input) {
    const source = Array.isArray(input) ? input : input.ideas;
    if (!Array.isArray(source)) {
        throw new Error('Input JSON must be an array or an object with an "ideas" array');
    }
    return source.map((idea, idx) => {
        const title = (idea.title || '').trim();
        const categoryId = (idea.categoryId || '').trim();
        const location = (idea.location || idea.loc || '').trim();
        if (!title || !categoryId || !location) {
            throw new Error(`Idea #${idx + 1} is missing required fields (title, categoryId, location)`);
        }

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const id = (idea.id || `${slug}-${Date.now().toString(36)}-${idx}`).trim();
        const price = Number.isFinite(Number(idea.price)) ? Number(idea.price) : 0;
        const why = (idea.why || '').trim();
        const link = (idea.link || '').trim();
        const tags = Array.isArray(idea.tags) ? idea.tags : [];

        return {
            id,
            categoryId,
            title,
            location,
            price,
            why,
            link,
            tags
        };
    });
}

async function appendIdea(appsScriptUrl, rowData) {
    await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'append', sheet: 'DateIdeas', row: rowData })
    });
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    if (!args.file) {
        throw new Error('Usage: node tools/bulk-add-date-ideas.mjs --file tools/date-ideas.import.json [--dry-run]');
    }

    const filePath = path.isAbsolute(args.file) ? args.file : path.join(rootDir, args.file);
    const fileData = await fs.readFile(filePath, 'utf8');
    const ideas = normalizeIdeas(JSON.parse(fileData));

    const appsScriptUrl = args.appsScriptUrl || await readAppsScriptUrlFromConfig();
    if (!appsScriptUrl && !args.dryRun) {
        throw new Error('Could not resolve APPS_SCRIPT_URL. Pass --apps-script-url explicitly.');
    }

    for (const idea of ideas) {
        const row = [
            idea.id,
            idea.categoryId,
            idea.title,
            idea.location,
            idea.price,
            idea.why,
            idea.link,
            idea.tags.join(',')
        ];

        if (args.dryRun) {
            console.log(`[dry-run] ${JSON.stringify(row)}`);
            continue;
        }

        await appendIdea(appsScriptUrl, row);
        console.log(`Added: ${idea.title} (${idea.categoryId})`);
    }

    console.log(`Done. Processed ${ideas.length} idea(s).`);
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
