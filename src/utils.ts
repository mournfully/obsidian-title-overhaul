import { Platform } from "obsidian"
import { settings } from './settings';

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
