const printBanner = context => {
  const { print } = context

  print.info('')
  print.info(
    print.colors.green(`
    ---------------------------------
          create-state-module
    ---------------------------------
    `),
  )
}

const printUsage = context => () => {
  const { print } = context
  printBanner(context)

  print.info('')
  print.info('Specify the name of your new state module')
  print.info(print.colors.green('create-state-module generate <state-module-name>'))
  print.info('')
  print.info('For example:')
  print.info(print.colors.green('create-state-module generate shopping-cart'))
  print.info('')
  print.info('Run create-state-module --help to see all options.')
}

module.exports = context => {
  context.utilities = {
    printUsage: printUsage(context),
  }
}
