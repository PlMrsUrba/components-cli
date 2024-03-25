import { exec } from 'child_process';

export const checkIfItsGitRepository = (path: string) => {

    let result = false;

    exec(`git -C ${path} status`, (error, stdout) => {
        if (stdout) {
            result = true;
        }
        if (error) {
            console.log('error', error);
            result = false;
        }
        result = false;
    });

    return result;
};
