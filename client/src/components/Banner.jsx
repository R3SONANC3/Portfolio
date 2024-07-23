import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import HeadingImg from '../assets/home.png';
import { motion } from 'framer-motion';

function Banner() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const toRotate = ["Web Developer", "Web Designer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return (
        <section className='banner' id='home'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className='tagline'>Welcome to my Portfolio</span>
                            <h1>{`Hi, I'm `}<span className='highlight'>Jeerapat</span></h1>
                            <h2 className='txt-rotate'>
                                <span className='wrap'>{text}<span className='cursor'>&#8203;</span></span>
                            </h2>
                            <p>Passionate about creating beautiful and functional web experiences. I specialize in front-end development and UI/UX design, bringing ideas to life through code and creativity.</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='connect-btn'
                                onClick={() => console.log('connect')}
                            >
                                Let's connect <ArrowRightCircle size={25} />
                            </motion.button>
                        </motion.div>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <motion.img
                            src={HeadingImg}
                            alt='Header Img'
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='astronaut-img'
                        />
                    </Col>
                </Row>
            </Container>
            <div className='space-objects'>
                <div className='planet planet-1'></div>
                <div className='star star-1'></div>
                <div className='shooting-star'></div>
            </div>
        </section>
    )
}

export default Banner;
