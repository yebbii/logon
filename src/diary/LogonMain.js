import React, { Component, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useHistory } from 'react-router-dom';
import history from 'react-router-dom';
import { TbPencilPlus } from "react-icons/tb";
import './logonCalendar.css';
import './logonMain.css';
import LogonMypage from './LogonMypage';
import axios from 'axios';
import Swal from 'sweetalert2';

const LogonMain = () => {
  // 풀캘린더의 이벤트 속성에 불러올 이벤트 
  const [events, setEvents] = useState([]);
  // 서버로부터 받아온 데이터
  const [data, setData] = useState([]);
  const [day, setDay] = useState('');
  const [dairyId, setDairyId] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  const calendarRef = useRef(null);

  const editingTitle = () => {
    setIsEditing(true);
  };

  // 일기쓰기 버튼
  // 작성 클릭 시 useEffect를 통해 중복 체크
  const handlerClickWrite = () => {
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/distinct/write`)
      .then(res => {
        history.push({
          pathname: `/comon/logon/write`
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: '✨오늘 일기를 이미 작성했습니다\n내일 다시 써주세요✨',
          showConfirmButton: false,
          width: 600,
          padding: '40px 0px',
          timer: 1500
        });
        history.push('/');
      })
  };

  // 일기 목록 출력
  useEffect(() => {
    const date = calendarRef.current.getApi().currentData.dateProfile.currentDate;
    const createdDt = formatDate(date);
    setDay(createdDt);

    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon`)
      .then((res) => {
        // data를 받아와서 상태변수에 저장
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // 일기 목록 변환 //무한루프가 돌아서 useEffect로 수정함 
  useEffect(() => {
    const newEvents = data.map(({ moodId, createDt, diaryId }) => ({
      title: moodId,
      date: createDt,
      id: diaryId
    }));
    setEvents(newEvents);

  }, [data]);

  // 이벤트에 이미지 출력
  const renderEventContent = (eventInfo) => {
    const moodId = parseInt(eventInfo.event.title);
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

  //  디테일 페이지로 넘기는 코드
  const history = useHistory();

  const dateclickHandler = (e) => {
    let date = new Date(e.el.fcSeg.eventRange.range.start);
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    date = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, 10);
    const event = events.filter(e => e.date === date);

    history.push(`/comon/logon/page/${event[0].id}`);
  };


  // fullcalendar의 날짜 형태를 sql 날짜 형태로 변경
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };

  // 커스텀 버튼
  const handleTodayClick = (e) => {
    calendarRef.current.getApi().today();

    const date = calendarRef.current.getApi().currentData.dateProfile.currentDate;
    const createdDt = formatDate(date);
    setDay(createdDt);

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/${createdDt}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handlePrevClick = (e) => {
    calendarRef.current.getApi().prev();

    const date = calendarRef.current.getApi().currentData.dateProfile.currentDate;
    const createdDt = formatDate(date);
    setDay(createdDt);

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/${createdDt}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleNextClick = () => {
    calendarRef.current.getApi().next();

    const date = calendarRef.current.getApi().currentData.dateProfile.currentDate;
    const createdDt = formatDate(date);
    setDay(createdDt);

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/${createdDt}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <>
      <div id='my-container'>
        <div className='main-container'>
          <LogonMypage isEditing={isEditing}
            editingTitle={editingTitle}
            setName={setName}
            day={day} />

          <div className='calendar-box'>
            <div className="calendar">
              <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                selectable={true}
                headerToolbar={{
                  start: 'title',
                  end: 'todayButton prevButton nextButton'
                }}
                customButtons={{
                  todayButton: {
                    text: 'Today',
                    click: handleTodayClick
                  },
                  prevButton: {
                    text: 'Prev',
                    click: handlePrevClick
                  },
                  nextButton: {
                    text: 'Next',
                    click: handleNextClick
                  }
                }}
                ref={calendarRef}
                eventContent={renderEventContent}
                eventClick={e => dateclickHandler(e)}
                events={events}
                height={"900px"}
              />
            </div>
            
            <button className='writeBtn-box' onClick={handlerClickWrite} title='기록하기 (일기를 작성하세요)'>
              <TbPencilPlus className='write-btn' />
            </button>
          </div>
        </div>
      </div>
    </>
  );

};
export default LogonMain;