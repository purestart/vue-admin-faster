const bdControllers=require('./db/dbControllers');
const genTableController=require('./gen/genTableController');
const dbSync=require('./gen/dbSync');
{{#each(obj.reg.regArray)~}}
const {{this.attrsName}}_controller=require('./{{this.moduleName}}/{{this.fileSubName}}-controller');
{{~/each}}
module.exports={
    bdControllers,
    genTableController,
    dbSync,
    {{#each(obj.reg.regArray)~}}
    {{this.attrsName}}_controller,
    {{~/each}}
}