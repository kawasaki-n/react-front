import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

import FloatingAddIcon from './FloatingAddIcon'

const headerCells = [
    {id: 'name', label: 'Name'},
    {id: 'auther', label: 'Auther'},
    // {id: 'content', label: 'Content'},
    {id: 'url', label: 'URL'},
]

function BookTable() {
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
        fetch("/api/books")
            .then(res => res.json())
            .then((result) => {
                setBooks(result);
            }, (error) => {
                console.error(error);
            })
    }, []);

    return (
        <div>
        <TableContainer component={Paper}>
            <Table aria-label="book table">
                <TableHead>
                    <TableRow>
                        {headerCells.map((headerCell) => (
                            <TableCell align='left'>{headerCell.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id} id={book.id}>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.auther}</TableCell>
                            <TableCell>
                                <a href={book.url} target="_blank" rel="noopener">LINK</a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <FloatingAddIcon />
        </div>
    );
}

export default BookTable;