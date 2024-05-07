# SmartAgent 💬
SmartAgent is a customer support ticket management application, paired with an AI assistant.

## Goals 🏆

This is a 4-week collaborative final project by [Gloria Lim](https://github.com/glowiep) and [Sebastian Varon](https://github.com/svaronc).

The goals of this project was to:
- Leverage all the skills and knowledge learned throughout Lighthouse Labs Web Development Bootcamp
- Practice creating functional requirements, user stories, and wireframes.
- Build an application from start to finish, created with React (frontend) and Ruby on Rails (backend).


## Getting Started ✨
To run this project locally, clone this repository and navigate to the root directory.

### Requirements
- Ruby version 3.3.0
- NodeJS >= 18.15.0

Notes on the AI Chatbot on the Landing page created with [FlowiseAI](https://flowiseai.com/):
- The FlowiseAI chatbot on the landing page was hosted on Railway during the project demonstration. 
- The FlowiseAI configuration can be replicated by importing the json file in planning/FlowiseAI into your Flowise project. The accompanying text file is the input document for the Text File Loader.
- Please see .env.example file in /frontend for the secret keys setup for the connection to the FlowiseAI project.

### Back-end 🚅
1. Navigate to the /backend folder.

2. Run ```bundle install``` to install dependencies.

3. Create config/database.yml by copying config/database.example.yml. Set up the database credentials in this file.

4. Run migrations with ```bin/rails db:migrate```.

4. If you want to recreate the database from scratch, run ```bin/rails db:reset``` to create, load and seed the database. Check step 3 if this returns an error.

5. Run ```bin/rails s -b 0.0.0.0``` to start the server

### Frontend 🚀
1. Navigate to the /frontend folder.

2. Install dependencies by running ```npm install```.

3. Run ```npm run dev``` to start the frontend server. It will run on http://localhost:5173



## Features ✅

SmartAgent has a landing page for Customers and SmartAgent users.

![SmartAgent landing page](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/1_LandingPage.png?raw=true)

<br />

Customers can submit requests via the form on the landing page, or by emailing SmartAgent email directly.

![Customer Support Request Form](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/2_CustomerSupportRequestForm.png?raw=true)

<br />

There is also an AI chatbot on the landing page to assist with general questions regarding the SmartAgent application.

![AI Chatbot](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/3_Chatbot.png?raw=true)

<br />

When a SmartAgent user is logged in, they can view the main application inbox:

![SmartAgent Inbox](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/4_SmartAgentInbox.png?raw=true)

<br />

Agents are able to chat within the application.

![Agent Chat](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/5_AgentChat.png?raw=true)

<br />

A SmartAgent user can transfer the ticket to another agent.

![Transfer ticket](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/6_TransferTicket.png?raw=true)


<br />

This is the ticket view. 

![Ticket view](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/7_TicketView.png?raw=true)

<br />

The ticket notes can be viewed in the side panel that appears when you click on 'Ticket Notes'. 

![Ticket Notes](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/8_TicketNotes.png?raw=true)

<br />

SmartAgents can send email responses directly in the ticket.

![Ticket reply](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/9_TicketReply.png?raw=true)

<br />

There is also a Dashboard with the SmartAgent's performance stats.

![Dashboard](https://github.com/glowiep/SmartAgent-React/blob/main/public/images/10_Dashboard.png?raw=true)