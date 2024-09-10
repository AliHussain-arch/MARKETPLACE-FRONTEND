import github_icon from '/github_icon.svg';
import linkedin_icon from '/linkedin_icon.svg';

export default function About() {
  return (
    <div className="content">
      <section className="AboutSection">
        <div className="About">
            <h1>About this Website</h1>
            <p>This is a website built in MERN stack to serve as a capstone project for the General Assembly Software Engineering Immersive.</p>
            <p>It serves as a proof of concept for an antique marketplace e-commerce web application.</p>
            <h2>This website was created by:</h2>
            <div className="AboutMe">
              <h3>Ali Hussain</h3>
              <a className="social-button" href="https://github.com/AliHussain-arch" target="_blank"><img src={github_icon}></img></a>
              <a className="social-button" href="https://www.linkedin.com/in/alihussaindeveloper/" target="_blank"><img src={linkedin_icon}></img></a>
            </div>
            <div className="AboutMe">
              <h3>Ebrahim Khalil</h3>
              <a className="social-button" href="https://github.com/Ebrahim-COD" target="_blank"><img src={github_icon}></img></a>
              <a className="social-button" href="https://www.linkedin.com/in/ebrahimkhalilramadhan/" target="_blank"><img src={linkedin_icon}></img></a>
            </div>
            <div className="AboutMe">
              <h3>Jaber Buhussayyen</h3>
              <a className="social-button" href="https://github.com/StoicTylerDurden" target="_blank"><img src={github_icon}></img></a>
              <a className="social-button" href="https://www.linkedin.com/in/jaber-buhussayyen/" target="_blank"><img src={linkedin_icon}></img></a>
            </div>
            <div className="AboutMe">
              <h3>Khalil Khunji</h3>
              <a className="social-button" href="https://github.com/KhalilKhunji" target="_blank"><img src={github_icon}></img></a>
              <a className="social-button" href="https://www.linkedin.com/in/khalilkhunji/" target="_blank"><img src={linkedin_icon}></img></a>
            </div>
        </div>
      </section>
    </div>
  );
};