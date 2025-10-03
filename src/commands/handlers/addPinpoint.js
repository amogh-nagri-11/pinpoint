import { savePinpoints, loadPinpoints } from "../storage/pinpointStore.js";

import { v4 as uuidv4 } from 'uuid'; 

export function addPinpoint(content) {
    const pinpoints = loadPinpoints(); 
    const newPinpoint = {
        id : uuidv4(),
        content, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString()
    }; 
    pinpoints.push(newPinpoint); 
    savePinpoints(pinpoints); 

    return { success: true, message: "Pinpoint added", date: newPinpoint }; 
}