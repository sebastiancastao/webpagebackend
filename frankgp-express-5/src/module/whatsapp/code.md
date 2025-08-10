// ===========================
// ESTRUCTURA SIMPLIFICADA
// ===========================
/*
whatsapp-bot-basic/
├── src/
│   ├── domain/
│   │   └── Message.js
│   ├── application/
│   │   └── MessageService.js
│   ├── infrastructure/
│   │   ├── WhatsAppAdapter.js
│   │   ├── WebhookController.js
│   │   └── routes.js
│   ├── config/
│   │   └── index.js
│   └── app.js
├── .env
├── server.js
└── package.json
*/

// ===========================
// package.json (BÁSICO)
// ===========================
{
  "name": "whatsapp-bot-basic",
  "version": "1.0.0",
  "description": "WhatsApp Bot Básico",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}

// ===========================
// .env
// ===========================
/*
# WhatsApp Configuration
PHONE_NUMBER_ID=your_phone_number_id
TOKEN_WA=your_whatsapp_token
VERIFY_TOKEN=your_webhook_verify_token

# Server
PORT=3000
NODE_ENV=development
*/

// ===========================
// server.js
// ===========================
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.info(`🚀 WhatsApp Bot running on port ${PORT}`);
    console.info(`📱 Environment: ${process.env.NODE_ENV}`);
});

// ===========================
// src/config/index.js
// ===========================
module.exports = {
    port: process.env.PORT || 3000,
    whatsapp: {
        phoneNumberId: process.env.PHONE_NUMBER_ID,
        accessToken: process.env.TOKEN_WA,
        verifyToken: process.env.VERIFY_TOKEN,
        apiUrl: 'https://graph.facebook.com/v18.0'
    }
};

// ===========================
// src/domain/Message.js
// ===========================
class Message {
    constructor({ id, from, to, type, content, timestamp }) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.type = type;
        this.content = content;
        this.timestamp = timestamp || new Date();
    }

    isText() {
        return this.type === 'text';
    }

    getContent() {
        return this.content?.toLowerCase()?.trim() || '';
    }
}

module.exports = Message;

// ===========================
// src/infrastructure/WhatsAppAdapter.js
// ===========================
const axios = require('axios');
const config = require('../config');

class WhatsAppAdapter {
    constructor() {
        this.apiUrl = config.whatsapp.apiUrl;
        this.phoneNumberId = config.whatsapp.phoneNumberId;
        this.accessToken = config.whatsapp.accessToken;
    }

    async sendTextMessage(to, text) {
        try {
            const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;
            
            const payload = {
                messaging_product: 'whatsapp',
                to: to,
                type: 'text',
                text: {
                    body: text
                }
            };

            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            console.info(`✅ Message sent to ${to}: ${text.substring(0, 50)}...`);
            return response.data;
            
        } catch (error) {
            console.error('❌ Error sending message:', error.response?.data || error.message);
            throw error;
        }
    }

