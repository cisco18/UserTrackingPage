import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { TenParagraphs } from '../components/Paragraph'
import { Typography, Avatar, Button, Statistic } from 'antd';
import { uid } from 'uid';

const { Title } = Typography;

const MainPage = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [serverInfo, setServerInfo] = useState('');
  const [userUid, setUserUid] = useState('');

  const apiUrl = 'https://random-data-api.com/api/v2/users?size=1';

  const checkIfUserHasSession = async () => {
    var uidStorage = sessionStorage.getItem('userUid');
    if (!uidStorage) {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        const newUid = data.uid;
        sessionStorage.setItem('userUid', newUid);
        return newUid;
      } catch (error) {
        const newUid = uid();
        sessionStorage.setItem('userUid', newUid);
        return newUid;
      }
    }
    return uidStorage;
  };

  const handleLogin = async () => {
    
    var uidStorage = await checkIfUserHasSession();
    const loginMessage = {uidStorage}
    const response = await fetch('http://localhost:4000/api/start/',{
      method: 'POST',
      body: JSON.stringify(loginMessage),
      headers: {
        'Content-Type': 'application/json'
      }
      

    })

    const serverResponse = await response.json()

    if (response.ok) {
      setUserLogged(true);
      setServerInfo(serverResponse.info);
      setUserUid(uidStorage);
    }
  }


  useEffect(() => {
    handleLogin()

    // cleanup function 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [userLogged])

  const handleScroll = async () => {
    const imageElement = document.getElementById('user-avatar');
    if (imageElement && imageElement.getBoundingClientRect().top <= 0) { 
      const scrolled = true;
      const scrollMessage = { userUid,scrolled }

      window.removeEventListener('scroll', handleScroll);
      const response = await fetch('http://localhost:4000/api/profile/update/',{
        method: 'PUT',
        body: JSON.stringify(scrollMessage),
        headers: {
          'Content-Type': 'application/json'
        }});
        
  }

  };

  return (
    <div className="container">
      <div className="navbar" style={{display: "flex"}}>
      <div className='stats-button-container' style={{marginRight: "500px"}}>
        <Button href='/stats'>User stats</Button>
        </div>
      <div>
      <Statistic title="Your id" value={userUid} />
      <Statistic title="Server info: " value={serverInfo} />
      </div>

      </div>
      


      <div className="paragraphs"></div>
      <Title>User tracking page</Title>
       <TenParagraphs/>
       <Avatar size={256} src="/avatar.jpg" icon="user" id="user-avatar" />
       <TenParagraphs/>
    </div>
  );
};

export default MainPage;