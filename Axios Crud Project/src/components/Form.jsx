/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { postData, updatePost } from "../api/PostApi";

export const Form = ({data,setData,updateDataApi,setUpdateDataApi}) => {
    const [addData,setAddData] = useState({
        title:"",
        body:"",
    })

    const isEmpty = Object.keys(updateDataApi).length === 0;

    useEffect(() => {
        updateDataApi && 
        setAddData({
            title:updateDataApi.title || "",
            body:updateDataApi.body || ""
        })
    },[updateDataApi]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return {
                ...prev,[name]:value,
            }
        })
    }

    const addPostData = async () => {
        const res = await postData(addData);
        console.log(res.data);
        if((res.status === 201)){
            setData([res.data,...data]);
            setAddData({title:"",body:""});
        } 
    }

    const updatePostData = async () => {
       try{
        const res = await updatePost(updateDataApi.id,addData);
        console.log(res.data);
        console.log(updateDataApi.id);
        if(res.status === 200){
            setData((prev) => {
                return prev.map((currEle) => {
                    return currEle.id === res.data.id ? res.data : currEle;
                })
            })
            setAddData({title:"",body:""});
            setUpdateDataApi({});
        }
       }catch(error){
        console.log(error);
       }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === "Add"){
            addPostData();
        }else if(action === "Edit"){
            updatePostData();
        }
    }

  return (
    <form onSubmit={handleFormSubmit}>
        <div>
            <label htmlFor="title"></label>
            <input type="text" autoComplete="off" id="title" name="title"
             value={addData.title} onChange={handleInputChange} placeholder="Add Title" />
        </div>
        <div>
            <label htmlFor="body"></label>
            <input type="text" autoComplete="off" id="body" name="body" 
             value={addData.body} onChange={handleInputChange} placeholder="Add Post" />
        </div>
        <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
    </form>
  )
}

