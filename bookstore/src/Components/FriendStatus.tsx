import React, { useState, useEffect } from 'react';

function FriendStatus() {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status:any) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    const handle = setTimeout(()=>{
        handleStatusChange({isOnline: false});
    }, 5000);
    return () => {
        clearTimeout(handle);
    };
  });

  if (isOnline === null) {
    return (<div>Loading...</div>);
  }
  return isOnline ? <div>Online...</div> : <div>Offline...</div>;
}

export default FriendStatus;