import { savePinpoints, loadPinpoints } from "../storage/pinpointStore.js";


export function getPinpoint(keyword) {
    const pinpoints = loadPinpoints();
    const match = pinpoints.filter(p=> p.content &&
        p.content.toLowerCase().includes(keyword.toLowerCase())
    );
    if (match.length===0) {
        return { success: false, message: 'no matching pinpoints found' }; 
    } 
    return { success: true, data: match }; 
}