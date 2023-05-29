import { indexDocument, cacheManager } from "./cache"

export async function fileResolver() {	

    const file = app.workspace.getActiveFile()
    console.log(file)
    
    let cache = app.metadataCache.getFileCache(file!) // <-- non-null assertion (!) operator
    console.log(cache)

    let cachedHeading = cache?.headings?.[0]?.heading 
    console.log(cachedHeading)
    

}

export async function cacheResolver() {

    const file = app.workspace.getActiveFile()
    let output = await cacheManager.getFromLiveCache(file!.path)
    console.log(output)

}

export async function allCacheResolver() {

    const files = app.vault.getMarkdownFiles()	
    for (let i = 0; i < files.length; i++) {
        let output = await cacheManager.getFromLiveCache(files[i].path)
        console.log(output)
    }

}
