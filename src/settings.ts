import { Plugin, PluginSettingTab, Setting } from 'obsidian'
import type HeadingsOverhaulPlugin from './main'
import { setTabTitle } from './set/tabs'

// Init setting variable type
export interface HeadingsOverhaulSettings {
	useDatabase: boolean
	setTabTitle: boolean
	setExplorerTitle: boolean
	setGraphTitle: boolean
	setSuggestTitle: boolean
	setBacklinkTitle: boolean
}

export class SettingsTab extends PluginSettingTab {
	plugin: HeadingsOverhaulPlugin
  
	constructor(plugin: HeadingsOverhaulPlugin) {
		super(app, plugin)
		this.plugin = plugin
	}
  
	// Render settings in app
	display(): void {
		const { containerEl } = this
		containerEl.empty()
		containerEl.createEl('h2', { text: 'HeadingsOverhaul' })
  
		new Setting(containerEl).setName('Behavior').setHeading()
  
		// useDatabase
		new Setting(containerEl)
			.setName('Save index to cache')
			.setDesc('Enable caching to speed up indexing time.')
			.addToggle(toggle =>
				toggle.setValue(settings.useDatabase).onChange(async v => {
					settings.useDatabase = v
					await saveSettings(this.plugin)
				})
			)
  
		new Setting(containerEl).setName('Replace displayed titles with first heading').setHeading()

		// setTabTitle
		new Setting(containerEl)
			.setName('setTabTitle')
			.addToggle(toggle =>
				toggle.setValue(settings.setTabTitle).onChange(async v => {
					settings.setTabTitle = v
					await saveSettings(this.plugin)
					settings.setTabTitle ? setTabTitle.enable() : setTabTitle.disable()
				})
			)

		// setExplorerTitle
		new Setting(containerEl)
			.setName('setExplorerTitle')
			.addToggle(toggle =>
				toggle.setValue(settings.setExplorerTitle).onChange(async v => {
					settings.setExplorerTitle = v
					// setExplorerItemTitles(settings.setExplorerTitle)
					await saveSettings(this.plugin)
				})
			)

		// setGraphTitle
		new Setting(containerEl)
			.setName('setGraphTitle')
			.addToggle(toggle =>
				toggle.setValue(settings.setGraphTitle).onChange(async v => {
					settings.setGraphTitle = v
					await saveSettings(this.plugin)
				})
			)

		// setSuggestTitle
		new Setting(containerEl)
			.setName('setSuggestTitle')
			.addToggle(toggle =>
				toggle.setValue(settings.setSuggestTitle).onChange(async v => {
					settings.setSuggestTitle = v
					await saveSettings(this.plugin)
				})
			)

		// setBacklinkTitle
		new Setting(containerEl)
			.setName('setBacklinkTitle')
			.addToggle(toggle =>
				toggle.setValue(settings.setBacklinkTitle).onChange(async v => {
					settings.setBacklinkTitle = v
					await saveSettings(this.plugin)
				})
			)
	}
}

// Set default setting values
export const DEFAULT_SETTINGS: HeadingsOverhaulSettings = {
	useDatabase: false,
	setTabTitle: false,
	setExplorerTitle: false,
	setGraphTitle: false,
	setSuggestTitle: false,
	setBacklinkTitle: false,
} as const

export let settings = Object.assign({}, DEFAULT_SETTINGS) as HeadingsOverhaulSettings

export async function loadSettings(plugin: Plugin): Promise<void> {
	settings = Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData())
}

export async function saveSettings(plugin: Plugin): Promise<void> {
	await plugin.saveData(settings)
}
