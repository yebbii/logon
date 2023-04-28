import axios from "axios";
import { useState, useEffect } from "react";
import LogonMypage from "./LogonMypage";
import './logonMain.css';
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const LogonWrite = ({ history }) => {
    const [mood, setMood] = useState([{ "moodId": 1 }, { "moodId": 2 }, { "moodId": 3 }, { "moodId": 4 }, { "moodId": 5 }]);
    const [moodActive, setMoodActive] = useState(1);
    const [imgBase64, setImgBase64] = useState([]);
    const [imgBase, setImgBase] = useState([1]);
    const [imgFile, setImgFile] = useState([]);
    const [contents, setContents] = useState('');
    const [day, setDay] = useState('');
    
    const formatDate = (date) => {
        if (!date) {
            return null;
        }
        const day = ('0' + date.getDate()).slice(-2);
        return `${day}`;
    };

    const today = formatDate(new Date());
    console.log(today);

    const diaryDto = {
        moodId: moodActive,
        diaryContent: contents
    };

    // 기분 버튼 출력
    const moodList = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <>
                    <img className="mood-img"
                        key={mood[i].moodId}
                        src={mood[i].moodId == moodActive
                            ? `/img/moodC_${mood[i].moodId}.png`
                            : `/img/mood_${mood[i].moodId}.png`}
                        onClick={toggleMoodActive}
                        alt={mood[i].moodId} />
                </>
            );
        } return result;
    };

    // 기분 토글
    const toggleMoodActive = (e) => {
        e.preventDefault();
        setMoodActive(e.target.alt);
    };

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    // 파일첨부
    const formData = new FormData();

    const handleChangeFile = (e) => {
        const newImgBase = [1];
        // 1MB
        let maxSize = 1 * 1024 * 1024;
        setImgFile(e.target.files);
        setImgBase(newImgBase);
        setImgBase([]);

        if (e.target.files.length >= 2) {
            alert(`이미지는 1개만 업로드가 가능합니다.`);
            const newImgBase = [1];
            setImgBase(newImgBase);
            setImgBase64([]);
        } else {
            for (var i = 0; i < e.target.files.length; i++) {
                if (!e.target.files[i].type.match("image/.*")) {
                    alert("이미지 파일만 업로드가 가능합니다.");
                    return;
                } else if (e.target.files[i].size > maxSize) {
                    alert("이미지 크기는 1MB를 초과할 수 없습니다.");
                    return;
                } else if (e.target.files[i]) {
                    console.log(e.target.files[i].size);
                    let reader = new FileReader();
                    // 1. 파일을 읽어 버퍼에 저장합니다.
                    reader.readAsDataURL(e.target.files[i]);
                    // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                    reader.onloadend = () => {
                        const base64 = reader.result;
                        newImgBase.pop();

                        if (base64) {
                            var base64Sub = base64.toString();
                            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
                            setImgBase(newImgBase);
                        }
                    };
                }
            }
        };
    };

    formData.append(
        "data",
        new Blob([JSON.stringify(diaryDto)], { type: "application/json" })
    );
    Object.values(imgFile).forEach((file) => formData.append("files", file));

    // 제출버튼 
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/write`);
        axios({
            method: 'post',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/write`,
            data: formData,
            headers: {
                "Content-Type": `multipart/form-data;`
            },
        })
            .then((response) => {
                console.log(response);
                if (response.data.count === 1) {
                    alert(`정상적으로 등록되었습니다.`);
                    history.push('/');
                };
            })
            .catch(error => {
                console.log(formData);
                console.log(error);
            })
    }



    return (
        <>
            <LogonMypage />
            <div className="write-container">
                <div id='writeback-box'>
                    <div className="write-today">
                        <p>Day{today}</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="write-box">
                            <div className="write-mood">
                                <div className="mood-title">오늘의 기분은?</div>
                                {moodList()}
                            </div>


                            <textarea className="write-content"
                                placeholder="오늘을 Log 해주세요:)"
                                value={contents}
                                onChange={changeContents}>
                            </textarea>

                            <div className="write-footer">
                                <input className="fileBox" type='file' id='file' onChange={handleChangeFile} />
                            </div>

                            <input className='submit-write' type='submit' value='하루기록' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LogonWrite;