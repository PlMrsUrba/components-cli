import React from 'react';
import {Text, useStdin} from 'ink';
import {installComponent} from '../utils/git/git.utils.js';

type TProps = {
	arg?: string;
};

export default function Install({arg}: TProps) {
	const [loaded, setLoaded] = React.useState(false);
	if (arg && arg === 'latest') {
		installComponent('main');
	} else {
		const {stdin} = useStdin();
		stdin.on('data', data => {
			installComponent(data.toString().trim());
			setLoaded(true);
			stdin.destroy();
		});
	}

	return (
		<>
			{arg && arg === 'latest' && (
				<Text>
					<Text color="yellow">Info :</Text> Installing latest version
				</Text>
			)}
			{(!arg || arg !== 'latest') && !loaded && (
				<Text>
					<Text color="yellow">Info :</Text> Choose branch to install
				</Text>
			)}
		</>
	);
}
