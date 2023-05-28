import { Plugin, PluginSettingTab, Setting } from 'obsidian'
import type HeadingsOverhaulPlugin from './main'

// Init setting variable type
export interface HeadingsOverhaulSettings {
  useDatabase: boolean

  replaceExplorer: boolean
  replaceGraph: boolean
  replaceSuggest: boolean
  replaceTabs: boolean
  replaceBacklink: boolean
}

export class SettingsTab extends PluginSettingTab {
  plugin: HeadingsOverhaulPlugin

  constructor(plugin: HeadingsOverhaulPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  // Render settings in app
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'PreferHeadings' })

    new Setting(containerEl).setName('Replace displayed titles with first heading').setHeading()

    // replaceExplorer
    new Setting(containerEl)
      .setName('replaceExplorer')
      .addToggle(toggle =>
        toggle.setValue(settings.replaceExplorer).onChange(async v => {
          settings.replaceExplorer = v
          await saveSettings(this.plugin)
        })
      )

      // replaceGraph
      new Setting(containerEl)
      .setName('replaceGraph')
      .addToggle(toggle =>
        toggle.setValue(settings.replaceGraph).onChange(async v => {
          settings.replaceGraph = v
          await saveSettings(this.plugin)
        })
      )

      // replaceSuggeest
      new Setting(containerEl)
      .setName('replaceSuggest')
      .addToggle(toggle =>
        toggle.setValue(settings.replaceSuggest).onChange(async v => {
          settings.replaceSuggest = v
          await saveSettings(this.plugin)
        })
      )

      // replaceTabs
      new Setting(containerEl)
      .setName('replaceTabs')
      .addToggle(toggle =>
        toggle.setValue(settings.replaceTabs).onChange(async v => {
          settings.replaceTabs = v
          await saveSettings(this.plugin)
        })
      )

      // replaceBacklink
      new Setting(containerEl)
      .setName('replaceBacklink')
      .addToggle(toggle =>
        toggle.setValue(settings.replaceBacklink).onChange(async v => {
          settings.replaceBacklink = v
          await saveSettings(this.plugin)
        })
      )
  }
}

// Set default setting values
export const DEFAULT_SETTINGS: HeadingsOverhaulSettings = {
  useDatabase: false,

  replaceExplorer: false,
  replaceGraph: false,
  replaceSuggest: false,
  replaceTabs: false,
  replaceBacklink: false,
} as const

export let settings = Object.assign({}, DEFAULT_SETTINGS) as HeadingsOverhaulSettings

export async function loadSettings(plugin: Plugin): Promise<void> {
  settings = Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData())
}

export async function saveSettings(plugin: Plugin): Promise<void> {
  await plugin.saveData(settings)
}
