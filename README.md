# Agendador de Horários

Sistema completo para agendamento de horários, composto por um backend em Java Spring Boot e um frontend moderno em React com Vite e Tailwind CSS.

---

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Backend](#backend)
  - [Configuração e Execução](#configuração-e-execução)
  - [Endpoints](#endpoints)
  - [Modelos de Dados](#modelos-de-dados)
  - [CORS e Integração](#cors-e-integração)
- [Frontend](#frontend)
  - [Configuração e Execução](#configuração-e-execução-frontend)
  - [Funcionalidades](#funcionalidades)
  - [Componentes](#componentes)
  - [Estilização](#estilização)
  - [Integração com Backend](#integração-com-backend)
- [Deploy](#deploy)
  - [Frontend (Vercel)](#frontend-vercel)
  - [Backend (Render)](#backend-render)
- [Dicas e Observações](#dicas-e-observações)
- [Contato](#contato)

---

## Visão Geral

Este projeto permite o gerenciamento de agendamentos de serviços, com cadastro, edição, exclusão e listagem de horários. O backend fornece uma API REST robusta, enquanto o frontend oferece uma interface responsiva e intuitiva.

---

## Tecnologias Utilizadas

**Backend:**
- Java 17+
- Spring Boot
- Maven
- Lombok
- JPA/Hibernate

**Frontend:**
- React
- Vite
- Tailwind CSS
- TypeScript

---

## Estrutura do Projeto

```
agendador-horarios-Java/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/gianluca/agendador_horarios/
│   │   │   │   ├── controller/
│   │   │   │   ├── infrastructure/entity/
│   │   │   │   ├── infrastructure/repository/
│   │   │   │   ├── services/
│   │   │   ├── resources/application.properties
│   ├── pom.xml
├── frontend/
│   └── front/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── components/AgendamentoForm.tsx
│       │   ├── index.css
│       │   ├── main.tsx
│       ├── package.json
│       ├── vite.config.ts
```

---

## Backend

### Configuração e Execução

1. **Pré-requisitos:** Java 17+, Maven
2. **Instalação e execução:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Ou no Windows:
   ```bash
   mvnw spring-boot:run
   ```
3. **Configuração:**  
   O arquivo `application.properties` está em `backend/src/main/resources/`.  
   Configure a porta e o banco de dados conforme necessário.

### Endpoints

- `POST /agendamentos`: Cria um novo agendamento.
- `GET /agendamentos`: Lista todos os agendamentos ou filtra por data.
- `PUT /agendamentos`: Edita um agendamento existente.
- `DELETE /agendamentos`: Remove um agendamento por cliente e data/hora.

### Modelos de Dados

**Agendamento.java**
```java
@Entity
@Table(name = "agendamento")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String servico;
    private String profissional;
    private LocalDateTime dataHoraAgendamento;
    private String cliente;
    private LocalDateTime dataInsercao = LocalDateTime.now();
    private String telefoneCliente;
}
```

### CORS e Integração

O backend permite requisições do frontend local:
```java
@CrossOrigin(origins = "http://localhost:5173")
```
Altere para o domínio do frontend em produção após o deploy.

---

## Frontend

### Configuração e Execução (Frontend)

1. **Pré-requisitos:** Node.js 18+, npm
2. **Instalação e execução:**
   ```bash
   cd frontend/front
   npm install
   npm run dev
   ```
3. **Configuração:**  
   O frontend consome a API do backend em `http://localhost:8081/agendamentos`.  
   Ajuste a URL conforme o ambiente.

### Funcionalidades

- Cadastro de agendamentos com campos: serviço, profissional, data/hora, cliente, telefone.
- Listagem dos agendamentos com visual moderno.
- Edição e exclusão de agendamentos.
- Validação básica de campos.
- Interface responsiva e estilizada com Tailwind.

### Componentes

- **App.tsx:** Componente principal, gerencia estado e integração com backend.
- **AgendamentoForm.tsx:** Formulário para criar e editar agendamentos.
- **Listagem:** Exibe agendamentos, com botões de editar e deletar.

### Estilização

- Utiliza Tailwind CSS para layout, cores, espaçamento e responsividade.
- Inputs e botões estilizados para melhor experiência.
- Data/hora exibida de forma amigável.

### Integração com Backend

- Consome endpoints REST via `fetch`.
- Atualiza a lista de agendamentos em tempo real após operações.
- Trata erros de comunicação e exibe mensagens no console.

---

## Deploy

### Frontend (Vercel)

1. Suba o projeto para o GitHub.
2. No [Vercel](https://vercel.com/), conecte ao repositório.
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Após o deploy, atualize a URL do backend no frontend para o endereço público do backend.

### Backend (Render)

1. Suba o projeto para o GitHub.
2. No [Render](https://render.com/), crie um novo Web Service:
   - Build Command: `./mvnw clean package`
   - Start Command: `./mvnw spring-boot:run`
   - Ambiente: Java 17+
3. Configure CORS para aceitar o domínio do frontend hospedado.

---

## Dicas e Observações

- Para editar ou deletar, utilize os botões na lista.
- A data/hora é exibida separada dos botões, com destaque.
- O projeto está pronto para deploy em Vercel (frontend) e Render (backend).
- Use variáveis de ambiente para configurar URLs em produção.
- Certifique-se de que o backend está rodando antes de iniciar o frontend localmente.

---

## Contato

Dúvidas, sugestões ou problemas?  
Abra uma issue ou entre em contato pelo GitHub.

---