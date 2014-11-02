define(["ajaxGet", "../utils/ajaxPost", "../vars/a_"], function(ajaxGet, ajaxPost, a_) {
    //Independant code code code
    function callXApi(){
        //Independant code code code
        ajaxGet();
        //Independant code code code
        ajaxPost();
        //Independant code code code    
    }
    //Independant code code code

    a_.callX = callXApi;

    return callXApi;
});