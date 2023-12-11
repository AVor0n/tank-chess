// @ts-nocheck
const { propertyOrdering } = require('stylelint-semantic-groups')

propertyOrdering.forEach(list => {
  list.forEach(item => {
    item.emptyLineBefore = 'never'
  })
})

module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-use-logical-spec',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {
    'liberty/use-logical-spec': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'order/properties-order': propertyOrdering,
  },
  customSyntax: 'postcss-scss',
  defaultSeverity: 'error',
  ignoreFiles: ['**/*', '!**/*.scss', 'dist', 'node_modules'],
}
