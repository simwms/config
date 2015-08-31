`import DS from 'ember-data'`

User = DS.Model.extend
  email: DS.attr "string"
  password: DS.attr "string"
  username: DS.attr "string"
  accounts: DS.hasMany "account", async: true

`export default User`