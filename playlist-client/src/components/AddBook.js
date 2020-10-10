import React from 'react'
import { gql, useQuery } from '@apollo/client';




function AddBook() {

    return (
        <form id="add-book">

            <div className="field">
                <label>Book Name</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre</label>
                <input type="text" />
            </div>
            
            <div className="field">
                <label>Author</label>
                <select>
                    <option>Select Author</option>
                </select>
            </div>

        </form>
    )
}

export default AddBook
