const bdControllers=require('./db/dbControllers');
const genTableController=require('./gen/genTableController');
const dbSync=require('./gen/dbSync');

const auto_form_controller=require('./auto-form/auto-form-controller');

const customs_controller=require('./sys/customs-controller');

const sys_menu_controller=require('./sys/sys-menu-controller');

const depts_controller=require('./dept/tb-depts-controller');

const project_ctrl_controller=require('./project/project-ctrl-controller');

const gen_template_controller=require('./gen/tb-gen-template-controller');

const gen_type_controller=require('./gen/tb-gen-type-controller');

const project_plan_controller=require('./project/tb-project-plan-controller');

module.exports={
    bdControllers,
    genTableController,
    dbSync,
    auto_form_controller,
    customs_controller,
    sys_menu_controller,
    depts_controller,
    project_ctrl_controller,
    gen_template_controller,
    gen_type_controller,
    project_plan_controller,
    
}