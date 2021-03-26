import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'

export default function Index(props) {

  useEffect(() => {

    if (props.data.account) {
      setaccount(props.data.account)
    }
    if (props.data.email) {
      setemail(props.data.email)
    }
    if (props.data.postcode) {
      setpostcode(props.data.postcode)
    }

  }, [])

  const router = useRouter()
  // AUTH STATE
  const [account, setaccount] = useState("")
  const [postcode, setpostcode] = useState("")
  const [email, setemail] = useState("")
  const [isUser, setUser] = useState(false)
  const [isErro, setErro] = useState(false)

  const year = new Date().getFullYear()

  console.log(year);

  // SELECT STATE

  const [selectOption, setSelectOption] = useState('Electric')

  // GAS INFOMATION
  const today = moment();
  const [gasserial, setgasserial] = useState("");
  const [mprn, setmprn] = useState("");

  // ELEC INFORMATION
  const [elecserial, setelecserial] = useState("");
  const [mpan, setmpan] = useState("");

  // USER INPUT
  const [gas, setgas] = useState("")
  const [elec, setelec] = useState("")

  // AUTH
  const handleSubmit = (e) => {
    e.preventDefault()

    if (account && postcode && email) {
      axios.post(`https://api.core.green.energy/properties/${account}/no-token/meters`, {
        email: email,
        postcode: postcode
      }).then(res => {

        if (res.statusText === "OK") {
          setUser(true),
            setgasserial(res.data.data.gas[0].serial),
            setmprn(res.data.data.gas[0].mprn),
            setelecserial(res.data.data.electric[0].serial),
            setmpan(res.data.data.electric[0].mpan)
        }
      })
        .catch(err => {
          console.log(err)
          setErro(true)

        })
    }
  }

  // METER SUMBIT

  const electricSubmit = (e) => {
    e.preventDefault()
    console.log("electric submit");

    axios.post(`https://api.core.green.energy/properties/${account}/no-token/readings`, {
      email: email,
      postcode: postcode,
      type: "electric",
      reading: {
        mpan: mpan,
        date: today,
        value: elec,
        serial: elecserial,
        registerId: "1"
      }
    }).then(res => {
      console.log(res);
      router.push("/thanks")
    })

  }

  const gasSubmit = (e) => {
    e.preventDefault()

    axios.post(`https://api.core.green.energy/properties/${account}/no-token/readings`, {
      email: email,
      postcode: postcode,
      type: "gas",
      reading: {
        mprn: mprn,
        date: today,
        value: gas,
        serial: gasserial
      }
    }).then(res => {
      console.log(res);
      router.push("/thanks")
    })

  }

  return (
    <div className="root">
      <div className="container">

        <div className="header">

          <div className="logo">
            <a href="https://green.energy/">
              <img src="./greenLogo.png" alt="" className="logoPic" />
            </a>

            {/* <a className="signIn"
              href="https://members.green.energy/members/home"
            >Sign in</a> */}

            <a href="https://green.energy/">
              <img src="./sign.png" alt="" className="signPic" />
            </a>

          </div>

          <div className="titleBox">
            <h1>Submit meter reading</h1>
            <p>Keep your bills accurate</p>
          </div>
        </div>

        <div className="main">
          {
            !isUser &&
            <div className="auth">

              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="">Account Number * </label>
                <input type="text" name="account" value={account} onChange={(e) => setaccount(e.target.value)} required />
                <label htmlFor="">Supply Postcode * </label>
                <input type="text" name="postcode" value={postcode} onChange={(e) => setpostcode(e.target.value)} required />
                <label htmlFor="">Email on Account * </label>
                <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} required />
                <p className="error" style={{ display: isErro ? 'block' : 'none' }} > No Account found. Please check your details.</p>
                <button type="submit" className="submitBtn">Next</button>

              </form>
            </div>
          }

          {/* METER SUBMIT */}

          {
            isUser &&

            <div className="auth">

              <form>
                <select name="Select" value={selectOption} onChange={(e) => { setSelectOption(e.target.value) }}>
                  <option value="Electric">Electric</option>
                  <option value="Gas">Gas</option>
                </select>
              </form>

              {

                selectOption === "Electric" ?
                  <form className="elecForm">
                    <div className="info">
                      <label className="mpan">MPAN : {mpan}</label>
                      <label >Serial : {elecserial}</label>
                    </div>

                    <input type="number" name="elec" value={elec}
                      placeholder="Enter electric meter reading here..."
                      onChange={(e) => setelec(e.target.value)} />
                    <button className="submitBtn" onClick={electricSubmit}>
                      Submit meter reading
                    </button>
                  </form>

                  :
                  <form>
                    <input type="number" name="gas" value={gas}
                      placeholder="Enter gas meter reading here..."
                      onChange={(e) => setgas(e.target.value)} />
                    <button className="submitBtn" onClick={gasSubmit}>
                      Submit meter reading
                    </button>
                  </form>

              }

            </div>

          }

        </div>

        <div className="footer">
          <div className="logo">
            <img src="./logoGreen.svg" alt="" className="logoPic" />
          </div>

          <div className="appBtn">
            <h3>Download our mobile app.</h3>
            <div className="btnBox">
              <a href="https://apps.apple.com/us/app/green/id1454534817?ls=1">
                <img src="./ios.svg" className="ios" alt="" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=green.energy.app">
                <img src="./google.svg" className="google" alt="" />
              </a>

            </div>

          </div>

          <p>© {year} Green Supplier Limited</p>

        </div>

      </div>
    </div >)
}

Index.getInitialProps = async ({ query }) => {

  const account = query.account
  const postcode = query.postcode
  const email = query.email

  return {
    data: { account, postcode, email }
  }
}