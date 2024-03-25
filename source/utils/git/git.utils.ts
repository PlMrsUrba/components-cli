import {promisify} from 'util';
import { exec as execCb, spawn } from 'child_process';
import os from 'os';

import { checkIfExist, remove } from './os.utils.js';

const exec = promisify(execCb);

const shell = os.type() === 'Windows_NT' ? 'powershell' : 'bash';

export const checkIfItsGitRepository = async (path: string) => {
	try {
		await exec(`git -C ${path} status`);
		return true;
	} catch (error) {
		return false;
	}
};


const moveComponents = async () => {
	try {
		const isExist = await exec(checkIfExist('./src/components'), { shell });
		if (isExist.stdout.includes('True')) {
			await exec(remove('./src/components'), { shell });
		}
		await exec(`mv ./tmp/complib/src/components ./src/components`, { shell }).then(() => {
			exec(remove('./tmp/complib'), { shell });
		});
	} catch (error) {
		console.log(error);
	}

}

export const installComponent = async (branch: string) => {
	try {
		const isExist = await exec(checkIfExist('./tmp/complib'), { shell });
		if (isExist.stdout.includes('True')) {
			await exec(remove('./tmp/complib'), { shell });
		}
		spawn('git',
			['clone', 'git@github.com:urbasolar/Ucomponents.git', '--branch', branch, './tmp/complib'],
			{ stdio: 'inherit' }
		).on('exit', () => {
			moveComponents();
		});	

	}catch (error) {
		console.log(error);
	}
};
