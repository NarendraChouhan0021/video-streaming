import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

const LandingPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('api/video/getVideos').then(response => {
            if (response.data.success) {
                setVideos(response.data.videos);
            } else {
                alert("Failed to retrieve videos");
            }
        })
    }, [])

    const renderCards = videos.map((video, index) => {
        const minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return (
            <Col lg={6} md={8} xs={24} style={{ paddingBottom: '25px' }}>
                <div style={{ position: "relative" }}>
                    <a href={`/video/${video._id}`}>
                        <img style={{ width: "100%" }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                        <div className="duration"
                            style={{
                                bottom: 0, right: 0, position: 'absolute', margin: '4px',
                                color: '#fff', backgroundColor: 'rgba(17,17,17,0.8)', opacity: 0.8,
                                padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px',
                                fontSize: '12px', fontWeight: '500', lineHeight: '12px'
                            }}>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div><br />
                <Meta
                    title={<h4 style={{ color: 'white' }}>{video.fileName}</h4>}
                    style={{ color: 'rgb(255,255,255)' }}
                />
                <span style={{ color: 'rgb(179,179,179)' }}>{moment(video.createdAt).format("MMM DD YYYY")}</span>
            </Col>
        )
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} style={{ color: 'rgb(253, 253, 253)' }}> List Of Videos </Title>
            <hr style={{ borderColor: 'rgb(40,40,40)' }} />
            <Row gutter={16} style={{ paddingTop: '30px' }}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
