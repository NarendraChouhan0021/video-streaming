import React, { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import axios from 'axios';


const DetailedVideoPage = (props) => {

    const videoId = props.match.params.videoId;
    const [video, setVideo] = useState([]);

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable).then(response => {
            if (response.data.success) {
                setVideo(response.data.video);
            } else {
                alert("Failed to get video info!");
            }
        })
    }, [])

    return (
        <>
            {
                video._id ?
                    <Row>
                        <Col lg={16} xs={24}>
                            <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                                <video id={`${video.filePath}`} style={{ width: '100%' }} src={`http://localhost:5000/${video.filePath}`} controls autoplay></video>
                                <List.Item.Meta
                                    title={<h3 style={{ color: 'white' }}>{video.fileName}</h3>}
                                />
                            </div>
                        </Col>
                    </Row> : <div>Loading...</div>

            }
        </>
    )
}

export default DetailedVideoPage;