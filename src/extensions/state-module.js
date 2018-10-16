const splitNameToArray = moduleName => moduleName.split('-')

const capitalize = word => word.replace(/^\w/, char => char.toUpperCase())

const getCamelCase = ([firstWord, ...rest]) =>
  rest.length
    ? rest.reduce((camelCase, word) => `${camelCase}${capitalize(word)}`, firstWord)
    : firstWord

const getPascalCase = wordArray =>
  wordArray.reduce((pascalCase, word) => `${pascalCase}${capitalize(word)}`, '')

const getConstantString = ([firstWord, ...rest]) =>
  rest.length
    ? rest.reduce(
        (constantString, word) => `${constantString}_${word.toUpperCase()}`,
        firstWord.toUpperCase(),
      )
    : firstWord.toUpperCase()

const getTemplateProps = moduleName => {
  const nameArray = splitNameToArray(moduleName)

  return {
    camelCase: getCamelCase(nameArray),
    pascalCase: getPascalCase(nameArray),
    constantString: getConstantString(nameArray),
    kebabCase: moduleName,
  }
}

const getFileNames = (fileExtension, barrelFile, moduleName) => ({
  actions: `${moduleName}.actions.${fileExtension}`,
  reducer: `${moduleName}.reducer.${fileExtension}`,
  selectors: `${moduleName}.selectors.${fileExtension}`,
  ...(barrelFile ? { index: `index.${fileExtension}` } : {}),
})

const fileExtensionToLanguage = {
  js: 'javascript',
  ts: 'typescript',
}

const generateFiles = ({ configuration, template, print }) => moduleName => {
  const fileNameMap = getFileNames(
    configuration.fileExtension,
    configuration.barrelFile,
    moduleName,
  )

  const templateFolder = fileExtensionToLanguage[configuration.fileExtension]

  Object.keys(fileNameMap).forEach(key => {
    template.generate({
      template: `${templateFolder}/${key}.${configuration.fileExtension}.ejs`,
      target: `${configuration.stateDirectory}/${moduleName}/${fileNameMap[key]}`,
      props: getTemplateProps(moduleName),
    })

    print.info(`${fileNameMap[key]}: ${print.colors.green('✔')}`)
  })
}

module.exports = context => {
  context.stateModule = {
    getTemplateProps,
    generateFiles: generateFiles(context),
  }
}
