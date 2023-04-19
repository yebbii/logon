import React, { Component, useState } from 'react';

import './logonMain.css';
import axios from 'axios';
import { useEffect } from 'react';

const LogonMypage = () => {
    const [name, setName] = useState('나비');
    
    // console.log(moodId);
    // const { diaryId } = match.params;
    const [ moodData, setMoodData] = useState([]);
    // const [ countMood, setCountMood ] = useState([]);

    useEffect(() => {
    // 서버에서 mood 데이터 가져오기
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon`)
            .then(response => {
                // mood_id 값만 추출하여 새로운 배열 생성
                const moodId = response.data.map(item => item.moodId);
                setMoodData(moodId);
                console.log(moodData)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const totalCount = moodData.length;
    const count1 = moodData.filter((id) => id === 1).length;
    const count2 = moodData.filter((id) => id === 2).length;
    const count3 = moodData.filter((id) => id === 3).length;
    const count4 = moodData.filter((id) => id === 4).length;
    const count5 = moodData.filter((id) => id === 5).length;


    return (
        <>
            <div className='main-container'>
                <div className='mypage'>
                    <span>{name}님의 일기장 입니다</span>
                    <div className='myProfilImg'></div>
                    <div className='count-box'>
                        <h1>내가 쌓은 기록 <br/> {totalCount}</h1>
                        <div className='mood-box'>
                            <div className='mood_1'></div> <p>{count1}</p>
                        </div>
                        <div className='mood-box'>
                            <div className='mood_2'></div> <p>{count2}</p>
                        </div>
                        <div className='mood-box'>
                            <div className='mood_3'></div> <p>{count3}</p>
                        </div>
                        <div className='mood-box'>
                            <div className='mood_4'></div> <p>{count4}</p>
                        </div>
                        <div className='mood-box'>
                            <div className='mood_5'></div> <p>{count5}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

};
export default LogonMypage;