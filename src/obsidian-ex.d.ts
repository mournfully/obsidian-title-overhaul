import 'obsidian';
declare module 'obsidian' {
    
    export class TFileExplorerView extends View {
        fileItems: { [key: string]: TFileExplorerItem }
        getViewType(): string
        getDisplayText(): string
    }

    export interface TFileExplorerItem {
        file: TFile | TFolder;
        selfEl: HTMLDivElement;
        innerEl: HTMLDivElement;
    }

}