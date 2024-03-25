import React from 'react';
import {Text} from 'ink';
import {checkIfItsGitRepository} from '../utils/git/git.utils.js';

type TProps = {
	arg?: string;
};

export default function Install({arg}: TProps) {
	arg;
	React.useEffect(() => {
		console.log('test', checkIfItsGitRepository(process.cwd()));
	}, []);

	return (
		<Text>
			Hello, <Text color="green">{'Mec'}</Text>
		</Text>
	);
}
