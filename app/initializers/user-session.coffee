`import UserSession from '../singletons/user-session'`
# Takes two parameters: container and app
initialize = (registry, application) ->
  application.register "session:user", UserSession
  application.inject "controller", "currentUser", "session:user"
  application.inject "route", "currentUser", "session:user"
  application.inject "adapter", "currentUser", "session:user"

UserSessionInitializer =
  name: 'user-session'
  initialize: initialize

`export {initialize}`
`export default UserSessionInitializer`
