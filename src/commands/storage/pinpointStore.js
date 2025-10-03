import fs from 'fs'; 
import path from 'path'; 

const DATA_FILE = path.join(process.cwd(), 'src/data/pinpoints.json'); 

function loadPinpoints() {
    if (!fs.existsSync(DATA_FILE)) return []; 

    const data = fs.readFileSync(DATA_FILE, 'utf-8'); 
    return json.parse(data || '[]'); 
}

function savePinpoints(pinpoints) { 
    fs.writeFileSync(DATA_FILE, json.stringify(pinpoints, null, 2)); 
}

export { loadPinpoints, savePinpoints };