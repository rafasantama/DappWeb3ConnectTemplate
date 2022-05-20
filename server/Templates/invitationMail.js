module.exports = (function () {
    
    var invitation = '<b>Código invitacion</b>: {code}';

    var generic = `
        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="utf-8">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
            <!--[if mso]>
            <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
            <style>
            td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
            </style>
            <![endif]-->
            <title></title>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
            <style>
            .hover-underline:hover {
                text-decoration: underline !important;
            }

            @keyframes spin {
                to {
                transform: rotate(360deg);
                }
            }

            @keyframes ping {

                75%,
                100% {
                transform: scale(2);
                opacity: 0;
                }
            }

            @keyframes pulse {
                50% {
                opacity: .5;
                }
            }

            @keyframes bounce {

                0%,
                100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                }

                50% {
                transform: none;
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                }
            }

            @media (max-width: 600px) {
                .sm-leading-32 {
                line-height: 32px !important;
                }

                .sm-px-24 {
                padding-left: 24px !important;
                padding-right: 24px !important;
                }

                .sm-py-32 {
                padding-top: 32px !important;
                padding-bottom: 32px !important;
                }

                .sm-w-full {
                width: 100% !important;
                }
            }
            </style>
        </head>

        <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity));">
            
            <div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en">
            <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                        <a href="https://donrifa.com">
                            <img src="https://donrifa.com/images/logo.png" width="155" alt="Equitti" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle;">
                        </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                        <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                            <td class="sm-px-24" style="--bg-opacity: 1; background-color: #1a9395; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">

                                <h2 style="color:#9cc725">{tittle}</h2>
                                <br/>
                                <h3 style="color:#000000">
                                    {htmlText}
                                </h3>
                                <br/>
                                <p style="display:{displayAccessButton}">
                                    <a href="https://donrifa.com" target="_target" class="btn" style="display:{displayAccessButton};padding: 10px 15px; display: inline-block; border-radius: 5px; background: #9ec437; color: black;">{buttonText}</a></p> 
                                </p>

                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                    <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;">&zwnj;</div>
                                    </td>
                                </tr>
                                </table>
                                <p style="margin: 0 0 16px;">Gracias por su atencion, <br>Equitti Team</p>
                            </td>
                            </tr>
                            <tr>
                            <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                            </tr>
                            <tr>
                                <td style='text-align:center'>
                                    <h2 style="color:#9cc725">Siguenos en</h2>
                                </td>
                            </tr>
                            <tr>
                            <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1; color: rgba(236, 239, 241, var(--text-opacity));">
                                <p align="center" style="cursor: default; margin-bottom: 16px;">
                                <a href="https://www.facebook.com/" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;">Facebook</a>
                                &bull;
                                <a href="https://twitter.com/" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;">Twiter</a>
                                &bull;
                                <a href="https://www.instagram.com/" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;">Instagram</a>
                                </p>
                                <p style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                                Usar nuestro servicio y sitio web esta sujeto a nuestros 
                                <a href="#" class="hover-underline" style="--text-opacity: 1; color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">Terminos de uso</a> y
                                <a href="#" class="hover-underline" style="--text-opacity: 1; color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">Politicas de privacidad</a>.
                                </p>
                            </td>
                            </tr>
                            <tr>
                            <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </div>
        </body>
        </html>`
    return {
        invitation: invitation,
        generic:  generic
    }
})();