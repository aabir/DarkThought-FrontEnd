import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThoughtService from "../services/ThoughtService";


const ListThought = props => {
    const { id } = useParams()
    let navigation = useNavigate()

    useEffect(() => {
        getThought()
    }, [])

    const [thoughts, setThoughts] = useState([])

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
                        <td scope="col">Status</td>
                    </tr>
                </thead>
                <tbody>
                        
                    {thoughts &&
                    thoughts.map((thought, index) => (
                        <tr key={thought.id}>
                            <td>{thought.title}</td>
                            <td>{thought.content}</td>
                            <td><Link to={"/thought/" + thought.id}>Edit</Link></td>
                            <td>{thought.id}</td>
                            <td>{thought.publish ? "Published" : "Unpublish"}</td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
        </div>
    )
}

export default ListThought

