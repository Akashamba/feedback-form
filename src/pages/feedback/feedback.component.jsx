import React, {useState} from 'react';
import axios from 'axios';
import { Input, Button, Form, Rate } from 'antd';
import extractName from '../../utilities/website-name.js';
import './feedback.styles.css'

export default function Feedback({history, match}) {

    const website = extractName(match.params.website);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onFinish = (obj) => {
        obj.website = website; 
        obj.date = new Date();
        console.log(obj)
        setLoading(true);
        axios
        .post(`${process.env.REACT_APP_BACKEND}/feedback`, obj)
        .then(res => {
            console.log(res.data);
            setLoading(false);
            history.push('/feedback/completed')
        })
        .catch(err => console.log(err))
    }

    const onFinishFailed = (err) => {
        setError(err.errorFields[0].errors[0])
        // console.log(err.errorFields[0].errors[0])
    }

    return (
        <div>
        
            <br/>
            <h2>{website}</h2>
            <br/>

            <Form autoComplete={false} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} >

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your name',
                    },
                    ]}
                >
                    <Input autoComplete="off" size="large" placeholder="Name" />
                </Form.Item>

                <br/>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your Email Address',
                    },
                    {
                        type: "email",
                        message: 'Please enter a valid Email Address'
                    }
                    ]}
                >
                    <Input autoComplete="off" size="large" placeholder="Email" />
                </Form.Item>

                <br/>

                <Form.Item
                    label="How did you find this website?"
                    name="find"
                >
                    <Input size="large" placeholder="How did you find this website?" />
                </Form.Item>

                <br/>

                <Form.Item
                    label="How would you rate the website on a scale of 5?"
                    name="rating"
                >
                    <Rate/>
                </Form.Item>

                <br/>

                <Form.Item
                    label="What did you like about the website?"
                    name="good"
                >
                    <Input.TextArea size="large" placeholder="What did you like about the website?" />
                </Form.Item>

                <br/>

                <Form.Item
                    label="What can be improved?"
                    name="improvement"
                >
                    <Input.TextArea size="large" placeholder="What can be improved?" />
                </Form.Item>

                <br/>

                <Form.Item
                    label="Anything else?"
                    name="other"
                >
                    <Input size="large" placeholder="Anything else?" />
                </Form.Item>

                <br/>

                
                <Button type="primary" loading={loading} htmlType="submit">Submit</Button>
                <span className="error">{error}</span>
            </Form>
        </div>
    )
}