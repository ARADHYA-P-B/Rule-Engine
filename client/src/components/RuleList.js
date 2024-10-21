import React from 'react';
import { List, ListItem, Typography,Button } from '@mui/material';

const RuleList = ({ rules,onEditClick }) => {
  return (
    <List>
      {rules.map((rule, index) => (
        <ListItem key={index}>
          <Typography>                   
                        {rule.conditions.map((condition, idx) => (
                            <span key={idx}>
                                {capitalize(condition.field)}: {condition.operator} {condition.value}
                                {idx < rule.conditions.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
          <Button variant="outlined" onClick={() => onEditClick(rule)} >
                        Edit
                    </Button>
        </ListItem>
      ))}
    </List>
  );
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export default RuleList;
