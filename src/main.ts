import { Plugin, TAbstractFile } from 'obsidian';
import { settings, loadSettings, SettingsTab } from './settings';
import { cacheManager } from './cache'
import { isFileIndexable } from './utils'

import { setTabTitles, setExplorerItemTitles } from './replace'
import { fileResolver, cacheResolver, allCacheResolver } from './testing'

export default class HeadingsOverhaulPlugin extends Plugin {

	async onload(): Promise<void> {
		await loadSettings(this)
		this.addSettingTab(new SettingsTab(this))
		
		app.workspace.onLayoutReady(async () => 
		{
			this.registerEvent(this.app.workspace.on('layout-change', () => {}))
			this.registerEvent(this.app.workspace.on('active-leaf-change', () => {}))
			this.registerEvent(this.app.workspace.on('file-open', () => {}))	
			this.registerEvent(this.app.metadataCache.on('changed', async file => {}))
			
			await this.populateCache()
			await this.moduleManager(true)
		})
		
		// this.addCommand({id: 'test-command', name: 'command for executing test functions', callback: () => { testFunction() }})
		console.log(`Enabled HeadingsOverhaulPlugin: "${Date.now()}"`)		
	}

	async onunload(): Promise<void> {
		await this.moduleManager(false)
		console.log(`Disabled HeadingsOverhaulPlugin: "${Date.now()}"`)
	}

	private async moduleManager(state: boolean) {
		// load or unload all available modules

		if (settings.setTabTitles) await setTabTitles(state)
		// if (settings.setExplorerTitles) await setExplorerTitles(state)
		// if (settings.setGraphTitles) await 
		// if (settings.setLinkSuggestionTitles)

	}

	private async populateCache(): Promise<void> {
    	const files = app.vault.getMarkdownFiles()
		for (let i = 0; i < files.length; i++) {
		    await cacheManager.addToLiveCache(files[i].path)
		}
	}

	private async reloadTabTitle(file: TAbstractFile): Promise<void> {
		if (settings.replaceTabs && isFileIndexable(file.path)) {
			await cacheManager.addToLiveCache(file.path)
			await setTabTitles(true, true, file.path)
		}
	}
}
