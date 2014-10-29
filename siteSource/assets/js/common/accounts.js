if (typeof OPTIMISED === 'undefined') OPTIMISED = false;
var SIO=SIO||{};
$(function () {
//    if (OPTIMISED) {
//        if(location.href.indexOf('https://www.statico.io')!=0){
//            location.href='https://www.statico.io'+location.pathname;
//        }
//    }

    SIO.accountSendEmail=function(from,subject,msg,successAction,failedAction){
        $.ajax({
            type: "POST",
            url: "/web/accounts/contact-team",
            data: { from: from, subject: subject, msg: msg },
            success: function (jsonResult) {
                successAction(jsonResult);
            },
            error: function (jqXHR, textStatus) {
                failedAction(jqXHR,textStatus);
            }
        });
    }
    $('.signUp').mouseover(function () {
        var signUpButton = $(this);
        signUpButton.hide();
        var emailFormHtml = $('<div class="signUpForm"><input type="text" class="form-control" name="signUpEmail" placeholder="type your email to sign up"/></div>');
        signUpButton.parent().append(emailFormHtml);
        $('input', emailFormHtml).blur(function () {
            signUpButton.show();
            emailFormHtml.html('');
        }).keypress(function (e) {
            if (e.which == '13') {
                var subject = 'sign up: ' + $('h2', emailFormHtml.parent().parent()).html();
                SIO.accountSendEmail(
                    $('input', emailFormHtml).val(),
                    subject,
                    subject,
                    function () {
                        emailFormHtml.html('<div class="alert alert-success fade out in" style="text-align: left;"><b>Signed Up!</b><div>You will get a confirmation email when account been created!</div></div>');
                    },
                    function () {
                        emailFormHtml.html('<div class="alert alert-danger fade out in" style="text-align: left;"><b>We are sorry!</b><div>There is a problem during sign up process. Please contact us by email: <a href="mailto:team@statico.io" class="alert-link">team@statico.io</a></div></div>');
                    }
                );
            }
        }).focus();
    }).parent().parent().mouseleave(function(){
        $('.signUp',this).show();
        $('.signUpForm',this).html('');
    });

    SIO.accountDo=function(action){
        var getCookie=function (cname)
        {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++)
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return null;
        }
        if(getCookie('aid')){
            action()
        }else{
            $.ajax({
                type: "POST",
                url: "/web/accounts/aid",
                data: { subject: 'create aid' },
                success: function (jsonResult) {
                    action(jsonResult);
                },
                error: function (jqXHR, textStatus) {
                    action(jqXHR, textStatus);
                }
            });
        }
    }
//    $('.signUp').css('background-image','url(https://lh4.googleusercontent.com/-EJHYufLrXI8/AAAAAAAAAAI/AAAAAAAAAAA/3eCwfyO2SeI/s64-c/photo.jpg)')
});