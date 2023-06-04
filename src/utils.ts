import { Platform } from "obsidian"
import { settings } from './settings';

export async function testCommand() {	
    const file = app.workspace.getActiveFile()
    console.log(file)
    
    let cache = app.metadataCache.getFileCache(file!) // <-- non-null assertion (!) operator
    console.log(cache)

    let cachedHeading = cache?.headings?.[0]?.heading 
    console.log(cachedHeading)   
}

export type IndexedDocument = {
    path: string
    mtime: number
    basename: string
    heading: string
}

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

