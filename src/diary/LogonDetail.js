const LogonDetail = () => {
    // moodId에 따라 moodImg 설정
    const moodImg = (mood) => {
        if (mood == 1) { return <img className="mood_detail"src={`/img/moodC_1.png`} /> }
        else if (mood == 2) { return <img className="mood_detail" src={`/img/moodC_2.png`} /> }
        else if (mood == 3) { return <img className="mood_detail" src={`/img/moodC_3.png`} /> }
        else if (mood == 4) { return <img className="mood_detail" src={`/img/moodC_4.png`} /> }
        else if (mood == 5) { return <img className="mood_detail" src={`/img/moodC_5.png`} /> }
    };

    const hanlderChangeContents = (e) => {
        setContents(e.target.value);
    };

    // 내용 수정 이벤트 핸들러
    const handlerOnClickUpdate = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/${diaryId}`,
                    { "diaryContent": contents })
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 수정되었습니다.`);
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
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comon/logon/${diaryId}`)
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 삭제되었습니다.`);
                    history.push(`/comon/logon`);
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
        
        </>
    )
}

export default LogonDetail;