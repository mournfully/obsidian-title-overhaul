import { eventEmitter } from "./events"

eventEmitter.on("layoutChange", () => {
    console.log("layoutChange")
});

eventEmitter.on("activeLeafChange", () => {
    console.log("activeLeafChange")
});

eventEmitter.on("fileOpen", () => {
    console.log("fileOpen")
});

eventEmitter.on("metadataChanged", () => {
    console.log("metadataChanged")
});

eventEmitter.on("fileRename", () => {
    console.log("fileRename")
});
