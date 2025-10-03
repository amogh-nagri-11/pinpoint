import { loadPinpoints } from "../commands/pinpointStore";

export function getPinpoint(id) {
    const pinpoints = loadPinpoints();
    const match = pinpoints.find(p=>p.id==id); 
    if (!match) {
        return { success: false, message: 'pinpoint not found' }; 
    } 
    return { success: true, data: match }; 
}