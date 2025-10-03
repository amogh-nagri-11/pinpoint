import { savePinpoints, loadPinpoints } from "../storage/pinpointStore.js";


export function listPinpoint() {
    const pinpoints = loadPinpoints(); 
    return { success: true, data: pinpoints }; 
}