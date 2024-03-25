#!/usr/bin/env node
import React from 'react';
import {Text, render} from 'ink';
import meow from 'meow';

import {ARGUMENTS} from './types/cli.enum.js';
import Install from './screens/install.js';
import {checkIfItsGitRepository} from './utils/git/git.utils.js';

const cli = meow(
	`
	Usage
	  $ components-cli

	Options
	  install  - choose a branch to install

	  install latest - install the latest version (main)

	Examples
	  $ components-cli install
	  	It will ask you to choose a branch to install
		
	  $ components-cli install latest
`,
	{
		importMeta: import.meta,
	},
);

switch (cli.input.at(0)) {
	case ARGUMENTS.INSTALL: {
		checkIfItsGitRepository(process.cwd()).then(isGitRepository => {
			isGitRepository;
			if (!isGitRepository) {
				render(
					<Text>
						<Text color="red">Error :</Text> it is not a git repository
					</Text>,
				);
				process.exit(1);
			}
			render(<Install arg={cli.input.at(1)} />);
		});
		break;
	}
	default: {
		cli.showHelp();
		break;
	}
}
