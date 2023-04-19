import React, { Component, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';


import './logonCalendar.css';
import './logonMain.css';
import LogonMypage from './LogonMypage';
import axios from 'axios';

const LogonMain = ({ history }) => {
  // 풀캘린더의 이벤트 속성에 불러올 이벤트 
  const [events, setEvents] = useState([]);
  // 서버로부터 받아온 데이터
  const [data, setData] = useState([]);
  // const [ mood, setMood ] = useState([]);

  // 일기쓰기 버튼
  const handlerClickWrite = () => {
    history.push(`/comon/logon/write`)
  };

  // 일기 목록 출력
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon`)
      .then((res) => {
        console.log(res);
        // data를 받아와서 상태변수에 저장
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // 일기 목록 변환 //무한루프가 돌아서 useEffect로 수정함 
  useEffect(() => {
    const newEvents = data.map(({ moodId, createDt }) => ({
      title: moodId,
      date: createDt
    }));
    setEvents(newEvents);

  }, [data]);

  // 이벤트에 이미지 출력
  const renderEventContent = (eventInfo) => {
    const moodId = parseInt(eventInfo.event.title);
    console.log(moodId);

    let moodImgSrc;
    if (moodId === 1) {
      moodImgSrc = '/img/mood_1.png';
    } else if (moodId === 2) {
      moodImgSrc = '/img/mood_2.png';
    } else if (moodId === 3) {
      moodImgSrc = '/img/mood_3.png';
    } else if (moodId === 4) {
      moodImgSrc = '/img/mood_4.png';
    } else if (moodId === 5) {
      moodImgSrc = '/img/mood_5.png';
    }

    return (
      <div>
        <img className="mood_detail" src={moodImgSrc} alt={`Mood ${moodId}`} />
      </div>
    );
  };

  // 이벤트 클릭시 상세조회로 이동 
  const dateclickHandler = (einfo) => {
    console.log(einfo.el.fcSeg.eventRange.range.start);
  }

  return (
    <>
      <div className='main-container'>
        <LogonMypage />

        <div className='calendar-box'>
          <div className="calendar">
            <FullCalendar
              initialView="dayGridMonth"
              plugins={[dayGridPlugin, interactionPlugin]}
              selectable={true}
              headerToolbar={{
                start: 'title',
                end: 'today prev next'
              }}
              eventContent={renderEventContent}
              eventClick={dateclickHandler}
              events={events}
              height={"900px"}

            />
          </div>
          <button className='writeBtn-box' onClick={handlerClickWrite}>
            <div className='write-btn' />
            <span className="writetext"> 일기쓰기 </span>
          </button>
        </div>
      </div>
    </>
  );

};
export default LogonMain;