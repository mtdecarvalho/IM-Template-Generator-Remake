function generateTemplates() {
    // Começo a função populando todas as variáveis com os valores dos campos de input.
    let router = document.getElementById('input-router').value.toString();
    let carrier = document.getElementById('input-carrier').value.toString();
    let cctid = document.getElementById('input-cctid').value.toString();
    let carrierTkt = document.getElementById('input-carriertkt').value.toString();
    let contactName = document.getElementById('input-contactname').value.toString();
    let contactNumber = document.getElementById('input-contactnumber').value.toString();
    let orangeTkt = document.getElementById('input-orangetkt').value.toString();
    let status = document.getElementById('input-status').value.toString();
    let location = document.getElementById('input-location').value.toString();
    let customer = document.getElementById('input-customer').value.toString();
    let address = document.getElementById('input-address').value.toString();
    let destEmails = document.getElementById('input-destemails').value.toString();
    
    // Define o template do first telco referral com as variáveis acima.
    let firstTelco =    `First Telco Referral\n` +
                        `********************\n` +
                        `Carrier's Name: ${carrier}\n` +
                        `Carrier's Contact Name: ${contactName}\n` +
                        `Carrier's Contact Number: ${contactNumber}\n` +
                        `Router: ${router}\n` +
                        `CCTID: ${cctid}\n` +
                        `Carrier's Ticket: ${carrierTkt}\n` +
                        `Comments: Referred to carrier`

    // Define o telco status com as variáveis acima.
    let telcoStatus =   `Telco Status\n` + 
                        `************\n` +
                        `Carrier's Name: ${carrier}\n` +
                        `Carrier's Contact Name: ${contactName}\n` +
                        `Carrier's Contact Number: ${contactNumber}\n` +
                        `Router: ${router}\n` +
                        `CCTID: ${cctid}\n` +
                        `Carrier's Ticket: ${carrierTkt}\n` +
                        `Comments: Referred to carrier\n`

    // Define o assunto de email com as variáveis acima.
    let emailSubject = `Orange Case: ${orangeTkt} | Router: ${router} | Status: ${status} | Location: ${location} | Carrier: ${carrier} | Carrier Ticket: ${carrierTkt} | Circuit ID: ${cctid} | Customer: ${customer}`

    // As funções abaixo são usadas para identificar qual a falha e fazer a adaptação necessário no template de email.
    // Por ex, se o campo de status estiver como "down", a função anônima vai retornar a string "se encontra caído", que será colocada no email.
    // Se o status não for down, flap ou packet loss, vai retornar "foi afetado", já que na maioria dos casos vai ser um RFO.

    // PTBR
    let brStatus = () => {
        if (status.toLowerCase() == 'down') {
            return 'se encontra caído'
        } else if (status.toLowerCase() == 'flap') {
            return 'se encontra intermitente'
        } else if (status.toLowerCase() == 'packet loss') {
            return 'está apresentando perda de pacotes'
        } else {
            return 'foi afetado'
        }
    }

    // ESPANHOL
    let espStatus = () => {
        if (status.toLowerCase() == 'down') {
            return 'se encuentra caído'
        } else if (status.toLowerCase() == 'flap') {
            return 'se encuentra intermitente.'
        } else if (status.toLowerCase() == 'packet loss') {
            return 'está sufriendo pérdida de paquetes.'
        } else {
            return 'fue afectado'
        }
    }

    // INGLÊS
    let engStatus = () => {
        if (status.toLowerCase() == 'down') {
            return 'is currently down'
        } else if (status.toLowerCase() == 'flap') {
            return 'is currently intermittent'
        } else if (status.toLowerCase() == 'packet loss') {
            return 'is currently presenting packet loss'
        } else {
            return 'was affected'
        }
    }

    let brEmail =   `Olá equipe,\n\n` +
                    `Necessito gerar um ticket para um circuito que ${brStatus()}. Confiram abaixo os detalhes do circuito:\n\n` +
                    `CCTID: ${cctid}\n` +
                    `Endereço: ${address}\n` +
                    `Cliente: ${customer}\n` +
                    `Descrição da falha: ${status}\n` +
                    `Ticket Orange: ${orangeTkt}\n\n` +
                    `Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n` +

                    `Agradeço desde já.\n`

    let espEmail =  `Hola estimados,\n\n` +
                    `Necesitamos generar un ticket para un circuito que ${espStatus()}. Sigue abajo los detalles del circuito:\n\n` +
                    `CCTID: ${cctid}\n` +
                    `Dirección: ${address}\n` +
                    `Cliente: ${customer}\n` +
                    `Descripción de la falla: ${status}\n` +
                    `Orange Ticket: ${orangeTkt}\n\n` +
                    `Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n` +
                    `Gracias de antemano.\n`

    let engEmail =  `Hello team,\n\n` +
                    `I need to generate a ticket for a circuit that ${engStatus()}. Please check below the details of the circuit:\n\n` +
                    `CCTID: ${cctid}\n` +
                    `Address: ${address}\n` +
                    `Customer: ${customer}\n` +
                    `Failure description: ${status}\n` +
                    `Orange Ticket: ${orangeTkt}\n\n` +
                    `As soon as you have any news on this case, please let us know.\n\n` +
                    `Thanks in advance.\n`


    document.getElementById('first-telco-text').value = firstTelco
    document.getElementById('telco-status-text').value = telcoStatus
    document.getElementById('email-subject-text').value = emailSubject
    document.getElementById('ptbr-email-text').value = brEmail
    document.getElementById('esp-email-text').value = espEmail
    document.getElementById('eng-email-text').value = engEmail
    


    // alert(`${router} ${carrier} ${cctid} ${carrierTkt} ${contactName} ${contactNumber} ${orangeTkt} ${status} ${location} ${customer} ${address} ${destEmails}`)
}

function generateEmail() {
    alert('GENERATE EMAIL')

    // Essa função vai abrir uma nova janela com o template de email e email de destino informados já preenchido no outlook.
}

function cleanTemplates() {
    // Essa aplicação pega o HTMLCollection, passa por cada um, e limpa o conteúdo de todos.
    let results = document.getElementsByClassName('results-text')
    for (let e = 0; e < results.length ; e ++) {
        results[e].value = ' '
    }
}

function copyToClipboard(text) {
    // Essa função recebe uma string de texto que corresponde a textarea que é pra ser copiada
    // envia essa string como parametro pra localizar a textarea pelo getElementById, seleciona-o e copia ele pra clipboard.
    document.getElementById(text).select();
    document.execCommand('copy');
}