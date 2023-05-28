import Dexie from 'dexie'

export class HeadingsOverhaulDatabase extends Dexie {
    public static readonly dbVersion = 6
    //@ts-ignore
    public static readonly dbName = 'replace-title-with-header/cache/' + app.appId 

    private static instance: HeadingsOverhaulDatabase
    
    headingsCache!: Dexie.Table<
        {
            path: string
            mtime: number
            basename: string
            heading: string
        },
        string
    >

    private constructor() {
        super(HeadingsOverhaulDatabase.dbName)
        this.version(HeadingsOverhaulDatabase.dbVersion).stores({
            headingsCache: 'date'
        })
    }


    public static async clearDatabases(): Promise<void> {
        const databasesToDelete = (await indexedDB.databases()).filter(
            db => db.name === HeadingsOverhaulDatabase.dbName && db.version !== HeadingsOverhaulDatabase.dbVersion * 10
        )

        if (databasesToDelete.length) {
            console.log('Deleting old HeadingsOverhaul databases')
            for (const db of databasesToDelete) {
                if (db.name) {
                    indexedDB.deleteDatabase(db.name)
                }
            }
        }

    }

    public static getDatabase() {
        if (!HeadingsOverhaulDatabase.instance) {
            HeadingsOverhaulDatabase.instance = new HeadingsOverhaulDatabase()
        }
        return HeadingsOverhaulDatabase.instance
    }
}


export const database = HeadingsOverhaulDatabase.getDatabase()
