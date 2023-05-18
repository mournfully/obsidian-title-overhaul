import { Plugin } from 'obsidian';
import { loadSettings, saveSettings, settings, SettingsTab } from './settings';

export default class PreferHeadingsPlugin extends Plugin {

	async onload(): Promise<void> {
		await loadSettings(this)
		this.addSettingTab(new SettingsTab(this))

	}

	async onunload(): Promise<void> {

	}
}