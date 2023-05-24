import axios from "axios";
import { useState } from "react";
import LogonMypage from "./LogonMypage";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import './logonMain.css';
import Swal from "sweetalert2";

const LogonDetail = ({ match, history }) => {
    const [diary, setDiary] = useState({});
    const [contents, setContents] = useState('');
    const [name, setName] = useState('');
    const [mood, setMood] = useState('');
    const [day, setDay] = useState('');

    const image = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getImage/` + diary.diaryImg;
    const diaryid = match.params.diaryid;

    //  일기 내용 받아오기 
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/page/${diaryid}`)
            .then(response => {
                setDiary(response.data.diaryDto);
                setContents(response.data.diaryDto.diaryContent);
                setMood(response.data.diaryDto.moodId);
                setName(response.data.name);

                // 작성날짜 잘라서 출력 저장
                const datetime = response.data.diaryDto.createDt;
                setDay(datetime.substring(0, 10));

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

    const handlerOnClickUpdate = () => {
        Swal.fire({
            title: '기록을 수정 하시겠습니까?? ✦‿✦',
            showCancelButton: true,
            confirmButtonText: '네',
            cancelButtonText: '아니오',
            width: 620,
            padding: '60px 0px'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/page/${diaryid}`, { "diaryContent": contents })
                    .then((response) => {
                        if (response.data === 1) {
                            Swal.fire({
                                title: '기록이 수정 되었습니다 ‧˚₊*̥(* ⁰̷̴͈꒳⁰̷̴͈ )‧˚₊*̥',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                title: '수정에 실패했습니다\n다시 시도해주세요 Σ(‘◉⌓◉’)',
                                showConfirmButton: false,
                                width: 1000,
                                timer: 1500
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            text: '수정에 실패했습니다\n다시 시도해주세요 Σ(‘◉⌓◉’)',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };

    // 일기 삭제 이벤트 핸들러
    const handlerOnClickDelete = () => {
        Swal.fire({
            title: '정말 삭제 하실 건가요? (⑉･̆⌓･̆⑉)',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '네',
            cancelButtonText: '아니오',
            width: 600,
            padding: '40px 0px'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/page/${diaryid}`)
                    Swal.fire({
                        title: '하루 기록이 삭제 되었습니다 ⁎●᷄⩊●᷅⁎',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.push(`/`);
                } else if (result.isDenied) {
                    Swal.fire({
                        title: '삭제에 실패했습니다\n다시 시도해주세요 Σ(‘◉⌓◉’)',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: '삭제에 실패했습니다\n다시 시도해주세요 Σ(‘◉⌓◉’)',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    return (
        <>
            <LogonMypage day={day} />

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
                                    <span className="write_day">{day}</span>
                                    <span>{moodImg(mood)}</span>
                                </div>

                                <textarea className='dairy-Contents'
                                    value={contents}
                                    onChange={hanlderChangeContents} ></textarea>
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