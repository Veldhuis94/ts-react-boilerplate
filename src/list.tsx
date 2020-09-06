import * as React from "react";

interface IFormProps { }
interface IFormState {
    email: string,
    passw: string,
    passw2: string,
    street: string,
    houseNum: number,
    city: string,
    postcode: string,
    errors: string[],
    valid8: boolean[],
    toggleView: boolean
}

export default class FirstForm extends React.Component<IFormProps, IFormState> {
    text: string;
    constructor(props: IFormProps) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            passw2: '',
            street: '',
            houseNum: null,
            city: 'Rotterdam',
            postcode: '',
            errors: ['', '', '', '', '', ''],
            valid8: [false, false, false, false, false, true, false],
            toggleView: false
        };
    }
    printSubmitShit(event: any) {
        this.text = ""
    }
    setStuff(stateToSet: "email" | "passw" | "passw2" | "street" | "city" | "postCode", value: string) {
        if (stateToSet == "email") {
            this.setState({ ... this.state, email: value })
            const regex: RegExp = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
            if (regex.test(value)) {
                this.state.errors[0] = ''
                this.state.valid8[0] = true
            } else {
                this.state.errors[0] = "Invalid email address."
                this.state.valid8[0] = false
            }
        }
        else if (stateToSet == "passw") {
            this.setState({ ... this.state, passw: value })
            const regex: RegExp = new RegExp(/[\x00-\x7F]{7,}/g)
            if (regex.test(value)) {
                this.state.errors[1] = ''
                this.state.valid8[1] = true
            } else {
                this.state.errors[1] = "Password must be longer than 7 characters."
                this.state.valid8[1] = false
            } if (value != this.state.passw2 && this.state.passw2 != "") {
                this.state.errors[2] = 'Passwords are not equal.'
                this.state.valid8[2] = false
            }
        } else if (stateToSet == 'street') {
            this.setState({ ... this.state, street: value })
            if (value != '') {
                this.state.valid8[3] = true
                this.state.errors[3] = ''
            } else {
                this.state.valid8[3] = false
                this.state.errors[3] = 'Please enter a street name.'
            }
        } else if (stateToSet == 'passw2') {
            this.setState({ ... this.state, passw2: value })
            const regex: RegExp = new RegExp(/[\x00-\x7F]{7,}/g)
            if (value != this.state.passw) {
                this.state.errors[2] = 'Passwords are not equal.'
                this.state.valid8[2] = false
            } else if (regex.test(value)) {
                this.state.errors[2] = ""
                this.state.valid8[2] = true
            } else {
                this.state.errors[2] = "Password must be longer than 7 characters."
                this.state.valid8[2] = false
            }
        } else if (stateToSet == 'city') {
            if (['Rotterdam', 'Amsterdam', 'The Hague', 'Utrecht', 'Anywhere Else'].includes(value)) {
                this.setState({ ... this.state, city: value })
            } else {
                this.state.valid8[5] = false
                console.log('what the fuck')
            }
        } else if (stateToSet == 'postCode') {
            this.setState({ ... this.state, postcode: value })
            const regex: RegExp = new RegExp(/[0-9]{4}[A-Za-z]{2}/g)
            if (regex.test(value)) {
                this.state.errors[5] = ''
                this.state.valid8[5] = true
            } else {
                this.state.errors[5] = 'Please enter a valid zipcode.'
                this.state.valid8[5] = false
            }
        }
        else {
            console.log("Something went horribly wrong.")
        }
    }
    setNum(value: number) {
        this.setState({ ... this.state, houseNum: value })
        if (value) {
            this.state.valid8[4] = true
            this.state.errors[4] = ''
        } else {
            this.state.valid8[4] = false
            this.state.errors[4] = 'Please enter a house number.'
        }
    }
    toggleAccept() {
        this.state.valid8[6] = !this.state.valid8[6]
        this.forceUpdate()
    }
    render() {
        return (
            <div>
                <form autoComplete="off">
                    <label>
                        E-mail:<br />
                        <input type="text" value={this.state.email} name="email" onChange={e => this.setStuff("email", e.currentTarget.value)} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors[0]}</span>
                    </label>
                    <label>
                        <br />Password:<br />
                        <input type={this.state.toggleView ? "text" : "password"} value={this.state.passw} name="pw" onChange={e => this.setStuff("passw", e.currentTarget.value)} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors[1]}</span>
                    </label><br />
                    <label>
                        <input type="checkbox" defaultChecked={false} onChange={() => this.setState({ ... this.state, toggleView: !this.state.toggleView })} />
                        <span>View password</span><br />
                    </label>
                    <label>
                        <br />Confirm password:<br />
                        <input type='password' value={this.state.passw2} name="confirmpw" onChange={e => this.setStuff("passw2", e.currentTarget.value)} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors[2]}</span>
                    </label> <br />
                    <h3>Address and such</h3>
                    <label>
                        Street<br />
                        <input type='text' value={this.state.street} name='street' onChange={e => this.setStuff('street', e.currentTarget.value)} />
                        <br />
                        <span style={{ color: "red" }}>{this.state.errors[3]}</span>
                    </label>
                    <br />House number<br />
                    <input type="number" value={this.state.houseNum} name='housenum' onChange={e => this.setNum(e.currentTarget.valueAsNumber)} />
                    <br />
                    <span style={{ color: "red" }}>{this.state.errors[4]}</span>
                    <label>
                        <br />City<br />
                        <select value={this.state.city} onChange={e => this.setStuff('city', e.currentTarget.value)}>
                            <option value='Rotterdam'>Rotterdam</option>
                            <option value='Amsterdam'>Amsterdam</option>
                            <option value='The Hague'>The Hague</option>
                            <option value='Utrecht'>Utrecht</option>
                            <option value='Anywhere Else'>Anywhere Else</option>
                        </select><br />
                    </label>
                    <label>
                        <br />Zipcode<br />
                        <input type="text" value={this.state.postcode} onChange={e => this.setStuff("postCode", e.currentTarget.value)} /><br />
                        <span style={{ color: "red" }}>{this.state.errors[5]}</span>
                    </label>
                    <label><br />
                        <input type="checkbox" defaultChecked={false} onChange={() => this.toggleAccept()} />
                        <span>I agree to the terms and conditions and shit.</span><br />
                    </label>
                    <br />
                    <button disabled={!(this.state.valid8.every(Boolean))} onClick={() => console.log("This form doesn't really do anything though.")}>Submitteur</button>
                </form>
            </div>
        )
    }
}