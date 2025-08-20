import React, { useState } from 'react';
import { useJitsi } from '@jitsi/react-sdk';

const VideoConferenceForm = () => {
  const [caseId, setCaseId] = useState('');
  const [roomName, setRoomName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomName(`${caseId}-${Date.now()}`);
  };

  const jitsiConfig = {
    roomName: roomName,
    parentNode: 'jitsi-container',
    userInfo: {
      displayName: 'User'
    }
  };

  const { JitsiMeeting } = useJitsi(jitsiConfig);

  return (
    &lt;div className="conference-container"&gt;
      {!roomName ? (
        &lt;form onSubmit={handleSubmit}&gt;
          &lt;h2&gt;Join Video Hearing&lt;/h2&gt;
          &lt;input
            type="text"
            placeholder="Enter Case ID"
            value={caseId}
            onChange={(e) =&gt; setCaseId(e.target.value)}
            required
          /&gt;
          &lt;button type="submit"&gt;Join Hearing&lt;/button&gt;
        &lt;/form&gt;
      ) : (
        &lt;JitsiMeeting /&gt;
      )}
    &lt;/div&gt;
  );
};

export default VideoConferenceForm;