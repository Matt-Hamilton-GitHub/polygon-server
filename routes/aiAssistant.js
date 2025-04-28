const express = require('express');
const router = express.Router();


const {assistWithTask} = require('../controller/aiAssistantController')

router.post('/ai-assist', assistWithTask)


module.exports = router;