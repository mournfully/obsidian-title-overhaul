/**
 * Defines a cache manager for the plugin
 */

import { IndexedDocument } from './utils'

export async function indexDocument(path: string): Promise<IndexedDocument> {
	// Return first element in array with valid path and type string
	const file = app.vault.getFiles().find((f) => f.path === path)
	if (!file) throw new Error(`Invalid file path: "${path}"`)

	// Isolate the first heading property from file's CachedMetadata
	/*
        "CachedMetadata":
            "headings": 
                0:
                    "heading": "§ 📙 wiki"
    */
	const heading = app.metadataCache.getFileCache(file)?.headings?.[0]?.heading

	return {
		path: file.path,
		mtime: file.stat.mtime,
		basename: file.basename,
		heading: heading as string,
	}
}

class HeadingsOverhaulCache {
	private liveCache: Map<string, IndexedDocument> = new Map()

	public async addToLiveCache(path: string): Promise<void> {
		try {
			const file = await indexDocument(path)
			if (!file.path) {
				console.error(
					`Skipping addToLiveCache for "${path}" because of missing IndexedDocument.path`
				)
				return
			}
			this.liveCache.set(path, file)
		} catch (error) {
			console.warn(`Failed to execute addToLiveCache for "${path}"`)
			this.liveCache.delete(path)
		}
	}

	public removeFromLiveCache(path: string): void {
		this.liveCache.delete(path)
	}

	public async getFromLiveCache(path: string): Promise<IndexedDocument | undefined> {
		if (!this.liveCache.has(path)) {
			await this.addToLiveCache(path)
		}

		return this.liveCache.get(path)
	}
}

export const cacheManager = new HeadingsOverhaulCache()
