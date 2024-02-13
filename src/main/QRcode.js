import './home.css';
import {useState } from "react";
import Loader from "../user/assets/loader";

const QRpage = ()=>  {

    const [saveOn,setSaveOn] = useState(false);
    const [image,setImage] = useState(false);
    const [REF_URL,setREF_URL] = useState("www.linkedin.com/in/nrmd-naveen");
    const [QR_URL,setQR_URL] = useState("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=www.linkedin.com/in/nrmd-naveen")
    const getQR = () =>{
        if(REF_URL === " "||REF_URL === null){
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
        console.log("Loaded . . . .");
        setSaveOn(true);
      };
    const [butText,setButText] = useState('Get QR');
    const changeButText = () =>{
        if(butText === "Get QR"){
            setTimeout( function() { setLoading(false); }, 1500)
            setButText("ChangeURL");
           // setLoading(false);
        }else{
            setButText("Get QR");
            setSaveOn(false);
            setLoading(true);
        }
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
                            <img className='QRimage' src={QR_URL} onLoad={handleImageLoad} alt="QR_Image"/>
                        </div>}
                </div>)
            }
            
            <div className='btnContainer'>
                {saveOn ?
                <a href={`${QR_URL}.png`} download><buton className='saveButtonStyle'>Save <svg style={{position:"relative" ,marginLeft:"8px", top:"3px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                            </svg></buton></a>:null}
                <buton className='buttonStyle' onClick={()=>{
                            getQR();
                            changeButText();
                            setImage(!image);
                        }}>{butText}</buton>
            </div>
        </div>
    )
}

export default QRpage;