import React from 'react';
import { Paper, Typography } from '@mui/material';

const EligibilityResult = ({ eligibility }) => {
  return (
    <Paper style={{ padding: '16px', marginTop: '20px' }}>
            <Typography variant="h6">Eligibility Status</Typography>
            <Typography variant="body1">
                {eligibility ? eligibility : 'No eligibility check performed yet'}
            </Typography>
        </Paper>
  );
};

export default EligibilityResult;
