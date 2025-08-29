import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

const URL = "https://fakestoreapi.com/products"

const UserDetailsFromApi = () => {

    const [userData, setUserData] = useState([])
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState({status:false, msg: ""})

    const fetchingData = async(apiURL)=>{
        setError({status: false, msg:""})
        try{
            const response = await fetch(apiURL);
            const data = await response.json()
            setUserData(data)
            setLoading(false)
            setError({status: false, msg:""})
            if(response.status === 404){
                throw new Error("Data Not Found!")
            }
        }
        catch(error){
            setLoading(false)
            setError({status:true, msg: error.message || "Somthing Went Worng, Please Try Again!"})
        }
    }

    useEffect(()=>{
        setLoading(true)
        const timer = setTimeout(()=>{
            fetchingData(URL)
        }, 2000)

        return ()=> clearTimeout(timer) //Cleanup timeout if component unmounts
    },[])

    if(Loading){
        return(
            <div className='h-screen flex flex-col items-center justify-center'>
                <MoonLoader loading={Loading} color='blue'/>
            </div>
        )
    }

    if(error.status){
        return(
            <div>
                <h1 className='text-4xl text-red-600 text-center mt-5'>{error.msg}</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl mb-9 mt-3 underline'>Product Details From Api</h1>
            <ul className='flex flex-row flex-wrap justify-center gap-5'>
                {
                userData.map((eachUserItem)=>{
                    const {id, title, image, price, rating} = eachUserItem
                    return(
                        <li key={id} className='w-[320px] h-[270px] border rounded-[5px] shadow-xl'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row justify-center'>
                                     <img className='w-[100px] h-[130px] mt-2' src={image} alt=''/>
                                </div>
                                <h1 className='text-[15px] text-center mt-4 px-2'>{title}</h1>
                                <h1 className='text-[16px] text-blue-700 font-medium text-s text-center'>Rs. {price}</h1>
                                <h1 className='text-[13px] text-green-700 font-medium text-s text-center'>Rating : {rating.rate}</h1>
                            </div>
                        </li>
                    )
                })
                }
            </ul> 
        </div>
    );
};

export default UserDetailsFromApi;