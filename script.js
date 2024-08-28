/*
Essa função recebe uma string que corresponde ao ID do card que é pra ser mostrado na página.
A função então seleciona todas as divs com a classe card, e esconde uma por uma.
Depois, a função seleciona a div cujo ID corresponde ao ID passado
e altera sua visibilidade para que ela seja mostrada na tela.
*/
function switchCard (cardID) {
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none'
    }
    if (cardID === 'osp-card') {
        document.querySelector('#osp-cctid').value = document.querySelector('#input-cctid').value
        document.querySelector('#osp-status').value = document.querySelector('#input-status').value
        document.querySelector('#osp-address').value = document.querySelector('#input-address').value
        document.querySelector('#osp-customer').value = document.querySelector('#input-customer').value
        document.querySelector('#osp-orangetkt').value = document.querySelector('#input-orangetkt').value
    }
    /*
    cctid
    status
    address
    customer
    obs ticket
    */
    document.querySelector(`#${cardID.toString()}`).style.display = 'block'
}

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

    if (status.toLowerCase() === 'down' || status.toLowerCase() === 'flap'|| status.toLowerCase() === 'packet loss') {
        hour = hour + 1 >= 24 ? (hour + 1) - 24 : hour + 1
    } else if (status.toLowerCase() === 'rfo') {
        hour = hour + 3 >= 24 ? (hour + 3) - 24 : hour + 3
    } else {
        hour = hour + 2 >= 24 ? (hour + 2) - 24 : hour + 2
    }

    return `${addLeadingZero(hour)}:${addLeadingZero(minute)}z`
}

/*
Todas as funções abaixo servem para retornar os templates.
*/

function generateTicketDescription(status, router, carrier) {
    return `${generateDate()} | ${generateTime(status)} | ${router} | ${status.toString().toUpperCase()} | ${carrier}`
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
    return `Orange Case: ${orangeTkt} | Router: ${router} | Status: ${status.toString().toUpperCase()} | Location: ${location} | Carrier: ${carrier} | Carrier Ticket: ${carrierTkt} | Circuit ID: ${cctid} | Customer: ${customer}`
}

/*
As funções abaixo são usadas para identificar qual a falha e fazer a adaptação necessário no template de email.
Por ex, se o campo de status estiver como "down", a função anônima vai retornar a string "se encontra caído", que será colocada no email.
Se o status não for down, flap ou packet loss, vai retornar "foi afetado", já que na maioria dos casos vai ser um RFO.
*/

function generateEmailStatusPtbr(status) {
    if (status.toLowerCase() == 'down')             return 'se encontra caído'
    else if (status.toLowerCase() == 'flap')        return 'se encontra intermitente'
    else if (status.toLowerCase() == 'packet loss') return 'está apresentando perda de pacotes'
    else                                            return 'foi afetado'
}

function generateEmailStatusEng(status) {
    if (status.toLowerCase() == 'down')             return 'is currently down'
    else if (status.toLowerCase() == 'flap')        return 'is currently intermittent'
    else if (status.toLowerCase() == 'packet loss') return 'is currently presenting packet loss'
    else                                            return 'was affected'
}

function generateEmailStatusEsp(status) {
    if (status.toLowerCase() == 'down')             return 'se encuentra caído'
    else if (status.toLowerCase() == 'flap')        return 'se encuentra intermitente'
    else if (status.toLowerCase() == 'packet loss') return 'está sufriendo pérdida de paquetes'
    else                                            return 'fue afectado'
}

function translateStatusPtbr(status) {
    if (status.toLowerCase() === 'down')                return 'Caído'
    else if (status.toLowerCase() === 'flap')           return 'Intermitência'
    else if (status.toLowerCase() === 'packet loss')    return 'Perda de pacotes'
    else if (status.toLowerCase() === 'rfo')            return 'Razão da falha (RFO)'
    else                                                return status
}

function translateStatusEng(status) {
    if (status.toLowerCase() === 'down')                return 'Down'
    else if (status.toLowerCase() === 'flap')           return 'Intermittency'
    else if (status.toLowerCase() === 'packet loss')    return 'Packet loss'
    else if (status.toLowerCase() === 'rfo')            return 'Reason for Outage (RFO)'
    else                                                return status
}

