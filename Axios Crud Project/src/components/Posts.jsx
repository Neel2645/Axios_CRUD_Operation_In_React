import { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/PostApi'
import '../App.css'
import { Form } from './Form'

export const Posts = () => {

    const [data,setData] = useState([]);

    const [updateDataApi,setUpdateDataApi] = useState({})

    const getPostData = async () => {
        const res = await getPost();
        // console.log(res.data);
        setData(res.data);
     }

     const handleDeletePost = async (id) => {
        try{
           const res = await deletePost(id);
           if(res.status === 200)
           {
                const newUpdatedPosts = data.filter((curr) => {
                    return curr.id !== id;
                })
                setData(newUpdatedPosts);
           }
        }catch(error){
            console.log(error);
        }       
     }
   
     useEffect(() => {
       getPostData();
     },[])


     const handleUpdatePost = (currEle) => {
        setUpdateDataApi(currEle);
     }

  return (
    <>  
    <section className='section-form'>
        <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
    </section> 
    <section className='section-post'>
        <ol>
            {
                data.map((currEle) => {
                    const {id,body,title} = currEle;
                    return(
                        <li key={currEle.id}>
                            <p>Title: {title}</p>
                            <p>Body: {body}</p>
                            <button  onClick={() => handleUpdatePost(currEle)}>Edit</button>
                            <button className='btn-delete'
                            onClick={() => handleDeletePost(id)}>Delete</button>
                        </li>
                    )
                })
            }
        </ol>
   </section>
   </>
  )
}
