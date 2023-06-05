import { EventRef, TFile } from 'obsidian'
import { cacheManager } from '../cache'

// import { cacheManager } from './cache'
// import { isFileIndexable } from './utils'
// import { TFileExplorerView, TFileExplorerItem, Events } from 'obsidian'

class ManageExplorerTitles {
    // private refLayoutChange: EventRef
    // private refMetadataCacheChanged: EventRef

    public async enable(): Promise<void> {
        // this.refLayoutChange = app.workspace.on('layout-change', () => { 
        //     const file = app.workspace.getActiveFile()
        //     if (file) this.set(file?.path)     
        //     console.log(`layout-change`)   
        // })
        // this.refMetadataCacheChanged = app.metadataCache.on('changed', async file => {
        //     if (file) this.update(file)
        //     console.log(`metadata-cache-changed`)   
        // })
        // this.set()
    }

    public async disable(): Promise<void> {
        // app.workspace.offref(this.refLayoutChange)
        // app.metadataCache.offref(this.refMetadataCacheChanged)
        // this.reset()
    }

    public async update(file: TFile) {
        // await cacheManager.addToLiveCache(file.path)
        // this.set(file.path)
    }

    private async set(path?: string) {
        // export async function setExplorerItemTitles(state: boolean): Promise<void> {
//     // https://effectivetypescript.com/2020/05/26/iterate-objects/
//     for (let path in getTFileExplorerView()?.fileItems) {
//         if (!isFileIndexable(path)) continue
//         let file = await cacheManager.getFromLiveCache(path)
//         let title = state ? (file.heading ? file.heading : file.basename) : file.basename
//         // https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional
//         getTFileExplorerView()!.fileItems[path].innerEl.innerText = title
//     }
// }

// function getTFileExplorerView(): TFileExplorerView | null {
//     let leaves = app.workspace.getLeavesOfType('file-explorer')
//     let view = leaves?.[0]?.view
//     if (leaves.length > 1 && (view === undefined)) return null
//     return view as TFileExplorerView
// }
        
        // const leaves = app.workspace.getLeavesOfType('markdown')
        // for (const leaf of leaves) {
        //     // update just a single or all paths as needed 
        //     const file_path = leaf?.view?.file?.path!
        //     if (path !== undefined && path != file_path) continue
            
        //     // get title from live cache
        //     const cached_file = await cacheManager.getFromLiveCache(file_path)
        //     const title = cached_file.heading ? cached_file.heading : cached_file.basename

        //     // only update titles when needed
        //     const current_basename = leaf.tabHeaderInnerTitleEl.getText()
        //     if (cached_file && cached_file.heading != current_basename) {
        //         leaf.tabHeaderInnerTitleEl.setText(title)
        //     }
        // }
    }

    private async reset() {
        // const leaves = app.workspace.getLeavesOfType('markdown')
        // for (const leaf of leaves) {
        //     const file = leaf.view?.file
        //     if (file) leaf.tabHeaderInnerTitleEl.setText(file.basename)
        // }
    }
}

export const explorerTitles = new ManageExplorerTitles()
