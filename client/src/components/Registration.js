import React, {Component} from 'react';

import jquery from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isAuthShown,login,checkAuth,register,registerUserRestriction,updateUserRestriction} from '../actions'
import toastr from "toastr";
import { Grid, Row, Col } from 'react-flexbox-grid';





class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            isRegistration:false,
            firstCheckbox:false,
            secondCheckbox:false
        }

    }

    handleOnChangeEmail = (e) =>{
        let email = e.target.value;
        this.setState({email});
    };

    handleOnChangePassword = (e) =>{
        let password = e.target.value;
        this.setState({password});
    };

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevProps.registerError !== this.props.registerError && this.props.registerError !== null ){
            toastr.error(this.props.registerError).toString()
        }
        if(prevProps.registerInfo !== this.props.registerInfo && this.props.registerInfo !== null){
            toastr.success(this.props.registerInfo).toString()
            this.props.registerUserRestriction(this.state.email)
        }
        if(prevProps.loginError !== this.props.loginError && this.props.loginError !== null){
            toastr.error(this.props.loginError).toString()
        }
        if(prevProps.loginInfo !== this.props.loginInfo && this.props.loginInfo !== null){
            toastr.success(this.props.loginInfo).toString()
            this.props.updateUserRestriction(this.state.email)
        }

    }
    firstOnChange = () =>{
        this.setState({
            firstCheckbox:!this.state.firstCheckbox
        })
    }
    secondOnChange = () =>{
        this.setState({
            secondCheckbox:!this.state.secondCheckbox
        })
    }


    render() {
        // console.log('Regis',this.state);
        const { isShown, appState } = this.props;
        const { isRegistration } = appState.state;

        const changeAuthStatus = () => {
            this.setState({
                isRegistration: !this.state.isRegistration
            })
        }




        let output;





        if (this.state.isRegistration) {
            output = (
					<div>
                    <h1>Create an account</h1>
                    <form name="registration">
					<div className="reginput">
                        <input type="email" name="email"  placeholder="Your Email"
                               onChange={(event)=>this.handleOnChangeEmail(event)}
                               value={this.state.email}
                        />
                        <input type="password" name="password"  placeholder="Your Password"
                               onChange={(event)=>this.handleOnChangePassword(event)}
                               value={this.state.password}
                        />
						</div>
						<div className={["eugdpr"]} >
                            <input  type="checkbox" id="terms" value="off" value={this.state.firstCheckbox} onClick={()=>this.firstOnChange()}  required />
                           <label  htmlFor="terms" >I agree to the <a href="http://aidecider.com/terms-of-service"  target="_blank">Terms of Service</a></label>


                        </div>
			<div className="eugdpr">
                <input  type="checkbox" id="EUGDPR" value={this.state.secondCheckbox} onClick={()=>this.secondOnChange()} required />
                <label   htmlFor="EUGDPR" >I am not EU Citizen or EU Resident or in the European Union</label>

            </div>
                    <button disabled={!(this.state.firstCheckbox && this.state.secondCheckbox)} onClick={()=>{this.props.register(this.state.email,this.state.password);this.props.isAuthShown(false);}}>Sign Up</button>

		             </form>
</div>

            );
        } else {
            output = (

                <div>

                    <h1>Sign In</h1>
                    <form name="login">
                        <input type="email" name="email" placeholder="Your Email"
                               onChange={(event)=>this.handleOnChangeEmail(event)}
                               value={this.state.email}
                        />
                        <input type="password" name="password" placeholder="Your Password"
                               onChange={(event)=>this.handleOnChangePassword(event)}
                               value={this.state.password}
                        />
                    </form>

                    <button onClick={()=>{this.props.isAuthShown(false);this.props.login(this.state.email,this.state.password);}}>Sign In</button>





                </div>

            );
        }

        return (
            <div className={`shadow ${isShown ? 'shown-shadow' : ''}`} onClick={() => this.props.isAuthShown(false)}>
                <div className={`auth-popup ${isShown ? 'shown-popup' : ''}`} onClick={e => e.stopPropagation()}>

                    <div className="check">
                        <a onClick={() => {
                            changeAuthStatus()
                        }}
                           className={`${!this.state.isRegistration ? 'active' : ""}`}>Sign In</a>
                        <a
                            onClick={() => changeAuthStatus()}
                            className={`${this.state.isRegistration ? 'active' : ""}`}>Sign Up</a>
                    </div>
                    {output}

                </div>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        loginInfo:state.login.info,
        loginError:state.login.err,
        registerInfo:state.register.info,
        registerError:state.register.err
    }
}

const mapDispatchToProps = dispatch =>bindActionCreators({isAuthShown,login,checkAuth,register,registerUserRestriction,updateUserRestriction},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(Registration);
