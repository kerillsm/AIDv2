import React from 'react';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MetaTags from 'react-meta-tags'



class FakeDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            share: null,
            props,
            isLoggedIn: props.isLoggedIn
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

        console.log('textarea', textArea.value);

        document.body.appendChild(textArea);

        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Unable to copy');
        }

        document.body.removeChild(textArea);
    }

    render() {
        var { items, coeff, consoleStats, config,id } = this.state.props;
        console.log('id',id);
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
                    // self.copyTextToClipboard(`${window.location.host}/share/${res.id}`);
                    self.setState({ share: res.id });


                });
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
                .then(res => console.log(res, "RES"));
        }

        function changeCase(e, i) {
            config.cases[i] = e.target.value;
        }

        if (this.state.share) return <Redirect to={`/share/${this.state.share}`} />


        return (
            <div>

            <MetaTags>
                <title>{`${config.title + ' | AI.Decider'}`}</title>
                <meta name="og:description" content="Some description" />
                <meta property="og:title" content={`${config.title + ' | AI.Decider'}`} />
            </MetaTags>

      <Paper elevation={1} className="dashboard-paper">
        <Typography component="p">
This decision maker is the best type of decider for two options. You can use it for all types of decisions, including this case - make decision between two {config.category} {config.subcategory} options!
        </Typography>
      </Paper>


                <div className="dashboard-buttons">
                    <div>
                        <RaisedButton label="Share" secondary={true} onClick={() => share()}  />

                    </div>

                    <TextField className="fake-slider-input"
                        value={config.title}
                        onChange={(e) => config.title = e.target.value }
                        name="title"
                    />
                </div>

                <div className="dashboard">
                    <p><span className="score">{Math.abs(Math.round(firstOption)) || 0}%</span> <input type="text" onChange={(e) => changeCase(e, 0)} value={config.cases[0]} /> </p>
                    <p><input type="text" onChange={(e) => changeCase(e, 1)} value={config.cases[1]} /> <span className="score">{Math.abs(Math.round(secondOption)) || 0}%</span> </p>
                </div>

            </div>

        )
    }
}


export default FakeDashboard;
