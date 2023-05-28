import { Plugin } from 'obsidian';
import { loadSettings, SettingsTab } from './settings';
import { cacheManager } from './cache'

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

