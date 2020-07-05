import React from 'react'

function Mole({ mole,hitIt}) {
    const setStyle = () =>{
        if(mole==='peeper'){
           return {top:0}
        }
        else{

            return {top:'100%'}
        }
    }
    
    return (
        <div className="mole" mole={mole} style={setStyle()} onClick={hitIt}>
       
        </div>
    )
}

export default Mole
