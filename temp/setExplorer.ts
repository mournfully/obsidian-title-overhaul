import { cacheManager } from './cache'
import { isFileIndexable } from './utils'
import { TFileExplorerView, TFileExplorerItem, Events } from 'obsidian'

export async function setExplorerItemTitles(state: boolean): Promise<void> {
    // https://effectivetypescript.com/2020/05/26/iterate-objects/
    for (let path in getTFileExplorerView()?.fileItems) {
        if (!isFileIndexable(path)) continue
        let file = await cacheManager.getFromLiveCache(path)
        let title = state ? (file.heading ? file.heading : file.basename) : file.basename
        // https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional
        getTFileExplorerView()!.fileItems[path].innerEl.innerText = title
    }
}

function getTFileExplorerView(): TFileExplorerView | null {
    let leaves = app.workspace.getLeavesOfType('file-explorer')
    let view = leaves?.[0]?.view
    if (leaves.length > 1 && (view === undefined)) return null
    return view as TFileExplorerView
}
