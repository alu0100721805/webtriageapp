const  TriageService = require('../services/TriageService');
const TriageModel = require('../models/Triage');
const {validationResult} = require('express-validator');
const {body} = require('express-validator');
const {check} = require('express-validator');

