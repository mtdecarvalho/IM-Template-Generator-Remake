function generate() {
    var carrier = document.getElementById("input-carrier").value;
    var cctid = document.getElementById("input-cctid").value;
    var carriertkt = document.getElementById("input-carrier-ticket").value;
    var orangetkt = document.getElementById("input-orange-case").value;
    var status = document.getElementById("input-status").value;
    var location = document.getElementById("input-location").value;
    var customer = document.getElementById("input-customer").value;
    var address = document.getElementById("input-address").value;
    var router = document.getElementById("input-router").value;
    var contactName = document.getElementById("input-contact-name").value;
    var contactNumber = document.getElementById("input-contact-number").value;


    var open =
        "OPEN\n\n" +
        "First Telco Referral\n" +
        "**********************\n" +
        "Carrier's Name: " + carrier + "\n" +
        "Carrier's Contact Name: " + contactName +"\n" +
        "Carrier's Contact Number: " + contactNumber + "\n" +
        "Router: " + router + "\n" +
        "CCTID: " + cctid + "\n" +
        "Carrier's Ticket: " + carriertkt + "\n" +
        "Comments: Referred to carrier \n\n" +
        "===================Troubleshoot===================\n\n" +
        "==================================================\n\n" +
        "Thanks & Best Regards,\n" +
        "Matheus de Carvalho\n" +
        "Incident Management Agent\n\n" +
        "---------------------------------------------------";

    var telcoStatus =
        "TELCO STATUS\n\n" +
        "Telco Status\n" +
        "***************\n" +
        "Carrier's Name: " + carrier + "\n" +
        "Carrier's Contact Name: " + contactName +"\n" +
        "Carrier's Contact Number: " + contactNumber + "\n" +
        "Router: " + router + "\n" +
        "CCTID: " + cctid + "\n" +
        "Carrier's Ticket: " + carriertkt + "\n" +
        "Comments: Hello team, \n\n" +
        "===================Troubleshoot===================\n\n" +
        "==================================================\n\n" +
        "Thanks & Best Regards,\n" +
        "Matheus de Carvalho\n" +
        "Incident Management Agent\n\n" +
        "---------------------------------------------------";

    var osp =
        "OSP ACTIVATION TEMPLATE\n\n" +
        "Tipo de servicio: \n" +
        "Número de circuito: " + cctid + "\n" +
        "Fecha/hora del problema: \n" +
        "Status del Servicio: " + status + "\n" +
        "Dirección lado remoto (cliente): " + address + " " + location + "\n" +
        "Cliente: " + customer + "\n" +
        "Contacto: \n\n" +
        "---------------------------------------------------";

    var email =
        "EMAIL\n\n" +
        "Orange Case: " + orangetkt + " | Router: " + router + " | Status: " + status + " | Location: " + location + " | Carrier: " + carrier + " | Carrier Ticket: " + carriertkt + " | Circuit ID: " + cctid + " | Customer: " + customer + "\n\n" +
        "---------------------------------------------------";

    var data = new Date();
    var dia = data.getDate();
    if(dia < 10){
        dia = "0" + dia;
    }
    var mes = data.getMonth() + 1;
    if(mes < 10){
        mes = "0" + mes;
    }
    var hora = data.getHours() + 1;
    if(hora < 10){
        hora = "0" + hora;
    }
    var minutes = data.getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes;
    }

  
    var bropen = "";
    var espopen = "";
    var enopen = "";

    if (status === "Down") {
        bropen =
            "BR EMAIL\n\n" +
            "Olá equipe, \n\n" +
            "Necessitamos gerar um ticket para um circuito que foi afetado. Confiram abaixo os detalhes do circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Endereço: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descrição da falha: Caído " + "\n" +
            "Ticket Orange: " + orangetkt + "\n\n" +
            "Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n" +
            "Agradeço desde já.\n\n" +
            "---------------------------------------------------";
        espopen =
            "ES EMAIL\n\n" +
            "Hola estimados, \n\n" +
            "Necesitamos generar un ticket para un circuito que se encuentra afectado. Sigue abajo los detalles del circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Dirección: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descripción de la falla: Caído " + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n" +
            "Gracias de antemano. \n\n" +
            "---------------------------------------------------";

        enopen =
            "EN EMAIL\n\n" +
            "Hello team,\n\n" +
            "We need to generate a ticket for a circuit that was affected. Please check below the details of the circuit:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Address: " + address + "\n" +
            "Customer: " + customer + "\n" +
            "Failure description: Down " + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "As soon as you have any news on this case, please let us know.\n\n" +
            "Thanks in advance.\n\n" +
            "---------------------------------------------------";

    } else if (status === "Packet loss") {
        bropen =
            "BR EMAIL\n\n" +
            "Olá equipe, \n\n" +
            "Necessitamos gerar um ticket para um circuito que foi afetado. Confiram abaixo os detalhes do circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Endereço: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descrição da falha: Perda de pacote " + "\n" +
            "Ticket Orange: " + orangetkt + "\n\n" +
            "Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n" +
            "Agradeço desde já.\n\n" +
            "---------------------------------------------------";
        espopen =
            "ES EMAIL\n\n" +
            "Hola estimados,\n\n" +
            "Necesitamos generar un ticket para un circuito que se encuentra afectado. Sigue abajo los detalles del circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Dirección: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descripción de la falla: Perdida de paquetes " + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n" +
            "Gracias de antemano.\n\n" +
            "---------------------------------------------------";

        enopen =
            "EN EMAIL\n\n" +
            "Hello team,\n\n" +
            "We need to generate a ticket for a circuit that was affected. Please check below the details of the circuit:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Address: " + address + "\n" +
            "Customer: " + customer + "\n" +
            "Failure description: Packet loss " + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "As soon as you have any news on this case, please let us know.\n\n" +
            "Thanks in advance.\n\n" +
            "---------------------------------------------------";
    } else if (status === "Flap") {
        bropen =
            "BR EMAIL\n\n" +
            "Olá equipe,\n\n" +
            "Necessitamos gerar um ticket para um circuito que foi afetado. Confiram abaixo os detalhes do circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Endereço: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descrição da falha: Intermitência " + "\n" +
            "Ticket Orange: " + orangetkt + "\n\n" +
            "Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n" +
            "Agradeço desde já.\n\n" +
            "---------------------------------------------------";
        espopen =
            "ES EMAIL\n\n" +
            "Hola estimados,\n\n" +
            "Necesitamos generar un ticket para un circuito que se encuentra afectado. Sigue abajo los detalles del circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Dirección: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descripción de la falla: Intermitencia" + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n" +
            "Gracias de antemano.\n\n" +
            "---------------------------------------------------";

        enopen =
            "EN EMAIL\n\n" +
            "Hello team,\n\n" +
            "We need to generate a ticket for a circuit that was affected. Please check below the details of the circuit:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Address: " + address + "\n" +
            "Customer: " + customer + "\n" +
            "Failure description: Intermittency" + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "As soon as you have any news on this case, please let us know.\n\n" +
            "Thanks in advance.\n\n" +
            "---------------------------------------------------";

    } else if(status === 'RFO') {
        hora = data.getHours() + 3;
        if(hora < 10){
            hora = "0" + hora;
        }
        bropen =
            "BR EMAIL\n\n" +
            "Olá equipe,\n\n" +
            "Necessitamos gerar um ticket para um circuito que estava afetado, e agora necesitamos saber a razão da falha e as ações corretivas que foram tomadas.\n\nConfiram abaixo os detalhes do circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Endereço: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descrição da falha: Razão da falha " + "\n" +
            "Ticket Orange: " + orangetkt + "\n\n" +
            "Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n" +
            "Agradeço desde já.\n\n" +
            "---------------------------------------------------";
            espopen =
            "ES EMAIL\n\n" +
            "Hola estimados,\n\n" +
            "Necesitamos generar un ticket para un circuito que tuve una afectación, ahora necesitamos saber la razón de la falla y las acciones correctivas que se han tomado.\n\nSigue abajo los detalles del circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Dirección: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descripción de la falla: Razón de la Falla \n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n" +
            "Gracias de antemano.\n\n" +
            "---------------------------------------------------";

        enopen =
            "EN EMAIL\n\n" +
            "Hello team,\n\n" +
            "We need to generate a ticket for a circuit that was being affected, now we need to know the reason for the outage and the corrective actions taken.\n\nPlease check below the details of the circuit:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Address: " + address + "\n" +
            "Customer: " + customer + "\n" +
            "Failure description: Reason for Outage\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "As soon as you have any news on this case, please let us know.\n\n" +
            "Thanks in advance.\n\n" +
            "---------------------------------------------------";
    } else {
        bropen =
            "BR EMAIL\n\n" +
            "Olá equipe,\n\n" +
            "Necessito gerar um ticket para um circuito que foi afetado. Confiram abaixo os detalhes do circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Endereço: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descrição da falha: " + status + "\n" +
            "Ticket Orange: " + orangetkt + "\n\n" +
            "Assim que possuirem alguma atualização sobre este caso, por favor nos informem.\n\n" +
            "Agradeço desde já.\n\n" +
            "---------------------------------------------------";
            espopen =
            "ES EMAIL\n\n" +
            "Hola estimados,\n\n" +
            "Necesitamos generar un ticket para un circuito que se encuentra afectado. Sigue abajo los detalles del circuito:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Dirección: " + address + "\n" +
            "Cliente: " + customer + "\n" +
            "Descripción de la falla: "  + status + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "Una vez que tengan alguna actualización para este tema, por favor, háganos saber.\n\n" +
            "Gracias de antemano.\n\n" +
            "---------------------------------------------------";

        enopen =
            "EN EMAIL\n\n" +
            "Hello team,\n\n" +
            "I need to generate a ticket for a circuit that was affected. Please check below the details of the circuit:\n\n" +
            "CCTID: " + cctid + "\n" +
            "Address: " + address + "\n" +
            "Customer: " + customer + "\n" +
            "Failure description: " + status + "\n" +
            "Orange Ticket: " + orangetkt + "\n\n" +
            "As soon as you have any news on this case, please let us know.\n\n" +
            "Thanks in advance.\n\n" +
            "---------------------------------------------------";
    }


    var title = 
    "TITLE\n\n" +
    dia + "/" + mes + " | " + hora + ":" + minutes + "z | " + router + " | " + status.toUpperCase() + " | " + carrier + "\n\n" +
    "---------------------------------------------------";

    document.getElementById("text-results").value = title + "\n" + open + "\n" + telcoStatus + "\n" + osp + "\n" + email + "\n" + bropen + "\n" + espopen + "\n" + enopen;
}

function clean(){
    document.getElementById("input-carrier").value = "";
    document.getElementById("input-cctid").value = "";
    document.getElementById("input-carrier-ticket").value = "";
    document.getElementById("input-orange-case").value = "";
    document.getElementById("input-status").value = "";
    document.getElementById("input-location").value = "";
    document.getElementById("input-customer").value = "";
    document.getElementById("input-address").value = "";
    document.getElementById("input-router").value = "";
    document.getElementById("input-contact-name").value = "";
    document.getElementById("input-contact-number").value = "";
    document.getElementById("text-results").value = "";
}