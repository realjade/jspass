jQuery(function() {
    var codepanel = $('#code'),
        code = codepanel.text();
    seajs.use('codepass',function(){
        codepanel.html(codepass(code).code);
    });
});