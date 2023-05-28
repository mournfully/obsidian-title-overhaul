import { Plugin } from 'obsidian';
import { loadSettings, saveSettings, settings, SettingsTab } from './settings';
import { fileResolver } from './resolver'

import { fileResolver } from './testing'

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

	}

	async onunload(): Promise<void> {

	}
}

