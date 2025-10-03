import { loadPinpoints } from "../commands/pinpointStore";

export function listPinpoint() {
    const pinpoint = loadPinpoint(); 
    return { success: true, data: pinpoints }; 
}