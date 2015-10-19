`import Ember from 'ember'`
`import CPM from 'ember-cpm'`
`import ENV from 'config/config/environment'`

alias = Ember.computed.alias
PlanController = Ember.Controller.extend
  upgradeLink: Ember.computed "accountId",
    get: ->
      ENV.simwmsUpgradePage.replace("%@", @get "accountId")
  accountId: CPM.Macros.encodeURIComponent "currentUser.account.id"

  keys: alias "model.keys"
  icons: alias "model.icons"

`export default PlanController`