function translateStatusEsp(status) {
    if (status.toLowerCase() === 'down')                return 'Caído'
    else if (status.toLowerCase() === 'flap')           return 'Intermitencia'
    else if (status.toLowerCase() === 'packet loss')    return 'Pérdida de paquetes'
    else if (status.toLowerCase() === 'rfo')            return 'Razón de la falla (RFO)'
    else                                                return status
}

function addRFODowntimeUptime(status, lang) {
    if (lang === 'ptbr')        return status.toLowerCase() === 'rfo' ? 'Horário de queda: \nHorário de normalização: \n\n' : '\n'
    else if (lang === 'esp')    return status.toLowerCase() === 'rfo' ? 'Horario de caída: \nHorario de normalización: \n\n' : '\n'
    else                        return status.toLowerCase() === 'rfo' ? 'Downtime: \nUptime: \n\n' : '\n'
}

/*
As funções abaixo são usadas para gerar o body dos emails em todas as línguas.
As variáveis possuem o mesmo nome das variáveis localizadas na função generateTemplates(), que age como a principal função desse script.
*/

function generateEmailBodyPtbr(cctid, address, customer, status, orangeTkt) {
    return  `Olá equipe,\n\n` +
            `Necessito gerar um ticket para um circuito que ${generateEmailStatusPtbr(status)}. Confiram abaixo os detalhes do circuito:\n\n` +
            `CCTID: ${cctid}\n` +
            `Endereço: ${address}\n` +
            `Cliente: ${customer}\n` +
            `Descrição da falha: ${translateStatusPtbr(status)}\n` +
            `Ticket Orange: ${orangeTkt}\n` +
            addRFODowntimeUptime(status, 'ptbr') +
            `Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n` +

            `Agradeço desde já.\n`
}

function generateEmailBodyEng(cctid, address, customer, status, orangeTkt) {
    return  `Hello team,\n\n` +
            `I need to generate a ticket for a circuit that ${generateEmailStatusEng(status)}. Please check below the details of the circuit:\n\n` +
            `CCTID: ${cctid}\n` +
            `Address: ${address}\n` +
            `Customer: ${customer}\n` +
            `Failure description: ${translateStatusEng(status)}\n` +
            `Orange Ticket: ${orangeTkt}\n` + 
            addRFODowntimeUptime(status, 'eng') +
            `As soon as you have any news on this case, please let us know.\n\n` +
            `Thanks in advance.\n`
}

function generateEmailBodyEsp(cctid, address, customer, status, orangeTkt) {
    return  `Hola estimados,\n\n` +
            `Necesitamos generar un ticket para un circuito que ${generateEmailStatusEsp(status)}. Sigue abajo los detalles del circuito:\n\n` +
            `CCTID: ${cctid}\n` +
            `Dirección: ${address}\n` +
            `Cliente: ${customer}\n` +
            `Descripción de la falla: ${translateStatusEsp(status)}\n` +
            `Orange Ticket: ${orangeTkt}\n` + 
            addRFODowntimeUptime(status, 'esp') +
            `Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n` +
            `Gracias de antemano.\n`
}

/*
Essa é a função principal do caso, pois é ela que começa toda a geração de templates.
*/

