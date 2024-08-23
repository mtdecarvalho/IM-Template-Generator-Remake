/*
Essa função recebe um numero, em formato de string, detecta se o seu tamanho é igual a 1.
Se for igual a 1, retorna a função com um zero a esquerda.
*/
function addLeadingZero(number) {
    return number.toString().length == 1 ? `0${number.toString()}` : number.toString()
}

/*
Essa função é responsável por gerar a data que fica no ticket description
A função pega a data atual, roda a função acima pra colocar um zero a esquerda, e retorna a data completa.
*/
function generateDate() {
    let currentDate = new Date()
    return `${addLeadingZero(currentDate.getUTCDate())}/${addLeadingZero(currentDate.getUTCMonth() + 1)}`
}

/*
Essa função gera a hora do ticket description.
Também pega a data atual, analisa o status passado como parametro, e caso detecte que é uma ação adiciona +1 pra hora.
Se for RFO, adiciona +3 pra hora
Se não for nenhum dos dois, retorna +2
E por fim retorna a funçao formatada como HH:MMz
*/
function generateTime(status) {
    let currentDate = new Date()
    let hour = currentDate.getUTCHours()
    let minute = currentDate.getUTCMinutes()

    if (status.toLowerCase() === 'down' || status.toLowerCase() === 'flap' || status.toLowerCase() === 'packet loss') {
        hour += 1
    } else if (status.toLowerCase() === 'rfo') {
        hour += 3
    } else {
        hour += 2
    }

    return `${hour}:${minute}z`
}

function generateTicketDescription(status, router, carrier) {
    return `${generateDate()} | ${generateTime(status)} | ${router} | ${status} | ${carrier}`
}

function generateFirstTelco(carrier, contactName, contactNumber, router, cctid, carrierTkt) {
    return `First Telco Referral\n` +
            `********************\n` +
            `Carrier's Name: ${carrier}\n` +
            `Carrier's Contact Name: ${contactName}\n` +
            `Carrier's Contact Number: ${contactNumber}\n` +
            `Router: ${router}\n` +
            `CCTID: ${cctid}\n` +
            `Carrier's Ticket: ${carrierTkt}\n` +
            `Comments: Referred to carrier`
}

function generateTelcoStatus(carrier, contactName, contactNumber, router, cctid, carrierTkt) {
    return `Telco Status\n` + 
            `************\n` +
            `Carrier's Name: ${carrier}\n` +
            `Carrier's Contact Name: ${contactName}\n` +
            `Carrier's Contact Number: ${contactNumber}\n` +
            `Router: ${router}\n` +
            `CCTID: ${cctid}\n` +
            `Carrier's Ticket: ${carrierTkt}\n` +
            `Comments: Referred to carrier\n`
}

function generateEmailSubject(orangeTkt, router, status, location, carrier, carrierTkt, cctid, customer) {
    return `Orange Case: ${orangeTkt} | Router: ${router} | Status: ${status} | Location: ${location} | Carrier: ${carrier} | Carrier Ticket: ${carrierTkt} | Circuit ID: ${cctid} | Customer: ${customer}`
}

/*
As funções abaixo são usadas para identificar qual a falha e fazer a adaptação necessário no template de email.
Por ex, se o campo de status estiver como "down", a função anônima vai retornar a string "se encontra caído", que será colocada no email.
Se o status não for down, flap ou packet loss, vai retornar "foi afetado", já que na maioria dos casos vai ser um RFO.
*/

