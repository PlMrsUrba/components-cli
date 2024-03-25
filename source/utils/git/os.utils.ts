import os from 'os';

export const remove = (path: string): string => {
    return os.type() === 'Windows_NT' ? `rm ${path} -r -force` : `rm -rf ${path}`;
}

export const checkIfExist = (path: string): string => {
    return os.type() === 'Windows_NT' ? `Test-Path ${path}` : `-d ${path}`;
}