    async sendButtonMessage(to, bodyText, buttons) {
        try {
            const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;
            
            const payload = {
                messaging_product: 'whatsapp',
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: bodyText
                    },
                    action: {
                        buttons: buttons.map((btn, index) => ({
                            type: 'reply',
                            reply: {
                                id: btn.id || `btn_${index}`,
                                title: btn.title
                            }
                        }))
                    }
                }
            };

            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            console.info(`✅ Button message sent to ${to}`);
            return response.data;
            
        } catch (error) {
            console.error('❌ Error sending button message:', error.response?.data || error.message);
            throw error;
        }
    }

    async markAsRead(messageId) {
        try {
            const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;
            
            await axios.post(url, {
                messaging_product: 'whatsapp',
                status: 'read',
                message_id: messageId
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
        } catch (error) {
            console.error('❌ Error marking message as read:', error.response?.data || error.message);
        }
    }
}

module.exports = WhatsAppAdapter;

// ===========================
// src/application/MessageService.js
// ===========================
const Message = require('../domain/Message');
const WhatsAppAdapter = require('../infrastructure/WhatsAppAdapter');

class MessageService {
    constructor() {
        this.whatsappAdapter = new WhatsAppAdapter();
    }

    async processIncomingMessage(messageData, contactData) {
        try {
            // Crear entidad Message
            const message = new Message({
                id: messageData.id,
                from: messageData.from,
                to: messageData.to,
                type: messageData.type,
                content: this.extractContent(messageData),
                timestamp: new Date(parseInt(messageData.timestamp) * 1000)
            });

            console.info(`📨 Received message from ${message.from}: ${message.content}`);

            // Marcar como leído
            await this.whatsappAdapter.markAsRead(message.id);

            // Procesar mensaje
            await this.handleMessage(message, contactData);

        } catch (error) {
            console.error('❌ Error processing message:', error);
        }
    }

    extractContent(messageData) {
        switch (messageData.type) {
            case 'text':
                return messageData.text.body;
            case 'interactive':
                if (messageData.interactive.type === 'button_reply') {
                    return messageData.interactive.button_reply.title;
                }
                return 'Interactive message';
            default:
                return `${messageData.type} received`;
        }
    }

    async handleMessage(message, contactData) {
        const content = message.getContent();
        const from = message.from;
        const userName = contactData?.profile?.name || 'Usuario';

        // Comandos básicos
        if (content === 'hola' || content === 'hello' || content === 'hi') {
            await this.sendGreeting(from, userName);
            return;
        }

        if (content === 'menu' || content === 'menú') {
            await this.sendMenu(from);
            return;
        }

        if (content === 'ayuda' || content === 'help') {
            await this.sendHelp(from);
            return;
        }

        if (content === 'info' || content === 'información') {
            await this.sendInfo(from);
            return;
        }

        if (content === 'gracias' || content === 'thanks') {
            await this.sendThanks(from);
            return;
        }

        // Manejo de botones
        if (content === '📋 servicios') {
            await this.sendServices(from);
            return;
        }

        if (content === '📞 contacto') {
            await this.sendContact(from);
            return;
        }

        if (content === '❓ ayuda') {
            await this.sendHelp(from);
            return;
        }

        // Respuesta por defecto
        await this.sendDefaultResponse(from, userName);
    }

    async sendGreeting(to, userName) {
        const greeting = `¡Hola ${userName}! 👋

Bienvenido a nuestro bot de WhatsApp.

Escribe *menu* para ver las opciones disponibles o *ayuda* para obtener información sobre los comandos.

¿En qué puedo ayudarte hoy? 😊`;

        await this.whatsappAdapter.sendTextMessage(to, greeting);
    }

    async sendMenu(to) {
        const menuText = "🤖 *Menú Principal*\n\nSelecciona una opción:";
        
        const buttons = [
            { id: 'services', title: '📋 Servicios' },
            { id: 'contact', title: '📞 Contacto' },
            { id: 'help', title: '❓ Ayuda' }
        ];

        await this.whatsappAdapter.sendButtonMessage(to, menuText, buttons);
    }

    async sendHelp(to) {
        const helpText = `🆘 *Ayuda - Comandos Disponibles*

📝 *Comandos básicos:*
• *hola* - Saludo inicial
• *menu* - Ver menú principal
• *ayuda* - Mostrar esta ayuda
• *info* - Información del bot
• *gracias* - Despedida

💡 *Consejos:*
• Puedes escribir en minúsculas o mayúsculas
• Usa los botones para navegar más fácil
• Si tienes dudas, escribe *ayuda*

¿Necesitas algo más? 🤔`;

        await this.whatsappAdapter.sendTextMessage(to, helpText);
    }

    async sendInfo(to) {
        const infoText = `ℹ️ *Información del Bot*

🤖 *Bot:* WhatsApp Business Assistant
📅 *Versión:* 1.0.0 (Básica)
🕐 *Disponibilidad:* 24/7
🌐 *Idioma:* Español

⚡ *Funciones:*
• Respuestas automáticas
• Menú interactivo
• Información de contacto
• Comandos básicos

🔧 *Desarrollado con:*
• Node.js + Express
• WhatsApp Business API
• Arquitectura Hexagonal

¿Te puedo ayudar en algo más? 😊`;

        await this.whatsappAdapter.sendTextMessage(to, infoText);
    }

    async sendServices(to) {
        const servicesText = `🛍️ *Nuestros Servicios*

✅ *Servicio 1:* Consultoría
   • Asesoría especializada
   • Análisis de procesos
   • Recomendaciones

✅ *Servicio 2:* Desarrollo
   • Aplicaciones web
   • Sistemas personalizados
   • Integración de APIs

✅ *Servicio 3:* Soporte
   • Atención técnica
   • Mantenimiento
   • Capacitación

Para más información escribe *contacto* 📞

¿Qué servicio te interesa? 🤔`;

        await this.whatsappAdapter.sendTextMessage(to, servicesText);
    }

    async sendContact(to) {
        const contactText = `📞 *Información de Contacto*

🏢 *Empresa:* Mi Empresa S.A.C.
📧 *Email:* info@miempresa.com
📱 *WhatsApp:* +51 999 888 777
🌐 *Web:* www.miempresa.com

📍 *Oficina:*
Av. Ejemplo 123, Oficina 456
Lima, Perú

🕐 *Horarios:*
• Lun - Vie: 9:00 AM - 6:00 PM
• Sáb: 9:00 AM - 1:00 PM
• Dom: Cerrado

¡Contáctanos cuando gustes! 😊`;

        await this.whatsappAdapter.sendTextMessage(to, contactText);
    }

    async sendThanks(to) {
        const thanksText = `¡De nada! 😊

Fue un placer ayudarte. Si necesitas algo más, no dudes en escribir:

• *menu* - Para ver opciones
• *ayuda* - Para obtener ayuda
• *hola* - Para saludar de nuevo

¡Que tengas un excelente día! ✨`;

        await this.whatsappAdapter.sendTextMessage(to, thanksText);
    }

    async sendDefaultResponse(to, userName) {
        const defaultText = `Hola ${userName} 👋

No entendí tu mensaje. Aquí tienes algunas opciones:

🔤 *Comandos disponibles:*
• *hola* - Saludo
• *menu* - Ver opciones
• *ayuda* - Obtener ayuda
• *info* - Información del bot
• *contacto* - Nuestros datos

O simplemente escribe *menu* para ver todas las opciones disponibles.

¿En qué más puedo ayudarte? 🤔`;

        await this.whatsappAdapter.sendTextMessage(to, defaultText);
    }
}

module.exports = MessageService;

// ===========================
// src/infrastructure/WebhookController.js
// ===========================
const config = require('../config');
const MessageService = require('../application/MessageService');

class WebhookController {
    constructor() {
        this.messageService = new MessageService();
    }

    // Verificar webhook
    verifyWebhook = (req, res) => {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        console.info('🔍 Webhook verification attempt...');

        if (mode === 'subscribe' && token === config.whatsapp.verifyToken) {
            console.info('✅ Webhook verified successfully!');
            res.status(200).send(challenge);
        } else {
            console.info('❌ Webhook verification failed');
            res.status(403).send('Forbidden');
        }
    };

    // Manejar mensajes entrantes
    handleWebhook = async (req, res) => {
        try {
            const body = req.body;

            if (body.object === 'whatsapp_business_account') {
                // Procesar cada entrada
                for (const entry of body.entry) {
                    for (const change of entry.changes) {
                        if (change.field === 'messages') {
                            await this.processMessages(change.value);
                        }
                    }
                }
            }

            res.status(200).send('OK');
        } catch (error) {
            console.error('❌ Webhook error:', error);
            res.status(500).send('Error');
        }
    };

    async processMessages(value) {
        try {
            // Procesar mensajes entrantes
            if (value.messages) {
                for (const message of value.messages) {
                    const contact = value.contacts?.[0];
                    await this.messageService.processIncomingMessage(message, contact);
                }
            }

            // Procesar estados de mensaje (opcional)
            if (value.statuses) {
                for (const status of value.statuses) {
                    console.info(`📊 Message ${status.id}: ${status.status}`);
                }
            }
        } catch (error) {
            console.error('❌ Error processing messages:', error);
        }
    }
}

module.exports = WebhookController;

// ===========================
// src/infrastructure/routes.js
// ===========================
const express = require('express');
const WebhookController = require('./WebhookController');

const router = express.Router();
const webhookController = new WebhookController();

// Webhook routes
router.get('/webhook', webhookController.verifyWebhook);
router.post('/webhook', webhookController.handleWebhook);

// Health check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'WhatsApp Bot Basic'
    });
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ 
        message: 'WhatsApp Bot is running!',
        environment: process.env.NODE_ENV || 'development'
    });
});

