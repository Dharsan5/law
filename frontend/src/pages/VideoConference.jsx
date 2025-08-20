import React, { useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const VideoConference = () => {
  const { caseNumber } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const navigate = useNavigate();

  const jitsiContainerRef = useRef(null);
  // Use a ref to hold the Jitsi API instance
  // It persists across renders without causing re-renders itself
  const jitsiApiRef = useRef(null);

  const handleClose = () => {
    navigate(`/${role}-dashboard`);
  };

  const handleParticipantLeft = (participant) => {
    console.log('Participant left:', participant);
  };

  const handleConferenceJoined = (participant) => {
    console.log('Conference joined:', participant);
  };

  const handleLeaveConference = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
      // The 'readyToClose' event will then trigger the navigation
    } else {
      // Fallback if API isn't ready for some reason
      handleClose();
    }
  };

  useEffect(() => {
    // If an API instance already exists, or the container isn't rendered, do nothing.
    if (jitsiApiRef.current || !jitsiContainerRef.current) {
      return;
    }

    const domain = 'meet.jit.si';
    const options = {
      roomName: `JustiFlow-Case-${caseNumber}`,
      width: '100%',
      height: '600px',
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: `${role.charAt(0).toUpperCase() + role.slice(1)} - Case ${caseNumber}`,
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        disableModeratorIndicator: false,
        startScreenSharing: false,
        enableEmailInStats: false,
      },
      interfaceConfigOverwrite: {
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'chat', 'recording',
          'livestreaming', 'etherpad', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts'
        ],
      },
    };

    // The JitsiMeetExternalAPI constructor is synchronous and looks for a global
    // JitsiMeetExternalAPI object. We must ensure the script is loaded first.
    const initializeJitsi = () => {
      // Ensure the container is still mounted and no API instance exists
      if (!jitsiContainerRef.current || jitsiApiRef.current) return;

      const api = new window.JitsiMeetExternalAPI(domain, options);
      jitsiApiRef.current = api; // Store the instance in the ref

      api.addEventListeners({
        readyToClose: handleClose,
        participantLeft: handleParticipantLeft,
        videoConferenceJoined: handleConferenceJoined,
      });
    };

    // Check if the Jitsi script is already loaded
    if (window.JitsiMeetExternalAPI) {
      initializeJitsi();
    } else {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    }

    // This is the crucial cleanup function
    return () => {
      // Dispose of the Jitsi API instance
      jitsiApiRef.current?.dispose();
      jitsiApiRef.current = null;

      // Clean up the container's content to remove the iframe
      if (jitsiContainerRef.current) {
        jitsiContainerRef.current.innerHTML = "";
      }
      
      // Remove the script tag to prevent it from being loaded multiple times
      const jitsiScript = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
      if (jitsiScript) {
        jitsiScript.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Video Conference - Case #{caseNumber}</h4>
            <button
              className="btn btn-danger"
              onClick={handleLeaveConference}
            >
              Leave Conference
            </button>
          </div>
          <div
            ref={jitsiContainerRef}
            style={{ minHeight: '600px', border: '1px solid #ddd' }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoConference;