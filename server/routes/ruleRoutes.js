import  express from 'express';
import  { getAllRules, addNewRule,updateRuleById } from '../controllers/ruleController.js';


const  router = express.Router();

router.get('/', getAllRules);
router.post('/', addNewRule);
router.put('/:id', updateRuleById);

export default  router;
