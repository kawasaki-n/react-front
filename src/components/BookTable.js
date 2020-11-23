import React, { useEffect, useState } from 'react';
import {Table, TableContainer, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import FloatingAddIcon from './FloatingAddIcon'
import TablePaginationActions from './TablePaginationActions'

const headerCells = [
    {id: 'name', label: 'Name'},
    {id: 'author', label: 'Author'},
    {id: 'url', label: 'URL'},
    {id: 'deleteIcon', label: ''},
]

function BookTable() {
    const [ books, setBooks ] = useState([]);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ page, setPage ] = React.useState(0);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

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
                    {(rowsPerPage > 0
                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : books
                    ).map((book, i) => (
                        <TableRow key={book.id} id={book.id} hover>
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
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100, { label: 'All', value: -1 }]}
                            count={books.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        <FloatingAddIcon />
        </div>
    );
}

export default BookTable;