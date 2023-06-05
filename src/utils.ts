import { Platform } from 'obsidian'
import { settings } from './settings'
import { cacheManager } from './cache'

export async function testCommand() {
	// const file = app.workspace.getActiveFile()
	// console.log(file)

	// let cache = app.metadataCache.getFileCache(file!) // <-- non-null assertion (!) operator
	// console.log(cache)

	// let cachedHeading = cache?.headings?.[0]?.heading
	// console.log(cachedHeading)

	// let leaves = app.workspace.getLeavesOfType('markdown')
	// console.log(leaves)

	const files = app.vault.getMarkdownFiles()
	for (let i = 0; i < files.length; i++) {
		const output = await cacheManager.getFromLiveCache(files[i].path)
		console.log(output)
	}
}

export type IndexedDocument = {
	path: string;
	mtime: number;
	basename: string;
	heading: string;
};

export function isFileIndexable(path: string): boolean {
	return getExtension(path) === 'md'
}

export function getExtension(path: string): string {
	const split = path.split('.')
	return split[split.length - 1] ?? ''
}

export function isCacheEnabled(): boolean {
	return !Platform.isIosApp && settings.useDatabase
}
