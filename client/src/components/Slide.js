import React from 'react';
import Slider from 'react-rangeslider';

const Slide = (props) => {
  var { getItemStyle, provided, toggleMovable, changeScore, changeDescription, id, coeff, items, deleteSlide } = props;
  var decisionPercents = items[id].score;
  var { description } = items[id];

  var labels = {
    '-100': 100,
    0: 0,
    100: 100,
  }

  // console.log("SLIDER")

  function formatOutput(value) {
    var whole = 200;
    var leftOption = 100 - value;
    var leftPercent = Math.ceil((leftOption / whole) * 100);
    var rightPercent = 100 - leftPercent;

    return `${leftPercent}/${rightPercent}`
  }

  return  (
    <div>
      <div
        className="slider-wrapper2"
        ref={provided.innerRef}
        style={getItemStyle(provided.draggableStyle)}
        {...provided.dragHandleProps}>

        <input
          className="description"
          onClick={(e) => {
            var val = e.target.value;
            e.target.focus();
            e.target.value = '';
            e.target.value = val;
          }}
          onChange={({ target }) => changeDescription(id, target.value)}
          onKeyDown={(e) => e.stopPropagation()}
          value={ description }/>
        <Slider
          min={-100}
          max={100}
          value={decisionPercents}
          format={formatOutput}
          onChange={(value) => changeScore(id, value)}
        />



        <i className="fa fa-times" aria-hidden="true" onClick={() => deleteSlide(id)}></i>
      </div>
      {provided.placeholder}


    </div>

  );
}

export default Slide;
