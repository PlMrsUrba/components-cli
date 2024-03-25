#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';

import {ARGUMENTS} from './types/cli.enum.js';
import Install from './screens/install.js';

const cli = meow(
	`
	Usage
	  $ components-cli

	Options

	Examples
`,
	{
		importMeta: import.meta,
	},
);

switch (cli.input.at(0)) {
	case ARGUMENTS.INSTALL: {
		console.log('install');
		render(<Install arg={cli.input.at(1)} />);
		break;
	}
	default: {
		console.log('default');
		cli.showHelp();
		break;
	}
}
