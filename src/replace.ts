import { cacheManager } from './cache'
import { isFileIndexable } from './utils'

export async function setTabTitles(setHeading: boolean, setSingle: boolean, filePath: string | null): Promise<void> {    
    let leaves = app.workspace.getLeavesOfType('markdown')
    for (let leaf of leaves) {
        if (!leaf) continue
        if (setSingle && filePath != leaf?.view?.file?.path) continue
        let file = await cacheManager.getFromLiveCache(leaf?.view?.file?.path)
        let title = setHeading ? (file.heading ? file.heading : file.basename) : file.basename
        leaf.tabHeaderInnerTitleEl.setText(title)
        
        // console.log(`setSingle: ${setSingle}, filePath: ${filePath}, viewPath: ${leaf?.view?.file?.path}, cachedHeading: ${file.heading}`)
        // console.log(file)
    }
}