function generateTemplates() {
    // Começo a função populando todas as variáveis com os valores dos campos de input.
    let router = document.querySelector('#input-router').value.toString();
    let carrier = document.querySelector('#input-carrier').value.toString();
    let cctid = document.querySelector('#input-cctid').value.toString();
    let carrierTkt = document.querySelector('#input-carriertkt').value.toString();
    let contactName = document.querySelector('#input-contactname').value.toString();
    let contactNumber = document.querySelector('#input-contactnumber').value.toString();
    let orangeTkt = document.querySelector('#input-orangetkt').value.toString();
    let status = document.querySelector('#input-status').value.toString();
    let location = document.querySelector('#input-location').value.toString();
    let customer = document.querySelector('#input-customer').value.toString();
    let address = document.querySelector('#input-address').value.toString();

    let ticketDescription = generateTicketDescription(status, router, carrier)
    let firstTelco = generateFirstTelco(carrier, contactName, contactNumber, router, cctid, carrierTkt)
    let telcoStatus = generateTelcoStatus(carrier, contactName, contactNumber, router, cctid, carrierTkt)
    let emailSubject = generateEmailSubject(orangeTkt, router, status, location, carrier, carrierTkt, cctid, customer)
    let brEmail = generateEmailBodyPtbr(cctid, address, customer, status, orangeTkt)
    let espEmail = generateEmailBodyEsp(cctid, address, customer, status, orangeTkt)
    let engEmail = generateEmailBodyEng(cctid, address, customer, status, orangeTkt)

    document.querySelector('#ticket-description-text').value = ticketDescription
    document.querySelector('#first-telco-text').value = firstTelco
    document.querySelector('#telco-status-text').value = telcoStatus
    document.querySelector('#email-subject-text').value = emailSubject
    document.querySelector('#ptbr-email-text').value = brEmail
    document.querySelector('#esp-email-text').value = espEmail
    document.querySelector('#eng-email-text').value = engEmail
}

/*
Essa é a função responsável por gerar os templates OSP e é chamada ao apertar no botão correspondente.
*/

function generateOSPTemplate() {
    let serviceType = document.querySelector('#osp-service-type').value
    let cctid = document.querySelector('#osp-cctid').value
    let obsPE = document.querySelector('#osp-obs-pe').value 
    let nvlan = document.querySelector('#osp-nvlan').value
    let cctSpeed = document.querySelector('#osp-circuit-speed').value
    let failureTime = document.querySelector('#osp-failure-time').value
    let status = document.querySelector('#osp-status').value
    let address = document.querySelector('#osp-address').value
    let customer = document.querySelector('#osp-customer').value
    let lcon = document.querySelector('#osp-lcon').value
    let obsTicket = document.querySelector('#osp-orangetkt').value

    document.querySelector('#osp-template-text').value = `Tipo de servicio: ${serviceType}\n` +
    `Número de circuito: ${cctid}\n` +
    `OBS PE: ${obsPE}\n` +
    `NVLAN: ${nvlan}\n` +
    `Velocidad del circuito: ${cctSpeed}\n` +
    `Fecha/hora del problema: ${failureTime}\n` +
    `Status del Servicio: ${status}\n` +
    `Dirección lado remoto (cliente): ${address}\n` +
    `Cliente: ${customer}\n` +
    `Contacto: ${lcon}\n` +
    `OBS ticket: ${obsTicket}\n`
}

/*
Essa função pega os emails de destino, o email subject, e o body que corresponde à linguagem informada como parametro.
Depois, analisa se todos os valores existem (retorna true), e caso sim, gera um mailto: com os parametros informados.
A função também gera um elemento 'a' que é criado dinamicamente e serve apenas para chamar a função de click e abrir o mailto no cliente de email.
*/

function sendEmail(lang) {
    let destEmail = document.querySelector('#input-destemails').value
    let subject = document.querySelector('#email-subject-text').value
    let body = document.querySelector(`#${lang}-email-text`).value
    let email = document.createElement('a')
    if (destEmail && subject && body) {
        email.href = `mailto:${encodeURIComponent(destEmail)}?subject=${encodeURIComponent(subject)}&cc=rio.im@orange.com&body=${encodeURIComponent(body)}`
        email.click()
    } else {
        alert('Please generate the templates AND add a destination email address.')
    }
}

/*
Essa aplicação pega o HTMLCollection do parametro informado, passa por cada um, e limpa o conteúdo de todos.
*/

function cleanTemplates(textBoxClass) {
    let results = document.querySelectorAll(`.${textBoxClass.toString()}`)
    for (let e = 0; e < results.length ; e ++) {
        results[e].value = ''
    }
}

/*
Essa função recebe uma string de texto que corresponde a textarea que é pra ser copiada
envia essa string como parametro pra localizar a textarea pelo getElementById, seleciona-o e copia ele pra clipboard.
*/

function copyToClipboard(text) {
    document.querySelector(`#${text}`).select()
    document.execCommand('copy')
    document.getSelection().removeAllRanges()
}