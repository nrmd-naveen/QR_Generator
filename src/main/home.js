import './home.css';
import { isAuthenticated } from "../user/services/authenticate";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Loader from "../user/assets/loader";


const Home = ()=>{

    useEffect(() => {
        document.title = "Home Page";  
      }, []);
/* 
    const [user,setUser] = useState({
        name:"",
        email:"",
        localId:""
    })
    
    useEffect(()=>{
        getUserDetailsApi().then((response)=>{
            setUser({
                name:response.data.users[0].displayName,
                email:response.data.users[0].email,
                localId:response.data.users[0].localId
            })
            //console.log("Get User Details Response ", response);
        }).catch((er) =>{
            console.log(er);
            if(er.message === "Network Error"){
                return <h1>Network Connection Error !</h1>
            }
            console.log("Error in Getting User Details ", er.response.data.error.message);
        })
    },[])
    
*/
    const [image,setImage] = useState(false);
    const [REF_URL,setREF_URL] = useState("www.linkedin.com/in/nrmd-naveen");
    const [QR_URL,setQR_URL] = useState("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.linkedin.com/in/nrmd-naveen")
    const getQR = () =>{
        if(REF_URL === " "|| REF_URL === " "||REF_URL === null){
            return 
        }else{
            setQR_URL(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${REF_URL}`);
        }
        
    }
    const handleUrl = (e) =>{
        setREF_URL(e.target.value);
    }
    const [Loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        console.log("Loaded . . . .")
       // setLoading(false);
      };
    const [butText,setButText] = useState('Get QR');
    const changeButText = () =>{
        if(butText === "Get QR"){
            setTimeout( function() { setLoading(false); }, 1500)
            setButText("ChangeURL");
           // setLoading(false);
        }else{
            setButText("Get QR");
            setLoading(true);
        }
    }
        

    /*
    const getGender = (name) =>{
        axios.get(`https://api.genderize.io?name=${name}`).then((res)=>{
        const gender = res.data.gender;
        return gender;
    }).catch((err)=>{
        console.log(err)
    })
    }
    

    const short = () =>{
        const sURL = "https://ulvis.net/api/write/post";
        const targetURL = "www.linkedin.com/in/nrmd-naveen";
    
        let res = axios.post(sURL,{url:targetURL})
        res.then((r)=>{
            console.log(res)
        }).catch((e)=>{
            console.log(e)
        })
    }
*/
    const navigate = useNavigate();
    const [pageLoader , setPageLoader] = useState(true);
  useEffect(() => {
    setPageLoader(true);
    isAuthenticated().then((Auth) => {
      if (!Auth) {
        setPageLoader(false);
        navigate('/login'); // Redirect to '/login'
      }
      setPageLoader(false);
    });
  }, [navigate]);
  if (pageLoader){
    return(
        <div>
                <div className='loading'>
                    <Loader />
                </div>
        </div>
    )
  }

return(
    <div className='outerContainer'>
        <div>
            <h1 className='heading'>QR Code Generator</h1>
        </div>
        
        {!image ? 
            (<div>
                <input type="text" placeholder="URL Here" onChange={handleUrl} className='inputBox' />
            </div>):
            (<div className='imageContainer'>
                    {Loading ?<Loader />:
                    <div className='qrBlock'>
                        <img style={{marginBottom:"25px"}} src={QR_URL} onLoad={handleImageLoad} alt="QR_Image"/>
                        <a href={`${QR_URL}.png`} download><buton className='saveButtonStyle'>Save <svg style={{position:"relative" ,marginLeft:"8px", top:"3px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                        </svg></buton></a>
                        
                    </div>}
            </div>)
        }
        
        <div>
            <buton className='buttonStyle' onClick={()=>{
                        getQR();
                        changeButText();
                        setImage(!image);
                    }}>{butText}</buton>
        </div>
    </div>
)

/*  
  return (
    <div className="outerContainer">
        {!image?
        <div style={{textAlign:"center", margin:"0 25% 0 25%",marginBottom:"15px"}}>
            {Loading ?<Loader />:null}
            <img src={QR_URL} onLoad={handleImageLoad} style={{ display: Loading ? 'none' : 'block' }} alt="QR_Image"/>
        </div>
        :
        <div>
            <input type="text" placeholder="URL Here" onChange={handleUrl} style={{borderBottom:"2px solid grey", borderRadius:"0px"}} />
        </div>
        }
        <button style={buttonStyle} onClick={()=>{
            getQR();
            changeButText();
            setImage(!image);
        }} >{butText}</button>
        
    </div>
    
)
 
 ------------------------------------------------ 
    return(
        <div>
            <input type="text" placeholder="URL Here" onChange={handleUrl} style={{borderBottom:"2px solid grey", borderRadius:"0px"}} />
            <button style={buttonStyle} onClick={short} >ShorternURL</button>
        </div>
    )
*/    
    
}

        /*
        let ContentLoaded = user.email?true:false;
        if (ContentLoaded){
            return (
                <div style={{textAlign:"center", padding:"15px"}}>
                    {!image?
                    <div style={{textAlign:"center", margin:"0 25% 0 25%",marginBottom:"15px"}}>
                        {Loading ?<Loader />:null}
                        <img src={QR_URL} onLoad={handleImageLoad} style={{ display: Loading ? 'none' : 'block' }} alt="QR_Image"/>
                    </div>
                    :
                    <div>
                        <input type="text" placeholder="URL Here" onChange={handleUrl} style={{borderBottom:"2px solid grey", borderRadius:"0px"}} />
                    </div>
                    }
                    <button style={buttonStyle} onClick={()=>{
                        getQR();
                        changeButText();
                        setImage(!image);
                    }} >{butText}</button>
                    
                </div>
                
            )
        }else{
            return (
                <div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Loader />
                    </div>
                    <div style={{margin:"20px 0 0 15px"}}>
                        <p>Loading . . .</p>
                    </div>
                </div>
            
        )}
    */
    

export default Home;