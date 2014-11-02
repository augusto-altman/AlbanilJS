/*-------------------------------------------------------
File builded with AlbanilJS
github: https://github.com/augusto-altman/AlbanilJS
npm: https://www.npmjs.org/package/albaniljs 
-------------------------------------------------------*/

var cuak = (function() {
    function ajaxGet() {
        console.log("GET!");
    }



    function ajaxPost() {
        console.log("POST!");
    }



    var a_ = {};



    //Independant code code code
    function callXApi() {
            //Independant code code code
            ajaxGet();
            //Independant code code code
            ajaxPost();
            //Independant code code code    
        }
        //Independant code code code

    a_.callX = callXApi;


    //skjaks
    //Independant code code code
    function callYApi() {
            //Independant code code code
            ajaxGet();
            //Independant code code code
        }
        //Independant code code code

    a_.callY = callYApi;
    return a;
}());