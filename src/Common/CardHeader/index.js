import React from 'react';

export default (values) => {
    const {icon, title, description} = values && values.data;
    return <div><div className="cardHeaderTitle cardHeaderIcon">
      <img className="cardIcon" src={icon} alt="" /><span className="cardName">{title}</span></div>
      <div className="cardBody">{description}</div>
    </div>
}
