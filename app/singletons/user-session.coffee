`import Ember from 'ember'`

alias = Ember.computed.alias
ifPresent = Ember.computed.and
ifAny = Ember.computed.or
isBlank = Ember.isBlank
notEmpty = Ember.computed.notEmpty

Errors = Ember.Object.extend
  hasErrors: ifAny "hasAccountErrors", "hasTokenErrors"
  hasAccountErrors: notEmpty "account"
  hasTokenErrors: notEmpty "token"
  clear: ->
    @set "account", []
    @set "token", []
  addError: (key, msg) ->
    @getWithDefault(key, []).pushObject msg

UserSession = Ember.Object.extend
  isLoggedIn: ifPresent "account.id"
  namespace: alias "account.namespace"
  host: alias "account.host"
  hasErrors: alias "errors.hasErrors"
  errors: Errors.create()
  p: Ember.computed -> new Ember.RSVP.Promise (r) => r @
  checkForErrors: ->
    @errors.clear()
    @setError "token", "cannot be blank" if isBlank(@get "rememberToken")
    @setError "account", "cannot be blank" if isBlank(@get "accountId")
    @get "hasErrors"
  configure: ({token, account}) ->
    @set "accountId", account
    @set "rememberToken", token
  setup: (store) ->
    return @get("p") if @checkForErrors()

    store.find "account", @get("accountId")
    .then (account) =>
      @set "account", account
      @
    .catch ({errors}) =>
      @setError "account", "does not match given token"
      @

  setError: (key, msg) ->
    @errors.addError key, msg



`export default UserSession`