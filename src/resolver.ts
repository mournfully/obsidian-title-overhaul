import { TFile } from "obsidian"

export function fileResolver() {
		
    let file = app.workspace.getActiveFile()
    console.log(file)
    let cache = app.metadataCache.getFileCache(file!)?.headings?.[0]?.heading // <-- non-null assertion (!) operator
    console.log(cache)

}
