import { useState } from "react";
import { useHistory } from "react-router-dom";
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author,setAuthor] = useState('Arjun');
    const [isPending,setIsPending] = useState(false);
    const history = useHistory();
    const handleSubmit = (e) => {

        e.preventDefault();
        const blog = {title,body,author}
        setIsPending(true)
        fetch("http://localhost:8000/blogs",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(blog)
        }).then(()=>{
              console.log("blog added");
              setIsPending(false)
              history.push('/');
        })
       

    }
    return (
        <div className="create">
           <h2>Add a New Blog</h2> 
           <form onSubmit={handleSubmit}>
           <label>Blog Title:</label>
           <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)} required/>
           <label>Blog Body:</label>
           <textarea value={body} onChange={(e)=>setBody(e.target.value)} required></textarea>
           <label>Blog Author</label>
           <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
            <option value="Arjun">Arjun</option>
            <option value="Ajay">Ajay</option>
            <option value="Amit">Amit</option>
           </select>
           { !isPending && <button>Add Blog</button>}
           { isPending && <button disabled>Adding Blog...</button>}
           </form>
        </div>
    )
}

export default Create;
