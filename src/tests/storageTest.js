// src/tests/storageTest.js
import { addPinpoint } from "../commands/handlers/addPinpoint.js";
import { editPinpoint } from "../commands/handlers/editPinpoint.js";
import { deletePinpoint } from "../commands/handlers/deletePinpoint.js";
import { getPinpoint } from "../commands/handlers/getPinpoint.js";
import { listPinpoint } from "../commands/handlers/listPinpoint.js";

// --- 1. Add a new Pinpoint ---
const added = addPinpoint("Test note from Pinpoint project");
console.log("✅ Added:", added);

// --- 2. List all Pinpoints ---
const listed = listPinpoint();
console.log("📋 List:", listed);

// --- 3. Get the first Pinpoint ---
if (listed.data && listed.data.length > 0) {
    const firstId = listed.data[0].id;

    const single = getPinpoint(firstId);
    console.log("🔍 Fetched single:", single);

    // --- 4. Edit that Pinpoint ---
    const edited = editPinpoint(firstId, "Updated content for testing");
    console.log("✏️ Edited:", edited);

    // --- 5. Delete it ---
    const deleted = deletePinpoint(firstId);
    console.log("🗑️ Deleted:", deleted);
} else {
    console.log("⚠️ No Pinpoints found to fetch/edit/delete.");
}
