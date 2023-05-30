import { Plugin } from 'obsidian';
import { settings, loadSettings, SettingsTab } from './settings';
import { cacheManager } from './cache'
import { isFileIndexable } from './utils'

import { setTabTitles, setExplorerItemTitles } from './replace'
import { fileResolver, cacheResolver, allCacheResolver } from './testing'
import { eventEmitter } from './events'

export default class HeadingsOverhaulPlugin extends Plugin {

	async onload(): Promise<void> {
		await loadSettings(this)
		this.addSettingTab(new SettingsTab(this))
		
		app.workspace.onLayoutReady(async () => {
			
			this.registerEvent(this.app.workspace.on('layout-change', () => { 
				eventEmitter.emit('layoutChange') 
			}))
			
			this.registerEvent(this.app.workspace.on('active-leaf-change', async leaf => { 
				eventEmitter.emit('activeLeafChange', leaf) 
			}))
			
			this.registerEvent(this.app.workspace.on('file-open', async file => {
				eventEmitter.emit('fileOpen', file)
			}))	
			
			this.registerEvent(this.app.metadataCache.on('changed', async file => { 
				eventEmitter.emit('metadataChanged', file) 
			}))
			
			this.registerEvent(this.app.vault.on('rename', async (file, oldFilePath) => { 
				eventEmitter.emit('fileRename', {newFilePath: file.path, oldFilePath}) 
			}))

			await this.populateCache()
			// await this.allModuleManager(true)
		})
		
		// this.addCommand({id: 'test-command', name: 'command for executing test functions', callback: () => { testFunction() }})
		console.log(`Enabled HeadingsOverhaulPlugin: "${Date.now()}"`)		
	}

	async onunload(): Promise<void> {
		// await this.allModuleManager(false)
		console.log(`Disabled HeadingsOverhaulPlugin: "${Date.now()}"`)
	}

	// private async allModuleManager(state: boolean) {
		// load or unload all available modules
		// if (settings.setTabTitles) await setTabTitles(state)
		// if (settings.setExplorerTitles) await setExplorerTitles(state)
		// if (settings.setGraphTitles) await 
		// if (settings.setLinkSuggestionTitles)
	// }

	private async populateCache(): Promise<void> {
    	const files = app.vault.getMarkdownFiles()
		for (let i = 0; i < files.length; i++) {
		    await cacheManager.addToLiveCache(files[i].path)
		}
	}

	// private async reloadTabTitle(file: TAbstractFile): Promise<void> {
	// 	if (settings.replaceTabs && isFileIndexable(file.path)) {
	// 		await cacheManager.addToLiveCache(file.path)
	// 		await setTabTitles(true, true, file.path)
	// 	}
	// }
}
