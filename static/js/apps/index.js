var languages = ['json','html','css','javascript','python'];
jQuery(function() {
    $('#codeinput').keyup(function(){
        var jsondata = null;
        try{
            jsondata = JSON.parse($(this).val())
        }catch(e){
            return;
        }
        if(!jsondata){
            return;
        }
        var result = $('#result'),
            precode = $('pre code',result);
        var precodeobj = hljs.highlight('json',JSON.stringify(jsondata,'undefined',4));
        precode.html(precodeobj.value);
    });
});
jQuery(function() {
    var optionpanel = $('#codeoptions');
    optionpanel.on('show', function () {
        optionpanel.css('left',($(window).width()-optionpanel.width())/2);
    });
});
//下拉菜单选择
jQuery(function() {
   $('.optionmenu').on('click','a',function(){
       var tag = $(this).attr('data-tag'),
           showtag = $(this).html(),
           optionpanel = $(this).parents('.optionpanel');
       optionpanel.find('.optiontag').val(showtag);
       optionpanel.find('input[type=hidden]').val(tag);
   });
});
//form提交
jQuery(function() {
    $('form[name=codepass]').submit(function(){
        if(verifyform()){
            return true;
        }
        return false;
    });
    function verifyform(){
        var codeinput = $('textarea[name=code]'),
            titleinput = $('input[name=title]');
        var code = $.trim(codeinput.val()),
            title = $.trim(titleinput.val());
        if(!code){
            smallnote('请输入您要分享的代码');
            return false;
        }else{
            codeinput.val(code);
        }
        if(!title){
            smallnote('请输入点标题吧');
            return false;
        }else{
            titleinput.val(title);
        }
        return true;
    }
});