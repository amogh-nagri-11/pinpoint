import { savePinpoints, loadPinpoints } from "../commands/pinpointStore";

export function editPinpoint(id, newContent) {
    const pinpoints = loadPinpoints(); 
    const idx = pinpoints.findIndex(p=>p.id==id); 
    if (idx==-1) {
        return { success: false, message: 'Pinpoint not found' }; 
    }
    pinpoints[idx].content = newContent; 
    pinpoints[idx].updatedAt = new Date().toISOString(); 
    savePinpoints(pinpoints); 

    return { success: true, message: 'Pinpoint updated', data: pinpoints[idx] }; 
}