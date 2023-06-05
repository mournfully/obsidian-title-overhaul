import { Plugin } from 'obsidian'
import { settings, loadSettings, SettingsTab } from './settings'
import { cacheManager } from './cache'
import { isFileIndexable, testCommand } from './utils'
import { setTabTitle } from './set/tabs'

export default class HeadingsOverhaulPlugin extends Plugin {
	async onload(): Promise<void> {
		await loadSettings(this)
		this.addSettingTab(new SettingsTab(this))

		this.app.workspace.onLayoutReady(async () => {
			// this.registerEvent(this.app.workspace.on('layout-change', () => {}))
			// this.registerEvent(this.app.workspace.on('active-leaf-change', async leaf => {}))
			// this.registerEvent(this.app.workspace.on('file-open', async file => {}))
			// this.registerEvent(this.app.metadataCache.on('changed', async file => {}))

			// The following listeners are used to keep the cache up-to-date
			this.registerEvent(this.app.vault.on('create', async (file) => {
				if (isFileIndexable(file.path)) {
					cacheManager.addToLiveCache(file.path)
				}
			}))
			this.registerEvent(this.app.vault.on('rename', async (file, oldPath) => {
				if (isFileIndexable(file.path)) {
					cacheManager.removeFromLiveCache(oldPath)
					cacheManager.addToLiveCache(file.path)
				}
			}))
			this.registerEvent(this.app.vault.on('delete', (file) => {
				if (isFileIndexable(file.path)) {
					cacheManager.removeFromLiveCache(file.path)
				}
			}))
		})

		// The following code is temporary and subject to change
		app.vault.getMarkdownFiles().forEach((file) => {
			cacheManager.addToLiveCache(file.path)
		})

		if (settings.setTabTitle) await setTabTitle.enable()

		this.addCommand({
			id: 'test-command',
			name: 'command for executing test functions',
			callback: () => { testCommand() },
		})

		console.log(`Enabled HeadingsOverhaulPlugin: "${Date.now()}"`)
	}

	async onunload(): Promise<void> {
		await setTabTitle.disable()
		console.log(`Disabled HeadingsOverhaulPlugin: "${Date.now()}"`)
	}
}
