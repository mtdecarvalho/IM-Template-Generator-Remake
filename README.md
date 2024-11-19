﻿# IM Template Generator Remake

### Ferramenta desenvolvida para geração de templates de tickets e emails, para uso interno no time de Incident Management na Orange Business.

Em nosso time, precisamos preencher inúmeros templates durante todo o nosso turno.

Antes, nós já utilizávamos uma aplicação que gerava templates, porém eu sempre achei que a mesma poderia ser desenvolvida de uma forma melhor, então tomei a iniciativa e reescrevi todo o código do zero.

Seguem algumas mudanças que implementei:
- Todo o código foi refatorado, buscando máxima eficiência e zero repetição de código;
- Usei a funcionalidade do mailto para abrir uma nova janela para envio de email com o Subject e Body do mesmo já preenchidos com o template gerado;
- Implementei um botão para realizar a cópia automática do conteúdo das textboxes para a área de transferência;
- Implementei uma segunda aba que gera templates específicos para a ativação da Orange Spain, que é um outro time da Orange na Espanha com o qual trabalhamos diariamente;
- Desenvolvi uma estilização básica com inspiração nas cores usadas pela Orange Business;
