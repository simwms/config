`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend
  queryParams: ["token", "account"]
  token: null
  account: null

`export default ApplicationController`