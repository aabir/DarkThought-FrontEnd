import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThoughtService from "../services/ThoughtService";
import { Alert } from "bootstrap";


const ListThought = props => {
    const { id } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getThought()
    }, [])

    const [thoughts, setThoughts] = useState([])
    const [message, setMessage] = useState("")

    const getThought = () => {
        ThoughtService.getAll()
            .then(res => {
                setThoughts(res.data)
                console.log(res.data)
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
                            <td><Link to={`/detail-thought/${thought.id}`} className="btn link">Edit</Link></td>
                            <td><button className="btn link" onClick={(e) => handleDelete(thought.id, e)}>Delete</button></td>
                            <td>{thought.createdAt}</td>
                            <td>{thought.publish ? "Published" : "Unpublish"}</td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
        </div>
    )
}

export default ListThought

