import fs from 'fs';
export default function handleDeleteFile(path: string): boolean {
    try {
        fs.unlink(path, (err) => {
            if (err) throw new Error(err.message);
            return true;
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
