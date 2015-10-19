`import Ember from 'ember'`
`import CPM from 'ember-cpm'`
`import validateEmployee from 'config/validators/employee'`
`import {Atomic} from 'simwms-shared'`
`import ENV from 'config/config/environment'`
AdminManager = 
  value: "admin_manager"
  presentation: "Admin Manager"  
Admin = 
  value: "admin"
  presentation: "Data Administrator"
Manager = 
  value: "manager"
  presentation: "Warehouse Manager"
DockWorker = 
  value: "dockworker"
  presentation: "Dock Staff"
ScaleMaster =
  value: "scalemaster"
  presentation: "Scale Master"
Logistics =
  value: "logistics"
  presentation: "Logistics Staff"
Inventory =
  value: "inventory"
  presentation: "Inventory Staff"

{computed} = Ember
{alias} = computed

EmployeeController = Ember.Controller.extend Atomic,
  upgradeExtLink: CPM.Macros.fmt ENV.simwmsUpgradePage, "accountPermalink"
  accountPermalink: CPM.Macros.encodeURIComponent "currentUser.account.permalink"
  plan: alias "servicePlan"
  servicePlan: alias "currentUser.servicePlan"
  employee: alias "model"
  knownRoles: [Manager, DockWorker, ScaleMaster, Inventory, Logistics, Admin, AdminManager]
  roleIcon: computed "employee.role", 
    get: ->
      switch @get "employee.role"
        when "admin_manager" then "fa fa-warning"
        when "admin" then "fa fa-wrench"
        when "manager" then "fa fa-users"
        when "dockworker" then "fa fa-truck"
        when "scalemaster" then "fa fa-balance-scale"
        when "logistics" then "fa fa-calendar"
        when "inventory" then "fa fa-cubes"
        else "fa fa-cog"
  actions:
    submit: ->
      @atomically =>
        validateEmployee @get "employee"
        .then (employee) =>
          employee.save()
        .then =>
          @transitionToRoute "employees.index"
        .catch (errors) =>
          @set "errors", errors
      
    closeModal: ->
      @transitionToRoute "employees.index"

`export default EmployeeController`