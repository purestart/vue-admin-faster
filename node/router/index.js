const bdControllers=require('./db/dbControllers');
const genTableController=require('./gen/genTableController');
const dbSync=require('./gen/dbSync');

const auto_form_controller=require('./auto-form/auto-form-controller');

const customs_controller=require('./sys/customs-controller');

const sys_menu_controller=require('./sys/sys-menu-controller');

const depts_controller=require('./dept/tb-depts-controller');

module.exports={
    bdControllers,
    genTableController,
    dbSync,
    auto_form_controller,
    customs_controller,
    sys_menu_controller,
    depts_controller,
    
}