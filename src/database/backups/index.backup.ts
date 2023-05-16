import { exec } from 'child_process';

async function backupDataMongoDb() {
    const child_process = exec(
        `mongodump --version`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`Lỗi: ${error.message}`);
            }
            if (stderr) {
                console.error(`Lỗi: ${stderr}`);
            }
            console.log(stdout);
        },
    );
}

backupDataMongoDb();
