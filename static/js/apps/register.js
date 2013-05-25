jQuery(function() {
    //注册
    var usernameinput = $('#register input[name=username]'),
        emailinput = $('#register input[name=email]'),
        passwordinput = $('#register input[name=password]'),
        registerpanel = $('#register');
    $('.control-group').removeClass('error');
    $('.help-inline').hide();
    $('#register button[name=register]').click(function(){
        if(validRegister()){
            $('#register .registerform').submit();
        }
        return false;
    });
    function validRegister(){
        var username = $.trim(usernameinput.val()),
            email = $.trim(emailinput.val()),
            password = $.trim(passwordinput.val()),
            tag = true;
        if(username&&username.length>=2&&username.length<=20){
            usernameinput.val(username);
            $('#register .usernamepanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#register .usernamepanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        if(email&&tools.isEmail(email)){
            emailinput.val(email);
            $('#register .emailpanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#register .emailpanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        if(password&&password.length>=6&&password.length<=20){
            passwordinput.val(password);
            $('#register .passwordpanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#register .passwordpanel').addClass('error').find('.help-inline').show();
            tag = false;
        }
        return tag;
    }
});