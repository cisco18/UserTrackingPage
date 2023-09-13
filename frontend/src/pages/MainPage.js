import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { TenParagraphs } from '../components/Paragraph'
import { Typography, Avatar, Button, Statistic } from 'antd';
import { uid } from 'uid';

const { Title} = Typography;

const MainPage = () => {
  const [userScroll, setUserScroll] = useState(false);
  const [serverInfo, setServerInfo] = useState('');
  const [userUid, setUserUid] = useState('');

  useEffect(() => {
    const handleLogin = async () => {
      const uidStorage = sessionStorage.getItem('userUid');
      const content = {uidStorage}
      if (!userUid) {
        const newUid = uid();
        sessionStorage.setItem('userUid', newUid);
      }
      const response = await fetch('/api/',{
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json'
        }

      })

      const serverResponse = await response.json()
      console.log(serverResponse)

      if (response.ok) {

        setServerInfo(serverResponse.info)
        setUserUid(uidStorage)
      }
    }

    handleLogin()

    window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [])

  const handleScroll = () => {
    const imageElement = document.getElementById('user-avatar');
    if (imageElement && imageElement.getBoundingClientRect().top <= 0) {
      if (!userScroll) {
        console.log('User scrolled to the top of the image');
        setUserScroll(true);
      }
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