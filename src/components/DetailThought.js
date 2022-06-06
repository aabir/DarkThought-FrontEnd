import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ThoughtService from "../services/ThoughtService"

const DetailThought = props => {
    const { id } = useParams()
    let navigation = useNavigate()

    const initialThoughtSate = {
        title: "",
        content: "",
        publish: true
    }
    
    const [currentThought, setCurrentThought] = useState(initialThoughtSate)
    const [message, setMessage] = useState(false)

    const getThought = id => {
        ThoughtService.getById(id)
            .then(res => {
              setCurrentThought(res.data)
              //console.log(res.data)  
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        if(id)
            getThought(id)
    }, [id])

    const handleInputChange = event => {
        const{name, value, type, checked} = event.target
        const isPublish = event.currentTarget.value === 'true' ? true : false
        setCurrentThought(prevFormData => {
            return {
                ...prevFormData,
                [name] : value,
                publish: isPublish
            }
        })
    };

    function handleSubmit(e){
        e.preventDefault()
        //console.log(currentThought)
        ThoughtService.update(currentThought)
            .then(res => {
                if(res.status == 200){
                    setMessage(true)
                }
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
        
    return (
        <div>
            {message && (
                <div>
                    <h4>Updated successfully!</h4>
                </div>
            )}

            {currentThought ? (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={currentThought.title}
                        onChange={handleInputChange}
                        name="title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        value={currentThought.content}
                        onChange={handleInputChange}
                        name="content"
                        id="content"
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    
                    <input 
                        type="radio"
                        id="publish"
                        name="publish"
                        value="true"
                        checked={currentThought.publish === true}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="publish">Publish</label>
                    &nbsp; &nbsp;
                    <input 
                        type="radio"
                        id="unpublish"
                        name="publish"
                        value="false"
                        checked={currentThought.publish === false}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="unpublish">Unpublish</label>

                </div>
                <button className="btn btn-success">
                    Update
                </button>
                <button className="btn link"><Link to={"/thought"}>Back</Link></button>
            </form>
            ) : (
                <div>
                    <br />
                    <p>Something went wrong!</p>
                </div>
            )}
        </div>
    )
}

export default DetailThought