function generateEmailStatusPtbr(status) {
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

function generateEmailStatusEng(status) {
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

function generateEmailStatusEsp(status) {
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

/*
As funções abaixo são usadas para gerar o body dos emails em todas as línguas.
As variáveis possuem o mesmo nome das variáveis localizadas na função generateTemplates(), que age como a principal função desse script.
*/

function generateEmailBodyPtbr(cctid, address, customer, status, orangeTkt) {
    return `Olá equipe,\n\n` +
            `Necessito gerar um ticket para um circuito que ${generateEmailStatusPtbr(status)}. Confiram abaixo os detalhes do circuito:\n\n` +
            `CCTID: ${cctid}\n` +
            `Endereço: ${address}\n` +
            `Cliente: ${customer}\n` +
            `Descrição da falha: ${status}\n` +
            `Ticket Orange: ${orangeTkt}\n\n` +
            `Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n` +

            `Agradeço desde já.\n`
}

function generateEmailBodyEng(cctid, address, customer, status, orangeTkt) {
    return `Hola estimados,\n\n` +
            `Necesitamos generar un ticket para un circuito que ${generateEmailStatusEng(status)}. Sigue abajo los detalles del circuito:\n\n` +
            `CCTID: ${cctid}\n` +
            `Dirección: ${address}\n` +
            `Cliente: ${customer}\n` +
            `Descripción de la falla: ${status}\n` +
            `Orange Ticket: ${orangeTkt}\n\n` +
            `Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n` +
            `Gracias de antemano.\n`
}

function generateEmailBodyEsp(cctid, address, customer, status, orangeTkt) {
    return `Hola estimados,\n\n` +
            `Necesitamos generar un ticket para un circuito que ${generateEmailStatusEsp(status)}. Sigue abajo los detalles del circuito:\n\n` +
            `CCTID: ${cctid}\n` +
            `Dirección: ${address}\n` +
            `Cliente: ${customer}\n` +
            `Descripción de la falla: ${status}\n` +
            `Orange Ticket: ${orangeTkt}\n\n` +
            `Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n` +
            `Gracias de antemano.\n`
}

/*
Essa é a função principal do caso, pois é ela que começa toda a geração de templates.
*/

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

    let ticketDescription = generateTicketDescription(status, router, carrier)
    let firstTelco = generateFirstTelco(carrier, contactName, contactNumber, router, cctid, carrierTkt)
    let telcoStatus = generateTelcoStatus(carrier, contactName, contactNumber, router, cctid, carrierTkt)
    let emailSubject = generateEmailSubject(orangeTkt, router, status, location, carrier, carrierTkt, cctid, customer)
    let brEmail = generateEmailBodyPtbr(cctid, address, customer, status, orangeTkt)
    let espEmail = generateEmailBodyEsp(cctid, address, customer, status, orangeTkt)
    let engEmail = generateEmailBodyEng(cctid, address, customer, status, orangeTkt)

    document.getElementById('ticket-description-text').value = ticketDescription
    document.getElementById('first-telco-text').value = firstTelco
    document.getElementById('telco-status-text').value = telcoStatus
    document.getElementById('email-subject-text').value = emailSubject
    document.getElementById('ptbr-email-text').value = brEmail
    document.getElementById('esp-email-text').value = espEmail
    document.getElementById('eng-email-text').value = engEmail
}

function sendEmail(lang) {
    let destEmail = document.getElementById('input-destemails').value
    let subject = document.getElementById('email-subject-text').value
    let body = document.getElementById(`${lang}-email-text`).value
    // () => {
    //     if (lang === 'ptbr') {
    //         return document.getElementById('ptbr-email-text').value
    //     } else if (lang === 'esp') {
    //         return document.getElementById('esp-email-text').value
    //     } else return document.getElementById('eng-email-text').value
    // }

    let email = document.createElement('a')
    email.href = `mailto:${encodeURIComponent(destEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    email.click()
    // Essa função vai abrir uma nova janela com o template de email e email de destino informados já preenchido no outlook.
}

function cleanTemplates() {
    // Essa aplicação pega o HTMLCollection, passa por cada um, e limpa o conteúdo de todos.
    let results = document.getElementsByClassName('text-box')
    for (let e = 0; e < results.length ; e ++) {
        results[e].value = ''
    }
}

function copyToClipboard(text) {
    // Essa função recebe uma string de texto que corresponde a textarea que é pra ser copiada
    // envia essa string como parametro pra localizar a textarea pelo getElementById, seleciona-o e copia ele pra clipboard.
    document.getElementById(text).select();
    document.execCommand('copy');
}