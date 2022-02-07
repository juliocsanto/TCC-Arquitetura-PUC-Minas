# TCC-Arquitetura-PUC-Minas
Trabalho de Conclusão de Curso da PUC-MG - Arquitetura de Integração da Operadora de Saúde BOA SAÚDE 

Microserviço de Serviços ao Associado. Não foi desenvolvido.
Será adquirida a ferramenta de BPM Alfresco para entregar a necessidade desse módulo, por ser open-source e por possibilitar integração via API REST. Será desenvolvido o microserviço de Serviços ao Cli-ente, responsável por fazer a ponte de comunicação dos outros serviços com o Alfresco, sempre que necessário. Ele será o único que saberá como fazer a comunicação. Terá seu próprio bando de dados Redis, para guardar informações em cache, a fim de obtermos melhor performance na solução.