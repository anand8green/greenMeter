import React, { useState } from 'react'
import axios from 'axios';
import moment from 'moment';

export default function index() {

  // AUTH STATE
  const [account, setaccount] = useState("")
  const [postcode, setpostcode] = useState("")
  const [email, setemail] = useState("")
  const [isUser, setUser] = useState(false)

  // SELECT STATE

  const [selectOption, setSelectOption] = useState('Electric')

  console.log(selectOption);

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

    axios.post(`https://api.core.green.energy/properties/${account}/no-token/meters`, {
      email: email,
      postcode: postcode
    }).then(res => {
      console.log(res)

      if (res.statusText === "OK") {
        setUser(true),
          setgasserial(res.data.data.gas[0].serial),
          setmprn(res.data.data.gas[0].mprn),
          setelecserial(res.data.data.electric[0].serial),
          setmpan(res.data.data.electric[0].mpan)
      }
    })
      .catch(err => console.log(err))
  }

  // METER SUMBIT

  const electricSubmit = (e) => {
    e.preventDefault()
    console.log("electric submit");

    // axios.post(`https://api.core.green.energy/properties/${account}/no-token/readings`, {
    //   email: email,
    //   postcode: postcode,
    //   type: "electric",
    //   reading: {
    //     mpan: mpan,
    //     date: today,
    //     value: elec,
    //     serial: elecserial,
    //     registerId: "1"
    //   }
    // })

  }

  const gasSubmit = (e) => {
    e.preventDefault()
    console.log("gas submit");

    // axios.post(`https://api.core.green.energy/properties/${account}/no-token/readings`, {
    //   email: email,
    //   postcode: postcode,
    //   type: "gas",
    //   reading: {
    //     mprn: mprn,
    //     date: today,
    //     value: gas,
    //     serial: gasserial
    //   }
    // })

  }

  return (
    <div>
      {
        !isUser &&
        <div className="auth">
          <h1>Welcome to Green</h1>
          <h4>Enter your details</h4>
          <form>
            <label htmlFor="">Account Number </label>
            <input type="text" name="account_number" value={account} onChange={(e) => setaccount(e.target.value)} />
            <label htmlFor="">Supply Postcode </label>
            <input type="text" name="postcode" value={postcode} onChange={(e) => setpostcode(e.target.value)} />
            <label htmlFor="">Email on Account </label>
            <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="submit" onClick={handleSubmit} />
          </form>
        </div>
      }

      {/* METER SUBMIT */}

      {
        isUser &&

        <div className="auth">
          <h1>Submit meter reading</h1>
          <h4>Keep your bills accurate</h4>

          <form>
            <select name="Select" value={selectOption} onChange={(e) => { setSelectOption(e.target.value) }}>
              <option value="Electric">Electric</option>
              <option value="Gas">Gas</option>
            </select>
          </form>

          {

            selectOption === "Electric" ?
              <form>

                <input type="number" name="elec" value={elec} onChange={(e) => setelec(e.target.value)} />
                <input type="submit" onClick={electricSubmit} />
              </form>

              :
              <form>

                <input type="number" name="gas" value={gas} onChange={(e) => setgas(e.target.value)} />
                <input type="submit" onClick={gasSubmit} />
              </form>

          }

        </div>

      }

    </div>
  )
}
