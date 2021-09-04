import React, { useState } from 'react';
import { Typography, Button, Form, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;

const UploadVideoPage = (props) => {
    const [fileName, setfileName] = useState("");
    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnail, setThumbnail] = useState("");


    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            fileName: fileName,
            filePath: filePath,
            duration: duration['fileDuration'],
            thumbnail: thumbnail
        }

        axios.post('/api/video/uploadVideo', variables).then(response => {
            if (response.data.success) {
                alert("Video uploaded successfully!");
                props.history.push("/");
            } else {
                alert("Failed to upload video");
            }
        })
    }

    const onDrop = (files) => {
        setfileName(files[0]['name'])
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append('file', files[0]);
        axios.post('/api/video/uploadfiles', formData, config).then(response => {
            if (response.data.success) {
                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath);

                /* Create the thumbnail to display the uploaded video */
                axios.post('/api/video/thumbnail', variable).then(response => {
                    if (response.data.success) {
                        setDuration(response.data);
                        setThumbnail(response.data.thumbsFilePath);
                    } else {
                        alert("Failed to create the thumbnail");
                    }
                })
            } else {
                alert("Video failed to upload on server");
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} style={{ color: 'white' }}> Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid rgb(37, 141, 252)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem', color: 'rgb(37, 141, 252)' }} />

                            </div>
                        )}
                    </Dropzone>

                    {thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                        </div>
                    }
                </div>

                <br /><br />
                <label style={{ color: 'rgb(179,179,179)' }}>FileName</label>
                <Input
                    disabled
                    value={fileName}
                />
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    );
}

export default UploadVideoPage;