module.exports = router;

// ===========================
// src/app.js
// ===========================
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./infrastructure/routes');

const app = express();

// Middleware básico
app.use(cors());
app.use(morgan('combined'));

// Para webhooks de WhatsApp
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl 
    });
});

// Error handler básico
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

module.exports = app;

// ===========================
// INSTRUCCIONES DE USO
// ===========================
/*
1. INSTALACIÓN:
   npm install

2. CONFIGURAR .env:
   - Copiar variables de WhatsApp
   - Configurar VERIFY_TOKEN único

3. INICIAR:
   npm run dev

4. CONFIGURAR WEBHOOK:
   - URL: https://tu-dominio.com/webhook
   - Verify Token: el configurado en .env

5. PROBAR:
   - Envía "hola" al WhatsApp
   - Usa comando "menu"
   - Prueba los botones

6. COMANDOS DISPONIBLES:
   - hola: Saludo inicial
   - menu: Menú con botones
   - ayuda: Lista de comandos
   - info: Información del bot
   - contacto: Datos de contacto
   - gracias: Despedida

7. FUNCIONALIDADES:
   ✅ Verificación de webhook
   ✅ Procesamiento de mensajes
   ✅ Respuestas automáticas
   ✅ Menú con botones
   ✅ Comandos básicos
   ✅ Arquitectura modular
   ✅ Logging básico
   ✅ Manejo de errores
*/