# Prefer Headings

I was previously using the [front-matter-title](https://github.com/snezhig/obsidian-front-matter-title) plugin in order to display first headings instead of the filenames. It worked quite well until I tried to integrate the node package `front-matter-title-api-provider` with [omnisearch](https://github.com/scambier/obsidian-omnisearch). 

I had quite a few problems trying to integrate the two. Mostly because of the non-standard frameworks used and the sheer commmplexity in `front-matter-title` making it difficult for me to understand how it even parsed `#headings`.

I did have a much easier time with the `omnisearch` codebase and managed to track down where the titles were rendered.	
```javascript
// obsidian-omnisearch/src/components/ResultItemVault.svelte (lines 19-22 & 41-46)

  export let note: ResultNote
  let title = ''

  $: {
    title = note.basename
    notePath = pathWithoutFilename(note.path)
    if (settings.ignoreDiacritics) {
      title = removeDiacritics(title)
    }
  }
```

I also realized that the if the object `ResultNote` had the parameter `headings1` it would get automatically filled by `IndexedDocument` after some playing around with the code. Unfortunately while it did technically work, there were quite a few problems.
```diff
# obsidian-omnisearch/src/globals.ts

export type ResultNote = {
  score: number
  path: string
  basename: string
+ headings1: string  
  content: string
  foundWords: string[]
  matches: SearchMatch[]
}
```

I've grown sick of reading other people's codebases. So I've decided to try and make a much simpler and readable plugin with an api I can use to integrate with other plugins.
