import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThoughtService from "../services/ThoughtService";


const ListThought = props => {
    const { id } = useParams()
    let navigation = useNavigate()

    const initialThoughtState = {
        id: null,
        title: "",
        content: "",
        publish: false
    }

    const [thoughts, setThoughts] = useState(initialThoughtState)
    const [message, setMessage] = useState("")

    useEffect(() => {
        getThought()
    }, [])

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
    console.log(thoughts)
    return(
        <div className="list row">
            <div className="col-md-6">
                <h4>Thought</h4>
                <ul className="list-group">
                    {thoughts && thoughts.map(thought => (
                        <li>{thought.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListThought

