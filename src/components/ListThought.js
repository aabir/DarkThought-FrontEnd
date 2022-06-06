import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThoughtService from "../services/ThoughtService";
import { formatDate } from "../Utlis";


const ListThought = props => {
    
    useEffect(() => {
        getThought()
    }, [])

    const [thoughts, setThoughts] = useState([])

    const getThought = () => {
        ThoughtService.getAll()
            .then(res => {
                setThoughts(res.data)
                //console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    function handleDelete(id, event){
        let confirm = window.confirm("Are you sure?")
        if(confirm === true){
            ThoughtService.remove(id)
            .then(res => {
                if(res.status === 200){
                    getThought()
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    return(
        <div className="row">
            <h4>Thoughts</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td scope="col">Title</td>
                        <td scope="col">Content</td>
                        <td scope="col">Edit</td>
                        <td scope="col">Delete</td>
                        <td scope="col">Date</td>
                        <td scope="col">Status</td>
                    </tr>
                </thead>
                <tbody>
                        
                    {thoughts &&
                    thoughts.map((thought) => (
                        <tr key={thought.id}>
                            <td>{thought.title}</td>
                            <td>{thought.content}</td>
                            <td><Link to={`/detail-thought/${thought.id}`} className="link-info">Edit</Link></td>
                            <td><a className="link-danger" onClick={(e) => handleDelete(thought.id, e)}>Delete</a></td>
                            <td>{formatDate(thought.createdAt)}</td>
                            <td>{thought.publish ? "Published" : "Unpublish"}</td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
        </div>
    )
}

export default ListThought

