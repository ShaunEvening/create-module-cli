module.exports = {
  name: 'generate',
  alias: ['g'],
  description: 'Generate a new state module with the given name',
  hidden: false,
  run: async context => {
    const { parameters, prompt, print, stateModule } = context

    const nameQuestion = {
      type: 'input',
      name: 'moduleName',
      description: 'module name (e.g. "example-module")',
    }
    const name = parameters.first || (await prompt.ask(nameQuestion)).moduleName

    print.info('Creating your ' + print.colors.green(name) + ' module files\n')
    await stateModule.generateFiles(name.toLowerCase())
    print.info('\nDone!\n')
  },
}
