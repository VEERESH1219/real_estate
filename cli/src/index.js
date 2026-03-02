#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { landsMenu } from './commands/lands.js';
import { plotsMenu } from './commands/plots.js';
import { plot3dMenu } from './commands/plot3d.js';

async function main() {
  console.log(chalk.bold.cyan('\n=== Real Estate CLI Client ===\n'));

  const { resource } = await inquirer.prompt([
    {
      name: 'resource',
      message: 'Select resource to manage:',
      type: 'list',
      choices: ['Lands', 'Plots', '3D Models', 'Exit']
    }
  ]);

  switch (resource) {
    case 'Lands':
      await landsMenu();
      break;
    case 'Plots':
      await plotsMenu();
      break;
    case '3D Models':
      await plot3dMenu();
      break;
    case 'Exit':
      console.log(chalk.yellow('Goodbye!'));
      process.exit(0);
  }

  await main();
}

main().catch(err => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
