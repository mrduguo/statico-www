$(function () {
    $('.contact-form .contact').click(function(){
        var $contactForm=$(this).closest('.contact-form');
        var $msg=$('.msg',$contactForm)
        if(!$msg.val()){
            $msg.attr('placeholder','Please say something here first ...').focus();
            return;
        }
        var $from=$('.from',$contactForm)
        if(!$from.val()){
            $from.attr('placeholder','Please leave a contact to keep in touch ...').focus();
            return;
        }

        SIO.accountSendEmail(
            $from.val(),
            'questions',
            $msg.val(),
            function () {
                $msg.val('');
                $from.val('');
                $msg.attr('placeholder','Got it and will keep in touch with you shortly & Thanks');
            },
            function () {
                $from.val('');
                $from.attr('placeholder','Send failed! Please email team@statico.io directly.');
            }
        );
    });
});
