import { IndexedDocument } from "./utils"

export async function indexDocument(path: string): Promise<IndexedDocument> {
    // Return first element in array with valid path and type string
    const file = app.vault.getFiles().find(f => f.path === path)
    if (!file) throw new Error(`Invalid file path: "${path}"`)

    // Isolate the first heading property from file's CachedMetadata
    /*
        "CachedMetadata":
            "headings": 
                0:
                    "heading": "§ 📙 wiki"
    */
    let heading = app.metadataCache.getFileCache(file)?.headings?.[0]?.heading

    return {
        path: file.path,
        mtime: file.stat.mtime,
        basename: file.basename,
        heading: heading as string,
    }
}
