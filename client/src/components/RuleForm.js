import React, { useState,useEffect } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RuleForm = ({ onAddRule,currentRule }) => {
  const [conditions, setConditions] = useState(currentRule?.conditions || [{ field: '', operator: '', value: '' }]);
  const [logic, setLogic] = useState('AND');
  
 
  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '>', value: '', logic: 'AND' }]);
  };


  useEffect(() => {
    if (currentRule) {
        setConditions(currentRule.conditions);
        setLogic(currentRule.logic);
    }
}, [currentRule]);

 
  const handleConditionChange = (index, key, value) => {
    const newConditions = conditions.slice();
    newConditions[index][key] = value;
    setConditions(newConditions);
  };



  const handleAddRule = () => {
    const newRule = {
      conditions,
      logic: conditions.length > 1 ? 'AND' : 'NONE',
    };
    onAddRule(newRule);
    setConditions([{ field: 'age', operator: '>', value: '', logic: 'AND' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRule({ conditions, logic });
};

  return (
    <form onSubmit={handleSubmit}> 
    <Grid container spacing={2} >
      {conditions.map((condition, index) => (
        <React.Fragment key={index}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Field</InputLabel>
              <Select
                value={condition.field}
                onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
              >
                <MenuItem value="age">Age</MenuItem>
                <MenuItem value="department">Department</MenuItem>
                <MenuItem value="salary">Experience</MenuItem>
                <MenuItem value="experience">Salary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Operator"
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Value"
              value={condition.value}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
              fullWidth
            />
          </Grid>
          {index > 0 && (
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Logic</InputLabel>
                <Select
                  value={condition.logic}
                  onChange={(e) => handleConditionChange(index, 'logic', e.target.value)}
                >
                  <MenuItem value="AND">AND</MenuItem>
                  <MenuItem value="OR">OR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
        </React.Fragment>
      ))}
      <Grid item xs={12} md={6} container >

        <Button variant="contained" color="primary" onClick={handleAddRule}>
          Add Rule
        </Button>
        <Button variant="outlined" onClick={addCondition} style={{ marginLeft: '10px' }}>
          Add Condition
        </Button>
        <Button type="submit" variant="contained" color="primary"   alignItems ="center" justifyContent="space-between">
                {currentRule ? 'Update Rule' : 'Add Rule'}
            </Button>
        
      </Grid>
    </Grid>
    </form>
  );
};

export default RuleForm;
