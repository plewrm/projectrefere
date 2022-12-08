import "./table.css";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Listss = () => {
    const rows = [
        {
            id: 1,
            desert: 'Frozen yoghurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
        },
        {
            id: 2,
            desert: 'Frozen ',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
        },
        {
            id: 3,
            desert: 'Yyoghurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
        },
        {
            id: 4,
            desert: 'Milk',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
        },
        {
            id: 5,
            desert: 'Butter yoghurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
        },
      ];
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">ID</TableCell>
                        <TableCell className="tableCell">Dessert (100g serving)</TableCell>
                        <TableCell className="tableCell">Calories</TableCell>
                        <TableCell className="tableCell">Fat&nbsp;(g)</TableCell>
                        <TableCell className="tableCell">Carbs&nbsp;(g)</TableCell>
                        <TableCell className="tableCell">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child ': { border: 0 } }} >
                            <TableCell className="tableCell">{row.id}</TableCell>
                            <TableCell className="tableCell">{row.desert}</TableCell>
                            <TableCell className="tableCell">{row.calories}</TableCell>
                            <TableCell className="tableCell">{row.fat}</TableCell>
                            <TableCell className="tableCell">{row.carbs}</TableCell>
                            <TableCell className="tableCell">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default Listss;