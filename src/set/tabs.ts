import { EventRef, TFile } from 'obsidian'
import { cacheManager } from '../cache'

class ManageTabTitles {
    private refLayoutChange: EventRef
    private refMetadataCacheChanged: EventRef

    public async enable(): Promise<void> {
        this.refLayoutChange = app.workspace.on('layout-change', () => { 
            const file = app.workspace.getActiveFile()
            if (file) this.set(file?.path)     
            console.log(`layout-change`)   
        })
        this.refMetadataCacheChanged = app.metadataCache.on('changed', async file => {
            if (file) this.update(file)
            console.log(`metadata-cache-changed`)   
        })
        this.set()
    }

    public async disable(): Promise<void> {
        app.workspace.offref(this.refLayoutChange)
        app.metadataCache.offref(this.refMetadataCacheChanged)
        this.reset()
    }

    public async update(file: TFile) {
        await cacheManager.addToLiveCache(file.path)
        this.set(file.path)
    }

    private async set(path?: string) {
        const leaves = app.workspace.getLeavesOfType('markdown')
        for (const leaf of leaves) {
            // update just a single or all paths as needed 
            const file_path = leaf?.view?.file?.path!
            if (path !== undefined && path != file_path) continue
            
            // get title from live cache
            const cached_file = await cacheManager.getFromLiveCache(file_path)
            const title = cached_file.heading ? cached_file.heading : cached_file.basename

            // only update titles when needed
            const current_basename = leaf.tabHeaderInnerTitleEl.getText()
            if (cached_file && cached_file.heading != current_basename) {
                leaf.tabHeaderInnerTitleEl.setText(title)
            }
        }
    }

    private async reset() {
        const leaves = app.workspace.getLeavesOfType('markdown')
        for (const leaf of leaves) {
            const file = leaf.view?.file
            if (file) leaf.tabHeaderInnerTitleEl.setText(file.basename)
        }
    }
}

export const tabTitles = new ManageTabTitles()
