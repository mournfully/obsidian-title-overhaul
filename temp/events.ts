/*
  Defines an event manager for the plugin

  https://www.davideaversa.it/blog/simple-event-system-typescript/
  https://www.youtube.com/watch?v=2vaTy4dkbJM - Node Events Tutorial | Node.js Tutorials for Beginners
  https://www.youtube.com/watch?v=7BhD2txiITM - Understanding EventEmitter | Understanding Node.js Core Concepts
  https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
  https://www.youtube.com/watch?v=Pl7pDjWd830 - TypeScript: Building a better EventEmitter
  https://gist.github.com/sstur/f205140b0965a0449932a364323db8dd - sstur/yt-Pl7pDjWd830.md (unlisted)
  https://gist.github.com/sstur/5183a59dcc1649db5bae30e016790d24 - sstur/EventEmitter.ts (public)
*/

import { TFile, WorkspaceLeaf } from 'obsidian';

type Listener<T extends Array<any>> = (...args: T) => void;

class EventEmitter<EventMap extends Record<string, Array<any>>> {
  private eventListeners: { [K in keyof EventMap]?: Set<Listener<EventMap[K]>>} = {}

  on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
    return this.addListener(eventName, listener)
  }

  addListener<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
    const listeners = this.eventListeners[eventName] ?? new Set()
    listeners.add(listener)
    this.eventListeners[eventName] = listeners
  }

  off<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
    return this.removeListener(eventName, listener)
  }

  removeListener<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
    const listeners = this.eventListeners[eventName]
    if (listeners) {
      listeners.delete(listener)
    }
  }

  emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]) {
    const listeners = this.eventListeners[eventName] ?? new Set()
    for (const listener of listeners) {
      listener(...args)
    }
  }
}

// type filePath = { newFilePath: string, oldFilePath: string}

type EventMap = { 
    layoutChange: [], 
    activeLeafChange: [ leaf: WorkspaceLeaf | null ],
    // fileOpen: [ file: TFile | null ],
    metadataCacheChanged: [ file: TFile ],
    // fileRename: [ paths: filePath ],
}

export const eventEmitter = new EventEmitter<EventMap>()
