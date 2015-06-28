$(function () {
    var performPreview = function () {
        var urlToPreview = $('#previewInput').val();
        if (urlToPreview) {
            $('#previewInput').attr('disabled', 'disabled');
            $('.previewResult').remove();
            var spinner = Ladda.create($('#previewButton')[0]);
            spinner.start();
            var msgs=[]
            var isSuccess = false;
            var optimisedUrl = null;
            var showResult = function (text, type) {
                var resultText = '<div class="alert alert-' + type + ' fade out in previewResult"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="content">';
                resultText += text;
                resultText += '</span></div>';
                $('.optimize-result').append(resultText);
            }
            var renderTwoDigital=function(num){
                if(num>9){
                    return num;
                }else{
                    return '0'+num;
                }
            }
            var showMsg = function (msg) {
                var nowDate = new Date()
                var text = renderTwoDigital(nowDate.getHours()) + ':' + renderTwoDigital(nowDate.getMinutes()) + ':' + renderTwoDigital(nowDate.getSeconds()) + ' ' + msg ;
                msgs.push(text)
                text = '<div class="optimise-msg">' + text + '</div>';
                $('#optimiseMsgs').append(text);
            }
            var activeEmailForm = function () {
                var emailFormHtml= $('.feed-back-email-form')
                $('input',emailFormHtml).keypress(function (e) {
                    if (e.which == '13') {
                        SIO.accountSendEmail(
                            $('input', emailFormHtml).val()+' feedback',
                            'feedback success: '+isSuccess,
                            JSON.stringify(msgs),
                            function () {
                                emailFormHtml.html('<div>We got it and will keep in touch with you shortly!</div></div>');
                            },
                            function () {
                                emailFormHtml.html('<div><b>We are sorry!</b><div>There is a problem . Please contact us by email: <a href="mailto:team@statico.io" class="alert-link">team@statico.io</a></div>');
                            }
                        );
                    }
                }).focus();
            }

            SIO.accountDo(function(aid){
                var previewStart=Date.now()
                SIO.tracking.event('Preview Start',null,aid,urlToPreview);
                var ws = new SockJS(SIO.ajaxBaseUrl+'/web/preview');
                ws.onopen = function () {
                    showResult('<span id="optimiseMsgs"></span>', 'info');
                    showMsg('connecting...')
                    ws.send(JSON.stringify({
                        optimizerOptions: {
                            profile: 'relaxed',
                            autoEmbedCss: true,
                            autoDataUrlMaxFileSize: 1024,
                            autoSpriteMinFileSize: 1025,
                            autoSpriteMaxFileSize: 10240
                        },
                        paths: {urlToPreview: urlToPreview,aid:aid}
                    }));

                };
                ws.onmessage = function (event) {
                    try {
                        var msg = JSON.parse(event.data)
                        if (msg.text) {
                            if (msg.code == 'SUCCESS') {
                                isSuccess = true;
                                optimisedUrl = msg.optimisedUrl;
                            }
                            showMsg(msg.text)
                        } else {
                            showMsg('something went wrong: ' + event.data)
                        }
                    } catch (ex) {
                        console.error('failed with data:' + event.data);
                        console.error(ex);
                    }
                };
                ws.onclose = function () {
                    if (isSuccess) {
                        var resultText = '<div class="optimise-msg">This is just a preview! Please <a href="mailto:guo@statico.io">keep touch with us</a> to get your site optimized with best result!</div><div class="optimise-msg">Thanks!</div>';
                        showResult(resultText, 'success');
                        SIO.tracking.event('Preview Success',urlToPreview,aid,Date.now()-previewStart);
                    }else{
                        var resultText = '<div class="optimise-msg">Woops! The toy didn\'t work this time. Please <a href="mailto:guo@statico.io">keep touch with us</a> and will let you known when it\'s been fixed!</div><div class="optimise-msg">Thanks!</div>';
                        showResult(resultText, 'danger');
                        SIO.tracking.event('Preview Failed',urlToPreview,aid,Date.now()-previewStart);
                    }
                    activeEmailForm();
                    $('#previewInput').removeAttr('disabled');
                    spinner.stop();
                    var msgBody=JSON.stringify(msgs);
                    SIO.accountSendEmail(
                        'benchmark_'+(msgBody.indexOf('result-optimized-percent')>0?'success':'failed'),
                            'optimise finish: '+isSuccess,
                        msgBody,
                        function () {
                        },
                        function () {
                        }
                    );
                };
            });
        } else {
            $('#previewInput').attr('placeholder', 'url is required, please type a url to optimise').focus();
        }
    }

    $('#previewInput').mouseover(function () {
        this.focus();
    }).keypress(function (e) {
        if (e.which == '13') {
            performPreview();
        }
    });
    $('#previewButton').click(function () {
        performPreview();
    });
});