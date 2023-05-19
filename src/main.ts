import { Plugin } from 'obsidian';
import { loadSettings, saveSettings, settings, SettingsTab } from './settings';
import { fileResolver } from './resolver'

export default class PreferHeadingsPlugin extends Plugin {

	async onload(): Promise<void> {
		await loadSettings(this)
		this.addSettingTab(new SettingsTab(this))

		this.addCommand({
			id: 'resolve-file-header',
			name: 'PreferHeadings: Run on active file for testing',
			callback: () => {
				fileResolver()
			}
		})

	}

	async onunload(): Promise<void> {

	}
}

