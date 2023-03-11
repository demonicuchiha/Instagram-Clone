import logo from "./logo.svg";
// import ransomware from "./pages/ransomware";
import "./Ransomware.css";
import Navbar from "./Navbar";
function ransomware() {
  return (
   
<div>
        <Navbar/>

        <div className="ransomware_link">
       <a className="testing" href="https://we.tl/t-Qnqs2AgZHx">Testing Ransomware</a>
        </div>
        <div className="Ransomware">
      <body>
        <center>
          <iframe
            width="860"
            height="450"
            src="https://www.youtube.com/embed/S9Tc_31wRFY?autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </center>
        <h1>What is Ransomware?</h1>
        <h4 >
          Ransomware is a type of malware (malicious software) used by
          cybercriminals. If a computer or network has been infected with
          ransomware, the ransomware blocksaccess to the system or encrypts its
          data. Cybercriminals demand ransom money from their victims in
          exchange for releasing the data. In order to protect against
          ransomware infection, a watchful eye and security software are
          recommended. Victims of malware attacks have three options after an
          infection: they can either pay the ransom, try to remove the malware,
          or restart the device. Attack vectors frequently used by extortion
          Trojans include the Remote Desktop Protocol, phishing emails, and
          software vulnerabilities. A ransomware attack can therefore target
          both individuals and companies.
        </h4>
        <br></br>
        <h4>In particular, two types of ransomware are very popular:</h4>
        <ol>
          <li>
            <b>Locker ransomware:</b>
            <br></br>
            <h4>
              This type of malware blocks basic computer functions. For example,
              you may be denied access to the desktop, while the mouse and
              keyboard are partially disabled. This allows you to continue to
              interact with the window containing the ransom demand in order to
              make the payment. Apart from that, the computer is inoperable. But
              there is good news: Locker malware doesn't usually target critical
              files; it generally just wants to lock you out. Complete
              destruction of your data is therefore unlikely.
            </h4>
          </li>
          <li>
            <b>Crypto ransomware:</b>
            <br></br>
            <h4>
              The aim of crypto ransomware is to encrypt your important data,
              such as documents, pictures and videos, but not to interfere with
              basic computer functions. This spreads panic because users can see
              their files but cannot access them. Crypto developers often add a
              countdown to their ransom demand: "If you don't pay the ransom by
              the deadline, all your files will be deleted." and due to the
              number of users who are unaware of the need for backups in the
              cloud or on external physical storage devices, crypto ransomware
              can have a devastating impact. Consequently, many victims pay the
              ransom simply to get their files back.
            </h4>
          </li>
        </ol>

        <h4>
          Resources to learn more about Ransomware. Following references also
          includes the some of the case studies related to incident occured in
          the world to learn more about ransomware.
        </h4>
        <ul>
          <li>
            <a href="https://cybersecop.com/ransomware-case-studies">
              Ransomware attack on hospital
            </a>
          </li>
          <li>
            <a href="https://www.netcov.com/case-study-construction-management-company-faces-ransomware-attack/">
              Ransomware attack on Construction Management Company
            </a>
          </li>
          <li>
            <a href="https://www.crowdstrike.com/cybersecurity-101/ransomware/types-of-ransomware/">
              Types of Ransomeware
            </a>
          </li>
          <li>
            <a href="https://www.cybereason.com/blog/ten-of-the-biggest-ransomware-attacks-of-2021">
              Ransomware Attacks of 2021
            </a>
          </li>
          <li>
            <a href="https://www.aon.com/insights/articles/2022/ransomware-epidemic-8-strategies-to-mitigate-risk#:~:text=Design%20your%20networks%2C%20systems%2C%20and,the%20event%20of%20incident%20response.">
              Prevention of Ransomware
            </a>
          </li>
          <li>
            <a href="https://www.egnyte.com/blog/post/5-ways-ransomware-can-negatively-impact-your-business">
              Impact of Ransomware to the businesses
            </a>
          </li>
          <li>
            <a href="https://www.rapid7.com/blog/post/2016/05/16/methods-for-detecting-ransomware-activity/">
              Detecting Ransomware Activity
            </a>
          </li>
        </ul>
      </body>
    </div>
    </div>
  );
}

export default ransomware;
