import React from 'react';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class MiniDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            share: null,
            props,
            isLoggedIn: props.isLoggedIn,
            value:''
        }
    }

    copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;


        document.body.appendChild(textArea);

        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';

        } catch (err) {
        }

        document.body.removeChild(textArea);
    }

    handleChange(e) {
        this.setState({value:e.target.value});

    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.state.props.config.title = nextState.value
    }

    render() {
        var { items, coeff, consoleStats, config,id } = this.state.props;
        console.log(items);
        var firstOption = 0;
        var secondOption = 0;
        var overallScore = 0;
        var self = this;

        for (var i = 0; i < items.length; i++) {
            let { score } = items[i];
            score *= Math.pow(coeff, i);

            if (score < 0) firstOption += score;
            if (score > 0) secondOption += score;
            overallScore += Math.abs(score);
        }

        firstOption = (firstOption / overallScore) * 100;
        secondOption = (secondOption / overallScore) * 100;

        function share() {
            self.copyTextToClipboard(`${window.location.host}/share/asdadasdadasdasd`);
            fetch('/api/share', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(consoleStats([firstOption, secondOption]))
            })
                .then(res=> res.json())
                .then(res => {
                    self.copyTextToClipboard(`${window.location.host}/share/${res.id}`);
                    self.setState({ share: res.id });


                });

        }

        let shareRand=()=>{
            console.log('shareRand');
            let randNum = () => {
                let num = Math.random()*100;
                let sign = parseInt((Math.random()>0.5?num*(-1):num).toFixed())
                return sign
            }

            var firstOption = 0;
            var secondOption = 0;
            var overallScore = 0;
            var self = this;
            let newItems = items;
            newItems.map(item=>{
                item.score = randNum()
            })

            for (var i = 0; i < newItems.length; i++) {
                let { score } = newItems[i];
                score *= Math.pow(coeff, i);

                if (score < 0) firstOption += score;
                if (score > 0) secondOption += score;
                overallScore += Math.abs(score);
            }

            firstOption = (firstOption / overallScore) * 100;
            secondOption = (secondOption / overallScore) * 100;
            self.copyTextToClipboard(`${window.location.host}/share/asdadasdadasdasd`);
            fetch('/api/share', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(consoleStats([firstOption, secondOption]))
            })
                .then(res=> res.json())
                .then(res => {
                    self.copyTextToClipboard(`${window.location.host}/share/${res.id}`);
                    self.setState({ share: res.id });


                });


        }

        let checkTouchedMap = () => {
            const data = consoleStats([firstOption, secondOption]);
            const keys = Object.keys(data.results);

            const checkArr = keys.map(item => {
                if(data.results[item] !== 0 ){
                    return true
                }
                else{
                    return false
                }
            })

            let res = checkArr.includes(true)

            return res?share():shareRand()
        }

        function saveMap() {
            fetch('/api/map/save', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(consoleStats([firstOption, secondOption]))
            })
                .then(res => res.json())
        }

        function changeCase(e, i) {
            config.cases[i] = e.target.value;
        }



        if (this.state.share) return <Redirect to={`/share/${this.state.share}`} />

        return (
            <div className="block">


                <div className="mdashboard-buttons">
                    <TextField
                        hintText={this.state.props.config.title}
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <div>
                        <RaisedButton class="miniDButton" label="Decide" secondary={true} onClick={() => checkTouchedMap()}  />
                    </div>
					</div>

                <div className="dashboard">
                    <h3><span>{Math.abs(Math.round(firstOption)) || 0}%</span> <span>{config.cases[0]}</span>|
                    <span>{config.cases[1]}</span> <span >{Math.abs(Math.round(secondOption)) || 0}%</span> </h3>
                </div>
            </div>

        )
    }
}


export default MiniDashboard;
