var xtpl = require('xtpl');
xtpl.renderFile('./xtpl/text.java',{
	name:"詹陈龙"
},function(error,content){
    if(error)
    {
        console.log("error");

        return;
    }
    console.log(content);
});