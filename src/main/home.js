import { isAuthenticated } from "../user/services/authenticate";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Loader from "../user/assets/loader";

const Home = ()=>{
    const buttonStyle ={
        fontFamily: "poppins",
        fontSize: "medium",
        backgroundColor: "rgb(38, 113, 225)",
        borderRadius: "25px",
        borderStyle: "none",
        height: "auto",
        display:"inline-block",
        width:"fit-content",
        marginTop: "40px",
        cursor: "pointer",
        color: "rgb(255, 255, 255)",
        padding: "10px 20px",
        textWrapping:"no-wrap"
    }
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
    const [image,setImage] = useState(true);
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
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
      };
    const [butText,setButText] = useState('Get QR');
    const changeButText = () =>{
        if(butText === "Get QR"){
            setButText("ChangeURL");
        }else{
            setButText("Get QR");
            setIsLoading(!isLoading);
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
    const [pageLoader , setPageLoader] = useState(false);
  useEffect(() => {
    setPageLoader(true);
    isAuthenticated().then((Auth) => {
      if (!Auth) {
        setPageLoader(false);
        navigate('/login'); // Redirect to '/login'
      }
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
  return (
    <div style={{textAlign:"center", padding:"15px"}}>
        {!image?
        <div style={{textAlign:"center", margin:"0 25% 0 25%",marginBottom:"15px"}}>
            {isLoading ?<Loader />:null}
            <img src={QR_URL} onLoad={handleImageLoad} style={{ display: isLoading ? 'none' : 'block' }} alt="QR_Image"/>
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

/*    
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
                        {isLoading ?<Loader />:null}
                        <img src={QR_URL} onLoad={handleImageLoad} style={{ display: isLoading ? 'none' : 'block' }} alt="QR_Image"/>
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