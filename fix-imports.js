const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('Service.ts') || file.endsWith('service.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const services = walk(path.join(__dirname, 'src', 'modules'));

services.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace import { apiClient } with import { axiosInstance }
    content = content.replace(/import\s*\{\s*apiClient\s*\}\s*from\s*['"]@\/lib\/api\/apiClient['"];?/g, 'import { axiosInstance } from "@/config/axiosInstance";');
    
    // Replace import { axiosInstance as apiClient } (if any)
    content = content.replace(/import\s*\{\s*axiosInstance\s+as\s+apiClient\s*\}\s*from\s*['"]@\/config\/axiosInstance['"];?/g, 'import { axiosInstance } from "@/config/axiosInstance";');

    // Add missing import if it uses axiosInstance but doesn't import it
    if (content.includes('axiosInstance.') && !content.includes('import { axiosInstance }')) {
        // Strip out any empty lines or BOM at the start to cleanly prepend
        content = content.replace(/^\uFEFF/, '');
        content = 'import { axiosInstance } from "@/config/axiosInstance";\n' + content;
    }

    // Replace apiClient.get/post/put/delete with axiosInstance.get/post/put/delete
    content = content.replace(/apiClient\./g, 'axiosInstance.');

    // Remove BOM if present at the very beginning
    content = content.replace(/^\uFEFF/, '');

    // Sometimes the user deleted the import entirely (like in productsService.ts)
    // We should make sure the import is there if axiosInstance is used!
    if (content.includes('axiosInstance.') && !content.includes('import { axiosInstance }')) {
        content = 'import { axiosInstance } from "@/config/axiosInstance";\n' + content;
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
