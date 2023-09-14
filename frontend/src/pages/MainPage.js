import React, {useEffect, useState} from 'react';
import './MainPage.css';
import {TenParagraphs} from '../components/Paragraph';
import {Typography, Avatar, Button, Statistic} from 'antd';
import ApiHandler from '../gateways/ApiHandler';
import RandomApiHandler from '../gateways/RandomApiHandler';

const {Title} = Typography;

const MainPage = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [serverInfo, setServerInfo] = useState('');
  const [userUidState, setUserUid] = useState('');

  const apiHandler = new ApiHandler('http://localhost:4000');
  const randomApiHandler = new RandomApiHandler('https://random-data-api.com/api/v2/users?size=1');


  const checkIfUserHasSession = async () => {
    const userUid = sessionStorage.getItem('userUid');
    if (!userUid) {
      const newUid = await randomApiHandler.fetchRandomData();
      sessionStorage.setItem('userUid', newUid);
    }
    const newUserUid = sessionStorage.getItem('userUid');
    return newUserUid;
  };

  const handleLogin = async () => {
    const userUid = await checkIfUserHasSession();
    const loginMessage = {userUid};
    const response = await apiHandler.start(loginMessage);

    const serverResponse = await response.json();

    if (response.ok) {
      setUserLogged(true);
      setServerInfo(serverResponse.info);
      setUserUid(userUid);
    }
  };


  useEffect(() => {
    handleLogin();

    // cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [userLogged]);

  const handleScroll = async () => {
    const imageElement = document.getElementById('user-avatar');
    if (imageElement && imageElement.getBoundingClientRect().top <= 0) {
      const scrolled = true;
      const scrollMessage = {userUid: userUidState, scrolled};

      window.removeEventListener('scroll', handleScroll);
      await apiHandler.updateProfile(scrollMessage);
    }
  };

  return (
    <div className="container">
      <div className="navbar" style={{display: 'flex'}}>
        <div className='stats-button-container' style={{marginRight: '500px'}}>
          <Button href='/stats'>User stats</Button>
        </div>
        <div>
          <Statistic title="Your ID:" value={userUidState} />
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
