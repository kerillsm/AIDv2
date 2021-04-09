import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const AboutUs = () => {
  return (
  <div  className = "terms">
    <div>
	  <div className = "logo">
    <center>
	<h2>Abount AI.Decider</h2>
    <h3>AI.Decider technology stack</h3>
  <figure id = "imgLogo">
    <img src="/img/nodejs_logo.png" width="150px"></img>
  </figure>
  <figure id = "imgLogo">
    <img src="/img/webpack_logo.png" width="150px"></img>
  </figure>
  <figure id = "imgLogo">
    <img src="/img/mongodb_logo.png" width="150px"></img>
  </figure>
  <figure id = "imgLogo">
    <img src="/img/react_logo.png" width="250px"></img>
  </figure>
  </center>
</div>
	                                          <Carousel showStatus={false} autoPlay infiniteLoop transitionTime={700} showThumbs={false}>
										     <div>
                                                <img src="/img/header.jpg" alt="AI.Decider - intelligent decision maker!" />
                                            </div>		
                                            <div>
                                                <img src="/img/slide1.png" alt="AI.Decider features: decision sliders" />
                                            </div>
                                            <div>
                                                <img src="/img/slide2.png" alt="AI.Decider features: SMATRT goals setting" />
                                            </div>											
                                            <div>
                                                <img src="/img/slide3.png" alt="AI.Decider features: books and movies suggestion" />
                                            </div>
                                            <div>
                                                <img src="/img/slide4.png" alt="AI.Decider features: Pros and Cons multi-options decision" />
                                            </div>		
                                        </Carousel>
      <p>
        Enough random decision makers, coin flips and 8-ball asking, it is time to improve quality of your decisions!
        Just type your decision options, define important factors and use sliders to weight impact of factors on your decision options.
        Predefined decision maps such as Yes/No question, Picking Name for your Baby or selecting suitable Investment Instruments and many more are available in the navigation menu for your convenience.
      </p>
      <p>
        AI.Decider is a decision making application with huge knowledge base and machine self-learning algorithms, developed for iOS and Android platforms.
        It will enrich your decisions with facts, suggestions and additional key decision factors based on your profile, previous decisions and intelligent knowledge modules.
        User-friendly interface will improve your decision experience with quick and reliable controls.
      </p>
      <h3>You deserve better decisions!</h3>
      <p>
        Our life can be represented as a long chain of decisions, we are making decisions hundred times per week. Importance of decision quality was clear for business persons long time ago, huge amount of DSS Decision Support Systems were built in order to support top management activities.
        However, for our very own everyday complex needs we have only randomization tools at best. You deserve better than this, you deserve intelligent and educated self-learning tool with user-friendly interface and Big Data knowledge on the back end.
        And we are building this tool for you - welcome to the AI.Decider!
      </p>
      <ul>
        <li>Make SMART decidions anytime and anywhere</li>
        <li>Increase your productivity and improve systematic thinking</li>
        <li>Create and save new Decision Maps to made high quality decisions</li>
        <li>Use advanced analysis techniques transferred from business world for you</li>
        <li>Visualize your key options to get better decision experience</li>
        <li>Track your progress, evaluate your previous decisions and overall statistic</li>
        <li>Automatically adopt AI.Decider for your personal needs with each new decision using Machine Learning Intelligence</li>
        <li>Share your decisions and Decision Maps with friends and family within AI.Decider network or using emails</li>
        <li>Create GTD ToDo lists based on your decisions</li>
      </ul>
      <img src="/img/p1.jpg"></img>
      <h3>AI.Decider architecture</h3>
      <ul>
        AI.Decider is a mobile application, installed on your devices (iOS and Android platforms are supported), this is the best format for such powerful tool and it is always with you whenever you need it.
        Following three key design approaches form our great App:
        <li>Decision Knowledge Modules</li>
        <li>Decision Maps</li>
        <li>Machine Learning Intelligence</li>
      </ul>
      <img src="/img/p2.png"></img>
      <h3>AI.Decider features</h3>
      <ul>
        <li>Machine Learning Intelligence is the engine that will bring magic to your decisions. Utilizing self-learning algorithms and analyzing yours and community decisions, Knowledge Modules, Big Data statistics, this engine will suggest additional parameters, decision keys and valuable facts to be considered during decision making.</li>
        <li>Decision Knowledge Modules provide Big Data knowledge base for your decisions and cover main decision domains such as Travel, Career, Health, Finance, Social life, Sport, Hobbies etc. Modular structure allow us to cover knowledge areas independently and on demand based on your preferences. We even can build custom Decision Knowledge Module for you!</li>
        <li>Decision Maps represent special type of interfaces created to resolve different classes of decision. There are adopted Yes\No, Pros\Cons, SWOT, Prioritization maps, as well as highly specific user friendly controls. - ToDo list with GTD and scheduling functionality is another feature we would like to incorporate, ability to attach or transfer your decisions to the real tasks is very valuable functionality.</li>
      </ul>

      <img src="/img/p3.png"></img>
    </div>
    </div>
  )
}

export default AboutUs;
