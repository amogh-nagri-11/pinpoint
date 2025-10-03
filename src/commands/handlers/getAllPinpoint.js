import { loadPinpoints } from "../storage/pinpointStore.js";

export function getAllPinpoints() {
    const pinpoints = loadPinpoints();
    
    if (!pinpoints || pinpoints.length === 0) {
        return { success: false, message: "No pinpoints found" };
    }

    return { success: true, data: pinpoints };
}