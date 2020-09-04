import * as React from "react";

interface IFormProps{}
interface IFormState{
    email:string,
    passw:string,
    passw2:string,
    text: string,
    errors: string[]
    valid8: boolean[]
}

export default class List extends React.Component<IFormProps, IFormState> {
    text: string;
    constructor(props: IFormProps) {
        super(props);
        this.text = 'the edditted tekst has not yet been performed.. hah..'; 
        this.state = {
            email: '',
            passw: '',
            passw2: '',
            text: '',
            errors: ['','',''],
            valid8: [false,false,false]
        };
    }
    printSubmitShit(event: any) {
        this.text = ""
    }
    setStuff(stateToSet: "email" | "passw" | "passw2", value:string) {
        if (stateToSet == "email") {
            this.setState({... this.state, email:value})
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
            this.setState({... this.state, passw: value})
            const regex: RegExp = new RegExp(/[\x00-\x7F]{7,}/g)
            if (regex.test(value)) {
                this.state.errors[1] = ''
                this.state.valid8[1] = true
            } else {
                this.state.errors[1] = "Password must be longer than 7 characters."
                this.state.valid8[1] = false
            }
        }
        else {
            this.setState({... this.state, passw2:value})
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
        }
    }
    render() {
        return(
            <div>
                <form autoComplete="off">
                    <label>
                        E-mail:<br/>
                        <input type="text" value={this.state.email} name="email" onChange={e => this.setStuff("email", e.currentTarget.value)} />
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors[0]}</span>
                    </label>
                    <label>
                        <br/>Password:<br/>
                        <input type="password" value={this.state.passw} name="pw" onChange={e => this.setStuff("passw", e.currentTarget.value)}/>
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors[1]}</span>
                    </label>
                    <label>
                        <br/>Confirm password:<br/>
                        <input type="password" value={this.state.passw2} name="confirmpw" onChange={e => this.setStuff("passw2", e.currentTarget.value)}/>
                        <br/>
                        <span style={{color: "red"}}>{this.state.errors[2]}</span>
                    </label>
                    <br/>
                    <button disabled = {!(this.state.valid8[0] && this.state.valid8[1] && this.state.valid8[2])} onClick={e => this.setState({... this.state, text: "This form doesn't really do anything though."})}>Submitteur</button>
                </form>
                <p>{this.state.text}</p>
            </div>
        )
    }
}