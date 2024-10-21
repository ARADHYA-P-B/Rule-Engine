import React, { useState, useEffect } from 'react';
import { Container, Typography} from '@mui/material';
import RuleList from './components/RuleList';
import EligibilityResult from './components/EligibilityResult';
import ASTVisualizer from './components/ASTVisualizer';
import RuleForm from './components/RuleForm';

const userAttributes = {
    age: 30,
    department: 'Marketing',
    salary: 50000,
    experience: 6,
};

const App = () => {
    const [rules, setRules] = useState([]);
    const [eligibility, setEligibility] = useState(null);
    const [ast, setAst] = useState(null);
    const [currentRule, setCurrentRule] = useState(null);
   
    const fetchRules = async () => {
        try {
            const response = await fetch('/api/rules');
            const data = await response.json();
            setRules(data);

            const eligibilityStatus = determineEligibility(data, userAttributes);
            setEligibility(eligibilityStatus);

           
            const ast = createAST(data);
            setAst(ast);
        } catch (error) {
            console.error('Error fetching rules:', error);
        }
    };

    useEffect(() => {
        fetchRules();
    });

    const handleEditClick = (rule) => {
        setCurrentRule(rule); 
    };



    const updateRule = async (id, updatedRule) => {
        const response = await fetch(`/api/rules/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRule),
        });

        const data = await response.json();
        setRules(rules.map((rule) => (rule._id === id ? data : rule)));
        setCurrentRule(null); 
    };


    const handleAddRule = async (newRule) => {
        
        try {
            let response;
            if (currentRule) {
                // Update the rule if it's being edited
                response = await fetch(`/api/rules/${currentRule._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRule),
                });
                
            } else {
                // Create a new rule
                response = await fetch('/api/rules', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRule),
                });
            }

            if (!response.ok) {
                throw new Error('Failed to save rule');
            }

            const data = await response.json();

            
            if (currentRule) {
                // If editing, replace the updated rule in the rules array
                const updatedRules = rules.map(rule =>
                    rule._id === data._id ? data : rule
                );
                setRules(updatedRules);
            } else {
                
                setRules([...rules, data]);
            }

            
            setCurrentRule(null);

            
            const updatedEligibility = determineEligibility([...rules, data], userAttributes);
            setEligibility(updatedEligibility);

            const updatedAST = createAST([...rules, data]);
            setAst(updatedAST);
        } catch (error) {
            console.error('Error saving rule:', error);
        }
    };


    const addRule = async (newRule) => {
        const response = await fetch('/api/rules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRule),
        });

        const data = await response.json();
        setRules([...rules, data]);
    };



      
    const handleEditRule = (rule) => {
        setCurrentRule(rule);  
    };

    

    const determineEligibility = (rules, userAttributes) => {

      let isEligible = false; 
        for (let rule of rules) {
            const { conditions, logic } = rule;
            let isEligible = true;

            // Check each condition in the rule
            for (let condition of conditions) {
                const { field, operator, value } = condition;

                switch (operator) {
                    case '>':
                        if (!(userAttributes[field] > value)) isEligible = false;
                        break;
                    case '>=':
                        if (!(userAttributes[field] >= value)) isEligible = false;
                        break;
                    case '<':
                        if (!(userAttributes[field] < value)) isEligible = false;
                        break;
                    case '<=':
                        if (!(userAttributes[field] <= value)) isEligible = false;
                        break;
                    case '==':
                        if (!(userAttributes[field] === value)) isEligible = false;
                        break;
                    default:
                        isEligible = false;
                }

                // Apply logic (AND/OR) between conditions
                if (!isEligible && logic === 'AND') return "Not Eligible";
                if (isEligible && logic === 'OR') return "Eligible";
            }
            if (isEligible) return "Eligible";
        }

        return isEligible ? "Eligible" : "Not Eligible";
    };

    
    const createAST = (rules) => {
    
        const ast = rules.map((rule) => {
            return {
                logic: rule.logic,
                conditions: rule.conditions.map((condition) => ({
                    field: condition.field,
                    operator: condition.operator,
                    value: condition.value,
                })),
            };
        });
        return ast;
    };
    
      
        
    return (
        <Container sx={{backgroundColor:'aliceblue',padding:'2'}} >
            <Typography variant="h4" gutterBottom>
            Rule Engine with AST
            </Typography>
            <RuleForm onAddRule={handleAddRule}  currentRule={currentRule}/>
            <RuleList rules={rules} onEditClick={handleEditClick} />
            <EligibilityResult eligibility={eligibility} />
            <ASTVisualizer ast={ast} />
        </Container>
    );
};

export default App;
