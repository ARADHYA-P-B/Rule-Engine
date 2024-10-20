import  Rule from '../models/rule.js';
import mongoose from 'mongoose';


export const getAllRules = async (req, res) => {
    try {
        const rules = await Rule.find();
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rules', error });
    }
};


export const addNewRule = async (req, res) => {
    const { conditions, logic } = req.body;

    if (!conditions || !logic) {
        return res.status(400).json({ message: 'Conditions and logic are required' });
    }

    try {
        const newRule = new Rule({ conditions, logic });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        res.status(500).json({ message: 'Error adding rule', error });
    }
};


export const updateRuleById = async (req, res) => {
    const { id } = req.params;
    const { conditions, logic } = req.body;

   
    if (!conditions || !logic) {
        return res.status(400).json({ message: 'Conditions and logic are required' });
    }

    try {
        const updatedRule = await Rule.findByIdAndUpdate(
            id,
            { conditions, logic },
            { new: true, runValidators: true }
        );

        if (!updatedRule) {
            return res.status(404).json({ message: 'Rule not found' });
        }

        res.status(200).json(updatedRule);
    } catch (error) {
        res.status(500).json({ message: 'Error updating rule', error });
    }
};
