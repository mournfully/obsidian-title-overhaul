import { Plugin } from 'obsidian';
import { loadSettings, SettingsTab } from './settings';
import { cacheManager } from './cache'

import { fileResolver, cacheResolver, allCacheResolver } from './testing'

export default class HeadingsOverhaulPlugin extends Plugin {

	async onload(): Promise<void> {
		await loadSettings(this)
		this.addSettingTab(new SettingsTab(this))

		this.addCommand({
			id: 'resolve-file',
			name: 'resolve-file',
			callback: () => {
				fileResolver()
			}
		})

		this.addCommand({
			id: 'resolve-file-from-cache',
			name: 'resolve-file-from-cache',
			callback: () => {
				cacheResolver()
			}
		})

		this.addCommand({
			id: 'resolve-all-files-from-cache',
			name: 'resolve-all-files-from-cache',
			callback: () => {
				allCacheResolver()
			}
		})

	}

	async onunload(): Promise<void> {
		
	}

	private async populateIndex(): Promise<void> {
    	const files = app.vault.getMarkdownFiles()
		for (let i = 0; i < files.length; i++) {
		    await cacheManager.addToLiveCache(files[i].path)
		}
	}
}

