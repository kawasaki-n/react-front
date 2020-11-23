import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import FloatingAddIcon from './FloatingAddIcon'

const headerCells = [
    {id: 'name', label: 'Name'},
    {id: 'author', label: 'Author'},
    {id: 'url', label: 'URL'},
    {id: 'deleteIcon', label: ''},
]

function BookTable() {
    const [ books, setBooks ] = useState([]);

    function fetchBooks() {
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/books")
            .then(res => res.json())
            .then((result) => {
                setBooks(result);
            }, (err) => {
                console.log(err);
            })
    }

    function deleteBook(id) {
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/books/"+id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((result) => {
            fetchBooks();
        });
    }

    useEffect(() => {
        fetchBooks();
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
                    {books.map((book, i) => (
                        <TableRow key={book.id} id={book.id}>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>
                                <a href={book.url} target="_blank" rel="noreferrer">{book.url}</a>
                            </TableCell>
                            <TableCell align="right" padding="checkbox">
                                <IconButton aria-label="delete" onClick={ () => deleteBook(book.id) }>
                                    <DeleteIcon />
                                </IconButton>
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