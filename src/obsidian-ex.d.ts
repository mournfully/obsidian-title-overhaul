import 'obsidian'
declare module 'obsidian' {
    
    export class TFileExplorerView extends View {
        fileItems: { [key: string]: TFileExplorerItem }
        getViewType(): string
        getDisplayText(): string
    }

    export interface TFileExplorerItem {
        file: TFile | TFolder
        selfEl: HTMLDivElement
        innerEl: HTMLDivElement
    }

    // Property 'file' does not exist on type 'View'
    interface View {
        file?: {
            path?: string
            basename?: string
        }
    }

    // Property 'tabHeaderInnerTitleEl' does not exist on type 'WorkspaceLeaf'
    interface WorkspaceLeaf {
        tabHeaderInnerTitleEl?: any
    }

}