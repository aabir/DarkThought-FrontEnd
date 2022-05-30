import React, { useState } from "react";
import ThoughtService from "../services/ThoughtService";

const AddThought = () => {
    const initialThoughtSate = {
        title: "",
        content: "",
        publish: true
    }

    const [thought, setThought] = useState(initialThoughtSate)
    const [submitted, setSubmitted] = useState(false)
    const handleInputChange = event => {
        const{name, value, type, checked} = event.target
        const isPublish = event.currentTarget.value === 'true' ? true : false
        setThought(prevFormData => {
            return {
                ...prevFormData,
                [name] : value,
                publish: isPublish
            }
        })
    };

    const newThought = () => {
        setThought(initialThoughtSate)
        setSubmitted(false)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(thought)

        ThoughtService.create(thought)
            .then(res => {
                if(res.status === 200){
                    console.log(res)
                    setThought({
                        title: res.data.title,
                        content: res.data.content,
                        publish: res.data.publish
                    })
                    setSubmitted(true);
                    console.log(res.data);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newThought}>
                    Add
                    </button>
                </div>
            ): (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={thought.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            value={thought.content}
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
                            checked={thought.publish === true}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="publish">Publish</label>
                        &nbsp; &nbsp;
                        <input 
                            type="radio"
                            id="unpublish"
                            name="publish"
                            value="false"
                            checked={thought.publish === false}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="unpublish">Unpublish</label>

                    </div>
                    <button className="btn btn-success">
                        Submit
                    </button>

                </form>
            )}
        </div>
    )
}

export default AddThought