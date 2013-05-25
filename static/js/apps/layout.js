jQuery(function() {
    //登录
    var usernameinput = $('#loginpanel input[name=username]'),
        passwordinput = $('#loginpanel input[name=password]'),
        loginpanel = $('#loginpanel');
    loginpanel.on('show', function () {
      passwordinput.val('');
      $('#loginpanel button[name=login]').hide();
      $('.control-group').removeClass('error');
      $('.help-inline').hide();
      loginpanel.css('left',($(window).width()-loginpanel.width())/2);
    });
    loginpanel.on('shown',function(){
        usernameinput.select();
    });
    $('#loginpanel #loginbtn').click(function(){
        if(validLogin()){
            $('#loginpanel .loginform').submit();
        }
    });
    $('.loginform input').keypress(function(e){
        if(e.which == 13&&validLogin()){
            $('#loginpanel .loginform').submit();
        }
    });
    function validLogin(){
        var username = $.trim(usernameinput.val()),
            password = $.trim(passwordinput.val()),
            tag = true;
        if(username){
            usernameinput.val(username);
            $('#loginpanel .usernamepanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#loginpanel .usernamepanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        if(password){
            passwordinput.val(password);
            $('#loginpanel .passwordpanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#loginpanel .passwordpanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        return tag;
    }
});

jQuery(function() {
    //注册
    var usernameinput = $('#registerpanel input[name=username]'),
        emailinput = $('#registerpanel input[name=email]'),
        passwordinput = $('#registerpanel input[name=password]'),
        registerpanel = $('#registerpanel');
    registerpanel.on('show', function () {
      passwordinput.val('');
      $('#registerpanel button[name=register]').hide();
      $('.control-group').removeClass('error');
      $('.help-inline').hide();
      registerpanel.css('left',($(window).width()-registerpanel.width())/2);
    });
    registerpanel.on('shown',function(){
        usernameinput.select();
    });
    $('#registerpanel #registerbtn').click(function(){
        if(validRegister()){
            $('#registerpanel .registerform').submit();
        }
    });
    $('.registerform input').keypress(function(e){
        if(e.which == 13&&validRegister()){
            $('#registerpanel .registerform').submit();
        }
    });
    function validRegister(){
        var username = $.trim(usernameinput.val()),
            email = $.trim(emailinput.val()),
            password = $.trim(passwordinput.val()),
            tag = true;
        if(username&&username.length>=2&&username.length<=20){
            usernameinput.val(username);
            $('#registerpanel .usernamepanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#registerpanel .usernamepanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        if(email&&tools.isEmail(email)){
            emailinput.val(email);
            $('#registerpanel .emailpanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#registerpanel .emailpanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        if(password&&password.length>=6&&password.length<=20){
            passwordinput.val(password);
            $('#registerpanel .passwordpanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#registerpanel .passwordpanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        return tag;
    }
});