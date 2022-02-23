import React from 'react';

const MyNewComponent = (props:any)=>{
    return (<pre style={{textAlign : "left"}}>
        {JSON.stringify(props, null, 2)}
    </pre>);
};

export default MyNewComponent;