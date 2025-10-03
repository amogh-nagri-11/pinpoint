import { savePinpoints, loadPinpoints } from "../storage/pinpointStore.js";


export function deletePinpoint(id) {
    let pinpoints = loadPinpoints(); 
    const exists = pinpoints.some(p=>p.id==id); 
    if (!exists) {
        return { success: false, pinpoint: "not found" }; 
    }

    pinpoints = pinpoints.filter(p=>p.id!=id); 
    savePinpoints(pinpoints); 

    return { success: true, pinpoint: "pinpoint deleted" }; 
}