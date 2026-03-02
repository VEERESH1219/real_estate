import inquirer from 'inquirer';
import chalk from 'chalk';
import { plot3dApi } from '../utils/api.js';

export async function getPlot3D() {
  const { plotId } = await inquirer.prompt([
    { name: 'plotId', message: 'Enter Plot ID:', type: 'input' }
  ]);

  try {
    const { data } = await plot3dApi.getByPlot(plotId);
    console.log(chalk.bold('\n=== 3D Model Details ===\n'));
    console.log(`Plot ID: ${data.plotId}`);
    console.log(`Model URL: ${data.modelUrl || 'N/A'}`);
    console.log(`House Model: ${data.houseModel}`);
    console.log(`Dimensions: ${data.dimensions?.width} x ${data.dimensions?.length} x ${data.dimensions?.height}`);
    console.log(`Colors - Wall: ${data.colors?.wall}, Roof: ${data.colors?.roof}, Ground: ${data.colors?.ground}`);
    console.log(`Created: ${new Date(data.createdAt).toLocaleString()}`);
    console.log(`ID: ${data._id}\n`);
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
  }
}

export async function createPlot3D() {
  const answers = await inquirer.prompt([
    { name: 'plotId', message: 'Plot ID:', type: 'input' },
    { name: 'modelUrl', message: 'Model URL:', type: 'input' },
    { name: 'houseModel', message: 'House Model:', type: 'input', default: 'basic' },
    { name: 'width', message: 'Width:', type: 'number', default: 10 },
    { name: 'length', message: 'Length:', type: 'number', default: 10 },
    { name: 'height', message: 'Height:', type: 'number', default: 3 },
    { name: 'wallColor', message: 'Wall Color (hex):', type: 'input', default: '#f5f5dc' },
    { name: 'roofColor', message: 'Roof Color (hex):', type: 'input', default: '#8b4513' },
    { name: 'groundColor', message: 'Ground Color (hex):', type: 'input', default: '#228b22' }
  ]);

  try {
    const data = {
      plotId: answers.plotId,
      modelUrl: answers.modelUrl,
      houseModel: answers.houseModel,
      dimensions: {
        width: answers.width,
        length: answers.length,
        height: answers.height
      },
      colors: {
        wall: answers.wallColor,
        roof: answers.roofColor,
        ground: answers.groundColor
      }
    };
    const { data: result } = await plot3dApi.create(data);
    console.log(chalk.green(`\n3D Model created successfully! ID: ${result._id}\n`));
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
  }
}

export async function updatePlot3D() {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'Enter 3D Model ID:', type: 'input' }
  ]);

  const answers = await inquirer.prompt([
    { name: 'modelUrl', message: 'Model URL:', type: 'input' },
    { name: 'houseModel', message: 'House Model:', type: 'input', default: 'basic' },
    { name: 'width', message: 'Width:', type: 'number', default: 10 },
    { name: 'length', message: 'Length:', type: 'number', default: 10 },
    { name: 'height', message: 'Height:', type: 'number', default: 3 },
    { name: 'wallColor', message: 'Wall Color (hex):', type: 'input', default: '#f5f5dc' },
    { name: 'roofColor', message: 'Roof Color (hex):', type: 'input', default: '#8b4513' },
    { name: 'groundColor', message: 'Ground Color (hex):', type: 'input', default: '#228b22' }
  ]);

  try {
    const data = {
      modelUrl: answers.modelUrl,
      houseModel: answers.houseModel,
      dimensions: {
        width: answers.width,
        length: answers.length,
        height: answers.height
      },
      colors: {
        wall: answers.wallColor,
        roof: answers.roofColor,
        ground: answers.groundColor
      }
    };
    const { data: result } = await plot3dApi.update(id, data);
    console.log(chalk.green('\n3D Model updated successfully!\n'));
    console.log(`House Model: ${result.houseModel}`);
    console.log(`Dimensions: ${result.dimensions?.width} x ${result.dimensions?.length} x ${result.dimensions?.height}`);
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`));
  }
}

export async function plot3dMenu() {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      message: 'Choose action:',
      type: 'list',
      choices: [
        'Get 3D model by plot',
        'Create new 3D model',
        'Update 3D model',
        'Back to main menu'
      ]
    }
  ]);

  switch (action) {
    case 'Get 3D model by plot':
      await getPlot3D();
      break;
    case 'Create new 3D model':
      await createPlot3D();
      break;
    case 'Update 3D model':
      await updatePlot3D();
      break;
    case 'Back to main menu':
      return;
  }

  await plot3dMenu();
}
