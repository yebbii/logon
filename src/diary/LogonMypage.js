import React, { Component, useState } from 'react';
import './logonMain.css';
import axios from 'axios';
import { useEffect } from 'react';
import { HiOutlineInformationCircle } from "react-icons/hi";

const LogonMypage = (props) => {
    const [name, setName] = useState('');
    const [moodData, setMoodData] = useState([]);

    const { editingTitle } = props;

    // 서버에서 이름 받아오기 
    useEffect(() => {
        console.log(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/name`);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/name`)
            .then((res) => {
                setName(res.data)
                console.log(res.data);
                props.editingTitle();
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 이름 수정 
    //{ 핸들러 }  input 텍스트 업데이트 해주는 핸들러 //필요한 핸들러인지는 모르겠음 삭제가 가능하다면 삭제 필요(왜? onBlur와 중복되는 기능 같음) 
    //onChange 이벤트 사용 (id: goalId, e: e.target.value)
    const handlerChange = (e) => { setName(e); props.setName(e); };

    //[++수정후 핸들러++] { 핸들러 }포커스 아웃 되면 put으로 입력되게 updateGoal api요청 필요
    //포커스 아웃은 onBlur 이벤트를 사용 (id: goalId, e: e.target.value)
    const handlerInputFocusOut = async (e) => {
        // 이름이 5글자 이하인 경우에만 수정 요청 보내기
        if (e.length <= 5) {
            //Todos 내용 중에 받아온 id와 일치하는 goal객체를 수정 반영
            let update = [...name];
            const index = update.findIndex(item => item.nameId === 1);
            update[index] = { ...update[index], nameTitle: e };

            //서버에 보낼 RequestBody 데이터 지정( 멤버ID, 목표내용, 목표상태, 목표날짜 )
            const data = {
                nameId: 1,
                nameTitle: name
            };

            //서버에 put으로 수정 요청
            console.log(data);
            axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/name`, data)
                .then(response => {
                    console.log(response.data);
                    if (response.data === 1) {
                        console.log('수정완료');
                        props.setName(update);

                    } else {
                        console.log('수정실패');
                        return;
                    }
                }).catch(error => console.log(error));
        } else {
            // 이름이 6글자 이상인 경우 alert 창 띄우기
            alert('이름은 5글자 이하로만 입력해주세요.');
            window.location.reload();

        }
    };

    // 무드 카운트 
    useEffect(() => {
        // 서버에서 mood 데이터 가져오기
        
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/${props.day}`)
            .then(response => {
                // mood_id 값만 추출하여 새로운 배열 생성
                const moodId = response.data.map(item => item.moodId);
                setMoodData(moodId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [props.day]);

    // 무드 카운트 식 저장
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
                    <div className='myName-box'>
                        {props.isEditing ?
                            <>
                                <input type="text" className="editname" value={name} onBlur={(e) =>
                                    handlerInputFocusOut(e.target.value)}
                                    onChange={e => handlerChange(e.target.value)} placeholder=""></input>
                            </>
                            :
                            <input type="text" className="editname" value={name} onBlur={(e) =>
                                handlerInputFocusOut(e.target.value)}
                                onChange={e => handlerChange(e.target.value)} placeholder="" readOnly></input>
                        }
                        <div className='infoTip-box'>
                            <HiOutlineInformationCircle id='name-infoTip'
                                title='글자를 클릭해 바로 이름을 수정 할 수 있습니다.
                        단, 이름은 5글자 이하로 설정 가능하며 메인페이지에서만 수정 가능합니다.' />
                        </div>
                        <span className='my-title'>의 하루✿'◡'✿</span>
                    </div>
                    <div className='myProfilImg'></div>
                    <div className='count-box'>
                        <h1>내가 쌓은 기록</h1> <br /> <p className='total-count'>{totalCount}</p>
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
export default React.memo(LogonMypage);