/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge, ipcRenderer } = require('electron')
// @ts-expect-error weird interop between cjs and mjs
import type { ApiConfigData, ApiStatusResponse } from './apiTypes.js'

const electronApi = {
	rescanSurfaces: (): void => ipcRenderer.send('rescan'),
	getStatus: async (): Promise<ApiStatusResponse> => ipcRenderer.invoke('getStatus'),
	getConfig: async (): Promise<ApiConfigData> => ipcRenderer.invoke('getConfig'),
	saveConfig: async (newConfig: Partial<ApiConfigData>): Promise<ApiConfigData> =>
		ipcRenderer.invoke('saveConfig', newConfig),
}

contextBridge.exposeInMainWorld('electronApi', electronApi)

export type { electronApi }
