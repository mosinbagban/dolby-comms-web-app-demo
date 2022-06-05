import React, { useState } from 'react';
import { useHistory } from 'react-router';
import dolbyLogo from "../../../static/images/dolbyio-logo.png";

const ConfTypeChooser=()=>{

const [confType, setSelectedConfType] = useState('aidioVideo');

const handleOptionChange=(event)=>{
    setSelectedConfType(event.target.value)
    console.log('Selected option: ' + event.target.value);
}

let history = useHistory();

const next=()=>{
    console.log('call next');
    history.push("/main");
}
    
    return(
        <div className="content-wrapper">
            <div className="content-sample">

            <div className="dolby-container-logo">
          <img src={dolbyLogo} alt="Dolby.io" />
        </div>
            <p className="advanced-options">Choose Conference type</p>
            <div className="radio advanced-options">
                <label>
                    <input type="radio" value="aidioVideo" onChange={handleOptionChange} checked={confType === 'aidioVideo'} />
                    Audio Video
                </label>
            </div>
            <div className="radio advanced-options">
                <label >
                    <input type="radio" value="audioOnly" onChange={handleOptionChange} checked={confType === 'audioOnly'} />
                    Audio Only

            </label>
            </div>
            
            <div className="blockButton">
          <button
            id="join"
            className="btn"
            onClick={next}
          >
            <span>Next</span>
          </button>
        </div>
        </div>
        </div>
    );
}

export default ConfTypeChooser;