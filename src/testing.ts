import { indexDocument, cacheManager } from "./cache";

export async function fileResolver() {	

    const file = app.workspace.getActiveFile()
    // console.log(file)
    // let cache = app.metadataCache.getFileCache(file!)?.headings?.[0]?.heading // <-- non-null assertion (!) operator
    // console.log(cache)
    let output = indexDocument(file!.path)
    console.log(output)

}

}
