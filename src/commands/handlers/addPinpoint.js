import { savePinpoints, loadPinpoints } from "../commands/pinpointStore";
import { v4 as uuidv4 } from 'uuid'; 

export function addPinpoint(content) {
    const pinpoint = loadPinpoints(); 
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