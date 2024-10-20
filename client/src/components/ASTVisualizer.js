import { Typography, Paper } from '@mui/material';

const ASTVisualizer = ({ ast }) => {
    if (!ast) return null;

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6">AST Visualizer</Typography>
            <pre>{JSON.stringify(ast, null, 2)}</pre>
        </Paper>
    );
}

export default ASTVisualizer; 