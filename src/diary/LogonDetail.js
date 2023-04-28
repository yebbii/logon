import axios from "axios";
import { useState } from "react";
import LogonMypage from "./LogonMypage";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

//import { useHistory } from "react-router-dom";
import './logonMain.css';

const LogonDetail = ({ match, history }) => {
    const [diary, setDiary] = useState({});
    const [contents, setContents] = useState('');
    const [name, setName] = useState('');
    const [mood, setMood] = useState('');
    const [date, setDate] = useState('');
    const image = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getImage/` + diary.diaryImg;
    const diaryid = match.params.diaryid;

    //  일기 내용 받아오기 
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/page/${diaryid}`)
            // axios.get(`http://localhost:8080/api/comon/logon/page/4`)
            .then(response => {
                console.log(response.data);
                setDiary(response.data.diaryDto);
                setContents(response.data.diaryDto.diaryContent);
                setMood(response.data.diaryDto.moodId);
                setName(response.data.name);

                // 작성날짜 잘라서 출력 저장
                const datetime = response.data.diaryDto.createDt;
                setDate(datetime.substring(0, 10));
            })
            .catch(error => console.log(error));
    }, []);

    // moodId에 따라 moodImg 설정
    const moodImg = (mood) => {
        if (mood == 1) { return <img className="mood_detail" src={`/img/moodC_1.png`} /> }
        else if (mood == 2) { return <img className="mood_detail" src={`/img/moodC_2.png`} /> }
        else if (mood == 3) { return <img className="mood_detail" src={`/img/moodC_3.png`} /> }
        else if (mood == 4) { return <img className="mood_detail" src={`/img/moodC_4.png`} /> }
        else if (mood == 5) { return <img className="mood_detail" src={`/img/moodC_5.png`} /> }
    };

    // 메인으로 이동 
    const handlerGoMain = () => {
        history.push(`/`)
    }

    // 글 수정
    const hanlderChangeContents = (e) => {
        setContents(e.target.value);
    };

    // 내용 수정 이벤트 핸들러
    const handlerOnClickUpdate = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/page/${diaryid}`,
            { "diaryContent": contents })
            .then((response) => {
                if (response.data === 1) {
                    alert(`정상적으로 수정되었습니다.`);
                    window.location.reload();
                } else {
                    alert(`수정에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(contents);
                console.log(error);
                alert(`수정에 실패했습니다.`);
                return;
            })
    };

    // 일기 삭제 이벤트 핸들러
    const handlerOnClickDelete = () => {
        console.log(diary);
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/page/${diaryid}`)
            .then((response) => {
                if (response.data === 1) {
                    alert(`정상적으로 삭제되었습니다.`);
                    history.push(`/`);
                } else {
                    alert(`삭제에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                alert(`삭제에 실패했습니다.`);
                return;
            })
    };


    return (
        <>
            <LogonMypage />

            <div className="detail_container">
                <div id="detail-box">
                    <div className="name-box">
                        <span className="name">{name}'s Log: ON</span>
                        <button className="close-btn"> <FiX id="closeicon" onClick={handlerGoMain} /></button>
                    </div>
                    <div className="close-btn"></div>
                    <div className="contents-container">
                        <div className="contents-box">
                            <img className="diary-img" src={image} />
                            <div className="diary-box">
                                <div className="diary-header">
                                    <span className="write_day">{date}</span>
                                    <span>{moodImg(mood)}</span>
                                </div>

                                <textarea className='dairy-Contents' value={contents} onChange={hanlderChangeContents} ></textarea>
                            </div>
                        </div>
                        <div className="bottom">
                            <button className="update-btn" onClick={handlerOnClickUpdate} >연필</button>
                            <button className="delete-btn" onClick={handlerOnClickDelete} >휴지통</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LogonDetail;