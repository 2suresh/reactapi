import React from 'react';

export default (values) => {
    const footerDocs = [];
    return <div className="headerFooter">
      {values && values.data && values.data.documentation.map(val => {
        let length = Object.keys(val).length;
        for(let i=2; i<length; i++) {
          (val[Object.keys(val)[i]]) && footerDocs.push(<a href={val[Object.keys(val)[i]]} className="headerFooter-link" key={Object.keys(val)[i]}>{Object.keys(val)[i]}<i className="headerFooter-link-icon icon-chevron-right"></i></a>);
        }
        return footerDocs;
      })}
    </div>
}
